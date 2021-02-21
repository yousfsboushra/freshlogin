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
interface Lang {
  key: string;
  name: string;
}
export const defLang = "en";
export const langs: Array<Lang> = [
  {
    key: "en",
    name: "English",
  },
  {
    key: "de",
    name: "Deutsch",
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
langs.forEach((lang) => {
  pages.forEach((page) => {
    if (lang.key === defLang) {
      pagesWithLang.push(page);
    } else {
      pagesWithLang.push({ ...page, url: "/" + lang.key + page.url });
    }
  });
});

export const availableUrls: Array<Page> = pagesWithLang;

export const useCurrentLanguage = () => {
  const location = useLocation();
  const firstArg = location.pathname.substr(1).split("/")[0];
  let languagePrefix = "";
  if (langs.find((lang) => lang.key === firstArg)) {
    languagePrefix = "/" + firstArg;
  }
  return languagePrefix;
};
