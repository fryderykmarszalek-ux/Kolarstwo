// Odświeża dane.js danymi ze Stravy.
//
// ZASADA: skrypt NIE generuje pliku od zera. Wczytuje istniejący dane.js
// i podmienia w nim wyłącznie listę aktywności oraz stemple w meta.
// Bloki "zalozenia", "kryterium_przerwy" i "plan_objetosci" są ustalane
// ręcznie i muszą przetrwać każdą aktualizację nietknięte — inaczej
// automat kasowałby decyzje, nad którymi siedzieliśmy godzinami.

const fs = require("fs");
const path = require("path");
const { STRAVA, zapytaj, swiezyToken } = require("./wspolne");

const PLIK = path.join(__dirname, "..", "..", "dane.js");
const TYPY_Z_OPISEM = ["Ride", "VirtualRide"];   // tylko dla nich dociągamy opis

// Opis jazdy to JEDYNY kanał, którym Fryderyk podaje wiatr, skład grupy
// i tętno — rzeczy, których w podsumowaniu ze Stravy nie ma i nigdy nie będzie.
// Pisze go zwykle po wgraniu jazdy, a poprawia jeszcze później (przykład
// z życia: opis z 13.08 czeka na poprawkę "?1" -> "w?1"). Pobranie opisu raz,
// przy pierwszym spotkaniu z jazdą, gubi wszystko, co powstało potem.
// Dlatego świeże jazdy odpytujemy ponownie przy każdym przebiegu.
const OKNO_OPISOW_DNI = 30;
const PELNE_OPISY = process.env.PELNE_OPISY === "true";   // jednorazowy backfill

// Próby na segmentach. Jedno zapytanie o szczegóły jazdy zwraca i opis,
// i wszystkie przejazdy segmentów w tej jeździe — więc bierzemy oba naraz.
// Granica 28.04.2026 to decyzja z STRONA.md §9: wcześniej jazdy są pojedyncze
// i rozrzucone, więc segmenty z nich nie dają się z niczym porównać.
// Zmiana jednej daty w meta.segmenty_od plus przebieg z PELNE_SEGMENTY
// przywraca dowolnie głęboką historię.
const PELNE_SEGMENTY = process.env.PELNE_SEGMENTY === "true";

// KRZYWA MOCY. Strava nie oddaje przez API gotowych rekordów mocy na czas —
// oddaje surowy strumień watów, sekunda po sekundzie. Liczymy z niego maksima
// średnich kroczących dla ustalonych okien i zapisujemy same wyniki: kilkanaście
// liczb na jazdę zamiast kilku tysięcy. Strumień pobieramy WYŁĄCZNIE dla jazd
// z device_watts, czyli tam, gdzie moc jest mierzona, a nie zgadywana — dziś
// to Zwift, a po kupnie miernika ta sama reguła obejmie szosę bez zmian w kodzie.
// 15 min zamiast 12: decyzja Fryderyka z 21.08.2026. Dwunastka nie jest
// standardowym oknem i to na parze 10/12 min najczęściej widać, że maksimum
// średniej kroczącej nie musi maleć z długością okna.
const CZASY_KRZYWEJ = [1,5,10,15,30,60,120,300,480,600,900,1200,1800,2700,3600,5400];
const PELNA_MOC = process.env.PELNA_MOC === "true";

function wczytajStare(){
  global.window = {};
  delete require.cache[require.resolve(PLIK)];
  require(PLIK);
  return global.window.DANE;
}

// Ani opisu, ani prób na segmentach nie ma w liście aktywności — po jedno
// i drugie trzeba osobno, jazda po jeździe. Jedno zapytanie daje oba, więc
// nigdy nie pytamy dwa razy o tę samą jazdę.
// Zwraca obiekt jazdy albo undefined, gdy zapytanie padło — undefined znaczy
// „nie wiem" i zostawia to, co już mamy, zamiast kasować dane przez błąd sieci.
async function dociagnijJazde(id, access, zSegmentami){
  try {
    return await zapytaj(
      `${STRAVA}/api/v3/activities/${id}?include_all_efforts=${zSegmentami}`,
      { headers: { Authorization: `Bearer ${access}` } });
  } catch (e){
    console.log(`  (nie udało się pobrać jazdy ${id}: ${e.message.split("\n")[0]})`);
    return undefined;
  }
}

async function dociagnijStrumienMocy(id, access){
  try {
    const s = await zapytaj(
      `${STRAVA}/api/v3/activities/${id}/streams?keys=time,watts&key_by_type=true`,
      { headers: { Authorization: `Bearer ${access}` } });
    if (!s || !s.watts || !s.watts.data) return null;
    return { watts: s.watts.data, czas: s.time && s.time.data ? s.time.data : null };
  } catch (e){
    console.log(`  (nie udało się pobrać mocy ${id}: ${e.message.split("\n")[0]})`);
    return undefined;
  }
}

// Maksimum średniej kroczącej dla każdego okna. Strumień rozkładamy najpierw
// na siatkę co sekundę: przerwa w zapisie (postój) dostaje zero, a nie ostatnią
// wartość — inaczej pauza podbijałaby długie okna mocą, której nikt nie wykręcił.
function krzywaMocy(watts, czas){
  if (!watts || !watts.length) return null;
  let seria;
  if (czas && czas.length === watts.length){
    const koniec = czas[czas.length-1];
    if (koniec > 200000) return null;               // absurd — nie ufamy
    seria = new Array(koniec+1).fill(0);
    for (let i = 0; i < watts.length; i++) seria[czas[i]] = watts[i] || 0;
  } else {
    seria = watts.map(x => x || 0);                 // brak osi czasu: zakładamy 1 Hz
  }
  // sumy prefiksowe, żeby każde okno liczyło się w stałym czasie
  const suma = new Array(seria.length+1).fill(0);
  for (let i = 0; i < seria.length; i++) suma[i+1] = suma[i] + seria[i];

  const wynik = {};
  for (const okno of CZASY_KRZYWEJ){
    if (okno > seria.length) break;                 // jazda krótsza niż okno
    let naj = 0;
    for (let i = 0; i + okno <= seria.length; i++){
      const sr = (suma[i+okno] - suma[i]) / okno;
      if (sr > naj) naj = sr;
    }
    if (naj > 0) wynik[okno] = Math.round(naj);
  }
  return Object.keys(wynik).length ? wynik : null;
}

// Z odpowiedzi wyciągamy dwie rzeczy: metadane segmentu (nazwa, długość,
// nachylenie — stałe, nie zmieniają się między przejazdami) i samą próbę
// (czas i moc [S]). Rozdzielenie jest po to, żeby nazwy i długości nie
// powtarzały się przy każdej z kilkuset prób.
function wyciagnijProby(jazda){
  const proby = [], segmenty = [];
  for (const e of jazda.segment_efforts || []){
    const seg = e.segment || {};
    if (!seg.id) continue;
    segmenty.push({
      id: String(seg.id),
      nazwa: seg.name,
      dystans_m: Number((seg.distance || 0).toFixed(1)),
      nachylenie_proc: seg.average_grade == null ? null : Number(seg.average_grade.toFixed(1)),
      przewyzszenie_m: seg.elevation_high != null && seg.elevation_low != null
        ? Number((seg.elevation_high - seg.elevation_low).toFixed(1)) : null
    });
    proby.push({
      // Identyfikator przejazdu ze Stravy. Nie służy do rysowania — jest
      // KOTWICĄ dla notatek.
      //
      // UWAGA na precyzję: Strava przysyła to jako liczbę 19-cyfrową, a JSON.parse
      // w JavaScripcie trzyma liczby w float64, gdzie przy 3,5·10^18 najbliższe
      // wartości są oddalone o 512. Trzy ostatnie cyfry są więc zaokrąglane
      // (widać to po końcówkach "000"). Sprawdzone na komplecie 1717 prób:
      // wszystkie identyfikatory pozostają UNIKALNE, a najmniejsza różnica
      // między dwoma wynosi 1024 — dwa razy więcej niż krok zaokrąglenia,
      // więc dwie różne próby nie mogą się skleić w jeden klucz.
      // Zaokrąglenie jest deterministyczne, więc klucz notatki jest trwały. Bez niego notatka musiałaby się wiązać z próbą
      // przez kolejność w jeździe, a ta potrafi się zmienić przy ponownym
      // wgraniu pliku i notatka wylądowałaby przy cudzym przejeździe.
      id: String(e.id),
      s: String(seg.id),
      a: String(jazda.id),
      czas_s: e.elapsed_time,
      // moc [S] — estymata Stravy. device_watts == true znaczyłoby miernik mocy,
      // którego Fryderyk nie ma; do listopada 2026 zawsze będzie tu estymata.
      moc_S: e.average_watts == null ? null : Number(e.average_watts.toFixed(1)),
      z_miernika: e.device_watts === true ? 1 : 0,
      // Tętno na segmencie. Dziś puste we WSZYSTKICH próbach, bo konto Garmina
      // było dziecięce i blokowało dane zdrowotne (odblokowanie 22.08.2026).
      // Zapisujemy je mimo to: pierwsza jazda z pomiarem wypełni pole sama,
      // a strona sama dorysuje pas tętna, gdy zobaczy w danych pierwszą liczbę.
      tetno: e.average_heartrate == null ? null : Math.round(e.average_heartrate)
    });
  }
  return { proby, segmenty };
}

function naNasz(a){
  return {
    id: String(a.id),
    data: String(a.start_date_local).replace(/Z$/, ""),
    typ: a.sport_type || a.type,
    dystans_m: Number((a.distance || 0).toFixed(1)),
    czas_ruchu_s: a.moving_time,
    czas_calkowity_s: a.elapsed_time,
    przewyzszenie_m: Number((a.total_elevation_gain || 0).toFixed(1)),
    nazwa: a.name
  };
}

// Wypisuje KAŻDY blok, który zastał w pliku — nie listę nazw znanych temu
// skryptowi. Blok dopisany ręcznie za pół roku ma przetrwać automat, a nie
// zniknąć o 22:00 dlatego, że skrypt o nim nie słyszał. Ta pętla jest jedyną
// różnicą między "automat odświeża dane" a "automat kasuje decyzje".
function zapisz(D){
  const j = x => JSON.stringify(x, null, 0);
  const L = [];
  L.push("// dane.js — jedyne miejsce z danymi. Kod strony ich nie zawiera.");
  L.push("// Źródło: Strava, athlete 143761800. Wygenerowane automatycznie — nie edytować ręcznie.");
  L.push("// Wariant B: zapisujemy pomiary [Z]/[S]. Wszystko wyliczalne (prędkość, moc [E], W/kg,");
  L.push("// VAM, koszt kardiologiczny) liczy się przy wyświetlaniu, NIE tutaj.");
  L.push("");
  L.push("window.DANE = {");

  for (const klucz of Object.keys(D)){
    if (klucz === "aktywnosci") continue;         // zawsze na końcu, własny format
    L.push("");
    if (klucz === "meta"){
      L.push("meta: " + j(D.meta) + ",");         // jedna linia: i tak nikt tego nie czyta oczami
    } else if (Array.isArray(D[klucz])){
      // Tablica prostych wartości mieści się w jednej linii; tablica obiektów
      // dostaje linię na element, żeby różnice w gicie były czytelne.
      if (D[klucz].every(x => x === null || typeof x !== "object")){
        L.push(klucz + ": " + j(D[klucz]) + ",");
      } else {
        L.push(klucz + ": [");
        for (const p of D[klucz]) L.push("  " + j(p) + ",");
        L.push("],");
      }
    } else {
      L.push(klucz + ": " + JSON.stringify(D[klucz], null, 2) + ",");
    }
  }

  L.push("");
  L.push("// czas_ruchu_s — czas w ruchu. Zgodnie z regułą: wszystkie średnie zawsze z czasu w ruchu.");
  L.push("aktywnosci: [");
  for (const a of D.aktywnosci) L.push("  " + j(a) + ",");
  L.push("]");
  L.push("");
  L.push("};");
  fs.writeFileSync(PLIK, L.join("\n") + "\n", "utf8");
}

(async () => {
  const stare = wczytajStare();
  const bylo = stare.aktywnosci.length;
  console.log(`Obecnie w pliku: ${bylo} aktywności.`);

  const { access } = await swiezyToken({
    clientId: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    refreshToken: process.env.STRAVA_REFRESH_TOKEN
  });
  console.log("Token odświeżony.");

  // pobierz wszystko, stronami
  const zeStravy = [];
  for (let strona = 1; strona <= 20; strona++){
    const partia = await zapytaj(
      `${STRAVA}/api/v3/athlete/activities?per_page=200&page=${strona}`,
      { headers: { Authorization: `Bearer ${access}` } });
    zeStravy.push(...partia);
    console.log(`  strona ${strona}: ${partia.length}`);
    if (partia.length < 200) break;
  }
  console.log(`Ze Stravy: ${zeStravy.length} aktywności.`);

  if (!zeStravy.length){
    console.error("Strava zwróciła pustą listę — przerywam, żeby nie skasować danych.");
    process.exit(1);
  }

  const opisy = new Map(stare.aktywnosci.map(a => [a.id, a.opis]));
  // RPE (perceived_exertion) — jak opis: nie ma go w liście aktywności,
  // przychodzi dopiero ze szczegółami jazdy. Przy braku pomiaru mocy i tętna
  // jest najlepszą dostępną miarą wysiłku, więc nie wolno go zgubić przy
  // przebiegu, który akurat nie pyta o tę jazdę.
  const rpeStare = new Map(stare.aktywnosci.map(a => [a.id, a.rpe]));
  const znaneId = new Set(stare.aktywnosci.map(a => a.id));

  const nowe = zeStravy.map(naNasz)
    .sort((a,b) => a.data < b.data ? -1 : a.data > b.data ? 1 : 0);

  // Granica okna: jazdy młodsze pytamy o opis za każdym razem, starsze tylko
  // przy pierwszym spotkaniu albo na żądanie (PELNE_OPISY).
  const granica = new Date(Date.now() - OKNO_OPISOW_DNI*86400000)
    .toISOString().slice(0,10);

  const SEGMENTY_OD = stare.meta.segmenty_od || "2026-04-28";
  const jazdyZeSegmentami = new Set(stare.segmenty_pobrane || []);
  const wszystkieId = new Set(nowe.map(a => a.id));

  // Stare próby zostają — dociągamy tylko te jazdy, których jeszcze nie było.
  // Próby jazd skasowanych na Stravie wypadają razem z jazdą.
  const proby = (stare.proby || []).filter(p => wszystkieId.has(p.a));
  const mocPobrana = new Set(stare.moc_pobrana || []);
  const krzywe = (stare.moc_krzywe || []).filter(k => wszystkieId.has(k.a));
  const segmenty = new Map((stare.segmenty || []).map(x => [x.id, x]));

  let zapytan = 0, zmienionych = 0, nowychProb = 0;
  for (const a of nowe){
    const znana    = znaneId.has(a.id);
    const stary    = opisy.get(a.id);
    const kolarska = TYPY_Z_OPISEM.includes(a.typ);
    const swieza   = a.data.slice(0,10) >= granica;

    const chceOpis = kolarska && (!znana || swieza || PELNE_OPISY);
    const chceSegmenty = kolarska && a.data.slice(0,10) >= SEGMENTY_OD
      && (!jazdyZeSegmentami.has(a.id) || PELNE_SEGMENTY);

    const staryRpe = rpeStare.get(a.id);

    // Czy ta jazda MOŻE mieć moc z pomiaru — bez wydawania na to zapytania.
    // Zwift zawsze podaje waty z trenażera, a przy szosie wystarczy zajrzeć
    // do prób na segmentach: jeśli któraś ma z_miernika, to miernik był.
    // Dzięki temu dzień po kupnie miernika szosa wejdzie tu sama.
    const mocMozliwa = a.typ === "VirtualRide"
      || proby.some(x => x.a === a.id && x.z_miernika === 1);
    let chceMoc = mocMozliwa && (!mocPobrana.has(a.id) || PELNA_MOC);

    if (!chceOpis && !chceSegmenty && !chceMoc){
      if (stary) a.opis = stary;               // nic do pytania — zachowaj, co mamy
      if (staryRpe != null) a.rpe = staryRpe;
      continue;
    }

    // Szczegółów nie pobieramy dla samej mocy — strumień jest osobnym adresem.
    const jazda = (chceOpis || chceSegmenty)
      ? await dociagnijJazde(a.id, access, chceSegmenty) : null;
    if (chceOpis || chceSegmenty) zapytan++;

    if (jazda === undefined){                  // zapytanie padło — nie ruszamy niczego
      if (stary) a.opis = stary;
      if (staryRpe != null) a.rpe = staryRpe;
      continue;
    }
    if (jazda === null){                       // pytamy wyłącznie o moc
      if (stary) a.opis = stary;
      if (staryRpe != null) a.rpe = staryRpe;
    }

    // Świeżo pobrane szczegóły mogą ujawnić miernik, o którym dane jeszcze nie
    // wiedzą — nowa jazda z miernikiem trafia tu przy pierwszym spotkaniu.
    if (jazda && jazda.device_watts === true && (!mocPobrana.has(a.id) || PELNA_MOC))
      chceMoc = true;

    // Strava jest masterem również tutaj: skasowany RPE znika też u nas.
    if (jazda && jazda.perceived_exertion != null) a.rpe = jazda.perceived_exertion;

    if (chceOpis && jazda){
      const o = (jazda.description || "").trim() || null;
      if (o) a.opis = o;                       // null zostawia jazdę bez opisu, świadomie
      if ((o || null) !== (stary || null)){
        zmienionych++;
        console.log(`  opis ${znana ? "zmieniony" : "nowy"}: ${a.data.slice(0,10)} ${a.nazwa}`);
      }
    } else if (stary){
      a.opis = stary;
    }
    if (!chceOpis && staryRpe != null && a.rpe == null) a.rpe = staryRpe;

    if (chceMoc){
      const str = await dociagnijStrumienMocy(a.id, access);
      zapytan++;
      if (str !== undefined){
        mocPobrana.add(a.id);
        const k = str ? krzywaMocy(str.watts, str.czas) : null;
        for (let i = krzywe.length - 1; i >= 0; i--)
          if (krzywe[i].a === a.id) krzywe.splice(i, 1);
        if (k){
          krzywe.push({ a: a.id, w: k });
          console.log(`  krzywa mocy: ${a.data.slice(0,10)} ${a.nazwa} — `
            + `${Object.keys(k).length} okien, szczyt ${Math.max(...Object.values(k))} W`);
        }
      }
    }

    if (chceSegmenty && jazda){
      const w = wyciagnijProby(jazda);
      for (let i = proby.length - 1; i >= 0; i--)   // podmieniamy, nie dokładamy
        if (proby[i].a === a.id) proby.splice(i, 1);
      proby.push(...w.proby);
      for (const seg of w.segmenty) segmenty.set(seg.id, seg);
      jazdyZeSegmentami.add(a.id);
      nowychProb += w.proby.length;
      console.log(`  segmenty: ${a.data.slice(0,10)} ${a.nazwa} — ${w.proby.length} prób`);
    }
  }
  console.log(`Zapytań o jazdy: ${zapytan}. Opisów zmienionych: ${zmienionych}. `
    + `Prób na segmentach dociągniętych: ${nowychProb}.`);

  proby.sort((x,y) => x.s === y.s ? (x.a < y.a ? -1 : 1) : (x.s < y.s ? -1 : 1));
  stare.segmenty = [...segmenty.values()].sort((x,y) =>
    x.nazwa.localeCompare(y.nazwa, "pl"));
  stare.proby = proby;
  stare.segmenty_pobrane = [...jazdyZeSegmentami].filter(id => wszystkieId.has(id)).sort();
  stare.moc_krzywe = krzywe.sort((x,y) => x.a < y.a ? -1 : 1);
  stare.moc_pobrana = [...mocPobrana].filter(id => wszystkieId.has(id)).sort();

  stare.aktywnosci = nowe;
  stare.meta.pobrano = new Date().toISOString().slice(0,16);
  stare.meta.zrodlo = "Strava API (GitHub Actions): /athlete/activities + /activities/{id}";
  stare.meta.liczba_aktywnosci = nowe.length;
  stare.meta.segmenty_od = SEGMENTY_OD;
  stare.meta.liczba_segmentow = stare.segmenty.length;
  stare.meta.liczba_prob = stare.proby.length;
  stare.meta.jazd_z_moca = stare.moc_krzywe.length;
  stare.meta.zakres = [nowe[0].data.slice(0,10), nowe[nowe.length-1].data.slice(0,10)];

  zapisz(stare);
  console.log(`Zapisano. Było ${bylo}, jest ${nowe.length}.`);
})().catch(e => { console.error(e.message); process.exit(1); });
