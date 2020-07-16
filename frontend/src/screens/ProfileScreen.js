import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import AppText from "../components/AppText";
import SafeArea from "../components/SafeArea";
import Background from "../components/Background";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import colors from "../enums/colors";
import InfoRow from "../components/InfoRow";
import { loginAction } from "../actions/loginActions";
import { authStorage } from "../persistingData/authStorage";
import AuthContext from "../contexts/authContext";

function ProfileScreen({ navigation }) {
  const { setUserIsStored } = useContext(AuthContext);
  const { username, nickname, email } = useSelector((state) => {
    return state.login;
  });

  const logout = () => {
    loginAction.logout();
    authStorage.removeUser();
    setUserIsStored(false);
    navigation.navigate("LoginScreen");
  };

  const rows = [
    {
      id: "1",
      title: "Change Password",
      onPress: () => {
        console.log("change password");
      }
    },
    {
      id: "2",
      title: "Logout",
      onPress: logout
    }
  ];
  return (
    <Background>
      <SafeArea style={styles.safeContainer}>
        <Spacer />

        <InfoRow
          leftContent={
            <Image
              source={require("../assets/images/animal.png")}
              style={styles.avatar}
            />
          }
          rightContent={
            <View>
              <AppText style={styles.userName}>
                {username ? nickname : "TestingAccount"}
              </AppText>
              <AppText style={styles.email}>{email ? email : "TestingAccount"}</AppText>
            </View>
          }
        />
        <Spacer />
        <Spacer />

        <FlatList
          data={rows}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <InfoRow
                onPress={item.onPress}
                rightContent={<AppText style={styles.optionText}>{item.title}</AppText>}
              />
            );
          }}
        />
      </SafeArea>
    </Background>
  );
}

ProfileScreen.navigationOptions = () => {
  // To see all the options, see
  // https://reactnavigation.org/docs/stack-navigator/
  return {
    headerShown: false,
    headerTitle: "Profile",
    headerTitleAlign: "center"
  };
};

const styles = StyleSheet.create({
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  container: { flex: 1 },
  email: { fontSize: 15, color: colors.dark },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.brightBrown
  },
  optionText: { color: colors.medium },
  rightContent: { marginLeft: 20, fontWeight: "bold" },
  safeContainer: { flex: 1 },
  userName: {
    color: colors.danger,
    fontWeight: "bold"
  }
});

export default ProfileScreen;
