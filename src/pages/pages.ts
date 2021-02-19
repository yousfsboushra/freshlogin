import { lazy, ComponentType } from "react";

const Login = lazy(() => import("./Login"));
const Account = lazy(() => import("./Account"));

interface Page {
  key: string;
  url: string;
  name: string;
  component: ComponentType;
}

export const pages: Array<Page> = [
  {
    key: "account",
    url: "/account",
    name: "Account",
    component: Account,
  },
  {
    key: "login",
    url: "/",
    name: "Login",
    component: Login,
  },
];
