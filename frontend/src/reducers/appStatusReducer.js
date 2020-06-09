import actionNames from "../enums/actionNames";

const initialState = { isLoggedIn: false, token: "", vocabs: [], pages: [], notes: [] };

export default function appStatusReducer(state = initialState, action) {
  switch (action.type) {
    case actionNames.login:
      return {
        ...state,
        isLoggedIn: true
      };
    case actionNames.logout:
      return initialState;

    case actionNames.setToken:
      return {
        ...state,
        token: action.payload
      };
    case actionNames.setVocabs:
      return {
        ...state,
        vocabs: action.payload
      };
    case actionNames.setPages:
      return {
        ...state,
        pages: action.payload
      };
    case actionNames.setNotes:
      return {
        ...state,
        notes: action.payload
      };
    default:
      return state;
  }
}
