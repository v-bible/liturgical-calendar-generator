import { describe, expect, it } from 'vitest';
import {
  CalendarEntryDataSchema,
  CalendarEntrySchema,
  OptionsSchema,
} from '@/lib/schema';

describe('CalendarEntrySchema', () => {
  it('should validate a valid calendar entry', () => {
    const validEntry = {
      firstReading: 'Genesis 1:1-5',
      psalm: 'Psalm 104',
      secondReading: 'Romans 8:18-25',
      gospel: 'Matthew 24:37-44',
      yearCycle: 'A',
      yearNumber: '1',
      season: 'advent',
      massType: 'sunday',
      weekdayType: 'sunday',
      weekOrder: '1',
      periodOfDay: 'morning',
      slug: 'advent-1-sunday',
      description: 'First Sunday of Advent',
    };

    const result = CalendarEntrySchema.safeParse(validEntry);
    expect(result.success).toBe(true);
  });

  it('should accept arrays for readings', () => {
    const entryWithArrays = {
      firstReading: ['Genesis 1:1-5', 'Genesis 1:6-10'],
      psalm: ['Psalm 104', 'Psalm 105'],
      secondReading: 'Romans 8:18-25',
      gospel: 'Matthew 24:37-44',
      yearCycle: 'A',
      yearNumber: '1',
      season: 'advent',
      massType: ['sunday', 'solemnity'],
      weekdayType: 'sunday',
      weekOrder: '1',
      periodOfDay: 'morning',
      slug: 'advent-1-sunday',
      description: 'First Sunday of Advent',
    };

    const result = CalendarEntrySchema.safeParse(entryWithArrays);
    expect(result.success).toBe(true);
  });

  it('should reject invalid entry missing required fields', () => {
    const invalidEntry = {
      firstReading: 'Genesis 1:1-5',
      // Missing other required fields
    };

    const result = CalendarEntrySchema.safeParse(invalidEntry);
    expect(result.success).toBe(false);
  });
});

describe('CalendarEntryDataSchema', () => {
  it('should validate entry with date and weekday', () => {
    const validEntry = {
      firstReading: 'Genesis 1:1-5',
      psalm: 'Psalm 104',
      secondReading: 'Romans 8:18-25',
      gospel: 'Matthew 24:37-44',
      yearCycle: 'A',
      yearNumber: '1',
      season: 'advent',
      massType: 'sunday',
      weekdayType: 'sunday',
      weekOrder: '1',
      periodOfDay: 'morning',
      slug: 'advent-1-sunday',
      description: 'First Sunday of Advent',
      weekday: 'sunday',
      date: '01/12/2024',
    };

    const result = CalendarEntryDataSchema.safeParse(validEntry);
    expect(result.success).toBe(true);
  });
});

describe('OptionsSchema', () => {
  it('should parse options with defaults', () => {
    const result = OptionsSchema.parse({});

    expect(result.isEpiphanyOn6thJan).toBe(false);
    expect(result.isAscensionOfTheLordOn40th).toBe(false);
    expect(result.locale).toBe('en');
    expect(result.liturgicalDataPath).toBe('./liturgical');
  });

  it('should accept custom options', () => {
    const options = {
      isEpiphanyOn6thJan: true,
      isAscensionOfTheLordOn40th: true,
      locale: 'vi',
      liturgicalDataPath: 'https://example.com/liturgical',
    };

    const result = OptionsSchema.parse(options);

    expect(result.isEpiphanyOn6thJan).toBe(true);
    expect(result.isAscensionOfTheLordOn40th).toBe(true);
    expect(result.locale).toBe('vi');
    expect(result.liturgicalDataPath).toBe('https://example.com/liturgical');
  });

  it('should accept additionalCalendar function', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockFunction = (_year: number) => [];

    const result = OptionsSchema.parse({
      additionalCalendar: mockFunction,
    });

    expect(result.additionalCalendar).toBeDefined();
    expect(typeof result.additionalCalendar).toBe('function');
  });
});
