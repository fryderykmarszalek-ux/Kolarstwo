// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 10.10.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-10-10T21:30",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 130,
 "dane_pobrano": "2026-10-10T18:44",
 "odcisk": "e5094805abf3d548",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Drugie miejsce z 68 zawodników i jedenaście rekordów mocy w 35 minut"
  },
  {
   "t": "akapit",
   "tekst": "Tour of Watopia 2026, Stage 1, trasa Sand And Sequoias: 22,99 km w 35 minut 32 sekundy, czyli 38,8 km/h, przy zupełnie płaskim profilu. Moc średnia 196 W, maksymalna 877 W. Tętno średnie 183, maksymalne 207. RPE 9, 425 kcal. Przed startem rozgrzewka: 13,11 km w 28:34 przy 94 W i tętnie 129, RPE 2 — i to właśnie w niej padł Twój dwutysięczny kilometr w 2026 roku."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Miejsce",
     "wartosc": "2 / 68",
     "stopka": "Tour of Watopia, etap 1"
    },
    {
     "etykieta": "Rekord 20 min",
     "wartosc": "222 W",
     "stopka": "było 185 · +37 W"
    },
    {
     "etykieta": "Moc średnia",
     "wartosc": "196 W",
     "stopka": "93% FTP przez 35 minut"
    },
    {
     "etykieta": "Rok 2026",
     "wartosc": "2029,9 km",
     "stopka": "dwa tysiące przekroczone"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Krzywa mocy przed wyścigiem a krzywa z wyścigu"
  },
  {
   "t": "akapit",
   "tekst": "Prosiłeś o to porównanie, więc po lewej stronie każdego wiersza stoi Twój najlepszy wynik na tym oknie ze WSZYSTKICH jazd przed dzisiejszym dniem, a po prawej to, co zrobiłeś w samym wyścigu. Jedenaście okien z osiemnastu zostało przepisanych — od piętnastu sekund do trzydziestu minut."
  },
  {
   "t": "lista",
   "punkty": [
    "15 s: 617 → 620 W (+3)",
    "30 s: 378 → 527 W (+149, czyli o 39% więcej)",
    "40 s: 319 → 473 W (+154, o 48%)",
    "1 min: 295 → 382 W (+87, o 29%)",
    "2 min: 252 → 295 W (+43)",
    "5 min: 232 → 258 W (+26)",
    "8 min: 222 → 236 W (+14)",
    "10 min: 215 → 233 W (+18)",
    "15 min: 207 → 230 W (+23)",
    "20 min: 185 → 222 W (+37, o 20%)",
    "30 min: 160 → 205 W (+45, o 28%)"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Teraz druga strona tego porównania, bo jest równie ciekawa: krótki koniec krzywej NIE drgnął. Jedna sekunda 877 W wobec rekordu 913 W z 27 września, pięć sekund 731 wobec 859, dziesięć sekund 634 wobec 778. Wyścig nie wymagał od Ciebie jednego maksymalnego sprintu — wymagał dwudziestu czterech przyspieszeń pod rząd i trzymania wysokiej mocy między nimi. Dlatego przepisał całą środkową część krzywej i zostawił sam szczyt w spokoju."
  },
  {
   "t": "akapit",
   "tekst": "I rzecz, która domyka sprawę FTP z ostatnich tygodni: rekord dwudziestominutowy wynosi teraz 222 W, a klasyczna reguła FTP ≈ 0,95 × moc 20-minutowa daje z tego 210,9 W. Ustawiłeś 210. Czyli Twoja własna decyzja i pomiar zgadzają się do jednego wata — pierwszy raz od sierpnia, kiedy te dwie liczby były rozjechane o 26 W. Przy okazji przestał działać argument z 7 października, że Zwift z FTP 190 przesadza. Nie przesadzał, tylko był o dwadzieścia watów zbyt ostrożny."
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy po wyścigu"
  },
  {
   "t": "naglowek",
   "tekst": "VO2max czy próg? Jednoznacznie VO2max, z warstwą beztlenową"
  },
  {
   "t": "akapit",
   "tekst": "Średnia kłamie i trzeba zacząć od tego. Moc średnia 196 W to 93% Twojego nowego FTP, a 30-minutowy odcinek wyszedł 205 W, czyli 98% — gdyby patrzeć tylko na te dwie liczby, wyglądałoby to na porządną sesję progową. Ale to są średnie z wysiłku, który ani chwili nie był równy, a próg polega właśnie na równości."
  },
  {
   "t": "akapit",
   "tekst": "Rozkład samego wyścigu, sekunda po sekundzie, mówi coś innego. Powyżej progu (210 W) siedziałeś 13 minut 50 sekund, czyli 38,9% czasu. Powyżej 120% progu (252 W) — 8 minut 40 sekund, 24,4%. Powyżej 150% progu (316 W) — 4 minuty 27 sekund, 12,5%, rozbite na dwadzieścia cztery osobne przyspieszenia. Jednocześnie 21,1% czasu spędziłeś w pierwszej strefie mocy, poniżej 115 W, czyli odpoczywając w kole. Tak nie wygląda próg. Tak wygląda sesja interwałowa, której nikt Ci nie zaplanował."
  },
  {
   "t": "akapit",
   "tekst": "Tętno potwierdza to samo jeszcze mocniej. Średnia 183 to 88% HRmax. W czwartej strefie (166–186) siedziałeś 65,2% czasu, a w piątej (187 i powyżej) 34,2% — dwanaście minut i dziewięć sekund. Powyżej 190 uderzeń było 9 minut 27 sekund, powyżej 200 pięćdziesiąt trzy sekundy, a szczyt 207. Sesja progowa trzyma tętno w czwartej strefie i prawie nie wchodzi w piątą; tutaj co trzecia sekunda była w piątej."
  },
  {
   "t": "akapit",
   "tekst": "Dowód rozstrzygający jest w rekordzie pięciominutowym: 258 W, czyli 123% FTP. Moc pięciominutowa to w fizjologii praktyczny odpowiednik mocy przy VO2max — i właśnie na tym oknie zrobiłeś największy względny skok w środkowej części krzywej. Werdykt: był to bodziec VO2max z wyraźną domieszką beztlenową (te 24 skoki powyżej 150% progu), a nie trening progowy. Jedna uwaga praktyczna: taki bodziec kosztuje znacznie więcej regeneracji niż próg o tej samej średniej mocy, i licznik to pokazuje."
  },
  {
   "t": "naglowek",
   "tekst": "Nowe progi: FTP 210 i HRmax 207 wpisane, obie tabele przeliczone"
  },
  {
   "t": "akapit",
   "tekst": "Zrobione tak, jak prosiłeś. FTP 210 W i HRmax 207 siedzą teraz w danych, nie w pamięci przeglądarki, więc widzisz je na każdym urządzeniu. Obie tabele przeliczyłem tą samą regułą, którą miały dotąd — żadnej nowej metody nie wprowadzam, zmieniła się tylko liczba, od której się liczy."
  },
  {
   "t": "lista",
   "punkty": [
    "Tętno, floor(207 × 0,60/0,70/0,80/0,90): Z1 0–124 · Z2 125–144 · Z3 145–165 · Z4 166–186 · Z5 187+",
    "Moc, model Coggana floor(210 × 0,55/0,75/0,90/1,05/1,20/1,50): Z1 0–115 · Z2 116–157 · Z3 158–189 · Z4 190–220 · Z5 221–252 · Z6 253–315 · Z7 316+",
    "Oba progi wchodzą z datą 10.10.2026, więc dzisiejszy wyścig i rozgrzewka są już policzone na nich.",
    "Jazdy do 9.10 liczą się dalej starymi progami — bo wtedy naprawdę tyle wynosiły. Gdybyś chciał przeliczyć całą historię, wystarczy jedno dotknięcie przycisku ⟳ Poprawka pod tabelą.",
    "HRmax 207 nie jest deklaracją na wyczucie: dokładnie tyle pokazał Twój pas w tym wyścigu. Poprzednie maksimum to 199 z 12 września."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Przy okazji wyszła pułapka w nocnym automacie i jest już naprawiona. Automat czytał listę datowanych tabel BEZ sortowania i brał z niej ostatni pasujący wpis, więc gdyby nowa wersja trafiła na początek listy, dzisiejszy wyścig policzyłby się po cichu starymi progami. Teraz sortuje tak samo jak strona. Wyścig jest policzony tabelami z 10.10 — sprawdzone w danych, nie założone."
  },
  {
   "t": "naglowek",
   "tekst": "Co to zrobiło z formą"
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie"
  },
  {
   "t": "akapit",
   "tekst": "Obciążenie dnia 379 z 35 minut jazdy — dla porównania wczorajszy dzień wolny dał zero, a środowe 3×10 minut 457 przy 92 minutach na rowerze. Wysiłek policzony z tętna wyszedł 8,15/10 i to jest najwyższa wartość, jaką pas kiedykolwiek u Ciebie zmierzył (poprzednio 6,99 z podjazdu Col du Rosier). Twoje RPE 9 jest tu praktycznie zgodne z pomiarem — po dwóch jazdach, na których te liczby się rozjeżdżały, dziś mówią to samo."
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie 182,6 to kolejny rekord całej serii, zmęczenie 245, forma −62, napięcie 1,34. Licznik regeneracji dał 19 godzin 22 minuty i pełną gotowość 11.10 o 14:09. Zwracam uwagę, że zmęczenie jest DZIŚ niższe niż 7 października (264), mimo że dziś jechałeś wyścig — bo wczorajszy dzień wolny zdążył je ściąć. Dokładnie tak powinien wyglądać tydzień przed startem."
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
    "Efektywność rozkładu tętna z 7 dni spadła na 38%. To nie jest zarzut — jeden wyścig na 35 minut wrzuca do okna dwanaście minut piątej strefy i model Seilera przestaje widzieć kształt spolaryzowany. Okno 30-dniowe stoi na 69%.",
    "To okno miesza dwie tabele progów: jazdy do 9.10 policzone z HRmax 201, dzisiejsze z 207. Tak działa datowanie progów i jest to zamierzone.",
    "Pierścień MOCY z 7 dni pokazuje 17% i to też nie jest błąd: połowa okna (50,6%) leży w pierwszej strefie, bo doszła spokojna jazda w kole z 8.10 i czas spędzony na kole w wyścigu, a 18% leży powyżej czwartej strefy. Kształt tygodnia startowego, nie bloku bazowego.",
    "Tydzień 6–12.10: 5,2 h z planu 5,5 h, dwa dni przed sobą.",
    "Październik: 244,6 km w dziewięciu jazdach po dziesięciu dniach, czyli 24,5 km na dzień. Wrzesień miał 20,5.",
    "Rok 2026: 2029,9 km w 68 jazdach."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: było grubo i liczby to potwierdzają. Drugie miejsce z 68 zawodników, jedenaście rekordów mocy od 15 sekund do 30 minut, najwyższy wysiłek z tętna w historii pomiaru i FTP, które po raz pierwszy zgadza się z własnym pomiarem co do wata. Bodziec był VO2max, nie progowy — i to znaczy, że jutro należy Ci się dzień wolny albo spokojna jazda w pierwszej strefie, a nie kolejne interwały."
  }
 ]
};
