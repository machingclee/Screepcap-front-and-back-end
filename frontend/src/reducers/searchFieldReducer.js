import actionNames from "../enums/actionNames";

const initialState = { searchKey: "" };

export default function searchFieldReducer(state = initialState, action) {
  switch (action.type) {
    case actionNames.setSearch:
      return { searchKey: action.payload };

    default:
      return state;
  }
}
