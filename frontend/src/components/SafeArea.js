import React from "react";
import { StyleSheet, View, SafeAreaView, StatusBar, Dimesions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const SafeArea = ({ children, style }) => {
  return (
    <View style={[styles.safeContainer, { marginTop: getStatusBarHeight() }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1
  }
});

export default SafeArea;
