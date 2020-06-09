import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import colors from "../enums/colors";

function Rule() {
  return <View style={styles.rule} />;
}

const styles = StyleSheet.create({
  rule: {
    height: 1.5,
    width: "95%",
    backgroundColor: colors.deepBrown,
    opacity: 1,

    marginVertical: 10
  }
});

export default Rule;
