import React, { lazy, Suspense } from "react";
import { Grid, ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { pages } from "./pages/pages";
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12}>
              <Switch>
                {pages.map((page) => (
                  <Route
                    key={page.key}
                    path={page.url}
                    component={page.component}
                    exact
                  ></Route>
                ))}
                <Route component={NotFound} />
              </Switch>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Suspense>
    </Router>
  );
}

export default App;
