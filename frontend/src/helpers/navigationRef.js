import { NavigationActions } from "react-navigation";

let navigator;

export const setNavigator = (nav) => {
  // get the navigationContainer object.
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeName,
      params: params
    })
  );
};
