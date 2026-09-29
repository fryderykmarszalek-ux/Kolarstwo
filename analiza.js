// analiza.js — komentarz pisany przez model, wygenerowany przez automat.
// NIE EDYTOWAĆ RĘCZNIE: plik jest nadpisywany po każdej zmianie danych.
// Powstaje w .github/skrypty/analiza.js po nocnym pobraniu ze Stravy.
//
// Ta wersja jest wyjątkiem — napisana w sesji czatu 29.09.2026, bo sekretu
// ANTHROPIC_API_KEY jeszcze nie ma. Pole odcisk to prawdziwy skrót
// dzisiejszego briefingu, a analiza jest z dzisiaj, więc automat zostawi ją
// w spokoju do jutrzejszego wieczora.

window.ANALIZA = {
 "wersja": 1,
 "utworzono": "2026-09-29T21:00",
 "model": "asystent w sesji czatu",
 "jazd_w_danych": 104,
 "dane_pobrano": "2026-09-29T17:10",
 "odcisk": "5d34eb45e2b35a7c",
 "bloki": [
  {
   "t": "naglowek",
   "tekst": "Osiem rekordów mocy w dwadzieścia dziewięć minut — cały środek krzywej przepisany"
  },
  {
   "t": "akapit",
   "tekst": "„Climb Portal: Col du Rosier at 100% Elevation in France”: 13,09 km w 28 minut 47 sekund, moc średnia 151 W, tętno średnie 165, RPE 8, 248 kcal, 236 metrów przewyższenia. Potem „Half an Hour of Relaxation” na Glasgow Crit Circuit: 7,36 km w 20 minut 9 sekund przy 84 W, tętnie 139 i RPE 3. Razem 20,4 km i 49 minut."
  },
  {
   "t": "kafelki",
   "pozycje": [
    {
     "etykieta": "Rekord 1 min",
     "wartosc": "295 W",
     "stopka": "4,21 W/kg · było 268"
    },
    {
     "etykieta": "Rekord 5 min",
     "wartosc": "232 W",
     "stopka": "3,31 W/kg · było 202"
    },
    {
     "etykieta": "Rekord 20 min",
     "wartosc": "185 W",
     "stopka": "2,64 W/kg · było 183"
    },
    {
     "etykieta": "Rekordów naraz",
     "wartosc": "8",
     "stopka": "od 40 s do 20 min"
    }
   ]
  },
  {
   "t": "naglowek",
   "tekst": "Wszystkie osiem, po kolei"
  },
  {
   "t": "akapit",
   "tekst": "Podjazd na Col du Rosier przepisał krzywą mocy od czterdziestu sekund aż do dwudziestu minut. To nie jest jeden rekord z przypadku — to cały środek krzywej, czyli dokładnie ten zakres, który opisuje moc progową i wytrzymałość tlenową. Pula, z której te rekordy biją, to dwadzieścia osiem jazd z pomiarem mocy."
  },
  {
   "t": "lista",
   "punkty": [
    "40 sekund — 319 W, było 313, o 6 W lepiej",
    "1 minuta — 295 W, było 268, o 27 W lepiej",
    "2 minuty — 252 W, było 233, o 19 W lepiej",
    "5 minut — 232 W, było 202, o 30 W lepiej",
    "8 minut — 222 W, było 193, o 29 W lepiej",
    "10 minut — 215 W, było 190, o 25 W lepiej",
    "15 minut — 207 W, było 185, o 22 W lepiej",
    "20 minut — 185 W, było 183, o 2 W lepiej"
   ]
  },
  {
   "t": "wykres_moc",
   "tytul": "Krzywa rekordów mocy — środek podniesiony na całej długości"
  },
  {
   "t": "akapit",
   "tekst": "Największe skoki są na pięciu i ośmiu minutach: po 30 i 29 watów, czyli 15% w górę. Najmniejszy jest na dwudziestu minutach — tylko 2 waty, bo tamten rekord padł dwanaście dni temu w teście progowym i był świeży. Reszta poprzednich rekordów pochodziła z 17 i 19 września, więc bijesz własne liczby sprzed niecałych dwóch tygodni."
  },
  {
   "t": "naglowek",
   "tekst": "To była prawdziwa jazda na maksa i tętno to potwierdza"
  },
  {
   "t": "akapit",
   "tekst": "Tętno średnie 165 przy Twoim HRmax 201. Rozkład: 31% czasu w piątej strefie (VO2), 29% w czwartej (próg), 24% w tempie, 16% w bazie. To pierwsza jazda od testu progowego z 17 września, czyli od dwunastu dni, która weszła w piątą strefę tętna — dziewięć jazd pomiędzy miało tam równe zero. Iloraz ERG wyszedł 2,36, czyli powyżej progu 2,0: żaden program nie trzymał Ci mocy, to Ty ją wykręciłeś."
  },
  {
   "t": "akapit",
   "tekst": "Druga jazda była dokładnie tym, co mówi nazwa: dwadzieścia minut przy 84 W, 64% czasu w drugiej strefie mocy i zero powyżej trzeciej strefy tętna. Iloraz 1,05 — czysty ERG. Schłodzenie po ciężkim podjeździe, zrobione poprawnie."
  },
  {
   "t": "naglowek",
   "tekst": "Miałeś rację — FTP 174 nie było na stronie z niczym połączone"
  },
  {
   "t": "akapit",
   "tekst": "Napisałeś: „mam ewidentnie wpisane 174 i ja to widzę; jeżeli ty tego nie widzisz, to jest błąd w kodzie”. Sprawdziłem i błąd był, tylko w innym miejscu, niż obaj myśleliśmy. Pole FTP w Prognozach działało poprawnie — Twoje 174 siedziało w pamięci iPada i strona je pokazywała. Nie widziałem go, bo pamięć przeglądarki zostaje na urządzeniu i do repozytorium nie trafia; w danych stało dalej 150. Ale prawdziwa wpadka jest głębsza: tabela stref mocy była osobną listą progów, wpisaną raz z FTP 150 i nigdy nieprzeliczaną. Strona pisała przy tym wprost, że „z FTP biorą się strefy treningowe” — i to zdanie było nieprawdą."
  },
  {
   "t": "akapit",
   "tekst": "Poprawione dziś, zgodnie z Twoim poleceniem, i wstecz — także na wrześniowe i wcześniejsze jazdy. FTP 174 W stoi teraz w danych, więc widać je na każdym urządzeniu, a nie tylko na tym, na którym klikałeś. Progi mocy przeliczone modelem Coggana od nowa."
  },
  {
   "t": "lista",
   "punkty": [
    "Stara tabela (FTP 150): Z1 0–82 · Z2 83–112 · Z3 113–135 · Z4 136–157 · Z5 158–180 · Z6 181–225 · Z7 226+",
    "Nowa tabela (FTP 174): Z1 0–95 · Z2 96–130 · Z3 131–156 · Z4 157–182 · Z5 183–208 · Z6 209–261 · Z7 262+",
    "Efektywność rozkładu mocy z 7 dni: 32% „rozkład rozjechany” zmieniło się na 89% „rozkład jak z podręcznika”.",
    "Na oknach 30 i 90 dni: 63%.",
    "Tabela tętna nietknięta — to osobny pomiar i osobna decyzja."
   ]
  },
  {
   "t": "wykres_strefy",
   "miara": "moc",
   "dni": 7,
   "tytul": "Strefy mocy po przeliczeniu na FTP 174"
  },
  {
   "t": "akapit",
   "tekst": "Ta różnica 57 punktów procentowych to nie kosmetyka. Przy tabeli z FTP 150 każda mocniejsza jazda lądowała o strefę czy dwie za wysoko, więc pierścień mocy przez ostatni tydzień opisywał trening, którego nie było — wyglądało to na ciągłe siedzenie w progu i powyżej, choć naprawdę jechałeś w bazie. Dokładnie ten sam błąd, który złapaliśmy 5 września przy strefach tętna: nowe podpisy nad starymi liczbami, bez słowa ostrzeżenia."
  },
  {
   "t": "akapit",
   "tekst": "Żeby to nie wróciło, strona ma teraz dwie nowe rzeczy. Pierwsza: w zakładce Moc liczy sobie, jak wyglądałaby tabela Coggana przy Twoim bieżącym FTP, i gdy progi się z tym rozjeżdżają, mówi to na głos razem z obiema listami liczb. Sama niczego nie przelicza — progi są Twoją decyzją i wolno Ci odejść od modelu. Druga: Prognozy dostały ten sam głośny alarm, który Gablota ma od 22 września — jeśli FTP albo ptaszek żyje wyłącznie w jednej przeglądarce, na górze stoi blok z gotowym JSON-em do wklejenia mi w czacie. Gdyby ten alarm był tam tydzień temu, w ogóle nie doszłoby do tej rozmowy."
  },
  {
   "t": "ostrzezenie",
   "tekst": "Jedna liczba nadal Cię czeka, i to Twoja decyzja, nie moja. Dzisiejszy rekord 20-minutowy to 185 W, więc reguła FTP ≈ 0,95 × 20 minut daje już 176 W, a nie 174. Różnica dwóch watów nie rusza ani jednego progu (Coggan przy 176 daje Z2 od 97 zamiast 96), więc nic nie zmieniam. Mówię tylko, że podstawa przesunęła się drugi raz w tym miesiącu."
  },
  {
   "t": "naglowek",
   "tekst": "Zmęczenie wreszcie odpuściło"
  },
  {
   "t": "wykres_forma",
   "tytul": "Wytrenowanie i zmęczenie — nożyce zamykają się pierwszy raz"
  },
  {
   "t": "akapit",
   "tekst": "Wczorajsza przerwa zrobiła dokładnie to, co miała zrobić, i warto rozłożyć to na dni. W niedzielę było: wytrenowanie 166, zmęczenie 279, forma −113, napięcie 1,68. Po poniedziałku bez roweru: 162, 242, −80 i 1,49. Dziś, już z podjazdem w nogach: 165, 248, −83 i 1,50. Czyli jeden dzień wolnego ściął zmęczenie o 37 punktów i poprawił formę o 33, a dzisiejsze pół godziny na maksa oddało z tego zaledwie sześć i trzy. Forma −83 jest drugą najlepszą od 20 września, zaraz po wczorajszych −80. Dla uczciwej skali: przez pierwszą połowę września siedziała między −76 a +14, więc do tamtego stanu nadal daleko — ten blok wykopał głęboki dół i zasypuje się go dniami wolnymi, nie tygodniami."
  },
  {
   "t": "akapit",
   "tekst": "Licznik regeneracji przyznał łącznie 10,5 godziny i pełną gotowość jutro o 3:45 nad ranem. Przy jeździe na maksa trwającej niecałe pół godziny to niedużo — bo koszt liczy się z czasu w strefach, a tego czasu było mało. Ciężka i krótka wychodzi taniej niż lekka i długa, i to jest argument za tym, żeby tak trenować częściej."
  },
  {
   "t": "wykres_strefy",
   "miara": "tetno",
   "dni": 7,
   "tytul": "Strefy tętna z siedmiu dni"
  },
  {
   "t": "naglowek",
   "tekst": "Wrzesień przekroczył 600 kilometrów"
  },
  {
   "t": "akapit",
   "tekst": "616,2 km w dziewiętnastu jazdach i 22,7 godziny. Poprzedni rekord miesiąca to 372,2 km z lipca — jesteś o 244 km wyżej, czyli o 66% ponad. Został jeden dzień. Rok 2026 ma 1785,3 km w pięćdziesięciu dziewięciu jazdach."
  },
  {
   "t": "wykres_tygodnie",
   "tytul": "Godziny w tygodniach"
  },
  {
   "t": "lista",
   "punkty": [
    "Nowy tydzień 28.09–4.10: 49 minut z planu 5 godzin, pięć dni przed sobą. Nie jest odciążeniowy.",
    "Seria dowiezionych planów: cztery tygodnie z rzędu.",
    "Wrzesień: 439,7 km na Zwifcie, 176,5 km na szosie.",
    "Ostatnia jazda na szosie: 12 września, czyli siedemnaście dni temu.",
    "Obie dzisiejsze jazdy mają wpisane RPE — 8 i 3."
   ]
  },
  {
   "t": "akapit",
   "tekst": "Podsumowując: 29 minut na podjeździe dało osiem rekordów mocy na oknach od czterdziestu sekund do dwudziestu minut, z czego pięć poprawiło poprzednie wyniki o ponad 20 watów. Do tego zmęczenie 248, czyli blisko najniższego poziomu całego tego bloku, i forma, która drugi dzień z rzędu stoi powyżej −85 — wcześniej ostatni raz było tak 19 września. Dzień wolny w poniedziałek i jedna ciężka jazda we wtorek — to jest wzorzec, który daje więcej niż siedem godzin równego kręcenia. Zapamiętaj go."
  }
 ]
};
