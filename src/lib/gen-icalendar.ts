import { addSeconds, parse } from 'date-fns';
import ical from 'ical-generator';
import i18n from '@/../i18next.config';
import { generateLiturgicalCalendar } from '@/lib/gen-liturgical-calendar';
import { type OptionsInput } from '@/lib/schema';

const genICalendar = async (year: number, options?: OptionsInput) => {
  const liturgical = await generateLiturgicalCalendar(year, options);

  const calendar = ical({
    name: 'Liturgical Calendar',
    description: 'Readings for Weekdays and other Masses',
    prodId: {
      company: 'v-bible',
      product: 'v-bible',
      language: 'en',
    },
    source: 'https://github.com/v-bible/liturgical-calendar-generator',
    url: 'https://github.com/v-bible/liturgical-calendar-generator',
  });

  liturgical.forEach((data) => {
    const summary = data.description;

    calendar.createEvent({
      allDay: true,
      // NOTE: Add 1 second to avoid all-day event being on the previous day
      start: addSeconds(parse(data.date, 'dd/MM/yyyy', new Date()), 1),
      end: addSeconds(parse(data.date, 'dd/MM/yyyy', new Date()), 1),
      description: `${i18n.t('labels.description')}: ${data.description}\n${i18n.t('labels.firstReading')}: ${data.firstReading}\n${i18n.t('labels.psalm')}: ${data.psalm}\n${i18n.t('labels.secondReading')}: ${data.secondReading}\n${i18n.t('labels.gospel')}: ${data.gospel}`,
      summary,
    });
  });

  return calendar;
};

export { genICalendar };
