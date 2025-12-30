import { describe, expect, it } from 'vitest';
import { generateLiturgicalCalendar } from '@/lib/gen-liturgical-calendar';
import type { CalendarEntryData } from '@/lib/schema';

describe('generateLiturgicalCalendar', () => {
  it('should generate calendar for a given year', async () => {
    const year = 2025;
    const calendar = await generateLiturgicalCalendar(year);

    expect(calendar).toBeDefined();
    expect(Array.isArray(calendar)).toBe(true);
    expect(calendar.length).toBeGreaterThan(0);
  });

  it('should include required fields for each calendar entry', async () => {
    const year = 2025;
    const calendar = await generateLiturgicalCalendar(year);

    const firstEntry = calendar[0];
    expect(firstEntry).toHaveProperty('date');
    expect(firstEntry).toHaveProperty('weekday');
    expect(firstEntry).toHaveProperty('season');
    expect(firstEntry).toHaveProperty('description');
  });

  it('should respect locale option', async () => {
    const year = 2025;
    const calendar = await generateLiturgicalCalendar(year, { locale: 'vi' });

    expect(calendar).toBeDefined();
    expect(calendar.length).toBeGreaterThan(0);
  });

  it('should use local liturgical data by default', async () => {
    const year = 2025;
    const calendar = await generateLiturgicalCalendar(year);

    // Calendar should be generated successfully from local data
    expect(calendar.length).toBeGreaterThan(300); // Should have entries for most days
  });

  it('should handle Epiphany on 6th Jan option', async () => {
    const year = 2025;
    const calendar = await generateLiturgicalCalendar(year, {
      isEpiphanyOn6thJan: true,
    });

    const epiphany = calendar.find((entry: CalendarEntryData) =>
      entry.slug?.includes('theEpiphanyOfTheLord'),
    );
    expect(epiphany).toBeDefined();
    expect(epiphany?.date).toBe('06/01/2025');
  });

  it('should sort calendar entries by date', async () => {
    const year = 2025;
    const calendar = await generateLiturgicalCalendar(year);

    // Check that dates are in ascending order
    for (let i = 1; i < calendar.length; i++) {
      const prevDate = new Date(
        calendar[i - 1]!.date!.split('/').reverse().join('-'),
      );
      const currDate = new Date(
        calendar[i]!.date!.split('/').reverse().join('-'),
      );
      expect(currDate.getTime()).toBeGreaterThanOrEqual(prevDate.getTime());
    }
  });
});
