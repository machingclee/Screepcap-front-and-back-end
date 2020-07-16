import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  ScrollView
} from "react-native";

function Background({ children }) {
  return (
    <ImageBackground
      source={require("../assets/images/toBeBlured.jpg")}
      style={styles.background}
    >
      <StatusBar />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { width: "100%", flex: 1 }
});

export default Background;
