import React from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function CircleActivityLoader() {
  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/loading.json")}
      style={{ alignSelf: "center", height: 80, width: 80 }}
    />
  );
}

export default CircleActivityLoader;
