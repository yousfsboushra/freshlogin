import React from "react";
import { AppBar, Box, Grid, Toolbar, Typography } from "@material-ui/core";
import Menu from "./Menu";
import LanguageSwitch from "./LanguageSwitch";

function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <Typography variant="h6" color="secondary">
              Freshlogin
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box textAlign="right">
              <Menu />
              <LanguageSwitch />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
