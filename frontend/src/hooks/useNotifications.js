import React, { useEffect } from "react";
import { Notifications } from "expo";
import { screencapAPI } from "../api/screencap";
import * as Permissions from "expo-permissions";
import { navigation } from "../navigation/rootNavigation";
import useAuth from "./useAuth";
import { authStorage } from "../persistingData/authStorage";

export default (notificationListener) => {
  const { userIsStored } = useAuth();

  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (!permission.granted) return;

      const pushToken = await Notifications.getExpoPushTokenAsync();
      const user = await authStorage.getUser();
      if (userIsStored)
        await screencapAPI.saveToken({ authToken: user.token, pushToken });
    } catch (err) {
      console.log("error getting a push token", err);
    }
  };
};
