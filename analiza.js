// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 27.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-27T21:00",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 102,
 "dane_pobrano": "2026-09-27T18:23",
 "odcisk": "bd2e7a665c7b826e",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "913 watów — te, o które pytałeś tydzień temu, właśnie się pojawiły"
  },
  {
   "t": "akapit",
   "tekst": "Dwudziestego września zapytałeś, czy strona widzi, że zrobiłeś 914 watów, czy strumień urywa się na trzysekundowej mocy. Odpowiedź brzmiała wtedy: strumień jest pełny, ale najwyższa sekunda tamtej jazdy to 857 W i liczby 914 nie ma w nim ani razu. Dzisiaj, na „Pacer Group Ride with Bernie” na Tick Tock, w zapisie stoi 913 W. Jeden wat poniżej tego, co wtedy zobaczyłeś na ekranie — i tym razem jest to pomiar, nie wspomnienie."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Rekord 1 s",
     "wartosc": "913 W",
     "stopka": "13,04 W/kg · było 857"
    },
    {
     "etykieta": "Rekord 3 s",
     "wartosc": "884 W",
     "stopka": "było 853 · +31 W"
    },
    {
     "etykieta": "Rekord 5 s",
     "wartosc": "859 W",
     "stopka": "12,27 W/kg · +14 W"
    },
    {
     "etykieta": "Tydzień",
     "wartosc": "201%",
     "stopka": "planu odciążeniowego"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Trzy rekordy sprinterskie i wszystkie z głębokim tłem"
  },
  {
   "t": "akapit",
   "tekst": "Padły trzy okna: sekunda 913 W wobec 857, trzy sekundy 884 wobec 853, pięć sekund 859 wobec 845. Poprzednie rekordy stały od 20 września, czyli od tygodnia. Pula, z której te rekordy biją, to dwadzieścia siedem jazd z pomiarem mocy — to nie jest przypadek okna bez historii, jak przy 90 minutach."
  },
  {
   "t": "lista",
   "punkty": [
    "Historia rekordu pięciosekundowego: 633 W (X 2025) → 677 → 702 → 845 (20 IX) → 859 dzisiaj.",
    "Sekunda: 804 W z 1 listopada 2025 stało prawie rok, potem 857 przed tygodniem, teraz 913.",
    "Strava zgłosiła to jako rekord 90-dniowy — w Twoich danych jest rekordem całej historii pomiarów.",
    "Cztery przejazdy na segmentach, jeden rekord."
   ]
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — lewa krawędź znowu w górę"
  },
  {
   "t": "akapit",
   "tekst": "Sama jazda była lekka i taka miała być: 34,78 km w 1 godzinę 7 minut, moc średnia 108 W, tętno średnie 133. Tętno spędziło 83% czasu w drugiej strefie, czyli w bazie, i ani sekundy powyżej trzeciej. Rozkład mocy jest za to rozstrzelony po wszystkich siedmiu strefach, z trzema procentami w siódmej — bo to jest właśnie kształt jazdy w grupie: długie spokojne kręcenie i kilka pełnych otwarć. Iloraz ERG wyszedł 7,22, czyli daleko powyżej progu 2,0 — to była jazda całkowicie swobodna, żaden program nie trzymał Ci mocy."
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień zamknięty: 201% planu odciążeniowego"
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Tydzień 21–27 września skończył się na 7 godzinach 2 minutach przy planie 3,5 godziny. To 201% — dokładnie dwa razy tyle, ile miał mieć tydzień oznaczony jako ODCIĄŻENIOWY, i drugi najmocniejszy tydzień w całej historii tych danych, zaraz po 7,55 h z tygodnia poprzedniego. Plan dowiozłeś w czwartek; przez kolejne trzy dni doszło jeszcze 3 godziny 8 minut. Mówiłem to wczoraj i powtarzam raz, bez dalszego wracania: tydzień odciążeniowy to nie jest tydzień z niższą poprzeczką do przeskoczenia."
  },
  {
   "t": "akapit",
   "tekst": "Następny tydzień, 28 września – 4 października, ma w planie 5 godzin i NIE jest odciążeniowy. To dobra wiadomość: przy takiej objętości jak przez ostatnie dwa tygodnie dowieziesz go bez wysiłku. Zła jest taka, że wchodzisz w niego z wytrenowaniem 166, które jest piątym nowym szczytem z rzędu, i z zapasem zmęczenia, którego nie odrobiłeś."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie"
  },
  {
   "t": "akapit",
   "tekst": "Są jednak sygnały w dobrą stronę i warto je nazwać, bo nie wszystko idzie w dół. Napięcie zmęczenia do wytrenowania spadło z 1,76 w czwartek przez 1,73 wczoraj na 1,68 dzisiaj — trzy dni z rzędu w dół. Forma poprawiła się z −119 wczoraj na −113. Zmęczenie zeszło z 283 na 279, mimo że dzisiaj jechałeś. To znaczy, że dzisiejsza godzina była dla organizmu tańsza niż średnia z ostatniego tygodnia, czyli że lekka jazda naprawdę zadziałała jak lekka jazda."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna z siedmiu dni — efektywność 63%"
  },
  {
   "t": "akapit",
   "tekst": "Efektywność rozkładu tętna wróciła z 54% na 63%, bo okno siedmiodniowe wypuściło twarde jazdy z zeszłego tygodnia, a dzisiejsze 83% w bazie przesunęło środek ciężkości w dół. Baza ma teraz 63,5% przy tempie 29,2% — nadal za dużo tempa wobec wzorca, ale kierunek jest właściwy pierwszy raz od czterech dni."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Osobno: efektywność rozkładu MOCY pokazuje dziś 38% z podpisem „rozkład rozjechany” i tej liczby nie traktuj dosłownie. Dzisiejsze sprinty wrzuciły czas do piątej, szóstej i siódmej strefy mocy, a te strefy są u Ciebie policzone od FTP 150 W, przy zmierzonym progu 174 W. Przy zaniżonej tabeli każdy sprint liczy się jako więcej pracy powyżej progu, niż był naprawdę. Pierścień tętna nie ma tego problemu, bo tabela tętna stoi na zmierzonym HRmax — dlatego przy rozbieżności obu liczb wierz dziś tej z tętna."
  },
  {
   "t": "naglowek",
   "tekst": "Wrzesień i reszta"
  },
  {
   "t": "akapit",
   "tekst": "595,7 km w siedemnastu jazdach i 21,9 godziny. Do sześciuset kilometrów brakuje 4,3 km i zostały trzy dni, więc to jest formalność. Poprzedni rekord miesiąca to 372,2 km z lipca — jesteś o 223 km wyżej. Rok 2026 ma 1764,8 km w pięćdziesięciu siedmiu jazdach."
  },
  {
   "t": "lista",
   "punkty": [
    "Tydzień 21–27 września: 7 h 2 min z planu 3,5 h — 201%, siedem jazd.",
    "Seria dowiezionych planów: cztery tygodnie z rzędu, rekord.",
    "Wrzesień: 419,2 km na Zwifcie, 176,5 km na szosie.",
    "Ostatnia jazda na szosie: 12 września, czyli piętnaście dni temu.",
    "Pełna gotowość po dzisiejszej jeździe: jutro o 4:26 nad ranem.",
    "Dzisiejsza jazda nie ma jeszcze wpisanego RPE — wpisz, wejdzie przy najbliższym odświeżeniu."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Na koniec wracam do początku, bo to jest dzisiaj najważniejsze. 913 W to 13,04 wata na kilogram. Jedenaście miesięcy temu Twój najlepszy sprint dawał 804 W, a dwa tygodnie temu 857. Przyrost o 56 watów w tydzień na oknie sekundowym nie bierze się z wytrzymałości ani z objętości — bierze się z tego, że nogi są mocniejsze niż były. To jest jedyna liczba w tym tygodniu, która rośnie z właściwego powodu."
  }
 ]
};
