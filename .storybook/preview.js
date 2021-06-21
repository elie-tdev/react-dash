import { muiTheme } from 'storybook-addon-material-ui';

import { initReactI18next } from 'react-i18next';
import { withI18next } from 'storybook-addon-i18next';
import i18n from 'i18next';

import translation from '../src/translations/locales/en/translations';
import { LightTheme } from '../src/themes';

const resources = { en: { translation } };

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});

export const decorators = [
  muiTheme([LightTheme]),
  withI18next({ i18n, languages: { en: 'English' } }),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
