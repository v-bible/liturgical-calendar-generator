import { generateCalendar } from '@v-bible/js-sdk';
import { parse } from 'date-fns';
import ical from 'ical-generator';

const genICalendar = async (year: number) => {
  const liturgical = await generateCalendar(year);

  const calendar = ical({
    name: 'Liturgical Calendar',
    description: 'Readings for Weekdays and other Masses',
    prodId: {
      company: 'v-bible',
      product: 'v-bible',
      language: 'en',
    },
    source: 'https://github.com/v-bible/liturgical-ical',
    url: 'https://github.com/v-bible/liturgical-ical',
  });

  liturgical.forEach((data) => {
    calendar.createEvent({
      allDay: true,
      start: parse(data.date, 'dd/MM/yyyy', new Date()),
      end: parse(data.date, 'dd/MM/yyyy', new Date()),
      description: `Description: ${data.description}\nFirst Reading: ${data.firstReading}\nPsalm: ${data.psalm}\nSecond Reading: ${data.secondReading}\nGospel: ${data.gospel}`,
      summary: data.description,
    });
  });

  return calendar;
};

export { genICalendar };
