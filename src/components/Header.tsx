import React from "react";
import {
  AppBar,
  Box,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Menu from "./Menu";

const useStyles = makeStyles({
  login: {
    float: "right",
  },
});
function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" color="primary">
              Freshlogin
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.login}>
              <Menu />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
