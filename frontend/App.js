import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./store";

import LoginNavigator from "./src/navigation/LoginNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { authStorage } from "./src/persistingData/authStorage";
import { loginAction } from "./src/actions/loginActions";
import { AppLoading } from "expo";

import AuthContext from "./src/contexts/authContext";
import { useNetInfo } from "@react-native-community/netinfo";
import { navigationRef } from "./src/navigation/rootNavigation";

export default App = () => {
  const netInfo = useNetInfo();

  const [userIsStored, setUserIsStored] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) return;

    loginAction.updateUser(user);
    setUserIsStored(true);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => {
          setIsReady(true);
        }}
      />
    );

  return (
    <ReduxStoreProvider store={store} style={styles.background}>
      <AuthContext.Provider value={{ userIsStored, setUserIsStored }}>
        <NavigationContainer ref={navigationRef}>
          <LoginNavigator userIsStored={userIsStored} />
        </NavigationContainer>
      </AuthContext.Provider>
    </ReduxStoreProvider>
  );
};

const styles = StyleSheet.create({
  background: { width: "100%", flex: 1 }
});
