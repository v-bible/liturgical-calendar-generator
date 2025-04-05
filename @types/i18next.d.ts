// import the original type declarations
import 'i18next';
import translation from '@/locales/en/translation.json';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    resources: {
      translation: typeof translation;
    };
  }
}
