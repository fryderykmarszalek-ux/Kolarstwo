// Wspólne funkcje dla obu skryptów. Zero zależności zewnętrznych —
// Node ma wbudowany fetch, więc nie ma czego instalować ani co się zepsuje.

const STRAVA = "https://www.strava.com";

async function zapytaj(url, opcje = {}){
  const odp = await fetch(url, opcje);
  const tekst = await odp.text();
  if (!odp.ok){
    // Nigdy nie wypisujemy treści żądania — mogłaby zawierać klucz.
    throw new Error(`Strava odpowiedziała ${odp.status} na ${url.split("?")[0]}\n${tekst.slice(0,300)}`);
  }
  return JSON.parse(tekst);
}

// Wymiana refresh tokenu na krótkotrwały access token. Refresh token
// Stravy nie wygasa — dlatego wystarczy zdobyć go raz.
async function swiezyToken({ clientId, clientSecret, refreshToken }){
  const dane = await zapytaj(`${STRAVA}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken
    })
  });
  return { access: dane.access_token, refresh: dane.refresh_token };
}

module.exports = { STRAVA, zapytaj, swiezyToken };
