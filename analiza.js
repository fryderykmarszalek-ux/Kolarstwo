// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 8.10.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-10-08T23:10",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 128,
 "dane_pobrano": "2026-10-08T20:52",
 "odcisk": "7b1c7d45274529bf",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Rekord godzinny poprawiony o 7 watów — i trzeci dowód, że Zwift liczy Ci FTP od 190"
  },
  {
   "t": "akapit",
   "tekst": "Trzy jazdy od ostatniej analizy, wszystkie na Zwifcie, plus dzień wolny 5.10. Wtorek 6.10 „Sand And Sequoias”: 29,20 km w 1:00:54, moc średnia 109 W, tętno 135, RPE 3, 206 m. Środa 7.10 „3x10min 100%”: 32,22 km w 1:32:13, moc 126 W, tętno 144, RPE 9, 717 m przewyższenia, 665 kcal. Dziś „Pacer Group Ride with Mochi”: 45,16 km w 1:32:18, moc 89 W, tętno 115, RPE 2, 223 m."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Rekord 1 h",
     "wartosc": "146 W",
     "stopka": "było 139 · +7 W"
    },
    {
     "etykieta": "Rekord 1,5 h",
     "wartosc": "128 W",
     "stopka": "było 122 · +6 W"
    },
    {
     "etykieta": "Wytrenowanie",
     "wartosc": "182",
     "stopka": "rekord serii"
    },
    {
     "etykieta": "Rok 2026",
     "wartosc": "1993,8 km",
     "stopka": "6,2 km do dwóch tysięcy"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "3×10 minut po 189 watów"
  },
  {
   "t": "akapit",
   "tekst": "Rozpakowałem przebieg z 7.10 i bloki są wzorowo równe: trzy odcinki po 598 sekund, moc średnia 189, 189 i 188 W, tętno w nich 165, 164 i 167, maksymalne na całej jeździe 175. Trening nazywa te bloki „100% FTP”, więc arytmetyka jest banalna: Zwift ma ustawione FTP równe 189–190 W. To trzeci niezależny pomiar tego samego — 2.10 hangery na „130% FTP” dały 250 ÷ 1,30 = 192 W, dziś wychodzi 189. Zgadzają się do trzech watów."
  },
  {
   "t": "akapit",
   "tekst": "I tu dwie tabele zderzają się już nie teoretycznie. Dla strony, która liczy strefy od Twojego FTP 174 W, 189 W to piąta strefa mocy (183–208) — czyli VO2. Dla Zwifta to dokładnie próg. Te same trzydzieści minut ma więc dwie różne nazwy, zależnie od ekranu, na który patrzysz. Pierścień mocy zapisał z tej jazdy 29 minut 29 sekund w piątej strefie."
  },
  {
   "t": "akapit",
   "tekst": "Co mówią pozostałe pomiary z tej jazdy: tętno w blokach siedziało na 164–167, czyli w czwartej strefie tętna (161–180), a nie w piątej (181+). Tętno zgadza się więc z Zwiftem, nie z tabelą mocy. Z drugiej strony wpisałeś RPE 9, czyli „prawie maksymalnie” — a trzy dziesiątki na progu powinny kosztować mniej. Pierwsze sugeruje, że 174 W zaniża, drugie, że 190 W przesadza. Prawda jest najpewniej pośrodku i dlatego nie ruszam tej liczby: FTP jest Twoją decyzją, a test trwa dwadzieścia minut i Ty decydujesz, kiedy go zrobić."
  },
  {
   "t": "naglowek",
   "tekst": "Rekord godzinny 146 W — czego nie znaczy"
  },
  {
   "t": "akapit",
   "tekst": "Z tej jazdy padły dwa rekordy na najdłuższych oknach: godzina 139 → 146 W i półtorej godziny 122 → 128 W. Strava zauważyła to samo i dopisała do jazdy „New 60min power best”. Ale uczciwie: to nie jest wynik godzinnego testu. Krzywa mocy bierze najlepszą średnią kroczącą z całej jazdy, a w tej godzinie siedzą też doliny między blokami i rozgrzewka. Twoja prawdziwa moc godzinna jest więc wyższa niż 146 W — tylko nikt jej jeszcze nie zmierzył, bo do tego trzeba jechać godzinę na maksa, a nie trzy dziesiątki z przerwami."
  },
  {
   "t": "akapit",
   "tekst": "Dla porządku, komplet długich okien po tej jeździe: 20 min 185 W, 30 min 160, 45 min 150, godzina 146, 1,5 h 128. Reguła FTP ≈ 0,95 × 20 min nadal daje 176 W."
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — podniesiony prawy koniec"
  },
  {
   "t": "naglowek",
   "tekst": "RPE i tętno rozjechały się w obie strony w ciągu czterech dni"
  },
  {
   "t": "akapit",
   "tekst": "7.10 wpisałeś RPE 9, a wysiłek policzony z czasu w strefach tętna wyszedł 4,95/10 — różnica 4,05 punktu, druga największa w całych danych. Cztery dni wcześniej było odwrotnie: jazda z 4.10, którą od tamtej analizy nazwałeś „Activation” i oznaczyłeś RPE 3, miała z tętna 6,54 — różnica w drugą stronę, 3,54 punktu. To ta sama jazda, na której padło dwadzieścia jeden rekordów segmentowych przy tętnie średnim 161 i maksymalnym 197."
  },
  {
   "t": "akapit",
   "tekst": "Strona liczy formę i regenerację z tętna, bo pomiar wygrywa z deklaracją, i przy tej parze jazd widać, dlaczego: deklaracje poszły w przeciwne strony niż pomiar. Ale metoda z tętna ma własną słabość i tu ją widać. Liczy czas w strefach, więc jazda „trzy dziesiątki na progu plus długa rozgrzewka” dostaje średni wynik, bo w czwartej strefie było tylko 28 z 92 minut, a w piątej nic. Twoje RPE 9 opisuje nogi w trzecim bloku, a nie średnią z całej godziny i pół — i w tym sensie jest prawdziwsze niż 4,95."
  },
  {
   "t": "lista",
   "punkty": [
    "7.10: RPE 9, z tętna 4,95 — obciążenie 457, największe w październiku.",
    "4.10: RPE 3, z tętna 6,54 — obciążenie 378.",
    "Dziś: RPE 2, z tętna 2,40 — tu obie miary się zgadzają.",
    "Strona pokazuje obie liczby w panelu regeneracji i mówi, której użyła."
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Dziś: najniższe średnie tętno w całych danych"
  },
  {
   "t": "akapit",
   "tekst": "45,16 km przy tętnie średnim 115 — nie było dotąd ani jednej jazdy z niższą średnią; druga na liście to 132 z 23 września. Rozkład: 73,4% czasu w pierwszej strefie, 26,3% w drugiej i siedemnaście sekund w trzeciej. Moc średnia 89 W przy prędkości 29,4 km/h — tak działa jazda w kole w grupie Pacera: dystans jedzie się za darmo. To czwarta najdłuższa jazda na Zwifcie w Twojej historii, a kosztowała 222 punkty obciążenia, czyli połowę wczorajszego."
  },
  {
   "t": "akapit",
   "tekst": "Licznik regeneracji dał 3 godziny 12 minut i pełną gotowość o 0:05 w nocy. Przy RPE 2, które wpisałeś, wyszłoby 3,5 h — czyli tym razem deklaracja i pomiar mówią to samo. Tak wygląda dzień po mocnym treningu zrobiony poprawnie."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie"
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie 182,2 to kolejny rekord całej serii — czwarty rekordowy dzień w ciągu sześciu: 3.10 było 172,6, 4.10 177,4, 7.10 181,2 i dziś 182,2 (między nimi dwa dni spadku, bo wolne i lekka jazda). Zmęczenie 258,6, forma −76, napięcie 1,42. Dla skali: najwyższe zmęczenie w historii to 301 z 20 września. Rośnie wytrenowanie przy zmęczeniu poniżej szczytu — to najlepszy możliwy układ tych dwóch liczb w bloku budującym."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna z siedmiu dni"
  },
  {
   "t": "lista",
   "punkty": [
    "Tydzień 6–12.10: 4,09 h z planu 5,5 h, 106,6 km, cztery dni przed sobą.",
    "Seria z dowiezionym planem: 5 tygodni z rzędu.",
    "Październik: 208,5 km w siedmiu jazdach — 26,1 km na dzień wobec 20,5 we wrześniu.",
    "Rok 2026: 1993,8 km. Do dwóch tysięcy brakuje 6,2 km.",
    "Okno stref tętna z siedmiu dni: 65%, bo tydzień ma i dużo pierwszej strefy, i 56 minut na progu."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: tydzień ułożony prawidłowo — mocny trening progowy w środę, lekka objętość w kole dzisiaj, dzień wolny w poniedziałek. Wytrenowanie bije rekord czwarty raz, dwa rekordy mocy na najdłuższych oknach, a w planie zostało 1,4 godziny na cztery dni. Jedna rzecz do rozstrzygnięcia przez Ciebie: Zwift i strona nie zgadzają się co do Twojego FTP o 15 watów, a od 7.10 masz na to trzy niezależne rachunki. Dwadzieścia minut na maksa zamknęłoby sprawę."
  }
 ]
};
