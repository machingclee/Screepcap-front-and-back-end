import { createStore, combineReducers } from "redux";
import loginReducer from "./src/reducers/loginReducer";
import appStatusReducer from "./src/reducers/appStatusReducer";

const rootReducer = combineReducers({
  loginInfo: loginReducer,
  appStatus: appStatusReducer
});

// const store = createStore(
//   rootReducer /* preloadedState, */,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
const store = createStore(rootReducer);

export default store;
