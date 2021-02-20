import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { executeMutation } from "../api/clientHelper";
import { LOGIN_MUTATION } from "../api/mutations";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../app/auth/provider";

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
  const classes = useStyles();
  const client = useApolloClient();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [messages, setMessages] = useState([""]);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMutation, { loading: loginMutationLoading }] = useMutation(
    LOGIN_MUTATION
  );
  const history = useHistory();
  const { authState, authDispatch } = useContext(AuthContext);

  useEffect(() => {
    const userjwt = localStorage.getItem("userjwt");
    if (userjwt !== null && userjwt !== "") {
      history.push("/account");
    }
  }, [history]);

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
    setMessages(messages);
    setIsError(isError);
  };

  const loginSuccessCallback = (result: any) => {
    if (result.data.login.jwt !== "") {
      const token = result.data.login.jwt;
      console.log("Login Data: ", result.data.login.jwt);
      setFormMessages(
        [
          "You have logged in successfully :)",
          "You will be redirected to your account in 2 seconds",
        ],
        false
      );
      setIsLoggedIn(true);
      const decodedToken: { id: string } = jwt_decode(token);
      authDispatch({
        type: "LOGIN",
        payload: {
          userId: decodedToken.id,
          userToken: token,
        },
      });
      client.clearStore();
      console.log("dispatch from login", authState);

      setTimeout(() => {
        history.push("/account");
      }, 2000);
    } else {
      setFormMessages(
        ["Something went wrong, please check your credentials and try again."],
        true
      );
    }
  };

  const submitLogin = () => {
    setFormMessages([""], false);
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
            Login
          </Typography>
          {messages.length > 0 && messages[0] !== "" ? (
            <Box mb="2rem">
              <MuiAlert
                variant="filled"
                severity={isError ? "error" : "success"}
              >
                {messages.map((message, index) => (
                  <Typography key={index}>{message}</Typography>
                ))}
              </MuiAlert>
            </Box>
          ) : (
            ""
          )}
          <form
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
                label="Email"
                required
                defaultValue={email}
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
                label="Password"
                required
                defaultValue={password}
                helperText={isPasswordValid ? "" : "Password is required"}
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
                {loginMutationLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
