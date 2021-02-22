import { lazy, ComponentType } from "react";
import { useLocation } from "react-router-dom";

const Login = lazy(() => import("./Login"));
const Account = lazy(() => import("./Account"));

interface Page {
  key: string;
  url: string;
  name: string;
  component: ComponentType;
  auth: boolean;
}
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
export const pages: Array<Page> = [
  {
    key: "account",
    url: "/account",
    name: "pages.account.linkText",
    component: Account,
    auth: true,
  },
  {
    key: "login",
    url: "/",
    name: "pages.login.linkText",
    component: Login,
    auth: false,
  },
];

const pagesWithLang: Array<Page> = [];
languages.forEach((language) => {
  pages.forEach((page) => {
    if (language.key === defaultLanguage) {
      pagesWithLang.push(page);
    } else {
      pagesWithLang.push({ ...page, url: "/" + language.key + page.url });
    }
  });
});

export const availableUrls: Array<Page> = pagesWithLang;

export const useCurrentLanguage = () => {
  const location = useLocation();
  const firstArg = location.pathname.substr(1).split("/")[0];
  let currentLanguage = defaultLanguage;
  if (languages.find((language) => language.key === firstArg)) {
    currentLanguage = firstArg;
  }
  return currentLanguage;
};

export const useCurrentLanguagePrefix = () => {
  const currentLanguage = useCurrentLanguage();
  let languagePrefix = "";
  if (currentLanguage !== defaultLanguage) {
    languagePrefix = "/" + currentLanguage;
  }
  return languagePrefix;
};
