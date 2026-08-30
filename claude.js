// claude.js — TREŚCI PISANE PRZEZ CLAUDE'A. Osobny plik, celowo mały.
//
// ─────────────────────────────────────────────────────────────────────────────
//  INSTRUKCJA DLA CLAUDE'A W CZACIE (przeczytaj, zanim cokolwiek zmienisz)
// ─────────────────────────────────────────────────────────────────────────────
//
//  Ten plik jest JEDYNYM, do którego wolno Ci pisać w tym repozytorium.
//  Nie dotykaj `dane.js` — automat przepisuje go co noc ze Stravy i Wasze
//  zapisy by się biły. Nie dotykaj `index.html` — od zmian w kodzie jest
//  Claude Code.
//
//  Wolno Ci tu wpisywać WYŁĄCZNIE treści: zdania, komentarze, opisy.
//  NIE WOLNO: progów stref, zdobytych koszulek, ptaszków w prognozach,
//  pomiarów ani żadnych liczb, które strona traktuje jako fakt. To są decyzje
//  Fryderyka i mieszkają w `dane.js`. Jeśli poprosi Cię o zmianę któregoś —
//  powiedz, że to nie tutaj, i odeślij go do Claude Code.
//
//  ZASADY PISANIA (te same, na których stoi cała strona):
//  · Nie zgadywać. Jeśli czegoś nie ma w danych, napisz, że tego nie ma.
//  · Nie chwalić bez powodu. Fryderyk prosił o krytykę, nie o motywację.
//  · Liczby cytować tylko wtedy, gdy je widzisz. Nie „około 300 W".
//  · Po polsku, konkretnie, bez żargonu.
//
//  FORMAT — trzy bloki, każdy to zwykły słownik:
//
//    notatki[id_próby]   = "tekst"
//        id próby wyciągniesz z dane.js -> proby[].id (19 cyfr, w cudzysłowie).
//        Notatka pokazuje się pod wykresem prób w zakładce Porównania S.
//
//    analizy[id_segmentu] = { tekst: "...", data: "RRRR-MM-DD" }
//        id segmentu z dane.js -> segmenty[].id. Komentarz staje pod
//        wnioskami segmentu, podpisany datą.
//
//    jazdy[id_jazdy]     = "tekst"
//        id jazdy z dane.js -> aktywnosci[].id. To DOPISEK do jazdy: staje
//        pod opisem ze Stravy w zakładce Aktywności -> Jazda, kursywą, żeby
//        było widać, że nie napisał tego Fryderyk na Stravie.
//        UWAGA: opisu ze Stravy (pole `opis`) NIE RUSZAJ i nie kopiuj tutaj —
//        automat nadpisuje go co noc, a dublowanie go zrobiłoby z jednej myśli
//        dwie. Dopisek ma dokładać coś nowego, nie powtarzać.
//
//    teksty[klucz]        = "tekst"
//        Wolne miejsce na treści do przyszłych zakładek. Klucz uzgadniacie
//        z Fryderykiem.
//
//  Notatka wpisana tutaj wygrywa nad tą z `dane.js`, a przegrywa z tą, którą
//  Fryderyk wpisał ręcznie na stronie na swoim urządzeniu — ostatnie słowo
//  ma zawsze on.
//
//  Plik ma zostać MAŁY. Jeśli urośnie ponad kilkadziesiąt kilobajtów, powiedz
//  o tym Fryderykowi zamiast dopisywać dalej.
// ─────────────────────────────────────────────────────────────────────────────

window.CLAUDE = {

  notatki: {
  },

  jazdy: {
  },

  analizy: {
  },

  teksty: {
  }

};
