import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AppText from "../components/AppText";
import SafeArea from "../components/SafeArea";
function DictionaryListScreen() {
  return (
    <View style={styles.container}>
      <SafeArea style={styles.safeContainer}>
        <AppText>Dictionary List Screen</AppText>
      </SafeArea>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeContainer: { flex: 1, margin: 10 }
});

DictionaryListScreen.navigationOptions = () => {
  // To see all the options, see
  // https://reactnavigation.org/docs/stack-navigator/
  return {
    headerShown: false,
    headerTitle: "Dictionaries",
    headerTitleAlign: "center"
  };
};

export default DictionaryListScreen;
