import axios from "axios";
import {
  ENV,
  DEV_BASE_URL,
  PRE_PROD_BASE_URL,
  PROD_BASE_URL,
} from "../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorHandler } from "../utils/ErrorHandler";
import { showError } from "../utils/ToastMessage";
import ApiRequest from "../api";
import { navigationRef } from "../navigations/navigationRef";

const fetch = axios.create({
  baseURL:
    ENV === "development"
      ? DEV_BASE_URL
      : ENV === "preProduction"
      ? PRE_PROD_BASE_URL
      : ENV === "production"
      ? PROD_BASE_URL
      : DEV_BASE_URL,
});

fetch.interceptors.request.use(
  async (request) => {
    const token = await AsyncStorage.getItem("token");
    if (token && !request.headers["public-request"]) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // errorHandler(error);
    console.log("error api", error?.response?.data);
    showError(
      error?.response?.data
        ? error?.response?.data?.errorMessage || error?.response?.data?.message
        : error?.message
    );
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found.");
        }
        const response = await ApiRequest.getAccessToken(refreshToken);
        const { accessToken } = response?.data;
        await AsyncStorage.setItem("token", accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return fetch(originalRequest);
      } catch (refreshError) {
        console.log("Error refreshing token:", refreshError);
        await AsyncStorage.clear();
        if (navigationRef.isReady()) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
        showError("Session expired. Please log in again.");
        return Promise.reject(refreshError);
      }
    } else if (
      error?.response?.status === 500 ||
      error?.response?.status === 501 ||
      error?.response?.status === 502
    ) {
      await AsyncStorage.clear();
      if (navigationRef.isReady()) {
        navigationRef.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    }
    return Promise.reject(error);
  }
);

export default fetch;
