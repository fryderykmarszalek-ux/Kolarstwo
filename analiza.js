// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 05.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-05T11:20",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 87,
 "dane_pobrano": "2026-09-05T08:32",
 "odcisk": "0f54d247962449ea",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Dzień bez roweru, na którym najciekawsze jest to, jak szybko wróciłeś do siebie"
  },
  {
   "t": "akapit",
   "tekst": "Dziś nie jechałeś i nie ma w tym nic złego — wczoraj napisałem, że najlepszą rzeczą na ten weekend jest nic. Ale jedna liczba zmieniła się przez noc tak mocno, że warto się przy niej zatrzymać. Wczoraj zmęczenie stało na 8 z 10 z podpisem „ciało prosi o dzień wolny”. Dziś stoi na 2 z 10, z podpisem „praktycznie wypoczęty, można uderzyć”. Licznik regeneracji doszedł do zera, czyli te 17 godzin zostało odrobione co do godziny."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Zmęczenie",
     "wartosc": "2/10",
     "stopka": "wczoraj 8/10"
    },
    {
     "etykieta": "Forma",
     "wartosc": "−7",
     "stopka": "wczoraj −21"
    },
    {
     "etykieta": "Tydzień",
     "wartosc": "3,1 h",
     "stopka": "plan 3 h · dowieziony"
    },
    {
     "etykieta": "Bez jazdy",
     "wartosc": "1 dzień",
     "stopka": "limit 14"
    }
   ]
  },
  {
   "t": "akapit",
   "tekst": "Skąd taki skok. Zmęczenie jest średnią wykładniczą o stałej 7 dni, więc każdy dzień bez obciążenia zabiera mu współczynnik 1 − e^(−1/7) = 0,133, czyli 13,3% stanu. Wytrenowanie ma stałą 42 dni i traci 2,35% dziennie. Jeden dzień przerwy: zmęczenie 126 → 109, wytrenowanie 105 → 102. Forma, czyli różnica, skacze z −21 na −7 po jednym dniu bez roweru. To jest arytmetyka, nie regeneracja — ale akurat tutaj obie mówią to samo, bo licznik godzin też doszedł do zera."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — jeden dzień przerwy i forma wraca"
  },
  {
   "t": "akapit",
   "tekst": "Wniosek na przyszłość, bo to się będzie powtarzać: odczyt „obciążony” po mocnej jeździe nie jest ostrzeżeniem o przetrenowaniu. To normalna reakcja na bodziec i schodzi w jeden, dwa dni. Alarmem byłoby coś innego — zmęczenie utrzymujące się wysoko przez tydzień albo dłużej przy wytrenowaniu stojącym w miejscu. Tego nie masz i nie miałeś ani razu w tym roku."
  },
  {
   "t": "naglowek",
   "tekst": "Cztery jazdy, RPE 2, 4, 6, 8"
  },
  {
   "t": "akapit",
   "tekst": "Zajrzałem w RPE czterech jazd od powrotu z Francji i wyszedł z tego wzór, który wygląda jak zaplanowany: 30 sierpnia RPE 2, 31 sierpnia RPE 4, 2 września RPE 6, 4 września RPE 8. Równa drabinka co dwa punkty, z dniem przerwy między każdym kolejnym stopniem. Jeśli to był plan — dobry plan, bo tak właśnie wraca się po piętnastu dniach bez roweru: nie od razu na maksa i nie tygodniami na luzie. Jeśli wyszło przypadkiem, warto to zauważyć i powtórzyć."
  },
  {
   "t": "lista",
   "punkty": [
    "30.08 · Z2 1 HR — 22,5 km, 61 min, RPE 2, pierwsza jazda z pasem",
    "31.08 · Morning 90min — 33,6 km, 90 min, RPE 4, dryf 2,1%",
    "02.09 · Evening LTHR+ sprints — 19,7 km, 55 min, RPE 6, tętno maks. 187",
    "04.09 · Morning 10min, 4 min + 30s+10s — 19,1 km, 44 min, RPE 8, tętno maks. 197"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Zwróć uwagę na coś, co widać dopiero w tym zestawieniu: im mocniejsza jazda, tym krótsza. 90 minut na RPE 4, 44 minuty na RPE 8. To jest poprawnie zrobione i nie jest oczywiste — najczęstszy błąd przy powrocie do formy polega na tym, że mocny trening jest jednocześnie długi, bo „skoro już jadę”. Tydzień, w którym intensywność rośnie, a czas maleje, jest dokładnie tym, czym ma być."
  },
  {
   "t": "naglowek",
   "tekst": "Czego w tym tygodniu nie było: długiej jazdy"
  },
  {
   "t": "akapit",
   "tekst": "I to jest jedyna rzecz, którą mam do zarzucenia. Plan na wrzesień i październik mówi wprost: niedzielna długa startuje od 50 km i rośnie o 8–10 km co dwa tygodnie, żeby pod koniec października dojść do 80. Najdłuższa jazda tego września to 19,7 km. Dla porównania: w lipcu 64,3 km, w maju 47,1, w czerwcu 46,2, nawet w sierpniu przed wyjazdem 43,3. Wrzesień ma dziś najniższe maksimum miesiąca w całej liczonej historii."
  },
  {
   "t": "wykres_dlugie",
   "tytul": "Najdłuższa jazda w miesiącu — wrzesień na razie odstaje"
  },
  {
   "t": "akapit",
   "tekst": "Trzy godziny tygodnia dowiozłeś, ale zrobiłeś to trzema krótkimi jazdami. Objętość się zgadza, kształt nie. Jutro jest niedziela, jesteś wypoczęty na 2 z 10, a licznik regeneracji stoi na zerze — trudno o lepszy moment na pierwszą długą. Nie 80 km i nawet nie 64: plan mówi 50 i to jest właściwa liczba na pierwszy raz po przerwie. Przy Twoim tempie z ostatnich jazd to jakieś dwie i pół godziny spokojnie, czyli więcej niż cały ten tydzień razem wzięty. Jeśli to wypadnie, przesuwa też Koszulkę młodzieżową (pierwsza jazda 80 km) z 83% na coś, co da się realnie planować."
  },
  {
   "t": "naglowek",
   "tekst": "Progi stref wciąż nie doszły"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Piszę to drugi raz, bo bez tego kawałek strony pokazuje liczby, o których już wiemy, że są policzone starą miarą. W dane.js nadal stoi jedna tabela tętna, ta z 27 sierpnia: Z4 od 161, Z5 od 181. Twoja poprawka po teście siedzi w pamięci Safari i nic z niej nie wynika — strona czyta gotowe sekundy z pliku, a nie przelicza ich przy wyświetlaniu. Wejdź w Objętość → Tętno, naciśnij „Progi dla Claude'a…” i wklej mi to, co wypisze. Wtedy wpiszę je do danych i przeliczę wszystkie jazdy od nowa. Do tego czasu pierścienie i efektywność opisują starą tabelę, nie Twój próg."
  },
  {
   "t": "akapit",
   "tekst": "Dlaczego to nie jest drobiazg. Przy starej tabeli jazda z 4 września ma 11 minut 47 sekund w piątej strefie, a 10 minut 55 w czwartej. Dwanaście minut w Z5 na czterdziestoczterominutowej jeździe to za dużo, żeby było prawdą — piąta strefa to wysiłek, którego nie utrzymuje się tak długo. Podejrzewam, że po Twojej poprawce spora część tego czasu przeniesie się do Z4, a ocena efektywności też się zmieni. Ale to jest podejrzenie, a nie liczba, i takim zostanie, dopóki progi nie trafią do pliku."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 30,
   "tytul": "Strefy tętna, 30 dni — nadal STARĄ tabelą"
  },
  {
   "t": "akapit",
   "tekst": "Jedna uwaga do tego pierścienia: okno 30-dniowe pokazuje dziś dokładnie to samo co 7-dniowe, bo cały zapis tętna, jaki masz, pochodzi z ostatnich siedmiu dni. To nie jest błąd wykresu — po prostu pas dostałeś 30 sierpnia. Za trzy tygodnie te dwa okna zaczną mówić różne rzeczy i wtedy trzydziestka stanie się użyteczna."
  },
  {
   "t": "naglowek",
   "tekst": "Co dalej"
  },
  {
   "t": "lista",
   "punkty": [
    "Jutro (niedziela) — długa jazda, cel 50 km, spokojnie w Z2. Jesteś wypoczęty, a wrzesień nie ma jeszcze ani jednej długiej.",
    "Poniedziałek — koniec pierwszego tygodnia planu. 3,1 h z 3 h już jest, więc długa jazda to czysty zysk.",
    "Wtorek — start drugiego tygodnia: 4 godziny. To o godzinę więcej niż w tym tygodniu i najwięcej od 10 sierpnia.",
    "Kiedykolwiek — wklej progi stref, żeby pierścienie zaczęły mówić prawdę.",
    "Żółta koszulka: dzień 5 ze 115, przerwa 1 dzień. Nic do pilnowania poza tym, żeby z jednego dnia nie zrobił się tydzień."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując tydzień, bo to był pierwszy pełny tydzień po przerwie: plan objętości dowieziony w piątek, cztery jazdy o czterech różnych zadaniach, tętno maksymalne podniesione z 170 na 197, HRmax 201 praktycznie potwierdzone, szesnaście podiów na dwadzieścia pięć segmentów w sesji interwałowej i Koszulka sprinterska na dziesięć sekund. Jak na dziesięć dni od powrotu z Francji, gdzie nie było roweru przez piętnaście dni, to jest dobry tydzień. Brakuje w nim jednej rzeczy i wiesz już której."
  }
 ]
};
