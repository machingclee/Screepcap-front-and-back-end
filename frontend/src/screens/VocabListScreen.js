import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import ListSeparator from "../components/ListSeparator";
import AppText from "../components/AppText";
import colors from "../enums/colors";
import Background from "../components/Background";
import VocabCard from "../components/VocabCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import Spacer from "../components/Spacer";
import permutation from "../utils/permutation";
import { setSearch } from "../actions/searchFieldAction";
import useVocabs from "../hooks/useVocabs";
import CanonicalActivityIndicator from "../components/CanonicalActivityIndicator";

// import CircleActivityLoader from "../components/CircleActivityLoader";
function VocabListScreen({ navigation, route }) {
  const { sqliteNoteId } = route.params;

  const [currentVocabs, setCurrentVocabs] = useState([]);

  const { fetchFinished } = useVocabs({ sqliteNoteId });
  const { vocabs } = useSelector((state) => state.appStatus);
  const { username } = useSelector((state) => state.login);
  const { searchKey } = useSelector((state) => state.searchField);

  useEffect(() => {
    setSearch("");
    setCurrentVocabs(vocabs);
  }, [vocabs, sqliteNoteId]);

  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [showSpin, setShowSpin] = useState(true);

  const getS3URL = (imgName) => {
    const s3Uri = `https://screencapdicscreenshots.s3-ap-southeast-1.amazonaws.com/${username}/${imgName}`;
                  `https://screencapdicscreenshots.s3-ap-southeast-1.amazonaws.com/cclee/__cropped__image-129.png`
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

  const permuteVocabs = () => {
    setCurrentVocabs(
      permutation(currentVocabs.length).map((index) => {
        return currentVocabs[index];
      })
    );
  };

  const searchVocabs = () => {
    if (searchKey !== "") {
      const regex = new RegExp(searchKey, "i");
      setCurrentVocabs(
        vocabs.filter((vocab) => {
          return regex.test(vocab.explanation + vocab.word + vocab.pronounciation);
        })
      );
    } else {
      setCurrentVocabs(vocabs);
    }
  };

  useEffect(() => {
    searchVocabs();
  }, [searchKey]);

  return (
    <>
      <CanonicalActivityIndicator visible={!fetchFinished} />
      <Background>
        <View style={styles.container}>
          {vocabs.length === 0 && fetchFinished ? (
            <AppText style={styles.noVocab}>No vocab was created for this note.</AppText>
          ) : null}

          {fetchFinished && (
            <FlatList
              data={currentVocabs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <VocabCard
                      item={item}
                      onPress={() => {
                        setModalImage(item.croppedScreenshot);
                        toggleModal();
                        startSpinning();
                      }}
                    />
                  </>
                );
              }}
              ItemSeparatorComponent={() => <ListSeparator />}
              refreshing={refreshing}
              onRefresh={permuteVocabs}
            />
          )}

          <Modal
            isVisible={showModal}
            swipeDirection="down"
            swipeThreshold={100}
            onSwipeComplete={toggleModal}
            style={{ margin: 0 }}
          >
            <>
              <CanonicalActivityIndicator visible={showSpin} />
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  color={colors.white}
                  size={30}
                />
              </TouchableOpacity>
              <View style={styles.activityIndicator}></View>
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
            </>
          </Modal>
        </View>
      </Background>
    </>
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
  noVocab: { marginHorizontal: 10, marginTop: 10 },
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

export default VocabListScreen;
