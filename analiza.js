// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 08.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-08T18:30",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 89,
 "dane_pobrano": "2026-09-08T16:27",
 "odcisk": "3aff73e41e609a6d",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Długa jazda pojechana — i to pojechana dokładnie tak, jak miała być"
  },
  {
   "t": "akapit",
   "tekst": "„2hr Z2 afternoon ride”: 47,3 km w 2 godziny 5 minut, tętno średnie 134, 904 kcal. Dwa razy pod rząd pisałem, że brakuje długiej jazdy i że wrzesień ma najniższe maksimum miesiąca w całej historii. Sprawa zamknięta. To czwarta najdłuższa jazda 2026 roku i najdłuższa od 28 lipca, a przede wszystkim pierwsza od powrotu z Francji, która jest tym, czym miała być: spokojna, długa i równa."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Dystans",
     "wartosc": "47,3 km",
     "stopka": "najdłuższa od 28.07"
    },
    {
     "etykieta": "W drugiej strefie",
     "wartosc": "92%",
     "stopka": "tętno do 142"
    },
    {
     "etykieta": "Dryf",
     "wartosc": "−2,4%",
     "stopka": "przez dwie godziny"
    },
    {
     "etykieta": "Zmęczenie",
     "wartosc": "10/10",
     "stopka": "i to jest temat"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Dlaczego ta jazda jest dobrze zrobiona"
  },
  {
   "t": "akapit",
   "tekst": "Trzy liczby i każda mówi to samo. Po pierwsze: 92% czasu spędziłeś przy tętnie 142 lub niżej, czyli w drugiej strefie według progu, który sam zmierzyłeś. Zero sekund powyżej 170, szczyt 166 — i te 166 to pojedyncze uderzenia na podjeździe, nie odcinek. Po drugie: dryf sercowo-oddechowy przez pełne dwie godziny wyniósł −2,4%, a wszystko poniżej 5% uznaje się za świadectwo dobrej bazy tlenowej. Po trzecie, i to jest najładniejsze: przez pierwsze sto minut tętno trzymało 130–139 przy prędkości 22–25 km/h i dopiero w ostatnim kwadransie podeszło do 141. Tak wygląda jazda, która nie ucieka w tempo."
  },
  {
   "t": "lista",
   "punkty": [
    "0–100 min — tętno 130–139, prędkość 22–25 km/h, bez ani jednego odjazdu",
    "100–125 min — tętno 135 → 141, prędkość spada do 21 km/h (normalny dryf pod koniec)",
    "Tętno maksymalne 166 · zero sekund powyżej 170",
    "Prędkość maksymalna 55,7 km/h — zjazd, nie wysiłek",
    "Segmenty: mediana straty do rekordu 38,2%, żaden rekord na znanym odcinku"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Ta ostatnia linijka nie jest zarzutem, tylko potwierdzeniem. Na spokojnej jeździe czasy na segmentach mają być słabe — 31 sierpnia było 69,1%, 4 września w interwałach 9,6%, dziś 38,2%. Liczba idzie za zamiarem, dokładnie tak, jak powinna. Na „GK Zjazd” wyrównałeś zresztą najlepszy czas, ale to zjazd, więc mówi więcej o grawitacji niż o Tobie."
  },
  {
   "t": "naglowek",
   "tekst": "Progi ustalone — i zarzut o trzecią strefę zostaje w mocy"
  },
  {
   "t": "akapit",
   "tekst": "Piszesz, że po teście górna granica Twojego Z2 to 142–143. To zamyka sprawę, o którą pytałem trzy razy, i pozwala mi wreszcie policzyć rzecz, której wcześniej nie chciałem rozstrzygać. Przeliczyłem ostatnie siedem dni obiema wersjami: tabelą ze strony (Z2 do 140) wychodzi Z2 51,3% i Z3 31,8%, a Twoim pomiarem (Z2 do 142) — Z2 56,3% i Z3 26,8%. Różnica to pięć punktów procentowych, więc odpowiedź na moje wcześniejsze pytanie brzmi: zarzut zostaje, tylko jest łagodniejszy, niż wyglądał."
  },
  {
   "t": "akapit",
   "tekst": "Ponad jedna czwarta tygodnia w tempie to nadal dużo. Model spolaryzowany chce około 80% czasu lekko i 15–20% mocno, z wąskim paskiem pomiędzy — a Ty masz 27% dokładnie w tym pasku. To nie jest katastrofa i nie jest to powód do zmiany planu; to jedna rzecz do pilnowania przy jazdach spokojnych. Dzisiejsza była pod tym względem wzorowa i gdyby wszystkie długie tak wyglądały, ten akapit zniknąłby sam w dwa tygodnie. Nawiasem: różnica 140 wobec 142 jest na tyle mała, że nie ruszam tabeli w danych — powiedz, jeśli wolisz, żeby stało tam dokładnie 142."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna, 7 dni — efektywność wróciła z 21% na 57%"
  },
  {
   "t": "naglowek",
   "tekst": "A teraz rzecz, której nie da się przemilczeć"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Zmęczenie pokazuje 10 na 10 i zdanie „Pełny odpoczynek. Sen, jedzenie, zero roweru”. To najwyższy stopień, jaki ta skala ma, i pierwszy raz, kiedy się pojawił. Napięcie zmęczenie do wytrenowania wynosi 1,52 przy 178 do 117 — dwa dni temu było 1,39, wczoraj niżej, dziś najwyżej w całym roku. Pięć jazd w dziewięć dni, w tym trzy mocne i jedna dwugodzinna. Jutro i pojutrze mają być wolne. Nie „lekko” — wolne. Pełna gotowość wypada jutro o 7:27 rano, ale to jest liczba dla samej jazdy, a nie dla tygodnia, który ją poprzedził."
  },
  {
   "t": "akapit",
   "tekst": "Żeby było jasne, skąd bierze się różnica między moim tonem a Twoim odczuciem: wysiłek dzisiejszej jazdy policzony z czasu w strefach tętna wyszedł 3,8 na 10, czyli lekko. Wpisałeś RPE 6. Gdyby strona liczyła z RPE, przyznałaby Ci 38 godzin regeneracji; z tętna wychodzi 16. To największa rozbieżność, jaką dotąd mieliśmy, i tym razem pomiar mówi, że było ŁATWIEJ, niż czułeś. Zmęczenie 10 na 10 nie bierze się więc z dzisiejszej jazdy — bierze się z tego, co było przed nią."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — nożyce najszersze w roku"
  },
  {
   "t": "akapit",
   "tekst": "Sama krzywa formy wygląda przy tym zdrowo i warto to zobaczyć obok ostrzeżenia. Wytrenowanie idzie 98 → 111 → 117 w dziewięć dni, czyli rośnie najszybciej od wiosny, i zbliża się do szczytu 146 z 20 lipca. Forma −61 jest głęboka, ale nie rekordowa: 16 lipca miałeś −151. To jest obraz bloku treningowego, który działa — pod warunkiem że po nim przyjdzie odpoczynek. Blok bez odpoczynku nie jest blokiem, tylko kopaniem dołka."
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień drugi zaczęty od najmocniejszej strony"
  },
  {
   "t": "akapit",
   "tekst": "Plan na 8–14 września to 4 godziny. Dzisiejsza jazda dała 2 godziny 5 minut, czyli 52% tygodnia pierwszego dnia. Zostaje niecałe dwie godziny na sześć dni i przy dwóch dniach wolnego nadal jest to spokojnie wykonalne. Poprzedni tydzień skończył się na 4 godzinach 31 minutach przy planie 3 h — więc jeśli utrzymasz tempo, drugi tydzień z rzędu pójdzie ponad plan."
  },
  {
   "t": "wykres_dlugie",
   "tytul": "Najdłuższa jazda w miesiącu — wrzesień przestał odstawać"
  },
  {
   "t": "lista",
   "punkty": [
    "Wtorek i środa — wolne. Przy 10 na 10 to nie jest sugestia.",
    "Czwartek lub piątek — coś lekkiego, godzina w Z2, nic więcej.",
    "Weekend — druga długa. Plan mówi +8–10 km co dwa tygodnie, czyli następna ma być bliżej 55 km niż 47.",
    "Do celu 80 km zostało 33 km, a rekord życiowy to 64,3 km z 14 lipca — po dzisiejszym już wiadomo, że to kwestia tygodni, nie miesięcy.",
    "Żółta koszulka: dzień 8 ze 115, przerwa 0 dni."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: to była najlepsza jazda tego bloku, choć nie padł na niej ani jeden rekord i nie było na niej ani jednej mocnej minuty. Dwie godziny równego tętna, dryf 2,4% i 92% czasu w drugiej strefie to jest dokładnie ten trening, którego brakowało, i zrobiłeś go dwa dni po tym, jak napisałem, że go brakuje. Jedyna rzecz, jaką mogę teraz doradzić, jest nudna: nie jedź jutro. Ani pojutrze. Wytrenowanie rośnie najszybciej od wiosny i byłaby szkoda zamienić to w zmęczenie, które nie ma z czego zejść."
  }
 ]
};
