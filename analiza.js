// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 22.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-22T20:30",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 97,
 "dane_pobrano": "2026-09-22T18:13",
 "odcisk": "e589555737d6a565",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Dwie jazdy w jeden wieczór, dwa rekordy mocy i pierwszy miesiąc powyżej 400 km"
  },
  {
   "t": "akapit",
   "tekst": "Po dwóch dniach bez roweru wróciłeś dziś dwa razy. Najpierw „INEOS Grenadiers Virtual Training Camp | The Ganna” na Polach Elizejskich: 22,87 km w 50 minut 19 sekund, moc średnia 126 W, tętno średnie 139, 362 kcal. Potem, półtorej godziny później, „Hilly Route in Watopia”: 9,31 km w 21 minut 21 sekund, 102 W, tętno 134, 125 kcal. Razem 32,2 km i 71 minut w ruchu."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Rekord 1 min",
     "wartosc": "268 W",
     "stopka": "było 263 · +5 W"
    },
    {
     "etykieta": "Rekord 2 min",
     "wartosc": "233 W",
     "stopka": "było 228 · +5 W"
    },
    {
     "etykieta": "Wrzesień",
     "wartosc": "427 km",
     "stopka": "pierwszy miesiąc ponad 400"
    },
    {
     "etykieta": "Napięcie",
     "wartosc": "1,77",
     "stopka": "w poniedziałek było 2,00"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Rekordy przyszły z krótszej jazdy, nie z treningu"
  },
  {
   "t": "akapit",
   "tekst": "Strava zgłosiła Ci dwa nowe rekordy 90-dniowe. W Twoich danych są one mocniejsze, niż mówi: to rekordy CAŁEJ historii pomiarów, a nie tylko ostatniego kwartału. Minuta 268 W wobec 263 W i dwie minuty 233 W wobec 228 W — oba poprzednie padły pięć dni temu, w teście progowym z 17 września. Poprawa jest mała, po 5 W, ale idzie w dobrą stronę i to na oknach, które opisują moc progową, a nie sprint."
  },
  {
   "t": "akapit",
   "tekst": "Padły na „Hilly Route”, czyli na tej krótszej i pozornie luźniejszej jeździe. Rozkład mocy tłumaczy dlaczego: 59% czasu w pierwszej strefie, czyli kręcenie na luzie, ale 10% w siódmej — neuromięśniowej, powyżej 226 W. Szczyt sekundowy tej jazdy to 748 W. To była jazda w kratkę: dużo nic, a pomiędzy pełne otwarcia. Takie sesje ustawiają rekordy na krótkich oknach i dokładnie to się stało."
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — dwa nowe punkty w środku"
  },
  {
   "t": "akapit",
   "tekst": "Dla porównania „The Ganna” ma krzywą, która prawie nie schodzi: 223 W na sekundę i 220 W na minutę. Różnica między pięcioma sekundami a kwadransem wynosi 1,48 i to poniżej progu 2,0, więc strona oznaczyła tę jazdę jako sterowaną. Tak wygląda ERG: program trzyma zadaną moc, a Ty ją utrzymujesz — stąd linia zamiast krzywej."
  },
  {
   "t": "naglowek",
   "tekst": "Trening był ostrzejszy, niż wygląda po średniej"
  },
  {
   "t": "akapit",
   "tekst": "126 W średniej na „Gannie” brzmi spokojnie i jest myląca. Rozkład czasu po strefach mocy pokazuje coś innego: 30% jazdy spędziłeś w szóstej strefie, czyli powyżej 181 W, i to jest prawdziwa treść tej sesji. Reszta to rozjazd i przerwy między interwałami, które tę średnią ściągają w dół."
  },
  {
   "t": "lista",
   "punkty": [
    "Moc — Z1 7%, Z2 56%, Z3 7%, Z6 30%. Piąta strefa pusta: to nie był trening VO2, tylko beztlenowy.",
    "Tętno — Z1 7%, Z2 57%, Z3 19%, Z4 16%. Szesnaście procent na progu przy 50 minutach to osiem minut.",
    "Tętno maksymalne nie weszło w piątą strefę ani na jednej z dwóch jazd."
   ]
  },
  {
   "t": "wykres_strefy",
   "miara": "moc",
   "dni": 7,
   "tytul": "Strefy mocy z siedmiu dni"
  },
  {
   "t": "naglowek",
   "tekst": "Odpoczynek wzięty, ale druga jazda weszła na niedokończonej regeneracji"
  },
  {
   "t": "akapit",
   "tekst": "Najpierw pochwała, bo się należy. Po setce z niedzieli licznik regeneracji wskazywał pełną gotowość na dziś na 8:48 rano. Wsiadłeś o 18:10, czyli dziewięć godzin po tym terminie, i miałeś poniedziałek całkowicie wolny. Dokładnie o to prosiłem i dokładnie tak zrobiłeś — napięcie zeszło przez to z 2,00 do 1,77, a forma z −151 na −117."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Druga jazda to już inna historia. Zaczęła się o 19:46, kiedy regeneracja po „Gannie” była dopiero w połowie — licznik doliczył 3,9 godziny zaległości do 3,0 godziny za samą jazdę, czyli razem 8,8 h i pełną gotowość dopiero o 3:02 w nocy. Same w sobie te dwadzieścia minut nic nie psuje, bo wysiłek z tętna wyszedł 4,0 na 10. Ale to drugi raz w tym miesiącu, kiedy zaczynasz jazdę przed odrobieniem poprzedniej — pierwszy był 19 września i tam zaległość wynosiła 1,1 godziny, dziś 7,8. Jeśli chciałeś dwie sesje, lepiej wychodzi jedna dłuższa — regeneracja liczy się od końca ostatniej jazdy, więc rozbicie na dwie części kosztuje Cię dodatkowe godziny za nic."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — nożyce zaczęły się zamykać"
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie stoi na 151, czyli na szczycie wszech czasów, a zmęczenie spadło z 301 do 268. To jest właśnie ten moment, o którym pisałem w niedzielę: kapitał zostaje, zmęczenie schodzi, forma rośnie. Dwa dni temu było −151, dziś −117. Przy dalszym spokoju do niedzieli wyjdziesz z tego bloku w najlepszym stanie, jaki miałeś w tym roku."
  },
  {
   "t": "naglowek",
   "tekst": "Wrzesień przekroczył 400 kilometrów"
  },
  {
   "t": "akapit",
   "tekst": "Nowa zakładka Kilometry pokazuje to od razu: wrzesień ma 427,4 km i jest najlepszym miesiącem w całej historii tych danych. Drugi jest lipiec 2026 z 372,2 km, trzeci sierpień 2024 z 371,4. To pierwszy raz, kiedy przekroczyłeś czterysta, i zostało jeszcze osiem dni."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach"
  },
  {
   "t": "lista",
   "punkty": [
    "Wrzesień: 427,4 km — 250,9 na Zwifcie i 176,5 na szosie.",
    "Rok 2026: 1596,5 km w 52 jazdach.",
    "Tydzień 21–27 września to tydzień ODCIĄŻENIOWY, plan 3,5 h. Masz 1,2 h, więc 2,3 h do domknięcia.",
    "Seria dowiezionych planów: trzy tygodnie z rzędu i to jest rekord.",
    "Żółta koszulka: okno minęło w 18%, najdłuższa przerwa w nim to 5 dni przy limicie 14.",
    "Gablota: 2 z 18 — Koszulka młodzieżowa i Maillot rojo wpisane na stałe."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Piętnaście przejazdów na segmentach dało dziś siedem rekordów — cztery na „Gannie” i trzy na „Hilly”. To sporo jak na jeden wieczór, ale obie trasy masz przejechane wielokrotnie, więc porównanie jest uczciwe."
  },
  {
   "t": "akapit",
   "tekst": "Na koniec rzecz do poprawienia po Twojej stronie, nie po mojej: żadna z dzisiejszych jazd nie ma wpisanego RPE. Ratuje nas pas tętna, bo wysiłek policzył się z czasu w strefach i wykres formy nie ma dziury. Ale RPE nadal mówi coś, czego tętno nie powie — jak to się czuło. Wpisz je na Stravie, wejdą przy najbliższym odświeżeniu."
  }
 ]
};
