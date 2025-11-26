import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Initial translations (English as default; this will be populated/expanded by the automation script)
const resources = {
  en: {
    translation: {}, // e.g., { "Welcome": "Welcome" }
  },
  // Add other languages as needed, e.g., fr: { translation: {} }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    detection: {
      order: ['localStorage', 'navigator'], // Use localStorage for persistence
    },
  });

export default i18n;
