import { addSeconds, parse } from 'date-fns';
import ical from 'ical-generator';
import { generateLiturgicalCalendar } from '@/lib/utils/gen-liturgical-calendar';

const genICalendar = async (year: number) => {
  const liturgical = await generateLiturgicalCalendar(year);

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
      description: `Description: ${data.description}\nFirst Reading: ${data.firstReading}\nPsalm: ${data.psalm}\nSecond Reading: ${data.secondReading}\nGospel: ${data.gospel}`,
      summary,
    });
  });

  return calendar;
};

export { genICalendar };
