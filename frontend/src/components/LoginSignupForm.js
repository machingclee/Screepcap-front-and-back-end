import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import Spacer from "./Spacer";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";

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
        textContentType="newPassword"
      />
      <Spacer height={10} />
      <AppButton
        title={submitButtonTitle}
        color={"red"}
        style={styles.button}
        onPress={onSubmit}
      />
      <Spacer height={10} />
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
