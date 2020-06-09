import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import AppText from "../components/AppText";
import SafeArea from "../components/SafeArea";
import Spacer from "../components/Spacer";
import { useSelector } from "react-redux";
import LoginSignupForm from "../components/LoginSignupForm";
import Background from "../components/Background";
import { updateLoginUsername, updateLoginPassword } from "../actions/loginActions";
import screencap from "../api/screencap";
import { login, logout, setToken } from "../actions/appStatusActions";
import colors from "../enums/colors";

import messages from "../enums/messages";

function LoginScreen({ navigation }) {
  const { username, password } = useSelector((state) => {
    return state.loginInfo;
  });

  const [loginNotSuccess, setLoginNotSuccess] = useState(false);

  const isLoggedIn = useSelector((state) => state.appStatus.isLoggedIn);

  const onSubmit = async () => {
    const result = await screencap.post("/auth/login", {
      username: username,
      password: password
    });
    const token = result.data.token;
    if (!token) setLoginNotSuccess(true);
    else {
      login();
      setToken(token);
      navigation.navigate("NoteListScreen");
    }
  };

  const navigatorToSignup = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <Background>
      <SafeArea style={styles.safeContainer}>
        <Spacer height={10} />
        <Image source={require("../assets/images/book.png")} style={styles.book} />
        <AppText
          style={{
            alignSelf: "center",
            height: 20,
            justifyContent: "center",
            color: colors.tomato
          }}
        >
          {loginNotSuccess ? "Incorrect username or password" : ""}
        </AppText>
        <LoginSignupForm
          setUsername={updateLoginUsername}
          setPassword={updateLoginPassword}
          onSubmit={onSubmit}
          submitButtonTitle={"Login"}
        />

        <TouchableOpacity onPress={navigatorToSignup} styel={styles.text}>
          <AppText style={styles.text}>You may click me to sign up.</AppText>
        </TouchableOpacity>
      </SafeArea>
    </Background>
  );
}

LoginScreen.navigationOptions = () => {
  // To see all the options, see
  // https://reactnavigation.org/docs/stack-navigator/
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    opacity: 0.5
  },
  book: {
    alignSelf: "center",
    width: 150,
    height: 150
  },
  safeContainer: { flex: 1, marginHorizontal: 15 },
  text: {
    alignSelf: "flex-end",
    marginHorizontal: 10,
    color: colors.mediumBlue
  }
});

export default LoginScreen;
