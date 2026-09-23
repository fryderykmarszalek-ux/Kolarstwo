// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 23.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-23T21:00",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 98,
 "dane_pobrano": "2026-09-23T18:42",
 "odcisk": "08511f3a30d74686",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Półtorej godziny równego tempa, nowy szczyt wytrenowania i wrzesień na 470 km"
  },
  {
   "t": "akapit",
   "tekst": "„Zwift - New Workout” na Coast Crusher w Watopii: 42,86 km w 1 godzinę 31 minut 12 sekund, moc średnia 112 W, tętno średnie 132, 588 kcal, 209 metrów przewyższenia. Do tego awans poziomu. Najdłuższa sesja na trenażerze od niedzielnej setki i najspokojniejsza od tygodnia."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Dystans",
     "wartosc": "42,9 km",
     "stopka": "1:31:12 w ruchu"
    },
    {
     "etykieta": "Rekord 90 min",
     "wartosc": "110 W",
     "stopka": "było 106 · +4 W"
    },
    {
     "etykieta": "Wrzesień",
     "wartosc": "470 km",
     "stopka": "13 jazd · 17,6 h"
    },
    {
     "etykieta": "Wytrenowanie",
     "wartosc": "155",
     "stopka": "nowy szczyt · było 151"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "ERG jak z podręcznika"
  },
  {
   "t": "akapit",
   "tekst": "Spójrz na krzywą mocy tej jazdy: 167 W na jedną sekundę, 146 na pięć, a potem 120 W i już nic się nie rusza — dziesięć sekund, minuta, pięć minut, kwadrans, pół godziny, czterdzieści pięć minut, wszystko dokładnie 120 W. Płaska linia przez sześć rzędów wielkości czasu. Tak wygląda zapis sesji, w której trenażer trzymał zadaną moc, a Ty ją dowoziłeś bez ani jednego odjazdu w górę czy w dół."
  },
  {
   "t": "akapit",
   "tekst": "Iloraz, którym strona rozpoznaje ERG — pięć sekund podzielone przez kwadrans — wyszedł 1,22 przy progu 2,0. Nie jest to Twój najbardziej sterowany trening w historii, bo jesienne „Foundation” schodziły do 1,04, ale mieści się w tej samej rodzinie. Znacznik ERG stoi przy jeździe i to cała jego rola: masz wiedzieć, w jakim trybie padła liczba."
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — nowy punkt na 90 minutach"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Rekord 90-minutowy 110 W jest prawdziwy, ale powiem od razu, ile znaczy, żeby nie urósł ponad miarę. W całej historii Twoich pomiarów mocy TRZY jazdy w ogóle trwały półtorej godziny: 18 września (106 W), 20 września (105 W) i dzisiejsza. Rekord bije więc pole złożone z dwóch przejazdów, oba sprzed pięciu dni. To nie znaczy, że jest nic nie wart — znaczy, że okno 90 minut dopiero zaczyna mieć historię, bo dopiero od tygodnia jeździsz tak długo z miernikiem."
  },
  {
   "t": "naglowek",
   "tekst": "Tętno i moc mówią dwie różne rzeczy i obie są prawdziwe"
  },
  {
   "t": "akapit",
   "tekst": "Rozkład tej jazdy jest zdumiewająco czysty i warto się mu przyjrzeć, bo pokazuje coś, czego nie widać po samych średnich."
  },
  {
   "t": "lista",
   "punkty": [
    "Tętno — 96% czasu w drugiej strefie, 4% w pierwszej, reszta zero. Dziewięćdziesiąt jeden minut i praktycznie ani jednej sekundy powyżej bazy.",
    "Moc — 61% w trzeciej strefie (tempo), 35% w drugiej, zero powyżej. Program trzymał Cię nad progiem tlenowym przez większość sesji.",
    "Jedenaście przejazdów na segmentach i ani jednego rekordu. Przy równym tempie to jest dokładnie to, czego się spodziewać."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Te dwie rzeczy nie są sprzeczne. Moc 120 W to dla Ciebie trzecia strefa, czyli tempo, a tętno przy niej stoi w drugiej — i to jest dobra wiadomość, nie błąd pomiaru. Znaczy, że serce radzi sobie z tą mocą taniej niż zakłada tabela mocy. Jedna z dwóch tabel jest więc nieco przesunięta względem Twojej dzisiejszej formy i podejrzewam, że to tabela mocy, bo stoi na FTP 150 W, a Twój zmierzony próg to 174 W. Nie ruszam jej — to Twoja decyzja i Twoje liczby."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna z siedmiu dni — efektywność 71%"
  },
  {
   "t": "akapit",
   "tekst": "Na oknie siedmiodniowym efektywność rozkładu wynosi 71% z podpisem „blisko wzorca”. Cztery dni temu, po sesji progowej, liczyłem tam 58%. Podniosła to jedna rzecz, o której pisałem przez cały wrzesień: więcej czasu w drugiej strefie. Masz jej teraz 6 godzin 11 minut z dziesięciu godzin, czyli 60%, przy trzeciej strefie na 29%. Wzorzec spolaryzowany chce około 80% na dole, więc nadal nie jesteś tam, gdzie trzeba — ale w dwa tygodnie przeszedłeś od „rozkład rozjechany” do „blisko wzorca”."
  },
  {
   "t": "naglowek",
   "tekst": "Wytrenowanie 155 — najwyżej, jak kiedykolwiek było"
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie"
  },
  {
   "t": "akapit",
   "tekst": "Wytrenowanie doszło do 155 i to nowy szczyt całej historii — poprzedni wynosił 151 i stał od niedzieli, a przed tym blokiem rekordem było 146 z 20 lipca. Zmęczenie 274, forma −119. Napięcie zmęczenia do wytrenowania to 1,77, czyli tyle samo co wczoraj: dzisiejsza jazda dołożyła dokładnie tyle, ile zeszło przez dobę."
  },
  {
   "t": "ostrzezenie",
   "tekst": "I dlatego stan zmęczenia nadal stoi na 10 z 10 z podpisem „wykończenie”, a licznik regeneracji przyznał 9,6 godziny i pełną gotowość dopiero jutro o 6:19 rano. Wysiłek z tętna wyszedł 3,4 na 10, czyli jazda była naprawdę lekka — ale półtorej godziny to półtorej godziny i przy wytrenowaniu 155 każda następna sesja dokłada się do stosu, który i tak jest najwyższy w historii. Plan na ten tydzień to 3,5 godziny i jest to tydzień ODCIĄŻENIOWY. Masz 2 godziny 43 minuty, czyli zostało 47 minut na cztery dni. Nie rób więcej — ten tydzień ma zamienić wytrenowanie w formę, a nie dołożyć kolejny szczyt."
  },
  {
   "t": "naglowek",
   "tekst": "Wrzesień, który już jest najlepszym miesiącem"
  },
  {
   "t": "akapit",
   "tekst": "470,2 km w trzynastu jazdach i 17,6 godziny. Poprzedni rekord miesiąca to 372,2 km z lipca, więc jesteś o 98 km wyżej i zostało jeszcze siedem dni. Na Zwifcie 293,7 km, na szosie 176,5 — i to jest jedyna liczba w tym miesiącu, która mnie martwi, bo szosa stanęła 12 września."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach"
  },
  {
   "t": "lista",
   "punkty": [
    "Tydzień 21–27 września: 2 h 43 min z planu 3,5 h. Zostało 47 minut.",
    "Seria dowiezionych planów: trzy tygodnie z rzędu, rekord tych danych.",
    "Rok 2026: 1639,3 km w 53 jazdach.",
    "Żółta koszulka: okno minęło w 19%, najdłuższa przerwa w nim to 5 dni przy limicie 14.",
    "Gablota: 2 z 18 — obie koszulki mają teraz datę 21.09 i siedzą na stałe w danych.",
    "Ostatnia jazda na szosie: 12 września, czyli jedenaście dni temu."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Na koniec rzecz, którą trzeba pochwalić, bo jej nie odpuściłem wczoraj: dopisałeś RPE do obu wtorkowych jazd, po 5 na każdą. Dzięki temu strona ma i pomiar z tętna, i Twoją własną ocenę, a przy jazdach bez pasa to jedyne, co w ogóle zostaje. Dzisiejsza jeszcze go nie ma — wpisz i wejdzie przy najbliższym odświeżeniu."
  }
 ]
};
