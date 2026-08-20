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

function wczytajStare(){
  global.window = {};
  delete require.cache[require.resolve(PLIK)];
  require(PLIK);
  return global.window.DANE;
}

// Lista aktywności nie zawiera opisu — trzeba po niego osobno, jazda po jeździe.
// Pytamy o jazdy nowe i o te z ostatnich OKNO_OPISOW_DNI dni: dzienny przebieg
// kosztuje wtedy kilka zapytań zamiast stu, a poprawka opisu sprzed tygodnia
// nadal dociera.
// Zwraca: tekst = opis, null = jazda bez opisu (Strava jest masterem, więc
// skasowany opis ma zniknąć również u nas), undefined = nie wiem, bo zapytanie
// padło — wtedy zostawiamy to, co mamy, zamiast kasować dane przez błąd sieci.
async function dociagnijOpis(id, access){
  try {
    const a = await zapytaj(`${STRAVA}/api/v3/activities/${id}?include_all_efforts=false`,
      { headers: { Authorization: `Bearer ${access}` } });
    return (a.description || "").trim() || null;
  } catch (e){
    console.log(`  (nie udało się pobrać opisu ${id}: ${e.message.split("\n")[0]})`);
    return undefined;
  }
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
      L.push(klucz + ": [");                      // tablica: element na linię, czytelne różnice
      for (const p of D[klucz]) L.push("  " + j(p) + ",");
      L.push("],");
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
  const znaneId = new Set(stare.aktywnosci.map(a => a.id));

  const nowe = zeStravy.map(naNasz)
    .sort((a,b) => a.data < b.data ? -1 : a.data > b.data ? 1 : 0);

  // Granica okna: jazdy młodsze pytamy o opis za każdym razem, starsze tylko
  // przy pierwszym spotkaniu albo na żądanie (PELNE_OPISY).
  const granica = new Date(Date.now() - OKNO_OPISOW_DNI*86400000)
    .toISOString().slice(0,10);

  let zapytan = 0, zmienionych = 0;
  for (const a of nowe){
    const znana    = znaneId.has(a.id);
    const stary    = opisy.get(a.id);
    const kolarska = TYPY_Z_OPISEM.includes(a.typ);
    const swieza   = a.data.slice(0,10) >= granica;

    if (kolarska && (!znana || swieza || PELNE_OPISY)){
      const o = await dociagnijOpis(a.id, access);
      zapytan++;
      if (o === undefined){
        if (stary) a.opis = stary;             // zapytanie padło — nie kasuj tego, co mamy
      } else {
        if (o) a.opis = o;                     // null zostawia jazdę bez opisu, świadomie
        if ((o || null) !== (stary || null)){
          zmienionych++;
          console.log(`  opis ${znana ? "zmieniony" : "nowy"}: ${a.data.slice(0,10)} ${a.nazwa}`);
        }
      }
    } else if (stary){
      a.opis = stary;                          // poza oknem: zachowaj to, co już mamy
    }
  }
  console.log(`Opisy: ${zapytan} zapytań, ${zmienionych} zmian.`);

  stare.aktywnosci = nowe;
  stare.meta.pobrano = new Date().toISOString().slice(0,16);
  stare.meta.zrodlo = "Strava API (GitHub Actions): /athlete/activities + /activities/{id}";
  stare.meta.liczba_aktywnosci = nowe.length;
  stare.meta.zakres = [nowe[0].data.slice(0,10), nowe[nowe.length-1].data.slice(0,10)];

  zapisz(stare);
  console.log(`Zapisano. Było ${bylo}, jest ${nowe.length}.`);
})().catch(e => { console.error(e.message); process.exit(1); });
