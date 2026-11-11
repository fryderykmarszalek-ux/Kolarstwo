# surowe/ — pełne dane każdej jazdy ze Stravy

Archiwum WSZYSTKIEGO, co Strava oddaje o każdej jeździe, bez zaokrągleń i bez wyboru.
Strona tych plików nie ładuje. To zapas danych dla Kolarstwa2 i przyszłego AI,
żeby nie trzeba było nigdy więcej pytać Stravy o historię.
Decyzja Fryderyka z 11.11.2026: „każdy strumień w jak najmniejszym detalu”.

Pliki pisze automat `.github/workflows/strava-surowe.yml`
(skrypt `.github/skrypty/pobierz-surowe.js`). **Nie edytować ręcznie.**

## Pliki

| Plik | Co jest w środku |
|---|---|
| `jazdy/<id>.json` | jedna jazda: szczegóły + wszystkie strumienie |
| `indeks.json` | lista jazd: data, typ, nazwa, liczba próbek, które strumienie są |
| `zawodnik.json` | masa, FTP i strefy tak, jak ustawione na Stravie (bez imienia, miasta, zdjęć) |

Jazda = każdy typ kończący się na `Ride`: `Ride` (szosa), `VirtualRide` (Zwift),
`EBikeRide`, a w przyszłości np. `GravelRide`. Spacery i biegi są pomijane.

## Format `jazdy/<id>.json` (format 1)

```
{
 "format": 1,
 "id": "20913272956",
 "pobrano": "2026-11-11T19:40Z",
 "zrodlo": "...",
 "prywatnosc": { "promien_m": 500, "ukryte_punkty": 312 },
 "strumienie_meta": { "<typ>": { "original_size", "resolution", "series_type" } },
 "aktywnosc": { ...szczegóły jazdy, pola i nazwy DOKŁADNIE jak w Strava API... },
 "strumienie": {
  "time": [...], "distance": [...], "latlng": [...], ...   ← każdy strumień w jednej linii
 }
}
```

**`aktywnosc`** to odpowiedź `GET /activities/{id}?include_all_efforts=true`:
okrążenia (`laps`), odcinki co kilometr (`splits_metric`), **wszystkie** próby na
segmentach (`segment_efforts`, z `start_index`/`end_index` w strumieniach), RPE
(`perceived_exertion`), opis, sprzęt (`gear`), urządzenie (`device_name`),
średnie i maksima, kalorie i tak dalej. Nazwy pól są Stravy, nie nasze, więc
dokumentacja Stravy opisuje je wprost.

**`strumienie`** to wszystkie typy, które urządzenie nagrało. Mają pełną rozdzielczość
i wartości dokładnie takie, jak oddała Strava. Każdy strumień ma tyle samo próbek,
a indeks `i` to ta sama chwila we wszystkich strumieniach.

| Strumień | Jednostka | Uwagi |
|---|---|---|
| `time` | s od startu | dziura w liczbach = postój (zapis wstrzymany) |
| `distance` | m, narastająco | |
| `latlng` | [szer., dł.] | `null` = punkt ukryty strefą prywatności (niżej) |
| `altitude` | m n.p.m. | |
| `velocity_smooth` | m/s | wygładzona przez Stravę |
| `heartrate` | ud./min | od 30.08.2026 (pas piersiowy) i ze Zwifta, gdy pas był |
| `cadence` | obr./min | |
| `watts` | W | pomiar z trenażera (Zwift); szosa nie ma miernika mocy |
| `temp` | °C | czujnik w urządzeniu |
| `moving` | true/false | czy Strava uznała tę próbkę za ruch |
| `grade_smooth` | % | nachylenie wygładzone przez Stravę |

Brak strumienia w pliku = urządzenie go nie nagrało (np. tętno przed pasem).
Jazda dodana ręcznie nie ma żadnego strumienia, tylko szczegóły.

## Prywatność

Repozytorium jest **publiczne**, a ślad GPS zaczyna się i kończy pod domem. Dlatego:

- punkt `latlng` w promieniu **500 m** od miejsca chronionego staje się `null`;
  pozostałe strumienie zostają nietknięte, więc indeksy dalej się zgadzają;
- **miejsca chronione** to każde miejsce, z którego co najmniej 3 razy zaczęła się
  albo skończyła jazda (dom, dom dziadków…), plus początek i koniec każdej jazdy
  z osobna. Przejazd koło domu w środku jazdy też jest ukryty;
- współrzędne startu i końca w `aktywnosc` są usuwane, a polilinie (`map`)
  wylatują w całości;
- `private_note` (notatka widoczna na Stravie tylko dla Fryderyka) i `embed_token`
  nigdy nie trafiają do pliku;
- Zwift ma współrzędne **świata gry**, nie Ziemi, więc nie jest przycinany;
- współrzędnych miejsc chronionych **nie ma nigdzie**: ani w plikach, ani w logach
  automatu. Liczą się od nowa przy każdym przebiegu.

## Jak automat pilnuje limitów Stravy

Strava daje aplikacji 100 zapytań odczytu na kwadrans i 1000 na dobę, wspólnie
z nocnym automatem (`strava-sync.yml`). Skrypt czyta liczniki z nagłówków odpowiedzi
i blisko limitu kwadransa czeka do następnego. Blisko limitu doby kończy pracę,
a to, co zdążył pobrać, i tak trafia do repo. Następny przebieg dokańcza tylko to,
czego brakuje.

Codziennie o 21:17 UTC automat dociąga nowe jazdy i odświeża szczegóły jazd
z ostatnich 14 dni (RPE i opis dopisuje się zwykle po jeździe). Strumienie się nie
zmieniają, więc nie są pobierane ponownie. Przycisk „Run workflow” z zaznaczonym
`pelne` pobiera wszystko od nowa.
