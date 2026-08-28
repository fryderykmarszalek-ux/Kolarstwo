// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta pierwsza wersja jest wyjątkiem: napisana w sesji czatu, żeby zakładka
// nie stała pusta do czasu dodania sekretu ANTHROPIC_API_KEY. Pole odcisk
// jest prawdziwym skrótem dzisiejszego briefingu, więc automat uzna dane za
// niezmienione i zostawi ten tekst w spokoju aż do następnej jazdy.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-08-28T11:40",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 83,
 "dane_pobrano": "2026-08-27T10:24",
 "odcisk": "c6e44f45636fc0ae",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Dwanaście dni bez roweru — ile to naprawdę kosztuje"
  },
  {
   "t": "akapit",
   "tekst": "Ostatnia jazda to 15 sierpnia. Dane pobrano 27 sierpnia, czyli minęło 12 dni. Kryterium sezonu jest bezpieczne: wyjazd do Francji (17–31 sierpnia) zgłosiłeś 19 sierpnia, a więc zanim przerwa mogła przekroczyć próg 14 dni, i w wariancie B taki wyjazd nie liczy się jako przerwa. To jedno z dwóch zgłoszeń, które masz na cały rok kalendarzowy — drugie zostało."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Bez jazdy",
     "wartosc": "12 dni",
     "stopka": "od 15.08"
    },
    {
     "etykieta": "Wytrenowanie",
     "wartosc": "95",
     "stopka": "szczyt 146 · 20.07"
    },
    {
     "etykieta": "Zmęczenie",
     "wartosc": "35",
     "stopka": "było 192 · 15.08"
    },
    {
     "etykieta": "Forma",
     "wartosc": "+61",
     "stopka": "i to jest pułapka"
    }
   ]
  },
  {
   "t": "akapit",
   "tekst": "Liczby po kolei. Wytrenowanie spada wykładniczo ze stałą 42 dni, czyli każdy dzień bez obciążenia zabiera współczynnik 1 − e^(−1/42) = 0,0235, w przybliżeniu 2,35% stanu. Ze szczytu 146 z 20 lipca zeszło do 127 na dzień ostatniej jazdy i do 95 na 27 sierpnia. Jeśli do powrotu nie usiądziesz na rowerze, 1 września zobaczysz około 85, po tygodniu września 73, po dwóch 62. To nie jest kara — to arytmetyka, którą znałeś, zanim wyjechałeś."
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie od 1 marca"
  },
  {
   "t": "ostrzezenie",
   "tekst": "Forma +61 to dziś najbardziej mylące liczby na całej stronie. Forma to różnica wytrenowanie minus zmęczenie, a ona urosła nie dlatego, że wytrenowanie poszło w górę, tylko dlatego, że zmęczenie spadło ze 192 do 35 — stała 7 dni zjada je szybciej, niż 42 dni zjadają wytrenowanie. Ta sama liczba +61 opisuje zawodnika wypoczętego po bloku i zawodnika, który przestał trenować. Rozróżnia je wyłącznie kierunek grubej linii, a ta idzie w dół."
  },
  {
   "t": "naglowek",
   "tekst": "Segmenty: 29 rekordów padło w trzyosobowej grupie"
  },
  {
   "t": "akapit",
   "tekst": "Masz 221 segmentów przejechanych więcej niż raz. Rekordy nie rozkładają się po nich równo — grupują się w kilku dniach. Najwięcej, 29, padło 13 sierpnia. To jazda z opisem „Ok/trio/?1/hr160-195”: jechałeś w trójce. Drugi co do wielkości pęk, 19 rekordów, pochodzi z 22 lipca — jazda „morning short pace”, 19,4 km w 39 minut, średnia 29,7 km/h, bez ani jednego słowa opisu."
  },
  {
   "t": "akapit",
   "tekst": "To znaczy dokładnie tyle: nie wiadomo, ile z tych rekordów jest twoje, a ile koła przed tobą. Trzy kwadranse ze średnią 29,7 km/h po płaskim i 15 rekordów w jednej krótkiej jeździe to układ, który znacznie łatwiej wyjaśnić jazdą za kimś niż skokiem formy w jeden poranek. Strona sama tego nie rozstrzygnie — nie ma pola „jechałem sam”. Ma za to znacznik Ok w opisie i to jest jedyna rzecz, która to naprawia, przy czym naprawia wyłącznie jazdy przyszłe."
  },
  {
   "t": "lista",
   "punkty": [
    "13.08 — 29 rekordów, opis mówi wprost „trio”. Warunki znane i niekorzystne dla porównań.",
    "22.07 — 19 rekordów, brak opisu. Warunki nieznane, czyli tak samo bezużyteczne dla porównania jak jazda w grupie.",
    "Od 1 września: znacznik Ok w opisie tylko wtedy, gdy naprawdę jechałeś sam i bez silnego wiatru. Jeden dopisany znak decyduje, czy czas w ogóle da się kiedyś do czegoś przyrównać."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Jedna konsekwencja tego jest bardzo konkretna. Koszulka sprinterska wymaga Obory-Opacz w 12:35, czyli 755 sekund. Twój rekord to 765 sekund — dziesięć sekund, 1,3%. To najbliższa koszulka w całej gablocie. Kłopot w tym, że ten rekord padł właśnie 22 lipca, na jeździe bez opisu. Jeśli powstał na kole, to do celu jest dalej, niż pokazuje pasek postępu."
  },
  {
   "t": "wykres_segment",
   "segment": "6804424",
   "tytul": "Obory-Opacz — wszystkie przejazdy"
  },
  {
   "t": "naglowek",
   "tekst": "Moc: cała krzywa jest sprzed dziesięciu miesięcy"
  },
  {
   "t": "akapit",
   "tekst": "Każdy rekord mocy w twoich danych pochodzi z okresu 18 października – 1 listopada 2025. Ani jeden nie jest młodszy. Powód jest prosty i nie jest twoją winą: szosa nie ma miernika, a na Zwifcie nie było cię od tamtego czasu. Krzywa mocy na stronie opisuje więc zawodnika sprzed dziesięciu miesięcy, przed całym blokiem szosowym, który zbudował wytrenowanie 146."
  },
  {
   "t": "wykres_moc",
   "tytul": "Rekordy mocy — wszystkie z jesieni 2025"
  },
  {
   "t": "akapit",
   "tekst": "Teraz najważniejsza rzecz w tej analizie. Zestaw rekordów: 5 s = 702 W, 15 s = 451 W, 30 s = 271 W, 1 min = 210 W, 5 min = 172 W, 20 min = 148 W. Zwróć uwagę na iloraz 210/702 = 0,30. Minutowa moc równa 30% mocy pięciosekundowej to nie jest profil zawodnika — to profil pomiaru, którego nigdy nie zrobiono. Rekord minutowy pochodzi z wyścigu dla początkujących, a nie z próby na minutę. Te same 210 W siedzą obok 271 W na trzydziestu sekundach z tej samej jazdy."
  },
  {
   "t": "akapit",
   "tekst": "Dlatego prognoza na grudzień 2026 wygląda tak, jak wygląda. Do celu 5 s = 720 W brakuje 2,6%, bo tę wartość naprawdę zmierzyłeś przy sprincie. Do celu 1 min = 480 W brakuje 129%, do 40 s = 545 W brakuje 130%, do 5 min = 300 W brakuje 74%, do 20 min = 225 W brakuje 52%. Trzy pierwsze liczby mierzą głównie brak testu, nie brak mocy. Czwarta jest prawdziwym dystansem: 148 W to 2,11 W/kg przy 70 kg, a 225 W to 3,21 W/kg."
  },
  {
   "t": "lista",
   "punkty": [
    "Jedna sesja na Zwifcie, poza ERG-iem, załatwia trzy z tych czterech pytań: 5 s, 1 min, 5 min, 20 min, każde jako osobna maksymalna próba z pełnym odpoczynkiem.",
    "Do tego czasu ptaszki i krzyżyki w Prognozach opisują stan pomiaru, a nie stan nóg.",
    "FTP w danych to dwie różne liczby i tak ma zostać: 150 W deklarowane i 180 W z modelu z tagiem [E]. Zmierzone 20 minut daje 148 W, czyli reguła 0,95 × 20 min prowadzi do 141 W. Bliżej prawdy jest liczba niższa."
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Jedyny pomiar tętna, jaki masz, jest bardzo dobry"
  },
  {
   "t": "akapit",
   "tekst": "14 sierpnia zrobiłeś próbę opisaną jako „30min x2 (20+10)”, z odczytami 130/129/131/130 i wynikiem 0,67 przy adnotacji „dryf koło 0”. Cztery kolejne bloki na tym samym tętnie, dryf poniżej procenta — to znaczy, że na tej intensywności twoja baza tlenowa jest solidna i że godzinę takiej jazdy wytrzymujesz bez narastania kosztu. To jedyne dane o tętnie w całym pliku i siedzą w polu tekstowym, bo pas piersiowy wchodzi dopiero od 1 września. Od tego dnia zakładki Tętno i Efektywność zaczną się wypełniać same; dziś są puste i tak mają wyglądać, dopóki nie ma czego liczyć."
  },
  {
   "t": "naglowek",
   "tekst": "Co zrobić od 1 września"
  },
  {
   "t": "akapit",
   "tekst": "Plan startuje od 3 godzin w pierwszym tygodniu. Policz, co to znaczy dla wytrenowania: 180 minut po RPE 5 to 900 jednostek na tydzień, czyli 129 dziennie. Twoje wytrenowanie będzie wtedy w okolicy 85, a rośnie zawsze, gdy dzienne obciążenie przekracza bieżący stan. Znaczy to, że gruba linia zawraca w górę już w pierwszym tygodniu i nie musisz w tym celu robić niczego bohaterskiego. Ostatni pełny tydzień z jazdami, 10–16 sierpnia, dał 5,3 godziny — plan wraca do tego poziomu dopiero pod koniec września i to jest właściwa kolejność."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach — plan zaczyna się 1 września"
  },
  {
   "t": "akapit",
   "tekst": "Cel 80 km na długą jazdę wymaga +15,7 km ponad najlepsze 64,3 km z 14 lipca. Przy planie idącym 3 → 4 → 4,5 godziny to jest zadanie na drugą połowę września, nie na pierwszy weekend po powrocie. W całej historii, którą gablota liczy inaczej niż wykresy, najdłuższa jazda to 66,6 km z 6 sierpnia 2024 — czyli do koszulki młodzieżowej brakuje 13,4 km."
  },
  {
   "t": "lista",
   "punkty": [
    "Pierwszy tydzień: objętość, nie tempo. Wytrenowanie odbudowuje się z godzin, a nie z rekordów.",
    "Znacznik Ok w opisie każdej jazdy, na której jechałeś sam — inaczej wrześniowe czasy będą tak samo nieporównywalne jak lipcowe.",
    "Jedna sesja testowa na Zwifcie, gdy tylko będzie okazja. Bez niej trzy z pięciu celów na grudzień pozostaną nierozstrzygalne.",
    "Pas piersiowy od pierwszej jazdy — to jedyna rzecz na tej liście, która odblokowuje całą zakładkę Objętość."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Jedna uwaga o tym tekście. To pierwsza analiza w tym miejscu i powstała w sesji czatu, nie w nocnym automacie — automat nie napisał jeszcze ani słowa, bo w repozytorium nie ma sekretu ANTHROPIC_API_KEY. Od chwili, w której go dodasz, ten komentarz będzie się przepisywał sam po każdej zmianie danych, a po dniu bez jazdy zostanie ten, który akurat stoi."
  }
 ]
};
