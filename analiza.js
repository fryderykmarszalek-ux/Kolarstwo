// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 06.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-06T20:40",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 88,
 "dane_pobrano": "2026-09-06T18:01",
 "odcisk": "2f20775d0e0291a7",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Osiem rekordów i ostrzeżenie, które strona wypisała sama"
  },
  {
   "t": "akapit",
   "tekst": "„Z3/4 intervals”: 34,1 km w 82 minutach, tętno średnie 153, RPE 5, 891 kcal. To najdłuższa jazda tego września i najszybsza tego tygodnia — 24,9 km/h średnio. Wjechało z niej 59 przejazdów przez segmenty, osiem rekordów i dwadzieścia miejsc na podium. To bardzo dużo jak na jedną jazdę. Zacznę jednak od czegoś innego, bo zakładka Regeneracja pokazuje dziś stopień 9 z 10 i zdanie „Wolne. Trening tutaj to już nie bodziec, tylko szkoda”."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Rekordy",
     "wartosc": "8",
     "stopka": "z 59 przejazdów"
    },
    {
     "etykieta": "Tydzień",
     "wartosc": "4,5 h",
     "stopka": "plan 3 h · 151%"
    },
    {
     "etykieta": "Zmęczenie",
     "wartosc": "9/10",
     "stopka": "przeciążony"
    },
    {
     "etykieta": "Forma",
     "wartosc": "−43",
     "stopka": "111 − 154"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Najpierw ostrzeżenie, bo jest ważniejsze niż rekordy"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Cztery jazdy w siedem dni, z czego trzy mocne, i wszystkie w ciągu pięciu dni: 2 września sprinty, 4 września interwały z tętnem 197, dziś półtorej godziny w tempie i progu. Napięcie zmęczenie do wytrenowania wynosi 1,39 — najwyższe od lipca. Licznik regeneracji daje 23 godziny za samą tę jazdę i pełną gotowość dopiero jutro wieczorem. Wczoraj napisałem, że najlepszą rzeczą na weekend jest nic; wyszło odwrotnie i to jest w porządku, bo jazda była dobra. Ale poniedziałek i wtorek mają być wolne albo bardzo lekkie. Nie dlatego, że coś się stało — dlatego, że kolejny mocny akcent w tym stanie nie doda już nic, a odejmie."
  },
  {
   "t": "akapit",
   "tekst": "Dla równowagi trzy rzeczy, które trzymają to w proporcji. Po pierwsze, forma −43 nie jest żadnym rekordem: najniższa w tym roku to −151 z 16 lipca, czyli trzy i pół raza głębiej. Po drugie, wytrenowanie po raz pierwszy od czerwca rośnie szybko — 98 na koniec sierpnia, dziś 111. Po trzecie, ujemna forma w bloku treningowym jest celem, nie usterką; problemem staje się dopiero wtedy, gdy trwa tygodniami, a wytrenowanie przestaje rosnąć. Trwa pięć dni i rośnie. Czyli: odpocznij dwa dni i wracaj, a nie „przestań”."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — nożyce z ostatnich pięciu dni"
  },
  {
   "t": "naglowek",
   "tekst": "Co było w tej jeździe"
  },
  {
   "t": "akapit",
   "tekst": "Profil co dwie minuty pokazuje długi, spójny blok pracy, a nie pojedyncze zrywy: od dwunastej do czterdziestej szóstej minuty tętno prawie nie schodzi poniżej 150, trzymając się w paśmie 150–172 przy prędkości 25–32 km/h. Potem kilkanaście minut lżej, jeden akcent w 64. minucie (szczyt 190) i finisz w 82. minucie — 187 uderzeń przy 37 km/h. Nazwa jazdy zgadza się z zapisem, co po „LTHR+ sprints” z 2 września warto odnotować."
  },
  {
   "t": "lista",
   "punkty": [
    "45 minut z tętnem co najmniej 150",
    "26 minut z tętnem co najmniej 160",
    "6 minut 23 sekundy powyżej 170",
    "61 sekund powyżej 180, szczyt 190",
    "Prędkość maksymalna 45,3 km/h"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podaję to w uderzeniach, a nie w strefach, celowo — te liczby są prawdziwe niezależnie od tego, gdzie postawisz granice stref. Sam podział czasu na Z2, Z3 i Z4 zależy od progów, a te wciąż czekają (o czym niżej)."
  },
  {
   "t": "naglowek",
   "tekst": "Osiem rekordów — i ile są warte"
  },
  {
   "t": "akapit",
   "tekst": "Jechałeś dziś inną trasą niż zwykle, przez Saneczkową i Cieciszew, i tam padły wszystkie rekordy. Muszę jednak powiedzieć, ile z nich waży, bo to nie jest jedno i to samo. Sześć z ośmiu padło na segmentach, które masz przejechane dwa albo trzy razy — tam rekord jest łatwy, bo konkurencja to Ty sprzed miesiąca, jadący tamtędy pierwszy raz. Dwa są mocne same z siebie i to na nie warto patrzeć."
  },
  {
   "t": "lista",
   "punkty": [
    "Lotnisko – Cieciszew – Obory (short) Loop — 7,4 km w 16:22, o 3 minuty 25 sekund lepiej niż poprzednio, średnio 27,2 km/h",
    "Cieciszew – Obory – Lądowisko — 4,8 km w 10:41, o 1 minutę 46 sekund lepiej, średnio 27,0 km/h",
    "Uphill Saneczkowa — 306 m w 35 s zamiast 48 s (31,5 km/h)",
    "Saneczkowa (former) cobblestone climb — 402 m w 45 s zamiast 59 s (32,1 km/h)"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Najciekawsza liczba dnia nie jest jednak żadnym rekordem. Na „Sprint do Obory” zrobiłeś 63 sekundy — dokładnie tyle samo, co 27 czerwca i 13 sierpnia. Trzy przejazdy, ten sam czas co do sekundy. Formalnie jesteś trzeci, bo przy remisie rekord należy do tego, kto zrobił ten czas pierwszy, ale wyrównałeś swój najlepszy wynik dziesięć dni po powrocie z piętnastodniowej przerwy. To mówi o formie więcej niż sześć rekordów na segmentach z trzema próbami."
  },
  {
   "t": "akapit",
   "tekst": "Na dwudziestu dziewięciu segmentach, które masz przejechane co najmniej pięć razy, mediana straty do rekordu wynosi dziś 21,5%. Dla porównania: 4 września, w sesji interwałowej, było 9,6%, a 31 sierpnia, na spokojnej jeździe, 69,1%. Wszystkie trzy liczby są zgodne z tym, jak jechałeś — dziś była to praca w tempie, nie polowanie na czasy."
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień: 151% planu"
  },
  {
   "t": "akapit",
   "tekst": "Plan na 1–7 września to 3 godziny. Masz 4 godziny 31 minut i jeszcze jeden dzień do końca. To drugi najmocniejszy tydzień w całej liczonej historii — więcej było tylko raz, 5 godzin 17 minut w tygodniu od 10 sierpnia. Cztery jazdy: 90 minut spokojnie, 55 ze sprintami, 44 interwałowe i 82 dzisiaj. Objętość zrobiona z ogromnym zapasem."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach — 4,5 h przy planie 3 h"
  },
  {
   "t": "akapit",
   "tekst": "I tu jedno „ale”, bo wczoraj pisałem o czymś innym. Sugerowałem na niedzielę długą jazdę, 50 km spokojnie w drugiej strefie — plan wrześniowy przewiduje niedzielną długą i to ona buduje bazę pod cel 80 km na koniec października. Pojechałeś 34,1 km w tempie i progu. To jest lepsze niż nic i jest najdłuższą jazdą września, ale nie zastępuje długiej: 82 minuty w tempie i dwie i pół godziny spokojnie to dwa różne treningi, robiące dwie różne rzeczy. Długa wciąż czeka, a rekord życiowy na dystansie to 64,3 km z 14 lipca — do 80 km jest jeszcze kawałek i nie zrobi się sam."
  },
  {
   "t": "naglowek",
   "tekst": "Progi stref — teraz to już nie jest drobiazg"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Trzeci raz i ostatni, bo dziś zaczęło to psuć rzeczy poważniejsze niż pierścień. W dane.js nadal jest tylko tabela z 27 sierpnia. Twoja poprawka działa u Ciebie w Safari, ale ja liczę ze starej — więc liczby stref, efektywność, wysiłek jazdy, licznik regeneracji i stopień zmęczenia widzę inne, niż Ty widzisz na iPadzie. Wysiłek jazdy liczy się z czasu w strefach, więc od progów zależy nawet to, ile godzin regeneracji strona Ci przyzna. Naciśnij „Progi dla Claude'a…” w Objętość → Tętno i wklej mi to, co wypisze. Do tego czasu każda moja liczba ze stref jest liczbą ze starej tabeli i tak ją traktuj."
  },
  {
   "t": "akapit",
   "tekst": "Pokażę, jak bardzo to zmienia obraz. Starą tabelą tydzień wygląda tak: 39,2% w Z2, 42,1% w Z3, 13,5% w Z4, 5,0% w Z5, a efektywność spada do 21% z komentarzem „to nie jest trening spolaryzowany”. Gdyby to była prawda, byłby to najpoważniejszy zarzut tego tygodnia — 42% czasu w tempie to klasyczna szara strefa, za mocna na bazę i za słaba na rozwój. Ale jeśli Twoje progi są wyższe, spora część tego czasu jest po prostu drugą strefą i cały zarzut znika. Nie wiem, która wersja jest prawdziwa, i dlatego nie stawiam tu tezy — stawiam prośbę o osiem liczb."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna, 7 dni — u mnie STARĄ tabelą, u Ciebie Twoją"
  },
  {
   "t": "naglowek",
   "tekst": "Na najbliższe dni"
  },
  {
   "t": "lista",
   "punkty": [
    "Poniedziałek i wtorek — wolne albo bardzo lekko. Pełna gotowość wypada jutro o 18:26, a stopień 9 z 10 to nie jest odczyt do zignorowania.",
    "Wtorek zaczyna drugi tydzień planu: 4 godziny. Po tym tygodniu wiesz już, że dowieziesz — pytanie brzmi, jak.",
    "W tym tygodniu jedna długa, spokojna jazda: 50 km, druga strefa, bez ani jednego akcentu. To jedyna rzecz, której we wrześniu jeszcze nie było.",
    "Progi stref do wklejenia — bez nich połowa liczb na tej stronie znaczy dla mnie co innego niż dla Ciebie.",
    "Żółta koszulka: dzień 6 ze 115, przerwa 0 dni. Tu wszystko w porządku."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując pierwszy pełny tydzień po przerwie: plan przekroczony o połowę, cztery jazdy o czterech różnych zadaniach, tętno maksymalne podniesione ze 170 na 197, osiem rekordów, wyrównany najlepszy czas na „Sprint do Obory” i wytrenowanie z 98 na 111. To jest bardzo dobry tydzień i nie ma sensu udawać, że jest inaczej. Dwie rzeczy do poprawienia są za to konkretne i obie łatwe: brakuje długiej jazdy, a strona nie zna Twoich progów. Żadna z nich nie wymaga większego wysiłku — jedna wymaga dwóch i pół godziny w drugiej strefie, druga jednego dotknięcia ekranu."
  }
 ]
};
