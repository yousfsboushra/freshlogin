import React from "react";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { ApolloError, useQuery } from "@apollo/client";
import { extractGraphQLErrors } from "../api/client";
import { ACCOUNT_QUERY } from "../api/queries";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  textfield: {
    marginBottom: "1rem",
    width: "100%",
  },
  button: {
    marginTop: "1rem",
    width: "100%",
  },
});
function Account() {
  const history = useHistory();
  const classes = useStyles();

  const { loading, error, data } = useQuery(ACCOUNT_QUERY, {
    variables: { id: localStorage.getItem("userid") },
  });

  const checkForInvalidToken = (error: ApolloError) => {
    const errors = extractGraphQLErrors(error);
    errors.forEach((err) => {
      if (err === "Invalid token.") {
        console.log("Invalid token");
      }
    });
  };

  if (error) {
    checkForInvalidToken(error);
  }

  const submitLogout = () => {
    localStorage.removeItem("userjwt");
    localStorage.removeItem("userid");
    history.push("/");
  };

  return (
    <Box mt="3rem" mx="1.5rem">
      <Typography variant="h1">Account</Typography>
      {error ? (
        <Typography color="error">Something went wrong</Typography>
      ) : (
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            submitLogout();
          }}
        >
          <Box mt="2rem">
            <TextField
              className={classes.textfield}
              id="firstname"
              name="firstname"
              label="First Name"
              value={loading ? "" : data?.user?.firstName}
              variant="standard"
              disabled
            />
          </Box>
          <Box mt="1rem">
            <TextField
              className={classes.textfield}
              id="lastName"
              label="Last Name"
              value={loading ? "" : data?.user?.lastName}
              variant="standard"
              disabled
            />
          </Box>
          <Box>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Logout
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default Account;
