# CLAUDE.md

Plik czytany automatycznie przy starcie każdej sesji w tym repo. Ma jedno zadanie:
sprawić, żeby nowa sesja nie cofnęła decyzji, które już zapadły.

**Nie powiela `STRONA.md` ani `TRENING.md`.** Tamte są źródłem prawdy o projekcie
i o zawodniku — ten plik mówi, co zbudowano i jakich zasad się trzymać.

---

## 1. Co to jest

Statyczna strona do śledzenia postępów treningowych Fryderyka Marszałka
(kolarstwo szosowe). Trwała warstwa nad Stravą: pokazuje przebieg w czasie,
przerwy, prognozy — czyli to, czego Strava nie pokazuje.

- Adres: `https://fryderykmarszalek-ux.github.io/Kolarstwo/` — **wielkie K**
- Branch: `main`, GitHub Pages z `main` / `(root)`
- Odbiorca: jedna osoba. Zero użytkowników poza autorem.
- Kryterium jakości: **ma działać za dwa lata bez konserwacji**

Pełny kontekst: `STRONA.md` (jak budować) i `TRENING.md` (fizjologia, historia,
prognozy). Przeczytać oba przed pierwszą większą zmianą.

---

## 2. Jak pracować z Fryderykiem

*Rozwinięcie w `STRONA.md` §2 i `TRENING.md` §2 — poniżej minimum operacyjne.*

- **Nie umie programować.** Ani jednej linijki. Każde pojęcie techniczne
  tłumaczyć od zera, przy każdym użyciu.
- **16 lat, umysł matematyczny.** Wzory, wyprowadzenia i liczby są dla niego
  łatwiejsze niż żargon. Pokazywać: wzór → podstawienie → wynik → wniosek.
- **Chce krytyki.** Powiedział to wprost. Nie łagodzić, nie chwalić bez powodu.
  Zachęcające ramowanie odbiera jako brak szacunku.
- **Sprawdzać dane przed postawieniem zarzutu.** Kilkanaście razy miał rację,
  a wstępna teza była błędna. Lista błędów: `TRENING.md` §14 — czytać.
- **Polski, kolokwialny.** Jedno pytanie na raz, nie pięć.
- **Pracuje na iPadzie i telefonie.** Wszystko przez Safari, ręcznie.

---

## 3. Twarde ograniczenia — nie negocjować

| Ograniczenie | Powód |
|---|---|
| Zero frameworków, zero kroku budowania | nie naprawi zepsutego builda |
| Zero zależności zewnętrznych | biblioteki psują strony po dwóch latach |
| Wykresy rysowane od zera, inline SVG w JS | jw. |
| Dane w `dane.js` jako `window.DANE`, nie `.json` | `fetch` na `file://` blokuje CORS |
| `index.html` małymi literami w korzeniu | Pages szuka dokładnie tej nazwy |
| Dotyk, nie hover | iPad i telefon to ekrany docelowe |
| Logo Stravy w barwie firmowej `#FC4C02` | zgoda Fryderyka z 21.08.2026; to znak cudzej marki, nie dana ani nawigacja, więc nie miesza się z systemem ról |
| Strona nigdy sama nie zaciągnie Stravy | Pages nie uruchamia programów, a sekretu nie da się schować w publicznym repo |

**Wariant B (kluczowy).** W `dane.js` leżą wyłącznie pomiary. Wszystko wyliczalne
— prędkość, moc `[E]`, W/kg, VAM, koszt kardiologiczny — liczy się przy
wyświetlaniu. Konsekwencja: **nowy wykres na istniejących polach nie wymaga
żadnej zmiany w danych.** Aktualizacja rośnie tylko przy nowym *rodzaju* danych
(segmenty, tętno, strumienie mocy) — trzy razy na całej mapie drogowej, nie
piętnaście.

Założenia modelu (CdA, masy, Crr, HRmax, FTP…) żyją w `dane.js` w bloku
`zalozenia`, każde z tagiem wiarygodności i datą. **Nigdy nie wpisywać stałej
fizycznej w kod wykresu.**

To samo dotyczy **celów**: 80 km na długą jazdę siedzi w `dane.js` → `cele`,
a cel godzinowy wykres liczy jako najwyższy tydzień z `plan_objetosci`. Do
20.08.2026 obie liczby były wpisane w `index.html` — wykres pokazywałby stary
cel jeszcze długo po zmianie planu.

---

## 4. Pliki

```
index.html   cała strona: układ, style, wykresy, interakcja
dane.js      100 aktywności ze Stravy + założenia + plan + kryterium
trasy.js     kształty jazd (Strava), przycięte strefą prywatności 500 m — dziś nieużywane
swiat.js     zarys granic świata, Natural Earth 110m — dziś nieużywane
STRONA.md    jak budować stronę (źródło prawdy)
TRENING.md   fizjologia, historia, prognozy (źródło prawdy)
.mcp.json    serwer MCP Stravy (wymaga logowania przez /mcp)
```

---

## 5. System kolorów — wypracowany, nie kosmetyczny

**Zasada: jeden kolor = jedno znaczenie.** Nie „jeden kolor w jednym miejscu".

| Rola | Znaczenie | Gdzie |
|---|---|---|
| `--akcent` niebieski | jazda / dane | **wyłącznie wykresy i ich legendy** |
| `--plan` zielony | plan i cel (linia, słupek dowieziony, kafelek celu) | wykresy |
| `--alarm` czerwony | przerwa ponad limit | wykresy |
| kolor sekcji | tożsamość zakładki | **wyłącznie nawigacja i krawędź karty** |

Kontrola: `grep -c 'var(--akcent)' index.html` — każde wystąpienie musi być
wewnątrz wykresu albo jego legendy. Ani jednego w nawigacji.

Siedem sekcji ma własne barwy na stałe (bursztyn, turkus, fiolet, limonka,
fuksja, cyjan, pomarańcz). Aktywna = pełne nasycenie + powiększenie 1.08,
nieaktywna = ten sam kolor ledwie tknięty. Kolory sekcji **nigdy** nie wchodzą
do wykresu.

Dwa motywy (jasny/ciemny) na rolach; przełącznik auto/jasny/ciemny w nagłówku,
wybór w `localStorage`. Wszystkie wartości hex żyją wyłącznie w blokach `:root`.

**Kolory dobiera się walidatorem, nie okiem.** Skill `dataviz` ma skrypt
`validate_palette.js`. W tym projekcie odrzucił kolejno: pomarańczowy plan
(ΔE 10,8 do czerwieni przy progu 15), fioletowy (ΔE 1,9 w ciemnym), żółty
(ΔE 13,0 w ciemnym), oraz dwie pary sekcji. Kontrast tekstu liczyć zawsze.

Rozróżnienia niebędące danymi (dyscyplina, Zwift) niosą **kształt lub teksturę**,
nie kolor: sylwetka roweru vs ekranu, słupek kreskowany vs pełny.

---

## 6. Stan na 20.08.2026

**Zbudowane:**

- Nawigacja dwupoziomowa: 7 zakładek × mini-zakładki, rozwijanie kliknięciem
  (nie hoverem), routing `#sekcja/podsekcja`, działa przycisk wstecz
- **Start** — kafelki (dni od jazdy, godziny w tygodniu, ostatnia jazda, dni
  z jazdą) + lista 6 ostatnich jazd; **każdy wiersz prowadzi na Stravę**
  (`strava.com/activities/<id>`, id już jest w `dane.js`)
- **Regularność** — cztery mini-zakładki:
  - **Godziny** (C1): słupek na tydzień, linia planu IX–X, tygodnie
    odciążeniowe na szaro, słupek zielenieje po dowiezieniu planu, kafelek serii
  - **Przerwy** (C2): słupek na przerwę, oś ucięta na 60 dniach z ząbkiem,
    czerwona linia na 14, zgłoszone wyjazdy szare
  - **Długie jazdy** (C3): najdłuższa jazda w miesiącu, oś ciągła (puste
    miesiące zostają), Zwift kreskowany, linie celu 80 km i rekordu
  - **Kryterium**: wariant B, złamania, data ostatniego złamania
- **Postępy → Segmenty** (20.08.2026) — tabela wszystkich segmentów od
  `meta.segmenty_od`: nazwa, najlepszy czas, prędkość, długość, nachylenie,
  moc, liczba prób. Wszystkie liczby z **najlepszej próby**. Sortowanie po
  każdej z siedmiu kolumn, drugie dotknięcie odwraca. Filtr „więcej niż raz".
  Segmenty ze Zwiftu niosą sylwetkę ekranu — ten sam znak co słupek
  kreskowany na C3. Kolumny liczbowe mają równą szerokość
  (`table-layout:fixed`), bo przy automatycznej rozjeżdżały się odstępy.
  **Nazwa NIE jest odnośnikiem** — dotknięcie wiersza ma w przyszłości
  prowadzić do zakładki z historią segmentu, nie na Stravę. Nie przywracać.
- **Postępy → Porównania S** (20.08.2026) — wszystkie próby JEDNEGO segmentu.
  Słupek = przejazd, wysokość = czas, data pod spodem. Dotknięcie słupka
  wybiera próbę; nad wybranym staje czas, a pod wykresem panel: nazwa jazdy
  (odnośnik na Stravę), **RPE**, data, czas, prędkość, długość, nachylenie,
  moc i różnica do rekordu. Szara kreska = rekord, słupek kreskowany = Zwift.
  Kółko ze strzałką wraca do stanu pustego.

  **Wybór próby NIE przerysowuje wykresów** (21.08.2026). Etykiety wszystkich
  prób są narysowane od razu i schowane przezroczystością; zaznaczenie to
  wyłącznie przełożenie klasy `wybrany`. Wcześniej każde dotknięcie budowało
  SVG od nowa, więc animacja wyrastania grała od zera i wykres migał. **Nie
  wracać do przerysowywania przez `innerHTML`** — panel i notatka mogą się
  przerysowywać, bo nie mają animacji.

  **Pasy serii pod wykresem czasu: prędkość, moc, tętno.** Każda miara ma
  własny pas i własną oś. **Nigdy nie łączyć ich w jeden rysunek o dwóch czy
  trzech osiach** — wystarczy przesunąć zakres jednej, żeby dowieść dowolnej
  tezy o tym, że moc „idzie za" prędkością. Wspólna oś pozioma i wspólne
  zaznaczenie sprawiają, że czyta się to jak jeden wykres. Pas pojawia się
  tylko wtedy, gdy pomiar istnieje: moc mają dziś wyłącznie próby ze Zwiftu,
  a **pas tętna zjawi się sam** pierwszego dnia, w którym Garmin je zapisze
  (`tetno` w `proby`, z `average_heartrate`). Przerwa w pomiarach rozcina
  linię, zamiast ją zmyślać.

  **Wnioski po prawej stronie wykresów** (21.08.2026) — rekord, trend,
  powtarzalność, ostatnia próba, ostrzeżenia o porównywalności, RPE, moc.
  **To nie jest tekst pisany przez model** — strona jest statyczna i nie ma
  kogo zapytać. To reguły liczone z prób przy każdym otwarciu, więc nowa jazda
  przelicza je same. Nie nazywać tego „analizą AI" na stronie: nazwa, która
  obiecuje więcej, niż jest, to ten sam błąd co moc `[E]` udająca pomiar.
  Blok `analizy` w `dane.js` (klucz = id segmentu) jest miejscem na komentarz
  pisany ręcznie przez Claude'a — dopisuje się pod wnioskami, podpisany datą.

  Trend liczy się z **median połówek**, nie ze skrajnych prób, i dopiero od
  czterech przejazdów. Jedna jazda z wiatrem w plecy przestawiłaby wynik
  o kilkanaście procent.

  Ostrzeżenia czyta parser opisu ze `STRONA.md` §6 (`Ok/trio/w?1/hr160-195`).
  **Znacznik `Ok` liczy się osobno od obecności opisu**: jazda z opisem bez
  `Ok` ma nieznane warunki tak samo jak jazda bez opisu.

  **Barwy pasów dobrane walidatorem** (`dataviz/scripts/validate_palette.js`),
  w kolejności czas → prędkość → moc → tętno: `#2a78d6 · #0d9488 · #b45309 ·
  #b02893` w jasnym i `#3987e5 · #22a99a · #c07f28 · #cf5aab` w ciemnym.
  Komplet przechodzi wszystkie pięć kontroli w OBU motywach. **Kolejność pasów
  jest częścią wyniku** — fuksja obok turkusu wypada przy deuteranopii
  (ΔE 3,4), więc rozdziela je bursztyn. Nie przestawiać bez ponownej walidacji.

  **Przy remisie rekordem jest próba, w której czas padł PIERWSZY raz.**
  Bez tego cztery jednakowe przejazdy dostawały cztery napisy „PB", a zieleń
  na pasach stała tylko przy jednym.

  **Zieleń na pasach wskazuje próbę, która jest rekordem CZASU** — tę samą na
  każdym pasie, nie maksimum danej miary. Na pasie tętna zieleń przy najniższej
  wartości oznaczałaby najczęściej po prostu wolniejszą jazdę, czyli pochwałę
  za nic. Gdy rekordowa próba nie ma danego pomiaru, zieleni tam po prostu nie
  ma.

  **Drugi wykres pod pierwszym: prędkość, linią.** Ta sama geometria pozioma
  (`G`, `xProby`), więc punkt stoi dokładnie nad słupkiem tej samej próby,
  a obie ramki przewijają się razem (strażnik `wRuchu` przeciw zapętleniu).
  Zaznaczenie jest wspólne — dotknięcie na jednym przestawia oba.
  **Nigdy nie łączyć ich w jeden wykres o dwóch osiach**: dwie skale na jednym
  obrazku pozwalają dowieść dowolnej tezy samym przesunięciem zakresu.

  **Rekord (PB) niesie kolor ORAZ podpis** — zielony słupek, zielony punkt,
  napis „PB". Sam kolor byłby nieczytelny na wydruku i przy daltonizmie.
  To rozszerza znaczenie zieleni z „plan i cel" na „osiągnięcie": dowieziony
  plan, osiągnięty cel, rekord. Nowej barwy nie wprowadzono, więc walidacja
  palety pozostaje w mocy.

  **Oś zaczyna się od zera i tak ma zostać.** Przy ucięciu poprawa z 1527 na
  1503 s (1,6%) wyglądałaby jak przepaść. Skoro słupek znaczy czas, wysokość
  musi być mu proporcjonalna; różnice podaje panel, nie oko.

  **Wybór segmentu żyje w adresie** — `#postepy/porownania/<id>`. `zHasha()`
  zwraca trzeci człon, `rysuj(arg)` go dostaje. Dzięki temu wstecz i
  odświeżenie działają bez dodatkowego stanu. Nie przenosić tego do zmiennej.

  Oś PRĘDKOŚCI od zera nie zaczyna się i to nie jest niekonsekwencja: w słupku
  wartość niesie wysokość (pole), więc ucięcie kłamie; w linii niesie ją
  położenie punktu, więc zakres wolno dopasować.

  Odnośnik „Segmenty" w pustym stanie nosi kolor sekcji (`--sek-napis`).
  To jedyne miejsce poza nawigacją, gdzie kolor sekcji jest dozwolony —
  bo wskazuje zakładkę, czyli nadal jest nawigacją.
- **Postępy → Dane** (21.08.2026) — rekordy mocy. Cztery kafelki (5 s, 1 min,
  5 min, 20 min), krzywa mocy na osi logarytmicznej i tabela wszystkich okien.
  Dotknięcie okna prowadzi do `#postepy/dane/<sekundy>`: wykres schodkowy
  pokazujący, jak ten rekord rósł, z listą jazd i odnośnikami na Stravę.
  Na wykresie stoją **wyłącznie jazdy, w których rekord padł** — przejazd
  słabszy niczego nie zmienia, więc linia może iść tylko w górę i pokazuje
  nie formę, tylko tempo poprawy.

  **Skąd te liczby.** Strava NIE oddaje przez API gotowych rekordów mocy na
  czas. Automat pobiera surowy strumień watów (`/activities/{id}/streams`)
  i liczy maksima średnich kroczących dla szesnastu okien od 1 s do 90 min;
  do `dane.js` trafiają same wyniki (`moc_krzywe`), kilkanaście liczb na jazdę.
  Strumień pobierany **tylko dla jazd z pomiarem**: `VirtualRide` albo próba
  na segmencie z `z_miernika`. Po kupnie miernika szosa wejdzie tu sama.

  Przerwa w osi czasu dostaje **zera**, nie ostatnią wartość — inaczej postój
  podbijałby długie okna mocą, której nikt nie wykręcił.

  **Krzywa mocy NIE MUSI maleć z długością okna — nie „poprawiać" tego.**
  Na jeździe z 18.10.2025 wyszło 10 min = 157 W przy 12 min = 158 W i wygląda
  to na błąd. Nie jest: maksimum średniej kroczącej nie jest monotoniczne.
  Kontrprzykład, seria `3 0 3 0 3` — najlepsza piątka daje 1,80, a najlepsza
  dwójka tylko 1,50. Znaczy to, że żadne krótsze okno nie trafiło w tak równy
  odcinek jak jedno dłuższe. Ścinanie krzywej do monotonicznej zaniżałoby
  prawdziwy pomiar. Wyjaśnienie stoi na stronie, w opisie krzywej.

  **ERG — znacznik przy jeździe, kryterium LICZBOWE** (21.08.2026, przelicznik
  poprawiony 22.08.2026). Strava nie ma pola „to był ERG". Rozstrzyga iloraz:
  **rekord 5-sekundowy ÷ rekord 15-minutowy tej samej jazdy**. Trenażer w ERG
  trzyma zadaną moc, więc pięć sekund ledwie odstaje od kwadransa. Zmierzone
  na komplecie 17 jazd: treningi sterowane **1,04–1,48**, wyścig **2,90**,
  sesje ze sprintami **5,79–6,50**. Między grupami leży pusty pas, więc próg
  **2,0** stoi w jego środku i ma zapas w obie strony. Wychodzi 13 jazd
  sterowanych z 17.

  Mianownikiem jest 15 min, bo to okno Zwift oddaje najczystszym pomiarem —
  decyzja Fryderyka. Poprzednia wersja dzieliła przez najdłuższe okno jazdy
  i przy progu 1,5 wypychała „Foundation on Sprinter's Playground" (1,69)
  do grupy wolnej mocy, choć to trening po planie. Nowy przelicznik daje mu
  1,48 i wkłada go tam, gdzie należy.

  Gdy jazda nie ma okna 15-minutowego, bierzemy najdłuższe dostępne, ale tylko
  powyżej 5 minut — na krótszym odcinku ten iloraz nic nie znaczy i wtedy
  jazdy nie klasyfikujemy. Nazwa treningu Zwifta (`NAZWY_PLANOW`) to zapasowy
  trop, gdy krzywej nie ma w ogóle.

  **Nie klasyfikować po nazwie.** Sesja „Strength" chodzi w ERG, ale sprint
  w środku jest prawdziwy, bo ERG puszcza przy maksymalnym wysiłku. Znacznik
  po nazwie podważałby rekord 702 W, który jest jak najbardziej Fryderyka.
  `TRENING.md` §8.1 mówi „15 z 17 w ERG" i liczy zamiar; ta reguła liczy
  dowód — stąd 12, nie 15, i to jest właściwa różnica.

  Znacznik stoi w pięciu miejscach: lista jazd (Start), nazwa w tabeli
  segmentów (przy najlepszej próbie), podpis pod każdym słupkiem na wykresie
  prób, panel wybranej próby oraz kafelki, tabela i historia rekordów (Dane).
  Wnioski mają osobną linijkę „Moc sterowana"; gdy sterowane są wszystkie
  próby, staje się ostrzeżeniem, bo czas na takim segmencie opisuje plan
  treningu, a nie formę.

  **Okno 12 min wypadło, weszło 15 min** (21.08.2026, decyzja Fryderyka).
  To na parze 10/12 min najczęściej wychodził tik w górę opisany niżej.
  Zamiana usuwa tę jedną parę, nie samo zjawisko — przy innych danych tik może
  wyjść gdzie indziej i nadal nie będzie błędem. Po zmianie krzywa rekordów
  schodzi bez ani jednego wzrostu: 161 → 157 → 155 → 148 W.

  **Krzywa mocy ma drugą oś: W/kg.** To NIE jest druga seria ani drugi zakres
  — te same waty podzielone przez masę zawodnika, przez to samo zero. Zakaz
  dwóch osi dotyczy dwóch RÓŻNYCH miar, nie jednej w dwóch jednostkach.

  **Kontrola poprawności:** wyliczone rekordy z wyścigu 18.10.2025 zgadzają się
  z tabelą w `TRENING.md` §8.1 co do wata — 30 s 271, 10 min 157, 20 min 148,
  30 min 143; sprint z 01.11 daje 702 W, tak jak notuje `TRENING.md`.
- **Prognozy → XII 2026 i XII 2027** (22.08.2026) — krzywa mocy, której
  jeszcze nie ma. Prognoza (zielona) i dzisiejszy rekord na to samo okno
  (cienka bursztynowa) na jednym rysunku, pod spodem lista celów z ptaszkiem
  i krzyżykiem, na końcu osobna karta FTP.

  **Mini-zakładki biorą się z `dane.js` → `prognozy.okresy`** — kod nie zna
  żadnej z nazwy. Dopisanie okresu tworzy zakładkę, usunięcie ją zabiera.
  To ta sama zasada co cel 80 km: liczba wpisana w kod wykresu byłaby drugim
  źródłem prawdy.

  **Dwie krzywe na jednym rysunku to NIE złamanie zakazu dwóch osi.** Zakaz
  dotyczy dwóch RÓŻNYCH miar na dwóch skalach. Tu jest jedna miara (waty na
  dane okno) w dwóch momentach: dziś i za cztery miesiące. Odległość między
  liniami jest całą treścią tego wykresu — rozdzielone na dwa rysunki nie
  powiedziałyby nic.

  **Barwy bez nowego wpisu do palety.** Prognoza JEST celem, więc jest
  zielona (`--plan`) — ta sama rola co linia planu na C1. „Dziś" JEST
  pomiarem mocy, więc jest bursztynowe (`--seria-moc`) — ta sama rola co na
  krzywej rekordów. Czerwień przy krzyżyku rozszerza rolę alarmu z „przerwa
  ponad limit" na „cel niedowieziony"; zieleń i czerwień stoją tu naprzeciw
  siebie jako dwie odpowiedzi na to samo pytanie. Walidacja palety pozostaje
  w mocy, bo żadnej barwy nie dołożono.

  **Ptaszek/krzyżyk i bieżące FTP: dwie warstwy, jak notatki do prób.**
  `dane.js` → `prognozy.wyniki` i `prognozy.ftp_biezace` to źródło prawdy,
  `localStorage` (`kolarstwo-prognozy`) to brudnopis urządzenia. Brudnopis
  zrównany z danymi kasuje się sam. Brudnopis wygrywa **także gdy trzyma
  `null`** — inaczej nie dałoby się na urządzeniu ZDJĄĆ znaku wpisanego
  w danych. Przycisk „Zaznaczenia dla Claude'a…" wypisuje je jako JSON do
  wklejenia w czacie. Strona nadal nie umie pisać do repozytorium i nie ma
  umieć: klucz do zapisu w publicznym repo byłby kluczem dla wszystkich.

  **Strona sama nie stawia ptaszka**, choć wie, ile brakuje. Termin
  (31.12.2026) nie minął, a cel osiągnięty raz na Zwifcie to nie to samo co
  cel dowieziony — rozstrzyga Fryderyk. Wiersz pokazuje więc pomiar i różnicę,
  a znak zostaje decyzją.

  **Dwa różne FTP i to jest celowe.** `zalozenia.FTP_W` = 180 W z tagiem
  `[E]` (estymata z modelu, przedział 170–200). `prognozy.ftp_biezace` = 150 W
  — deklaracja Fryderyka z 22.08.2026. Zmierzone dwadzieścia minut to 148 W,
  czyli reguła „FTP ≈ 0,95 × 20 min" daje 141 W, a własna estymata Stravy
  też 141 W. Bliżej prawdy jest liczba niższa i strona to mówi wprost
  w bloku pod kartą FTP. Nie zlewać tych dwóch pól w jedno.

  **Okno 40 s weszło do `CZASY_KRZYWEJ`** w automacie, bo Fryderyk postawił
  na nie cel, a celu, którego nikt nie mierzy, nie da się nigdy rozstrzygnąć.
  Nie kosztuje ani jednego zapytania więcej — liczy się z tego samego
  strumienia. Historia wypełnia się przy przebiegu z `pelna_moc`.

  Podpis punktu na krzywej schodzi POD punkt, gdy wpadłby na poprzedni.
  Samo rozsuwanie w pionie o stałą wartość tu nie działa: przy stromym
  zejściu krzywej podniesiony podpis niższego punktu ląduje dokładnie na
  wysokości podpisu wyższego (40 s i 1 min zlewały się w plamę).
- **Objętość → Tętno i Moc** (27.08.2026) — pierścień z rozkładem czasu po
  strefach. To ten sam wykres, który Strava rysuje po każdej jeździe, z jedną
  różnicą, która jest całym sensem zakładki: **nie dotyczy jednej jazdy, tylko
  okna 7, 30 albo 90 dni.** Pojedynczą jazdę Fryderyk ma na Stravie.

  **Liczenie: suma sekund w strefie ÷ suma sekund wszystkich.** Dwie jazdy po
  godzinie, jedna 70% w Z2 i druga 60% w Z2, dają 65% — sprawdzone na
  podstawionych danych, wychodzi 65,0%. Przy jazdach różnej długości waży je
  sam czas i tak ma zostać: godzina w Z2 waży więcej niż dziesięć minut w Z2.

  **Pięć stref tętna i siedem stref mocy** — tyle samo, co daje Strava (moc
  w modelu Coggana). Nazwy z `TRENING.md` §6, nie wymyślone.

  **Barwy: rampa CIEPLNA, poprawka z 27.08.2026 — nie wracać do odcieni
  jednego koloru.** Pierwsza wersja była skalą porządkową (jasność jednej
  fuksji / jednego bursztynu), zgodnie z regułą skilla `dataviz`. Fryderyk
  powiedział wprost, że za słabo odróżnia sąsiednie strefy — i miał rację:
  przy pięciu wycinkach stykających się na pierścieniu sama jasność to za
  mało. Teraz idzie od chłodnego niebieskiego (lekko) do czerwieni
  (maksymalnie).

  Hexy generowane w OKLCH i **przeszukane**, nie dobrane okiem: walidator
  skilla na parach SĄSIEDNICH (tylko takie się stykają), progi CVD ΔE ≥ 8
  i normalne widzenie ΔE ≥ 15. Wynik: tętno 8,9 / 18,0 w jasnym i 8,7 / 16,8
  w ciemnym; moc 13,6 / 16,5 i 12,9 / 15,5. **Szósta strefa mocy jest
  fuksjowa, a nie pomarańczowa**, bo para żółty–pomarańcz zapadała się przy
  protanopii do ΔE 0,1. Nie przestawiać stopni bez ponownego przepuszczenia
  przez walidator.

  Koszt tej zmiany, świadomy: barwa strefy nie mówi już, którą miarę
  oglądasz. Mówi to zakładka i podpis — a rozróżnialność stref była ważniejsza.

  **Wybrane okno żyje w adresie** — `#objetosc/tetno/30`, jak wybór segmentu
  w Porównaniach. Wstecz i odświeżenie działają bez dodatkowego stanu, a złe
  okno w adresie spada na domyślne 7 dni zamiast wywalić wykres.

  **Okno liczy się wstecz od `meta.pobrano`, nie od zegara urządzenia** — jak
  cała reszta strony poza paskiem świeżości danych.

  **Skrajności stref są NIEZMIENNE: 0 i nieskończoność.** Pierwsza strefa
  zaczyna się od zera, ostatnia nie ma górnego końca, i tych dwóch pól nie da
  się edytować na stronie. Bez tego tętno 90 przy Z1 od 100 albo sprint 1000 W
  przy Z7 do 999 wypadałyby poza wszystkie strefy i **cicho znikały** z wykresu,
  zaniżając sumę. Reguła klasyfikacji: wartość trafia do pierwszej strefy,
  której górny próg jest od niej nie mniejszy; ostatnia łapie resztę. Automat
  musi użyć dokładnie tej samej.

  **Efektywność w środku pierścienia (0–100%).** Ocenia KSZTAŁT rozkładu, nie
  ilość treningu. Wzorzec to model spolaryzowany Seilera: ok. 80% czasu poniżej
  progu tlenowego, ok. 5% progowo, 15–20% powyżej progu. Widełki na każdą
  strefę siedzą w `dane.js` → `strefy.efektywnosc.widelki`; punkt procentowy
  poza widełkami kosztuje `waga` punktu oceny. Sprawdzone: 90% czasu w Z1 daje
  **0%** (przykład Fryderyka — „dużo jeżdżenia" to nie to samo co dobry
  trening), rozkład 10/68/5/12/5 daje **100%**, a sama baza (100% Z2) **51%**.
  Obok liczymy wskaźnik polaryzacji PI = log10(Z1/Z2 × Z3 × 100) z ułamków
  czasu, próg 2,00 (Treff i in. 2019) — kontrola krzyżowa dla samej oceny.

  **Progi stref są DATOWANE i działają tylko w przód** (27.08.2026, decyzja
  Fryderyka). `strefy.tetno.tabele` i `strefy.moc.tabele` to listy wersji, każda
  z polem `od`. Rozkład jazdy liczy się tabelą obowiązującą **w dniu tej
  jazdy** i zostaje zapisany na stałe, więc podniesienie progu w listopadzie
  nie rusza jazd z września. Automat musi trzymać tę samą regułę i zapisywać
  przy jeździe, której tabeli użył. Jazda starsza niż najstarsza tabela bierze
  tę najstarszą — innej nie ma, a odmowa policzenia byłaby gorsza niż jawne
  założenie.

  Tabelę wpisuje się **na stronie**, każdą strefę osobno; przy tętnie stoi
  serce, przy mocy błyskawica. Zapis idzie do `localStorage`
  (`kolarstwo-strefy`) jako nowa wersja z datą dzisiejszą, a przycisk „Progi
  dla Claude'a…" wypisuje je do wklejenia w czacie — `dane.js` zostaje źródłem
  prawdy. Wersja z urządzenia o tej samej dacie nadpisuje tę z danych, bo dwie
  sprzeczne tabele na jeden dzień nie mają sensu. Zapis odmawia, gdy dolny próg
  nie jest mniejszy od górnego albo strefy zachodzą na siebie.

  Wpisane dziś tabele to **propozycje Claude'a do nadpisania**: tętno z HRmax
  201 (`TRENING.md` §6), moc z modelu Coggana przy FTP 150 W.

  `strefy.rozklady.jazdy` jest wciąż puste — automat dopisze sekundy w strefach,
  gdy będzie co liczyć. Wykres pokazuje wtedy pusty pierścień i mówi wprost
  dlaczego. **Nie wypełniać go zerami** — koło pełne zer wygląda jak wynik.
  Tętno wchodzi do jazd od 1.09.2026 (pas piersiowy), moc ma dziś wyłącznie
  Zwift i tylko z sesji swobodnych.
- **Objętość → Stan wytrenowania** (27.08.2026) — krzywa formy. Gruba linia to
  wytrenowanie (42 dni), cienka przerywana zmęczenie (7 dni), różnica to forma.
  Obie w tych samych jednostkach, więc jedna oś — zakaz dwóch osi dotyczy
  dwóch RÓŻNYCH miar. Dotknięcie albo przesunięcie palcem odczytuje dowolny
  dzień (krzyżyk + panel nad wykresem).

  **Strava NIE oddaje swojej krzywej Fitness przez API** — nie ma takiego
  zapytania, więc to nie jest „przeniesienie", tylko policzenie tą samą metodą
  u siebie. Obciążenie dnia = minuty ruchu × RPE (session-RPE, Foster 1998),
  z niego dwie średnie wykładnicze o stałych z `dane.js`
  (`stan_wytrenowania.ctl_dni` / `atl_dni`). **Skala jest własna** i strona mówi
  to wprost: porównywalny jest wyłącznie przebieg w czasie, nie sama liczba.

  Wykres startuje 1.03.2026, bo **od tego dnia każda jazda ma RPE** (35 z 35 od
  1.05.2026). Wcześniejsze jazdy bez RPE liczone jako zero dawałyby fałszywy
  dołek, a zgadywane byłyby zmyśleniem. Po pasie tętna obciążenie policzymy
  z TRIMP, po mierniku z TSS — metoda siedzi w danych, nie w kodzie wykresu.
- **Objętość → Regeneracja** (27.08.2026) — ile godzin do pełnej gotowości po
  ostatniej jeździe, licznik tykający **na żywo**, plus stan zmęczenia 1–10.

  **Wzór:** `godziny = 0,8 × minuty_ruchu × (RPE/10)^1,9`, wszystko z `dane.js`
  → `regeneracja`. Wykładnik przy RPE sprawia, że intensywność waży mocniej niż
  czas. Garmin liczy to z EPOC, czyli z tętna — tego jeszcze nie ma, więc
  liczymy z RPE, które Fryderyk wpisuje sam. Zakotwiczenie w regule „48–72 h
  między twardymi treningami": 90 min przy RPE 8 wychodzi 47 h, lekka godzina
  przy RPE 3 — 5 h.

  **Zaległość: połowa, nie całość i nie zero.** Jazda zaczęta przed końcem
  poprzedniej regeneracji dolicza połowę zaległych godzin — część regeneracji
  biegnie równolegle, ale przy zerze dwa mocne dni pod rząd wyglądałyby jak
  jeden. Sprawdzone: interwały RPE 8 (47 h), a po nich tempo RPE 6 z 23 h
  zaległości → 18 + 11 = **30 h**.

  **Licznik odlicza od ZEGARA URZĄDZENIA** — to drugie i ostatnie takie miejsce
  na stronie (pierwsze to pasek świeżości danych). Licznik, który stoi, nie jest
  licznikiem. Reszta strony nadal liczy względem `meta.pobrano`.

  **Stan 1–10 w kierunku indeksu Hoopera** (1 = najlepiej, 10 = najgorzej), ale
  LICZONY z danych, nie z ankiety: z zaległej regeneracji i z napięcia
  zmęczenie/wytrenowanie (ATL/CTL). Każdy stopień ma nazwę i opis w `dane.js` —
  barwa nigdy nie występuje sama. Rampa zieleń → bursztyn → czerwień, kontrast
  do tła sprawdzony (najsłabszy stopień 3,27:1 w jasnym, 3,36:1 w ciemnym).

  Jazda bez RPE jest pomijana — zgadywanie wysiłku byłoby zmyśleniem.
- **Gablota → Koszulki** (27.08.2026) — osiemnaście koszulek z zawodowego
  kolarstwa, każda za jeden z góry ustalony warunek. Zablokowana jest widoczna
  i wyszarzona, zdobyta świeci pełną barwą z datą. Grupowanie po seriach od
  najłatwiejszej (TdP) do najtrudniejszej (mistrzostwa).

  **ODBLOKOWANIE JEST ZAWSZE RĘCZNE** — decyzja Fryderyka z 27.08.2026,
  po zobaczeniu pierwszej wersji. Strona liczy postęp i mówi „warunek
  spełniony", ale kłódki nie zdejmuje nigdy, nawet przy 100%. Robi to przycisk
  w szczegółach koszulki, a pomyłkę cofa „Cofnij zdobycie". Ta sama granica co
  przy ptaszkach w prognozach: pomiar to nie decyzja.

  **Zdobycie ma dwie warstwy — poprawka tego samego dnia, wcześniejszy wpis
  mówił inaczej i był nie do pogodzenia z przyciskiem.** Skoro klika człowiek
  na iPadzie, a strona nie umie pisać do repozytorium, zdobycie działa jak
  notatki do prób: `dane.js` → `koszulki[].zdobyta` to źródło prawdy (widać na
  każdym urządzeniu, przeżyje wyczyszczenie Safari), a `localStorage`
  (`kolarstwo-koszulki`) to brudnopis tego urządzenia. Brudnopis wygrywa, gdy
  istnieje — także gdy trzyma `null`, bo inaczej nie dałoby się cofnąć
  zdobycia wpisanego już w danych. Ryzyko wyczyszczenia Safari zostaje realne,
  więc strona mówi przy każdej takiej koszulce wprost, że nie ma jej jeszcze
  w danych, a przycisk „Koszulki dla Claude'a…" wypisuje brudnopisy do
  wklejenia w czacie. **Bez tego przeniesienia dorobek żyje w jednej
  przeglądarce** — to jedyna cena za odblokowywanie z telefonu i Fryderyk
  ją zna.

  **Zablokowana koszulka nosi kłódkę**, nie tylko wyszarzenie. Przy osiemnastu
  kafelkach naraz oko potrzebuje znaku, nie odcienia — i będzie go potrzebowało
  tym bardziej, im więcej koszulek zdobytych.

  **Fajerwerki po odblokowaniu** — kilkadziesiąt kropek w trzech wybuchach,
  czysty CSS, warstwa kasuje się sama po 1,9 s. Przy systemowym „ogranicz
  ruch" nie odpalają się wcale, tak jak animacje wykresów.

  **Warunek w watach liczy się wyłącznie z pomiaru `[Z]`.** Nigdy z estymaty
  Stravy `[S]`, nigdy z modelu `[E]`. Strava podała 975 W na Bump 2
  (13.08.2026) — 25 W od warunku Giro sprinterskiej. Odwrócenie jej modelu
  daje CdA ≈ 0,257, czyli sylwetkę czasówkową, a nie pozycję Fryderyka.
  Bez tej reguły pierwsza koszulka padłaby za cudze założenie. Waty
  z trenażera są pomiarem, ale **tylko z sesji swobodnych** — `jestErg()`
  odsiewa treningi sterowane. Koszulka bez ani jednego pomiaru na swoim oknie
  pokazuje „czeka na miernik mocy", a nie pasek postępu.

  **Kod nie zna żadnej koszulki z nazwy.** Progi, barwy, daty i teksty są
  w danych; w kodzie stoi tylko słownik `MIARY` — sześć nazw mówiących, JAK
  liczyć (`najdluzsza_jazda_m`, `km_w_miesiacu_m`, `dlugi_szybki`,
  `segment_czas_s`, `bez_przerwy_dni`, `moc_okno_w`). Dopisanie koszulki do
  `dane.js` dokłada ją do gabloty.

  **Koszulki liczą się z CAŁEJ historii**, nie od `meta.liczone_od` jak
  wykresy: jazda z 2024 odbyła się naprawdę. Zawężenie robi się per koszulka,
  polami `od_daty` / `do_daty`.

  **Postęp przy warunku „nie więcej niż" liczy się odwrotnie**: `prog / wynik`.
  Cel 45 s wobec rekordu 50 s to 90% drogi, a nie 111%.

  **TdP górala nagradza czas na Lipkowskiej (7,5%, 294 m) w 45 s**, nie FTP
  200 W — decyzja Fryderyka z 27.08.2026. Powód: koszulka jest górska, a FTP
  to parametr płaski; do tego FTP trzymałoby ją zablokowaną do miernika.
  Powstaje drabinka: Lipkowska 45 s → Bump 2 35 s (Vuelta górala).
  Okno żółtej TdP to **1.09–24.12.2026** (też jego decyzja, nie 31.12).

  Zgadywanie jest zakazane: wyników wyścigów Zwifta, KOM-ów, liczby zawodników
  na segmencie ani kategorii podjazdu **nie da się** wyciągnąć z API i nie
  wolno ich domyślać z nazwy jazdy. Dziewięć koszulek rozstrzyga Fryderyk
  ręcznie i to jest uczciwy stan, nie brak funkcji.
- **Aktywności → Outdoors i Indoors** (30.08.2026) — każda jazda w jednym
  wierszu. Ta sama tabela co Segmenty, tylko jednostką jest CAŁA JAZDA:
  długość, prędkość średnia, tętno średnie, moc średnia, przewyższenie.
  Sortowanie po każdej kolumnie, drugie dotknięcie odwraca, szukanie w nazwie,
  krzyżyk czyści wszystko.

  **Podział idzie po typie ze Stravy, nie po nazwie jazdy.** `VirtualRide` to
  trenażer, czyli **Indoors**; `Ride` to szosa, czyli **Outdoors**. Fryderyk
  w zleceniu napisał odwrotnie („outdoors to ofc zwift"), ale chodziło mu o ten
  sam podział — nazwy stoją tam, gdzie mówi rzeczywistość.

  **Pierwsza kolumna sortuje po DACIE, nie po nazwie.** Nazwy jazd to „Morning
  Gassy ride" i „gravel brusy" — alfabet nie odpowiada na żadne pytanie, a „co
  robiłem ostatnio" jest pierwszym pytaniem do listy aktywności. Do szukania
  nazwy jest pole obok.

  **DWIE NIEZALEŻNE GRUPY FILTRÓW, nie jedna lista jak przy segmentach.** Tam
  filtry wykluczały się wzajemnie, więc starczyła jedna wartość. Tutaj Fryderyk
  poprosił wprost o łączenie warunków — „bez mocy ale z tętnem" — czego nie da
  się zapisać jednym wyborem. Dwie grupy po trzy stany dają wszystkie dziewięć
  kombinacji.

  **Liczby przy filtrach liczą się z DRUGIM filtrem włączonym.** Gdyby
  pokazywały sumę bezwzględną, „Z tętnem (12)" przy włączonym „Z mocą"
  prowadziłoby do pustej tabeli — liczba obiecywałaby wiersze, których nie ma.

  **Automat zapisuje `tetno_sr` i `moc_sr`** — oba pola przychodzą w liście
  aktywności, tym samym zapytaniem, które i tak leci. Moc TYLKO przy
  `device_watts`: `average_watts` bez miernika to estymata Stravy `[S]`,
  w tabeli nie do odróżnienia od pomiaru. Dziś moc mają wyłącznie 17 jazd
  ze Zwiftu, tętno **żadna** — pas piersiowy wchodzi 1.09.2026 i kolumna
  wypełni się sama. Strona mówi wprost, że pusta kolumna to nie błąd.

  Uchwyty wieszamy na elementach powstających przy każdym przerysowaniu (tak
  jak przy segmentach), więc wartownik `dataset` nie jest potrzebny. Wyjątek:
  uchwyt filtrów wisi na `.przelaczniki-akt`, a nie na przyciskach — grupy
  przerysowują się po każdym wyborze (zmieniają się liczniki), więc uchwyt
  na przycisku zginąłby razem z nim po pierwszym kliknięciu.

  **Kolejność: Indoors, potem Outdoors** (decyzja z 30.08.2026, po pierwszej
  wersji odwrotnej).

  **Szerokości kolumn liczą się z NAJDŁUŻSZEGO NAPISU, a tym jest nagłówek,
  nie liczba.** Sześć równych kolumn po 13,2% dawało 100 px przy `min-width`
  760 px, a „Przewyższenie" potrzebuje 137 px — napis wychodził poza komórkę
  i sklejał się z „Mocą" w jeden wyraz. Teraz `min-width` 840 px i osobna
  szerokość na kolumnę; zmierzone prześwity 44–82 px przy 500 px ekranu.
  Po dołożeniu kolumny SPRAWDZIĆ TO MIARĄ, nie okiem.

- **Aktywności → Jazda** (30.08.2026) — okno pojedynczej jazdy, otwierane
  dotknięciem wiersza w tabeli. Działa jak Porównania S: **wybrana jazda żyje
  w adresie** (`#aktywnosci/jazda/<id>`), więc wstecz i odświeżenie działają
  bez dodatkowego stanu, a odnośnik z tabeli jest zwykłym odnośnikiem.
  Osiem kafelków (długość, czas ruchu i postój, prędkość, przewyższenie z m/km,
  tętno, moc, RPE, praca w kJ) plus odnośnik na Stravę.

  **DWIE WARSTWY NOTATEK, KTÓRE SIĘ NIE MIESZAJĄ** — decyzja Fryderyka:
  1. `opis` ze Stravy — **NIETYKALNY, tylko do odczytu**. Strava jest jego
     jedynym właścicielem, automat nadpisuje go przy każdym przebiegu, więc
     poprawka wpisana na stronie zniknęłaby tej samej nocy. Blok ma barwę
     firmową Stravy `#FC4C02` i pismo proste. Nie robić z niego pola do
     edycji „dla wygody" — to nie jest niedoróbka.
  2. **Dopisek** — osobne pole, osobny klucz, **kursywa i kreskowana krawędź**,
     żeby nigdy nie dało się pomylić, kto co napisał. Pisze go Fryderyk na
     stronie albo Claude w czacie przez `claude.js` → `jazdy[id_jazdy]`.
     Pierwszeństwo: brudnopis urządzenia > `claude.js` > `dane.js` →
     `notatki_jazd`. Klucz `localStorage`: `kolarstwo-notatki-jazd`.

  Dopisek **nie wymaga sekretu** — `ANTHROPIC_API_KEY` jest wyłącznie dla
  nocnej Analizy AI. Claude w czacie pisze do `claude.js` przez konektor
  GitHuba i nic więcej mu nie potrzeba.

  **Jeden wykres z trzema miarami — i NIE jest to złamanie zakazu dwóch osi.**
  Fryderyk poprosił o moc, tętno i prędkość średnią na jednym rysunku. Zakaz
  dotyczy dwóch RÓŻNYCH miar na dwóch skalach o osobnych zakresach, bo
  przesunięciem jednego zakresu da się dowieść dowolnej tezy. Tutaj jest
  **jedna oś o jednym znaczeniu: procent najlepszej wartości w zbiorze**.
  Przeliczenie jest identyczne dla wszystkich trzech serii, nie ma w nim ani
  jednej liczby dobranej ręcznie, a legenda podaje dzielnik, więc każdy punkt
  wraca do watów i uderzeń. Barwy z gotowej palety serii (`--seria-moc`,
  `--seria-tetno`, `--seria-predkosc`) — nic nowego nie dołożono.

  **Punkt to CAŁA JAZDA, nie sekunda.** Strona trzyma średnie, nie przebieg
  sekunda po sekundzie; rysunek wewnątrz jednej jazdy wymagałby strumieni,
  czyli kilku megabajtów na sto jazd. Wykres pokazuje więc, jak te trzy miary
  zmieniają się MIĘDZY jazdami, i tylko w obrębie tego samego rodzaju
  (trenażer osobno od szosy — inaczej skok prędkości mówiłby o pogodzie).
  Brakująca seria jest **nazwana pod wykresem**, a nie chowana w ciszy.

- **Zakładka Teren → Mapa została USUNIĘTA 30.08.2026**, dzień po zbudowaniu —
  decyzja Fryderyka („zamiast tej zakładki z mapami"). Kod mapy wyleciał
  z `index.html`, ale `swiat.js`, `trasy.js` i zbieranie śladów w automacie
  ZOSTAJĄ: nic nie kosztują, a przywrócenie mapy to cofnięcie jednego commita.
  Jeśli mapa ma nie wrócić, wtedy dopiero kasować pliki i blok tras w skrypcie.

- **Dwa błędy naprawione 27.08.2026 — nie cofać wzorca:**
  - `.pasek-postepu.duzy` ma `position:relative`, nie `static`. Wypełnienie
    paska jest pozycjonowane absolutnie, więc przy statycznym rodzicu szukało
    najbliższego pozycjonowanego przodka i rozlewało zieleń na pół ekranu.
  - **Nasłuchy kliknięć podpina się RAZ, nie przy każdym przerysowaniu.**
    `pokaz()` woła `podepnij*()` za każdym wejściem w zakładkę, a te wieszały
    uchwyt na `#tresc`, który przeżywa przerysowanie. Po drugiej wizycie jedno
    kliknięcie ptaszka w Prognozach wykonywało się dwa razy: stawiało znak
    i od razu go zdejmowało. Stąd wartownik `dataset` na `#tresc` oraz wymóg,
    żeby uchwyt czytał stan z DOM w chwili kliknięcia, a nie pamiętał go
    z chwili rysowania.
- **Kolejność zakładek: Gablota jest ostatnia** (decyzja Fryderyka z
  27.08.2026). **Barwa idzie za POZYCJĄ, nie za zakładką** — siedem miejsc ma
  na stałe bursztyn, turkus, fiolet, limonkę, fuksję, cyjan i pomarańcz.
  Gablota przenosząc się z piątego miejsca na siódme zmieniła barwę
  z fuksjowej na pomarańczową i tak ma być; fuksję przejęła Objętość.
- **Z3–Z5** — miejsca zarezerwowane, świadomie zostawione (Fryderyk chce
  widzieć docelowy kształt strony)
- Ikony kolarskie w tle (7 sylwetek, losowe z ustalonego ziarna, pasy przy
  krawędziach, krycie 17% jasny / 10% ciemny)

**Segmenty:** 365 segmentów, 1717 przejazdów, 61 jazd od `2025-08-01`
(granica cofnięta 20.08.2026 na prośbę Fryderyka, żeby objąć blok Zwiftowy
z X–XI 2025). Zmiana tej jednej daty plus przebieg z `pelne_segmenty`
przesuwa granicę w dowolną stronę — jak `liczone_od`.

**MOC: pokazujemy wyłącznie zmierzoną. Nie przywracać estymaty.**
Decyzja Fryderyka z 20.08.2026, po tym jak przez pół dnia w kolumnie stała
liczba `[E]` z modelu fizycznego. Powód jego słowami: te liczby to mocne
estymaty, których nie ma dziś czym zweryfikować. Powód techniczny: w estymacie
siedzi CdA 0,38 z tagiem `[?]`, a liczba wygląda w tabeli dokładnie tak samo
jak pomiar.

Stan faktyczny, sprawdzony na pełnych danych:

| Źródło | Przejazdów | Z mocą | Skąd |
|---|---|---|---|
| Zwift (`VirtualRide`) | 118 | **118** | trenażer, `device_watts: true` → `[Z]` |
| Szosa (`Ride`) | 1599 | **0** | brak miernika, Strava nie oddaje przez API |

Czyli 45 segmentów z liczbą, 320 z kreską. Kolumna wypełni się **sama**
w dniu, w którym pojawi się miernik mocy — kod bierze `moc_S` z próby i nic
nie liczy. Funkcja `mocE()` skasowana; jej wyprowadzenie i kontrola na Bump 2
(471 W wzorem ze średniej prędkości wobec 493 W z pełnego wyliczenia) zostają
w `TRENING.md` §7.1, gdyby kiedyś wróciła jako osobna, wyraźnie oznaczona
kolumna.

**NOTATKI DO PRÓB — dwie warstwy, nie jedna.** Strona jest statyczna i nie ma
jak zapisać niczego do repozytorium (klucz do zapisu w publicznym repo byłby
kluczem dla wszystkich). Dlatego:

1. `dane.js` → `notatki`, klucz = `id` próby — **źródło prawdy**. Tu sięga
   Claude, tu jest kopia zapasowa, to widać na każdym urządzeniu.
2. `localStorage` (`kolarstwo-notatki`) — **brudnopis tego urządzenia**.

Reguła scalania: pokazujemy brudnopis, jeśli istnieje, inaczej wersję z danych.
Brudnopis zrównany z danymi kasuje się sam — czyli po dopisaniu notatki do
`dane.js` urządzenie przestaje trzymać kopię. Przycisk „Notatki dla Claude…"
wypisuje brudnopisy jako JSON z nazwą segmentu, datą i czasem, żeby dało się je
wkleić w czacie i dopisać do danych. **Nie wymyślać zapisu z przeglądarki
prosto do repo — to wymagałoby klucza w publicznym repozytorium.**

Identyfikator próby ma 19 cyfr, a `JSON.parse` trzyma liczby w float64 — trzy
ostatnie cyfry są zaokrąglane. Sprawdzone na komplecie 1717 prób: wszystkie
pozostają unikalne, najmniejsza różnica to 1024 wobec kroku zaokrąglenia 512.
Klucze notatek są więc trwałe i rozłączne.

**RPE** (`perceived_exertion`) wchodzi do `aktywnosci` od 20.08.2026 — 44 jazdy
ze 100 je mają. Przychodzi tym samym zapytaniem co opis i segmenty, więc nie
kosztuje ani jednego dodatkowego ruchu. Przy braku miernika mocy i tętna jest
najlepszą dostępną miarą wysiłku (`TRENING.md` §8.6) i bez niego czas na
segmencie kłamie: przejazd z koła kolegi wygląda jak forma.

Nachylenie bierzemy z `average_grade` Stravy. **Nie liczyć go z przewyższenia:**
`elevation_gain` sumuje same podjazdy i gubi znak — na Obory-Opacz dałoby
+0,28% zamiast prawdziwych −0,1%.

**Dane:** 100 aktywności, pobrane 19.08.2026. `meta.liczone_od = "2025-08-31"`
— decyzja Fryderyka; wcześniejsza historia zostaje w pliku, ale nie wchodzi do
wykresów. Zmiana tej jednej daty przywraca wszystko.

**Kryterium sezonu: wariant B**, wybrany 19.08.2026. Wyjazd bez roweru nie liczy
się jako przerwa, jeśli zgłoszony **zanim** przerwa przekroczy 14 dni. Maks. dwa
w roku. Lista w `dane.js` → `kryterium_przerwy.wyjazdy_bez_roweru`.

---

## 7. Zasady pracy, które się sprawdziły

1. **Weryfikować dane przed narysowaniem wykresu.** Kontrola krzyżowa
   z `TRENING.md` wyłapała już pułapkę: jazda z 23.05.2026 ma niepełny zapis
   (18,6 km zamiast ~45, opis „20/45 się nie nagrało"). Przy metryce
   „najdłuższa jazda" taki rekord przeszedłby niezauważony.
2. **Renderować arkusz próbny przed wdrożeniem grafiki.** Rower bez kierownicy
   i ikona gór wyglądająca jak strzałka wyszły dopiero na podglądzie
   w pełnym kryciu.
3. **Sprawdzać w prawdziwej przeglądarce, nie zakładać.** Chromium jest
   dostępny w `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Zawsze
   testować przy 500 i ~1200 px i sprawdzać `body.scrollWidth` vs `clientWidth`.
4. **Nie ufać własnym testom bardziej niż kodowi.** Dwa razy „błąd" okazał się
   błędem sondy, nie strony.
5. **Commit opisuje decyzję i jej powód**, nie tylko zmianę.

---

## 6a. `claude.js` — treści pisane przez Claude'a w czacie

Osobny plik w korzeniu, ładowany zaraz po `dane.js`. Powstał 28.08.2026, żeby
Claude z **zwykłego czatu** (przez konektor GitHuba) mógł dopisywać notatki
i komentarze bez ruszania 272-kilobajtowego `dane.js`, który automat i tak
przepisuje co noc. Dwa mechanizmy piszące po jednym pliku to gwarantowany
konflikt; dwa pliki to zero konfliktów.

**Zakres jest twardo ograniczony do TREŚCI** — decyzja Fryderyka z 28.08.2026.
`claude.js` trzyma `notatki`, `analizy` i `teksty`, czyli słowa. Progi stref,
zdobyte koszulki, ptaszki w prognozach i pomiary zostają w `dane.js`, poza
zasięgiem czatu: pomyłka w rozmowie ma móc zepsuć najwyżej zdanie.

Pierwszeństwo: **brudnopis urządzenia > `claude.js` > `dane.js`**. Ostatnie
słowo ma zawsze Fryderyk przy swoim ekranie.

Instrukcja dla Claude'a w czacie siedzi w komentarzu na początku `claude.js` —
plik tłumaczy sam siebie temu, kto go otworzy. Strona działa też **bez tego
pliku** (sprawdzone): `TRESCI` spada wtedy na pusty obiekt.

---

## 6b. Analiza AI — jedyne miejsce, gdzie pisze model

Zakładka `Postępy → Analiza AI` (28.08.2026). Tekst pisze tam **naprawdę
model**, w odróżnieniu od „Wniosków" w Porównaniach, które są regułami
liczonymi w przeglądarce. Ta różnica jest powodem, dla którego wolno tu użyć
nazwy „Analiza AI", a tam nie było wolno.

**Jak to działa.** Strona jest statyczna i nie ma jak zapytać modelu. Robi to
automat: `.github/skrypty/analiza.js` po nocnym pobraniu ze Stravy woła
Messages API (`claude-opus-5`, raw `fetch`, zero zależności — tak jak reszta
automatu) i zapisuje wynik do `analiza.js`. Strona tylko go rysuje.

**Odcisk danych zamiast codziennego wydatku.** Przed wywołaniem liczymy skrót
z briefingu. Ten sam odcisk = nic się nie zmieniło = nie wołamy modelu i
zostawiamy poprzedni komentarz. Dzień bez jazdy nie kosztuje ani grosza.

**Model NIE wstawia HTML-a.** Oddaje listę bloków z zamkniętego słownika
(nagłówek, akapit, lista, kafelki, ostrzeżenie i siedem typów wykresów),
sprawdzaną dwa razy: w automacie przed zapisem i na stronie przed
narysowaniem. Nieznany typ albo złe pole wylatuje po cichu, a każdy tekst
przechodzi przez `bezpieczny()`. Sprawdzone: `<script>` w treści renderuje się
jako tekst i niczego nie uruchamia.

**Awaria analizy nie może zepsuć przebiegu.** Skrypt kończy się zerem przy
każdym błędzie — bez klucza, przy odmowie modelu, przy niepoprawnym JSON-ie.
Zostaje wtedy poprzedni komentarz, a pobieranie danych leci dalej.

Briefing to **wyciąg**, nie całe `dane.js`: 23 kB zamiast 272 kB. Model widzi
to samo co Fryderyk na wykresach — plus progi i decyzje, nie więcej.

Wymaga sekretu `ANTHROPIC_API_KEY` w repozytorium. **Dopóki sekretu nie ma,
skrypt wypisuje „Brak ANTHROPIC_API_KEY — pomijam analizę” i kończy się zerem** —
nie kasuje tego, co stoi w `analiza.js`, i nie psuje pobierania danych.

**Pierwsza analiza jest napisana ręcznie w czacie** (28.08.2026) i to jedyny
taki wpis. Powstała, bo zakładka bez sekretu stałaby pusta, a Fryderyk poprosił,
żeby analiza „zawsze tam była”. Pole `odcisk` jest prawdziwym skrótem briefingu
z tego dnia, więc automat uzna dane za niezmienione i zostawi ten tekst
w spokoju aż do pierwszej nowej jazdy. Pole `model` mówi wprost „asystent
w sesji czatu” — plik nie ma udawać, że napisał go automat.

`briefing()` i `odciskDanych()` są eksportowane z `.github/skrypty/analiza.js`
(`module.exports` + `if (require.main !== module) return;`), żeby dało się
policzyć **dokładnie ten sam** skrót bez drugiej kopii logiki. Dwie kopie
rozjechałyby się przy pierwszej zmianie briefingu i automat nadpisywałby
analizę bez powodu.

---

## 7a. Dostęp do Stravy — trzy różne drogi, nie mylić

Nowa sesja łatwo wyciąga błędny wniosek: widzi, że serwer z `.mcp.json`
prosi o logowanie, i ogłasza brak dostępu do Stravy. **To jest przedwczesny
wniosek** — dróg jest trzy i tylko jedna bywa zablokowana.

| Droga | Czym jest | Kiedy działa |
|---|---|---|
| **A** — `.mcp.json` | serwer zadeklarowany w repo | wymaga OAuth przez `/mcp` w sesji terminalowej; w czacie webowym **nie** |
| **B** — konektor Stravy na koncie claude.ai | autoryzowany raz, na poziomie konta | działa w sesjach webowych; **tym pobrano komplet danych 19.08.2026** |
| **C** — GitHub Actions + API Stravy | serwer GitHuba z kluczem z sekretów repo | docelowy automat; **nie wymaga żadnej sesji Claude** |

**Zanim ogłosisz brak dostępu — sprawdź drogę B.** `ToolSearch` po słowie
„strava" i próbne `list_activities` z `first: 1`. Zajmuje sekundę.

Droga C jest odporna na ten problem z definicji: klucz leży w sekretach repo,
GitHub loguje się sam. Dlatego automat, a nie ręczne pobieranie z sesji.

**Klucze Stravy nigdy nie trafiają do plików w repo** — repo jest publiczne.
Wyłącznie `Settings → Secrets and variables → Actions`.

---

## 7b. Automat aktualizacji danych — jak działa

Zbudowany 20.08.2026. Serwer GitHuba codziennie loguje się do Stravy i odświeża
`dane.js`. Strona zostaje statyczna — odświeża się sam *plik*. **Żadna sesja
Claude nie jest do tego potrzebna.**

```
.github/workflows/strava-sync.yml   codziennie 20:00 UTC + przycisk ręczny
.github/workflows/strava-init.yml   jednorazowy, zdobycie refresh tokenu
.github/skrypty/pobierz-strave.js   pobiera i przepisuje dane.js
.github/skrypty/wymien-kod.js       kod -> refresh token
.github/skrypty/wspolne.js          odświeżanie tokenu, zapytania
```

Sekrety w repo: `STRAVA_CLIENT_ID` (273451), `STRAVA_CLIENT_SECRET`,
`STRAVA_REFRESH_TOKEN`. Refresh token Stravy nie wygasa.

**ZASADA NADRZĘDNA SKRYPTU — nie łamać.** `pobierz-strave.js` **nie generuje
pliku od zera**. Wczytuje istniejący `dane.js` i podmienia wyłącznie listę
aktywności oraz stemple w `meta`. Bloki `zalozenia`, `kryterium_przerwy`,
`cele` i `plan_objetosci` są ustalane ręcznie i muszą przetrwać każdą
aktualizację. Automat, który je kasuje, byłby gorszy niż brak automatu.

**Zapis jest generyczny — 20.08.2026, nie cofać.** Pierwsza wersja wypisywała
listę znanych nazw bloków. Skutek: dowolny nowy blok dopisany ręcznie znikał
przy najbliższym przebiegu o 22:00, po cichu. Teraz pętla przepisuje **każdy**
klucz, który zastała w pliku. Dzięki temu blok `cele` (dodany tego samego dnia)
w ogóle przeżył pierwszą noc.

Opisów jazd nie ma w liście aktywności Stravy — dociągane osobno, dla jazd
nowych **oraz z ostatnich 30 dni** (`OKNO_OPISOW_DNI`). Powód: opis powstaje
zwykle PO wgraniu jazdy, a poprawki jeszcze później — pobranie raz, przy
pierwszym spotkaniu, gubiłoby wszystko, co dopisane potem. Dzienny przebieg to
kilka zapytań. Ręczny przycisk ma przełącznik `pelne_opisy` do jednorazowego
odświeżenia całej historii.

Rozróżnienie, które musi zostać: brak opisu na Stravie **kasuje** opis u nas
(Strava jest masterem), ale **nieudane zapytanie** zostawia to, co było. Bez
tego jedna awaria sieci zjadałaby dane o wietrze i tętnie.

Zabezpieczenia: pusta odpowiedź przerywa przebieg zamiast kasować dane; przed
commitem plik musi się sparsować i mieć niezerową liczbę aktywności; commit
tylko przy faktycznej zmianie.

**Automat liczy rozkłady stref — dodane 28.08.2026 po audycie.** Do tego dnia
`grep strefy` w skrypcie dawał ZERO trafień: pierścienie Tętno i Moc nigdy nie
wypełniłyby się same, choćby Fryderyk wgrał sto jazd. Skrypt pyta teraz o
strumień `time,watts,heartrate` jednym zapytaniem (waty i tętno przychodzą
razem, więc pytanie osobno kosztowałoby dwa razy tyle), klasyfikuje sekundy
tabelą obowiązującą W DNIU JAZDY i zapisuje wynik razem z datą użytej tabeli.

Reguła klasyfikacji jest DOKŁADNIE ta sama co na stronie: wartość trafia do
pierwszej strefy, której górny próg jest od niej nie mniejszy, a ostatnia
(max = null) łapie resztę. Dziura w zapisie dłuższa niż 10 s to postój i nie
liczy się do żadnej strefy; brak pomiaru nie jest zerem.

`has_heartrate` ze Stravy zapisujemy przy jeździe jako `ma_tetno` — bez tego
faktu skrypt musiałby pytać o strumień każdej jazdy albo żadnej. Rozkład raz
policzony zostaje; `PELNE_STREFY` jest wyłącznie na wypadek zmiany samej metody.

**Cron: dwa odpalenia i minuta 37 — poprawka z 27.08.2026, nie cofać.**
Przebieg z 26.08 w ogóle się nie odbył. Zadania z crona GitHub gubi przy
obciążeniu, a najgorsza jest pełna godzina, bo wtedy startuje pół świata.
Stąd `37 20 * * *` zamiast `0 20 * * *` plus drugie odpalenie `37 5 * * *`,
które łapie wieczorne, jeśli przepadło. Kosztuje kilka zapytań dziennie —
skrypt i tak dociąga wyłącznie to, czego nie ma.

**Powtórzony klucz w YAML kasuje CAŁY workflow — pułapka z 28.08.2026.**
Przy dodawaniu przełącznika `pelne_strefy` wejście `wymus_analize` dostało
`default` dwa razy. Skutek: przez pięć godzin ani jeden przebieg nie
wystartował — cztery odpalenia z pusha skończyły się porażką w zero sekund
i z zerem zadań, a GitHub pokazywał zamiast nazwy workflow surową ścieżkę
pliku. Ze strony nie było tego widać: dane po prostu stanęły. Parser GitHuba
odrzuca cały plik, nie samo wejście. Po każdej zmianie w `.yml` warto
przepuścić go parserem odrzucającym duplikaty kluczy — `yaml.safe_load`
w Pythonie ich NIE łapie, bo pozwala ostatniemu wygrać.

**Wyścig o push — naprawiony 20.08.2026, nie usuwać.** Zadanie potrafi stać
w kolejce GitHuba kilka minut. Jeśli w tym czasie ktokolwiek wypchnie coś na
`main`, push automatu leci na nieaktualny stan i GitHub go odrzuca
(`fetch first`) — tak zginął przebieg #1. Krok commitujący ma teraz trzy
próby z `git pull --rebase` pomiędzy. Przy nieudanym rebase przerywa zamiast
nadpisywać.

Testowane bez sieci (podstawiony `fetch`) — dziewięć kontroli, w tym
nienaruszalność bloków ręcznych.

---

## 8. Co dalej

**Automat POTWIERDZONY 20.08.2026.** Przebieg #2 zakończył się sukcesem
w 17 sekund i sam wypchnął commit `790c815` autorstwa „Automat Stravy".
Sprawdzone po fakcie: `zalozenia` (CdA 0,38, masa 83,3, HRmax 201),
`kryterium_przerwy` (wariant B + wyjazd do Francji), `plan_objetosci`
(8 tygodni) i `liczone_od` — wszystko nienaruszone. 100 aktywności, 27
z opisem. Pierwszy commit automatu przeformatował wszystkie linie
aktywności (Python pisał ze spacjami po dwukropku, Node pisze bez) —
jednorazowo, kolejne różnice będą już małe.

**Do domknięcia:**
- [ ] **Skasować sekret `PAT_SEKRETY`** — był potrzebny wyłącznie do zapisania
      refresh tokenu i po podłączeniu jest zbędnym ryzykiem.
      `Settings → Secrets and variables → Actions → PAT_SEKRETY → kosz`.
      Można też skasować sam token fine-grained w ustawieniach konta.
- [ ] **Skasować `.github/workflows/strava-init.yml`** — jednorazowy, zużyty.
- [x] **Alarm na stronie, gdy dane starsze niż kilka dni** — zrobione
      20.08.2026. Pasek nad treścią, na każdej zakładce. Progi: 2 dni ciche
      ostrzeżenie, 4 dni czerwony alarm z linkiem do przebiegów i tagiem `[?]`
      na kafelku „Od ostatniej jazdy". **To jedyne miejsce, w którym strona
      pyta o zegar urządzenia** — cała reszta liczy się względem
      `meta.pobrano`, bo tylko tyle strona naprawdę wie.

**Listopad 2026** (czeka na dane, nie na kod):
- Grupa A — krzywa mocy (segmenty zrobione 20.08.2026)
- Grupa B — tętno, dryf, LTHR, RHR (wymaga danych z pulsometru po 22.08.2026)
- Grupa D — prognozy vs rzeczywistość

---

## 9. Ryzyko projektu — nazwać, gdy wróci

`STRONA.md` §14: **główne ryzyko to nie kod, tylko wypieranie treningu przez
budowanie strony.** Ograniczeniem Fryderyka jest motywacja, nie wydolność.
Wzorzec: buduj → szczyt → zniknij, punkt krytyczny na przełomie 3. i 4. tygodnia
bloku.

Do 31.08.2026 Fryderyk jest we Francji bez roweru i budowanie strony niczego
nie wypiera. **Od 1 września to się odwraca.** Jeśli pojawi się prośba
o kolejną zakładkę zamiast raportu z jazdy — nazwać to po imieniu.

Stan na dziś: cztery wykresy z ~15 na docelowej liście, wygląd zamknięty.
