import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { loginAction } from "../actions/loginActions";

import AppText from "../components/AppText";
import SafeArea from "../components/SafeArea";
import Spacer from "../components/Spacer";
import Background from "../components/Background";
import screencap from "../api/screencap";
import colors from "../enums/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { authStorage } from "../persistingData/authStorage";
import AuthContext from "../contexts/authContext";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function LoginScreen({ navigation }) {
  const { userIsStored } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginNotSuccess, setLoginNotSuccess] = useState(false);

  useEffect(() => {
    if (userIsStored) navigation.navigate("AppNavigator");
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setUsername("");
      setPassword("");
      setLoginNotSuccess(false);
    });

    return unsubscribe;
  }, []);

  const restoreUser = async (obj) => {
    loginAction.updateUser(obj);
    await authStorage.storeUser(obj);
  };

  const onSubmit = async () => {
    const result = await screencap.post("/auth/login", {
      username: username,
      password: password
    });
    const { token, nickname, email } = result.data;

    if (!token) setLoginNotSuccess(true);
    else {
      restoreUser({ token, username, nickname, email });
      navigation.navigate("AppNavigator");
    }
  };

  return (
    <Background>
      <SafeArea style={styles.safeContainer}>
        <KeyboardAwareScrollView>
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
          <Spacer height={5} />
          <AppTextInput
            value={username}
            icon="account-circle"
            placeholder={"Username"}
            onChangeText={setUsername}
          />
          <Spacer />
          <AppTextInput
            value={password}
            icon="lock-open"
            placeholder={"Password"}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Spacer />
          <AppButton
            title={"Login"}
            color={colors.deepBrown}
            style={styles.button}
            onPress={onSubmit}
          />
          <Spacer />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignupScreen");
            }}
            styel={styles.text}
          >
            <AppText style={styles.text}>You may click me to sign up.</AppText>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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
  keyboardAvoidingView: { height: "100%" },
  safeContainer: { flex: 1, marginHorizontal: 15 },
  text: {
    alignSelf: "flex-end",
    marginHorizontal: 10,
    color: colors.mediumBlue
  }
});

export default LoginScreen;
