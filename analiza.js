// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 19.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-19T21:10",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 94,
 "dane_pobrano": "2026-09-19T17:22",
 "odcisk": "f530a8f1be4d638c",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "8/6/4 minuty po 95%, 98% i 103% progu — trafione co do wata"
  },
  {
   "t": "akapit",
   "tekst": "„Zwift - 8/6/4min Threshold”, Hilly Route w Watopii: 25,3 km w 60 minut, moc średnia 125 W, tętno średnie 147, RPE 5, 432 kcal. Rozbiłem przebieg na minuty i struktura jest dokładnie taka, jak zapowiada nazwa — trzy bloki progowe, każdy krótszy i mocniejszy od poprzedniego."
  },
  {
   "t": "lista",
   "punkty": [
    "29–36 min — blok ośmiominutowy, 165 W, tętno rosnące 140 → 163",
    "37–40 min — zejście na 95 W",
    "41–46 min — blok sześciominutowy, 170 W, tętno 146 → 167",
    "47–50 min — zejście na 95 W",
    "51–54 min — blok czterominutowy, 179 W, tętno 152 → 169",
    "Wcześniej: dziewięciominutowa rampa 79 → 154 W i cztery krótkie aktywacje do 188 W"
   ]
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Blok 8 min",
     "wartosc": "165 W",
     "stopka": "95% progu"
    },
    {
     "etykieta": "Blok 6 min",
     "wartosc": "170 W",
     "stopka": "98% progu"
    },
    {
     "etykieta": "Blok 4 min",
     "wartosc": "179 W",
     "stopka": "103% progu"
    },
    {
     "etykieta": "Tętno maks.",
     "wartosc": "173",
     "stopka": "średnie 147"
    }
   ]
  },
  {
   "t": "akapit",
   "tekst": "I teraz rzecz, której nie dałoby się napisać jeszcze trzy dni temu. Twój próg zmierzony w środę to 174 W. Dzisiejsze bloki to 95%, 98% i 103% tej liczby — czyli trening progowy trafił w próg z dokładnością do kilku watów, na trzech różnych długościach. To jest jedyny powód, dla którego ta sesja cokolwiek znaczy: bez środowego testu byłyby to trzy bloki po „jakieś 165–180 W” i nikt by nie wiedział, czy to za lekko, czy za mocno."
  },
  {
   "t": "akapit",
   "tekst": "Odpowiedź tętna też się zgadza. W bloku ośmiominutowym serce doszło do 163, w sześciominutowym do 167, w czterominutowym do 169 — rośnie razem z mocą, bez żadnego odjazdu. Maksimum jazdy to 173 przy Twoim HRmax 201, więc nawet najmocniejszy blok nie wszedł w rejon, z którego się nie wraca. Tak wygląda sesja progowa zrobiona poprawnie, a nie przeciągnięta."
  },
  {
   "t": "naglowek",
   "tekst": "Jeden nowy rekord i uczciwa miara tego, ile jest wart"
  },
  {
   "t": "akapit",
   "tekst": "Strava zgłosiła nowy rekord godzinny i to prawda: 126 W na okno 60 minut, przy poprzednim 113 W z 28 października 2025. To poprawa o 13 W, czyli 1,80 W/kg zamiast 1,61. Ale powiem od razu, ile ten rekord znaczy, bo nie chcę, żeby urósł w Twojej głowie ponad miarę."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Po pierwsze jazda trwała równo godzinę, więc okno 60-minutowe obejmuje CAŁĄ sesję razem z rozgrzewką i schłodzeniem. Rekord mówi więc tyle, że Twoja najspokojniejsza godzina jest dziś mocniejsza niż kiedyś — a nie że wykręciłeś godzinę na maksa. Po drugie to była sesja sterowana: iloraz rekordu pięciosekundowego do piętnastominutowego wyszedł 1,43, czyli poniżej progu 2,0, więc strona oznaczyła ją znacznikiem ERG. W tym trybie trenażer trzyma zadaną moc — bloki po 165, 170 i 179 W to liczby z planu treningu, które Ty dowiozłeś, a nie liczby, które sam wybrałeś w trakcie. Rozkład stref mocy do 19.09 taką sesję pomijał; od dziś, na Twoją decyzję, wchodzi do pierścienia jak każda inna jazda i sama jest w nim opisana znacznikiem ERG. Koszulki liczą waty dalej wyłącznie z sesji swobodnych."
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — nowy punkt na godzinie"
  },
  {
   "t": "naglowek",
   "tekst": "Co się naprawdę poprawiło w tym tygodniu"
  },
  {
   "t": "akapit",
   "tekst": "Efektywność rozkładu tętna z siedmiu dni wynosi dziś 58%. W zeszły weekend było 28% z podpisem „rozkład rozjechany”. Podniosła to jedna rzecz: wczorajsze dwie i pół godziny w drugiej strefie. Przez cały wrzesień pisałem, że masz za dużo trzeciej strefy i za mało jazd naprawdę lekkich — jedna długa spokojna jazda przesunęła ten wskaźnik o trzydzieści punktów. To jest najlepszy dowód, że problem nie był wymyślony."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna, 7 dni — efektywność 58%, było 28%"
  },
  {
   "t": "akapit",
   "tekst": "Rozkład mocy z siedmiu dni, po odsianiu sesji sterowanej, daje 81% i podpis „blisko wzorca”. Te dwie liczby — 58% z tętna i 81% z mocy — nie są sprzeczne: opisują różne próbki, bo moc masz tylko z trzech ostatnich jazd na Zwifcie, a tętno także z sześciu szosowych. Mocowa mówi, jak wygląda ten trenażerowy blok. Tętnowa mówi, jak wygląda cały wrzesień. Pierwsza jest lepsza."
  },
  {
   "t": "naglowek",
   "tekst": "O formie życiowej — połowa racji"
  },
  {
   "t": "akapit",
   "tekst": "Piszesz, że czujesz się świetnie i masz wrażenie formy życiowej. Sprawdziłem, na ile dane to potwierdzają, i odpowiedź jest podzielona. Po stronie MOCY masz rację bez zastrzeżeń: próg 174 W jest najwyższy, jaki kiedykolwiek zmierzyłeś, rekordy od 30 sekund do 45 minut padły trzy dni temu, a 70,2 km z wczoraj to najdłuższa jazda w historii. Po stronie WYTRENOWANIA jeszcze nie: stoi na 132, a szczyt to 146 z 20 lipca. Jesteś czternaście punktów poniżej najlepszego stanu tego roku — ale idziesz w górę najszybciej od wiosny i przy tym tempie dogonisz go przed końcem miesiąca."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — 132, czternaście punktów od szczytu"
  },
  {
   "t": "ostrzezenie",
   "tekst": "I dlatego muszę napisać rzecz, która zabrzmi wredno przy takim samopoczuciu. Napięcie zmęczenie do wytrenowania wynosi dziś 1,58 — najwyżej w całej historii tych danych, wyżej niż 1,55 z 10 września. Zmęczenie 209, forma −76, stopień zmęczenia 10 na 10. To trzecia jazda w trzy dni, po czterodniowej przerwie: test na maksa, dwie i pół godziny i sesja progowa. Świetne samopoczucie i głębokie zmęczenie potrafią iść w parze przez kilka dni — właśnie na tym polega pułapka. Ciało mówi „jeszcze” dokładnie wtedy, gdy adaptacja z ostatnich trzech dni nie została jeszcze odebrana. Jutro i pojutrze wolne, a jeśli w niedzielę zostanie ci ochota, to lekko."
  },
  {
   "t": "akapit",
   "tekst": "Konkret, żeby to nie było gołosłowne: pełna gotowość po dzisiejszej jeździe wypada jutro o 9:16, a licznik po raz pierwszy od tygodnia doliczył zaległość z poprzedniej jazdy (0,6 h z niedokończonej regeneracji po wczorajszych 2h22). To znaczy, że wchodziłeś dziś na trenażer, zanim poprzednia jazda została odrobiona. Raz to nic. Trzeci raz z rzędu to już wzorzec."
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień i reszta"
  },
  {
   "t": "akapit",
   "tekst": "Plan na 15–21 września to 4,5 godziny. Masz 4 godziny 8 minut po pięciu dniach, więc do domknięcia zostaje 22 minuty i dwa dni. To znaczy, że plan jest praktycznie dowieziony i nie masz żadnego powodu, żeby jutro jechać — trzeci tydzień z rzędu skończy się na planie albo ponad nim."
  },
  {
   "t": "lista",
   "punkty": [
    "Jutro i pojutrze — wolne. Napięcie 1,58 to rekord tych danych.",
    "Niedziela, jeśli będzie ochota — 22 minuty spokojnie domykają tydzień.",
    "Długa SZOSOWA wciąż czeka: wrzesień ma na szosie 47,3 km z 8 września.",
    "Trzy sesje na Zwifcie z rzędu to zmiana wzorca — szosa zniknęła z tygodnia 12 września.",
    "Żółta koszulka: dzień 19 ze 115, przerwa 0 dni."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Poza liczbami: dwa awanse poziomu w dwa dni, 1,1 miliona dropów i pierwszy kupiony rower. To nie wchodzi do żadnego wykresu na tej stronie, bo Zwift trzyma to u siebie i przez Stravę nie przechodzi — ale zapisuję to tutaj, bo w tym projekcie od początku stoi zdanie, że Twoim ograniczeniem jest motywacja, a nie wydolność. Tydzień, w którym zmierzyłeś próg, pobiłeś rekord dystansu i trafiłeś trzy bloki progowe w próg co do wata, jest dobrym tygodniem także z tego powodu. Ride on — tylko po dwóch dniach wolnego."
  }
 ]
};
