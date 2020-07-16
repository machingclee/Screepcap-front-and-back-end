import axios from "axios";

import {
  NODE_ENV,
  API_URL_PRODUCTION,
  API_URL_DEVELOPMENT,
  API_URL_LOCAL_DOCKER
} from "react-native-dotenv";

const API_BASE_URL =
  NODE_ENV === "development"
    ? API_URL_DEVELOPMENT
    : NODE_ENV === "local_docker"
    ? API_URL_LOCAL_DOCKER
    : NODE_ENV === "production"
    ? API_URL_PRODUCTION
    : "Problem arises, please check.";

console.log("NODE_ENV is ", NODE_ENV);

const screencap = axios.create({
  baseURL: API_BASE_URL
});

async function saveToken({ authToken, pushToken }) {
  try {
    await screencap.post(
      "/auth/saveToken",
      {
        token: pushToken
      },
      {
        headers: {
          Authorization: "Bearer " + authToken
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export const screencapAPI = { saveToken };

export default screencap;
