import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    textAlign: "center",
  },
  title: {
    marginBottom: "1rem",
  },
  form: {
    margin: "0 auto",
  },
  textfield: {
    marginBottom: "1rem",
  },
  button: {
    marginTop: "1rem",
  },
});

function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const checkEmail = () => {
    if (email === "") {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const checkPassword = () => {
    if (password === "") {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };

  return (
    <Grid container alignContent="center">
      <Grid item xs={12}>
        <Box mt="5rem" className={classes.box}>
          <Typography className={classes.title} variant="h1">
            Login
          </Typography>
          <form autoComplete="off" className={classes.form}>
            <div>
              <TextField
                className={classes.textfield}
                error={!isEmailValid}
                id="email"
                label="Email"
                defaultValue={email}
                variant="standard"
                onChange={(event) => {
                  setEmail(event.target.value);
                  checkEmail();
                }}
                onBlur={checkEmail}
              />
            </div>
            <div>
              <TextField
                className={classes.textfield}
                error={!isPasswordValid}
                id="password"
                label="Password"
                defaultValue={password}
                helperText=""
                variant="standard"
                onChange={(event) => {
                  setPassword(event.target.value);
                  checkPassword();
                }}
                onBlur={checkPassword}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Login
              </Button>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
