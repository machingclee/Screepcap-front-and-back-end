import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import LottieView from "lottie-react-native";

function CanonicalActivityIndicator({ style, visible, ...otherProps }) {
  return (
    <>
      {visible && (
        <View style={styles.overlay}>
          <LottieView
            source={require("../assets/animations/loading.json")}
            autoPlay
            loop
            style={[styles.loader, style]}
            {...otherProps}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loader: { height: 120, width: 120 },
  overlay: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    justifyContent: "center",
    opacity: 0.8,
    position: "absolute",
    width: "100%",
    zIndex: 1
  }
});

export default CanonicalActivityIndicator;
