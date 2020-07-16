import store from "../../store";
import actionNames from "../enums/actionNames";

export function setSearch(keywords) {
  store.dispatch({
    type: actionNames.setSearch,
    payload: keywords
  });
}
