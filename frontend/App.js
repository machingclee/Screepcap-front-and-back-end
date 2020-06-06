import React from "react";
import { View, StatusBar, Image } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/helpers/navigationRef";
import { Provider as ReduxStoreProvider } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import store from "./store";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import DictionaryListScreen from "./src/screens/DictionaryListScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const switchNavigator = createSwitchNavigator({
  mainFlow: createBottomTabNavigator({
    dictionaryFlow: {
      screen: createStackNavigator({
        DictionaryListScreen: DictionaryListScreen
      }),
      navigationOptions: {
        tabBarLabel: "Dictionaries",
        tabBarIcon: () => (
          <MaterialCommunityIcons name="format-list-bulleted-square" size={25} />
        )
      }
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: () => <MaterialCommunityIcons name="account-circle" size={25} />
      }
    }
  }),
  loginFlow: createStackNavigator({
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen
  })
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
