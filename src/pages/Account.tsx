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
import { useCurrentLanguagePrefix } from "./pages";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const languagePrefix = useCurrentLanguagePrefix();

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
          setFormMessages(["messages.invalidToken"], true);
          history.push(languagePrefix + "/");
        } else {
          setFormMessages([err], true);
        }
      });
    } else {
      setFormMessages(
        [`${"messages.api." + error.message.replaceAll(/[ .:]/gi, "_")}`],
        true
      );
    }
  };

  const validateAccountResponse = () => {
    if (!authState.isLoggedIn) {
      setFormMessages(["messages.notloggedin"], true);
    } else if (data?.user === null) {
      setFormMessages(["messages.accountNotFound"], true);
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
    setFormMessages(["messages.loggedOutSuccess"], false);
    history.push(languagePrefix + "/");
  };

  const firstName = data?.user?.firstName || "";
  const lastName = data?.user?.lastName || "";
  return (
    <Box mt="3rem" mx="1.5rem">
      <Typography variant="h1">{t("pages.account.title")}</Typography>
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
            label={t("pages.account.firstname.label")}
            value={loading ? t("pages.account.firstname.loading") : firstName}
            variant="standard"
            disabled
          />
        </Box>
        <Box mt="1rem">
          <TextField
            className={classes.textfield}
            id="lastName"
            label={t("pages.account.lastname.label")}
            value={loading ? t("pages.account.lastname.loading") : lastName}
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
            {t("pages.account.logout.label")}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Account;
