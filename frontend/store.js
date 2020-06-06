import { createStore, combineReducers } from "redux";
import loginReducer from "./src/reducers/loginReducer";
const rootReducer = combineReducers({
  loginInfo: loginReducer
});

// const store = createStore(
//   rootReducer /* preloadedState, */,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
const store = createStore(rootReducer);

export default store;
