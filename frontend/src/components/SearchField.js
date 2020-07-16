import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { setSearch } from "../actions/searchFieldAction";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../enums/colors";

const width = Dimensions.get("window").width;
let dispatchSearchTimeout;

function SearchField() {
  const { searchKey } = useSelector((state) => state.searchField);
  const [searchValue, setSearchValue] = useState("");
  const [searchFieldFocused, setSearchFieldFocused] = useState(false);

  const clearSearch = () => {
    setSearch("");
    setSearchFieldFocused();
    Keyboard.dismiss();
  };

  const delay = 500;

  const searchVocab = (text) => {
    setSearchValue(text);
    if (dispatchSearchTimeout) clearTimeout(dispatchSearchTimeout);

    dispatchSearchTimeout = setTimeout(() => {
      setSearch(text);
    }, delay);
  };

  return (
    <View style={[styles.container, { width: width - 120 }]}>
      <TextInput
        value={searchFieldFocused ? searchValue : "Search ..."}
        style={[
          styles.input,
          {
            color: !searchFieldFocused ? colors.medium : null
          }
        ]}
        onChangeText={searchVocab}
        onFocus={() => {
          setSearchFieldFocused(true);
        }}
      />
      <TouchableOpacity style={styles.closeButton} onPress={clearSearch}>
        <MaterialCommunityIcons name="window-close" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    paddingHorizontal: 7
  },
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderColor: "rgba(0,0,0,0.4)",
    borderWidth: 0.5,
    borderRadius: 50,
    alignItems: "center"
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    flex: 1
  }
});

export default SearchField;
