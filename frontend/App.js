import React from "react";
import { View, StatusBar, Image, ImageBackground, StyleSheet } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/helpers/navigationRef";
import { Provider as ReduxStoreProvider } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur";
import store from "./store";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import VocabListScreen from "./src/screens/VocabListScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import NoteListScreen from "./src/screens/NoteListScreen";
import colors from "./src/enums/colors";

const loginFlow = createStackNavigator({
  LoginScreen: LoginScreen,
  SignupScreen: SignupScreen
});

const tabBarOptions = {
  showLabel: false,
  activeTintColor: "blue",
  inactiveTintColor: "#bdb1cc",
  style: {
    backgroundColor: colors.bottomTabBar,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  }
};

const mainFlow = createBottomTabNavigator(
  {
    vocabFlow: {
      screen: createStackNavigator({
        NoteListScreen: NoteListScreen,
        VocabListScreen: VocabListScreen
      }),
      navigationOptions: {
        tabBarLabel: "Vocabs",
        tabBarIcon: (props) => {
          console.log(props);
          return (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              size={25}
              color={props.tintColor}
            />
          );
        }
      }
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="account-circle" size={25} color={tintColor} />
        )
      }
    }
  },
  { tabBarOptions }
);

const switchNavigator = createSwitchNavigator({
  loginFlow,
  mainFlow
});

const AppContainer = createAppContainer(switchNavigator);

export default App = () => {
  return (
    <ReduxStoreProvider store={store} style={styles.background}>
      <AppContainer
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </ReduxStoreProvider>
  );
};

const styles = StyleSheet.create({
  background: { width: "100%", flex: 1 }
});
