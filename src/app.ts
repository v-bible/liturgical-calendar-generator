import { buildApplication, buildCommand, numberParser } from '@stricli/core';
import { description, version } from '@/../package.json';
import {
  DEFAULT_IS_ASCENSION_OF_THE_LORD_ON_40TH,
  DEFAULT_IS_EPIPHANY_ON_6TH_JAN,
  DEFAULT_LOCALE,
  DEFAULT_OUTPUT_FORMAT,
  FETCH_REMOTE_DEFAULT,
  OUTPUT_BASE_DIR,
  SUPPORT_LNG,
} from '@/constants';

const command = buildCommand({
  loader: async () => import('./impl'),
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [
        {
          brief: 'Year of the liturgical calendar to generate',
          parse: numberParser,
        },
      ],
    },
    flags: {
      outDir: {
        kind: 'parsed',
        brief: `Output directory. Default to "${OUTPUT_BASE_DIR}"`,
        parse: String,
        optional: true,
      },
      format: {
        kind: 'enum',
        brief: `Output format. Default to "${DEFAULT_OUTPUT_FORMAT}"`,
        values: ['json', 'ics'],
        optional: true,
      },
      locale: {
        kind: 'enum',
        brief: `Locale for the generated calendar. Default to "${DEFAULT_LOCALE}"`,
        values: SUPPORT_LNG,
        optional: true,
      },
      isEpiphanyOn6thJan: {
        kind: 'boolean',
        brief: `Set Epiphany to 6th January or Sunday after 1st January. Default to "${DEFAULT_IS_EPIPHANY_ON_6TH_JAN}"`,
        optional: true,
      },
      isAscensionOfTheLordOn40th: {
        kind: 'boolean',
        brief: `Set Ascension of the Lord to 40th day after Easter or Sunday after 40 days of Easter. Default to "${DEFAULT_IS_ASCENSION_OF_THE_LORD_ON_40TH}"`,
        optional: true,
      },
      fetchDataFromRemote: {
        kind: 'boolean',
        brief: `Fetch liturgical data from remote repository. Default to "${FETCH_REMOTE_DEFAULT}"`,
        optional: true,
      },
      remoteDataPath: {
        kind: 'parsed',
        brief:
          'Custom remote path to fetch liturgical data from. Default to official repository URL',
        parse: String,
        optional: true,
      },
      addionalCalendarFile: {
        kind: 'parsed',
        brief: 'Path to additional calendar JSON file(s) to include',
        parse: String,
        optional: true,
        variadic: true,
      },
    },
  },
  docs: {
    brief: description,
  },
});

export const app = buildApplication(command, {
  name: 'liturgical-calendar-generator',
  versionInfo: {
    currentVersion: version,
  },
});
