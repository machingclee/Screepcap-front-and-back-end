import React from "react";
import { View, StatusBar } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/helpers/navigationRef";
import SignupScreen from "./src/screens/SignupScreen";

import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./store";

import LoginScreen from "./src/screens/LoginScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen
  })
  // mainFlow: createBottomTabNavigator({
  //   trackListFlow: createStackNavigator({})
  //   // TrackCreate: TrackCreateScreen,
  //   // Account: AccountScreen
  // })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <ReduxStoreProvider store={store}>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </ReduxStoreProvider>
  );
};
