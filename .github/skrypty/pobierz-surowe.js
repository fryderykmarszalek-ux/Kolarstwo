// pobierz-surowe.js — ARCHIWUM SUROWYCH DANYCH JAZD ze Stravy.
//
// Po co: dane.js i przebiegi/ to WYCIĄG pod obecną stronę (6 strumieni, liczby
// zaokrąglone, część pól pominięta). Tutaj trzymamy WSZYSTKO, co Strava oddaje
// o każdej jeździe, bez zaokrągleń i bez wyboru — żeby nowa strona (Kolarstwo2)
// i przyszłe AI mogły liczyć z pełnych danych, bez ponownego pytania Stravy.
// Decyzja Fryderyka z 11.11.2026: „każdy strumień w jak najmniejszym detalu”.
//
// Co trafia do surowe/jazdy/<id>.json:
//   - aktywnosc   — szczegóły jazdy z /activities/{id}?include_all_efforts=true
//                   (okrążenia, kilometry, wszystkie próby na segmentach, RPE,
//                   opis, sprzęt, urządzenie…) — pola i nazwy dokładnie jak Strava
//   - strumienie  — WSZYSTKIE 11 strumieni w pełnej rozdzielczości, jak nagrało
//                   urządzenie: time, distance, latlng, altitude, velocity_smooth,
//                   heartrate, cadence, watts, temp, moving, grade_smooth.
//                   Liczby bez zaokrągleń. Brak strumienia = urządzenie go nie nagrało.
//
// PRYWATNOŚĆ — repozytorium jest PUBLICZNE. Surowy ślad GPS zaczyna się i kończy
// pod domem, więc:
//   - punkt GPS w promieniu 500 m od MIEJSCA CHRONIONEGO zamienia się w null
//     (pozostałe strumienie zostają nietknięte, indeksy się zgadzają);
//   - miejsca chronione: każde miejsce, z którego co najmniej 3 razy zaczęła się
//     albo skończyła jazda (dom, dom dziadków…), PLUS początek i koniec każdej
//     jazdy z osobna. Ostrzej niż trasy.js (tam tylko dom i tylko początek/koniec
//     śladu) — tu chronimy też przejazd koło domu w środku jazdy;
//   - współrzędne start/koniec w szczegółach jazdy są usuwane, a polilinie
//     (map.polyline, summary_polyline) wylatują w całości — ślad i tak jest
//     w strumieniu latlng, już przycięty;
//   - private_note (na Stravie widzi ją tylko Fryderyk) i embed_token nie trafiają
//     do pliku nigdy (POLA_WYRZUCANE);
//   - Zwift (sport_type Virtual…) ma współrzędne świata gry, nie Ziemi —
//     ich nie przycinamy i nie liczymy z nich miejsc chronionych;
//   - współrzędnych miejsc chronionych NIGDZIE nie zapisujemy ani nie wypisujemy
//     w logu (logi akcji w publicznym repo też są publiczne).
//
// LIMITY STRAVY: 100 zapytań odczytu na kwadrans i 1000 na dobę dla całej
// aplikacji — wspólne z nocnym automatem. Skrypt czyta liczniki z nagłówków
// każdej odpowiedzi; blisko limitu kwadransa czeka do następnego kwadransa,
// blisko limitu dobowego kończy pracę. Wszystko, co zdążył zapisać, zostaje,
// a następny przebieg zaczyna od jazd, których jeszcze nie ma (wznawialność).
//
// Zero zależności zewnętrznych — jak reszta automatu.

const fs = require("fs");
const path = require("path");
const { STRAVA, swiezyToken } = require("./wspolne.js");

const FORMAT = 1;
const KATALOG = process.env.SUROWE_KATALOG || path.join(__dirname, "..", "..", "surowe");
const KATALOG_JAZD = path.join(KATALOG, "jazdy");
const PLIK_INDEKSU = path.join(KATALOG, "indeks.json");
const PLIK_ZAWODNIKA = path.join(KATALOG, "zawodnik.json");

const STRUMIENIE = ["time", "distance", "latlng", "altitude", "velocity_smooth",
  "heartrate", "cadence", "watts", "temp", "moving", "grade_smooth"];

const PELNE = process.env.PELNE_SUROWE === "true";           // pobierz od nowa wszystko
const ODSWIEZ_DNI = Number(process.env.SUROWE_ODSWIEZ_DNI || 14);  // RPE i opis dopisuje się po jeździe
const LIMIT_MIN = Number(process.env.SUROWE_LIMIT_MIN || 170);     // potem nie zaczynamy nowej jazdy
const ZAPAS_KWADRANS = 6;     // zostawiamy nocnemu automatowi trochę miejsca
const ZAPAS_DOBA = 60;
const PROMIEN_M = 500;
const MIN_POWTORZEN = 3;      // tyle startów/końców w jednym miejscu = miejsce chronione

const jestJazda = (a) => /Ride$/.test(a.sport_type || a.type || "");
const jestWirtualna = (a) => /^Virtual/.test(a.sport_type || a.type || "");

/* ── Zapytania z pilnowaniem limitów ───────────────────────────────────────── */

const licznik = { zapytan: 0, czekano_s: 0 };
const limit = { kwadrans: null, doba: null, uzyteKwadrans: 0, uzyteDoba: 0 };
let token = null;

class KoniecLimituDoby extends Error {}

// Do testów: SUROWE_TEST_CZEKANIE=1 zamienia czekanie na zapis w liczniku.
const czekaj = (ms) => process.env.SUROWE_TEST_CZEKANIE
  ? (licznik.czekano_s += ms / 1000, Promise.resolve())
  : new Promise((r) => setTimeout(r, ms));

// Okna Stravy zerują się o pełnych kwadransach (:00, :15, :30, :45 UTC).
function msDoKwadransa(teraz = Date.now()){
  const kw = 15 * 60 * 1000;
  return kw - (teraz % kw) + 10 * 1000;   // +10 s zapasu na rozjazd zegarów
}

function czytajLimity(odp){
  const l = odp.headers.get("x-readratelimit-limit") || odp.headers.get("x-ratelimit-limit");
  const u = odp.headers.get("x-readratelimit-usage") || odp.headers.get("x-ratelimit-usage");
  if (!l || !u) return;
  const [lk, ld] = l.split(",").map(Number), [uk, ud] = u.split(",").map(Number);
  if ([lk, ld, uk, ud].every(Number.isFinite)){
    limit.kwadrans = lk; limit.doba = ld; limit.uzyteKwadrans = uk; limit.uzyteDoba = ud;
  }
}

async function pilnujLimitow(){
  if (limit.doba != null && limit.uzyteDoba >= limit.doba - ZAPAS_DOBA)
    throw new KoniecLimituDoby(`limit dobowy Stravy: ${limit.uzyteDoba}/${limit.doba}`);
  if (limit.kwadrans != null && limit.uzyteKwadrans >= limit.kwadrans - ZAPAS_KWADRANS){
    const ms = msDoKwadransa();
    console.log(`  … limit kwadransa ${limit.uzyteKwadrans}/${limit.kwadrans} — czekam ${Math.round(ms / 1000)} s`);
    await czekaj(ms);
    limit.uzyteKwadrans = 0;
  }
}

// null = Strava mówi, że tego nie ma (404). Wyjątek = nie wiemy (sieć, 5xx).
async function strava(sciezka){
  for (let proba = 1; proba <= 3; proba++){
    await pilnujLimitow();
    const odp = await fetch(`${STRAVA}/api/v3${sciezka}`, { headers: { Authorization: `Bearer ${token}` } });
    licznik.zapytan++;
    czytajLimity(odp);
    if (odp.status === 429){
      console.log(`  … Strava odpowiedziała 429 (limit) — czekam do następnego kwadransa`);
      await czekaj(msDoKwadransa());
      limit.uzyteKwadrans = 0;
      continue;
    }
    if (odp.status === 404) return null;
    const tekst = await odp.text();
    if (odp.ok) return JSON.parse(tekst);
    if (odp.status >= 500 && proba < 3){ await czekaj(5000 * proba); continue; }
    // Nigdy nie wypisujemy nagłówków ani treści żądania — zawierają klucz.
    const blad = new Error(`Strava ${odp.status} na ${sciezka.split("?")[0]}: ${tekst.slice(0, 200)}`);
    // 401/403 = problem z logowaniem albo uprawnieniami: dotyczy KAŻDEJ jazdy,
    // więc kończymy od razu, zamiast palić limit na 133 nieudanych próbach.
    blad.krytyczny = odp.status === 401 || odp.status === 403;
    throw blad;
  }
  throw new Error(`Strava: trzy nieudane próby na ${sciezka.split("?")[0]}`);
}

/* ── Prywatność ────────────────────────────────────────────────────────────── */

// Przybliżenie płaskie — na kilkuset metrach różnica wobec haversine < 1 m.
// Ten sam wzór co w pobierz-strave.js.
function metry(a, b){
  const dLat = (a[0] - b[0]) * 111320;
  const dLng = (a[1] - b[1]) * 111320 * Math.cos(a[0] * Math.PI / 180);
  return Math.hypot(dLat, dLng);
}

function dekodujPolilinie(s){
  const p = []; let i = 0, lat = 0, lng = 0;
  while (i < s.length){
    let b, sh = 0, r = 0;
    do { b = s.charCodeAt(i++) - 63; r |= (b & 0x1f) << sh; sh += 5; } while (b >= 0x20);
    lat += (r & 1) ? ~(r >> 1) : (r >> 1);
    sh = 0; r = 0;
    do { b = s.charCodeAt(i++) - 63; r |= (b & 0x1f) << sh; sh += 5; } while (b >= 0x20);
    lng += (r & 1) ? ~(r >> 1) : (r >> 1);
    p.push([lat / 1e5, lng / 1e5]);
  }
  return p;
}

/* Miejsca, z których jazda co najmniej MIN_POWTORZEN razy się zaczęła albo
   skończyła. Zachłannie: najgęstszy punkt → miejsce chronione → usuwamy jego
   sąsiadów → powtarzamy. Nie średnia — jeden wyjazd do Francji przesunąłby
   średnią o setki kilometrów (ta sama lekcja co znajdzDom w pobierz-strave.js). */
function miejscaChronione(aktywnosci){
  let punkty = [];
  for (const a of aktywnosci){
    if (jestWirtualna(a)) continue;
    const s = a.map && a.map.summary_polyline;
    if (s){ const p = dekodujPolilinie(s); if (p.length) punkty.push(p[0], p[p.length - 1]); }
    else {
      if (Array.isArray(a.start_latlng) && a.start_latlng.length === 2) punkty.push(a.start_latlng);
      if (Array.isArray(a.end_latlng) && a.end_latlng.length === 2) punkty.push(a.end_latlng);
    }
  }
  const wynik = [];
  while (punkty.length){
    let naj = null, najSasiedzi = [];
    for (const p of punkty){
      const s = punkty.filter((q) => metry(p, q) < PROMIEN_M * 2);
      if (s.length > najSasiedzi.length){ naj = p; najSasiedzi = s; }
    }
    if (najSasiedzi.length < MIN_POWTORZEN) break;
    // Chronimy każdy punkt z kępy, nie tylko środek: dom leży gdzieś między nimi.
    wynik.push(...najSasiedzi);
    punkty = punkty.filter((q) => !najSasiedzi.includes(q));
  }
  return wynik;
}

const blisko = (p, chronione) => chronione.some((c) => metry(p, c) < PROMIEN_M);

/* Pola, które NIGDY nie trafiają do publicznego repo:
   - polyline, summary_polyline — nieprzycięty ślad GPS (ślad jest w strumieniu latlng, przycięty)
   - private_note — notatka prywatna: na Stravie widzi ją tylko Fryderyk
   - embed_token — klucz do osadzania jazdy na cudzych stronach */
const POLA_WYRZUCANE = new Set(["polyline", "summary_polyline", "private_note", "embed_token"]);

// Usuwa polilinie i współrzędne start/koniec, a pozostałe pary [lat, lng]
// w promieniu od miejsc chronionych zeruje. Działa na kopii, rekurencyjnie
// (próby na segmentach też niosą współrzędne).
function oczyscSzczegoly(obj, chronione, wirtualna){
  if (Array.isArray(obj)) return obj.map((x) => oczyscSzczegoly(x, chronione, wirtualna));
  if (!obj || typeof obj !== "object") return obj;
  const out = {};
  for (const [k, v] of Object.entries(obj)){
    if (POLA_WYRZUCANE.has(k)) continue;
    if (!wirtualna && (k === "start_latitude" || k === "start_longitude")) continue;
    if (/latlng$/.test(k) && Array.isArray(v)){
      if (wirtualna) { out[k] = v; continue; }
      // start/koniec samej jazdy — zawsze; reszta (np. segmenty) — gdy w strefie
      const wlasne = k === "start_latlng" || k === "end_latlng";
      out[k] = (wlasne && "distance" in obj && "moving_time" in obj) || (v.length === 2 && blisko(v, chronione)) ? null : v;
      continue;
    }
    out[k] = oczyscSzczegoly(v, chronione, wirtualna);
  }
  return out;
}

// Zwraca liczbę ukrytych punktów. latlng zmienia się w miejscu.
function przytnijSlad(latlng, chronione){
  const prawdziwe = latlng.filter((p) => Array.isArray(p));
  if (!prawdziwe.length) return 0;
  const wszystkie = chronione.concat([prawdziwe[0], prawdziwe[prawdziwe.length - 1]]);
  let ukryte = 0;
  for (let i = 0; i < latlng.length; i++){
    if (Array.isArray(latlng[i]) && blisko(latlng[i], wszystkie)){ latlng[i] = null; ukryte++; }
  }
  return ukryte;
}

/* ── Zapis ─────────────────────────────────────────────────────────────────── */

// Każdy strumień w jednej linii: plik da się czytać oczami, a diff jest krótki.
function zapiszJazde(id, dane){
  const linie = [
    "{",
    ` "format": ${FORMAT},`,
    ` "id": ${JSON.stringify(id)},`,
    ` "pobrano": ${JSON.stringify(dane.pobrano)},`,
    ` "zrodlo": "Strava API v3: /activities/{id}?include_all_efforts=true i /activities/{id}/streams (wszystkie typy, pełna rozdzielczość)",`,
    ` "prywatnosc": ${JSON.stringify(dane.prywatnosc)},`,
    ` "strumienie_meta": ${JSON.stringify(dane.strumienie_meta)},`,
    ` "aktywnosc": ${JSON.stringify(dane.aktywnosc)},`,
    ' "strumienie": {',
  ];
  const typy = Object.keys(dane.strumienie);
  typy.forEach((t, i) => linie.push(`  ${JSON.stringify(t)}: ${JSON.stringify(dane.strumienie[t])}${i < typy.length - 1 ? "," : ""}`));
  linie.push(" }", "}");
  const tekst = linie.join("\n") + "\n";
  JSON.parse(tekst);   // zapora: do pliku nie trafi nic, co się nie parsuje
  fs.writeFileSync(path.join(KATALOG_JAZD, `${id}.json`), tekst);
}

function wczytajJazde(id){
  const p = path.join(KATALOG_JAZD, `${id}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null;
}

function rozpakujStrumienie(s){
  const out = {}, meta = {};
  if (!s) return { out, meta };
  const lista = Array.isArray(s) ? s : Object.entries(s).map(([type, v]) => ({ type, ...v }));
  for (const x of lista){
    if (!x || !x.type || !Array.isArray(x.data)) continue;
    out[x.type] = x.data;
    meta[x.type] = { original_size: x.original_size, resolution: x.resolution, series_type: x.series_type };
  }
  // stała kolejność, niezależna od tego, jak odpowie Strava
  const uporz = {}, uporzMeta = {};
  for (const t of STRUMIENIE.concat(Object.keys(out).filter((t) => !STRUMIENIE.includes(t))))
    if (out[t]){ uporz[t] = out[t]; uporzMeta[t] = meta[t]; }
  return { out: uporz, meta: uporzMeta };
}

function wpisIndeksu(id, dane){
  const a = dane.aktywnosc || {}, s = dane.strumienie || {};
  const dl = Object.values(s).map((x) => x.length);
  return {
    data: a.start_date_local || null,
    typ: a.sport_type || a.type || null,
    nazwa: a.name || null,
    probek: s.time ? s.time.length : (dl[0] || 0),
    strumienie: Object.keys(s),
    rowne_dlugosci: dl.every((n) => n === dl[0]),
    ukryte_gps: dane.prywatnosc ? dane.prywatnosc.ukryte_punkty : 0,
    pobrano: dane.pobrano,
  };
}

function zapiszIndeks(indeks){
  const ids = Object.keys(indeks.jazdy).sort((x, y) => String(indeks.jazdy[y].data).localeCompare(String(indeks.jazdy[x].data)));
  const jazdy = {}; for (const id of ids) jazdy[id] = indeks.jazdy[id];
  const tekst = JSON.stringify({ ...indeks, liczba_jazd: ids.length, jazdy }, null, 1) + "\n";
  JSON.parse(tekst);
  fs.writeFileSync(PLIK_INDEKSU, tekst);
}

/* ── Główny przebieg ───────────────────────────────────────────────────────── */

async function main(){
  const start = Date.now();
  const teraz = () => new Date().toISOString().slice(0, 16) + "Z";
  fs.mkdirSync(KATALOG_JAZD, { recursive: true });

  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN)
    throw new Error("Brak sekretów STRAVA_* — nie ma czym się zalogować.");
  token = (await swiezyToken({ clientId: STRAVA_CLIENT_ID, clientSecret: STRAVA_CLIENT_SECRET, refreshToken: STRAVA_REFRESH_TOKEN })).access;

  const indeks = fs.existsSync(PLIK_INDEKSU)
    ? JSON.parse(fs.readFileSync(PLIK_INDEKSU, "utf8"))
    : { format: FORMAT, opis: "Indeks archiwum surowych danych jazd — szczegóły w surowe/README.md", jazdy: {} };
  indeks.jazdy = indeks.jazdy || {};

  // 1. Pełna lista aktywności (po 200 na stronę — cała historia to 1–2 zapytania)
  const wszystkie = [];
  for (let strona = 1; strona < 50; strona++){
    const porcja = await strava(`/athlete/activities?per_page=200&page=${strona}`);
    if (!porcja || !porcja.length) break;
    wszystkie.push(...porcja);
    if (porcja.length < 200) break;
  }
  if (!wszystkie.length) throw new Error("Strava oddała pustą listę aktywności — przerywam, nic nie ruszam.");
  const jazdy = wszystkie.filter(jestJazda).sort((x, y) => String(y.start_date).localeCompare(String(x.start_date)));
  console.log(`Aktywności na Stravie: ${wszystkie.length}, w tym jazd: ${jazdy.length}.`);

  // 2. Miejsca chronione — liczone za każdym razem, NIGDZIE nie zapisywane
  const chronione = miejscaChronione(wszystkie);
  console.log(`Miejsca chronione (≥${MIN_POWTORZEN} starty/końce): wyznaczone z ${chronione.length} punktów. Współrzędnych nie wypisuję.`);

  // 3. Zawodnik: masa, FTP i strefy tak, jak ustawione na Stravie (2 zapytania)
  try {
    const ja = await strava("/athlete");
    const strefy = await strava("/athlete/zones");
    const tylko = (o, k) => Object.fromEntries(k.filter((x) => o && x in o).map((x) => [x, o[x]]));
    const tekst = JSON.stringify({
      format: FORMAT, pobrano: teraz(),
      opis: "Ustawienia zawodnika na Stravie. Bez imienia, miasta i zdjęć — tylko to, co dotyczy treningu.",
      sportowiec: tylko(ja, ["id", "weight", "ftp", "measurement_preference", "premium", "summit"]),
      strefy,
    }, null, 1) + "\n";
    fs.writeFileSync(PLIK_ZAWODNIKA, tekst);
  } catch (e){
    if (e instanceof KoniecLimituDoby) throw e;
    console.log(`  (zawodnik: ${e.message.split("\n")[0]})`);
  }

  // 4. Jazdy: brakujące — szczegóły + strumienie; świeże — odśwież szczegóły
  const granica = new Date(Date.now() - ODSWIEZ_DNI * 864e5).toISOString();
  let nowe = 0, odswiezone = 0, bledy = 0, przerwano = null;
  for (const a of jazdy){
    const id = String(a.id);
    const istnieje = fs.existsSync(path.join(KATALOG_JAZD, `${id}.json`));
    const swieza = String(a.start_date) >= granica;
    if (istnieje && !PELNE && !swieza) continue;
    if ((Date.now() - start) / 60000 > LIMIT_MIN){ przerwano = `limit czasu ${LIMIT_MIN} min`; break; }
    const wirtualna = jestWirtualna(a);
    try {
      const szczegoly = await strava(`/activities/${id}?include_all_efforts=true`);
      if (!szczegoly){ console.log(`  ? ${id}: Strava nie ma już tej jazdy (404) — pomijam`); continue; }
      const aktywnosc = oczyscSzczegoly(szczegoly, chronione, wirtualna);

      if (istnieje && !PELNE){
        // strumienie się nie zmieniają; zmienia się opis, RPE, nazwa
        const stara = wczytajJazde(id);
        stara.aktywnosc = aktywnosc; stara.pobrano = teraz();
        zapiszJazde(id, stara);
        indeks.jazdy[id] = wpisIndeksu(id, stara);
        odswiezone++;
        continue;
      }

      const surowe = await strava(`/activities/${id}/streams?keys=${STRUMIENIE.join(",")}&key_by_type=true`);
      const { out: strumienie, meta } = rozpakujStrumienie(surowe);
      let ukryte = 0;
      if (strumienie.latlng && !wirtualna) ukryte = przytnijSlad(strumienie.latlng, chronione);
      const dane = {
        pobrano: teraz(),
        prywatnosc: wirtualna
          ? { opis: "Zwift: współrzędne świata gry, bez przycinania", promien_m: 0, ukryte_punkty: 0 }
          : { opis: "punkty GPS w promieniu od miejsc chronionych i od startu/końca tej jazdy = null", promien_m: PROMIEN_M, ukryte_punkty: ukryte },
        strumienie_meta: meta,
        aktywnosc,
        strumienie,
      };
      zapiszJazde(id, dane);
      const w = wpisIndeksu(id, dane);
      indeks.jazdy[id] = w;
      nowe++;
      console.log(`  + ${String(w.data).slice(0, 10)} ${w.typ} ${id}: ${w.probek} próbek, strumienie: ${w.strumienie.join(" ") || "brak"}${w.rowne_dlugosci ? "" : " — UWAGA: różne długości"}${ukryte ? `, GPS ukryty w ${ukryte} pkt` : ""}`);
    } catch (e){
      if (e instanceof KoniecLimituDoby){ przerwano = e.message; break; }
      if (e.krytyczny){ przerwano = e.message.split("\n")[0]; bledy++; break; }
      bledy++;
      console.log(`  ! ${id}: ${e.message.split("\n")[0]}`);
    }
  }

  // 5. Indeks — także po przerwaniu: zapisane jazdy muszą być w nim widoczne
  indeks.format = FORMAT;
  indeks.zaktualizowano = teraz();
  indeks.pominiete_nie_jazdy = wszystkie.filter((a) => !jestJazda(a)).length;
  zapiszIndeks(indeks);

  const brakuje = jazdy.filter((a) => !fs.existsSync(path.join(KATALOG_JAZD, `${a.id}.json`))).length;
  console.log(`\nNowe: ${nowe}, odświeżone szczegóły: ${odswiezone}, błędy: ${bledy}, zapytań: ${licznik.zapytan}` +
    `${licznik.czekano_s ? `, czekanie na limity: ${Math.round(licznik.czekano_s / 60)} min` : ""}.`);
  console.log(`W archiwum: ${Object.keys(indeks.jazdy).length} z ${jazdy.length} jazd. Brakuje: ${brakuje}.`);
  if (przerwano) console.log(`Przerwane (${przerwano}) — następny przebieg dokończy od miejsca, w którym stanął.`);
  return { nowe, odswiezone, bledy, brakuje, przerwano, zapytan: licznik.zapytan };
}

module.exports = { miejscaChronione, oczyscSzczegoly, przytnijSlad, rozpakujStrumienie, msDoKwadransa, main, STRUMIENIE };
if (require.main !== module) return;

main().catch((e) => { console.error("Błąd:", e.message); process.exit(1); });
