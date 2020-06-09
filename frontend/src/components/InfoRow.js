import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import colors from "../enums/colors";

function InfoRow({ leftContent, rightContent, style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.infoRow, { paddingVertical: leftContent ? 10 : 15 }, style]}>
        <View style={styles.leftContent}>{leftContent ? leftContent : null}</View>
        <View style={styles.rightContent}>{rightContent}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeContainer: { flex: 1, margin: 10 },
  rightContent: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,

    backgroundColor: colors.brightBrown
  }
});

export default InfoRow;
