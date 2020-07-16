import React, { useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import SafeArea from "../components/SafeArea";
import AppText from "../components/AppText";
import Spacer from "../components/Spacer";
import LoginSignupForm from "../components/LoginSignupForm";
import Background from "../components/Background";
import screencap from "../api/screencap";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

import messages from "../enums/messages";
import colors from "../enums/colors";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    try {
      const result = await screencap.post("/auth/register", {
        username,
        password,
        nickname,
        email
      });

      if (result.data.message == messages.success) {
        navigation.navigate("LoginScreen");
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigatorToLogin = () => {
    navigation.navigate("LoginScreen", {
      username,
      password
    });
  };

  return (
    <Background>
      <SafeArea style={styles.safeContainer}>
        <KeyboardAwareScrollView>
          <Spacer height={10} />

          <Image source={require("../assets/images/book.png")} style={styles.book} />
          <Spacer height={10} />
          <AppTextInput
            icon="account-circle"
            placeholder={"Username"}
            onChangeText={setUsername}
          />
          <Spacer style={styles.signupForm} />
          <AppTextInput
            icon="lock-open"
            placeholder={"Password"}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Spacer style={styles.signupForm} />
          <AppTextInput
            icon="rename-box"
            placeholder={"Nick Name"}
            onChangeText={setNickname}
          />
          <Spacer style={styles.signupForm} />
          <AppTextInput icon="email" placeholder={"Email"} onChangeText={setEmail} />

          <Spacer />
          <AppButton
            title={"Sign Up"}
            color={colors.deepBrown}
            style={styles.button}
            onPress={onSubmit}
          />
          <Spacer />
          <TouchableOpacity onPress={navigatorToLogin} styel={styles.text}>
            <AppText style={styles.text}>
              Already have an account? Click me to login.
            </AppText>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeArea>
    </Background>
  );
}

SignupScreen.navigationOptions = () => {
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
  signupForm: { margin: 2 },
  text: {
    alignSelf: "flex-end",
    marginHorizontal: 10,
    color: colors.mediumBlue
  }
});

export default SignupScreen;
