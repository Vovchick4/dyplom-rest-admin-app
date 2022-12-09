import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { useDispatch } from 'react-redux';

import en from '../locales/en.json';
import fr from '../locales/fr.json';
// import { platetApi } from '../redux/services/plate.service';
// import { setLocale } from './axios';

i18next.use(initReactI18next).init({
  resources: {
    en,
    fr,
  },
  supportedLngs: ['en', 'fr'],
  lng: 'en',
});

i18next.on('languageChanged', (lng) => {
  // const dispatch = useFetchEvents();
  // dispatch(platetApi.util.invalidateTags(lng));
  // setLocale(lng);
});
