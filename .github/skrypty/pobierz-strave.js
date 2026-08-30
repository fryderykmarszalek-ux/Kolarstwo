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
// 40 s siedzi tu przez prognozy: Fryderyk postawił cel na to okno, a celu,
// którego nikt nie mierzy, nie da się nigdy rozstrzygnąć. Dołożenie okna
// nie kosztuje ani jednego zapytania więcej — liczymy z tego samego strumienia.
// 3 s i 40 s siedzą tu przez cele: Fryderyk postawił na nie warunki (koszulka
// Giro sprinterska liczy się ze ŚREDNIEJ z 3 s, nie ze szczytu sekundowego,
// bo szczyt bywa artefaktem próbkowania). Celu, którego nikt nie mierzy, nie
// da się nigdy rozstrzygnąć. Nie kosztuje ani jednego zapytania więcej —
// liczymy z tego samego strumienia.
const CZASY_KRZYWEJ = [1,3,5,10,15,30,40,60,120,300,480,600,900,1200,1800,2700,3600,5400];
const PELNA_MOC = process.env.PELNA_MOC === "true";
// Rozkłady stref liczymy RAZ na jazdę i zostawiamy. Przełącznik jest wyłącznie
// na wypadek zmiany samej metody liczenia — nie na zmianę progów, bo tabela
// jest datowana i z definicji nie rusza przeszłości.
const PELNE_STREFY = process.env.PELNE_STREFY === "true";

/* ── Trasy (zakładka Teren → Mapa) ─────────────────────────────────────────
   Kształt jazdy przychodzi ZA DARMO w liście aktywności, jako
   map.summary_polyline — ten sam algorytm kodowania, którym zapisany jest
   zarys świata w swiat.js. Nie kosztuje ani jednego zapytania więcej.

   Osobny plik, nie dane.js: sto tras to grubo ponad sto kilobajtów, a zmieniają
   się tylko wtedy, gdy dojdzie nowa jazda. Wrzucone do dane.js puchłyby nocny
   diff bez powodu — dokładnie ten sam powód, dla którego osobno stoi claude.js.

   STREFA PRYWATNOŚCI. Repozytorium jest PUBLICZNE, a ślad jazdy zaczyna się
   i kończy pod domem. Dlatego każdy ślad jest przycinany: punkty w promieniu
   PROMIEN_PRYWATNOSCI_M od domu wypadają z początku i z końca. Dom nie jest
   nigdzie zapisywany — liczymy go przy każdym przebiegu z punktów startowych,
   więc do pliku trafiają wyłącznie ślady już przycięte. To ta sama ochrona,
   którą Strava nazywa strefą prywatności. */
const PLIK_PRZEBIEGOW = path.join(__dirname, "..", "..", "przebiegi.js");
const PELNE_PRZEBIEGI = process.env.PELNE_PRZEBIEGI === "true";

/* ── Przebiegi jazd (wykres w oknie Jazda) ─────────────────────────────────
   Strava oddaje prędkość, moc i tętno SEKUNDA PO SEKUNDZIE i tyle właśnie
   zapisujemy — pełne 1 Hz, bez uśredniania. Wcześniej dane były zbijane do
   kubełków po 5-10 s; Fryderyk poprosił o ciągłą sekundową średnią i ma rację,
   że przy uśrednianiu odczyt pod palcem podawał liczbę, której nie było.

   Indeks tablicy TO SEKUNDA od startu, więc postój zostaje dziurą, a nie
   zniknięciem z osi czasu. */

/* WERSJA FORMATU PRZEBIEGU. Podniesiona, gdy zmienia się to, CO liczymy —
   wtedy automat sam dobiera stare jazdy po kilkadziesiąt na przebieg, zamiast
   czekać na ręczne odpalenie z przełącznikiem.
   2 dołożyła szczyty w kubełkach, 3 wyrzuciła kubełki i zapisuje PEŁNE 1 Hz,
   4 naprawia zapis, który potrafił wyzerować pliki jazd (patrz zapiszPrzebiegi),
   5 dokłada wysokość i dystans (do nachylenia) oraz mapę indeks -> sekunda. */
const FORMAT_PRZEBIEGU = 5;

/* PLIK NA JAZDĘ, nie jeden wielki. Pełne 1 Hz dla wszystkich jazd to około
   pół megabajta i rośnie z każdym treningiem — a strona ładowałaby to przy
   każdym wejściu, na każdą zakładkę, choć potrzebuje tego wyłącznie okno
   jednej jazdy. Dlatego indeks (przebiegi.js) jest malutki i mówi tylko, co
   istnieje, a same przebiegi leżą w przebiegi/<id>.js i doczytują się dopiero
   przy otwarciu jazdy.

   Doczytujemy PRZEZ WSTAWIENIE ZNACZNIKA <script>, nie przez fetch. fetch na
   file:// jest blokowany przez CORS — to ten sam powód, dla którego dane.js
   jest skryptem, a nie .json. Znacznik script działa i lokalnie, i na Pages. */
const KATALOG_PRZEBIEGOW = path.join(__dirname, "..", "..", "przebiegi");
const BUDZET_UZUPELNIEN = 55;   // ile jazd wolno douczyć w jednym przebiegu:
                                // Strava daje 100 zapytań na 15 minut

/* Kodowanie serii: zygzak + varint na różnicach, ten sam pomysł co przy
   trasach. Wartość zapisujemy powiększoną o 1, bo ZERO jest zarezerwowane
   na „brak pomiaru" — inaczej postoju nie dałoby się odróżnić od zera watów. */
function kodujSerie(wartosci){
  let out = "", poprz = 0;
  for (const v of wartosci){
    const n = (v == null || !isFinite(v)) ? 0 : Math.max(0, Math.round(v)) + 1;
    out += kodujLiczbe(n - poprz);
    poprz = n;
  }
  return out;
}

/* Pełny zapis sekunda po sekundzie. Indeks tablicy TO SEKUNDA od startu, więc
   postój zostaje dziurą (null), a nie zniknięciem z osi czasu — jazda z 178 s
   przerwy ma te 178 pozycji pustych i wykres je pokazuje jako przerwę.

   Uśredniania już tu nie ma i nie ma po co: skoro trzymamy każdą sekundę,
   szczyt jest po prostu jedną z nich. Osobne pole na maksimum w kubełku
   (format 2) przestało być potrzebne. */
function przebiegJazdy(str){
  if (!str) return null;
  const czas = str.czas;
  const dlugosc = Math.max(str.watts ? str.watts.length : 0,
                           str.hr ? str.hr.length : 0,
                           str.v ? str.v.length : 0);
  if (!dlugosc) return null;
  const t = (i) => (czas && czas[i] != null) ? czas[i] : i;   // bez osi czasu: 1 Hz
  const koniec = t(dlugosc - 1);
  if (!(koniec > 0) || koniec > 200000) return null;          // zapora na absurd
  const n = koniec + 1;

  const pusta = () => new Array(n).fill(null);
  const v = str.v ? pusta() : null;
  const w = str.watts ? pusta() : null;
  const h = str.hr ? pusta() : null;
  const y = str.alt ? pusta() : null;      // wysokość w decymetrach
  const dl = str.dys ? pusta() : null;     // dystans od startu w metrach
  // Indeks w strumieniu -> sekunda. Potrzebny, żeby próba na segmencie
  // (start_index/end_index) trafiła w tę samą oś, po której idzie wykres.
  const naSekunde = new Array(dlugosc).fill(null);
  for (let i = 0; i < dlugosc; i++){
    const k = t(i);
    if (k < 0 || k >= n) continue;
    naSekunde[i] = k;
    if (v && str.v[i] != null) v[k] = str.v[i] * 3.6 * 10;   // 0,1 km/h
    if (w && str.watts[i] != null) w[k] = str.watts[i];
    if (h && str.hr[i] != null) h[k] = str.hr[i];
    // Wysokość bywa ujemna (depresje, błąd barometru), a kodowanie nie zna
    // liczb ujemnych — przesuwamy o 1000 m i odejmujemy przy odczycie.
    if (y && str.alt[i] != null) y[k] = (str.alt[i] + 1000) * 10;
    if (dl && str.dys[i] != null) dl[k] = str.dys[i];
  }
  const jest = (a) => a && a.some(x => x != null);
  if (!jest(v) && !jest(w) && !jest(h) && !jest(y)) return null;
  return {
    f: FORMAT_PRZEBIEGU, n,
    ...(jest(v) ? { v: kodujSerie(v) } : {}),
    ...(jest(w) ? { w: kodujSerie(w) } : {}),
    ...(jest(h) ? { h: kodujSerie(h) } : {}),
    ...(jest(y) ? { y: kodujSerie(y) } : {}),
    ...(jest(dl) ? { d: kodujSerie(dl) } : {}),
    // Mapa indeks strumienia -> sekunda. Gdy oś czasu jest ciągła, jest to
    // po prostu tożsamość i wtedy jej nie zapisujemy.
    ...(naSekunde.some((k, i) => k !== i) ? { i: kodujSerie(naSekunde) } : {})
  };
}

function wczytajPrzebiegi(){
  if (!fs.existsSync(PLIK_PRZEBIEGOW)) return {};
  try {
    global.window = {};
    delete require.cache[require.resolve(PLIK_PRZEBIEGOW)];
    require(PLIK_PRZEBIEGOW);
    const idx = (global.window.PRZEBIEGI || {}).jazdy || {};
    // Indeks nie niesie serii — do decyzji „czy przeliczyć" wystarczy nam
    // wersja formatu, a to w indeksie jest.
    return idx;
  } catch (e){ return {}; }
}

/* Indeks: co istnieje i jak długie. Strona ładuje go zawsze (jest malutki),
   a sam przebieg dopiero przy otwarciu konkretnej jazdy. */
/* PISZEMY WYŁĄCZNIE TO, CO POLICZYLIŚMY W TYM PRZEBIEGU.

   Pierwsza wersja tej funkcji brała `przebiegi` za komplet pełnych danych —
   i przy drugim przebiegu automatu NADPISAŁA pliki 55 jazd samym wpisem
   z indeksu, czyli {f, n, ma} bez ani jednej serii. Powód: wczytajPrzebiegi()
   czyta INDEKS (bo tylko on jest w przebiegi.js), więc wpisy jazd, których ten
   przebieg nie przeliczał, były w pamięci wydmuszkami. Zapis ich nie odróżniał.

   Teraz pliki powstają tylko dla jazd świeżo policzonych; reszta zostaje
   nietknięta na dysku, a indeks składa się z obu części. */
function zapiszPrzebiegi(przebiegi, sweze, pobrano){
  fs.mkdirSync(KATALOG_PRZEBIEGOW, { recursive: true });
  const idy = Object.keys(przebiegi).sort();

  let zapisanych = 0;
  for (const [id, p] of sweze){
    if (!p || (!p.v && !p.w && !p.h)) continue;    // zapora: nigdy pustego pliku
    const plik = path.join(KATALOG_PRZEBIEGOW, id + ".js");
    const tresc = "// Przebieg jazdy " + id + " — sekunda po sekundzie.\n"
      + "// PLIK GENEROWANY. Doczytywany przez stronę dopiero przy otwarciu tej jazdy.\n"
      + "window.PRZEBIEGI_DANE = window.PRZEBIEGI_DANE || {};\n"
      + "window.PRZEBIEGI_DANE[" + JSON.stringify(id) + "] = "
      + JSON.stringify(p) + ";\n";
    let bylo = null;
    try { bylo = fs.readFileSync(plik, "utf8"); } catch(e){}
    if (bylo !== tresc){ fs.writeFileSync(plik, tresc, "utf8"); zapisanych++; }
  }
  // pliki jazd skasowanych na Stravie
  try {
    for (const nazwa of fs.readdirSync(KATALOG_PRZEBIEGOW)){
      if (!nazwa.endsWith(".js")) continue;
      if (!przebiegi[nazwa.slice(0, -3)])
        fs.unlinkSync(path.join(KATALOG_PRZEBIEGOW, nazwa));
    }
  } catch(e){}

  const L = [];
  L.push("// przebiegi.js — INDEKS przebiegów, nie same dane.");
  L.push("// PLIK GENEROWANY przez .github/skrypty/pobierz-strave.js — nie edytować ręcznie.");
  L.push("//");
  L.push("// Same przebiegi leżą w przebiegi/<id>.js i doczytują się dopiero przy");
  L.push("// otwarciu danej jazdy. Pełne 1 Hz dla wszystkich jazd to pół megabajta");
  L.push("// i rośnie z każdym treningiem — strona nie ma po co ładować tego przy");
  L.push("// każdym wejściu, skoro potrzebuje tego wyłącznie okno jednej jazdy.");
  L.push("//");
  L.push("// n = liczba sekund, ma = które serie są w pliku (v prędkość, w moc, h tętno).");
  L.push("");
  L.push("window.PRZEBIEGI = {");
  L.push(' "wersja": ' + FORMAT_PRZEBIEGU + ",");
  L.push(' "policzono": ' + JSON.stringify(pobrano) + ",");
  L.push(' "jazdy": {');
  const SERIE = ["v","w","h","y","d"];
  L.push(idy.map(id => {
    const p = przebiegi[id];
    // Świeżo policzone mają serie w pamięci. Wpisy przeniesione z poprzedniego
    // indeksu mają tylko etykietę — a ta potrafi być nieaktualna, gdy doszedł
    // nowy rodzaj serii. Dlatego wtedy czytamy ją z PLIKU, który jest jedynym
    // miejscem, gdzie stoi prawda o zawartości.
    let ma;
    if (SERIE.some(k => p[k])) ma = SERIE.filter(k => p[k]).join("");
    else {
      try {
        const t = fs.readFileSync(path.join(KATALOG_PRZEBIEGOW, id + ".js"), "utf8");
        ma = SERIE.filter(k => t.includes('"' + k + '":"')).join("");
      } catch(e){ ma = p.ma || ""; }
    }
    return `  ${JSON.stringify(id)}: {"f":${p.f},"n":${p.n},"ma":${JSON.stringify(ma)}}`;
  }).join(",\n"));
  L.push(" }");
  L.push("};");
  fs.writeFileSync(PLIK_PRZEBIEGOW, L.join("\n") + "\n", "utf8");
  if (zapisanych) console.log(`  (zapisano ${zapisanych} plików przebiegów)`);
}

const PLIK_TRAS = path.join(__dirname, "..", "..", "trasy.js");
const PELNE_TRASY = process.env.PELNE_TRASY === "true";
const PROMIEN_PRYWATNOSCI_M = 500;

function wczytajTrasy(){
  if (!fs.existsSync(PLIK_TRAS)) return {};
  try {
    global.window = {};
    delete require.cache[require.resolve(PLIK_TRAS)];
    require(PLIK_TRAS);
    return (global.window.TRASY || {}).slady || {};
  } catch (e){ return {}; }
}

function dekodujTrase(s){
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

function kodujLiczbe(v){
  v = v < 0 ? ~(v << 1) : (v << 1);
  let out = "";
  while (v >= 0x20){ out += String.fromCharCode((0x20 | (v & 0x1f)) + 63); v >>= 5; }
  return out + String.fromCharCode(v + 63);
}

function kodujTrase(punkty){
  let out = "", pla = 0, plo = 0;
  for (const [lat, lng] of punkty){
    const la = Math.round(lat * 1e5), lo = Math.round(lng * 1e5);
    out += kodujLiczbe(la - pla) + kodujLiczbe(lo - plo);
    pla = la; plo = lo;
  }
  return out;
}

// Przybliżenie płaskie — na dystansie kilkuset metrów różnica wobec wzoru
// haversine jest poniżej metra, a chodzi o próg 500 m.
function metry(a, b){
  const dLat = (a[0] - b[0]) * 111320;
  const dLng = (a[1] - b[1]) * 111320 * Math.cos(a[0] * Math.PI / 180);
  return Math.hypot(dLat, dLng);
}

/* Dom = punkt startowy, wokół którego gęsto stoją inne punkty startowe.
   Nie średnia: jeden wyjazd do Francji przesunąłby średnią o setki kilometrów
   i strefa prywatności wylądowałaby w polu pod Paryżem. */
function znajdzDom(slady){
  const starty = Object.values(slady).map(s => dekodujTrase(s)[0]).filter(Boolean);
  if (starty.length < 3) return null;
  let naj = null, najIle = 0;
  for (const p of starty){
    const ile = starty.filter(q => metry(p, q) < PROMIEN_PRYWATNOSCI_M * 2).length;
    if (ile > najIle){ najIle = ile; naj = p; }
  }
  return najIle >= 3 ? naj : null;    // mniej niż trzy starty w kupie to nie dom
}

function utnijPrywatne(slad, dom){
  if (!dom) return slad;
  const p = dekodujTrase(slad);
  let a = 0, b = p.length - 1;
  while (a <= b && metry(p[a], dom) < PROMIEN_PRYWATNOSCI_M) a++;
  while (b >= a && metry(p[b], dom) < PROMIEN_PRYWATNOSCI_M) b--;
  const wynik = p.slice(a, b + 1);
  return wynik.length >= 2 ? kodujTrase(wynik) : null;   // cała jazda pod domem
}

function zapiszTrasy(slady, dom, meta){
  const idy = Object.keys(slady).sort();
  const L = [];
  L.push("// trasy.js — kształty przejechanych jazd, do zakładki Teren → Mapa.");
  L.push("// Źródło: Strava, pole map.summary_polyline z listy aktywności.");
  L.push("// PLIK GENEROWANY przez .github/skrypty/pobierz-strave.js — nie edytować ręcznie.");
  L.push("//");
  L.push("// Ślady są PRZYCIĘTE: punkty w promieniu " + PROMIEN_PRYWATNOSCI_M + " m od domu");
  L.push("// wypadają z początku i końca każdej jazdy, bo to repozytorium jest publiczne.");
  L.push("// Samego punktu domowego nie ma w tym pliku ani nigdzie indziej w repo.");
  L.push("//");
  L.push("// Kodowanie: Google encoded polyline, mnożnik 100000 — ten sam algorytm,");
  L.push("// co w swiat.js, tam tylko z mnożnikiem 100.");
  L.push("");
  L.push("window.TRASY = {");
  L.push(' "wersja": 1,');
  L.push(' "przycinanie_m": ' + PROMIEN_PRYWATNOSCI_M + ',');
  L.push(' "z_domem": ' + (dom ? "true" : "false") + ",");
  L.push(' "policzono": ' + JSON.stringify(meta.pobrano) + ",");
  L.push(' "slady": {');
  L.push(idy.map(id => `  ${JSON.stringify(id)}: ${JSON.stringify(slady[id])}`).join(",\n"));
  L.push(" }");
  L.push("};");
  fs.writeFileSync(PLIK_TRAS, L.join("\n") + "\n", "utf8");
}

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

// Jedno zapytanie po oba strumienie: waty do krzywej mocy, tętno do rozkładu
// stref. Pytanie o nie osobno kosztowałoby dwa razy tyle, a przychodzą razem.
async function dociagnijStrumienie(id, access){
  try {
    const s = await zapytaj(
      `${STRAVA}/api/v3/activities/${id}/streams?keys=time,watts,heartrate,velocity_smooth,altitude,distance&key_by_type=true`,
      { headers: { Authorization: `Bearer ${access}` } });
    if (!s) return null;
    const watts = s.watts && s.watts.data ? s.watts.data : null;
    const hr = s.heartrate && s.heartrate.data ? s.heartrate.data : null;
    // velocity_smooth przychodzi w metrach na sekundę i NIC nie kosztuje —
    // leci tym samym zapytaniem co waty i tętno.
    const v = s.velocity_smooth && s.velocity_smooth.data ? s.velocity_smooth.data : null;
    // Wysokość i dystans: z nich liczy się NACHYLENIE na wykresie segmentu.
    // Nachylenia nie zapisujemy — to wielkość wyliczalna, a wariant B każe
    // trzymać pomiary. Ten sam adres, to samo zapytanie, zero kosztu.
    const alt = s.altitude && s.altitude.data ? s.altitude.data : null;
    const dys = s.distance && s.distance.data ? s.distance.data : null;
    if (!watts && !hr && !v && !alt) return null;
    return { watts, hr, v, alt, dys, czas: s.time && s.time.data ? s.time.data : null };
  } catch (e){
    console.log(`  (nie udało się pobrać strumieni ${id}: ${e.message.split("\n")[0]})`);
    return undefined;
  }
}

/* ── Czas w strefach ───────────────────────────────────────────────────────
   Reguła klasyfikacji MUSI być identyczna z tą na stronie: wartość trafia do
   pierwszej strefy, której górny próg jest od niej nie mniejszy; ostatnia
   strefa (max = null) łapie całą resztę. Dzięki temu żadna sekunda nie ginie —
   ani tętno 90 poniżej pierwszego progu, ani sprint 1000 W powyżej ostatniego.

   Tabela progów jest DATOWANA: bierzemy tę, która obowiązywała W DNIU JAZDY,
   i zapisujemy przy wyniku, której użyliśmy. Rozkład raz policzony zostaje na
   zawsze — zmiana progów w listopadzie nie rusza jazd z września. */
const MAKS_ODSTEP_S = 10;   // dłuższa dziura w zapisie to postój, nie jazda

function ktoraStrefa(v, strefy){
  for (let i = 0; i < strefy.length; i++){
    const gora = strefy[i].max;
    if (gora == null || v <= gora) return i;
  }
  return strefy.length - 1;
}

function tabelaNaDzien(tabele, data){
  if (!tabele || !tabele.length) return null;
  let wynik = tabele[0];
  for (const t of tabele) if (t.od <= data) wynik = t;
  return wynik;                       // jazda starsza od wszystkich tabel bierze najstarszą
}

function czasWStrefach(wartosci, czas, strefy){
  if (!wartosci || !wartosci.length || !strefy || !strefy.length) return null;
  const sek = new Array(strefy.length).fill(0);
  const maOs = czas && czas.length === wartosci.length;
  for (let i = 0; i < wartosci.length; i++){
    const v = wartosci[i];
    if (v == null) continue;           // brak pomiaru nie jest zerem
    let dt = 1;
    if (maOs && i + 1 < czas.length)
      dt = Math.max(0, Math.min(MAKS_ODSTEP_S, czas[i+1] - czas[i]));
    sek[ktoraStrefa(v, strefy)] += dt;
  }
  const suma = sek.reduce((a,b) => a+b, 0);
  return suma > 0 ? sek.map(x => Math.round(x)) : null;
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
      // Gdzie ten przejazd LEŻY w strumieniu jazdy. Bez tych dwóch liczb nie
      // da się wyciąć z przebiegu jazdy kawałka odpowiadającego segmentowi,
      // a to jest cały sens zakładki Aktywności -> Segment. Przychodzą w tej
      // samej odpowiedzi co reszta przejazdu, więc nie kosztują nic.
      od: e.start_index != null ? e.start_index : null,
      do: e.end_index != null ? e.end_index : null,
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
    nazwa: a.name,
    // Fakt ze Stravy, nie domysł: mówi, czy w ogóle warto pytać o strumień
    // tętna. Bez niego pytalibyśmy o każdą jazdę albo o żadną.
    ...(a.has_heartrate === true ? { ma_tetno: 1 } : {}),

    // Średnie z jazdy — przychodzą w liście aktywności, więc nie kosztują ani
    // jednego zapytania więcej. Tętno jest pomiarem zawsze: bez pasa Strava
    // po prostu go nie przysyła.
    ...(a.average_heartrate != null
      ? { tetno_sr: Math.round(a.average_heartrate) } : {}),

    // MOC WYŁĄCZNIE ZMIERZONA. average_watts przy braku miernika to estymata
    // Stravy [S] — w tabeli wygląda dokładnie tak samo jak pomiar, a nie ma
    // dziś czym jej sprawdzić. Ta sama zasada, co w kolumnie mocy przy
    // segmentach; kolumna wypełni się sama w dniu kupna miernika.
    ...(a.device_watts === true && a.average_watts != null
      ? { moc_sr: Math.round(a.average_watts), z_miernika: 1 } : {})
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

/* Jako program robi przebieg; przy `require` z testu udostępnia same funkcje.
   Ta sama sztuczka co w analiza.js — pozwala sprawdzić przycinanie strefą
   prywatności bez sieci i bez drugiej kopii logiki. */
module.exports = { dekodujTrase, kodujTrase, metry, znajdzDom, utnijPrywatne,
  przebiegJazdy, kodujSerie, zapiszPrzebiegi,
  krzywaMocy, czasWStrefach, ktoraStrefa, tabelaNaDzien };
if (require.main !== module) return;

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

  /* Ślady z listy aktywności — za darmo, przy każdym przebiegu, dla wszystkich
     jazd. Dzięki temu przycinanie liczy się zawsze na surowych danych: gdyby
     źródłem był plik trasy.js, w którym ślady są już ucięte, drugi przebieg
     szukałby domu w pierścieniu wokół dziury, a nie w punkcie. */
  const surowe = new Map();
  for (const a of zeStravy){
    const linia = a.map && (a.map.summary_polyline || a.map.polyline);
    if (linia) surowe.set(String(a.id), linia);
  }
  const trasyStare = wczytajTrasy();
  const przebiegi = wczytajPrzebiegi();
  const swezePrzebiegi = new Map();     // wyłącznie to, co policzone w TYM przebiegu
  for (const id of Object.keys(przebiegi))
    if (!zeStravy.some(a => String(a.id) === id)) delete przebiegi[id];
  // Backfill kosztuje po jednym zapytaniu na jazdę, więc rozkładamy go na
  // kilka przebiegów zamiast wpaść w limit Stravy (100 na 15 minut).
  let budzet = BUDZET_UZUPELNIEN;

  const opisy = new Map(stare.aktywnosci.map(a => [a.id, a.opis]));
  // RPE (perceived_exertion) — jak opis: nie ma go w liście aktywności,
  // przychodzi dopiero ze szczegółami jazdy. Przy braku pomiaru mocy i tętna
  // jest najlepszą dostępną miarą wysiłku, więc nie wolno go zgubić przy
  // przebiegu, który akurat nie pyta o tę jazdę.
  const rpeStare = new Map(stare.aktywnosci.map(a => [a.id, a.rpe]));
  const kaloriStare = new Map(stare.aktywnosci.map(a => [a.id, a.kalorie]));
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
  // Rozkłady stref: co już policzone, zostaje. Blok mógł jeszcze nie istnieć.
  stare.strefy = stare.strefy || {};
  stare.strefy.rozklady = stare.strefy.rozklady || { jazdy: {} };
  stare.strefy.rozklady.jazdy = stare.strefy.rozklady.jazdy || {};
  const rozklady = stare.strefy.rozklady.jazdy;
  for (const id of Object.keys(rozklady)) if (!wszystkieId.has(id)) delete rozklady[id];
  let nowychRozkladow = 0;
  const segmenty = new Map((stare.segmenty || []).map(x => [x.id, x]));

  let zapytan = 0, zmienionych = 0, nowychProb = 0, nowychPrzebiegow = 0;
  for (const a of nowe){
    const znana    = znaneId.has(a.id);
    const stary    = opisy.get(a.id);
    const kolarska = TYPY_Z_OPISEM.includes(a.typ);
    const swieza   = a.data.slice(0,10) >= granica;

    const chceOpis = kolarska && (!znana || swieza || PELNE_OPISY);
    // Próby zapisane przed 30.08.2026 nie mają start_index/end_index — bez nich
    // nie da się wyciąć segmentu z przebiegu. Dociągamy je ponownie, ale
    // z budżetem, żeby nie wpaść w limit Stravy przy 61 jazdach naraz.
    const probyBezIndeksow = proby.some(x => x.a === a.id && x.od == null);
    const chceSegmenty = kolarska && a.data.slice(0,10) >= SEGMENTY_OD
      && (!jazdyZeSegmentami.has(a.id) || PELNE_SEGMENTY
          || (probyBezIndeksow && budzet > 0));

    const staryRpe = rpeStare.get(a.id);

    // Czy ta jazda MOŻE mieć moc z pomiaru — bez wydawania na to zapytania.
    // Zwift zawsze podaje waty z trenażera, a przy szosie wystarczy zajrzeć
    // do prób na segmentach: jeśli któraś ma z_miernika, to miernik był.
    // Dzięki temu dzień po kupnie miernika szosa wejdzie tu sama.
    const mocMozliwa = a.typ === "VirtualRide"
      || proby.some(x => x.a === a.id && x.z_miernika === 1);
    let chceMoc = mocMozliwa && (!mocPobrana.has(a.id) || PELNA_MOC);

    // Rozkład stref: potrzebny, gdy jazda ma tętno albo moc, a jeszcze go nie
    // policzyliśmy. Tętno wchodzi tu samo, w dniu w którym Strava je zapisze.
    // Ślad z listy zwykle jest. Gdy go nie ma, można go wziąć ze szczegółów
    // jazdy — ale tylko na żądanie, bo to jedno zapytanie na jazdę.
    const chceTrase = kolarska && PELNE_TRASY && !surowe.has(a.id);

    const strefyMozliwe = kolarska && (a.ma_tetno === 1 || mocMozliwa);
    let chceStrefy = strefyMozliwe && (!rozklady[a.id] || PELNE_STREFY);
    if (chceStrefy) chceMoc = chceMoc || mocMozliwa;   // i tak pytamy o strumień

    // Przebieg jazdy: potrzebny KAŻDEJ jeździe, nie tylko tej z mocą — sama
    // prędkość w czasie jest już wykresem. Strumień to jedno zapytanie, więc
    // dociągamy z budżetem i resztę dobierze następny przebieg automatu.
    const chcePrzebieg = kolarska && budzet > 0
      && (!przebiegi[a.id] || (przebiegi[a.id].f || 1) < FORMAT_PRZEBIEGU
          || PELNE_PRZEBIEGI);

    // Kalorie są WYŁĄCZNIE w szczegółach jazdy — nie ma ich w liście. Strava
    // liczy je z mocy albo z własnego modelu; to jej liczba, nie nasza.
    const chceKalorie = kolarska && a.kalorie == null
      && kaloriStare.get(a.id) == null && budzet > 0;

    if (!chceOpis && !chceSegmenty && !chceMoc && !chceStrefy && !chceTrase
        && !chcePrzebieg && !chceKalorie){
      if (stary) a.opis = stary;               // nic do pytania — zachowaj, co mamy
      if (staryRpe != null) a.rpe = staryRpe;
      if (kaloriStare.get(a.id) != null) a.kalorie = kaloriStare.get(a.id);
      continue;
    }
    if (kaloriStare.get(a.id) != null) a.kalorie = kaloriStare.get(a.id);

    // Szczegółów nie pobieramy dla samej mocy — strumień jest osobnym adresem.
    const pytamOSzczegoly = chceOpis || chceSegmenty || chceTrase || chceKalorie;
    const jazda = pytamOSzczegoly
      ? await dociagnijJazde(a.id, access, chceSegmenty) : null;
    if (pytamOSzczegoly){ zapytan++; if (chceKalorie) budzet--; }

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

    if (jazda && jazda.map){
      const linia = jazda.map.polyline || jazda.map.summary_polyline;
      if (linia && !surowe.has(a.id)) surowe.set(a.id, linia);
    }

    // Strava jest masterem również tutaj: skasowany RPE znika też u nas.
    if (jazda && jazda.perceived_exertion != null) a.rpe = jazda.perceived_exertion;
    if (jazda && jazda.calories != null) a.kalorie = Math.round(jazda.calories);

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

    if (chceMoc || chceStrefy || chcePrzebieg){
      const str = await dociagnijStrumienie(a.id, access);
      zapytan++;
      if (chcePrzebieg) budzet--;
      if (chcePrzebieg && str !== undefined){
        const p = przebiegJazdy(str);
        if (p){
          przebiegi[a.id] = p;
          swezePrzebiegi.set(a.id, p);
          nowychPrzebiegow++;
          console.log(`  przebieg: ${a.data.slice(0,10)} ${a.nazwa} — `
            + `${p.n} s`
            + `${p.v ? ", prędkość" : ""}${p.w ? ", moc" : ""}${p.h ? ", tętno" : ""}`);
        }
      }
      if (str !== undefined){
        if (chceMoc){
          mocPobrana.add(a.id);
          const k = str && str.watts ? krzywaMocy(str.watts, str.czas) : null;
          for (let i = krzywe.length - 1; i >= 0; i--)
            if (krzywe[i].a === a.id) krzywe.splice(i, 1);
          if (k){
            krzywe.push({ a: a.id, w: k });
            console.log(`  krzywa mocy: ${a.data.slice(0,10)} ${a.nazwa} — `
              + `${Object.keys(k).length} okien, szczyt ${Math.max(...Object.values(k))} W`);
          }
        }
        if (chceStrefy && str){
          const dzien = a.data.slice(0,10);
          const tabT = tabelaNaDzien(((stare.strefy || {}).tetno || {}).tabele, dzien);
          const tabM = tabelaNaDzien(((stare.strefy || {}).moc || {}).tabele, dzien);
          const wT = tabT && str.hr ? czasWStrefach(str.hr, str.czas, tabT.strefy) : null;
          const wM = tabM && str.watts ? czasWStrefach(str.watts, str.czas, tabM.strefy) : null;
          if (wT || wM){
            rozklady[a.id] = {
              tetno: wT, moc: wM,
              tabela_tetno: wT ? tabT.od : null,
              tabela_moc: wM ? tabM.od : null
            };
            nowychRozkladow++;
            const opisT = wT ? `tętno ${Math.round(wT.reduce((x,y)=>x+y,0)/60)} min` : "";
            const opisM = wM ? `moc ${Math.round(wM.reduce((x,y)=>x+y,0)/60)} min` : "";
            console.log(`  strefy: ${dzien} ${a.nazwa} — ${[opisT,opisM].filter(Boolean).join(", ")}`);
          }
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
    + `Prób na segmentach dociągniętych: ${nowychProb}. `
    + `Rozkładów stref policzonych: ${nowychRozkladow}.`);

  /* Ślady: dom liczony z surowych startów, potem przycięcie, potem zapis.
     Jazdy, dla których lista nie dała śladu, biorą to, co już leżało w pliku —
     tamto jest przycięte od dawna, więc drugi raz go nie tniemy. */
  const ROWEROWE = new Set(stare.meta.typy_kolarskie || ["Ride","VirtualRide"]);
  const doPrzyciecia = {};
  for (const a of nowe)
    if (ROWEROWE.has(a.typ) && surowe.has(a.id)) doPrzyciecia[a.id] = surowe.get(a.id);
  const dom = znajdzDom(doPrzyciecia);

  const trasy = {};
  let uciete = 0;
  for (const a of nowe){
    if (!ROWEROWE.has(a.typ)) continue;
    if (doPrzyciecia[a.id]){
      const t = utnijPrywatne(doPrzyciecia[a.id], dom);
      if (t){ trasy[a.id] = t; if (t !== doPrzyciecia[a.id]) uciete++; }
    } else if (trasyStare[a.id]){
      trasy[a.id] = trasyStare[a.id];
    }
  }
  const skrotIndeksu = (o) => JSON.stringify(Object.keys(o).sort()
    .map(id => [id, o[id].f, o[id].n]));
  if (skrotIndeksu(przebiegi) !== skrotIndeksu(wczytajPrzebiegi()) || nowychPrzebiegow){
    zapiszPrzebiegi(przebiegi, swezePrzebiegi, new Date().toISOString().slice(0,16));
    console.log(`Przebiegi: ${Object.keys(przebiegi).length} jazd `
      + `(+${nowychPrzebiegow} w tym przebiegu).`);
  } else {
    console.log(`Przebiegi: ${Object.keys(przebiegi).length} jazd, bez zmian.`);
  }
  const brakuje = nowe.filter(a => ROWEROWE.has(a.typ)
    && (!przebiegi[a.id] || (przebiegi[a.id].f || 1) < FORMAT_PRZEBIEGU)).length;
  if (brakuje) console.log(`  (${brakuje} jazd bez przebiegu — dobiorę je `
    + `w kolejnych przebiegach, żeby nie przekroczyć limitu zapytań Stravy)`);
  stare.meta.jazd_z_przebiegiem = Object.keys(przebiegi).length;

  const bylyTrasy = JSON.stringify(trasyStare);
  if (JSON.stringify(trasy) !== bylyTrasy){
    zapiszTrasy(trasy, dom, { pobrano: new Date().toISOString().slice(0,16) });
    console.log(`Trasy: ${Object.keys(trasy).length} śladów`
      + (dom ? `, ${uciete} przyciętych strefą prywatności ${PROMIEN_PRYWATNOSCI_M} m`
             : ", BEZ przycinania — nie udało się wyznaczyć domu"));
  } else {
    console.log(`Trasy: ${Object.keys(trasy).length} śladów, bez zmian.`);
  }
  stare.meta.jazd_z_trasa = Object.keys(trasy).length;

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
  stare.meta.jazd_z_rozkladem = Object.keys(stare.strefy.rozklady.jazdy).length;
  stare.meta.zakres = [nowe[0].data.slice(0,10), nowe[nowe.length-1].data.slice(0,10)];

  zapisz(stare);
  console.log(`Zapisano. Było ${bylo}, jest ${nowe.length}.`);
})().catch(e => { console.error(e.message); process.exit(1); });
