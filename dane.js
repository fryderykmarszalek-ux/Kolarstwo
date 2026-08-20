// dane.js — jedyne miejsce z danymi. Kod strony ich nie zawiera.
// Źródło: Strava, athlete 143761800. Wygenerowane automatycznie — nie edytować ręcznie.
// Wariant B: zapisujemy pomiary [Z]/[S]. Wszystko wyliczalne (prędkość, moc [E], W/kg,
// VAM, koszt kardiologiczny) liczy się przy wyświetlaniu, NIE tutaj.

window.DANE = {

meta: {"pobrano":"2026-08-20T12:58","zrodlo":"Strava MCP / list_activities","athlete_id":143761800,"liczba_aktywnosci":100,"zakres":["2024-07-31","2026-08-19"],"liczone_od":"2025-08-31","liczone_od_powod":"Decyzja Fryderyka z 19.08.2026: wcześniejsze daty nieistotne. Historia zostaje w pliku w całości — po prostu nie jest liczona. Zmiana tej jednej daty przywraca wszystko.","linia_podzialu":"2026-08-19","linia_podzialu_opis":"Przed tą datą jazdy mają tylko to, co daje Strava — bez wiatru, składu grupy i tętna. Nie uzupełniać wstecz.","typy_kolarskie":["Ride","VirtualRide"],"typy_kolarskie_opis":"Tylko te przerywają przerwę. E-bike, spacery, treki i biegi — nie.","pola_pominiete":["pr_count","achievement_count","kudos_count"],"pola_pominiete_powod":"Zmienne w czasie — stan na moment pobrania, nie fakt historyczny (13.08: 60 -> 59 w kilkanaście minut). Zapisać dopiero z datą pobrania obok."},

zalozenia: {
  "_opis": "Wariant B: tu i tylko tu żyją stałe modelu. Nigdy nie wpisywać ich w kod wykresu. Zmiana jednej liczby przelicza całą historię.",
  "masa_systemu_kg": {
    "v": 83.3,
    "tag": "E",
    "od": "2026-08-19",
    "uzycie": "wzór na moc"
  },
  "masa_zawodnika_kg": {
    "v": 70,
    "tag": "Z",
    "od": "2026-08-19",
    "uzycie": "WYŁĄCZNIE W/kg"
  },
  "CdA_m2": {
    "v": 0.38,
    "tag": "?",
    "od": "2026-08-19",
    "uwaga": "największe źródło niepewności; test na trenażerze XI 2026"
  },
  "Crr_asfalt": {
    "v": 0.005,
    "tag": "E",
    "od": "2026-08-19"
  },
  "Crr_gravel": {
    "v": null,
    "tag": "?",
    "od": null,
    "uwaga": "nieustalone — nie zgadywać"
  },
  "rho_kg_m3": {
    "v": 1.225,
    "tag": "E",
    "od": "2026-08-19"
  },
  "g": {
    "v": 9.81,
    "tag": "Z",
    "od": "2026-08-19"
  },
  "HRmax_bpm": {
    "v": 201,
    "tag": "Z",
    "od": "2026-08-19",
    "uwaga": "pas piersiowy; NIE nadpisywać wzorem 220-wiek"
  },
  "VT1_bpm": {
    "v": 140,
    "tag": "Z",
    "od": "2026-08-15",
    "uwaga": "test mowy"
  },
  "FTP_W": {
    "v": 180,
    "tag": "E",
    "od": "2026-08-19",
    "przedzial": [
      170,
      200
    ]
  },
  "CP_W": {
    "v": 167.1,
    "tag": "E",
    "od": "2026-08-19"
  },
  "W_prim_J": {
    "v": 13916,
    "tag": "E",
    "od": "2026-08-19"
  },
  "rewizje": []
},

kryterium_przerwy: {
  "_opis": "NIEROZSTRZYGNIĘTE. Decyzja musi zapaść przed 2026-09-01 — po fakcie byłaby decyzją pod wynik.",
  "wybor": "B",
  "warianty": {
    "A": "bez wyjątków — 17 dni to złamanie",
    "B": "wyjazdy bez dostępu do roweru wyłączone, zgłaszane z góry, maks. 2 razy w roku",
    "C": "kryterium liczy się od 2026-09-01, wcześniejsze przerwy to historia"
  },
  "prog_dni": 14,
  "wybrany_dnia": "2026-08-19",
  "zasada_B": "Wyjazd bez dostępu do roweru nie liczy się jako przerwa, pod warunkiem że został zgłoszony ZANIM przerwa przekroczyła 14 dni — czyli zanim reguła mogła zostać złamana. Maksymalnie dwa wyjazdy w roku kalendarzowym. Wszystko inne — pogoda, brak chęci, szkoła — liczy się normalnie.",
  "wyjazdy_bez_roweru": [
    {
      "od": "2026-08-17",
      "do": "2026-08-31",
      "opis": "Francja",
      "zgloszony": "2026-08-19"
    }
  ]
},

plan_objetosci: [
  {"od":"2026-09-01","do":"2026-09-07","godziny":3,"odciazenie":false},
  {"od":"2026-09-08","do":"2026-09-14","godziny":4,"odciazenie":false},
  {"od":"2026-09-15","do":"2026-09-21","godziny":4.5,"odciazenie":false},
  {"od":"2026-09-22","do":"2026-09-28","godziny":3.5,"odciazenie":true},
  {"od":"2026-09-29","do":"2026-10-05","godziny":5,"odciazenie":false},
  {"od":"2026-10-06","do":"2026-10-12","godziny":5.5,"odciazenie":false},
  {"od":"2026-10-13","do":"2026-10-19","godziny":4,"odciazenie":true},
  {"od":"2026-10-20","do":"2026-10-26","godziny":6,"odciazenie":false},
],

// czas_ruchu_s — czas w ruchu. Zgodnie z regułą: wszystkie średnie zawsze z czasu w ruchu.
aktywnosci: [
  {"id":"12029300701","data":"2024-07-31T19:45:48","typ":"Ride","dystans_m":1629.5,"czas_ruchu_s":267,"czas_calkowity_s":267,"przewyzszenie_m":0,"nazwa":"Test"},
  {"id":"12044109707","data":"2024-08-02T13:07:59","typ":"EBikeRide","dystans_m":42811.3,"czas_ruchu_s":6729,"czas_calkowity_s":7922,"przewyzszenie_m":276.6,"nazwa":"Charzykowy","opis":"Henryk Marszalek"},
  {"id":"12052538322","data":"2024-08-03T14:27:17","typ":"Ride","dystans_m":21998.2,"czas_ruchu_s":5037,"czas_calkowity_s":6808,"przewyzszenie_m":122.3,"nazwa":"Zwykły vs elektryk","opis":"Henryk Marszalek"},
  {"id":"12060008503","data":"2024-08-04T13:13:26","typ":"Ride","dystans_m":19373,"czas_ruchu_s":3667,"czas_calkowity_s":4706,"przewyzszenie_m":96.9,"nazwa":"Trening małe swory"},
  {"id":"12079172370","data":"2024-08-06T08:13:12","typ":"Ride","dystans_m":66586.8,"czas_ruchu_s":15087,"czas_calkowity_s":39999,"przewyzszenie_m":386.9,"nazwa":"Chojnice","opis":"Filip i Jasiu"},
  {"id":"12086716023","data":"2024-08-07T13:47:29","typ":"EBikeRide","dystans_m":40738.5,"czas_ruchu_s":6367,"czas_calkowity_s":9195,"przewyzszenie_m":203.9,"nazwa":"Charzykowy i mecz pl z USA","opis":"Henryk Marszalek"},
  {"id":"12102213373","data":"2024-08-09T12:19:00","typ":"Ride","dystans_m":17322,"czas_ruchu_s":3070,"czas_calkowity_s":3242,"przewyzszenie_m":102.2,"nazwa":"Brusy"},
  {"id":"12109302036","data":"2024-08-10T10:22:16","typ":"Ride","dystans_m":17492.6,"czas_ruchu_s":3297,"czas_calkowity_s":4181,"przewyzszenie_m":104.9,"nazwa":"Brusy-mecikal-brusy","opis":"Do mecikalu fajna droga z powrotem niezbyt"},
  {"id":"12111692451","data":"2024-08-10T15:03:16","typ":"Ride","dystans_m":17014.8,"czas_ruchu_s":3325,"czas_calkowity_s":3766,"przewyzszenie_m":93.8,"nazwa":"Brusy-Swory","opis":"Pod mocny wiatr"},
  {"id":"12118877473","data":"2024-08-11T12:54:48","typ":"Ride","dystans_m":6103.6,"czas_ruchu_s":1110,"czas_calkowity_s":1116,"przewyzszenie_m":39.1,"nazwa":"5 mil"},
  {"id":"12126374996","data":"2024-08-12T11:15:16","typ":"Walk","dystans_m":2351.2,"czas_ruchu_s":1671,"czas_calkowity_s":1760,"przewyzszenie_m":7.2,"nazwa":"Lunch Walk"},
  {"id":"12155844774","data":"2024-08-15T18:04:21","typ":"Ride","dystans_m":17187.2,"czas_ruchu_s":2937,"czas_calkowity_s":3180,"przewyzszenie_m":76.6,"nazwa":"Małe Swory v2"},
  {"id":"12162790795","data":"2024-08-16T12:26:35","typ":"Ride","dystans_m":40033,"czas_ruchu_s":7409,"czas_calkowity_s":12405,"przewyzszenie_m":199.7,"nazwa":"Charzykowy","opis":"Mama i ciocia"},
  {"id":"12171567765","data":"2024-08-17T13:23:22","typ":"Ride","dystans_m":43219.4,"czas_ruchu_s":8364,"czas_calkowity_s":12311,"przewyzszenie_m":236.9,"nazwa":"Mama i tata","opis":"Maciek Mar"},
  {"id":"12178538872","data":"2024-08-18T12:45:26","typ":"Ride","dystans_m":17329.7,"czas_ruchu_s":2960,"czas_calkowity_s":3237,"przewyzszenie_m":78.6,"nazwa":"Małe Swory v3","opis":"Maciek Mar"},
  {"id":"12205527224","data":"2024-08-21T16:21:16","typ":"Walk","dystans_m":2799.5,"czas_ruchu_s":2021,"czas_calkowity_s":2114,"przewyzszenie_m":18.9,"nazwa":"Afternoon Walk"},
  {"id":"12221481226","data":"2024-08-23T14:10:33","typ":"Ride","dystans_m":5407.9,"czas_ruchu_s":981,"czas_calkowity_s":1042,"przewyzszenie_m":29.8,"nazwa":"Bez powietrza w oponach","opis":"Zapomniałem sprawdzić 🫤"},
  {"id":"12223083988","data":"2024-08-23T17:11:08","typ":"EBikeRide","dystans_m":24830.3,"czas_ruchu_s":3751,"czas_calkowity_s":4270,"przewyzszenie_m":180.3,"nazwa":"Nowa trasa- fajna na elektryk, ciężka ale może ciekawa na zwykły"},
  {"id":"12229721957","data":"2024-08-24T13:14:34","typ":"Ride","dystans_m":24589.8,"czas_ruchu_s":4827,"czas_calkowity_s":5465,"przewyzszenie_m":178.8,"nazwa":"Ta sama trasa co wczoraj tylko na zwykłym","opis":"Różnica duża -5.5 km/h"},
  {"id":"12246767145","data":"2024-08-26T13:06:57","typ":"Ride","dystans_m":40054.9,"czas_ruchu_s":7021,"czas_calkowity_s":9531,"przewyzszenie_m":210.4,"nazwa":"Charzykowy 1 raz samemu","opis":"Droga powrotna bez zatrzymania się 💪🏻"},
  {"id":"12256494897","data":"2024-08-27T17:01:29","typ":"Ride","dystans_m":17714.4,"czas_ruchu_s":2931,"czas_calkowity_s":4201,"przewyzszenie_m":78.4,"nazwa":"Małe Swory v4"},
  {"id":"12359559632","data":"2024-09-08T15:39:54","typ":"Ride","dystans_m":20004.9,"czas_ruchu_s":3832,"czas_calkowity_s":5682,"przewyzszenie_m":29.7,"nazwa":"Nowy rower","opis":"Maciek Mar"},
  {"id":"14250366507","data":"2025-04-22T11:01:56","typ":"Ride","dystans_m":20256.6,"czas_ruchu_s":3266,"czas_calkowity_s":5810,"przewyzszenie_m":28.4,"nazwa":"Lunch Ride"},
  {"id":"14299826298","data":"2025-04-27T11:24:15","typ":"Ride","dystans_m":12848.8,"czas_ruchu_s":2453,"czas_calkowity_s":3249,"przewyzszenie_m":28.6,"nazwa":"Nowinki"},
  {"id":"14344880484","data":"2025-05-01T15:01:13","typ":"EBikeRide","dystans_m":23973.1,"czas_ruchu_s":4028,"czas_calkowity_s":6148,"przewyzszenie_m":133.9,"nazwa":"Afternoon E-Bike Ride"},
  {"id":"14365604350","data":"2025-05-03T14:56:06","typ":"EBikeRide","dystans_m":32320.1,"czas_ruchu_s":4337,"czas_calkowity_s":6096,"przewyzszenie_m":161.2,"nazwa":"E-funka"},
  {"id":"15121639521","data":"2025-07-15T14:16:07","typ":"EBikeRide","dystans_m":18598.7,"czas_ruchu_s":2553,"czas_calkowity_s":2927,"przewyzszenie_m":95.5,"nazwa":"Małe Swory v5"},
  {"id":"15211655006","data":"2025-07-23T17:55:05","typ":"Ride","dystans_m":12118.5,"czas_ruchu_s":1936,"czas_calkowity_s":2382,"przewyzszenie_m":46.4,"nazwa":"Młyn"},
  {"id":"15220640080","data":"2025-07-24T12:03:43","typ":"Ride","dystans_m":38631.3,"czas_ruchu_s":6939,"czas_calkowity_s":10117,"przewyzszenie_m":182.9,"nazwa":"Charzykowy","opis":"Henryk Marszalek"},
  {"id":"15232829749","data":"2025-07-25T16:38:57","typ":"Ride","dystans_m":18804.1,"czas_ruchu_s":3069,"czas_calkowity_s":3836,"przewyzszenie_m":83,"nazwa":"Małe Swory v7","opis":"Henryk Marszalek"},
  {"id":"15650458577","data":"2025-08-31T16:44:08","typ":"Ride","dystans_m":20315.5,"czas_ruchu_s":2846,"czas_calkowity_s":2846,"przewyzszenie_m":29.3,"nazwa":"Gassy"},
  {"id":"15659929857","data":"2025-09-01T16:37:35","typ":"Ride","dystans_m":15318.3,"czas_ruchu_s":2150,"czas_calkowity_s":2157,"przewyzszenie_m":14.4,"nazwa":"CH Papiernia"},
  {"id":"15718034220","data":"2025-09-06T15:39:58","typ":"Ride","dystans_m":25136.9,"czas_ruchu_s":3857,"czas_calkowity_s":3881,"przewyzszenie_m":29.5,"nazwa":"CH"},
  {"id":"15820597167","data":"2025-09-15T16:54:20","typ":"Ride","dystans_m":12087,"czas_ruchu_s":1811,"czas_calkowity_s":3688,"przewyzszenie_m":35.2,"nazwa":"Urban ride"},
  {"id":"15875808667","data":"2025-09-20T13:52:25","typ":"Ride","dystans_m":19752.2,"czas_ruchu_s":2917,"czas_calkowity_s":2926,"przewyzszenie_m":27.6,"nazwa":"Gassy","opis":"Wiatr bok"},
  {"id":"15954703695","data":"2025-09-27T16:27:07","typ":"Ride","dystans_m":21303.2,"czas_ruchu_s":3212,"czas_calkowity_s":3212,"przewyzszenie_m":31,"nazwa":"Gassy","opis":"Z wiatr z przodu"},
  {"id":"16130454908","data":"2025-10-13T20:26:17","typ":"VirtualRide","dystans_m":21572,"czas_ruchu_s":2905,"czas_calkowity_s":2905,"przewyzszenie_m":33,"nazwa":"Zwift - Foundation on Tempus Fugit in Watopia"},
  {"id":"16152610580","data":"2025-10-15T20:27:19","typ":"VirtualRide","dystans_m":7507.6,"czas_ruchu_s":3257,"czas_calkowity_s":3257,"przewyzszenie_m":344,"nazwa":"Zwift - Strength on Achterbahn in Innsbruck"},
  {"id":"16182099651","data":"2025-10-18T16:57:16","typ":"VirtualRide","dystans_m":21828,"czas_ruchu_s":2905,"czas_calkowity_s":2905,"przewyzszenie_m":32,"nazwa":"Zwift - Foundation on Tempus Fugit in Watopia"},
  {"id":"16183714130","data":"2025-10-18T20:02:16","typ":"VirtualRide","dystans_m":19141.9,"czas_ruchu_s":2192,"czas_calkowity_s":2370,"przewyzszenie_m":69,"nazwa":"Zwift - Race: HerD Beginner Races (C) on Going Coastal in Watopia"},
  {"id":"16194964157","data":"2025-10-19T20:08:04","typ":"VirtualRide","dystans_m":8350,"czas_ruchu_s":4028,"czas_calkowity_s":4028,"przewyzszenie_m":523,"nazwa":"Zwift - Tempo on Ven-Top in France"},
  {"id":"16215300750","data":"2025-10-21T21:35:31","typ":"VirtualRide","dystans_m":21211.1,"czas_ruchu_s":3197,"czas_calkowity_s":3197,"przewyzszenie_m":121,"nazwa":"Zwift - Foundation on Champs-Élysées in Paris"},
  {"id":"16225978401","data":"2025-10-22T21:31:25","typ":"VirtualRide","dystans_m":24469,"czas_ruchu_s":3523,"czas_calkowity_s":3523,"przewyzszenie_m":93,"nazwa":"Zwift - Strength on Beach Island Loop in Watopia"},
  {"id":"16266432121","data":"2025-10-26T21:08:52","typ":"VirtualRide","dystans_m":24491.8,"czas_ruchu_s":3507,"czas_calkowity_s":3858,"przewyzszenie_m":134,"nazwa":"Zwift - Foundation on Sprinter's Playground in Makuri Islands"},
  {"id":"16286281071","data":"2025-10-28T21:19:08","typ":"VirtualRide","dystans_m":35899.1,"czas_ruchu_s":4935,"czas_calkowity_s":4935,"przewyzszenie_m":162,"nazwa":"Zwift - Tempo on Classique in London"},
  {"id":"16296395304","data":"2025-10-29T21:23:09","typ":"VirtualRide","dystans_m":21463.2,"czas_ruchu_s":3270,"czas_calkowity_s":3270,"przewyzszenie_m":170,"nazwa":"Zwift - Foundation on Red Zone Repeats in Makuri Islands"},
  {"id":"16306020934","data":"2025-10-30T21:23:36","typ":"VirtualRide","dystans_m":7582.5,"czas_ruchu_s":1194,"czas_calkowity_s":1194,"przewyzszenie_m":40,"nazwa":"Zwift - Active Recovery on Croissant in France"},
  {"id":"16325922529","data":"2025-11-01T22:41:17","typ":"VirtualRide","dystans_m":30580,"czas_ruchu_s":4164,"czas_calkowity_s":4164,"przewyzszenie_m":47,"nazwa":"Zwift - Strength on Tempus Fugit in Watopia"},
  {"id":"16336493568","data":"2025-11-02T21:52:10","typ":"VirtualRide","dystans_m":24225.8,"czas_ruchu_s":3268,"czas_calkowity_s":3317,"przewyzszenie_m":156,"nazwa":"Zwift - Foundation on Watts the Limit in New York"},
  {"id":"16377663365","data":"2025-11-06T20:10:33","typ":"VirtualRide","dystans_m":40978.8,"czas_ruchu_s":5186,"czas_calkowity_s":5186,"przewyzszenie_m":64,"nazwa":"Zwift - Tempo on Tempus Fugit in Watopia"},
  {"id":"16479980049","data":"2025-11-16T21:41:26","typ":"VirtualRide","dystans_m":29331.4,"czas_ruchu_s":4029,"czas_calkowity_s":4172,"przewyzszenie_m":107,"nazwa":"Zwift - Foundation on Libby Hill After Party in Richmond"},
  {"id":"16547212377","data":"2025-11-23T20:15:00","typ":"VirtualRide","dystans_m":29827.6,"czas_ruchu_s":3781,"czas_calkowity_s":3839,"przewyzszenie_m":46,"nazwa":"Zwift - Intermittent on Tempus Fugit in Watopia"},
  {"id":"16566037541","data":"2025-11-25T20:38:46","typ":"VirtualRide","dystans_m":30963.9,"czas_ruchu_s":4286,"czas_calkowity_s":4286,"przewyzszenie_m":138,"nazwa":"Zwift - Foundation on R.G.V. in France"},
  {"id":"17707959140","data":"2026-03-13T12:11:32","typ":"Ride","dystans_m":29121.3,"czas_ruchu_s":4973,"czas_calkowity_s":7163,"przewyzszenie_m":61.2,"nazwa":"OB-GK","opis":"Antek Oczek"},
  {"id":"17708859621","data":"2026-03-13T14:52:37","typ":"Ride","dystans_m":19094.3,"czas_ruchu_s":4367,"czas_calkowity_s":4842,"przewyzszenie_m":32.9,"nazwa":"GK-dom"},
  {"id":"18009740269","data":"2026-04-07T10:19:22","typ":"EBikeRide","dystans_m":9305.2,"czas_ruchu_s":1648,"czas_calkowity_s":1916,"przewyzszenie_m":46.6,"nazwa":"Basen Sopot"},
  {"id":"18011839913","data":"2026-04-07T13:17:23","typ":"EBikeRide","dystans_m":9222.3,"czas_ruchu_s":1727,"czas_calkowity_s":2151,"przewyzszenie_m":69.5,"nazwa":"Z basenu JK7"},
  {"id":"18296163995","data":"2026-04-28T19:35:06","typ":"Ride","dystans_m":20194.8,"czas_ruchu_s":3199,"czas_calkowity_s":3199,"przewyzszenie_m":28,"nazwa":"Evening Ride"},
  {"id":"18328405840","data":"2026-05-01T09:12:44","typ":"Ride","dystans_m":20073.8,"czas_ruchu_s":2673,"czas_calkowity_s":2673,"przewyzszenie_m":27.9,"nazwa":"Morning pace ride"},
  {"id":"18346607726","data":"2026-05-02T14:52:39","typ":"Ride","dystans_m":21189.5,"czas_ruchu_s":3088,"czas_calkowity_s":3088,"przewyzszenie_m":32.7,"nazwa":"Rec ride wit dad","opis":"Maciek Mar"},
  {"id":"18360199343","data":"2026-05-03T13:47:58","typ":"Ride","dystans_m":35878.7,"czas_ruchu_s":5378,"czas_calkowity_s":6999,"przewyzszenie_m":89.3,"nazwa":"Góra kawiarnia","opis":"Maciek Mar"},
  {"id":"18438077208","data":"2026-05-09T13:42:14","typ":"Ride","dystans_m":20099.4,"czas_ruchu_s":2823,"czas_calkowity_s":2823,"przewyzszenie_m":28.1,"nazwa":"Gassy obory afternoon ride"},
  {"id":"18454701002","data":"2026-05-10T17:09:54","typ":"Ride","dystans_m":20419.2,"czas_ruchu_s":2854,"czas_calkowity_s":3077,"przewyzszenie_m":38.3,"nazwa":"Pętla z tatą"},
  {"id":"18492969096","data":"2026-05-13T17:57:42","typ":"Ride","dystans_m":20038.9,"czas_ruchu_s":2788,"czas_calkowity_s":2788,"przewyzszenie_m":27.8,"nazwa":"Chill Gassy rev z wjazdem"},
  {"id":"18530281768","data":"2026-05-16T15:35:29","typ":"Ride","dystans_m":20121.6,"czas_ruchu_s":2630,"czas_calkowity_s":2630,"przewyzszenie_m":27.8,"nazwa":"Pace po deszczu"},
  {"id":"18554597453","data":"2026-05-18T13:35:21","typ":"Ride","dystans_m":36687.1,"czas_ruchu_s":4863,"czas_calkowity_s":5849,"przewyzszenie_m":75.1,"nazwa":"SzosaXgravel GK obustr."},
  {"id":"18619303262","data":"2026-05-23T10:30:43","typ":"Ride","dystans_m":18588.5,"czas_ruchu_s":2356,"czas_calkowity_s":7262,"przewyzszenie_m":47.8,"nazwa":"Wydłużona pętla 45k","opis":"20/45 się nie nagrało"},
  {"id":"18635140776","data":"2026-05-24T12:58:40","typ":"Ride","dystans_m":47082.2,"czas_ruchu_s":6437,"czas_calkowity_s":8037,"przewyzszenie_m":72.8,"nazwa":"GK z tatą + gassy pace","opis":"Maciek Mar"},
  {"id":"18692876636","data":"2026-05-28T19:51:19","typ":"Ride","dystans_m":20043.2,"czas_ruchu_s":2846,"czas_calkowity_s":2878,"przewyzszenie_m":28.4,"nazwa":"Rec 20k afternoon ride"},
  {"id":"18718998937","data":"2026-05-30T19:26:04","typ":"Ride","dystans_m":13242.5,"czas_ruchu_s":1721,"czas_calkowity_s":1721,"przewyzszenie_m":30.9,"nazwa":"OB-SP"},
  {"id":"18729555478","data":"2026-05-31T14:40:25","typ":"Ride","dystans_m":27025.8,"czas_ruchu_s":3602,"czas_calkowity_s":3846,"przewyzszenie_m":50.5,"nazwa":"OB-Gassy","opis":"Maciek Mar"},
  {"id":"18784052439","data":"2026-06-04T14:38:08","typ":"EBikeRide","dystans_m":19008.5,"czas_ruchu_s":2641,"czas_calkowity_s":4216,"przewyzszenie_m":101,"nazwa":"Afternoon E-Bike Ride","opis":"Maciek Mar"},
  {"id":"18808215724","data":"2026-06-06T12:33:57","typ":"Walk","dystans_m":3150.9,"czas_ruchu_s":2215,"czas_calkowity_s":2215,"przewyzszenie_m":40.7,"nazwa":"Lunch Walk"},
  {"id":"18841404334","data":"2026-06-08T20:51:16","typ":"Ride","dystans_m":20045.6,"czas_ruchu_s":2397,"czas_calkowity_s":2397,"przewyzszenie_m":28.4,"nazwa":"20k PB"},
  {"id":"18945539070","data":"2026-06-16T17:39:00","typ":"Ride","dystans_m":20432.2,"czas_ruchu_s":2790,"czas_calkowity_s":2826,"przewyzszenie_m":28.3,"nazwa":"Gassy przez CH"},
  {"id":"18971344203","data":"2026-06-18T12:59:31","typ":"Ride","dystans_m":37479.9,"czas_ruchu_s":5292,"czas_calkowity_s":6994,"przewyzszenie_m":75.9,"nazwa":"Lunch GK ride"},
  {"id":"18996948846","data":"2026-06-20T14:22:44","typ":"Walk","dystans_m":2945.6,"czas_ruchu_s":2082,"czas_calkowity_s":3218,"przewyzszenie_m":7.1,"nazwa":"Afternoon Walk"},
  {"id":"19000739541","data":"2026-06-20T18:31:41","typ":"Ride","dystans_m":46222.1,"czas_ruchu_s":5971,"czas_calkowity_s":6520,"przewyzszenie_m":93.9,"nazwa":"OB-Gassy-Mirków","opis":"Antek Oczek"},
  {"id":"19014149953","data":"2026-06-21T19:16:41","typ":"Ride","dystans_m":29284.5,"czas_ruchu_s":3887,"czas_calkowity_s":3961,"przewyzszenie_m":51.8,"nazwa":"Late afternoon Kierszek-CH ride"},
  {"id":"19033109585","data":"2026-06-23T11:03:45","typ":"Ride","dystans_m":19977.7,"czas_ruchu_s":2553,"czas_calkowity_s":2553,"przewyzszenie_m":28.4,"nazwa":"Morning Gassy ride"},
  {"id":"19089641123","data":"2026-06-27T19:12:34","typ":"Ride","dystans_m":36560,"czas_ruchu_s":4889,"czas_calkowity_s":5736,"przewyzszenie_m":78.4,"nazwa":"Wieczorna jazda na rowerze do GK"},
  {"id":"19179947367","data":"2026-07-04T15:32:58","typ":"Ride","dystans_m":22601.3,"czas_ruchu_s":2701,"czas_calkowity_s":2838,"przewyzszenie_m":147.4,"nazwa":"Przez Męcikał szosą"},
  {"id":"19180109565","data":"2026-07-04T18:02:28","typ":"Ride","dystans_m":23064.7,"czas_ruchu_s":3533,"czas_calkowity_s":3673,"przewyzszenie_m":158.6,"nazwa":"Czersk powrót pod wiatr"},
  {"id":"19201212771","data":"2026-07-06T14:20:41","typ":"Ride","dystans_m":18250,"czas_ruchu_s":2480,"czas_calkowity_s":3001,"przewyzszenie_m":107,"nazwa":"rain gravel/hilly rec ride"},
  {"id":"19247803670","data":"2026-07-09T17:35:11","typ":"Ride","dystans_m":37473.8,"czas_ruchu_s":4914,"czas_calkowity_s":8039,"przewyzszenie_m":195.4,"nazwa":"Charzykowy gravel"},
  {"id":"19415453209","data":"2026-07-12T12:32:16","typ":"Ride","dystans_m":16340.1,"czas_ruchu_s":2083,"czas_calkowity_s":2083,"przewyzszenie_m":117,"nazwa":"gravel brusy"},
  {"id":"19415474905","data":"2026-07-12T19:38:48","typ":"Ride","dystans_m":16574.7,"czas_ruchu_s":2508,"czas_calkowity_s":2566,"przewyzszenie_m":105,"nazwa":"evening brusy rec way back"},
  {"id":"19415496764","data":"2026-07-14T12:23:30","typ":"Ride","dystans_m":64339,"czas_ruchu_s":9605,"czas_calkowity_s":11908,"przewyzszenie_m":450,"nazwa":"gravel 60k morning ride"},
  {"id":"19415517403","data":"2026-07-16T17:13:05","typ":"Ride","dystans_m":40101.3,"czas_ruchu_s":5606,"czas_calkowity_s":5756,"przewyzszenie_m":68,"nazwa":"gassy 2x pętla"},
  {"id":"19415553503","data":"2026-07-20T14:49:00","typ":"Ride","dystans_m":55961.9,"czas_ruchu_s":7817,"czas_calkowity_s":8612,"przewyzszenie_m":123,"nazwa":"evening rain 3x habdzin gassy"},
  {"id":"19447815706","data":"2026-07-22T11:30:25","typ":"Ride","dystans_m":19407.7,"czas_ruchu_s":2351,"czas_calkowity_s":2351,"przewyzszenie_m":28.1,"nazwa":"morning short pace"},
  {"id":"19728167402","data":"2026-07-28T11:27:46","typ":"Ride","dystans_m":58122,"czas_ruchu_s":8545,"czas_calkowity_s":11094,"przewyzszenie_m":190,"nazwa":"60k z2/3 gk"},
  {"id":"19575661206","data":"2026-08-02T21:49:32","typ":"Walk","dystans_m":6384.8,"czas_ruchu_s":5283,"czas_calkowity_s":5283,"przewyzszenie_m":58.1,"nazwa":"Night Walk"},
  {"id":"19578848563","data":"2026-08-03T08:56:40","typ":"Run","dystans_m":1856,"czas_ruchu_s":879,"czas_calkowity_s":893,"przewyzszenie_m":9,"nazwa":"Morning Run"},
  {"id":"19728195586","data":"2026-08-12T13:01:13","typ":"Ride","dystans_m":26590.1,"czas_ruchu_s":3570,"czas_calkowity_s":3629,"przewyzszenie_m":50,"nazwa":"return 1h extended gassy"},
  {"id":"19728218329","data":"2026-08-13T16:45:01","typ":"Ride","dystans_m":41262,"czas_ruchu_s":5271,"czas_calkowity_s":6569,"przewyzszenie_m":93,"nazwa":"gassy obory pętle na kole","opis":"Ok/trio/?1/hr160-195"},
  {"id":"19742428076","data":"2026-08-14T17:50:21","typ":"Ride","dystans_m":30773.3,"czas_ruchu_s":4680,"czas_calkowity_s":4680,"przewyzszenie_m":43,"nazwa":"HR check","opis":"30min x2 ( 20+10)\r\n130/129/131/130\r\n0,67\r\ndryf koło 0"},
  {"id":"19756483940","data":"2026-08-15T16:48:04","typ":"Ride","dystans_m":43281.5,"czas_ruchu_s":5484,"czas_calkowity_s":6864,"przewyzszenie_m":92,"nazwa":"duo high Z3"},
  {"id":"19790657175","data":"2026-08-18T10:57:10","typ":"Hike","dystans_m":538.8,"czas_ruchu_s":479,"czas_calkowity_s":522,"przewyzszenie_m":0,"nazwa":"Hike dla Streaka"},
  {"id":"19813335331","data":"2026-08-19T20:18:57","typ":"Run","dystans_m":2701.3,"czas_ruchu_s":1125,"czas_calkowity_s":1499,"przewyzszenie_m":22.9,"nazwa":"Evening Run"},
]

};
