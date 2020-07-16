import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Platform } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../enums/colors";

function AppTextInput({ icon, style, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && <MaterialCommunityIcons name={icon} style={styles.icon} size={24} />}
      <TextInput
        style={[styles.input, { paddingLeft: icon ? null : 10 }, style]}
        autoCompleteType="off"
        autoCorrect={false}
        autoCapitalize="none"
        {...otherProps}
        placeholderTextColor={"rgba(0,0,0,0.5)"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    backgroundColor: "rgba(235,235,235,1)",
    borderRadius: 11,
    marginHorizontal: 10,
    marginVertical: 5
  },
  icon: { color: colors.medium, marginHorizontal: 5, marginRight: 10 },
  input: {
    flex: 1,
    marginVertical: 5,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark
  }
});

export default AppTextInput;
