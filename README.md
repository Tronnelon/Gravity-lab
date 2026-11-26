# Gravity Lab

Gravity Lab er en interaktiv gravitasjonssimulator for å utforske hvordan planeter, stjerner og andre legemer beveger seg under gjensidig gravitasjon. Prosjektet viderefører en simulator utviklet av prosjekteieren på 1980-tallet.

[Åpne Gravity Lab på GitHub Pages](https://tronnelon.github.io/Gravity-lab/)

## Status på hovedgrenen

Versjon **0.5** har en todimensjonal Newtonsk N-legeme-simulering med Velocity Verlet, adaptive tidssteg, valgfri sammenslåing ved kollisjon og visning av energiavvik. Simuleringen bruker forenklede enheter.

- Legg til eller fjern objekter, juster masse og hastighet, dra objekter og endre hastighetsvektoren direkte i visningen.
- Følg massesenteret eller et valgt objekt, eller bruk fast kamera. Kameraet har manuell og automatisk zoom, banespor og stjerneparallakse.
- Velg blant sju forhåndsinnstilte forsøk, fra stjerne og planet til åttetallsbane og fritt fall. Egne forsøk lagres lokalt i nettleseren.

Bakgrunnslyd for 0.5.1 med volumkontroll, lagrede innstillinger og frakoblet avspilling ligger til gjennomgang i [PR #2](https://github.com/Tronnelon/Gravity-lab/pull/2). Se [veikartet](ROADMAP.md) for videre planer.

## Kjør lokalt

Appen består av statisk HTML, CSS og JavaScript med Canvas 2D, uten byggesteg eller pakkekrav. Kjør en lokal HTTP-server fra rotmappen, for eksempel med Python 3.

```sh
python3 -m http.server 8000
```

Åpne `http://localhost:8000/`. Last siden på nett eller via localhost først slik at service workeren kan installeres og bufre appfilene før du prøver frakoblet modus.

| Fil | Rolle |
| --- | --- |
| `index.html` | Brukergrensesnitt, fysikk, inndata og Canvas-tegning |
| `manifest.json` og `icon.png` | PWA-metadata og appikon |
| `sw.js` | Bufring og frakoblet oppstart |

Appen publiseres via GitHub Pages og er utviklet for mus og berøring på Mac og iPhone. Se [AGENTS.md](AGENTS.md) for utviklingsprinsippene.
