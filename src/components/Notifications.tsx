import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useContext, useEffect } from "react";
import { NotificationsContext } from "../app/notifications/provider";
import { useTranslation } from "react-i18next";

function Notifications() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const { notificationsState, notificationsDispatch } = useContext(
    NotificationsContext
  );

  useEffect(() => {
    if (notificationsState.messages.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [notificationsState]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      notificationsDispatch({
        type: "REMOVE",
        payload: [],
      });
    }, 100);
  };

  return (
    <>
      {notificationsState.messages.length > 0 &&
      notificationsState.messages[0]?.text !== "" ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <MuiAlert
            onClose={handleClose}
            severity={
              notificationsState.messages[0]?.isError ? "error" : "success"
            }
          >
            {t(notificationsState.messages[0].text)}
          </MuiAlert>
        </Snackbar>
      ) : null}
    </>
  );
}

export default Notifications;
