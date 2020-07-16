import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NoteListScreen from "../screens/NoteListScreen";
import VocabListScreen from "../screens/VocabListScreen";
import SearchField from "../components/SearchField";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../enums/colors";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { TransitionPresets } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

const NoteNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      screenOptions={{
        headerTintColor: colors.white
      }}
    >
      <Stack.Screen
        name="NoteListScreen"
        component={NoteListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VocabListScreen"
        component={VocabListScreen}
        options={({ navigation, route }) => {
          return {
            headerTitleAlign: "center",
            headerLeftContainerStyle: { padding: 5 },
            headerLeft: (props) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    color={props.tintColor}
                    size={30}
                  />
                </TouchableOpacity>
              );
            },
            headerShown: true,
            headerTitle: () => <SearchField />,
            headerStyle: {
              backgroundColor: colors.lightBrown
            }
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default NoteNavigator;
