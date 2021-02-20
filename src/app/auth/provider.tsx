import React, { createContext, FC } from "react";
import { authState, authReducer } from "./reducer";

const userid = localStorage.getItem("userid");
const userjwt = localStorage.getItem("userjwt");

const initialAuthState: authState = {
  isLoggedIn: userjwt !== null ? true : false,
  userId: userid,
  userToken: userjwt,
};
export const AuthContext = createContext<{
  authState: authState;
  authDispatch: React.Dispatch<any>;
}>({
  authState: initialAuthState,
  authDispatch: () => null,
});

const AuthProvider: FC = ({ children }) => {
  const [authState, authDispatch] = React.useReducer(
    authReducer,
    initialAuthState
  );
  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
