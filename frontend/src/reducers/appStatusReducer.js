import actionNames from "../enums/actionNames";

const initialState = { isLoggedIn: false };

export default function appStatusReducer(state = initialState, action) {
  switch (action.type) {
    case actionNames.login:
      return {
        ...state,
        isLoggedIn: true
      };
    case actionNames.logout:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
}
