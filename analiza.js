// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 31.08.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, więc automat uzna dane za niezmienione, a że
// analiza jest z dzisiaj, zostawi ją w spokoju do jutra.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-08-31T12:10",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 85,
 "dane_pobrano": "2026-08-31T09:26",
 "odcisk": "0f0ec34bd277a263",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Wróciłeś — i pierwsze dwa dni z pasem tętna mówią więcej niż poprzednie dwa miesiące"
  },
  {
   "t": "akapit",
   "tekst": "Piętnaście dni bez roweru skończyło się 30 sierpnia. Od tamtej pory masz dwie jazdy: „Z2 1 HR” (22,5 km w 61 minut) i dzisiejszą „Morning 90min” (33,6 km w 90 minut). Razem 2 godziny 31 minut ruchu, 56,1 km, 112 metrów przewyższenia i 1273 kcal. Prędkość obu jazd jest niemal identyczna — 22,0 i 22,5 km/h — więc pod względem samego tempa wróciłeś dokładnie tam, gdzie skończyłeś. Ale to nie tempo jest dziś najciekawszą liczbą."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Powrót",
     "wartosc": "2 jazdy",
     "stopka": "56,1 km w dwa dni"
    },
    {
     "etykieta": "Czas z tętnem",
     "wartosc": "2,5 h",
     "stopka": "pierwsze w całej historii"
    },
    {
     "etykieta": "Forma",
     "wartosc": "+17",
     "stopka": "98 − 81, szczyt 146"
    },
    {
     "etykieta": "Rekordy dziś",
     "wartosc": "7 z 60",
     "stopka": "ale przeczytaj niżej"
    }
   ]
  },
  {
   "t": "akapit",
   "tekst": "Zacznijmy od formy, bo to ona najszybciej się zmieniła. Wytrenowanie stoi na 98, zmęczenie na 81, różnica to +17. Dla porównania: 27 sierpnia, po dwunastu dniach przerwy, było 95 i 35, czyli forma +61. Ta zmiana wygląda jak pogorszenie i nie jest nim. Zmęczenie liczy się średnią wykładniczą o stałej 7 dni, więc dwie jazdy pod rząd podnoszą je gwałtownie — z 35 na 81 w dwa dni. Wytrenowanie ma stałą 42 dni, więc te same dwie jazdy podniosły je zaledwie z 95 na 98. Innymi słowy: zapłaciłeś pełną cenę zmęczenia i dostałeś trzy punkty kapitału. Tak wygląda każdy powrót po przerwie i dlatego pierwszy tydzień zawsze boli bardziej, niż wynikałoby z przejechanych kilometrów."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — dwa dni powrotu widać na końcu"
  },
  {
   "t": "akapit",
   "tekst": "Szczyt wytrenowania to 146 z 20 lipca. Dziś jest 98, czyli 67% tamtego stanu. Żeby wrócić do 146, musisz przez dłuższy czas dowozić więcej obciążenia, niż wynosi bieżące wytrenowanie podzielone przez 42 — a to znaczy w praktyce regularność, nie pojedyncze mocne wyjścia. Plan na wrzesień (3 h, potem 4 h, potem 4,5 h) jest dokładnie tym narzędziem."
  },
  {
   "t": "naglowek",
   "tekst": "Tętno: dwa i pół godziny pomiaru zamiast dwóch miesięcy zgadywania"
  },
  {
   "t": "akapit",
   "tekst": "To jest największa zmiana w danych od czasu, gdy powstała ta strona. Do 30 sierpnia kolumna tętna była pusta w każdej jednej jeździe szosowej — pierścienie w zakładce Objętość pokazywały pustkę i mówiły wprost dlaczego. Teraz masz 9003 sekundy zapisu z pasa piersiowego i pierwszy prawdziwy rozkład stref: Z1 0,5%, Z2 68,3%, Z3 30,7%, Z4 0,5%, Z5 0%."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Rozkład stref tętna — ostatnie 7 dni"
  },
  {
   "t": "akapit",
   "tekst": "Ten rozkład jest dobry i zły jednocześnie. Dobry, bo prawie 70% czasu poniżej progu tlenowego to jest baza i dokładnie o to chodzi we wrześniu. Zły, bo brakuje drugiego bieguna: modelowi spolaryzowanemu potrzeba około 15–20% czasu powyżej progu, a ty masz 0,5%. Efektywność liczona ze wzorca Seilera pokazuje 58% i to nie jest ocena tego, ile jeździsz, tylko jak rozłożony jest wysiłek. Sama baza bez ani jednego twardego akcentu daje w tej skali około 51% — jesteś więc siedem punktów nad czystą bazą. Nie poprawiaj tego w tym tygodniu: po piętnastu dniach przerwy baza jest właściwym miejscem. Poprawiaj od drugiego tygodnia września."
  },
  {
   "t": "akapit",
   "tekst": "Druga liczba z pasa jest ciekawsza niż strefy. Policzyłem dryf sercowo-oddechowy — stosunek prędkości do tętna w pierwszej i drugiej połowie jazdy. 30 sierpnia: 0,1727 wobec 0,1569, czyli −9,2%. 31 sierpnia: 0,1601 wobec 0,1635, czyli +2,1%. Wartość poniżej 5% uznaje się za świadectwo dobrej bazy tlenowej, więc dzisiejsza jazda wypadła bardzo dobrze — 90 minut i tętno nie odjechało od prędkości ani o punkt procentowy w złą stronę. Zastrzeżenie, żeby nie było nieporozumienia: na szosie ten wskaźnik zaburza wiatr, teren i to, czy jechałeś w kole. Dwie jazdy to nie trend. Ale kierunek jest właściwy i warto go pilnować co jazdę."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Jazda z 30 sierpnia ma RPE 2, a pomiar mówi, że 17 minut z 61 spędziłeś w Z3, czyli w tempie. RPE 2 to „bardzo lekko” — trzecia strefa nią nie jest. To pierwszy raz, kiedy da się sprawdzić twoją deklarację pomiarem, i wyszła rozbieżność. Ma to konsekwencję liczbową: krzywa formy i licznik regeneracji biorą teraz wysiłek z tętna, gdy pas był założony, właśnie dlatego, że pomiar wygrywa z deklaracją. Wpisuj RPE dalej — ale wiedz, że od teraz strona umie je zweryfikować."
  },
  {
   "t": "naglowek",
   "tekst": "Siedem rekordów, które nie są rekordami"
  },
  {
   "t": "akapit",
   "tekst": "Dzisiejsza jazda przecięła 60 segmentów i na siedmiu z nich masz najlepszy czas w historii. Sprawdziłem każdy z tych siedmiu: „Ciszyca-Opacz”, „Gassy (CiszycaOpacz) Gassy”, „Ciszyca - Opacz - Gassy”, „Lotnisko - Cieciszew - Obory (short) Loop”, „GRG - Rozrzutna Paulina”, „TRIPOWER TT a” i „LCC KOM”. Wszystkie siedem to pierwsze przejazdy w życiu. Rekord z jednej próby jest rekordem z definicji, a nie z powodu formy. Na 53 segmentach, które już znałeś, dziś nie padł ani jeden."
  },
  {
   "t": "akapit",
   "tekst": "Na tych 22 segmentach, które masz przejechane co najmniej dziesięć razy, mediana straty do własnego rekordu wynosi dziś 69,1%. Najbliżej byłeś na „obczajce” (+28,2%), najdalej na „[Na Osi - ] OS-2” (+78,8%). Na większości z nich dzisiejszy przejazd to ostatnie albo przedostatnie miejsce w tabeli."
  },
  {
   "t": "lista",
   "punkty": [
    "obczajka — +28,2% do rekordu, 11. miejsce z 11 prób",
    "I Got Bad — +34,0%, 26. z 27",
    "Gassy sprint — +34,1%, 10. z 11",
    "Od lasu do pałacu — +40,7%, 26. z 27 (rekord 59 s z 22 lipca, dziś 83 s)",
    "Potulickich do Od lasu — +42,7%, 25. z 25"
   ]
  },
  {
   "t": "akapit",
   "tekst": "I teraz najważniejsze zdanie w całej tej analizie: to nie jest werdykt o formie. Dzisiejsza jazda miała RPE 4 i 68% czasu w drugiej strefie — to była baza, a nie ściganie. Twoje rekordy na tych segmentach padły 22 lipca i 8 czerwca, czyli w dniach, w których jechałeś na maksa. Porównywanie spokojnej jazdy do rekordu ze sprintu nie mierzy niczego poza tym, że jedna była spokojna, a druga nie. Tabela segmentów tego rozróżnienia nie robi — traktuje każdy przejazd tak samo — i dlatego RPE przy każdej jeździe nie jest ozdobą, tylko jedynym powodem, dla którego da się te liczby uczciwie czytać. Prawdziwy pomiar formy na segmencie dostaniesz dopiero wtedy, gdy pojedziesz go z zamiarem."
  },
  {
   "t": "wykres_segment",
   "segment": "12134121",
   "tytul": "Od lasu do pałacu — 27 prób, rekord 59 s"
  },
  {
   "t": "naglowek",
   "tekst": "Od jutra liczy się plan"
  },
  {
   "t": "akapit",
   "tekst": "1 września zaczyna się pierwszy tydzień planu objętości: 3 godziny. Dzisiejsze 1,5 godziny wpada do tego samego słupka na wykresie (tydzień 31.08–06.09 pokrywa się z tygodniem planu w sześciu dniach na siedem), więc masz połowę tygodnia zrobioną pierwszego dnia. Zostaje 1,5 godziny na sześć dni — to jest wykonalne bez wysiłku i dokładnie dlatego pierwszy tydzień jest ustawiony tak nisko. Kolejne: 4 h, 4,5 h, potem 3,5 h odciążenia, potem 5 h. Dla porównania twój najlepszy tydzień tego lata to 5,3 godziny (tydzień od 10 sierpnia)."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach — plan wrześniowy zaczyna się jutro"
  },
  {
   "t": "akapit",
   "tekst": "1 września otwiera się też okno Żółtej koszulki: od jutra do 24 grudnia żadna przerwa dłuższa niż 14 dni. To 115 dni, w których wolno ci mieć najwyżej trzynaście dni z rzędu bez roweru. Twoja przerwa z sierpnia trwała piętnaście — zmieściła się w kryterium sezonu tylko dlatego, że wyjazd do Francji zgłosiłeś zawczasu i wariant B takich wyjazdów nie liczy. W Żółtej koszulce nie ma odpowiednika tego wyjątku. Zostało ci też tylko jedno zgłoszenie wyjazdu bez roweru na cały rok kalendarzowy."
  },
  {
   "t": "naglowek",
   "tekst": "Czego wciąż nie ma"
  },
  {
   "t": "akapit",
   "tekst": "Wszystkie twoje rekordy mocy pochodzą z trzech jazd na Zwifcie z października i listopada 2025: wyścig z 18 października, „Strength” z 22 października i „Strength” z 1 listopada. Nic młodszego niż dziesięć miesięcy. To nie znaczy, że nie jesteś dziś mocniejszy — to znaczy, że nie ma czym tego zmierzyć, bo na szosie nie masz miernika, a na Zwifcie nie byłeś od listopada. Dopóki to się nie zmieni, krzywa mocy jest historią, a nie stanem."
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — wszystko z jesieni 2025"
  },
  {
   "t": "akapit",
   "tekst": "Warto na nią spojrzeć razem z prognozą na grudzień 2026, bo jedna rzecz jest tam już rozstrzygnięta. Cel na 5 sekund to 720 W, a ty masz 804 W z 1 listopada — ten jest zrobiony i nie wróci. Reszta wygląda inaczej: 40 s cel 545 W wobec dzisiejszych 237 W, 5 minut cel 300 W wobec 172 W, 20 minut cel 225 W wobec 148 W. To są skoki rzędu 50–130%, w cztery miesiące, licząc od pomiarów sprzed dziesięciu miesięcy. Nie mówię, że są niemożliwe — mówię, że nie ma dziś ani jednej danej, która pozwalałaby ocenić, jak blisko nich jesteś. Pierwszy powrót na Zwift albo pierwszy miernik zmieni to jednym pomiarem."
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując dzisiejszy stan: wróciłeś po piętnastu dniach dwiema spokojnymi jazdami, założyłeś pas i od razu wypadło z tego coś wartościowego — dryf 2,1% przy 90 minutach to solidna baza. Forma pokazuje +17 i będzie spadać przez najbliższe dni, bo tak działa powrót do treningu; to jest oczekiwane, nie alarmujące. Siedem dzisiejszych „rekordów” to pierwsze przejazdy, a nie przyspieszenie. Od jutra masz plan, który przez pierwszy tydzień wymaga od ciebie 1,5 godziny więcej niż już zrobiłeś, i okno Żółtej koszulki, w którym przerwa dłuższa niż trzynaście dni kończy sprawę. Najbardziej użyteczna rzecz, jaką możesz zrobić w tym tygodniu, to nie jedna mocna jazda, tylko trzecia i czwarta spokojna."
  }
 ]
};
