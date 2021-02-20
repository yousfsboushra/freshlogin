import React, { createContext, FC } from "react";
import { notificationsState, notificationsReducer } from "./reducer";

const initialNotificationsState: notificationsState = {
  messages: [],
};
export const NotificationsContext = createContext<{
  notificationsState: notificationsState;
  notificationsDispatch: React.Dispatch<any>;
}>({
  notificationsState: initialNotificationsState,
  notificationsDispatch: () => null,
});

const AuthProvider: FC = ({ children }) => {
  const [notificationsState, notificationsDispatch] = React.useReducer(
    notificationsReducer,
    initialNotificationsState
  );
  return (
    <NotificationsContext.Provider
      value={{
        notificationsState,
        notificationsDispatch,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default AuthProvider;
