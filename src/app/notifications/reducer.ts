export interface notificationsState {
  messages: Array<{
    text: string;
    isError: boolean;
  }>;
}

interface notificationsAction {
  type: string;
  payload: notificationsState;
}

export const notificationsReducer = (
  state: notificationsState,
  action: notificationsAction
) => {
  switch (action.type) {
    case "NOTIFY":
      return {
        messages: state.messages.concat(
          action.payload.messages.filter((message) => message.text !== "")
        ),
      };
    case "REMOVE":
      return {
        messages: state.messages.filter((message, index) => index > 0),
      };
    default:
      return state;
  }
};
