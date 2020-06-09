import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";

import Modal from "react-native-modal";
import AppText from "../components/AppText";
import SafeArea from "../components/SafeArea";
import ListSeparator from "../components/ListSeparator";
import screencap from "../api/screencap";
import colors from "../enums/colors";
import Background from "../components/Background";
import { setVocabs } from "../actions/appStatusActions";
import VocabCard from "../components/VocabCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import useVocabs from "../hooks/useVocabs";
import Spacer from "../components/Spacer";
import permutation from "../utils/permutation";
import InfoRow from "../components/InfoRow";

function VocabListScreen({ navigation }) {
  const { notes, pages, vocabs } = useSelector((state) => state.appStatus);
  const [currentNoteName, setCurrentNoteName] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [currentVocabs, setCurrentVocabs] = useState([]);
  const noteName = navigation.state.params.noteName;
  console.log(noteName);

  useEffect(() => {
    if (noteName) {
      setCurrentNoteName(noteName);
      setCurrentVocabs(
        [...vocabs].filter((vocab) => {
          return vocab.page.note.name === noteName;
        })
      );
    }
  }, [noteName]);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [showSpin, setShowSpin] = useState(true);

  const getS3URL = (name) => {
    const s3Uri =
      "https://screencapdicscreenshots.s3-ap-southeast-1.amazonaws.com/cclee/" + name;
    return s3Uri;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const startSpinning = () => {
    setShowSpin(true);
  };
  const stopSpinning = () => {
    setShowSpin(false);
  };

  return (
    <Background>
      <View style={styles.container}>
        <Spacer />
        <Spacer />
        <Spacer />
        <FlatList
          data={currentVocabs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <>
                <VocabCard
                  item={item}
                  onPress={() => {
                    setModalImage(item.page.croppedScreenshot);
                    toggleModal();
                    startSpinning();
                  }}
                />
              </>
            );
          }}
          ItemSeparatorComponent={() => <ListSeparator />}
          refreshing={refreshing}
          onRefresh={() => {
            setCurrentVocabs(
              permutation(currentVocabs.length).map((index) => {
                return currentVocabs[index];
              })
            );
          }}
        />

        <Modal
          isVisible={showModal}
          swipeDirection="down"
          swipeThreshold={100}
          onSwipeComplete={toggleModal}
          style={{ margin: 0 }}
        >
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              color={colors.white}
              size={30}
            />
          </TouchableOpacity>
          <View style={styles.activityIndicator}>
            {showSpin && <ActivityIndicator size="large" />}
          </View>
          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={1}
            initialZoom={1}
            bindToBorders={false}
            captureEvent={true}
          >
            <Image
              onLoadEnd={stopSpinning}
              source={{ uri: getS3URL(modalImage) }}
              style={styles.modalImage}
            />
          </ReactNativeZoomableView>
        </Modal>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  background: { width: "100%", flex: 1 },
  closeButton: {
    position: "absolute",
    padding: 25,
    zIndex: 1,
    right: 0,
    top: 0
  },
  container: {
    flex: 1,
    backgroundColor: colors.lowOpaBrightBrown
  },
  explanationBox: {
    marginTop: 5,
    backgroundColor: colors.deepBrown,
    padding: 10,
    borderRadius: 5,
    opacity: 0.8
  },
  explanationText: {
    color: colors.white
  },
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -17 }, { translateY: -17 }]
  },
  modalImage: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    resizeMode: "contain"
  },
  safeContainer: { flex: 1, marginTop: 0 },
  textContainer: { flexDirection: "row", justifyContent: "space-between" },
  pronounciation: { color: colors.tomato, fontWeight: "bold" },
  totalContainer: {
    padding: 10,
    borderRadius: 7,
    borderLeftColor: "transparent"
  },
  word: { fontSize: 28, color: colors.dark, fontWeight: "bold" }
});

VocabListScreen.navigationOptions = () => {
  // To see all the options, see
  // https://reactnavigation.org/docs/stack-navigator/
  return {
    headerShown: false
  };
};

export default VocabListScreen;
