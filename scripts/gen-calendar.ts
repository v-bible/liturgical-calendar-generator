import { mkdir, writeFileSync } from 'node:fs';
import { genICalendar } from '@/lib/gen-icalendar';

mkdir('./dist', { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

(async () => {
  const year = 2024;

  const calendar = await genICalendar(year);
  const ics = calendar.toString();

  writeFileSync(`./dist/calendar-${year}.ics`, ics);
})();
