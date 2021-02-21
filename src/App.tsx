import React, { lazy, Suspense } from "react";
import { Grid, ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import { defLang, pages, availableUrls } from "./pages/pages";
import { ApolloProvider } from "@apollo/client";
import AuthProvider from "./app/auth/provider";
import NotificationsProvider from "./app/notifications/provider";
import { createApolloClient } from "./api/clientHelper";
import Notifications from "./components/Notifications";
import "./i18n";
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const apolloClient = createApolloClient();
  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <AuthProvider>
          <NotificationsProvider>
            <ThemeProvider theme={theme}>
              <ApolloProvider client={apolloClient}>
                <Grid container>
                  <Grid item xs={12}>
                    <Header />
                  </Grid>
                  <Grid item xs={12}>
                    <Switch>
                      {availableUrls.map((page) => (
                        <Route
                          key={page.key}
                          path={page.url}
                          component={page.component}
                          exact
                        ></Route>
                      ))}
                      {pages.map((page) => (
                        <Redirect
                          key={page.key}
                          exact
                          from={"/" + defLang + page.url}
                          to={page.url}
                        />
                      ))}
                      <Route component={NotFound} />
                    </Switch>
                    <Notifications />
                  </Grid>
                </Grid>
              </ApolloProvider>
            </ThemeProvider>
          </NotificationsProvider>
        </AuthProvider>
      </Suspense>
    </Router>
  );
}

export default App;
