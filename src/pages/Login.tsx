import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { executeMutation } from "../api/clientHelper";
import { LOGIN_MUTATION } from "../api/mutations";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../app/auth/provider";
import { NotificationsContext } from "../app/notifications/provider";
import { useTranslation } from "react-i18next";
import { useCurrentLanguage } from "../pages/pages";

const useStyles = makeStyles({
  box: {
    textAlign: "center",
    maxWidth: "600px",
    margin: "3rem auto 0",
  },
  title: {
    marginBottom: "1rem",
  },
  form: {
    margin: "0 auto",
    maxWidth: "400px",
  },
  textfield: {
    marginBottom: "1rem",
    width: "100%",
  },
  button: {
    marginTop: "1rem",
    width: "100%",
  },
});

function Login() {
  const { t } = useTranslation();
  const classes = useStyles();
  const languagePrefix = useCurrentLanguage();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMutation, { loading: loginMutationLoading }] = useMutation(
    LOGIN_MUTATION
  );
  const history = useHistory();
  const { authDispatch } = useContext(AuthContext);
  const { notificationsDispatch } = useContext(NotificationsContext);

  useEffect(() => {
    const userjwt = localStorage.getItem("userjwt");
    if (userjwt !== null && userjwt !== "") {
      history.push(languagePrefix + "/account");
    }
  }, [history, languagePrefix]);

  const checkEmail = (email: string) => {
    // Form formik documentation https://formik.org/docs/overview
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const checkPassword = (password: string) => {
    if (password === "") {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  const setFormMessages = (messages: string[], isError: boolean) => {
    notificationsDispatch({
      type: "NOTIFY",
      payload: {
        messages: messages.map((message: string) => ({
          text: message,
          isError,
        })),
      },
    });
  };

  const loginSuccessCallback = (result: any) => {
    if (result.data.login.jwt !== "") {
      const token = result.data.login.jwt;
      setFormMessages(["messages.loggedInSuccess"], false);
      setIsLoggedIn(true);
      const decodedToken: { id: string } = jwt_decode(token);
      authDispatch({
        type: "LOGIN",
        payload: {
          userId: decodedToken.id,
          userToken: token,
        },
      });
      history.push(languagePrefix + "/account");
    } else {
      setFormMessages(["messages.checkCredentials"], true);
    }
  };

  const submitLogin = () => {
    executeMutation(
      loginMutation,
      { username: email, password },
      loginSuccessCallback,
      setFormMessages
    );
  };

  return (
    <Grid container alignContent="center">
      <Grid item xs={12}>
        <Box className={classes.box}>
          <Typography className={classes.title} variant="h1">
            {t("pages.login.title")}
          </Typography>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              submitLogin();
            }}
            className={classes.form}
          >
            <div>
              <TextField
                className={classes.textfield}
                error={!isEmailValid}
                id="email"
                label={t("pages.login.email.label")}
                required
                defaultValue={email}
                helperText={
                  isEmailValid ? "" : t("pages.login.email.helperText")
                }
                variant="standard"
                onChange={(event) => {
                  setEmail(event.target.value);
                  checkEmail(event.target.value);
                }}
                onBlur={(event) => checkEmail(event.target.value)}
              />
            </div>
            <div>
              <TextField
                className={classes.textfield}
                error={!isPasswordValid}
                type="password"
                id="password"
                label={t("pages.login.password.label")}
                required
                defaultValue={password}
                helperText={
                  isPasswordValid ? "" : t("pages.login.password.helperText")
                }
                variant="standard"
                onChange={(event) => {
                  setPassword(event.target.value);
                  checkPassword(event.target.value);
                }}
                onBlur={(event) => checkPassword(event.target.value)}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                disabled={
                  isLoggedIn ||
                  !isEmailValid ||
                  !isPasswordValid ||
                  loginMutationLoading
                }
              >
                {loginMutationLoading
                  ? t("pages.login.submit.loading")
                  : t("pages.login.submit.label")}
              </Button>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
