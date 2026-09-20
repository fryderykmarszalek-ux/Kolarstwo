// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 20.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-20T22:05",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 95,
 "dane_pobrano": "2026-09-20T20:54",
 "odcisk": "a6b033c96ebda187",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "101,2 km, siedem rekordów mocy i pierwsze dwie koszulki z warunkiem spełnionym"
  },
  {
   "t": "akapit",
   "tekst": "„Zwift - Pacer Group Ride with Bernie”, Watopia's Waistband: 101,22 km w 3 godziny 25 minut, moc średnia 103 W, tętno średnie 140, RPE 7, 1209 kcal, kadencja 89. To pierwsza setka w Twoim życiu i najdłuższa jazda o 31 kilometrów — poprzedni rekord padł przedwczoraj i wynosił 70,2 km. Przed 18 września rekordem było 66,6 km z sierpnia 2024 i stało to dwa lata."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Dystans",
     "wartosc": "101,2 km",
     "stopka": "pierwsza setka"
    },
    {
     "etykieta": "Szczyt mocy",
     "wartosc": "857 W",
     "stopka": "rekord · było 804"
    },
    {
     "etykieta": "Tydzień",
     "wartosc": "7,6 h",
     "stopka": "rekord · było 5,3"
    },
    {
     "etykieta": "Zmęczenie",
     "wartosc": "10/10",
     "stopka": "wykończenie · napięcie 2,00"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Pytałeś o 914 W — odpowiadam dokładnie"
  },
  {
   "t": "akapit",
   "tekst": "Nie, strumień nie urywa się na trzech sekundach. Dostajemy pełny zapis sekunda po sekundzie: 12 327 sekund jazdy, z czego 12 319 ma pomiar mocy. Nasz automat liczy z niego maksima dla szesnastu okien od 1 sekundy w górę, więc okno jednosekundowe jak najbardziej istnieje i dziś wynosi 857 W."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Ale 914 W w tym zapisie NIE MA. Najwyższa sekunda całej jazdy to 857 W, w sekundzie 12 255, czyli 204:15 — dosłownie w ostatniej minucie. Przeszukałem wszystkie 12 319 sekund: wartości 914 nie ma ani razu, a najbliższa jej liczba to właśnie 857. Dziesięć najwyższych sekund jazdy to 857, 856, 856, 848, 831, 831, 766, 766, 685 i 613."
  },
  {
   "t": "akapit",
   "tekst": "Skąd więc 914 na ekranie. Zwróć uwagę, jak wyglądają sekundy wokół szczytu: 480, 856, 856, 848, 831, 831, 857, 766, 766, 685. Wartości chodzą PARAMI. W ostatnich pięciu minutach 31% sekund jest identycznych z poprzednią, przy 11% na pierwszej godzinie jazdy — to wygląda na zapis rozdzielczy co dwie sekundy, rozciągnięty na sekundy przez powtórzenie. Jeśli tak jest, to prawdziwy szczyt wypadł MIĘDZY próbkami i po prostu nie został zapisany. Zwift na ekranie pokazuje odczyt chwilowy z trenażera, a do pliku zapisuje uśrednioną sekundę — te dwie liczby nie muszą być równe i tutaj nie są."
  },
  {
   "t": "akapit",
   "tekst": "Co z tego wynika praktycznie: strona pokaże 857 W jako Twój rekord jednosekundowy, bo tylko to ma w pomiarze. To nie jest błąd strony ani mój wybór — to jest wszystko, co Strava dostała od Zwifta. Jeżeli chcesz mieć te 914 W w danych, jedyną drogą jest zrzut z Zwifta (plik .fit z pełną rozdzielczością), a nie Strava. Dla porządku: Strava po swojej stronie w ogóle nie podaje rekordu jednosekundowego — jej lista „best efforts” zaczyna się od 5 sekund i pokazuje tam 845 W, czyli dokładnie to, co my liczymy."
  },
  {
   "t": "naglowek",
   "tekst": "Siedem rekordów mocy i wszystkie krótkie"
  },
  {
   "t": "akapit",
   "tekst": "Sprint w ostatniej minucie przestawił całą lewą stronę krzywej. Padły wszystkie okna od 1 sekundy do 40 sekund, a poprzednie rekordy sekundowe stały od 1 listopada 2025, czyli od jedenastu miesięcy."
  },
  {
   "t": "lista",
   "punkty": [
    "1 s — 857 W, było 804, o 53 W lepiej",
    "3 s — 853 W, było 766, o 87 W lepiej",
    "5 s — 845 W, było 702, o 143 W lepiej",
    "10 s — 778 W, było 595, o 183 W lepiej",
    "15 s — 617 W, było 451, o 166 W lepiej",
    "30 s — 378 W, było 273, o 105 W lepiej",
    "40 s — 313 W, było 278, o 35 W lepiej"
   ]
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — cała lewa strona przesunięta w górę"
  },
  {
   "t": "akapit",
   "tekst": "Okna dłuższe niż minuta zostały bez zmian i tak miało być: trzy i pół godziny przy 103 W to jazda wytrzymałościowa, nie próba na czas. Rekord dwudziestominutowy 183 W z testu FTP stoi nietknięty."
  },
  {
   "t": "naglowek",
   "tekst": "Dwie koszulki czekają na Twoje kliknięcie"
  },
  {
   "t": "akapit",
   "tekst": "Pierwszy raz od powstania gabloty coś ma status „warunek spełniony — odblokuj”, i to od razu dwie rzeczy naraz."
  },
  {
   "t": "lista",
   "punkty": [
    "Koszulka młodzieżowa — pierwsza jazda co najmniej 80 km. Masz 101,2 km, czyli 21 km zapasu.",
    "Maillot rojo — 100 km w czasie CAŁKOWITYM do czterech godzin. Masz 101,22 km w 3:25:26, czyli 34 minuty zapasu.",
    "Maglia ciclamino podeszła z 77% na 85% — warunek to 1000 W jako średnia z trzech sekund, masz 853 W.",
    "Maillot de lunares stoi na 88%, Koszulka górska na 90%, sprinterska na 99%."
   ]
  },
  {
   "t": "ostrzezenie",
   "tekst": "Strona kłódki nie zdejmie — to Twoja decyzja i tak było ustalone od początku. Wejdź w Gablotę, dotknij koszulki i naciśnij przycisk odblokowania. Jedna uwaga, o której mówiłem wczoraj przy okazji ERG: warunek Koszulki młodzieżowej nie mówi nic o nawierzchni, więc formalnie domyka go jazda na trenażerze. Jeśli chciałeś, żeby ta koszulka padła na szosie, to jest moment, żeby to powiedzieć — bo za chwilę będzie po sprawie. Ja bym ją wziął: sto kilometrów to sto kilometrów, a nogi nie wiedzą, czy droga była prawdziwa."
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień, który rozbił wszystkie liczby"
  },
  {
   "t": "akapit",
   "tekst": "7 godzin 33 minuty w siedem dni przy planie 4,5 godziny. To 168% planu i rekord całej historii — poprzedni najmocniejszy tydzień to 5 godzin 17 minut z 10 sierpnia — dzisiejszy jest od niego o 43% wyższy. Cztery jazdy: test FTP, jazda na 70 km, sesja progowa 8/6/4 i dzisiejsze trzy i pół godziny."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach — słupek, którego nie było"
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie doszło do 151 i to też jest nowy szczyt — poprzedni wynosił 146 z 20 lipca i stał dwa miesiące. Do tego trzeci tydzień z rzędu z dowiezionym planem — to też rekord, bo serii dłuższej niż trzy tygodnie w tych danych nigdy nie było. Ten szczyt zbudowały cztery dni, a nie cztery tygodnie, i dlatego następny akapit jest o rachunku, a nie o gratulacjach."
  },
  {
   "t": "naglowek",
   "tekst": "I rachunek za to wszystko"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Napięcie zmęczenie do wytrenowania wynosi dokładnie 2,00 przy 301 do 151. Forma −151 to najgłębszy dołek od 16 lipca i praktycznie równy tamtemu — wtedy napięcie doszło do 2,08, po czym przyszły trzy dni bez roweru i dopiero to je ściągnęło. Licznik regeneracji przyznał 35 godzin i pełną gotowość dopiero we wtorek o 8:48 — najwięcej od założenia pasa, drugie tyle co po sesji progowej. Stan zmęczenia stoi na 10 z 10, czyli na samym szczycie skali, z podpisem „wykończenie”: pełny odpoczynek, sen, jedzenie, zero roweru. Strona nie ma mocniejszego zdania w zapasie."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — nożyce rozwarte na maksa"
  },
  {
   "t": "akapit",
   "tekst": "Powiem to bez owijania, bo o to prosiłeś. Napięcie 2,00 znaczy, że w ostatnim tygodniu nabierałeś zmęczenia dwa razy szybciej, niż je odrabiałeś. Taki stan jest normalny na szczycie bloku i przez kilka dni nie robi krzywdy — natomiast utrzymany dłużej przestaje budować i zaczyna kopać. Wytrenowanie 151 jest realnym kapitałem, ale zamienia się w formę dopiero przy zejściu zmęczenia, a zmęczenie zejdzie tylko wtedy, gdy przestaniesz jeździć. Poniedziałek i wtorek wolne, bezwzględnie. Środa najwyżej godzina spokojnie."
  },
  {
   "t": "akapit",
   "tekst": "Dla równowagi jedna liczba z drugiej strony: wysiłek dzisiejszej jazdy policzony z czasu w strefach tętna wyszedł 4,4 na 10, a nie 7, które wpisałeś. Z tętna wychodzi 35 godzin regeneracji, z RPE wyszłoby 83. Innymi słowy trzy i pół godziny było ciężkie długością, a nie intensywnością — ponad połowa czasu w dwóch najniższych strefach tętna i ani jednej sekundy w piątej. To jest najlepszy możliwy rodzaj ciężkiej jazdy i dlatego kończę na tym, a nie na ostrzeżeniu."
  },
  {
   "t": "lista",
   "punkty": [
    "Poniedziałek i wtorek — wolne. Pełna gotowość wypada we wtorek rano.",
    "Gablota — dwie koszulki czekają na odblokowanie.",
    "Plan na 22–28 września to 3,5 h i jest to tydzień ODCIĄŻENIOWY. Po tym tygodniu trafia idealnie.",
    "Długa szosowa nadal nie padła — wrzesień ma na szosie 47,3 km z 8 września.",
    "Żółta koszulka: dzień 20 ze 115, przerwa 0 dni."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: w cztery dni zmierzyłeś próg po jedenastu miesiącach, pobiłeś rekord dystansu dwa razy, wykręciłeś siedem rekordów mocy, dowiozłeś 168% planu tygodniowego, ustanowiłeś nowy szczyt wytrenowania i spełniłeś warunki dwóch pierwszych koszulek w gablocie. To jest najlepszy tydzień w całej historii tych danych i nie ma drugiego, który by się do niego zbliżył. Teraz dwa dni nic — po to, żeby ten tydzień w ogóle zamienił się w formę."
  }
 ]
};
