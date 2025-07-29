import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2nnQo8e6h13mdjJVm9NPcvMcJFuGwR-E",
  authDomain: "note-app-f189a.firebaseapp.com",
  databaseURL:
    "https://note-app-f189a-default-rtdb.firebaseio.com",
  projectId: "note-app-f189a",
  storageBucket: "note-app-f189a.firebasestorage.app",
  messagingSenderId: "689087539165",
  appId: "1:689087539165:web:04900299ca5a02ec667834",
  measurementId: "G-98SE2QY35L",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(
    ReactNativeAsyncStorage
  ),
});
