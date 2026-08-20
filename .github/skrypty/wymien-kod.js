// JEDNORAZOWO: zamienia kod z adresu zwrotnego na refresh token.
// Uruchamiane przez workflow "Strava — pierwsze podłączenie".
// Wynik NIE jest wypisywany do logu — trafia prosto do sejfu repozytorium.

const { STRAVA, zapytaj } = require("./wspolne");

(async () => {
  const clientId     = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const kod          = process.env.STRAVA_KOD;

  if (!clientId || !clientSecret || !kod){
    console.error("Brakuje STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET albo kodu.");
    process.exit(1);
  }

  const dane = await zapytaj(`${STRAVA}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: kod,
      grant_type: "authorization_code"
    })
  });

  if (!dane.refresh_token){
    console.error("Strava nie zwróciła refresh tokenu. Kod mógł już wygasnąć albo zostać użyty.");
    process.exit(1);
  }

  // Zamaskuj w logu, zanim cokolwiek się wypisze.
  console.log(`::add-mask::${dane.refresh_token}`);
  require("fs").appendFileSync(process.env.GITHUB_OUTPUT, `refresh=${dane.refresh_token}\n`);

  console.log("Refresh token zdobyty i zamaskowany.");
  console.log("Zawodnik:", dane.athlete ? dane.athlete.id : "(brak w odpowiedzi)");
})().catch(e => { console.error(e.message); process.exit(1); });
