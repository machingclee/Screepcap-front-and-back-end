import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import colors from "../enums/colors";

const Screen = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: "Roboto"
  }
});

export default Screen;
