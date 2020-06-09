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
  background: { width: "100%", flex: 1 },
  container: { flex: 1 },
  safeContainer: { flex: 1, margin: 10 }
});

export default Background;
