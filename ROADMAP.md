# Veikart for Gravity Lab

Versjonsnumrene er foreløpige. [README](README.md) beskriver funksjonaliteten på hovedgrenen. Gravity Lab skal på sikt ha tre hovedmoduser med en felles fysikkmotor der det er praktisk mulig. Sandbox forblir kjernen i appen.

## Pågående i 0.5.x

- Atmosfærisk bakgrunnslyd med Deep Space Drift, crossfade, egen volumkontroll og frakoblet avspilling. Endringen ligger i [PR #2](https://github.com/Tronnelon/Gravity-lab/pull/2). Frakoblet bruk er testet i Chromium. Safari på iPhone og Mac gjenstår.

## Planlagt for 0.5.x

- **Autozoom.** Zoom raskt ut når objektene sprer seg, og prøv innzooming med omtrent en tidel av hastigheten. Bruk myke, tidsbaserte overganger uavhengig av bildefrekvens og simuleringshastighet. Ta hensyn til synlig radius, gi omtrent 10 % margin langs hver kant og bruk en liten dødsone. Behold manuell zoom.
- **Stjernefelt.** Gi stjernene faste, deterministiske posisjoner. Ved innzooming beveger de seg utover fra sentrum, og ved utzooming trekkes de mot sentrum samtidig som flere blir synlige. Behold små lyspunkter og diskret parallakse. Unngå flimring og hold tegnekostnaden nede også ved kraftig utzooming.
- **Mobil og frakoblet bruk.** Test betjening, ytelse og PWA-oppdateringer på Mac og iPhone.

## 0.6 · Intelligent simulering

- Vurder unnslipning i tolegemesystemer med relativ hastighet og orbitalenergi. Bruk en foreløpig klassifisering i flerlegemesystemer basert på energi, avstand, økende separasjon, hvor lenge tilstanden har vart og påvirkning fra andre legemer. Vis bundet, mulig unnslipning og sannsynlig unnsluppet.
- La brukeren velge om sannsynlig unnslupne objekter skal utelates fra autozoom. Vurder samme valg for kameraføring rundt massesenteret. Alle legemer fortsetter å inngå i gravitasjonsberegningen.
- Loggfør simulert tid for kollisjoner, sammenslåinger, nærpasseringer, mulige unnslipninger og sannsynlig bundne par. Utvid analyse av baner og objekter.

## 0.7 · Gravity Challenges

Et enspillerspill der brukeren planlegger, simulerer og får poeng etter oppgavens mål. Bruk gjentatte forsøk, personlige rekorder og progresjon uten unødvendig tidspress.

- Start med **Perfect Orbit**, som vurderer blant annet eksentrisitet og fullførte omløp, og **Three Body Challenge**, som belønner langvarig stabilitet uten kollisjon eller unnslipning.
- Utforsk senere **Gravity Slingshot**, **Build a Solar System** og **Save the Planet**.

## 0.8 · Universe Atlas

Bygg et bibliotek over virkelige systemer med separate JSON-filer for kilder, masser, baner, omløpstider og startbetingelser. Planlegg en realistisk modus, tydelig merkede pedagogiske modeller og en eksperimentmodus der brukeren kan endre parametere.

- Kandidater omfatter Solsystemet, Sirius, Alfa Centauri, Regulus, Epsilon Lyrae, Castor, TIC 168789840, Kepler-16, TRAPPIST-1, Pluto–Charon, HD 98800, GW Orionis og HD 188753.
- Vurder større zoomområde og flere objekter, fokus på undersystemer og tidssteg som håndterer store forskjeller i omløpstid. Regulus er et eksempel på et system der de indre og ytre banene har svært forskjellige tidsskalaer.
- Oppgi usikkerhet og kildegrunnlag, og merk antatte startbetingelser og forenklinger til to dimensjoner.

## 0.9 · Avanserte eksperimenter

Bygg **Stellar Evolution** rundt justerbare startfordelinger for masse, tetthet og hastighet. Registrer kollisjoner, utslynginger og sannsynlig dannelse av dobbeltstjerner og hierarkiske systemer. Bruk seed-verdier for å gjenta automatiserte forsøksserier og vis statistikk over sluttutfall, levetider og utslyngingshastigheter.

## 1.0 · Samlet Gravity Lab

Integrer Sandbox, Gravity Challenges og Universe Atlas med felles betjening, stabil fysikk, god ytelse på mobil og desktop og dokumenterte modeller og forenklinger.
