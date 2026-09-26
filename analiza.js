// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 26.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-26T21:00",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 101,
 "dane_pobrano": "2026-09-26T19:14",
 "odcisk": "8a8dea8d46baedb7",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Dwie godziny równego tempa, czwarty szczyt wytrenowania i tydzień odciążeniowy na 169%"
  },
  {
   "t": "akapit",
   "tekst": "„Zwift - Norwegian Method Endurance” na Flat Out Fast: 56,44 km w 2 godziny i 15 sekund, moc średnia 115 W, tętno średnie 140, RPE 8, 795 kcal, 350 metrów. Plus awans poziomu. Wczoraj nie jechałeś w ogóle — przerwa, o której mówiliśmy, została wzięta w całości."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Dystans",
     "wartosc": "56,4 km",
     "stopka": "2:00:15 w ruchu"
    },
    {
     "etykieta": "Wrzesień",
     "wartosc": "561 km",
     "stopka": "16 jazd · 20,8 h"
    },
    {
     "etykieta": "Wytrenowanie",
     "wartosc": "164",
     "stopka": "czwarty szczyt w tygodniu"
    },
    {
     "etykieta": "Tydzień",
     "wartosc": "169%",
     "stopka": "planu odciążeniowego"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Sama jazda: najczystszy ERG, jaki do tej pory zrobiłeś"
  },
  {
   "t": "akapit",
   "tekst": "Krzywa mocy tej jazdy stoi jak wmurowana: 132 W na sekundę, 130 W na wszystko od dziesięciu sekund do ośmiu minut, a potem 122–125 W przez resztę dwóch godzin. Iloraz rozpoznający ERG wyszedł 1,06 przy progu 2,0 — to drugi najniższy wynik w całej Twojej historii, zaraz po „Foundation on Red Zone Repeats” z października 2025. Program trzymał moc, a Ty ją dowiozłeś przez sto dwadzieścia minut bez jednego odjazdu."
  },
  {
   "t": "lista",
   "punkty": [
    "Tętno — 54% czasu w trzeciej strefie, 45% w drugiej, zero powyżej i zero poniżej pierwszej.",
    "Moc — 68% w trzeciej strefie, 26% w drugiej, zero powyżej.",
    "Jedenaście przejazdów na segmentach dało pięć rekordów.",
    "Rekord 90-minutowy: 122 W wobec 110 W sprzed trzech dni. To samo zastrzeżenie co wtedy — okno ma dopiero cztery jazdy w historii."
   ]
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy"
  },
  {
   "t": "naglowek",
   "tekst": "A teraz rzecz, którą muszę powiedzieć wprost"
  },
  {
   "t": "akapit",
   "tekst": "Tydzień 21–27 września jest w planie oznaczony jako ODCIĄŻENIOWY i ma 3,5 godziny. Masz w nim 5 godzin 55 minut, czyli 169% planu, i został jeszcze jeden dzień. Plan dowiozłeś w czwartek — od tamtej pory jedziesz ponad niego. Tydzień odciążeniowy nie jest tygodniem z niższym celem do pobicia; jest tygodniem, w którym niższa objętość JEST zadaniem."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Wytrenowanie stoi na 164 i jest to czwarty nowy szczyt w ciągu tygodnia: 151, 155, 158, teraz 164. Zmęczenie 283, forma −119, napięcie 1,73. Stan zmęczenia pokazuje 10 z 10 z podpisem „wykończenie” — tak samo jak przy każdej aktualizacji w tym tygodniu. Licznik regeneracji przyznał 22 godziny za samą dzisiejszą jazdę i pełną gotowość dopiero jutro o 17:04. Wczorajsza przerwa ścięła zmęczenie o kilkanaście procent, a dzisiejsze dwie godziny oddały to z nawiązką — jeden dzień wolnego nie odrabia tygodnia, w którym każdy kolejny dzień był cięższy od poprzedniego."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie"
  },
  {
   "t": "naglowek",
   "tekst": "I liczba, która to potwierdza z zupełnie innej strony"
  },
  {
   "t": "akapit",
   "tekst": "Masz teraz osiemnaście jazd, w których jest i pas tętna, i wpisane RPE. To wystarczy, żeby porównać, jak wysiłek się CZUJE, z tym, co pokazuje serce. Średnio wpisujesz o 1,0 punktu więcej, niż wychodzi z tętna — to normalne i nic nie znaczy, bo RPE mierzy co innego. Znaczenie ma to, jak ta różnica się zmienia."
  },
  {
   "t": "lista",
   "punkty": [
    "Pierwsze dziewięć jazd z pasem: średnia różnica +0,7.",
    "Ostatnie dziewięć: +1,3.",
    "Trzy największe różnice w całej historii to 23 września (+4,6), dzisiaj (+3,4) i 20 września (+2,6) — czyli wszystkie z ostatniego tygodnia.",
    "Dzisiaj: wpisałeś 8, z tętna wyszło 4,6. Gdyby wzór brał Twoje RPE, licznik regeneracji pokazałby 63 godziny zamiast 22."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Są dwa wytłumaczenia i oba są ciekawe. Albo zacząłeś oceniać wysiłek surowiej, albo — i to jest wersja, którą traktowałbym poważnie przy wytrenowaniu 164 — ta sama praca naprawdę zaczyna kosztować więcej, mimo że serce jeszcze tego nie pokazuje. Rozjeżdżanie się odczucia z tętnem w górę jest klasycznym wczesnym znakiem nazbieranego zmęczenia, wcześniejszym niż cokolwiek, co widać na wykresie formy. Strona liczy z tętna, bo pomiar wygrywa z deklaracją — ale jeśli Twoje ósemki są uczciwe, to wykres formy w tej chwili ZANIŻA Twoje zmęczenie, a nie zawyża."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna z siedmiu dni — efektywność 54%"
  },
  {
   "t": "akapit",
   "tekst": "Efektywność rozkładu tętna spadła z 71% w środę na 61% w czwartek i 54% dzisiaj. Powód jest ten sam za każdym razem: trzecia strefa. Masz jej teraz 3 godziny 20 minut z dziewięciu i pół, czyli 36%, przy bazie 58%. Wzorzec spolaryzowany chce około 80% na dole i kilku procent w środku. Trzy ostatnie jazdy siedziały w tempie po połowie czasu każda — to nie jest ani baza, ani trening progowy, tylko pas pomiędzy, który kosztuje dużo i daje mało."
  },
  {
   "t": "naglowek",
   "tekst": "Wrzesień i reszta"
  },
  {
   "t": "akapit",
   "tekst": "560,9 km w szesnastu jazdach i 20,8 godziny. Poprzedni rekord miesiąca to 372,2 km z lipca, więc jesteś o 189 km wyżej przy czterech dniach do końca. Rok 2026 przekroczył 1730 km."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach"
  },
  {
   "t": "lista",
   "punkty": [
    "Tydzień 21–27 września: 5 h 55 min z planu 3,5 h — 169%.",
    "Seria dowiezionych planów: cztery tygodnie z rzędu, rekord.",
    "Wrzesień: 384,4 km na Zwifcie, 176,5 km na szosie.",
    "Ostatnia jazda na szosie: 12 września, czyli czternaście dni temu.",
    "Pełna gotowość po dzisiejszej jeździe: jutro o 17:04.",
    "Żółta koszulka: przerwa 0 dni, najdłuższa w oknie to 5 dni przy limicie 14."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Na koniec, żeby to nie zabrzmiało jak same zarzuty: dwie godziny równej mocy to porządna robota i wytrenowanie 164 jest prawdziwym kapitałem, którego dwa miesiące temu nie miałeś. Rzecz w tym, że kapitał zamienia się w formę wyłącznie wtedy, gdy zmęczenie zejdzie, a zmęczenie schodzi tylko przez nieruszanie roweru. Jutro kończy się tydzień odciążeniowy, który odciążeniowy nie był. Następny ma w planie 5 godzin i będzie łatwiejszy do dowiezienia niż ten — pod warunkiem, że wejdziesz w niego wypoczęty."
  }
 ]
};
