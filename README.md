<div align="center">

  <h1>liturgical-calendar-generator</h1>

  <p>
    A library to generate liturgical calendars
  </p>

<!-- Badges -->
<p>
  <a href="https://github.com/v-bible/liturgical-calendar-generator/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/v-bible/liturgical-calendar-generator" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/v-bible/liturgical-calendar-generator" alt="last update" />
  </a>
  <a href="https://github.com/v-bible/liturgical-calendar-generator/network/members">
    <img src="https://img.shields.io/github/forks/v-bible/liturgical-calendar-generator" alt="forks" />
  </a>
  <a href="https://github.com/v-bible/liturgical-calendar-generator/stargazers">
    <img src="https://img.shields.io/github/stars/v-bible/liturgical-calendar-generator" alt="stars" />
  </a>
  <a href="https://github.com/v-bible/liturgical-calendar-generator/issues/">
    <img src="https://img.shields.io/github/issues/v-bible/liturgical-calendar-generator" alt="open issues" />
  </a>
  <a href="https://github.com/v-bible/liturgical-calendar-generator/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/v-bible/liturgical-calendar-generator.svg" alt="license" />
  </a>
</p>

<h4>
    <a href="https://github.com/v-bible/liturgical-calendar-generator/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/v-bible/liturgical-calendar-generator">Documentation</a>
  <span> · </span>
    <a href="https://github.com/v-bible/liturgical-calendar-generator/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/v-bible/liturgical-calendar-generator/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Run Locally](#running-run-locally)
- [Usage](#eyes-usage)
  - [Utils](#utils)
    - [Generate Liturgical Calendar](#generate-liturgical-calendar)
  - [Scripts](#scripts)
- [Roadmap](#compass-roadmap)
- [Contributing](#wave-contributing)
  - [Code of Conduct](#scroll-code-of-conduct)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to
your `.env` file:

- **App configs:**

  `LITURGICAL_DATA_PATH`: Path to liturgical data. Default: `https://raw.githubusercontent.com/v-bible/liturgical-calendar-generator/refs/heads/main/liturgical`.

E.g:

```
# .env
LITURGICAL_DATA_PATH="https://raw.githubusercontent.com/v-bible/liturgical-calendar-generator/refs/heads/main/liturgical"
```

You can also check out the file `.env.example` to see all required environment
variables.

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses [pnpm](https://pnpm.io/) as package manager:

```bash
npm install --global pnpm
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project:

```bash
git clone https://github.com/v-bible/liturgical-calendar-generator.git
```

Go to the project directory:

```bash
cd liturgical-calendar-generator
```

Install dependencies:

```bash
pnpm install
```

<!-- Usage -->

## :eyes: Usage

### Utils

#### Generate Liturgical Calendar

##### Basics

The liturgical data is collected from [The Lectionary for Mass (1998/2002 USA
Edition)](https://catholic-resources.org/Lectionary/1998USL.htm), which is
compiled by Felix Just, S.J., Ph.D. The data is stored in
[liturgical](./liturgical/) directory.

Some considerations when generating the liturgical calendar:

- **Currently, I don't have "The Lectionary for Mass" book to verify the data. If
  you find any mistakes, please report them to me**.

- The verse for the liturgical may varies from different languages and
  translations. Compare the liturgical for the same day **04/03/2024** (Monday of the Third Week of Lent) from
  [vaticanews.va](https://vaticannews.va/):
  in French, Español,
  Vietnamese, and English:

  - [French](https://www.vaticannews.va/fr/evangile-du-jour.html):
    - First Reading: `2 R 5,1-15a`.
    - Gospel: `Lc 4,24-30`.
  - [Español](https://www.vaticannews.va/es/evangelio-de-hoy.html):
    - First Reading: `2 Reyes 5,1-15`.
    - Gospel: `Lc 4,24-30`.
  - [Vietnamese](https://www.vaticannews.va/vi/loi-chua-hang-ngay.html):
    - First Reading: `2 V 5,1-15a`.
    - Gospel: `Lc 4,24-3`.
  - [English](https://www.vaticannews.va/en/word-of-the-day.html):
    - First Reading: `2 Kgs 5:1-15ab`.
    - Gospel: `Lk 4:24-30`.
  - [v-bible/static](https://github.com/v-bible/static):
    - First Reading: `2 Kgs 5:1-15a`.
    - Gospel: `Luke 4:24-30`.

- In the same day may have multiple data for the liturgical (additional
  celebrations, feasts or solemnities may vary from different countries).

- The liturgical calendar also changes based on options:

  - Is Epiphany on 6th January or Sunday after 1st January?
  - Is Ascension on Thursday or Sunday after 40 days of Easter?
  - Special celebrations for each country.

- User can also provide user-defined data for the liturgical calendar.

##### Translation

For liturgical description, we use [`i18next`](https://www.i18next.com/) for
translation.

The locale files are stored in the `locales` directory. The default locale is
`en`.

- Supports:
  - `en`: English.
  - `vi`: Vietnamese.

To add a new locale, you need to create a new file in the `locales` directory.

#### Generate iCalendar

Current we only update calendar events with these fields:

- `summary`: Title of the event.
- `description`: Description of the event.
- `allDay`: Whether the event is all day or not.
- `start`: Start date of the event.
- `end`: End date of the event.

## Scripts

- `scripts/gen-liturgical-calendar.ts`: Generate liturgical calendar. Files are
  stored in `dist` folder.

  ```bash
  npx tsx scripts/gen-liturgical-calendar.ts
  ```

- `scripts/gen-icalendar.ts`: Generate iCalendar file from liturgical calendar.
  Files are stored in `dist` folder.

  ```bash
  npx tsx scripts/gen-icalendar.ts
  ```

<!-- Roadmap -->

## :compass: Roadmap

- [ ] Add tests.

<!-- Contributing -->

## :wave: Contributing

<a href="https://github.com/v-bible/liturgical-calendar-generator/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=v-bible/liturgical-calendar-generator" />
</a>

Contributions are always welcome!

Please read the [contribution guidelines](./CONTRIBUTING.md).

<!-- Code of Conduct -->

### :scroll: Code of Conduct

Please read the [Code of Conduct](./CODE_OF_CONDUCT.md).

<!-- License -->

## :warning: License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** License.

[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

See the **[LICENSE.md](./LICENSE.md)** file for full details.

<!-- Contact -->

## :handshake: Contact

Duong Vinh - tienvinh.duong4@gmail.com

Project Link: [https://github.com/v-bible/liturgical-calendar-generator](https://github.com/v-bible/liturgical-calendar-generator).

<!-- Acknowledgments -->

## :gem: Acknowledgements

Here are useful resources and libraries that we have used in our projects:

- [The Lectionary for Mass (1998/2002 USA
  Edition)](https://catholic-resources.org/Lectionary/1998USL.htm): compiled by
  Felix Just, S.J., Ph.D.
- [Electronic New Testament Educational
  Resources](https://catholic-resources.org/Bible/index.html): compiled by
  Felix Just, S.J., Ph.D.
- [Biblical Book Names &
  Abbreviations](https://catholic-resources.org/Bible/Abbreviations-Abreviaciones.htm):
  compiled by Felix Just, S.J., Ph.D.
- [Calendar of Lectionary Cycles and Movable Liturgical Feasts (1969 – 2100)](https://catholic-resources.org/Lectionary/Calendar.htm): compiled by
  Felix Just, S.J., Ph.D.
- [Biblical References: Format, Examples,
  History](https://catholic-resources.org/Bible/Biblical_References.htm):
  compiled by Felix Just, S.J., Ph.D.
- [Basic Texts for the Roman Catholic Eucharist - THE ORDER OF
  MASS](https://catholic-resources.org/ChurchDocs/Mass-RM3.htm): compiled by
  Felix Just, S.J., Ph.D.
- [Liturgical Ordo 2023 –
  2024](https://www.liturgyoffice.org.uk/Calendar/2024/index.shtml): from
  Liturgical Office England & Wales.
- [Liturgical Calendar for the Dioceses of the United States of
  America](https://www.usccb.org/committees/divine-worship/liturgical-calendar).
