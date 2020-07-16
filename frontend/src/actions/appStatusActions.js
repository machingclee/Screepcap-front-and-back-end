import store from "../../store";
import actionNames from "../enums/actionNames";

export function login() {
  store.dispatch({
    type: actionNames.login
  });
}

export function setVocabs(vocabs) {
  store.dispatch({
    type: actionNames.setVocabs,
    payload: vocabs
  });
}

export function setPages(pages) {
  store.dispatch({
    type: actionNames.setPages,
    payload: pages
  });
}

export function setNotes(notes) {
  store.dispatch({
    type: actionNames.setNotes,
    payload: notes
  });
}
