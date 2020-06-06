import axios from "axios";
import { NODE_ENV, API_URL_PRODUCTION, API_URL_DEVELOPMENT } from "react-native-dotenv";

const API_BASE_URL =
  NODE_ENV === "development" ? API_URL_DEVELOPMENT : API_URL_PRODUCTION;

const screencap = axios.create({
  baseURL: API_BASE_URL
});

export default screencap;