import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import colors from "../enums/colors";
function ListSeparator({ style }) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeContainer: { flex: 1, margin: 1 },
  separator: {
    height: 1,
    backgroundColor: colors.deepBrown,

    opacity: 0.4
  }
});

export default ListSeparator;
