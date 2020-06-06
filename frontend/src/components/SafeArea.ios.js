import React from "react";
import { SafeAreaView } from "react-native";

const Screen = ({ children, style }) => {
  return <SafeAreaView style={[{ flex: 1 }, style]}>{children}</SafeAreaView>;
};

export default Screen;
