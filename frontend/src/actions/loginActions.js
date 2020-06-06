import store from "../../store";

export function updateLoginUsername(username) {
  store.dispatch({
    type: "UPDATE_LOGIN_USERNAME",
    payload: username
  });
}

export function updateLoginPassword(password) {
  store.dispatch({
    type: "UPDATE_LOGIN_PASSWORD",
    payload: password
  });
}
