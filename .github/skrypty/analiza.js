/* Analiza AI — automat pisze komentarz trenerski do danych treningowych.
 *
 * Strona jest statyczna i nie ma jak zapytać modelu. Robi to więc serwer
 * GitHuba, raz na dobę, PO pobraniu danych ze Stravy, i zapisuje wynik do
 * analiza.js. Strona tylko go rysuje.
 *
 * ODCISK DANYCH. Przed wydaniem grosza liczymy skrót z tego, co model i tak
 * by zobaczył. Jeśli jest ten sam co poprzednio — nic się nie zmieniło, więc
 * nie ma o czym pisać: zostawiamy poprzednią analizę i nie wołamy API.
 * Dzień bez jazdy nie kosztuje ani zapytania.
 *
 * BEZ ZALEŻNOŚCI. Node ma wbudowany fetch, tak jak w pobierz-strave.js.
 * Oficjalny pakiet SDK byłby wygodniejszy, ale ten projekt trzyma zasadę
 * "zero zależności" także w automacie — biblioteka, która za dwa lata zmieni
 * API, zepsułaby coś, czego Fryderyk nie naprawi.
 *
 * MODEL NIE WSTAWIA HTML-a. Oddaje listę bloków z zamkniętego słownika,
 * a strona rysuje je sama. Tutaj każdy blok jest jeszcze raz sprawdzany:
 * nieznany typ albo złe pole wylatuje, zanim trafi do pliku.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const KORZEN = path.join(__dirname, "..", "..");
const PLIK_DANYCH = path.join(KORZEN, "dane.js");
const PLIK_WYJSCIA = path.join(KORZEN, "analiza.js");

const MODEL = "claude-opus-5";
const MAKS_TOKENOW = 16000;
const WYMUS = process.env.WYMUS_ANALIZE === "true";   // ignoruj odcisk

// ── wczytanie danych ────────────────────────────────────────────────────────
function wczytaj(){
  global.window = {};
  delete require.cache[require.resolve(PLIK_DANYCH)];
  require(PLIK_DANYCH);
  return global.window.DANE;
}
function poprzednia(){
  if (!fs.existsSync(PLIK_WYJSCIA)) return null;
  try {
    global.window = {};
    delete require.cache[require.resolve(PLIK_WYJSCIA)];
    require(PLIK_WYJSCIA);
    return global.window.ANALIZA || null;
  } catch(e){ return null; }
}

// ── briefing: co model w ogóle zobaczy ──────────────────────────────────────
// Nie wysyłamy 272 kB. Wysyłamy wyciąg: to, co widać na wykresach, plus
// decyzje i progi. Model ma widzieć TO SAMO co Fryderyk, nie więcej.
function briefing(D){
  const ROWER = new Set(D.meta.typy_kolarskie);
  const jazdy = D.aktywnosci.filter(a => ROWER.has(a.typ));
  const ost = jazdy.slice(-20).map(a => ({
    data: a.data.slice(0,16), nazwa: a.nazwa, typ: a.typ,
    km: +(a.dystans_m/1000).toFixed(1),
    min_ruchu: Math.round(a.czas_ruchu_s/60),
    min_calkowite: Math.round((a.czas_calkowity_s || a.czas_ruchu_s)/60),
    przewyzszenie_m: Math.round(a.przewyzszenie_m || 0),
    rpe: a.rpe ?? null, opis: a.opis || null
  }));

  // rekordy mocy z jazd, w których moc była mierzona
  const poId = new Map(D.aktywnosci.map(a => [a.id, a]));
  const rekordyMocy = {};
  for (const k of (D.moc_krzywe || []))
    for (const [okno, w] of Object.entries(k.w)){
      const j = poId.get(k.a);
      if (!rekordyMocy[okno] || w > rekordyMocy[okno].w)
        rekordyMocy[okno] = { w, data: j ? j.data.slice(0,10) : null,
          jazda: j ? j.nazwa : null };
    }

  // segmenty: tylko te z więcej niż jedną próbą, z trendem
  const wgSegmentu = new Map();
  for (const p of (D.proby || [])){
    if (!wgSegmentu.has(p.s)) wgSegmentu.set(p.s, []);
    wgSegmentu.get(p.s).push(p);
  }
  const segmenty = [];
  for (const [id, lista] of wgSegmentu){
    if (lista.length < 2) continue;
    const seg = (D.segmenty || []).find(s => s.id === id);
    if (!seg) continue;
    const zData = lista.map(p => ({ ...p, j: poId.get(p.a) })).filter(x => x.j)
      .sort((a,b) => a.j.data < b.j.data ? -1 : 1);
    if (zData.length < 2) continue;
    const naj = zData.reduce((a,b) => b.czas_s < a.czas_s ? b : a);
    segmenty.push({
      id, nazwa: seg.nazwa, dlugosc_m: Math.round(seg.dystans_m),
      nachylenie_proc: seg.nachylenie_proc, prob: zData.length,
      najlepszy_s: naj.czas_s, najlepszy_kiedy: naj.j.data.slice(0,10),
      ostatni_s: zData[zData.length-1].czas_s,
      ostatni_kiedy: zData[zData.length-1].j.data.slice(0,10)
    });
  }
  segmenty.sort((a,b) => b.prob - a.prob);

  // rozkłady stref, policzone tak samo jak na stronie
  const strefy = {};
  for (const miara of ["tetno","moc"]){
    const def = (D.strefy || {})[miara];
    const tab = def && def.tabele && def.tabele[def.tabele.length-1];
    if (!tab) continue;
    const sumy = new Array(tab.strefy.length).fill(0);
    for (const r of Object.values((D.strefy.rozklady || {}).jazdy || {})){
      const s = r && r[miara];
      if (Array.isArray(s) && s.length === sumy.length)
        for (let i = 0; i < sumy.length; i++) sumy[i] += s[i] || 0;
    }
    const suma = sumy.reduce((a,b) => a+b, 0);
    strefy[miara] = suma
      ? { progi: tab.strefy.map(z => `${z.nazwa} ${z.min}-${z.max ?? "∞"}`),
          udzial_proc: sumy.map(x => +(x/suma*100).toFixed(1)),
          godzin: +(suma/3600).toFixed(1) }
      : { progi: tab.strefy.map(z => `${z.nazwa} ${z.min}-${z.max ?? "∞"}`),
          uwaga: "brak pomiarów — nie ma czego liczyć" };
  }

  // krzywa formy: obciążenie = minuty × RPE, dwie średnie wykładnicze
  const K = D.stan_wytrenowania || {};
  let forma = null;
  if (K.od_daty){
    const dzien = (t) => t.slice(0,10);
    const obc = new Map();
    for (const a of jazdy)
      if (a.rpe != null && dzien(a.data) >= K.od_daty)
        obc.set(dzien(a.data), (obc.get(dzien(a.data)) || 0) + (a.czas_ruchu_s/60)*a.rpe);
    const kC = 1 - Math.exp(-1/K.ctl_dni), kA = 1 - Math.exp(-1/K.atl_dni);
    let ctl = 0, atl = 0, szczyt = 0, szczytData = null;
    const start = Date.parse(K.od_daty + "T12:00:00Z");
    const koniec = Date.parse(D.meta.pobrano.slice(0,10) + "T12:00:00Z");
    for (let t = start; t <= koniec; t += 86400000){
      const d = new Date(t).toISOString().slice(0,10);
      const l = obc.get(d) || 0;
      ctl += (l - ctl) * kC; atl += (l - atl) * kA;
      if (ctl > szczyt){ szczyt = ctl; szczytData = d; }
    }
    forma = { wytrenowanie: Math.round(ctl), zmeczenie: Math.round(atl),
      forma: Math.round(ctl - atl), szczyt: Math.round(szczyt), szczyt_data: szczytData,
      metoda: "minuty ruchu × RPE, średnie wykładnicze " + K.ctl_dni + "/" + K.atl_dni + " dni" };
  }

  // koszulki: co blisko, co zdobyte
  const koszulki = ((D.koszulki || {}).lista || []).map(k => ({
    nazwa: k.nazwa, warunek: k.warunek_opis,
    zdobyta: k.zdobyta ? k.zdobyta.data : null
  }));

  return {
    dzis: D.meta.pobrano,
    liczone_od: D.meta.liczone_od,
    jazd_wszystkich: jazdy.length,
    ostatnie_jazdy: ost,
    rekordy_mocy_W: rekordyMocy,
    masa_zawodnika_kg: (D.zalozenia.masa_zawodnika_kg || {}).v,
    ftp_deklarowane_W: ((D.prognozy || {}).ftp_biezace || {}).v,
    segmenty_najczestsze: segmenty.slice(0, 25),
    strefy,
    forma,
    kryterium: { prog_dni: D.kryterium_przerwy.prog_dni,
      wariant: D.kryterium_przerwy.wybor },
    cele: D.cele,
    prognozy: (D.prognozy || {}).okresy,
    koszulki,
    plan_objetosci: D.plan_objetosci
  };
}

// ── polecenie dla modelu ────────────────────────────────────────────────────
const SYSTEM = `Jesteś trenerem kolarskim Fryderyka (16 lat, kolarstwo szosowe,
drugi sezon). Piszesz komentarz do jego danych treningowych na stronę, którą
odwiedza codziennie. Piszesz PO POLSKU, konkretnie, bez żargonu i bez
motywacyjnych ogólników.

ZASADY, KTÓRE OBOWIĄZUJĄ NA TEJ STRONIE OD POCZĄTKU:
- Nie zgadujesz. Jeśli czegoś nie ma w danych, mówisz, że tego nie ma.
- Nie chwalisz bez powodu. Fryderyk poprosił wprost o krytykę; zachęcające
  ramowanie odbiera jako brak szacunku.
- Cytujesz wyłącznie liczby, które widzisz w danych. Żadnych "około",
  "prawdopodobnie 300 W", żadnych wartości spoza briefingu.
- Rozróżniasz pomiar od estymaty. Moc jest mierzona tylko na trenażerze;
  szosa nie ma miernika. Tętno wchodzi do danych dopiero od 1.09.2026.
- Sesje ERG na Zwifcie opisują plan treningu, nie zawodnika.
- Ma 16 lat i umysł matematyczny: wzór, podstawienie, wynik, wniosek.

ILE PISAĆ: tyle, ile się wydarzyło. Po tygodniu z czterema jazdami i nowym
rekordem — dużo, z wykresami. Po tygodniu bez jazd — kilka zdań o tym, co
to znaczy dla formy, i tyle. Nie rozciągaj pustki na trzy akapity.

ODDAJESZ WYŁĄCZNIE JSON — tablicę bloków, bez komentarza wokół, bez
markdownu, bez bloku kodu. Format:

{"bloki":[ ... ]}

Dozwolone bloki (inne zostaną wyrzucone):
{"t":"naglowek","tekst":"..."}
{"t":"akapit","tekst":"..."}
{"t":"lista","punkty":["...","..."]}
{"t":"ostrzezenie","tekst":"..."}        - czerwona ramka, na realne ryzyko
{"t":"kafelki","pozycje":[{"etykieta":"...","wartosc":"...","stopka":"..."}]}
{"t":"wykres_forma","tytul":"..."}       - wytrenowanie i zmęczenie w czasie
{"t":"wykres_moc","tytul":"..."}         - krzywa rekordów mocy
{"t":"wykres_tygodnie","tytul":"..."}    - godziny w kolejnych tygodniach
{"t":"wykres_dlugie","tytul":"..."}      - najdłuższa jazda w miesiącu
{"t":"wykres_strefy","miara":"tetno"|"moc","dni":7|30|90,"tytul":"..."}
{"t":"wykres_segment","segment":"<id z briefingu>","tytul":"..."}
{"t":"wykres_porownanie","segmenty":["<id>","<id>"],"tytul":"..."}

Wykres wstawiaj TYLKO wtedy, gdy pokazuje to, o czym właśnie piszesz.
Wykres bez zdania obok jest ozdobą, a nie argumentem. Zaczynaj od nagłówka.
W tekście nie używaj znaczników HTML — strona i tak je wyświetli jako tekst.`;

function polecenie(br, stara){
  return `Oto komplet danych treningowych Fryderyka na dziś. Napisz analizę.

${stara ? `Poprzednia analiza powstała ${stara.utworzono}. Nie powtarzaj jej
słowo w słowo — napisz to, co zmieniło się od tamtego czasu, i dopiero potem
resztę obrazu.\n\n` : ""}DANE:
${JSON.stringify(br, null, 1)}`;
}

// ── wywołanie API ───────────────────────────────────────────────────────────
async function zapytajModel(system, tresc){
  const odp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAKS_TOKENOW,
      system,
      output_config: { effort: "high" },
      messages: [{ role: "user", content: tresc }]
    })
  });
  const tekst = await odp.text();
  if (!odp.ok) throw new Error(`API odpowiedziało ${odp.status}: ${tekst.slice(0,400)}`);
  const dane = JSON.parse(tekst);
  if (dane.stop_reason === "refusal")
    throw new Error("model odmówił odpowiedzi");
  const bloki = (dane.content || []).filter(b => b.type === "text")
    .map(b => b.text).join("");
  return { bloki, uzycie: dane.usage, stop: dane.stop_reason };
}

// ── kontrola tego, co model oddał ───────────────────────────────────────────
const TYPY = {
  naglowek:    b => typeof b.tekst === "string" && b.tekst.trim(),
  akapit:      b => typeof b.tekst === "string" && b.tekst.trim(),
  ostrzezenie: b => typeof b.tekst === "string" && b.tekst.trim(),
  lista:       b => Array.isArray(b.punkty) && b.punkty.length
                    && b.punkty.every(p => typeof p === "string"),
  kafelki:     b => Array.isArray(b.pozycje) && b.pozycje.length
                    && b.pozycje.every(k => k && typeof k.etykieta === "string"),
  wykres_forma:    () => true,
  wykres_moc:      () => true,
  wykres_tygodnie: () => true,
  wykres_dlugie:   () => true,
  wykres_strefy:   b => ["tetno","moc"].includes(b.miara),
  wykres_segment:  (b, D) => (D.segmenty || []).some(s => s.id === String(b.segment)),
  wykres_porownanie: (b, D) => Array.isArray(b.segmenty) && b.segmenty.length >= 2
                    && b.segmenty.every(id => (D.segmenty || []).some(s => s.id === String(id)))
};

function sprawdz(surowe, D){
  let tekst = surowe.trim();
  // model bywa uprzejmy i opakowuje JSON w blok kodu — zdejmujemy
  const m = tekst.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) tekst = m[1].trim();
  const obj = JSON.parse(tekst);
  const lista = Array.isArray(obj) ? obj : obj.bloki;
  if (!Array.isArray(lista)) throw new Error("odpowiedź nie zawiera listy bloków");
  const dobre = [], odrzucone = [];
  for (const b of lista){
    if (!b || typeof b !== "object" || !TYPY[b.t]){ odrzucone.push(b && b.t); continue; }
    if (!TYPY[b.t](b, D)){ odrzucone.push(b.t + " (złe pola)"); continue; }
    dobre.push(b);
  }
  if (!dobre.length) throw new Error("żaden blok nie przeszedł kontroli");
  return { dobre, odrzucone };
}

// ── zapis ───────────────────────────────────────────────────────────────────
function zapisz(bloki, odcisk, D, uzycie){
  const A = {
    wersja: 1,
    utworzono: new Date().toISOString().slice(0,16),
    model: MODEL,
    jazd_w_danych: D.aktywnosci.filter(a => D.meta.typy_kolarskie.includes(a.typ)).length,
    dane_pobrano: D.meta.pobrano,
    odcisk,
    bloki
  };
  fs.writeFileSync(PLIK_WYJSCIA,
    "// analiza.js — komentarz pisany przez model, wygenerowany przez automat.\n"
    + "// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.\n"
    + "// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.\n\n"
    + "window.ANALIZA = " + JSON.stringify(A, null, 1) + ";\n", "utf8");
  console.log(`Zapisano analizę: ${bloki.length} bloków`
    + (uzycie ? `, tokeny ${uzycie.input_tokens} → ${uzycie.output_tokens}` : ""));
}

/* Wywoływane jako program przez workflow; przy `require` z innego skryptu
   udostępnia briefing i odcisk, żeby dało się policzyć DOKŁADNIE ten sam
   skrót bez powtarzania logiki w drugim miejscu (dwie kopie rozjechałyby
   się przy pierwszej zmianie briefingu). */
function odciskDanych(br){
  return crypto.createHash("sha256")
    .update(JSON.stringify(br)).digest("hex").slice(0,16);
}
module.exports = { wczytaj, briefing, odciskDanych };
if (require.main !== module) return;

(async () => {
  const D = wczytaj();
  const br = briefing(D);
  const odcisk = odciskDanych(br);
  const stara = poprzednia();

  if (stara && stara.odcisk === odcisk && !WYMUS){
    console.log("Dane bez zmian (odcisk " + odcisk + ") — analiza zostaje, "
      + "nie wołam modelu.");
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY){
    console.log("Brak ANTHROPIC_API_KEY — pomijam analizę.");
    return;
  }
  console.log(`Dane zmienione (odcisk ${stara ? stara.odcisk : "brak"} → ${odcisk}). Pytam model...`);
  const odp = await zapytajModel(SYSTEM, polecenie(br, stara));
  if (odp.stop === "max_tokens")
    console.log("  (uwaga: odpowiedź ucięta limitem tokenów)");
  const { dobre, odrzucone } = sprawdz(odp.bloki, D);
  if (odrzucone.length) console.log("  odrzucone bloki:", odrzucone.join(", "));
  zapisz(dobre, odcisk, D, odp.uzycie);
})().catch(e => {
  // Analiza jest dodatkiem: jej awaria nie może wywalić całego przebiegu ani
  // skasować poprzedniego komentarza. Zostaje to, co było.
  console.error("Analiza nie powstała: " + e.message);
  process.exit(0);
});
