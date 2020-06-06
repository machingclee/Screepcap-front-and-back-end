import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const Screen = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: "Roboto"
  }
});

export default Screen;
