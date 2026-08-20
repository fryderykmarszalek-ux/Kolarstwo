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

function wczytajStare(){
  global.window = {};
  delete require.cache[require.resolve(PLIK)];
  require(PLIK);
  return global.window.DANE;
}

// Lista aktywności nie zawiera opisu — trzeba po niego osobno. Robimy to
// WYŁĄCZNIE dla jazd, których jeszcze nie mamy, żeby dzienny przebieg
// kosztował dwa-trzy zapytania zamiast stu.
async function dociagnijOpis(id, access){
  try {
    const a = await zapytaj(`${STRAVA}/api/v3/activities/${id}?include_all_efforts=false`,
      { headers: { Authorization: `Bearer ${access}` } });
    return (a.description || "").trim() || null;
  } catch (e){
    console.log(`  (nie udało się pobrać opisu ${id}: ${e.message.split("\n")[0]})`);
    return null;
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

function zapisz(D){
  const j = x => JSON.stringify(x, null, 0);
  const L = [];
  L.push("// dane.js — jedyne miejsce z danymi. Kod strony ich nie zawiera.");
  L.push("// Źródło: Strava, athlete 143761800. Wygenerowane automatycznie — nie edytować ręcznie.");
  L.push("// Wariant B: zapisujemy pomiary [Z]/[S]. Wszystko wyliczalne (prędkość, moc [E], W/kg,");
  L.push("// VAM, koszt kardiologiczny) liczy się przy wyświetlaniu, NIE tutaj.");
  L.push("");
  L.push("window.DANE = {");
  L.push("");
  L.push("meta: " + JSON.stringify(D.meta, null, 0) + ",");
  L.push("");
  L.push("zalozenia: " + JSON.stringify(D.zalozenia, null, 2) + ",");
  L.push("");
  L.push("kryterium_przerwy: " + JSON.stringify(D.kryterium_przerwy, null, 2) + ",");
  L.push("");
  L.push("plan_objetosci: [");
  for (const p of D.plan_objetosci) L.push("  " + j(p) + ",");
  L.push("],");
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

  let dociagniete = 0;
  for (const a of nowe){
    if (znaneId.has(a.id)){
      const o = opisy.get(a.id);
      if (o) a.opis = o;                       // zachowaj to, co już mamy
    } else if (TYPY_Z_OPISEM.includes(a.typ)){
      const o = await dociagnijOpis(a.id, access);
      if (o) a.opis = o;
      dociagniete++;
    }
  }
  console.log(`Nowych jazd z dociągniętym opisem: ${dociagniete}.`);

  stare.aktywnosci = nowe;
  stare.meta.pobrano = new Date().toISOString().slice(0,16);
  stare.meta.liczba_aktywnosci = nowe.length;
  stare.meta.zakres = [nowe[0].data.slice(0,10), nowe[nowe.length-1].data.slice(0,10)];

  zapisz(stare);
  console.log(`Zapisano. Było ${bylo}, jest ${nowe.length}.`);
})().catch(e => { console.error(e.message); process.exit(1); });
