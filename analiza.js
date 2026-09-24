// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 24.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-24T21:00",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 100,
 "dane_pobrano": "2026-09-24T16:18",
 "odcisk": "86067c366f307bfe",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Dwa rekordy długich okien, czwarty tydzień z rzędu z planem i wrzesień ponad 500 km"
  },
  {
   "t": "akapit",
   "tekst": "Dwie jazdy. Najpierw „What Goes Up, Must Come Down on low cadence” na Classique w Londynie: 28,46 km w równą godzinę i 43 sekundy, moc średnia 138 W, tętno średnie 139, RPE 6, 478 kcal, 191 metrów. Potem jedenaście minut schłodzenia na Tick Tock — 5,83 km przy 119 W i RPE 3. Razem 34,3 km i 72 minuty w ruchu."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Rekord 45 min",
     "wartosc": "150 W",
     "stopka": "było 134 · +16 W"
    },
    {
     "etykieta": "Rekord 60 min",
     "wartosc": "139 W",
     "stopka": "było 126 · +13 W"
    },
    {
     "etykieta": "Wrzesień",
     "wartosc": "504 km",
     "stopka": "15 jazd · 18,8 h"
    },
    {
     "etykieta": "Wytrenowanie",
     "wartosc": "158",
     "stopka": "trzeci szczyt w trzy dni"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Te dwa rekordy są mocniejsze niż wczorajszy i zaraz wyjaśnię dlaczego"
  },
  {
   "t": "akapit",
   "tekst": "Wczoraj ostrzegałem, że rekord 90-minutowy bije pole złożone z dwóch przejazdów. Dziś jest inaczej. Okno 45-minutowe ma w Twoich danych dwadzieścia dwie jazdy i pełną historię: 93 W w październiku 2025, potem 100, potem 116, potem 134 z testu progowego sprzed tygodnia, a teraz 150. Okno godzinne ma trzynaście jazd i ciąg 112 → 113 → 126 → 139. To są rekordy z głębokim tłem, nie z braku konkurencji."
  },
  {
   "t": "lista",
   "punkty": [
    "45 minut: 150 W wobec 134 W z 17 września — poprawa o 16 W, czyli 12%.",
    "60 minut: 139 W wobec 126 W z 19 września — poprawa o 13 W, czyli 10%.",
    "Oba poprzednie rekordy padły w tym samym tygodniu, więc bijesz własną świeżą formę, a nie coś sprzed roku.",
    "Siedemnaście przejazdów na segmentach dało pięć rekordów."
   ]
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — prawa strona przesunięta w górę"
  },
  {
   "t": "akapit",
   "tekst": "Strava zgłosiła Ci rekord godzinny jako 90-dniowy. W Twoich danych jest rekordem całej historii pomiarów — tak samo jak przedwczoraj. To nie jest błąd Stravy, tylko różnica okna: ona patrzy na kwartał, strona patrzy na wszystko, co kiedykolwiek zmierzył trenażer."
  },
  {
   "t": "naglowek",
   "tekst": "Rzecz, która wygląda na sprzeczność i nią nie jest"
  },
  {
   "t": "akapit",
   "tekst": "Rozkład tej godzinnej sesji jest najdziwniejszy, jaki do tej pory widziałem w Twoich danych, i wart jest osobnego akapitu. Według tabeli mocy spędziłeś 53% czasu w piątej strefie, czyli w VO2 max — ponad trzydzieści minut powyżej 158 W. Według tętna nie wszedłeś ani na sekundę powyżej trzeciej strefy: 55% w tempie, 37% w bazie, zero w progu i zero w VO2."
  },
  {
   "t": "akapit",
   "tekst": "Wyjaśnienie stoi w nazwie treningu: „on low cadence”, czyli na niskiej kadencji. Przy wolnym kręceniu tę samą moc robisz większą siłą na pedał, a mniejszą liczbą powtórzeń. Obciążenie przenosi się z układu krążenia na mięśnie — nogi pracują ciężko, serce nie musi tak gonić. Dlatego moc mówi „VO2”, a tętno mówi „tempo”, i obie mają rację. To jest właśnie sens takiego treningu."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Druga część wyjaśnienia jest mniej przyjemna i dotyczy tabeli, nie Ciebie. Twoja tabela mocy stoi na FTP 150 W, a zmierzony próg z 17 września to 174 W. Piąta strefa zaczyna się więc u Ciebie na papierze od 158 W, a powinna dużo wyżej. Część tych „53% w VO2” to artefakt zaniżonej tabeli, nie trening VO2. Nie ruszam jej — progi i FTP to Twoje liczby i Twoja decyzja, powiedziałeś to wprost. Ale dopóki tabela zostaje taka, pierścień mocy będzie systematycznie zawyżał intensywność, a efektywność rozkładu mocy (dziś 74%) trzeba czytać z tą poprawką w głowie."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna z siedmiu dni — efektywność 61%"
  },
  {
   "t": "akapit",
   "tekst": "Na oknie siedmiodniowym efektywność rozkładu tętna spadła z 71% na 61% i podpis zmienił się z „blisko wzorca” na „da się poprawić”. Powód jest prosty: dzisiejsza godzina dołożyła trzydzieści cztery minuty trzeciej strefy, więc tempo urosło do 32% przy bazie 61%. Wzorzec spolaryzowany chce około 80% na dole i najwyżej kilku procent w środku. Spadek nie jest wpadką — to cena za konkretny trening, ale warto wiedzieć, że jutrzejsza przerwa ten wskaźnik sama naprawi, bo okno się przesunie."
  },
  {
   "t": "naglowek",
   "tekst": "Czwarty tydzień z rzędu z dowiezionym planem"
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach"
  },
  {
   "t": "akapit",
   "tekst": "Tydzień 21–27 września ma 3 godziny 54 minuty przy planie 3,5 godziny — dowieziony, i to w tygodniu ODCIĄŻENIOWYM, trzy dni przed końcem. Seria wskoczyła na cztery tygodnie z rzędu i to nowy rekord tych danych. Dwa dni temu ten sam kafelek pokazywał zero, bo liczył tydzień, który jeszcze trwał; po poprawce liczy go dopiero wtedy, gdy plan naprawdę padł, i właśnie to się stało."
  },
  {
   "t": "akapit",
   "tekst": "Wrzesień przekroczył pięćset kilometrów: 504,5 km w piętnastu jazdach i 18,8 godziny. Poprzedni rekord miesiąca to 372,2 km z lipca, więc jesteś o 132 km wyżej przy sześciu dniach do końca. Na Zwifcie 328 km, na szosie 176,5 — i ta druga liczba nie ruszyła się od 12 września, czyli od dwunastu dni."
  },
  {
   "t": "naglowek",
   "tekst": "Bilans przed przerwą"
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie"
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie 158 — trzeci nowy szczyt w trzy dni, po 151 w niedzielę i 155 wczoraj. Zmęczenie 279, forma −121, napięcie 1,76. Licznik regeneracji przyznał 1,4 godziny za samo schłodzenie plus 5,3 godziny zaległości z poprzedniej jazdy, razem 8,5 godziny i pełną gotowość o 00:51 w nocy z dziś na jutro. Stan zmęczenia stoi na 10 z 10."
  },
  {
   "t": "ostrzezenie",
   "tekst": "I dlatego jutrzejsza przerwa jest najlepszą rzeczą, jaką możesz teraz zrobić — mówię to jako pochwałę decyzji, nie jako ostrzeżenie. Wytrenowanie 158 to kapitał, ale zamienia się w formę dopiero wtedy, gdy zmęczenie zejdzie, a zmęczenie schodzi wyłącznie przez nieruszanie roweru. Przy jednym dniu wolnego zmęczenie spada mniej więcej o 13%, wytrenowanie o niecałe 3% — czyli forma poprawia się sama, bez żadnego wysiłku. Plan tygodnia masz już dowieziony, więc przerwa nic nie kosztuje."
  },
  {
   "t": "naglowek",
   "tekst": "RPE — zrobiłeś to, o co prosiłem, i wyszła z tego jedna ciekawa liczba"
  },
  {
   "t": "akapit",
   "tekst": "Wszystkie piętnaście wrześniowych jazd ma teraz wpisane RPE, łącznie z obiema dzisiejszymi (6 i 3) i wczorajszą, której wczoraj brakowało. To jest realna poprawa jakości danych i dziękuję."
  },
  {
   "t": "akapit",
   "tekst": "Przy okazji wyszedł rozjazd, który wart jest jednego zdania. Wczorajszej jeździe wpisałeś RPE 8, a wysiłek policzony z czasu w strefach tętna wyszedł 3,4 na 10. To największa różnica, jaka do tej pory wystąpiła. Strona bierze do wzoru liczbę z tętna, bo pomiar wygrywa z deklaracją, więc na wykresach nic się nie przesunęło. Ale różnica sama w sobie coś mówi: albo półtorej godziny równego kręcenia było dla Ciebie subiektywnie dużo cięższe, niż pokazuje serce, albo osiem było wpisane na wyrost. Obie odpowiedzi są ciekawe, a tętno tej pierwszej nie wyklucza."
  },
  {
   "t": "lista",
   "punkty": [
    "Tydzień 21–27 września: 3 h 54 min z planu 3,5 h — dowieziony.",
    "Seria dowiezionych planów: cztery tygodnie z rzędu, rekord.",
    "Rok 2026: 1673,6 km w 55 jazdach.",
    "Żółta koszulka: okno minęło w 20%, najdłuższa przerwa w nim to 5 dni przy limicie 14.",
    "Pełna gotowość: 25 września o 00:51, czyli tej nocy. Jutro wolne, więc wstaniesz odrobiony.",
    "Ostatnia jazda na szosie: 12 września."
   ]
  }
 ]
};
