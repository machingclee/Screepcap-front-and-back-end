import actionNames from "../enums/actionNames";

const initialState = { token: "", username: "", nickname: "", email: "" };

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionNames.updateLoginUsername:
      return {
        ...state,
        username: action.payload
      };
    case actionNames.updateLoginPassword:
      return {
        ...state,
        password: action.payload
      };
    case actionNames.updateNickname:
      return {
        ...state,
        nickname: action.payload
      };
    case actionNames.updateEmail:
      return {
        ...state,
        email: action.payload
      };
    case actionNames.setToken:
      return {
        ...state,
        token: action.payload
      };
    case actionNames.updateUser:
      return {
        ...state,
        ...action.payload
      };

    case actionNames.logout:
      return initialState;

    default:
      return state;
  }
}
