import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from './locales/en/translations';

const resources = { en: { translation } };

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
