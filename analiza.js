// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 02.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-02T20:15",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 86,
 "dane_pobrano": "2026-09-02T17:43",
 "odcisk": "cb70ee497a57c5a3",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Pierwsze tętno powyżej 180 — i pierwszy prawdziwy rekord od powrotu"
  },
  {
   "t": "akapit",
   "tekst": "„Evening LTHR+ sprints”: 19,7 km w 55 minutach, 514 kcal, RPE 6. Krótka jazda, a najgęstsza w dane ze wszystkiego, co masz w pliku. Po raz pierwszy w historii tej strony pojawiły się sekundy w czwartej i piątej strefie tętna — do wczoraj obie stały na zerze. Najwyższe tętno tej jazdy to 187, poprzedni rekord zapisu wynosił 170. To nie jest nowe HRmax (masz udokumentowane 201 z pasa), ale to pierwsza jazda, na której pas w ogóle zobaczył górę skali."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Tętno maks.",
     "wartosc": "187",
     "stopka": "było 170 · 31.08"
    },
    {
     "etykieta": "Powyżej 180",
     "wartosc": "52 s",
     "stopka": "pierwszy raz w danych"
    },
    {
     "etykieta": "Rekord",
     "wartosc": "1 z 25",
     "stopka": "i tym razem prawdziwy"
    },
    {
     "etykieta": "Forma",
     "wartosc": "−4",
     "stopka": "101 − 105"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Co ta jazda naprawdę zawierała"
  },
  {
   "t": "akapit",
   "tekst": "Rozbiłem przebieg na dwuminutowe kawałki i kształt jest bardzo czytelny. Przez pierwsze trzydzieści minut jedziesz spokojnie i równo: tętno idzie 130 → 145, a prędkość w tym samym czasie 19 → 25 km/h. To jest dobry znak sam w sobie — tętno rośnie wolniej niż tempo. Potem zaczynają się sprinty: 32. minuta (szczyt 183), 36. (182), 42. (187) i 54. (182), każdy z wyraźnym zejściem pomiędzy. Czyli trzydzieści minut budowania i cztery mocne akcenty na końcu."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Nazwa jazdy zapowiada test LTHR i muszę powiedzieć wprost: tego testu w danych nie ma. Test progu to około 20–30 minut jednostajnego maksymalnego wysiłku ze średnią tętna z ostatnich 20 minut — a tu masz spokojne trzydzieści minut i cztery sprinty. Policzyłem najwyższą dwudziestominutową średnią tętna: 148,5 bpm. Nie podaję jej jako LTHR i nie wpisuj jej do progów stref, bo to okno łapie sprinty i przerwy między nimi, czyli mierzy coś innego niż próg. Jeśli chcesz mieć LTHR z liczby, a nie z oszacowania, potrzeba osobnej jazdy: rozgrzewka, potem 20 minut najmocniej, jak da się utrzymać do końca, bez ani jednego sprintu."
  },
  {
   "t": "akapit",
   "tekst": "Ta sama sprawa psuje dryf. Na jeździe z 31 sierpnia policzyłem 2,1% i to była wartościowa liczba, bo cała jazda szła równo. Dziś wychodzi −10,6%, ale to nic nie znaczy: druga połowa zawiera cztery sprinty, więc tętno w niej jest wysokie z powodu wysiłku, a nie zmęczenia. Dryf mierzy się na jednostajnej jeździe albo wcale."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna — 7 dni, po raz pierwszy z Z4 i Z5"
  },
  {
   "t": "akapit",
   "tekst": "Tydzień wygląda teraz tak: Z1 0,4%, Z2 65,6%, Z3 31,7%, Z4 1,8%, Z5 0,4% z 3 godzin 24 minut zapisu. Efektywność 59%, czyli o punkt lepiej niż przed tą jazdą. Rusza się w dobrą stronę, ale wolno, bo model spolaryzowany chce 15–20% powyżej progu, a masz 2,2%. Te 56 minut w Z3 to nadal największy problem tego rozkładu — trzecia strefa jest za mocna, żeby liczyła się jako baza, i za słaba, żeby coś rozwijała. Sprinty są dobre. Do poprawy jest to, co pomiędzy nimi."
  },
  {
   "t": "naglowek",
   "tekst": "Rekord, który tym razem jest rekordem"
  },
  {
   "t": "akapit",
   "tekst": "Dwa dni temu siedem „rekordów” okazało się w komplecie pierwszymi przejazdami. Dziś jest odwrotnie: z 25 segmentów padł jeden najlepszy czas i jest prawdziwy. Konstancin-Obory Hopka, 204 metry, przejechane w 27 sekund przy poprzednim najlepszym 29 — dziesiąta próba na tym segmencie, poprawa o 2 sekundy, średnia 27,3 km/h. Krótki odcinek, więc to jest rekord mocy szczytowej, a nie wytrzymałości, i pasuje dokładnie do tego, co robiłeś: sprint numer jeden."
  },
  {
   "t": "akapit",
   "tekst": "Na pozostałych 24 segmentach rekordu nie ma i to jest w porządku — jechałeś je między sprintami, czyli na regeneracji. Powtarzam to, co pisałem 31 sierpnia, bo to jest najczęstsza pułapka tej strony: czas na segmencie mierzy formę tylko wtedy, gdy jechałeś go z zamiarem. Dzisiejsza jazda ma cztery takie momenty i jeden z nich dał rekord."
  },
  {
   "t": "naglowek",
   "tekst": "Forma zeszła pod zero i tak miało być"
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie 101, zmęczenie 105, forma −4. Pierwszy ujemny odczyt od powrotu z Francji. Dwa dni temu było 98 i 81, czyli +17. Zmęczenie liczy się średnią o stałej 7 dni, więc mocna jazda podnosi je od razu, a wytrenowanie ze stałą 42 dni ledwie drgnęło: 98 → 101. Napięcie zmęczenie do wytrenowania wynosi 1,04, czyli nabierasz zmęczenia minimalnie szybciej, niż je odrabiasz. W bloku treningowym dokładnie tak ma być. Alarm byłby wtedy, gdyby to trwało tygodniami przy wytrenowaniu stojącym w miejscu."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — forma schodzi pod kreskę"
  },
  {
   "t": "akapit",
   "tekst": "Licznik regeneracji pokazuje 9,6 godziny za tę jazdę i pełną gotowość jutro nad ranem. Zwróć uwagę na jedną liczbę: wysiłek policzony z czasu w strefach tętna wyszedł 4,5 na 10, a Twoje wpisane RPE 6 dałoby 17 godzin zamiast 9,6. To jest druga jazda z rzędu, na której deklaracja i pomiar się rozjeżdżają — 30 sierpnia w drugą stronę (RPE 2 przy 17 minutach w Z3), dziś w tę. Nie przestawaj wpisywać RPE, bo bez pasa jest jedyną miarą, jaką masz. Ale to pas ma teraz ostatnie słowo i strona liczy z niego."
  },
  {
   "t": "naglowek",
   "tekst": "Tydzień planu: brakuje 36 minut"
  },
  {
   "t": "akapit",
   "tekst": "Trwa pierwszy tydzień wrześniowego planu — 3 godziny. Masz w nim 2,4 godziny: półtorej z 31 sierpnia i 55 minut z dzisiaj. Do dowiezienia zostaje 36 minut, a do niedzieli jest jeszcze pięć dni. To praktycznie pewne, więc jedyne, czym warto się teraz zająć, to czym te 36 minut wypełnić. Po dzisiejszych sprintach i przy zmęczeniu 8 na 10 odpowiedź brzmi: spokojną jazdą w Z2, nie kolejnymi akcentami. Kolejny tydzień to 4 godziny, a potem 4,5 — miejsce na mocne rzeczy będzie."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach — pierwszy tydzień planu w toku"
  },
  {
   "t": "akapit",
   "tekst": "Jedna rzecz w tle, o której łatwo zapomnieć: 1 września otworzyło się okno Żółtej koszulki i biegnie do 24 grudnia. Żadna przerwa dłuższa niż 14 dni. Okno otworzyło się we wtorek, we wtorek nie jechałeś, a dzisiejsza jazda jest w nim pierwsza. Licznik dni od ostatniej jazdy stoi na zerze i tylko tyle trzeba pilnować przez najbliższe 113 dni."
  },
  {
   "t": "lista",
   "punkty": [
    "Tętno: pierwsze 52 sekundy powyżej 180 i pierwsze sekundy w Z4 i Z5 w całej historii danych",
    "Segmenty: 1 prawdziwy rekord z 25 przejazdów — Konstancin-Obory Hopka, 27 s zamiast 29 s",
    "Forma −4, napięcie 1,04 — obciążenie rośnie zgodnie z planem, nie ponad niego",
    "Plan wrześniowy: 2,4 h z 3 h, brakuje 36 minut do niedzieli",
    "LTHR wciąż niezmierzone — potrzeba osobnej jazdy z jednym 20-minutowym odcinkiem"
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: pierwsza jazda od powrotu, na której coś naprawdę boli i coś naprawdę zostało zmierzone. Trzydzieści minut równej pracy plus cztery sprinty to sensowna jednostka, a rekord na Hopce jest jej twardym dowodem. Dwie rzeczy do poprawy, obie łatwe. Pierwsza: mniej trzeciej strefy w jazdach spokojnych — 32% tygodnia w tempie to jest jazda w szarej strefie, ani lekko, ani mocno. Druga: jeśli chcesz progu, zrób osobny test i nie mieszaj go ze sprintami, bo wtedy nie da się z tego wyciągnąć ani progu, ani sprintów. Reszta idzie tak, jak powinna."
  }
 ]
};
