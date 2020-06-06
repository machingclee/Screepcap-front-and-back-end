import store from "../../store";
import actionNames from "../enums/actionNames";

export function login() {
  store.dispatch({
    type: actionNames.login
  });
}

export function logout() {
  store.dispatch({
    type: actionNames.logout
  });
}
