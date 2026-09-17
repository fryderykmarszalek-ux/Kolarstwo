// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 17.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-17T20:05",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 92,
 "dane_pobrano": "2026-09-17T17:49",
 "odcisk": "1d499da5f58f1b30",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Test FTP: 174 W. Jedenaście rekordów mocy w jednej jeździe"
  },
  {
   "t": "akapit",
   "tekst": "„Zwift - FTP Test [Standard]”: 21,9 km w 45 minut, moc średnia 134 W, tętno średnie 163, RPE 9. To pierwsza jazda z miernikiem od 25 listopada 2025, czyli po 296 dniach przerwy w pomiarach mocy — i od razu test progowy. Przez ostatni miesiąc pisałem w kółko, że cała Twoja krzywa mocy jest historią z jesieni 2025 i że nie ma czym zmierzyć dzisiejszej formy. To zdanie właśnie się zdezaktualizowało."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "FTP z testu",
     "wartosc": "174 W",
     "stopka": "2,48 W/kg"
    },
    {
     "etykieta": "20 minut",
     "wartosc": "183 W",
     "stopka": "było 148 · +24%"
    },
    {
     "etykieta": "Nowe rekordy",
     "wartosc": "11",
     "stopka": "z 16 okien"
    },
    {
     "etykieta": "Tętno maks.",
     "wartosc": "195",
     "stopka": "na trenażerze"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Skąd 174 i dlaczego ta liczba jest wiarygodna"
  },
  {
   "t": "akapit",
   "tekst": "Protokół standardowy liczy FTP jako 0,95 razy moc z dwudziestu minut na maksa. Twoje dwadzieścia minut to 183 W, więc 0,95 × 183 = 173,8, w zaokrągleniu 174 W. Sprawdziłem przebieg sekunda po sekundzie i test wygląda dokładnie tak, jak powinien: dziesięć minut rozgrzewki, pięciominutowy otwieracz przy 165–179 W, sześć minut zejścia na 75 W, a potem od 20. do 40. minuty równy blok."
  },
  {
   "t": "lista",
   "punkty": [
    "Pierwsze pięć minut bloku: 176,5 W średnio",
    "Ostatnie pięć minut: 200,7 W — przyspieszyłeś na końcu, co jest poprawnym rozegraniem testu",
    "Tętno w bloku: start 140, koniec 192, średnio 181",
    "Szczyt jazdy: 461 W w 39. minucie, czyli finisz",
    "Zmienność mocy w całej jeździe (VI) 1,19 — to test, nie jazda ERG"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Jedna uczciwa uwaga do tej liczby. Same czyste osiemnaście minut, bez końcowego przyspieszenia, dają 178 W, czyli FTP 169. Różnica pięciu watów bierze się z tego, że finisz wjeżdża do średniej. Protokół standardowy liczy całe dwadzieścia minut i tak zostawiam — ale wiedz, że Twój prawdziwy próg leży raczej w przedziale 169–174 niż dokładnie na 174."
  },
  {
   "t": "naglowek",
   "tekst": "Jedenaście rekordów i jeden pozorny spadek"
  },
  {
   "t": "akapit",
   "tekst": "Każde okno od 30 sekund do 45 minut jest dziś nowym rekordem. Poprzednie pochodziły z wyścigu na Zwifcie z 18 października 2025 i stały nietknięte przez jedenaście miesięcy."
  },
  {
   "t": "lista",
   "punkty": [
    "40 s — 278 W, było 237, o 41 W lepiej",
    "1 min — 263 W, było 210, o 53 W lepiej",
    "2 min — 228 W, było 184, o 44 W lepiej",
    "5 min — 202 W, było 172, o 30 W lepiej",
    "10 min — 190 W, było 157, o 33 W lepiej",
    "20 min — 183 W, było 148, o 35 W lepiej (+23,6%)",
    "30 min — 160 W, było 143, o 17 W lepiej",
    "45 min — 134 W, było 116, o 18 W lepiej"
   ]
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — środek krzywej przesunięty o 20–35 W"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Okna krótkie — 1, 3, 5, 10 i 15 sekund — pokazują dziś WARTOŚCI NIŻSZE niż Twoje rekordy i to nie jest regres. Sprint jednosekundowy wyszedł 461 W przy rekordzie 804 W z 1 listopada, bo tamto była sesja Strength ze sprintami, a to jest test progowy: nikt nie wykręca maksymalnego sprintu w czterdziestej minucie równego wysiłku. Krzywa mocy pokazuje najlepszy wynik z CAŁEJ historii dla każdego okna, więc rekordy sprinterskie stoją nietknięte tam, gdzie były. Nie próbuj ich dziś bić „dla kompletu” — to inny trening i inny dzień."
  },
  {
   "t": "naglowek",
   "tekst": "Co to zmienia w prognozach"
  },
  {
   "t": "akapit",
   "tekst": "W danych stoi FTP 150 W jako Twoja deklaracja z 22 sierpnia. Dzisiejszy pomiar mówi 174, czyli o 24 W więcej. To trzeba poprawić w pliku, bo inaczej cała zakładka Prognozy porównuje cele do liczby, o której już wiadomo, że jest zaniżona — napisz mi, czy wpisać 174, czy wolisz ostrożniejsze 170."
  },
  {
   "t": "akapit",
   "tekst": "Cel na grudzień 2026 to FTP 225 W. Z dzisiejszych 174 brakuje 51 W w trzy i pół miesiąca, czyli 29%. Miesiąc temu, licząc od deklarowanych 150, brakowało 75 W i pisałem, że to skok, którego nie ma jak ocenić. Teraz da się: przyrost 24 W nastąpił przez rok bez miernika, ale realnie przez ostatnie pół roku jeżdżenia. Żeby dowieźć 225, potrzeba drugiego takiego przyrostu w cztery razy krótszym czasie. Nie mówię, że niemożliwe — mówię, że to najambitniejsza pozycja w całej prognozie i pierwsza, która ma teraz twardy punkt odniesienia."
  },
  {
   "t": "lista",
   "punkty": [
    "20 min — cel 225 W, dziś 183, brakuje 42 W (23%)",
    "5 min — cel 300 W, dziś 202, brakuje 98 W (49%)",
    "1 min — cel 480 W, dziś 263, brakuje 217 W (83%)",
    "40 s — cel 545 W, dziś 278, brakuje 267 W (96%)",
    "5 s — cel 720 W, rekord 702 W z 01.11.2025, brakuje 18 W"
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Cztery dni przerwy — i to jest druga dobra wiadomość"
  },
  {
   "t": "akapit",
   "tekst": "Ostatnia jazda przed dzisiejszą to 12 września. Cztery dni bez roweru, po tym jak trzy razy z rzędu pisałem o odpoczynku przy zmęczeniu 10 na 10. Efekt widać w liczbach: forma wróciła z −65 na −17, zmęczenie ze 188 na 134, napięcie zmęczenie do wytrenowania z 1,52 na 1,15. Test progowy zrobiłeś więc na w miarę świeżych nogach i to jest jedyny sposób, żeby taki pomiar cokolwiek znaczył. Gdybyś próbował go 12 września, wynik byłby niższy i nie wiedziałbyś, o ile."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — cztery dni przerwy odbudowały formę"
  },
  {
   "t": "akapit",
   "tekst": "Koszt też jest widoczny i uczciwie go podaję: wytrenowanie zeszło ze 124 na 117, bo cztery dni bez obciążenia to cztery razy po 2,35%. Szczyt 146 z 20 lipca jest znów o 29 punktów dalej. Tak to działa i nie ma tu nic do naprawiania — odpoczynek kosztuje kapitał, ale jest jedynym sposobem, żeby ten kapitał zamienić na wynik. Dzisiejszy test jest tego dowodem."
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień i co dalej"
  },
  {
   "t": "akapit",
   "tekst": "Plan na 15–21 września to 4,5 godziny, najwyższa wartość dotąd. Masz 45 minut po trzech dniach, więc zostaje niecałe cztery godziny na cztery dni. To wymaga dwóch porządnych jazd w weekend, w tym jednej długiej. Przypomnę, że wrzesień ma dziś najdłuższą jazdę 47,3 km z 8 września, a plan mówi o wzroście o 8–10 km co dwa tygodnie — kolejna długa powinna więc dobić do 55 km."
  },
  {
   "t": "lista",
   "punkty": [
    "Sobota lub niedziela — długa, 55 km, druga strefa. To główny brak tego tygodnia.",
    "Druga jazda — spokojna, poniżej 135 uderzeń. Regeneracyjnej wciąż nie było ani razu we wrześniu.",
    "Po teście FTP przelicz strefy MOCY: przy FTP 174 próg Z4 przesuwa się ze 136–157 na 158–183. Tabela w danych stoi na FTP 150 i jest teraz za nisko.",
    "Koszulka sprinterska: Obory-Opacz, brakuje 10 s do rekordu. Przy formie z dzisiejszego testu to jest do wzięcia.",
    "Żółta koszulka: dzień 17 ze 115, przerwa 0 dni."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: to jest najważniejsza jazda od czasu, gdy powstała ta strona. Nie dlatego, że była ciężka — 45 minut i 345 kcal to mało — tylko dlatego, że po raz pierwszy od jedenastu miesięcy coś ZMIERZYŁEŚ zamiast oszacować. Cała zakładka Dane przez ten czas opisywała chłopaka z października 2025. Od dziś opisuje Ciebie: FTP 174 zamiast 150, dwudziestominutowa moc wyższa o 24%, jedenaście okien krzywej przesuniętych w górę. Reszta prognozy na grudzień jest nadal bardzo ambitna, ale po raz pierwszy wiadomo, od czego się liczy."
  }
 ]
};
