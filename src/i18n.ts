import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
interface Language {
  key: string;
  name: string;
}

export const defaultLanguage = "en";

export const languages: Array<Language> = [
  {
    key: "en",
    name: "English",
  },
  {
    key: "de",
    name: "Deutsche",
  },
  {
    key: "fr",
    name: "Français",
  },
];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    whitelist: languages.map((language) => language.key),
    debug: false,
    detection: {
      order: [
        "path",
        "navigator",
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "htmlTag",
        "subdomain",
      ],
    },
  });

export const useUrlWithLanguagePrefix = (url: string) => {
  const currentLanguage = i18n.language;
  let urlWithLanguagePrefix = "/";
  if (currentLanguage !== defaultLanguage) {
    urlWithLanguagePrefix += currentLanguage + "/";
  }
  urlWithLanguagePrefix += url;
  return urlWithLanguagePrefix;
};

export default i18n;
