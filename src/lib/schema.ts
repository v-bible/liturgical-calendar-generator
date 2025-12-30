import z from 'zod';
import {
  BASE_LITURGICAL_DATA_PATH,
  DEFAULT_IS_ASCENSION_OF_THE_LORD_ON_40TH,
  DEFAULT_IS_EPIPHANY_ON_6TH_JAN,
  DEFAULT_LOCALE,
} from '@/constants';

export const ExtraCalendarEntrySchema = z.object({
  secondPsalm: z.union([z.string(), z.array(z.string())]),
  thirdReading: z.union([z.string(), z.array(z.string())]),
  thirdPsalm: z.union([z.string(), z.array(z.string())]),
  fourthReading: z.union([z.string(), z.array(z.string())]),
  fourthPsalm: z.union([z.string(), z.array(z.string())]),
  fifthReading: z.union([z.string(), z.array(z.string())]),
  fifthPsalm: z.union([z.string(), z.array(z.string())]),
  sixthReading: z.union([z.string(), z.array(z.string())]),
  sixthPsalm: z.union([z.string(), z.array(z.string())]),
  seventhReading: z.union([z.string(), z.array(z.string())]),
  seventhPsalm: z.union([z.string(), z.array(z.string())]),
  eighthReading: z.union([z.string(), z.array(z.string())]),
  eighthPsalm: z.union([z.string(), z.array(z.string())]),
});

export const CalendarEntrySchema = z
  .object({
    firstReading: z.union([z.string(), z.array(z.string())]),
    psalm: z.union([z.string(), z.array(z.string())]),
    secondReading: z.union([z.string(), z.array(z.string())]),
    gospel: z.union([z.string(), z.array(z.string())]),
    yearCycle: z.string(),
    yearNumber: z.string(),
    season: z.string(),
    massType: z.union([z.string(), z.array(z.string())]),
    weekdayType: z.string(),
    weekOrder: z.string(),
    periodOfDay: z.string(),
    slug: z.string(),
    description: z.string(),
  })
  .extend(ExtraCalendarEntrySchema.partial().shape);

export const CalendarEntryDataSchema = CalendarEntrySchema.extend({
  weekday: z.string(),
  date: z.string(),
});

const BaseOptionsSchema = z.object({
  isEpiphanyOn6thJan: z
    .boolean()
    .optional()
    .default(DEFAULT_IS_EPIPHANY_ON_6TH_JAN),
  isAscensionOfTheLordOn40th: z
    .boolean()
    .optional()
    .default(DEFAULT_IS_ASCENSION_OF_THE_LORD_ON_40TH),
  locale: z.string().optional().default(DEFAULT_LOCALE),
  liturgicalDataPath: z.string().optional().default(BASE_LITURGICAL_DATA_PATH),
});

export const OptionsSchema = BaseOptionsSchema.extend({
  additionalCalendar: z
    .function({
      input: [z.number(), BaseOptionsSchema.partial().optional()],
      output: CalendarEntryDataSchema.array(),
    })
    .optional(),
});

export type ExtraCalendarEntry = z.infer<typeof ExtraCalendarEntrySchema>;
export type CalendarEntry = z.infer<typeof CalendarEntrySchema>;
export type CalendarEntryData = z.infer<typeof CalendarEntryDataSchema>;
export type OptionsInput = z.input<typeof OptionsSchema>;
export type Options = z.infer<typeof OptionsSchema>;
