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

    const weekOrder = data.weekOrder
      ? isFinite(+data.weekOrder)
        ? i18n.t('weekOrder', { count: +data.weekOrder, ordinal: true })
        : i18n.t('weekOrder', { context: data.weekOrder })
      : null;

    const massType = Array.isArray(data.massType)
      ? data.massType
          .map((mt) => i18n.t('massType', { context: mt }))
          .join(', ')
      : i18n.t('massType', { context: data.massType });

    const weekDayWeekOrder = weekOrder
      ? i18n.t('weekDayWeekOrder', {
          tWeekDay: i18n.t('weekday', {
            context: data.weekday,
          }),
          tWeekOrder: weekOrder,
          count: 1,
        })
      : i18n.t('weeDayWeekOrder', {
          tWeekDay: i18n.t('weekday', {
            context: data.weekday,
          }),
          count: 0,
        });

    const season = data.season
      ? i18n.t('season', { context: data.season })
      : null;

    const descriptionLines = [
      i18n.t('description', {
        tWeekDayWeekOrder: weekDayWeekOrder,
        tSeason: season,
        tMassType: massType,
        tPeriodOfDay: i18n.t('periodOfDay', {
          context: data.periodOfDay,
        }),
        context: season ? undefined : 'noSeason',
      }),

      data?.yearCycle
        ? `${i18n.t('yearCycle', {
            cycle: data.yearCycle,
          })}`
        : null,

      data?.yearNumber
        ? `${i18n.t('yearNumber', {
            count: +data.yearNumber,
          })}`
        : null,
      `${i18n.t('firstReading')}: ${data.firstReading}`,
      `${i18n.t('psalm')}: ${data.psalm}`,
      `${i18n.t('secondReading')}: ${data.secondReading}`,
      data?.thirdPsalm ? `${i18n.t('thirdPsalm')}: ${data.thirdPsalm}` : null,
      data?.thirdReading
        ? `${i18n.t('thirdReading')}: ${data.thirdReading}`
        : null,
      data?.fourthPsalm
        ? `${i18n.t('fourthPsalm')}: ${data.fourthPsalm}`
        : null,
      data?.fourthReading
        ? `${i18n.t('fourthReading')}: ${data.fourthReading}`
        : null,
      data?.fifthPsalm ? `${i18n.t('fifthPsalm')}: ${data.fifthPsalm}` : null,
      data?.fifthReading
        ? `${i18n.t('fifthReading')}: ${data.fifthReading}`
        : null,
      data?.sixthPsalm ? `${i18n.t('sixthPsalm')}: ${data.sixthPsalm}` : null,
      data?.sixthReading
        ? `${i18n.t('sixthReading')}: ${data.sixthReading}`
        : null,
      data?.seventhPsalm
        ? `${i18n.t('seventhPsalm')}: ${data.seventhPsalm}`
        : null,
      data?.seventhReading
        ? `${i18n.t('seventhReading')}: ${data.seventhReading}`
        : null,
      data?.eighthPsalm
        ? `${i18n.t('eighthPsalm')}: ${data.eighthPsalm}`
        : null,
      data?.eighthReading
        ? `${i18n.t('eighthReading')}: ${data.eighthReading}`
        : null,
      `${i18n.t('gospel')}: ${data.gospel}`,
    ];

    const descriptionHeader = descriptionLines.filter(Boolean).join('\n');

    calendar.createEvent({
      allDay: true,
      // NOTE: Add 1 second to avoid all-day event being on the previous day
      start: addSeconds(parse(data.date, 'dd/MM/yyyy', new Date()), 1),
      end: addSeconds(parse(data.date, 'dd/MM/yyyy', new Date()), 1),
      description: descriptionHeader,
      summary,
    });
  });

  return calendar;
};

export { genICalendar };
