import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useSelector } from "react-redux";

import ProfileScreen from "../screens/ProfileScreen";
import NoteNavigator from "./NoteNavigator";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TransitionPresets } from "@react-navigation/stack";

import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const AppNavigator = ({ navigation }) => {
  useNotifications();

  const { token: authToken } = useSelector((state) => state.login);

  return (
    <Tab.Navigator
      options={{
        showLabel: false,
        activeTintColor: "blue",
        inactiveTintColor: "#bdb1cc",
        style: {
          borderTopWidth: 0.5,
          borderTopColor: "rgba(0,0,0,0.5)",
          left: 0,
          right: 0,
          bottom: 0
        }
      }}
    >
      <Tab.Screen
        name="NoteFlow"
        component={NoteNavigator}
        options={{
          title: "Notes",

          ...TransitionPresets.ModalSlideFromBottomIOS,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
