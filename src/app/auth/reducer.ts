export interface authState {
  isLoggedIn: boolean;
  userId: string | null;
  userToken: string | null;
}

interface authAction {
  type: string;
  payload: authState;
}

export const authReducer = (state: authState, action: authAction) => {
  switch (action.type) {
    case "LOGIN":
      if (action.payload.userId)
        localStorage.setItem("userid", action.payload.userId);
      if (action.payload.userToken)
        localStorage.setItem("userjwt", action.payload.userToken);
      return {
        isLoggedIn: true,
        userId: action.payload.userId,
        userToken: action.payload.userToken,
      };
    case "LOGOUT":
      localStorage.removeItem("userjwt");
      localStorage.removeItem("userid");
      return {
        isLoggedIn: false,
        userId: null,
        userToken: null,
      };
    default:
      return state;
  }
};
