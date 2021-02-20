import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { ApolloError, useQuery } from "@apollo/client";
import { extractGraphQLErrors } from "../api/clientHelper";
import { ACCOUNT_QUERY } from "../api/queries";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../app/auth/provider";
import { NotificationsContext } from "../app/notifications/provider";
import { useContext } from "react";

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

  const { authState, authDispatch } = useContext(AuthContext);
  const { notificationsDispatch } = useContext(NotificationsContext);

  const parseApolloErrors = (error: ApolloError) => {
    const errors = extractGraphQLErrors(error);
    if (errors.length > 0) {
      errors.forEach((err) => {
        if (err === "Invalid token.") {
          authDispatch({
            type: "LOGOUT",
            payload: {
              userId: null,
              userToken: null,
            },
          });
          setFormMessages(["Your token has expired, please login again"], true);
          history.push("/");
        } else {
          setFormMessages([err], true);
        }
      });
    } else {
      setFormMessages([error.message], true);
    }
  };

  const validateAccountResponse = () => {
    if (!authState.isLoggedIn) {
      setFormMessages(
        ["You are not logged in, please login to see your account"],
        true
      );
    } else if (data?.user === null) {
      setFormMessages(
        ["Account not found, please logout and login again"],
        true
      );
    } else if (error) {
      parseApolloErrors(error);
    }
  };

  const { loading, error, data } = useQuery(ACCOUNT_QUERY, {
    variables: { id: authState.userId },
    onCompleted: validateAccountResponse,
    onError: validateAccountResponse,
  });

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

  const submitLogout = () => {
    authDispatch({
      type: "LOGOUT",
      payload: {
        userId: null,
        userToken: null,
      },
    });
    setFormMessages(["You've logged out successfully"], false);
    history.push("/");
  };

  // useEffect(() => {
  //   validateAccountResponse();
  // }, []);

  const firstName = data?.user?.firstName || "";
  const lastName = data?.user?.lastName || "";
  return (
    <Box mt="3rem" mx="1.5rem">
      <Typography variant="h1">Account</Typography>
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
            value={loading ? "Loading..." : firstName}
            variant="standard"
            disabled
          />
        </Box>
        <Box mt="1rem">
          <TextField
            className={classes.textfield}
            id="lastName"
            label="Last Name"
            value={loading ? "Loading..." : lastName}
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
    </Box>
  );
}

export default Account;
