import { lazy, ComponentType } from "react";
import { languages, defaultLanguage } from "../i18n";
const Login = lazy(() => import("./Login"));
const Account = lazy(() => import("./Account"));

interface Page {
  key: string;
  url: string;
  name: string;
  component: ComponentType;
  auth: boolean;
}

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

export const pagesWithLanguagePrefix: Array<Page> = [];
languages.forEach((language) => {
  pages.forEach((page) => {
    if (language.key === defaultLanguage) {
      pagesWithLanguagePrefix.push(page);
    } else {
      pagesWithLanguagePrefix.push({
        ...page,
        url: "/" + language.key + page.url,
      });
    }
  });
});
