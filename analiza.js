// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 18.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-18T21:15",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 93,
 "dane_pobrano": "2026-09-18T20:40",
 "odcisk": "2764e4269ec88ef5",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "70,2 km — najdłuższa jazda w całej historii"
  },
  {
   "t": "akapit",
   "tekst": "„Zwift - Pacer Group Ride with Bernie”, Watopia's Waistband: 70,2 km w 2 godziny 22 minuty, moc średnia 105 W, tętno średnie 138, RPE 3, 856 kcal. Poprzedni rekord dystansu to 66,6 km z Chojnic 6 sierpnia 2024, czyli sprzed dwóch lat i jednego miesiąca. W liczonym oknie rekordem było 64,3 km z 14 lipca. Oba właśnie padły."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Dystans",
     "wartosc": "70,2 km",
     "stopka": "rekord życiowy"
    },
    {
     "etykieta": "Zmienność mocy",
     "wartosc": "1,03",
     "stopka": "idealnie równo"
    },
    {
     "etykieta": "Dryf moc:tętno",
     "wartosc": "−1,8%",
     "stopka": "przez 2h22"
    },
    {
     "etykieta": "Poniżej 142",
     "wartosc": "82,9%",
     "stopka": "czysta baza"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Pierwszy raz mogę policzyć dryf JAK NALEŻY"
  },
  {
   "t": "akapit",
   "tekst": "To jest dla mnie ważniejsze niż sam rekord. Dryf sercowo-oddechowy mierzy się jako spadek stosunku MOCY do tętna między pierwszą a drugą połową jazdy — to jest definicja. Na szosie nie masz miernika, więc przez cały wrzesień podstawiałem prędkość zamiast mocy i za każdym razem pisałem, że wiatr i teren tę liczbę psują. Dziś mam jedno i drugie: moc z trenażera i tętno z pasa, na jednej jeździe, przez 142 minuty."
  },
  {
   "t": "lista",
   "punkty": [
    "Pierwsza połowa: 105,7 W przy tętnie 137,8",
    "Druga połowa: 104,2 W przy tętnie 138,4",
    "Stosunek moc:tętno spadł o 1,8%",
    "Poniżej 5% to świadectwo dobrej bazy tlenowej — masz niecałe dwa"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Dla porównania: 8 września na dwugodzinnej jeździe szosowej wyszło −2,4%, ale liczone prędkością, więc z zastrzeżeniem. Dziś zastrzeżenia nie ma. Trenażer trzyma opór stały, nie ma wiatru ani zjazdów, więc −1,8% to czysty pomiar tego, jak Twoje serce znosi dwie i pół godziny pracy. Znosi bardzo dobrze."
  },
  {
   "t": "naglowek",
   "tekst": "Równość tej jazdy jest nietypowa"
  },
  {
   "t": "akapit",
   "tekst": "Rozbiłem przebieg na kwadranse i moc średnia w kolejnych blokach wyszła: 107, 106, 106, 104, 105, 106, 108, 105, 98, 102 W. Tętno w tych samych blokach: 140, 139, 138, 136, 135, 138, 139, 139, 138, 141. Przez dwie i pół godziny ani jeden kwadrans nie odstaje. Zmienność mocy (moc znormalizowana 108 W podzielona przez średnią 105 W) wynosi 1,03 — to praktycznie linia prosta."
  },
  {
   "t": "akapit",
   "tekst": "Tętno maksymalne całej jazdy to 162, przy Twoim HRmax 201. Ani jednej sekundy w czwartej strefie, jedenaście sekund powyżej 160. Osiemdziesiąt trzy procent czasu poniżej 142, czyli w drugiej strefie według progu, który sam zmierzyłeś. To jest dokładnie ta jazda, której brakowało we wrześniu — i pierwsza, która nie ma ani jednego akcentu."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna, 7 dni — 12,9 godziny zapisu"
  },
  {
   "t": "naglowek",
   "tekst": "Jedno zastrzeżenie do rekordu"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Kilometr na trenażerze to nie to samo co kilometr na szosie i strona mówi to wprost od początku — słupek wrześniowy na wykresie najdłuższych jazd jest kreskowany właśnie dlatego. Jechałeś w grupie Pacera, gdzie Zwift liczy jazdę na kole, więc 29,7 km/h przy 105 W to prędkość z osłony, a nie z mocy. Rekord dystansu jest prawdziwy i cieszy, ale nie zamyka tematu długiej jazdy z planu: ta ma być na szosie i wciąż jej nie było. Najdłuższa szosowa września to 47,3 km z 8 września."
  },
  {
   "t": "wykres_dlugie",
   "tytul": "Najdłuższa jazda w miesiącu — wrzesień 70,2 km, kreskowany bo Zwift"
  },
  {
   "t": "akapit",
   "tekst": "Przy okazji: Koszulka młodzieżowa (pierwsza jazda co najmniej 80 km) przeskoczyła z 83 na 88 procent. Do celu brakuje 9,8 km. Z drugiej strony warunek nie mówi nic o nawierzchni, więc formalnie zamknąłbyś ją na Zwifcie — to jest luka w Twoim własnym regulaminie i mówię o niej teraz, a nie w dniu, w którym by padła."
  },
  {
   "t": "naglowek",
   "tekst": "Obciążenie: RPE 3, pomiar mówi co innego"
  },
  {
   "t": "akapit",
   "tekst": "Wpisałeś RPE 3, czyli bardzo lekko. Wysiłek policzony z czasu w strefach tętna wyszedł 4,1 na 10. Sama jazda dostała 21 godzin regeneracji, a gdyby liczyć z RPE — tylko 12. Nie jest to duży rozjazd jak na poprzednie przypadki, ale kierunek ten sam: dwie i pół godziny to obciążenie samo w sobie, nawet przy niskim tętnie. TSS tej jazdy wychodzi 123 przy FTP 150, a to najwyższa pojedyncza wartość w całych Twoich danych z mocą."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Zmęczenie znów pokazuje 10 na 10, napięcie 1,51, forma −65. Cztery dni przerwy z zeszłego tygodnia zostały odrobione w dwa dni: wczoraj test FTP, dziś dwie i pół godziny. Wytrenowanie za to idzie 117 → 124 → 128 i jest najwyżej od 21 lipca, a do szczytu 146 brakuje osiemnastu punktów. Jutro dzień wolny — nie dlatego, że coś poszło źle, tylko dlatego, że po teście progowym i najdłuższej jeździe życia w ciągu dwóch dni trzeci dzień z rzędu nic nie doda."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — wytrenowanie 128, najwyżej od lipca"
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień"
  },
  {
   "t": "akapit",
   "tekst": "Plan na 15–21 września to 4,5 godziny, najwyższa wartość w całym planie. Masz 3 godziny 7 minut po czterech dniach, więc zostaje niecałe półtorej godziny na trzy dni. To jest do zrobienia jedną spokojną jazdą w weekend. Trzeci tydzień z rzędu skończy się wtedy na albo ponad planem, a poprzednie dwa dały 4,5 h i 4,3 h."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach — trzeci tydzień planu w toku"
  },
  {
   "t": "lista",
   "punkty": [
    "Jutro — wolne. Dwa dni z rzędu po czterodniowej przerwie to już blok.",
    "Weekend — półtorej godziny domyka plan. Na szosie, jeśli pogoda pozwoli.",
    "Długa szosowa nadal czeka: wrzesień ma 47,3 km, a plan mówi o wzroście do 55.",
    "Koszulka młodzieżowa: 88%, brakuje 9,8 km do osiemdziesiątki.",
    "Żółta koszulka: dzień 18 ze 115, przerwa 0 dni."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: dwa dni, dwie jazdy, dwie rzeczy, których wcześniej nie było. Wczoraj pierwszy zmierzony próg od jedenastu miesięcy, dziś najdłuższa jazda w historii i pierwszy dryf policzony tak, jak się go liczy naprawdę. Obie z pomiarem mocy, obie po czterodniowym odpoczynku. To nie jest przypadek — odpoczynek był warunkiem jednego i drugiego. Jeśli wrzesień skończy się tak, jak idzie, będzie najlepszym miesiącem, jaki masz w tych danych."
  }
 ]
};
