import React, { lazy, Suspense } from "react";
import { Grid, ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { pages } from "./pages/pages";
import { ApolloProvider } from "@apollo/client";
import AuthProvider from "./app/auth/provider";
import { createApolloClient } from "./api/clientHelper";
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const apolloClient = createApolloClient();

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <ApolloProvider client={apolloClient}>
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
            </ApolloProvider>
          </ThemeProvider>
        </AuthProvider>
      </Suspense>
    </Router>
  );
}

export default App;
