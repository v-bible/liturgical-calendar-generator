import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import {
  FETCH_REMOTE_DEFAULT,
  OUTPUT_BASE_DIR,
  REMOTE_LITURGICAL_DATA_PATH,
  SUPPORT_LNG,
} from '@/constants';
import type { LocalContext } from '@/context';
import { genICalendar, generateLiturgicalCalendar } from '@/lib';
import {
  type CalendarEntryData,
  CalendarEntryDataSchema,
  type OptionsInput,
} from '@/lib/schema';

interface CommandFlags {
  outDir?: string;
  format?: 'json' | 'ics';
  locale?: (typeof SUPPORT_LNG)[number];
  isEpiphanyOn6thJan?: boolean;
  isAscensionOfTheLordOn40th?: boolean;
  addionalCalendarFile?: string[];
  fetchDataFromRemote?: boolean;
  remoteDataPath?: string;
}

export default async function (
  this: LocalContext,
  flags: CommandFlags,
  year: number,
): Promise<void> {
  const {
    locale,
    outDir = `${OUTPUT_BASE_DIR}/calendar-${year}`,
    format = 'json',
    isEpiphanyOn6thJan,
    isAscensionOfTheLordOn40th,
    fetchDataFromRemote = FETCH_REMOTE_DEFAULT,
    remoteDataPath = REMOTE_LITURGICAL_DATA_PATH,
  } = flags;

  let liturgicalDataPath: string | undefined;
  if (fetchDataFromRemote) {
    liturgicalDataPath = remoteDataPath;
  }

  let additionalCalendarEntries: CalendarEntryData[] = [];

  if (flags.addionalCalendarFile) {
    for (const filePath of flags.addionalCalendarFile) {
      try {
        if (!existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
        }
        const additionalCalendarData = await import(filePath);

        const parsedData = CalendarEntryDataSchema.array().parse(
          additionalCalendarData.default,
        );

        additionalCalendarEntries.push(...parsedData);
      } catch (error) {
        console.error(`Failed to load additional calendar file: ${filePath}`);
        throw error;
      }
    }
  }

  const options = {
    locale,
    isEpiphanyOn6thJan,
    isAscensionOfTheLordOn40th,
    liturgicalDataPath,
    additionalCalendar: () => additionalCalendarEntries,
  } satisfies OptionsInput;

  await mkdir(outDir, { recursive: true });

  if (format === 'json') {
    const data = await generateLiturgicalCalendar(year, options);

    await writeFile(
      `${outDir}/calendar-${year}.json`,
      JSON.stringify(data, null, 2),
    );
  } else if (format === 'ics') {
    const calendar = await genICalendar(year, options);
    const ics = calendar.toString();

    await writeFile(`${outDir}/calendar-${year}.ics`, ics);
  } else {
    throw new Error(`Unsupported format: ${format}`);
  }
}
