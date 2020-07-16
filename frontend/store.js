import { createStore, combineReducers } from "redux";
import loginReducer from "./src/reducers/loginReducer";
import appStatusReducer from "./src/reducers/appStatusReducer";
import searchFieldReducer from "./src/reducers/searchFieldReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  appStatus: appStatusReducer,
  searchField: searchFieldReducer
});

const store = createStore(
  rootReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
