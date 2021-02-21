import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { pages } from "../pages/pages";
import { AuthContext } from "../app/auth/provider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Menu() {
  const { authState } = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <>
      {pages.map((page) => {
        return authState.isLoggedIn !== page.auth ? null : (
          <Link key={page.key} to={page.url}>
            <Button variant="text" color="primary">
              {t(page.name)}
            </Button>
          </Link>
        );
      })}
    </>
  );
}

export default Menu;
