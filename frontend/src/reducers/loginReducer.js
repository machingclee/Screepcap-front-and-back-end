import actionNames from "../enums/actionNames";

const initialState = { username: "", password: "" };

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionNames.updateLoginPassword:
      return {
        ...state,
        username: action.payload
      };
    case actionNames.updateLoginUsername:
      return {
        ...state,
        password: action.payload
      };
    default:
      return state;
  }
}
