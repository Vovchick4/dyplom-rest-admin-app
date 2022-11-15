import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import fr from '../locales/fr.json';
import { setLocale } from './axios';

i18next.use(initReactI18next).init({
  resources: {
    en,
    fr,
  },
  supportedLngs: ['en', 'fr'],
  lng: 'en',
});

i18next.on('languageChanged', (lng) => {
  setLocale(lng);
});
