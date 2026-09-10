// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 10.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-10T20:15",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 90,
 "dane_pobrano": "2026-09-10T17:52",
 "odcisk": "fe7f14c1f0980ae3",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Trzydzieści rekordów w jednej jeździe — najwięcej w całej historii"
  },
  {
   "t": "akapit",
   "tekst": "„duo afternoon ride”: 29,4 km w 66 minut, tętno średnie 156, RPE 7, 776 kcal. Z 57 przejazdów przez segmenty padło TRZYDZIEŚCI najlepszych czasów, wszystkie na odcinkach, które masz przejechane od ośmiu do czternastu razy. Ani jeden nie jest rekordem z pierwszej próby. Poprzedni najlepszy dzień to 20 czerwca z dwudziestoma pięcioma — dzisiejszy bije go o pięć."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Rekordy",
     "wartosc": "30",
     "stopka": "z 57 przejazdów"
    },
    {
     "etykieta": "Podium",
     "wartosc": "45",
     "stopka": "na 57"
    },
    {
     "etykieta": "Blok mocny",
     "wartosc": "30,3 km/h",
     "stopka": "przez 35 minut"
    },
    {
     "etykieta": "Zmęczenie",
     "wartosc": "10/10",
     "stopka": "drugi raz w tygodniu"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Co się właściwie stało"
  },
  {
   "t": "akapit",
   "tekst": "Przebieg czyta się jasno. Szesnaście minut rozjazdu przy tętnie 141–147, potem blok od 16. do 51. minuty: 21,7 km w 35 minut, czyli 30,3 km/h średnio, tętno rosnące 153 → 170 ze szczytem 177, i jedenaście minut powyżej 170. Potem postój (18 minut przerwy w zapisie) i spokojniejsza końcówka z jednym akcentem w 72. minucie, szczyt 183. Cała ta seria rekordów pochodzi z tych trzydziestu pięciu minut."
  },
  {
   "t": "lista",
   "punkty": [
    "Bielawa - Obórki (mostek) — 3828 m, 7:08 zamiast 7:53, o 45 s lepiej, 32,2 km/h",
    "zartolin — 6851 m, 13:03 zamiast 13:45, o 42 s lepiej, 31,5 km/h",
    "Szukam okularów… — 6078 m, 11:27 zamiast 11:57, o 30 s lepiej, 31,8 km/h",
    "Jeziorka Gassy wzdłuż wału — 5261 m, 9:56 zamiast 10:21, o 25 s lepiej, 31,8 km/h",
    "Bielawa New Tarmac Dash — 1804 m, 3:13 zamiast 3:36, o 23 s lepiej, 33,6 km/h",
    "Za Bielawą — 1088 m, 1:55 zamiast 2:07, o 12 s lepiej, 34,0 km/h"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Prędkości 31–34 km/h na płaskich odcinkach kilkukilometrowych to jest nowy poziom w tych danych. Dla porównania: Twoja najszybsza jazda szosowa powyżej 20 km to 30,1 km/h (Przez Męcikał, 4 lipca), a najszybsza dłuższa — „duo high Z3” z 15 sierpnia — 28,4 km/h na 43 km. Dziś sam blok trzymał 30,3 km/h."
  },
  {
   "t": "ostrzezenie",
   "tekst": "I teraz zastrzeżenie, bez którego te trzydzieści rekordów znaczyłoby więcej, niż znaczy. Jazda nazywa się „duo”, czyli jechałeś we dwóch, a jazda na kole to kilkanaście do dwudziestu procent mniej oporu przy tej samej mocy. Nie wpisałeś opisu, więc według Twojej własnej konwencji ze STRONA.md warunki są NIEZNANE — nie ma znacznika Ok, nie ma wiatru, nie ma informacji, ile czasu jechałeś z przodu. Bez tego nie da się rozdzielić, ile z tych 30,3 km/h to forma, a ile cudze plecy. Wpisz to w opis na Stravie, choćby jednym ciągiem jak 13 sierpnia — automat dociągnie go przy najbliższym przebiegu."
  },
  {
   "t": "akapit",
   "tekst": "Dwie rzeczy przemawiają za tym, że to jednak w dużej mierze forma. Po pierwsze jechałeś przy tętnie 164 średnio przez 35 minut, z jedenastoma minutami powyżej 170 — na cudzym kole przy 30 km/h tętno tak nie wygląda. Po drugie 13 sierpnia jechałeś w TRZECH osobach, czyli z lepszą osłoną niż dziś, i padło wtedy jedenaście rekordów, a nie trzydzieści. Grupa pomaga, ale nie tłumaczy różnicy między jedenastką a trzydziestką."
  },
  {
   "t": "naglowek",
   "tekst": "Mediana straty: 0,0%"
  },
  {
   "t": "akapit",
   "tekst": "Ta liczba wymaga wyjaśnienia, bo wygląda jak błąd. Na 57 segmentach z co najmniej pięcioma próbami mediana straty do rekordu wynosi dziś zero — czyli ponad połowa dzisiejszych przejazdów JEST rekordem. Wcześniej w tym tygodniu było 38,2% na spokojnej jeździe z 8 września i 9,6% na interwałach 4 września. Przypomnę, po co to liczę: 31 sierpnia, po powrocie z Francji, wyszło 69,1% i napisałem wtedy, że to nie mierzy formy, bo liczy się zamiar. Dziś zamiar i forma zeszły się w jednym miejscu."
  },
  {
   "t": "akapit",
   "tekst": "Warto też zauważyć, czego dziś NIE było. Nie jechałeś Obory-Opacz, czyli segmentu Koszulki sprinterskiej — ta wciąż stoi na 99% i czeka na dziesięć sekund poprawy rekordu z 22 lipca. Przy dzisiejszej formie i jeździe we dwóch to jest realne w najbliższych dniach, jeśli tylko wybierzesz tę trasę."
  },
  {
   "t": "naglowek",
   "tekst": "Cena: zmęczenie 10 na 10, drugi raz w tym tygodniu"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Napięcie zmęczenie do wytrenowania wynosi 1,55 — najwyższe w całej historii tych danych. Wyżej niż 1,52 z 8 września i 1,39 z 6 września. Zmęczenie 187, wytrenowanie 121, forma −66. Licznik regeneracji daje 20 godzin i pełną gotowość jutro po piętnastej. To jest szósta jazda w dziewięć dni, w tym trzy mocne i jedna dwugodzinna. Napisałem w środę „wtorek i środa wolne, nie lekko — wolne”, a wyszły dwa dni z rzędu z jazdą, i to obie ostre. Jutro i pojutrze mają być bez roweru. Nie dlatego, że coś się zepsuło, tylko dlatego, że w tym stanie kolejny mocny trening nie dokłada już adaptacji, tylko dołek."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — napięcie 1,55, rekord tych danych"
  },
  {
   "t": "akapit",
   "tekst": "Dla równowagi, bo to naprawdę wygląda dobrze: wytrenowanie idzie 98 → 111 → 117 → 121 od końca sierpnia. Rośnie najszybciej od wiosny i jest o 25 punktów od szczytu 146 z 20 lipca. Forma −66 nadal nie jest rekordem — 16 lipca miałeś −151. Blok działa. Tylko blok bez odpoczynku przestaje być blokiem."
  },
  {
   "t": "naglowek",
   "tekst": "Rozkład tygodnia się rozjechał i tym razem to nie kwestia progów"
  },
  {
   "t": "akapit",
   "tekst": "Efektywność spadła na 29% z podpisem „rozkład rozjechany”. Siedem dni wygląda tak: Z2 42,3%, Z3 34,2%, Z4 19,2%, Z5 4,1% z 5 godzin 13 minut zapisu. Ponad połowa tygodnia powyżej progu tlenowego. Nie robię tu zastrzeżenia o progach, bo sam je zmierzyłeś i potwierdziłeś, że granica Z2 to 142–143 — a dziś 81% czasu spędziłeś powyżej 142, niezależnie od tego, gdzie postawimy resztę granic."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna, 7 dni — efektywność 29%"
  },
  {
   "t": "akapit",
   "tekst": "Model spolaryzowany chce około 80% czasu lekko i 15–20% mocno. Masz odwrotnie niż lekko: 42% lekko i 57% od tempa w górę. To nie jest katastrofa po jednym tygodniu i widać, skąd się wzięło — środowa dwugodzinna w Z2 była wzorowa, ale trzy mocne jazdy wokół niej przeważyły. Wniosek jest prosty i nudny: więcej długich spokojnych, mniej dni takich jak dziś. Jedna jazda jak dzisiejsza na tydzień to dużo, dwie to za dużo."
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień i plan"
  },
  {
   "t": "akapit",
   "tekst": "Plan na 8–14 września to 4 godziny. Masz 3 godziny 12 minut po trzech dniach, więc zostaje niecała godzina na cztery dni. Nawet przy dwóch dniach pełnego wolnego dowieziesz to bez wysiłku jedną spokojną jazdą w weekend. Drugi tydzień z rzędu pójdzie ponad plan, o ile nie zrobisz z tego kolejnych trzech mocnych jazd."
  },
  {
   "t": "lista",
   "punkty": [
    "Jutro i pojutrze — wolne. Napięcie 1,55 to rekord tych danych, a nie odczyt do przeczekania.",
    "Sobota albo niedziela — druga długa, spokojnie w Z2. Plan mówi +8–10 km, czyli bliżej 55 km niż 47.",
    "Wpisz opis do dzisiejszej jazdy: kto, ile z przodu, jaki wiatr. Bez tego trzydzieści rekordów jest nierozstrzygalne.",
    "Koszulka sprinterska: Obory-Opacz, brakuje 10 s do rekordu z 22 lipca. Przy dzisiejszej formie warto tam pojechać świadomie.",
    "Żółta koszulka: dzień 10 ze 115, przerwa 0 dni."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: to był najlepszy dzień w całej historii tych danych pod względem czystych wyników — trzydzieści rekordów, czterdzieści pięć podiów, 30,3 km/h przez trzydzieści pięć minut przy tętnie 164. Dwanaście dni po powrocie z piętnastodniowej przerwy. Jednocześnie jest to szósta jazda w dziewięć dni i drugi w tym tygodniu odczyt „wykończenie”, a ja drugi raz z rzędu napiszę to samo zdanie: teraz odpoczynek. Nie jako ostrożność, tylko dlatego, że adaptacja dzieje się między treningami, a nie w ich trakcie — i właśnie tę część tygodnia pomijasz."
  }
 ]
};
