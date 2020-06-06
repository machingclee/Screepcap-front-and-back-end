import React, { useState } from "react";
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
import colors from "../enums/colors";
import { useSelector } from "react-redux";
import LoginSignupForm from "../components/LoginSignupForm";
import { updateLoginUsername, updateLoginPassword } from "../actions/loginActions";
import screencap from "../api/screencap";
import { NODE_ENV, API_URL_PRODUCTION, API_URL_DEVELOPMENT } from "react-native-dotenv";
import messages from "../enums/messages";

function LoginScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { username, password } = useSelector((state) => {
    return state.loginInfo;
  });

  const onSubmit = async () => {
    const result = await screencap.post("/auth/login", {
      username: username,
      password: password
    });
    console.log(result.data);
    if (result.data.message === messages.success) setIsLoggedIn(true);
  };

  const navigatorToSignup = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <ImageBackground
      source={require("../assets/images/toBeBlured.jpg")}
      style={styles.background}
      blurRadius={100}
    >
      <SafeArea style={styles.safeContainer}>
        <Spacer height={10} />
        <Image source={require("../assets/images/book.png")} style={styles.book} />

        <LoginSignupForm
          setUsername={updateLoginUsername}
          setPassword={updateLoginPassword}
          onSubmit={onSubmit}
          submitButtonTitle={isLoggedIn ? "Login in successfully" : "Login"}
        />

        <TouchableOpacity onPress={navigatorToSignup} styel={styles.text}>
          <AppText style={styles.text}>You may click me to sign up.</AppText>
        </TouchableOpacity>
      </SafeArea>
    </ImageBackground>
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
    color: "blue"
  }
});

export default LoginScreen;
