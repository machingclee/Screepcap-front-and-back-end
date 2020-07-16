import React from "react";
import { View, StyleSheet } from "react-native";

function Spacer({ height = 5, style }) {
  return <View style={[{ margin: height }, style]}></View>;
}

const styles = StyleSheet.create({});

export default Spacer;
