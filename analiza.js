// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 1.11.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-11-01T21:40",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 136,
 "dane_pobrano": "2026-11-01T20:32",
 "odcisk": "d95cb2eec3c5bb5c",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Powrót po czternastu dniach — przerwa wyłączona, forma najwyższa w serii, wytrenowanie o trzecią część niżej"
  },
  {
   "t": "akapit",
   "tekst": "Od ostatniej analizy pięć jazd między 12 a 17 października, potem czternaście dni bez roweru (18–31.10), a dziś powrót: „Chapman's Peak in Video”, 11,58 km w 26 minut 53 sekundy, moc średnia 132 W, tętno średnie 149, 189 m przewyższenia. Przerwa jest w danych wyłączona z kryterium sezonu Twoją decyzją z dzisiaj — powód: choroba, a na jej końcu wyjazd. Alarm o przekroczeniu limitu zniknął, słupek na wykresie przerw stoi na szaro i podpisuje się prawdziwym powodem."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Wytrenowanie",
     "wartosc": "123",
     "stopka": "szczyt 183 · 10.10"
    },
    {
     "etykieta": "Forma",
     "wartosc": "+86",
     "stopka": "najwyżej w całej serii"
    },
    {
     "etykieta": "Przerwa",
     "wartosc": "14 dni",
     "stopka": "wyłączona decyzją"
    },
    {
     "etykieta": "Rok 2026",
     "wartosc": "2132,3 km",
     "stopka": "74 jazdy"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Co czternaście dni zrobiło z liczbami"
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — koszt przerwy widać na jednym rysunku"
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie spadło ze 182,6 (10.10, rekord całej serii) na 123,4 dzisiaj. To 59,2 punktu, czyli 32,4% w czternaście dni. Zgadza się z arytmetyką modelu: średnia wykładnicza o stałej 42 dni traci około 2,4% na każdy dzień bez treningu, a 0,976 do czternastej potęgi daje 0,71. Nic się więc nie zepsuło — tak po prostu działa ta miara. Dla skali: ostatni raz wytrenowanie było na tym poziomie 17 września."
  },
  {
   "t": "akapit",
   "tekst": "Druga strona tego samego medalu: zmęczenie zeszło z 245 na 38, a forma z −62 na +85,7, przy szczycie +100,4 w sam dzień 31 października. To najwyższa forma w całej serii, czyli od 1 marca — i jest to liczba, którą trzeba czytać ostrożnie. Wysoka forma znaczy „wypoczęty względem własnego wytrenowania”, a nie „mocny”. Jesteś wypoczęty do liczby, która sama spadła o trzecią część. Napięcie zmęczenie/wytrenowanie 0,30 mówi dokładnie to samo."
  },
  {
   "t": "lista",
   "punkty": [
    "10.10: wytrenowanie 182,6 · zmęczenie 245 · forma −62",
    "17.10 (ostatnia jazda przed przerwą): 171,8 · 168 · +4",
    "24.10: 145,4 · 62 · +84",
    "31.10 (czternasty pusty dzień): 123,1 · 23 · +100",
    "01.11 (dziś, po jeździe): 123,4 · 38 · +86"
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Rekord 1 sekundy pokazuje 2000 W i to nie jesteś Ty"
  },
  {
   "t": "akapit",
   "tekst": "Na jeździe z 12 października („Downtown Eruption”) w zapisie siedzi jedna sekunda z wartością równo 2000 W. Rozpakowałem ten przebieg sekunda po sekundzie i otoczenie tej sekundy wygląda tak: 668, 363, 720, 2000, 38, 0, 0. Czyli: moc rośnie do 720, potem jedna sekunda 2000, a w następnej 38 W i całkowite zero. Prawdziwy sprint tak nie wygląda — po maksymalnym wysiłku moc schodzi, a nie znika, i nie wchodzi się na szczyt z 720 W jednym skokiem o 1280 W. Do tego 2000 to liczba podejrzanie równa. To skok zapisu trenażera, nie Twoja moc."
  },
  {
   "t": "akapit",
   "tekst": "Ważne, bo ta jedna sekunda zabrała Ci prawdziwy rekord. Na tej samej jeździe są trzy sprinty, które wyglądają jak sprinty: 555 → 812 → 879 → 937 → 937 → 745, potem 600 → 596 → 986 → 986 → 973, i wreszcie 780 → 780 → 1068 → 687. Przeliczyłem krzywą tej jazdy, traktując sekundę z 2000 W jako brak pomiaru, a nie jako zero — i wychodzi, że pierwszy raz przekroczyłeś tysiąc watów."
  },
  {
   "t": "lista",
   "punkty": [
    "1 sekunda: w danych 2000 W, po odjęciu skoku 1068 W — poprzedni rekord 913 W z 27.09, czyli i tak rekord, o 155 W.",
    "3 sekundy: w danych 1028 W, po odjęciu skoku 982 W — poprzedni rekord 884 W, nadal rekord.",
    "5 sekund: w danych 892 W, po odjęciu skoku 862 W — poprzedni rekord 859 W, rekord o 3 W.",
    "10 sekund: w danych 716 W, po odjęciu skoku 662 W — tu rekord 778 W z 20.09 zostaje w mocy.",
    "Od 15 sekund w górę skok nie zmienia nic: 533 W na 15 s i 324 W na 30 s są czyste."
   ]
  },
  {
   "t": "ostrzezenie",
   "tekst": "Niczego w danych nie ruszam, bo rekordy to Twoje liczby i nie będę ich poprawiał z własnej inicjatywy. Pytanie jest jedno: zostawić 2000 W jako pomiar, czy odciąć tę jedną sekundę i wpisać rekord 1068 W? Jeśli powiesz „odetnij”, dołożę do automatu regułę na pojedynczą sekundę odstającą od sąsiadów o kilkaset watów i przeliczę całą historię tą samą miarą, nie tylko tę jazdę."
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — lewy koniec z jedną sekundą do rozstrzygnięcia"
  },
  {
   "t": "naglowek",
   "tekst": "Plan skończył się 26 października i seria się zerwała"
  },
  {
   "t": "akapit",
   "tekst": "Dwie rzeczy do uporządkowania, obie wymagają Twojej decyzji, nie mojej. Pierwsza: plan objętości w danych kończy się na tygodniu 20–26.10. Od 27 października wykres godzin nie ma czego rysować jako linii planu, więc kolejne tygodnie są bez odniesienia. Druga: seria dowiezionych planów pokazuje 0 tygodni z rzędu przy rekordzie 5 z 8 — zerwały ją dwa tygodnie choroby, bo plan był na 4 i 6 godzin, a jazd nie było. Kryterium sezonu wyłączyliśmy, ale seria planów to osobny licznik i on nie ma furtki na chorobę."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach"
  },
  {
   "t": "lista",
   "punkty": [
    "Październik: 335,4 km w czternastu jazdach — 26,3 km na szosie, 309,1 na Zwifcie.",
    "Listopad: 11,6 km, jedna jazda.",
    "Rok 2026: 2132,3 km w 74 jazdach.",
    "Dzisiejsza jazda: wysiłek z tętna 5,0/10, regeneracja 5 godzin 22 minuty, gotowość o 1:57 w nocy.",
    "Okno stref tętna z 7 dni to dziś wyłącznie ta jedna jazda (26 minut), więc jego 24% nic nie znaczy. Okno 30-dniowe stoi na 71%."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: przerwa jest załatwiona po Twojemu i widoczna na stronie z prawdziwym powodem, a nie schowana. Zapłaciłeś za nią jedną trzecią wytrenowania i zerwaną serią planów — to nie zarzut, tak działa choroba. Dzisiejsze 27 minut przy 132 W to dobry sposób wejścia z powrotem; przy wytrenowaniu 123 pierwszy tydzień ma być łatwy, a nie nadrabiany. Do rozstrzygnięcia zostawiam Ci dwie rzeczy: tamtą sekundę z 2000 W i nowe tygodnie planu od 3 listopada."
  }
 ]
};
