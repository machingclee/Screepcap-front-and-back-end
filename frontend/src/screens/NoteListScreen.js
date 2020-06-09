import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import AppText from "../components/AppText";
import SafeArea from "../components/SafeArea";
import Background from "../components/Background";
import useVocabs from "../hooks/useVocabs";
import { useSelector } from "react-redux";
import uuid from "../utils/uuid";
import Spacer from "../components/Spacer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../enums/colors";
import InfoRow from "../components/InfoRow";
function NoteListScreen({ navigation }) {
  const { fetchFinished } = useVocabs();
  const { notes, pages, vocabs } = useSelector((state) => state.appStatus);
  console.log(notes);

  const handleOnClick = (noteName) => () => {
    navigation.navigate("VocabListScreen", { noteName });
  };

  return (
    <Background>
      <SafeArea style={styles.safeContainer}>
        <Spacer />
        <InfoRow
          rightContent={
            <AppText style={styles.title} h2>
              Notes
            </AppText>
          }
        />
        <Spacer height={10} />
        {!fetchFinished && (
          <View>
            <Spacer />
            <ActivityIndicator size="large" />
          </View>
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={notes}
          keyExtractor={(item) => {
            return uuid();
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={handleOnClick(item)}
                style={styles.buttonContainer}
              >
                <View style={styles.note}>
                  <AppText style={styles.noteName}>{item}</AppText>
                  <MaterialCommunityIcons
                    name="arrow-right-circle"
                    size={32}
                    color={colors.medium}
                  />
                </View>
                <Spacer height={8} />
              </TouchableOpacity>
            );
          }}
        />
      </SafeArea>
    </Background>
  );
}

NoteListScreen.navigationOptions = () => {
  // To see all the options, see
  // https://reactnavigation.org/docs/stack-navigator/
  return {
    headerShown: false,
    headerTitle: "List of Notes",
    headerTitleAlign: "center"
  };
};

const styles = StyleSheet.create({
  background: { width: "100%", flex: 1 },
  buttonContainer: { marginLeft: 30 },
  container: { flex: 1 },
  note: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 15,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  noteName: {
    color: colors.danger,
    marginLeft: 10,
    fontWeight: "bold"
  },
  title: {
    color: colors.tomato
  },
  safeContainer: { flex: 1 }
});

export default NoteListScreen;
