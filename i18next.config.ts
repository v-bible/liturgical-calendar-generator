import 'intl-pluralrules';
import i18n from 'i18next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Backend, { type ChainedBackendOptions } from 'i18next-chained-backend';
import FileSystemBackend from 'i18next-fs-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';

import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-displaynames/polyfill';
import '@formatjs/intl-displaynames/locale-data/en';
import '@formatjs/intl-displaynames/locale-data/vi';
import { fallbackLng, supportedLngs } from '@/lib/utils/constants';

(async () => {
  await i18n
    .use(Backend)
    .use(intervalPlural)
    .init<ChainedBackendOptions>({
      // NOTE: Do not set because language detector won't work
      // lng: defaultLang,
      supportedLngs,
      fallbackLng,
      debug: true,
      ns: ['translation'],
      defaultNS: 'translation',

      backend: {
        backends: [FileSystemBackend],
        backendOptions: [
          {
            loadPath: './locales/{{lng}}/{{ns}}.json',
          },
        ],
      },

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });

  i18n.services.formatter!.add('lowercase', (value) => {
    return value.toLowerCase();
  });

  i18n.services.formatter!.add('uppercase', (value) => {
    return value.toUpperCase();
  });

  i18n.services.formatter!.add('capitalize', (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  });

  i18n.services.formatter!.add('titlecase', (value) => {
    return value.replace(/\b\w/g, (c: string) => c.toUpperCase());
  });
})();

export default i18n;
