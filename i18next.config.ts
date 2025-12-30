import 'intl-pluralrules';
import i18n from 'i18next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Backend, { type ChainedBackendOptions } from 'i18next-chained-backend';
import FileSystemBackend from 'i18next-fs-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { FALLBACK_LNG, SUPPORT_LNG } from '@/constants';

(async () => {
  await i18n
    .use(Backend)
    .use(intervalPlural)
    .init<ChainedBackendOptions>({
      // NOTE: Do not set because language detector won't work
      // lng: defaultLang,
      supportedLngs: SUPPORT_LNG,
      fallbackLng: FALLBACK_LNG,
      debug: process.env.NODE_ENV === 'development',
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
