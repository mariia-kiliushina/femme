import {initReactI18next} from 'react-i18next';
import i18n, {LanguageDetectorModule} from 'i18next';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import ru from './ru.json';

export const LANGUAGES = {
  en: 'en',
  ru: 'ru',
} as const;

export const LANGUAGES_OBJECTS = {
  en,
  ru,
};

const LANGUAGE_DETECTOR: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    EncryptedStorage.getItem('language')
      .then((language) => {
        if (language) {
          i18n.changeLanguage(language).catch((err) => console.log(err));
          return language;
        }
      })
      .catch((error) => {
        console.log('Error fetching Languages from storage ', error);
      });

    const findBestAvailableLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(LANGUAGES),
    );
    const bestAvailableLanguage =
      findBestAvailableLanguage?.languageTag || undefined;

    return bestAvailableLanguage;
  },
  init: () => {},
};

i18n
  .use(initReactI18next)
  .use(LANGUAGE_DETECTOR)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3', // to avoid i18n plural error
    resources: LANGUAGES_OBJECTS,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
