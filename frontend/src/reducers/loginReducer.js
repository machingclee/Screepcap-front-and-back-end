const initialState = { username: "", password: "" };

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_LOGIN_USERNAME":
      return {
        ...state,
        username: action.payload
      };
    case "UPDATE_LOGIN_PASSWORD":
      return {
        ...state,
        password: action.payload
      };
    default:
      return state;
  }
}
