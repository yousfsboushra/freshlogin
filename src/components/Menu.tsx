import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { pages } from "../pages/pages";
import { AuthContext } from "../app/auth/provider";

function Menu() {
  const { authState } = useContext(AuthContext);

  const userjwt = localStorage.getItem("userjwt");
  console.log("userjwt from menu: ", userjwt);
  return (
    <>
      {pages.map((page) => {
        return authState.isLoggedIn !== page.auth ? null : (
          <Button key={page.key} variant="text" color="primary">
            {page.name}
          </Button>
        );
      })}
    </>
  );
}

export default Menu;
