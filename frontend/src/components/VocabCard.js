import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import colors from "../enums/colors";
import AppText from "./AppText";
function VocabCard({ item, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.cardContainer, style]} onPress={onPress}>
      <View>
        <View>
          {item.pronounciation === "" || item.pronounciation === null ? null : (
            <AppText style={styles.pronounciation}>{item.pronounciation}</AppText>
          )}

          <AppText style={styles.word}>{item.word}</AppText>
        </View>
        {/* <View style={styles.rightMostContent}>
                    <MaterialCommunityIcons name="image-move" size={28} color="black" />
                  </View> */}
      </View>

      {item.explanation === "" || item.explanation === null ? null : (
        <>
          <View style={styles.explanationBox}>
            <AppText style={styles.explanationText}>{item.explanation}</AppText>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  background: { width: "100%", flex: 1 },
  container: {
    flex: 1
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  explanationBox: {
    marginTop: 5,
    backgroundColor: colors.deepBrown,
    padding: 10,
    borderRadius: 5
  },
  explanationText: {
    color: colors.white
  },
  textContainer: { flexDirection: "row", justifyContent: "space-between" },
  pronounciation: { fontSize: 14, color: colors.tomato, fontWeight: "bold" },

  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  word: { fontSize: 24, color: colors.dark, fontWeight: "bold" }
});

export default VocabCard;
