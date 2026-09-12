// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 12.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-12T18:40",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 91,
 "dane_pobrano": "2026-09-12T15:59",
 "odcisk": "d4a00e82a47e9d79",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Tętno 199 — dwa uderzenia od HRmax i koniec zgadywania"
  },
  {
   "t": "akapit",
   "tekst": "„Afternoon Ride 170hr intervals/Z2”: 26,8 km w 66 minut, tętno średnie 149, RPE 7, 658 kcal, z Maćkiem. Nazwa mówi prawdę co do minuty — przebieg to sześć wyraźnych akcentów przedzielonych jazdą w drugiej strefie. Ale najważniejsza liczba dnia jest jedna: najwyższe tętno tej jazdy to 199."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Tętno maks.",
     "wartosc": "199",
     "stopka": "HRmax 201 · 99%"
    },
    {
     "etykieta": "Powyżej 170",
     "wartosc": "7:29",
     "stopka": "na 66 minut"
    },
    {
     "etykieta": "Tydzień",
     "wartosc": "4,3 h",
     "stopka": "plan 4 h"
    },
    {
     "etykieta": "Zmęczenie",
     "wartosc": "10/10",
     "stopka": "trzeci raz w tygodniu"
    }
   ]
  },
  {
   "t": "akapit",
   "tekst": "Historia tej liczby jest krótka i ładna. 31 sierpnia rekord zapisu wynosił 170, 2 września 187, 4 września 197, dziś 199. W TRENING.md stoi HRmax 201 z pasa piersiowego z adnotacją, że nie ma dziś czym tego sprawdzić — po dzisiejszym różnica wynosi dwa uderzenia, czyli jeden procent. Uznaję to za potwierdzone. Ma to konsekwencję praktyczną: progi stref liczone jako procent HRmax stoją na prawdziwej podstawie, a nie na wzorze 220 minus wiek."
  },
  {
   "t": "akapit",
   "tekst": "Sprawdziłem, gdzie dokładnie padło te 199, bo szczyt tętna bez kontekstu nic nie znaczy. Wyszło, że na Bump 2 — 305 metrów przy 5,4% — pokonanym w 45 sekund przy tętnie średnim 187 na całym odcinku. To nie jest artefakt ani jedno dziwne uderzenie w zapisie, tylko trzydziestosekundowy podjazd na maksa. Twój rekord na Bump 2 to 40 sekund z 13 sierpnia, a Maillot de lunares wymaga 35."
  },
  {
   "t": "naglowek",
   "tekst": "Struktura jazdy"
  },
  {
   "t": "lista",
   "punkty": [
    "0–11 min — rozjazd, tętno 136–147",
    "12–15 min — akcent, tętno 164, szczyt 180, prędkość 34,5 km/h",
    "18–21 min — najmocniejszy blok: tętno 172 → 186, SZCZYT 199 (Bump 2 i Kawęczyn hopka)",
    "26–29 min — akcent, tętno 172, prędkość 36,5 km/h",
    "40–43 min — akcent, tętno 165–169",
    "50–53 min — akcent, tętno 162–164",
    "60 min — ostatni zryw, szczyt 180, potem zjazd do 134"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Między akcentami tętno wracało do 136–143, czyli do drugiej strefy — dokładnie tak, jak zapowiada nazwa. Siedem i pół minuty spędziłeś powyżej 170, a 43,7% jazdy poniżej 142. To jest poprawnie zbudowany trening interwałowy i nie mam do niego zastrzeżeń jako do pojedynczej jednostki."
  },
  {
   "t": "naglowek",
   "tekst": "Osiem rekordów, ale tym razem powiem od razu, ile są warte"
  },
  {
   "t": "akapit",
   "tekst": "Padło osiem najlepszych czasów na 38 przejazdach. Wszystkie na pętli Cieciszew–Turowice–Słomczyn, którą masz przejechaną dwa albo trzy razy — czyli konkurencją jesteś Ty sprzed kilku tygodni. Największe: cała pętla 4234 m o 52 sekundy lepiej, „Up and Down” 3053 m o 38 sekund, „Cyklista w Waw” 2502 m o 26 sekund. To są prawdziwe poprawy, ale na odcinkach o trzech próbach, a nie o czternastu jak w czwartek. Dwa dni temu trzydzieści rekordów padło na segmentach z 8–14 próbami i to był inny kaliber."
  },
  {
   "t": "akapit",
   "tekst": "Na dwudziestu segmentach z co najmniej pięcioma próbami mediana straty do rekordu wynosi dziś 29,7%. To nie jest zarzut: w treningu interwałowym połowa czasu to zjazd tętna, więc segment przejechany w tej połowie musi wypaść słabo. Najbliżej byłeś na Cieciszew–Kawęczyn (4. miejsce z 13, +5,3%) i na Bump 2 (2. z 7, +12,5%)."
  },
  {
   "t": "naglowek",
   "tekst": "Co robisz bardzo dobrze — rytm co drugi dzień"
  },
  {
   "t": "akapit",
   "tekst": "Spójrz na daty wszystkich sześciu jazd tego września: 2, 4, 6, 8, 10, 12. Same parzyste, bez jednego wyjątku, przez dwanaście dni. Nie wiem, czy to plan, czy zbieg okoliczności, ale wygląda dokładnie jak książkowy powrót do treningu — dzień pracy, dzień regeneracji, bez ani jednej luki dłuższej niż jedna doba. Przy tym plan objętości na 8–14 września wynosi 4 godziny, a Ty masz już 4 godziny 18 minut przy dwóch dniach zapasu. Drugi tydzień z rzędu ponad plan."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach — drugi tydzień z rzędu ponad plan"
  },
  {
   "t": "naglowek",
   "tekst": "Co robisz źle — i to już nie jest przypadek"
  },
  {
   "t": "akapit",
   "tekst": "Sześć jazd września, a tylko JEDNA była naprawdę lekka: dwugodzinna z 8 września, 92% czasu w drugiej strefie. Pozostałe pięć to sprinty, interwały, tempo, duo w tempie i dzisiejsze interwały. Tętno średnie tych sześciu jazd: 141, 165, 153, 134, 156, 149. Jeden dołek na sześć."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna, 7 dni — efektywność 28%, trzeci pomiar z rzędu poniżej 30%"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Efektywność rozkładu wynosi 28% z podpisem „rozkład rozjechany”. To trzeci pomiar z rzędu w tym rejonie: 57% w poniedziałek, 29% w czwartek, 28% dziś. Tydzień wygląda tak: Z2 45,0%, Z3 34,6%, Z4 19,7%. Ponad połowa czasu od tempa w górę, przy wzorcu, który chce 80% lekko. Nie jest to kwestia progów — sam zmierzyłeś granicę Z2 na 142–143 i liczby są liczone dokładnie nią. Problem jest strukturalny: robisz co drugi dzień, co jest świetne, ale prawie każdą z tych jazd robisz średnio-mocno. Klasyczna szara strefa: za ciężko, żeby się regenerować, za lekko, żeby to był bodziec progowy."
  },
  {
   "t": "akapit",
   "tekst": "Konkretnie, co zmienić: z trzech jazd w przyszłym tygodniu jedna ma być mocna (jak dzisiejsza), jedna długa i naprawdę spokojna (jak ta z 8 września), a trzecia — regeneracyjna, poniżej 135 uderzeń, bez jednego akcentu, nawet jeśli będzie się wydawać, że jedziesz za wolno. Ta trzecia jest dziś w Twoim tygodniu całkowicie nieobecna i to ona zmieniłaby efektywność najbardziej."
  },
  {
   "t": "naglowek",
   "tekst": "Zmęczenie: trzeci raz 10 na 10"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Napięcie zmęczenie do wytrenowania wynosi 1,52 (188 do 124), zmęczenie stoi na 10 z 10 po raz trzeci w tym tygodniu, forma −65. Licznik regeneracji daje 16 godzin. Oddaję Ci sprawiedliwość: po środowym ostrzeżeniu wziąłeś wolne 11 września i to widać — napięcie spadło z rekordowych 1,55 na 1,52 mimo dzisiejszej jazdy. Ale to jeden dzień, a prosiłem o dwa, i przy siódmej jeździe w jedenaście dni jeden dzień to za mało. Jutro i pojutrze bez roweru, a jeśli w niedzielę będziesz jechał, to wyłącznie spokojnie i długo."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — wytrenowanie 124, najwyżej od lipca"
  },
  {
   "t": "akapit",
   "tekst": "Bo rzecz, która za tym stoi, jest naprawdę dobra. Wytrenowanie idzie 98 → 111 → 117 → 121 → 124 od końca sierpnia. To najwyższa wartość od 21 lipca i zostało dwadzieścia dwa punkty do szczytu 146. Przy takim tempie wzrostu dogonisz go w trzy tygodnie. Cała moja wredota o odpoczynku bierze się wyłącznie stąd, że to jedyna rzecz, która może ten wzrost zatrzymać."
  },
  {
   "t": "lista",
   "punkty": [
    "Jutro i pojutrze — wolne. Trzeci raz 10/10 w jednym tygodniu.",
    "Niedziela lub poniedziałek — długa, 55 km, druga strefa, zero akcentów.",
    "W przyszłym tygodniu dołóż jazdę REGENERACYJNĄ poniżej 135 uderzeń. Dziś nie ma jej w ogóle.",
    "Bump 2: dziś 45 s, Twój rekord 40 s, koszulka wymaga 35 s. Przy tętnie 199 na tym podjeździe warto spróbować świadomie, na świeżych nogach.",
    "Obory-Opacz wciąż czeka — Koszulka sprinterska stoi na 99% i dziesięciu sekundach.",
    "Żółta koszulka: dzień 12 ze 115, przerwa 0 dni."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: potwierdzone HRmax, poprawnie zbudowany trening interwałowy, drugi tydzień ponad planem i rytm co drugi dzień, którego nie zepsułeś ani razu przez dwanaście dni. Do tego jedna rzecz robiona konsekwentnie źle — brak jazd naprawdę lekkich — i jedna, o którą proszę trzeci raz, czyli odpoczynek. Twoje ciało nie potrzebuje teraz więcej bodźców, tylko czasu na to, żeby te sześć z ostatnich dwunastu dni zamienić w formę."
  }
 ]
};
