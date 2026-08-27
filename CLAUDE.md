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

**Cron: dwa odpalenia i minuta 37 — poprawka z 27.08.2026, nie cofać.**
Przebieg z 26.08 w ogóle się nie odbył. Zadania z crona GitHub gubi przy
obciążeniu, a najgorsza jest pełna godzina, bo wtedy startuje pół świata.
Stąd `37 20 * * *` zamiast `0 20 * * *` plus drugie odpalenie `37 5 * * *`,
które łapie wieczorne, jeśli przepadło. Kosztuje kilka zapytań dziennie —
skrypt i tak dociąga wyłącznie to, czego nie ma.

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
