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

function updateLoginNickname(nickname) {
  store.dispatch({
    type: actionNames.updateNickname,
    payload: nickname
  });
}

function updateLoginEmail(email) {
  store.dispatch({
    type: actionNames.updateEmail,
    payload: email
  });
}

function updateLoginToken(token) {
  store.dispatch({
    type: actionNames.setToken,
    payload: token
  });
}

function logout() {
  store.dispatch({
    type: actionNames.logout
  });
}

function updateUser(user) {
  store.dispatch({
    type: actionNames.updateUser,
    payload: user
  });
}

export const loginAction = {
  updateLoginUsername,
  updateLoginPassword,
  updateLoginNickname,
  updateLoginEmail,
  updateLoginToken,
  logout,
  updateUser
};
