import * as SecureStore from "expo-secure-store";
import { storageKey } from "../enums/storageKey";

const storeUser = async (userInfo) => {
  try {
    await SecureStore.setItemAsync(storageKey.USER, JSON.stringify(userInfo));
  } catch (err) {
    console.log(err);
  }
};

const getUser = async () => {
  try {
    const res = await SecureStore.getItemAsync(storageKey.USER);
    console.log(res);
    const user = JSON.parse(res);
    return user;
  } catch (err) {
    console.log(err);
  }
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(storageKey.USER);
  } catch (err) {
    console.log(err);
  }
};

export const authStorage = {
  storeUser,
  getUser,
  removeUser
};
