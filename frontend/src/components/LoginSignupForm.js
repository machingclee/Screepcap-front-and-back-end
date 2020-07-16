import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import Spacer from "./Spacer";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import colors from "../enums/colors";

function LoginSignupForm({ setUsername, setPassword, onSubmit, submitButtonTitle }) {
  return (
    <View style={styles.container}>
      <Spacer height={5} />
      <AppTextInput
        icon="account-circle"
        placeholder={"Username"}
        onChangeText={setUsername}
      />
      <Spacer />
      <AppTextInput
        icon="lock-open"
        placeholder={"Password"}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton
        title={submitButtonTitle}
        color={colors.deepBrown}
        style={styles.button}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: { margin: 10 },
  button: { marginHorizontal: 10 },
  container: {},
  input: {
    marginHorizontal: 10
  }
});

export default LoginSignupForm;
