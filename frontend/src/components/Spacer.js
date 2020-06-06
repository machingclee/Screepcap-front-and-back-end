import React from "react";
import { View, StyleSheet } from "react-native";

function Spacer({ height = 5 }) {
  return <View style={{ margin: height }}></View>;
}

const styles = StyleSheet.create({});

export default Spacer;
