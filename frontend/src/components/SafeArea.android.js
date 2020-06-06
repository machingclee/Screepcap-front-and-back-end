import React from "react";
import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";

const SafeArea = ({ children, style }) => {
  return <View style={[styles.safeContainer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
});

export default SafeArea;
