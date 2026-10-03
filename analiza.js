// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 3.10.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-10-03T19:30",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 124,
 "dane_pobrano": "2026-10-03T16:19",
 "odcisk": "2da555fec905504b",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Wytrenowanie najwyżej w całej historii pomiaru — 173"
  },
  {
   "t": "akapit",
   "tekst": "Trzy jazdy od ostatniej analizy, wszystkie na Zwifcie, plus jeden dzień wolny. Środa 30.09 bez roweru. Czwartek 1.10 „2x30min Z2 125 blocks”: 28,32 km w 1:30:09, moc średnia 115 W, tętno średnie 133, RPE 4, 570 m przewyższenia, 595 kcal. Piątek 2.10 „130% of FTP Hangers”: 17,47 km w 42:12, moc 117 W, tętno 145, 145 m, 282 kcal. Dziś „Active Recovery”: 29,81 km w 1:55:11, moc 100 W, tętno 134, 791 m przewyższenia, 657 kcal. Razem w tym tygodniu 4,94 godziny i 96,0 km."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Wytrenowanie",
     "wartosc": "173",
     "stopka": "najwyżej od 1 III"
    },
    {
     "etykieta": "Forma",
     "wartosc": "−82",
     "stopka": "zmęczenie 255"
    },
    {
     "etykieta": "Tydzień",
     "wartosc": "4,94 h",
     "stopka": "plan 5 h"
    },
    {
     "etykieta": "Październik",
     "wartosc": "75,6 km",
     "stopka": "trzy jazdy"
    }
   ]
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie 172,6 to najwyższa wartość w całej serii, czyli od 1 marca 2026 — 217 dni. Poprzedni szczyt wynosił 166,3 i padł wczoraj, a przed nim 166,2 dnia 27 września; dzisiejszy skok o ponad sześć punktów w dobę zrobiło samo obciążenie 433. Rośnie, bo od 26 września jechałeś sześć dni z ośmiu, a dzienne obciążenia szły 551, 254, 0, 285, 0, 330, 211 i dziś 433. To jest dokładnie to, co ma robić blok budujący, i jest to pierwsza liczba w tym projekcie, która mówi „jestem w najlepszej formie bazowej, jaką zmierzyliśmy”."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — szczyt serii"
  },
  {
   "t": "naglowek",
   "tekst": "Do planu brakuje czterech minut"
  },
  {
   "t": "akapit",
   "tekst": "Plan na tydzień 29.09–5.10 to 5 godzin. Masz 4 godziny 56 minut, czyli 4,94 h. Brakuje około czterech minut i zostały dwa dni — jutro i poniedziałek. Dopóki plan nie jest dowieziony, bieżący tydzień nie wchodzi do serii: kafelek pokazuje więc 4 tygodnie z rzędu z rekordem 4 z 4, licząc same tygodnie zamknięte."
  },
  {
   "t": "lista",
   "punkty": [
    "Tydzień 29.09–5.10: 4:56 z planu 5:00, dwa dni przed sobą.",
    "Następny tydzień 6–12.10 ma plan 5,5 h, potem 13–19.10 odciążeniowy (4 h).",
    "Październik: 75,6 km, wszystko na Zwifcie, zero kilometrów na szosie.",
    "Ostatnia jazda na szosie: 12 września, czyli 21 dni temu.",
    "Rok 2026: 1860,9 km w 62 jazdach."
   ]
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach"
  },
  {
   "t": "naglowek",
   "tekst": "„130% of FTP Hangers” mówi wprost, jakie FTP masz ustawione w Zwifcie"
  },
  {
   "t": "akapit",
   "tekst": "To najciekawsza rzecz w tych trzech jazdach i wychodzi z samej nazwy treningu. Rozpakowałem przebieg z 2.10 sekunda po sekundzie i policzyłem bloki: piętnaście odcinków ułożonych w drabinkę 20-30-40-50-60 sekund, powtórzoną trzy razy, razem 9 minut 31 sekund powyżej 240 W. Każdy odcinek trzymany na 243–250 W, większość dokładnie na 249–250. W ERG trenażer trzyma liczbę zadaną przez plan, a plan nazywa ją „130% FTP”. Odwracam więc działanie: 250 ÷ 1,30 = 192 W."
  },
  {
   "t": "lista",
   "punkty": [
    "Zwift (z arytmetyki bloków): FTP ≈ 192 W.",
    "Wpisane przez Ciebie na tej stronie: 174 W.",
    "Z reguły 0,95 × rekord 20-minutowy (185 W): 176 W.",
    "Estymata z modelu fizycznego w założeniach: 180 W, tag [E]."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Czyli Zwift pracuje na liczbie o 18 watów wyższej niż ta, którą sam wpisałeś, i o 16 wyższej niż daje pomiar z testu. Dwa zastrzeżenia, żeby to było uczciwe: Zwift mógł mieć podkręcony suwak intensywności (wtedy 250 W to nie jest czyste 130%), a swojego ustawienia FTP w Zwifcie strona nie widzi — nie ma do niego dostępu, więc liczbę 192 wyliczam, a nie czytam. Nie zmieniam przy tym nic w danych: FTP i progi to Twoje decyzje i powiedziałeś to wprost. Ale jeżeli Zwift liczy Ci strefy od 192, a strona od 174, to te same waty dostają na dwóch ekranach dwie różne nazwy."
  },
  {
   "t": "akapit",
   "tekst": "Jeden fakt z tej samej jazdy mówi jednak, że 192 jest dla Ciebie liczbą drogą: dowiozłeś te hangery, ale tętno sięgnęło 185, czyli 92% Twojego HRmax 201. Dwadzieścia sześć procent czasu siedziało w czwartej strefie tętna, a 84 sekundy w piątej — i to przy odcinkach po minutę, nie przy godzinie. FTP jest definiowane na godzinę, więc jednominutowe 250 W niczego o nim nie dowodzi; Twój rekord 20-minutowy to 185 W, a godzinny 139 W. Zwift mógł więc podnieść sobie FTP po którymś mocnym podjeździe — robi to automatycznie — i liczy Ci teraz strefy od liczby, której nie potwierdza żaden Twój dłuższy pomiar."
  },
  {
   "t": "naglowek",
   "tekst": "Zero nowych rekordów mocy i tak miało być"
  },
  {
   "t": "akapit",
   "tekst": "Sprawdziłem wszystkie osiemnaście okien od 1 sekundy do 90 minut: żadne nie drgnęło. To nie zarzut, tylko potwierdzenie, że te trzy jazdy były tym, co mówią ich nazwy — dwa treningi po planie i jedna jazda regeneracyjna. Rekordy padają na podjazdach i w sprintach, a od wtorkowego Col du Rosier nie było ani jednego takiego wysiłku. Krzywa stoi tam, gdzie ją ustawiłeś cztery dni temu."
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — bez zmian od 29 września"
  },
  {
   "t": "naglowek",
   "tekst": "Jazda nazwana „Active Recovery” była najcięższym dniem tygodnia"
  },
  {
   "t": "akapit",
   "tekst": "Tu dane nie zgadzają się z nazwą i warto to nazwać. Dzisiejsze obciążenie wyszło 433 — najwyższe od 26 września i o 31% wyższe niż czwartkowe 2×30 minut w Z2 (330). Wysiłek policzony z tętna to 3,76/10, czyli więcej niż czwartkowe 3,66, choć czwartek nazywał się treningiem, a dziś miała być regeneracja. Powód jest prosty: 1 godzina 55 minut przy tętnie średnim 134 i 791 metrach przewyższenia. Z czasu w strefach tętna 78,4% siedziało w drugiej strefie, a 16,7% w trzeciej; w czwartej ani jednej sekundy, tętno maksymalne 150 — intensywność była niska. Tylko że regeneracja nie liczy się samą intensywnością: dwie godziny w Z2 to nadal dwie godziny pracy."
  },
  {
   "t": "akapit",
   "tekst": "Licznik regeneracji przyznał łącznie 16 godzin i pełną gotowość jutro o 8:27, z czego 14 godzin za samą jazdę, a resztę za zaległość z piątku. Jeżeli dzisiejsza jazda miała być odpoczynkiem przed czymś, to go nie dała. Jeżeli miała być spokojną objętością — zrobiła dokładnie to."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna z siedmiu dni — 89%"
  },
  {
   "t": "naglowek",
   "tekst": "Dwa pierścienie, dwie oceny: 89% na tętnie, 49% na mocy"
  },
  {
   "t": "akapit",
   "tekst": "Ta różnica wygląda na błąd, a nie jest nim, i warto wiedzieć, skąd się bierze. Okno tętna mówi: 4,6% w Z1, 70,0% w Z2, 17,2% w Z3, 5,3% w Z4 i 2,8% w Z5 — kształt niemal wzorcowo spolaryzowany, stąd 89%. Okno mocy na tych samych minutach mówi: 50,1% w Z1, 37,7% w Z2 i tylko 12% powyżej, stąd 49% i podpis „rozkład rozjechany”."
  },
  {
   "t": "akapit",
   "tekst": "Przyczyna jest mechaniczna, nie fizjologiczna. Moc jest natychmiastowa i na każdym zjeździe spada do zera — dzisiejsza trasa miała 791 metrów przewyższenia, czyli tyle samo metrów zjazdu, a na zjeździe w Zwifcie nie trzeba pedałować. Tętno tych przerw nie zauważa, bo spada z opóźnieniem kilkudziesięciu sekund. Pierwsza strefa mocy sięga u Ciebie 95 W, więc każda sekunda wybiegu wpada do niej i podbija ją do połowy czasu. Przy ocenie kształtu treningu wierzyłbym tu tętnu: ono mierzy, co robił organizm, a nie co pokazywał trenażer w sekundzie, w której jechałeś z góry."
  },
  {
   "t": "lista",
   "punkty": [
    "Dwie z trzech ostatnich jazd nie mają wpisanego RPE (2.10 i 3.10).",
    "Dziś to nic nie kosztuje: pas piersiowy był założony, a tętno wygrywa z RPE jako pomiar.",
    "Koszt pojawi się dopiero przy jeździe bez pasa — tam bez RPE wysiłek jest nieznany i jazda wypada z wykresu formy.",
    "Wszystkie trzy jazdy mają znacznik ERG, czyli moc trzymał program. To informacja, nie zarzut — waty z trenażera liczą się normalnie."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: wytrenowanie 173 jest rekordem całej serii, zmęczenie 255 i forma −82 są wysokie, ale nie najwyższe w tym bloku, a tydzień zamkniesz dowolnym kwadransem na rowerze. Dwie rzeczy do rozważenia, oba Twoje decyzje: rozjazd między FTP w Zwifcie (≈192 W z arytmetyki) a 174 W na tej stronie, oraz 21 dni bez jazdy na szosie przy planie, który rośnie do 6 godzin pod koniec miesiąca."
  }
 ]
};
