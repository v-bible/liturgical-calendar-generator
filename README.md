<div align="center">

  <h1>liturgical-calendar-generator</h1>

  <p>
    A library to generate liturgical calendars
  </p>

</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Run Locally](#running-run-locally)
- [Usage](#eyes-usage)
  - [Basic Usage](#basic-usage)
  - [CLI Usage](#cli-usage)
  - [Utils](#utils)
    - [Generate Liturgical Calendar](#generate-liturgical-calendar)
    - [Generate iCalendar](#generate-icalendar)
  - [Translation](#translation)
- [Roadmap](#compass-roadmap)
- [Contributing](#wave-contributing)
  - [Code of Conduct](#scroll-code-of-conduct)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

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

### Basic Usage

```ts
import { generateLiturgicalCalendar } from 'liturgical-calendar-generator';

const options = {
  year: 2024,
  locale: 'en',
  isEpiphanyOn6thJan: true,
  isAscensionOfTheLordOn40th: false,
};
const calendar = await generateLiturgicalCalendar(options);
console.log(calendar);
```

### CLI Usage

```
USAGE
  liturgical-calendar-generator [--outDir value] [--format json|ics] [--locale en|vi] [--isEpiphanyOn6thJan] [--isAscensionOfTheLordOn40th] [--fetchDataFromRemote] [--remoteDataPath value] [--addionalCalendarFile value]... <arg1>
  liturgical-calendar-generator --help
  liturgical-calendar-generator --version

A library to generate Catholic liturgical calendars

FLAGS
     [--outDir]                                                     Output directory. Default to "./output"
     [--format]                                                     Output format. Default to "json"                                                                         [json|ics]
     [--locale]                                                     Locale for the generated calendar. Default to "en"                                                       [en|vi]
     [--isEpiphanyOn6thJan/--noIsEpiphanyOn6thJan]                  Set Epiphany to 6th January or Sunday after 1st January. Default to "false"
     [--isAscensionOfTheLordOn40th/--noIsAscensionOfTheLordOn40th]  Set Ascension of the Lord to 40th day after Easter or Sunday after 40 days of Easter. Default to "false"
     [--fetchDataFromRemote/--noFetchDataFromRemote]                Fetch liturgical data from remote repository. Default to "false"
     [--remoteDataPath]                                             Custom remote path to fetch liturgical data from. Default to official repository URL
     [--addionalCalendarFile]...                                    Path to additional calendar JSON file(s) to include
  -h  --help                                                        Print help information and exit
  -v  --version                                                     Print version information and exit

ARGUMENTS
  arg1  Year of the liturgical calendar to generate
```

#### Examples

**Output format**

You can specify the output format of the generated liturgical calendar:

`ics` format to import into calendar applications (Google Calendar, Outlook,
etc.):

```bash
liturgical-calendar-generator 2024 --format ics
```

`json` format to use in your applications:

```bash
liturgical-calendar-generator 2024 --format json
```

**Change locale**

You can specify the locale for the generated liturgical calendar:

```bash
liturgical-calendar-generator 2024 --locale vi
```

**Additional calendar files**

You can provide multiple additional calendar JSON files to include user-defined
data:

```bash
liturgical-calendar-generator 2024 --addionalCalendarFile ./my-calendar-1.json --addionalCalendarFile ./my-calendar-2.json
```

**Fetch data from remote repository**

By default, the liturgical data is stored locally in the `liturgical` directory. You
can also fetch the latest data from the remote repository for latest updates:

```bash
liturgical-calendar-generator 2024 --fetchDataFromRemote
```

**Custom remote data path**

```bash
liturgical-calendar-generator 2024 --fetchDataFromRemote --remoteDataPath https://my-custom-repo.com/liturgical-data/
```

### Utils

#### Generate Liturgical Calendar

The liturgical data is collected from [The Lectionary for Mass (1998/2002 USA
Edition)](https://catholic-resources.org/Lectionary/1998USL.htm), which is
compiled by Felix Just, S.J., Ph.D. The data is stored in
[liturgical](./liturgical/) directory.

Some considerations when generating the liturgical calendar:

- **Currently, I don't have "The Lectionary for Mass" book to verify the data. If
  you find any mistakes, please report them to me**, by opening an issue in the
  [GitHub repository](https://github.com/v-bible/liturgical-calendar-generator/issues).

- The verse for the liturgical may varies from different languages and
  translations. Compare the liturgical for the same day **04/03/2024** (Monday of the Third Week of Lent) from
  [vaticanews.va](https://vaticannews.va/):
  in French, Español,
  Vietnamese, and English:
  - [French](https://www.vaticannews.va/fr/evangile-du-jour/2024/03/04.html):
    - First Reading: `2 R 5,1-15a`.
    - Gospel: `Lc 4,24-30`.
  - [Español](https://www.vaticannews.va/es/evangelio-de-hoy/2024/03/04.html):
    - First Reading: `2 Reyes 5,1-15`.
    - Gospel: `Lc 4,24-30`.
  - [Vietnamese](https://www.vaticannews.va/vi/loi-chua-hang-ngay/2024/03/04.html):
    - First Reading: `2 V 5,1-15a`.
    - Gospel: `Lc 4,24-30`.
  - [English](https://www.vaticannews.va/en/word-of-the-day/2024/03/04.html):
    - First Reading: `2 Kgs 5:1-15ab`.
    - Gospel: `Lk 4:24-30`.
  - [v-bible/catholic-resources](https://huggingface.co/datasets/v-bible/catholic-resources):
    - First Reading: `2 Kgs 5:1-15a`.
    - Gospel: `Luke 4:24-30`.

- In the same day may have multiple data for the liturgical (additional
  celebrations, feasts or solemnities may vary from different countries).

- The liturgical calendar also changes based on options:
  - Is Epiphany on 6th January or Sunday after 1st January?
  - Is Ascension on Thursday or Sunday after 40 days of Easter?
  - Special celebrations for each country.

- User can also provide user-defined data for the liturgical calendar.

#### Generate iCalendar

Current we only update calendar events with these fields:

- `summary`: Title of the event.
- `description`: Description of the event.
- `allDay`: Whether the event is all day or not.
- `start`: Start date of the event.
- `end`: End date of the event.

### Translation

For liturgical description, we use [`i18next`](https://www.i18next.com/) for
translation.

The locale files are stored in the `locales` directory. The default locale is
`en`.

- Supports:
  - `en`: English.
  - `vi`: Vietnamese.

To add a new locale, you need to create a new file in the `locales` directory.

<!-- Roadmap -->

## :compass: Roadmap

- [x] Add tests.

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
