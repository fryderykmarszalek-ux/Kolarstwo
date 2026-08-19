# STRONA.md

Dokument kontekstowy dla Claude Code. Projekt: strona do śledzenia postępów treningowych Fryderyka Marszałka.

Scalenie i aktualizacja dwóch wcześniejszych dokumentów: „Projekt strona — briefing" (19.08.2026) i „Etap 0 — schemat danych" (19.08.2026). Zastępuje oba. Stan na 19.08.2026, 19:30.

Dokument siostrzany: `TRENING.md` — fizjologia, model fizyczny, historia treningowa, prognozy. Ten plik nie powiela tamtego. Jeśli pytanie dotyczy tego, **czy Fryderyk jest szybszy**, odpowiedź jest w `TRENING.md`. Ten plik odpowiada na pytanie, **jak zbudować stronę**.

---

## 1. Co to za projekt

Strona internetowa jako trwała warstwa nad Stravą. Nie zastępuje Stravy — pokazuje to, czego Strava nie pokazuje: przebieg w czasie, przerwy, benchmarki segmentów, prognozy vs rzeczywistość.

Odbiorca: jedna osoba. Zero użytkowników poza autorem. Nie projektować pod ruch, rejestrację, wielu użytkowników ani responsywność na dziesięć breakpointów. Priorytet: żeby działało za dwa lata bez konserwacji.

### Stan techniczny

| Rzecz | Stan |
|---|---|
| Repo | `fryderykmarszalek-ux/Kolarstwo`, publiczne |
| Branch | `main` |
| GitHub Pages | włączone, `main` / `(root)`, deployment aktywny |
| Adres | `https://fryderykmarszalek-ux.github.io/Kolarstwo/` — uwaga na wielkie `K` |
| Pliki w repo | `README.md`, `.mcp.json`, dokumentacja |
| `index.html` | **skasowany świadomie** (commit `c988fb8`, 19.08) |

Wcześniej istniało działające MVP — jeden plik, pasek ciągłości, wykresy godzin i przerw, tabela, eksport. Fryderyk usunął je celowo, żeby stronę zbudować od zera w Claude Code. **Nie odtwarzać go z historii gita bez wyraźnej prośby.** Plik jest w historii repo, gdyby był potrzebny jako punkt odniesienia.

Pages zostają włączone mimo braku `index.html`. Adres zwraca teraz 404. Po wrzuceniu `index.html` strona ożyje sama, bez rekonfiguracji.

### Dostęp do Stravy

`.mcp.json` w katalogu głównym repo:

```json
{
  "mcpServers": {
    "strava": { "type": "http", "url": "https://mcp.strava.com/mcp" }
  }
}
```

Serwer wymaga logowania OAuth. Przy pierwszym uruchomieniu status będzie `Needs authentication` — przeprowadzić Fryderyka przez `/mcp` → wybór serwera → `Authenticate`. On nie wie, co to znaczy; wyjaśnić od zera.

Athlete ID: `143761800`.

---

## 2. Jak pracować z Fryderykiem

*Sekcja powielona w `TRENING.md` celowo. Musi zadziałać niezależnie od tego, który plik zostanie przeczytany.*

**Nie umie programować.** Ani jednej linijki. Każde pojęcie techniczne tłumaczyć od zera, bez założeń. „Commit", „branch", „deploy", „framework" — wszystko wymaga wyjaśnienia przy pierwszym użyciu. Nie zakładać, że skoro raz zrozumiał, to pamięta.

**Ma 16 lat i umysł matematyczny.** Matematyka rozszerzona. Fizyka, wzory i wyprowadzenia są dla niego łatwiejsze niż terminologia programistyczna. Pokazywać pełne wyprowadzenie: wzór → podstawienie → wynik pośredni → wniosek. Nigdy sam wniosek.

**Chce krytyki.** Powiedział to wprost i potwierdził w praktyce: krytyka działa na niego najlepiej. Nie łagodzić, nie owijać, nie chwalić bez powodu. Zachęcające ramowanie odbiera jako brak szacunku.

**Sprawdzać dane przed postawieniem zarzutu.** Kilkakrotnie miał rację, a wstępna teza Claude'a była błędna, i potrafił podać kontrargument z konkretnym przykładem. Lista dziesięciu udokumentowanych błędów jest w `TRENING.md`, sekcja 14. Wzorzec tych błędów: przedwczesne wnioski z niepełnych danych oraz regresja do porzuconych już założeń. Wycofywać się pod dowodem, nie pod naciskiem.

**Polski, kolokwialny.** Cała komunikacja po polsku.

**Prowadzić krok po kroku.** Nie wysypywać gotowych rozwiązań na stół. Woli zrozumieć niż dostać. Jedno pytanie na raz, nie pięć.

**Pracuje na iPadzie do końca sierpnia**, potem także na Macu. Do 31.08 przebywa we Francji bez roweru. Wszystkie operacje na GitHubie robi w Safari, ręcznie, przez interfejs webowy.

---

## 3. Zasada nadrzędna: jeden master

**Strava jest jedynym źródłem prawdy.** Strona czyta i liczy. Nie przechowuje niczego, czego nie da się odtworzyć.

Nie istnieje pole, które żyje wyłącznie na stronie. Konsekwencja: jeśli strona padnie, znudzi się albo GitHub zniknie, nie ginie ani jedna dana.

Jedyny wyjątek — rekordy, o których Strava nie ma pojęcia:

| Typ | Przykład |
|---|---|
| Test | dryf tętna, test progowy/LTHR, test mowy/VT1, RHR |
| Kotwica fizjologiczna | HRmax 201 [Z], VT1 140 [Z], FTP ~180 W [E] |
| Założenie modelu | CdA 0,38 · masa 83,3 kg · Crr 0,005 · ρ 1,225 |
| Prognoza | XII 2026, XII 2027 |

Test to osobny typ rekordu z **opcjonalnym** linkiem do jazdy. Test dryfu z 14.08 był jazdą i się podepnie. Test RHR (siedem poranków w łóżku) jazdą nie będzie. Jeden typ musi obsłużyć oba.

---

## 4. Wariant B — co się zapisuje, a co liczy

| Rodzaj | Odtwarzalna? | Decyzja |
|---|---|---|
| `[Z]` pomiar (czas, dystans, przewyższenie, tętno) | — | **zapisujemy** |
| `[E]` estymata z fizyki (np. 184,7 W) | tak, wzór znany | **nie zapisujemy**, liczymy przy wyświetlaniu |
| `[S]` estymata Stravy (np. 124,872 W) | nie, czarna skrzynka | **zapisujemy jak przyszło** |
| wartości pochodne (W/kg, VAM, koszt kardiologiczny) | tak | **nie zapisujemy** |

Paradoks wart zapamiętania: estymata Stravy jest z naszej perspektywy daną surową, bo jest nieodwracalna. O ich modelu wiemy tylko tyle, że odwrócenie jednego punktu daje CdA ≈ 0,257 — czyli pozycję czasówkową. Zaniża moc przy jeździe na hoodach, zawyża przy draftingu.

**Po co ten wariant.** Strona pokaże „08.06: 184,7 W [E]". Ta liczba nie jest daną — jest wynikiem równania, w którym siedzi CdA = 0,38. Test na trenażerze w XI 2026 może pokazać CdA = 0,34, czyli prawdziwą wartość 166 W, o 10% niżej. Przy wariancie B zmienia się jedną liczbę w jednym miejscu i cały wykres — dwa lata wstecz — przelicza się sam.

**Wymóg architektoniczny wynikający z powyższego:** założenia modelu przechowywane osobno od wyników, w jednym miejscu, z historią rewizji. Nigdy nie wpisywać CdA ani masy w kod wykresu.

---

## 5. Tagi wiarygodności

`[Z]` zmierzone · `[E]` estymata z fizyki · `[S]` estymata Stravy · `[?]` niepewne

**Tag należy do wartości, nie do kolumny.** Ta sama jazda może mieć moc `[S]` i `[E]` obok siebie. Tętno z 13.08 jest `[Z, z ekranu]`, tętno z 25.08 będzie `[Z, z pliku]`. Każde takie pole dostaje bliźniacze pole ze źródłem.

Przy `[E]` pokazywać założenie w nawiasie: `184,7 W [E, CdA 0,38]`. Po rewizji ta sama jazda pokaże `166 W [E, CdA 0,34]` i od razu widać dlaczego.

Bez tagów strona zamieni FTP 180 W w twardy fakt, a to jest estymata z przedziałem 170–200 W przy nieznanym CdA. Tag musi być polem w schemacie danych, nie komentarzem w opisie.

### Aktualne założenia modelu

```
masa systemu    83,3 kg   [E, 19.08.2026]
masa zawodnika  70    kg  [Z]  — używana WYŁĄCZNIE do W/kg
CdA             0,38  m²  [?]  — największe źródło niepewności
Crr             0,005      [E]
ρ               1,225 kg/m³
```

Masa systemu 83,3 kg to suma: rower zważony 11,5 kg `[Z]` + licznik, radar i uchwyty 0,35 kg `[?]` + pełny bidon 0,78 kg `[?]` + zawodnik w stroju, kasku i butach 70,7 kg `[E]`.

Rozróżnienie, które starsze dokumenty gubiły: **masa systemu (83,3) idzie do wzoru na moc, masa zawodnika (70) do W/kg.** Nie mieszać.

Poprzednia wartość 81,5 kg jest nieaktualna. Wszystkie estymaty w `TRENING.md` są już przeliczone na 83,3.

---

## 6. Format opisu jazdy na Stravie

Fryderyk nie wpisuje niczego na stronie. Dane ręczne trafiają do pola „opis jazdy" na Stravie, zaraz po jeździe.

```
Ok/trio/w?1/hr160-195
```

Separator `/`. Kolejność kluczy dowolna.

| Klucz | Znaczenie | Gdy brak |
|---|---|---|
| `Ok` | opis sprawdzony i świadomie wypełniony `[Z]` | pusty opis = zapomniane `[?]` |
| `duo` / `trio` / `tata` + imiona | jazda grupowa, draft — nie porównywać z solo | solo |
| `w` + kierunek + siła 1–3 | wiatr. 1 = ledwo czuć, 3 = walka. `w?1` = wiało, kierunku nie znam | bezwietrznie |
| `hr` śr-maks | tętno z ekranu licznika, zawsze średnia z **czasu w ruchu** | brak danych |
| `gravel` | zmienia Crr w modelu fizycznym | asfalt |

**Zasada `Ok` jest nieoczywista i kluczowa.** Bez niej pusty opis znaczy jednocześnie „bezwietrznie, solo" i „zapomniałem opisać". To dwa różne stany i muszą być rozróżnialne, inaczej za rok żadnego wykresu z wiatrem nie da się zrobić uczciwie.

### Znana niezgodność — obsłużyć

Jazda z 13.08.2026 (`19728218329`) ma w opisie:

```
Ok/trio/?1/hr160-195
```

Brakuje `w` przed `?1`. Odczyt „na oko" działa, ale nie wynika z reguły. Do rozstrzygnięcia z Fryderykiem: albo poprawia opis na Stravie (dziesięć sekund, jego decyzja), albo parser dostaje regułę awaryjną. **Preferowane: poprawka opisu, reguła zostaje sztywna.** Luźny parser kiedyś zgadnie źle i nikt się nie dowie.

### Reguła tętna

Średnia HR **zawsze** z czasu w ruchu, nigdy z całkowitego. Dowód: 160 bpm z ruchu (87,9 min) daje 79,6% HRmax, zgodne z RPE 6. To samo 160 policzone z 109,5 min czasu całkowitego dało błędne 169 bpm i wywróciło całą sekcję starego dokumentu referencyjnego.

### RPE

Strava ma własne pole `perceived_exertion` (zweryfikowane: 15.08 = 6). **Nie wpisywać RPE do opisu.** Bez miernika mocy RPE jest najlepszą dostępną metryką.

---

## 7. Zasady porównań — bez nich wykresy kłamią

**Draft.** Nie mieszać jazd grupowych z solo w porównaniach formy. Pole „solo / duo / trio / z tatą" obowiązkowe.

| Teren | Udział oporu powietrza | Zysk z draftu |
|---|---|---|
| płasko, 40 km/h | 88% | ~30% |
| podjazd 3% | 55% | ~17% |
| podjazd 6% | 30% | ~9% |
| podjazd 9% | 18% | ~5% |

We trzech: na czele 1/3 czasu. We dwóch: 1/2 czasu, czyli 50% więcej czasu w wietrze.

**Wiatr.** Pole obowiązkowe. Sygnatura wiatru: segmenty w jedną stronę szybsze, w drugą wolniejsze. Zawsze sprawdzać oba kierunki. Przy trasie tam-i-z-powrotem miarodajna jest tylko średnia całości.

**Pola zmienne w czasie — pułapka wykryta 19.08.** Ta sama jazda z 13.08, dwa pobrania ze Stravy w odstępie kilkunastu minut: `pr_count` = 60, potem 59. Przyczyna nieznana `[?]`. Wniosek niezależny od przyczyny: liczba PR-ów nie jest faktem historycznym, tylko stanem na moment pobrania. Dotyczy wszystkiego, co Strava liczy względem reszty historii — PR-ów, medali, pozycji w rankingach segmentów. **Takie pola albo dostają datę pobrania obok liczby, albo nie są zapisywane wcale.**

Czasy segmentów są bezpieczne. 40 s na Bump 2 zostanie 40 s na zawsze.

**Definicja przerwy** (potrzebna do wykresu C2): dni między kolejnymi jazdami typu `Ride` i `VirtualRide`. E-bike, spacery, treki i biegi **nie** przerywają przerwy — nie są treningiem kolarskim. Treki wrzucane na Stravę dla streaka podczas wyjazdów są całkowicie nieistotne dla analizy.

---

## 8. Linia podziału: 19.08.2026

Przed tą datą jazdy mają tylko to, co daje Strava. Po niej — pełny schemat z wiatrem, składem grupy i tętnem.

**Strona musi to jawnie pokazywać**, żeby za rok nie dało się porównać jazdy z opisanym wiatrem z jazdą, gdzie wiatru po prostu nie zapisano.

Starych jazd nie uzupełniamy. Powód mocniejszy niż wygoda: odtwarzanie wiatru z 16.05 po trzech miesiącach to zmyślanie. Puste pole `[?]` jest uczciwe; pole wypełnione z pamięci udaje `[Z]` i zatruwa każdą analizę, która się na nim oprze.

Jeden wyjątek, darmowy: osiem jazd ma już opisy z tamtego dnia (np. 04.07 „Czersk powrót pod wiatr"). To zapis, nie pamięć — wyciągane automatycznie.

---

## 9. Zakres danych i koszt pobrania

| Warstwa | Zakres | Koszt |
|---|---|---|
| Podsumowania jazd | cała historia od 31.07.2024 | **1 wywołanie**, 99 aktywności |
| Segmenty (pełne, ~92/jazdę) | od 28.04.2026 — pierwszy regularny blok | 36 jazd, ~213 tys. tokenów |
| Segmenty — nowe jazdy | na bieżąco, przy analizie | 1 wywołanie/jazdę |
| Segmenty przed 28.04.2026 | pomijamy | — |

Backfill segmentów nie mieści się w jednej rozmowie. Plan: 5–6 jazd na czat, przy okazji innej roboty. Nie blokuje niczego — wykresy C1 i C2 stoją na samych podsumowaniach.

**Awaria narzędzia:** `get_activity_values_in_range` zwróciło błąd dwa razy pod rząd (zakresy 2024–2026 i 2026). Masowy eksport wartości nie działa. Dane ciągnie się stronami przez `list_activities`. To jest powód, dla którego backfill segmentów jest drogi.

`list_activities` z `first: 100` i zakresem od `2024-07-01` zwraca całą historię w jednym wywołaniu — 99 aktywności, `has_next_page: false`.

---

## 10. Co ma być na wykresach

Fryderyk zatwierdził całą listę jako docelową. Przy wariancie B nowy wykres to godzina roboty, nie przebudowa bazy — więc lista może być długa.

**A — czy jestem szybszy**
- A1 Obory-Opacz (6 939,8 m, −0,1%): czas vs data, tylko solo + bezwietrznie
- A2 Pętla 20 km: czas całości, kolor = RPE
- A3 Bump 2 (305,1 m, 5,4%): czas i moc vs data
- A4 Krzywa mocy log-log, kilka wersji z różnych dat na jednym wykresie

**B — czy rośnie baza** *(wymaga tętna w plikach, czyli od 22.08.2026)*
- B1 prędkość przy 140 bpm vs data
- B2 koszt kardiologiczny (uderzeń/km) przy stałym tempie
- B3 dryf tętna z kolejnych testów
- B4 LTHR i VT1 vs data
- B5 RHR, średnia krocząca z 7 dni

**C — czy jestem regularny** ← **PIERWSZEŃSTWO**
- **C1 godziny tygodniowo**, słupki, skala do 6 h (tyle zakłada plan na koniec października), linia planu, zaznaczone tygodnie odciążeniowe
- **C2 przerwy między jazdami**, słupek na przerwę, czerwona linia na 14 dniach
- C3 najdłuższa jazda w miesiącu

**D — czy prognozy się sprawdzają**
- D1 FTP: pas 210–225 W (XII 2026) i 240–275 W (XII 2027) + punkty pomiarowe
- D2 to samo dla Obory-Opacz i pętli 20 km

**E — kontrola jakości**
- E1 RPE vs dystans, kolor = data
- E2 procent jazd z wypełnionym opisem

### Dlaczego C1 i C2 pierwsze

Działają dziś: bez tętna, bez CdA, bez backfillu segmentów. Mają dane od 31.07.2024, więc wykres nie jest pusty w dniu uruchomienia. C2 to jedyne uzgodnione kryterium sukcesu. A ograniczeniem Fryderyka jest motywacja, nie wydolność — wykres formy pokaże, że jest szybszy, wykres regularności pokaże, kiedy zaczyna znikać.

### Uwaga o B1 i B2

To jedyne pozycje na liście, które wymagają zmiany **zachowania na rowerze**, a nie struktury danych. Żeby mieć prędkość przy 140 bpm w czasie, Fryderyk musi raz w miesiącu przejechać tę samą pętlę, trzymając tętno w wąskim oknie. Nie ma takiego nawyku. Jeśli B1/B2 mają powstać, protokół trzeba wpisać do planu wrześniowego.

---

## 11. Prognozy i ich weryfikacja

Prognozy wchodzą na stronę. Warunek: **prognoza bez zdefiniowanego z góry sposobu sprawdzenia jest niefalsyfikowalna** — zawsze da się powiedzieć „nie było warunków". Każda dostaje przypisany test.

| Prognoza XII 2026 | Czym sprawdzana | Kiedy |
|---|---|---|
| FTP 210–225 W | test 20 min na trenażerze | XI 2026 |
| Obory-Opacz 12:20–12:35 | przejazd solo, bez wiatru, RPE 8 | XII 2026 |
| Pętla 20 km 37:30–38:15 | przejazd solo, maksymalny | XII 2026 |
| Z2 @ 130 bpm: 24,0–24,3 km/h | powtórka testu dryfu | XII 2026 |
| 5 s: 700–720 W | test na trenażerze | XI 2026 |
| Bump 2: 520–545 W | **brak — nie ma jak sprawdzić** | wiosna 2027 |

Bump 2 zgłoszone jawnie jako nierozstrzygalne: w grudniu Fryderyk jest na trenażerze, a jedyna hopka jest pod Konstancinem. Ta prognoza zostanie oznaczona jako **przeterminowana**, nie jako trafiona.

Pełne prognozy ze składnikami zysku i scenariuszem z zimową przerwą: `TRENING.md`, sekcja 10.

---

## 12. Ograniczenia techniczne

**Strona statyczna.** GitHub Pages nie uruchamia żadnego programu po stronie serwera. Strona nie zaciągnie Stravy sama i nigdy nie zaciągnie — nie z powodu wyboru architektury, tylko dlatego, że Strava wymaga uwierzytelnienia, a sekretu nie da się schować w publicznym repo.

Obieg danych: Strava → sesja Claude Code → wygenerowany plik z danymi → commit do repo → strona przelicza. Fryderyk robi to raz w tygodniu, ręcznie.

**Bez frameworków i systemów budowania.** Bez Reacta, Next.js, Vite, npm, kroku kompilacji. Powód: Fryderyk nie umie programować i nie naprawi zepsutego builda. Plik ma się otwierać w przeglądarce i działać. To ograniczenie jest twarde, nie jest preferencją estetyczną.

**Zero zależności zewnętrznych, jeśli się da.** Wykresy rysować od zera (inline SVG generowane w JS). Biblioteki wykresów znikają, zmieniają API i psują strony po dwóch latach. Fonty z CDN są dopuszczalne, ale z sensownym fallbackiem systemowym.

**Dane w pliku osobnym od kodu.** Aktualizacja ma być podmianą małego pliku, nie całego `index.html`. Zalecane: `dane.js` ustawiające `window.DANE`, ładowane przez `<script src>`. Format `.js`, a nie `.json`, bo `fetch` na `file://` blokuje CORS i strona nie zadziała przy lokalnym otwarciu.

**Nazwa pliku głównego:** `index.html`, małymi literami. GitHub Pages szuka dokładnie tej nazwy.

**Repo jest publiczne.** Fryderyk świadomie zaakceptował, że dane treningowe i osobowe są dostępne. Nie wracać do tematu. `<meta name="robots" content="noindex">` warto zostawić.

**Ekran docelowy:** iPad i telefon. Interakcje muszą działać na dotyk, nie tylko na hover.

---

## 13. Etapy

| Etap | Zakres | Stan |
|---|---|---|
| 0 | Schemat danych | ✅ zamknięty 19.08 |
| 1 | MVP: jazdy, tabela, jeden wykres, import/eksport | ✅ zbudowany, ❌ skasowany świadomie |
| 5 | Deploy na GitHub Pages | ✅ działa |
| 2 | Zakładka segmenty w czasie | XI 2026 |
| 3 | Krzywa mocy, fizjologia, prognoza vs rzeczywistość | XI 2026 |
| 4 | Cele, przerwy, kryterium >2 tygodni | XI 2026 |

Etapy 2–4 stoją na listopad świadomie. Powód w sekcji 14.

### Zakładka segmentów (etap 2) — ustalona forma

Nie „wszystkie segmenty, każdy ze swoim wykresem". Segment przejechany dwa razy daje kreskę między dwoma punktami, o której decyduje wiatr i draft. To nie progres, to losowość w ładnym opakowaniu.

Zamiast tego jedna tabela: nazwa, długość, nachylenie, liczba przejazdów, PB z datą, ostatni przejazd, trend, sparkline. Filtry: solo/grupa, wiatr, minimalna liczba przejazdów, długość. Klik w wiersz → pełny wykres segmentu w czasie.

**Kolumna „trend" zostaje pusta, dopóki nie ma trzech porównywalnych przejazdów.** Porównywalne = wszystkie solo albo wszystkie w grupie, wiatr ≤1 albo brak. Szacunek: 30–50 segmentów z prawdziwym trendem z kilkuset w bazie. To nie jest wada, to funkcja — tabela sama pokaże, na co patrzeć.

---

## 14. Ryzyko projektu

**Główne ryzyko to nie kod. To wypieranie treningu przez budowanie strony.**

Wrzesień i październik to osiem tygodni najlepszej pogody i jedyny moment na budowanie dystansu, którego Fryderykowi brakuje najbardziej — rekord życiowy to 64 km, typowa jazda 20–40 km. Od września ma 4–6 h tygodniowo przez szkołę.

Ograniczeniem Fryderyka jest **motywacja, nie wydolność**. Sam to zdiagnozował. Udokumentowany wzorzec: buduj → szczyt → zniknij, punkt krytyczny na przełomie trzeciego i czwartego tygodnia bloku. Siedem przerw powyżej 14 dni w historii, największa 226 dni. Szczegóły w `TRENING.md`, sekcja 9.

Budowanie strony jest przyjemniejsze niż wyjazd w deszcz. Realne ryzyko: piękny dashboard z pustymi danymi.

**Jeśli w połowie września pojawi się prośba o kolejną zakładkę zamiast raportu z jazdy — to jest ten moment i trzeba go nazwać po imieniu.**

Zastrzeżenie: do 31.08 Fryderyk jest we Francji bez roweru. Do tego czasu budowanie strony niczego nie wypiera i ta krytyka nie ma zastosowania. Wchodzi w życie 1 września.

**Drugie ryzyko, mniejsze:** zmiana narzędzia zamiast wdrożenia. Fryderyk skasował działające MVP godzinę po tym, jak zaczęło działać, żeby zbudować je od nowa w Claude Code. To sensowny powód (uczy się więcej), ale wzorzec „przebuduję to lepiej" jest tym samym mechanizmem co „dodam jeszcze jedną zakładkę". Warto mieć na oku.

---

## 15. Nierozstrzygnięte

| # | Sprawa | Blokuje |
|---|---|---|
| 1 | **Kryterium przerwy: A, B czy C?** | wykres C2 |
| 2 | Poprawka opisu 13.08: `?1` → `w?1` | parser wiatru |
| 3 | Backfill segmentów od 28.04.2026 | etap 2 |
| 4 | Czy `has_heartrate` zrobi się `true` po 22.08.2026 | wszystkie wykresy grupy B |

**Ad 1.** Fryderyk uzgodnił kryterium sukcesu na sezon 2026/27: żadna przerwa nie przekracza dwóch tygodni. Wyjazd do Francji (17–31.08, bez roweru) zrobi przerwę 17 dni, licząc od ostatniej jazdy 15.08. Kryterium pęknie w pierwszym tygodniu, w którym w ogóle jest liczone.

Warianty do wyboru:
- **A** — kryterium bez wyjątków, 17 dni to złamanie
- **B** — wyjazdy bez dostępu do roweru wyłączone z liczenia, zgłaszane z góry, maksymalnie dwa razy w roku
- **C** — kryterium liczy się od 1.09.2026, wcześniejsze przerwy to historia

Decyzja musi zapaść **przed 1 września**, nie po. Po fakcie byłaby decyzją pod wynik, a nie regułą.

**Ad 4.** Konto Garmina było kontem dziecięcym i blokowało dane zdrowotne. Odblokowanie 22.08.2026 (szesnaste urodziny). Do tego czasu `has_heartrate: false` we wszystkich aktywnościach jest **poprawne, nie jest błędem** — nie drążyć tematu. Po 22.08 sprawdzić na pierwszej nowej jeździe oraz Strava → Ustawienia → Uprawnienia do danych → Dane zdrowotne. Stare pliki nie dostaną tętna wstecz: 12, 13 i 15.08 zostaną bez HR na zawsze.

---

## 16. Poprawki wprowadzone w tym scaleniu

Względem briefu i etapu 0 z 19.08:

| Rzecz | Było | Jest |
|---|---|---|
| Masa systemu | 81,5 kg `[?]` | **83,3 kg `[E]`** |
| Rower — nazwa | Superior Road X3 | Superior X-ROAD 6.3 GF, 2024, XL, Tiagra 2×10 |
| Rower — masa | nieznane pochodzenie `[?]` | 11,5 kg `[Z]`, zważone, z pedałami, przed montażem licznika i radaru |
| Przebieg roweru na Stravie | 394 km / 468,5 km | nieistotne, wypada z dokumentacji |
| `pr_count` 13.08 | 60 | **59**, potwierdzone drugim pobraniem |
| Postoje 13.08 | 23:14 (suma z okrążeń) | **21:38** (6569 − 5271 s); rozjazd 96 s `[?]` |
| Liczba aktywności | nieokreślona | **99**, od 31.07.2024, jedno wywołanie |
| Wzorzec porzucania | jedna udokumentowana przerwa | **siedem przerw >14 dni**, największa 226 dni |
| Stan repo | „repo nie istnieje" | `Kolarstwo`, Pages działa, MVP skasowany |
| Claude Code | „nie ma tam Stravy ani pamięci projektu" | **fałsz** — obsługuje MCP i `CLAUDE.md`; błąd nr 10 |

---

## 17. Czego ten projekt NIE obejmuje

Claude Code odpowiada za **jak to zakodować**. Nie za **co pokazywać**.

Analiza jazd, fizyka, interpretacja danych ze Stravy, decyzje o tym, które metryki mają sens — zostają w projekcie na claude.ai, gdzie leżą dokumenty i historia rozmów. Fryderyk jest mostem: przynosi stamtąd decyzję, tutaj ją realizuje.

Jeśli pojawi się pytanie w rodzaju „czy ten wykres pokazuje progres" albo „ile realnie wynosi FTP" — odesłać do `TRENING.md` i do tamtego projektu, zamiast improwizować.

---

*Wygenerowano 19.08.2026. Zastępuje „Projekt strona — briefing" (19.08) i „Etap 0 — schemat danych" (19.08). Wszystkie liczby ze Stravy pobrane na żywo tego dnia.*
