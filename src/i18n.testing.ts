import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "../public/locales/en/translation.json";
import german from "../public/locales/de/translation.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: false,
  resources: {
    en: {
      translation: english,
    },
    de: {
      translation: german,
    },
  },
});

export default i18n;
