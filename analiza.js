// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 04.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-04T10:30",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 87,
 "dane_pobrano": "2026-09-04T07:57",
 "odcisk": "63c6976eb476ebde",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Tętno 197 i szesnaście podiów na dwadzieścia pięć segmentów"
  },
  {
   "t": "akapit",
   "tekst": "„Morning 10min, 4 min + 30s+10s”: 19,1 km w 44 minutach, RPE 8, 577 kcal, tętno średnie 165. Najkrótsza jazda tygodnia i bez porównania najmocniejsza. Rozbiłem przebieg na minuty i widać w nim dokładnie to, co zapowiada nazwa — nie musiałem niczego zgadywać."
  },
  {
   "t": "lista",
   "punkty": [
    "0–11 min — rozgrzewka, tętno 132–157",
    "12–22 min — blok 10-minutowy: tętno średnie 183, ostatnie pięć minut 192, prędkość 33,3 km/h, 6,11 km",
    "23–28 min — zejście, tętno 149–153",
    "29–33 min — blok 4-minutowy: tętno średnie 184, prędkość 29,7 km/h, 1,98 km",
    "39 min — akcent 30-sekundowy, szczyt 190",
    "44 min — akcent 10-sekundowy, szczyt 182, prędkość 31 km/h"
   ]
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Tętno maks.",
     "wartosc": "197",
     "stopka": "98% z HRmax 201"
    },
    {
     "etykieta": "Powyżej 190",
     "wartosc": "4:25",
     "stopka": "było 0 s"
    },
    {
     "etykieta": "Podium",
     "wartosc": "16 z 25",
     "stopka": "segmentów"
    },
    {
     "etykieta": "Forma",
     "wartosc": "−21",
     "stopka": "105 − 126"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "HRmax 201 właśnie się potwierdziło"
  },
  {
   "t": "akapit",
   "tekst": "Najwyższe tętno tej jazdy to 197. Dwa dni temu rekord zapisu wynosił 187, a jeszcze 31 sierpnia — 170. Wartość 201 z pasa piersiowego stała w TRENING.md jako liczba, której nie da się dziś sprawdzić; teraz podszedłeś do niej na cztery uderzenia, czyli na 98%. To praktycznie potwierdzenie. Poza tym: 265 sekund powyżej 190 i 62 sekundy powyżej 195, przy zerze w obu tych przedziałach przez całą wcześniejszą historię danych."
  },
  {
   "t": "akapit",
   "tekst": "Najwyższa jednominutowa średnia tętna wyszła 196,3, czterominutowa 193,4, a dziesięciominutowa 185,4. Blok dziesięciominutowy trzymał 183 średnio i kończył się przy 192 — czyli tętno rosło przez cały odcinek, co jest normalne przy wysiłku powyżej progu i mówi, że nie jechałeś tego na jednostajnym progu, tylko wyżej."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Piszesz, że poprawiłeś progi stref po teście — i muszę powiedzieć, co się z tym stało, bo to nie zadziałało tak, jak pewnie zakładasz. Nowa tabela siedzi w pamięci Twojego Safari (localStorage), a nie w dane.js. To znaczy dwie rzeczy. Po pierwsze: rozkład stref tej jazdy, który widzisz na stronie, policzył automat STARĄ tabelą z 27 sierpnia — Z4 od 161, Z5 od 181. Po drugie: strona nie przelicza rozkładów przy wyświetlaniu, tylko czyta gotowe sekundy z pliku, więc zmiana progów w przeglądarce nie ruszy ani tej jazdy, ani żadnej wcześniejszej. Żeby nowe progi zaczęły cokolwiek znaczyć, muszą trafić do dane.js. Naciśnij „Progi dla Claude'a…” w zakładce Objętość → Tętno i wklej mi to, co wypisze — wtedy wpiszę je do danych i przeliczę wszystkie jazdy od nowa."
  },
  {
   "t": "akapit",
   "tekst": "Dla porządku, przy starej tabeli ta jazda wygląda tak: Z2 4:19, Z3 16:38, Z4 10:55, Z5 11:47. Prawie dwanaście minut w piątej strefie jest podejrzanie dużo i to jest właśnie sygnał, że próg 181 na Z5 był za nisko ustawiony. Twoja poprawka najpewniej idzie w dobrą stronę — tylko jeszcze nie działa."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna, 7 dni — liczone STARĄ tabelą"
  },
  {
   "t": "naglowek",
   "tekst": "To, co napisałem 31 sierpnia, właśnie się sprawdziło"
  },
  {
   "t": "akapit",
   "tekst": "Trzy dni temu na spokojnej jeździe mediana straty do rekordu na dobrze ogranych segmentach wynosiła 69,1%, a Ty byłeś ostatni albo przedostatni prawie wszędzie. Napisałem wtedy, że to nie jest werdykt o formie, bo czas na segmencie mierzy cokolwiek tylko wtedy, gdy jechałeś go z zamiarem. Dziś jechałeś z zamiarem. Mediana straty: 9,6%. Szesnaście przejazdów na dwadzieścia pięć wylądowało w pierwszej trójce, w tym pięć drugich miejsc na segmentach z 24–26 próbami. Ta sama trasa, ten sam zawodnik, siedem razy mniejsza strata — różnicę zrobił wyłącznie zamiar."
  },
  {
   "t": "lista",
   "punkty": [
    "Obory-Opacz — 3. miejsce z 22 prób, 13:17 przy rekordzie 12:45",
    "Na Gassy sprint (JR) — 2. z 26, 121 s przy rekordzie 113 s",
    "the long gassy sprint — 2. z 26, 132 s przy 122 s",
    "500m GASSY — 2. z 26, 51 s przy 47 s",
    "Very long Gassy sprint — 2. z 24, 323 s przy 297 s"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Rekordu dziś nie ma i to też ma sens: rekordy na tych segmentach padły 22 lipca i 8 czerwca, na szczycie formy przed przerwą, a Ty jesteś dziesięć dni po wznowieniu jeżdżenia. Być 8% od siebie z lipca po piętnastu dniach bez roweru to dobry wynik, nie zły."
  },
  {
   "t": "naglowek",
   "tekst": "Koszulka sprinterska jest na dziesięć sekund"
  },
  {
   "t": "akapit",
   "tekst": "Warunek brzmi: Obory-Opacz, 6,94 km po płaskim, w 12:35 albo szybciej. Twój rekord to 12:45 z 22 lipca, czyli brakuje dziesięciu sekund na blisko siedmiu kilometrach — to 1,3% czasu. Gablota pokazuje 99% drogi i nie jest to zaokrąglenie na wyrost. Dziś przejechałeś ten segment w 13:17, ale w środku sesji interwałowej, a nie jako próbę na czas. Jak wrócisz do formy z lipca i pojedziesz go świadomie, jeden raz, w dobry dzień i bez wiatru w twarz — ta koszulka spada. To najbliższa rzecz w całej gablocie."
  },
  {
   "t": "naglowek",
   "tekst": "Pierwszy tydzień planu dowieziony"
  },
  {
   "t": "akapit",
   "tekst": "Plan na tydzień 1–7 września to 3 godziny. Masz 3,1 i jest dopiero piątek. Słupek na wykresie jest zielony po raz pierwszy od dawna. Warto zauważyć, jak to się złożyło: 90 minut spokojnie 31 sierpnia, 55 minut ze sprintami 2 września i 44 minuty interwałów dzisiaj. Trzy jazdy o trzech różnych zadaniach, żadna nie dłuższa niż półtorej godziny."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach — pierwszy zielony słupek planu"
  },
  {
   "t": "ostrzezenie",
   "tekst": "I teraz jedyna rzecz, którą naprawdę warto zrobić w weekend: nic. Forma zeszła na −21 (wytrenowanie 105, zmęczenie 126), napięcie zmęczenie do wytrenowania wynosi 1,15, zmęczenie stoi na 8 z 10, a licznik regeneracji daje 17 godzin i pełną gotowość dopiero jutro nad ranem. Trzy jazdy w pięć dni po piętnastodniowej przerwie, z czego dwie mocne, a dzisiejsza z tętnem 197. Tydzień jest dowieziony, więc dokładanie czwartej jazdy niczego nie poprawi w planie, a doda zmęczenia, które i tak jest najwyższe od lipca. Jeśli chcesz jechać, to spokojnie i krótko."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — najniższa forma od lipca"
  },
  {
   "t": "akapit",
   "tekst": "Na koniec liczba, która dobrze podsumowuje ten tydzień. Wysiłek tej jazdy policzony z czasu w strefach tętna wyszedł 6,9 na 10, a Twoje wpisane RPE 8 dałoby 23 godziny regeneracji zamiast 17. Trzecia jazda z rzędu, na której deklaracja i pomiar się rozjeżdżają, i pierwsza, na której obie wersje mówią to samo w istocie: było ciężko. Wcześniej różnica dotyczyła tego, czy jazda była lekka; teraz tylko tego, jak bardzo mocna. To znaczy, że Twoje RPE zaczyna być kalibrowane — i że sensowniej będzie je oceniać dopiero po tym, jak nowe progi stref wejdą do danych."
  }
 ]
};
