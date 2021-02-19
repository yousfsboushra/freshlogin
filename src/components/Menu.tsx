import React from "react";
import { Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { pages } from "../pages/pages";

function Menu() {
  const location = useLocation();
  return (
    <>
      {pages.map((page) => {
        return location.pathname === page.url ? null : (
          <Link key={page.key} to={page.url}>
            <Button variant="text" color="primary">
              {page.name}
            </Button>
          </Link>
        );
      })}
    </>
  );
}

export default Menu;
