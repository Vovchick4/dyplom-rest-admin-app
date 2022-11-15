import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function useGoogleTranslate(formik) {
  const [translationLoading, setTranslationLoading] = useState(false);

  const lastEditedInputRef = useRef();

  const { i18n } = useTranslation();

  function translate(inputValue, fieldName) {
    if (inputValue === '') {
      return;
    }

    const fromLang = i18n.language;
    const toLang = i18n.language === 'en' ? 'fr' : 'en';

    const API_KEY = 'AIzaSyAQPUeU2DW_ugLPdSa2oLihglPG9yHGxqI';

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(inputValue);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    setTranslationLoading(true);

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const translatedText = response.data.translations[0].translatedText;
        formik.setFieldValue(`${fieldName}:${toLang}`, translatedText);
      })
      .catch((error) => {
        console.log('There was an error with the translation request: ', error);
      })
      .finally(() => {
        setTranslationLoading(false);
        if (lastEditedInputRef.current) {
          lastEditedInputRef.current.focus();
        }
      });
  }

  return {
    translate,
    lastEditedInputRef,
    translationLoading,
    setTranslationLoading,
  };
}
