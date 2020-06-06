import React from "react";
import {
  TouchableOpacity,
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from "react-native";

import AppText from "./AppText";

const AppButton = ({ title, color, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.myButton, { backgroundColor: color }, style]}>
        <AppText style={{ color: "white" }}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  myButton: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20
  }
});

export default AppButton;
