import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useContext, useEffect } from "react";
import { NotificationsContext } from "../app/notifications/provider";

function Notifications() {
  const [open, setOpen] = React.useState(true);
  const [currentMessage, setCurrentMessage] = React.useState({
    text: "",
    isError: false,
  });
  const { notificationsState, notificationsDispatch } = useContext(
    NotificationsContext
  );

  const clearMessage = () => {
    setCurrentMessage({
      text: "",
      isError: false,
    });
  };

  useEffect(() => {
    if (notificationsState.messages.length > 0) {
      setCurrentMessage(notificationsState.messages[0]);
      setOpen(true);
    } else {
      clearMessage();
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
      {currentMessage.text !== "" ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <MuiAlert
            onClose={handleClose}
            severity={currentMessage.isError ? "error" : "success"}
          >
            {currentMessage.text}
          </MuiAlert>
        </Snackbar>
      ) : null}
    </>
  );
}

export default Notifications;
