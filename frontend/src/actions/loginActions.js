import store from "../../store";
import actionNames from "../enums/actionNames";

export function updateLoginUsername(username) {
  store.dispatch({
    type: actionNames.updateLoginUsername,
    payload: username
  });
}

export function updateLoginPassword(password) {
  store.dispatch({
    type: actionNames.updateLoginPassword,
    payload: password
  });
}
