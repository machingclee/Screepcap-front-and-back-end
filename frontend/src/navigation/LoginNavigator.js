import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import AppNavigator from "./AppNavigator";

import { TransitionPresets } from "@react-navigation/stack";

const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS
        }}
      />
      <Stack.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{
          gestureEnabled: false,
          ...TransitionPresets.ScaleFromCenterAndroid
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
