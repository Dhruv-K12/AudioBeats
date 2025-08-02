import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuthCtx } from "../Context/AuthContext";
import AlertToast from "../Components/AlertToast";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import CustomSplashScreen from "../Components/CustomSplashScreen";
import { colors } from "../Constants/colors";
import MainStack from "./MainStack";
import BottomSheet from "../Components/BottomSheet";
import { SafeAreaView } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();
const Navigation = () => {
  const { user, setUser, loading, splashLoading } =
    useAuthCtx();
  const [loaded, error] = useFonts({
    "Inter-SemiBold": require("../../assets/Fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Light": require("../../assets/Fonts/Inter_18pt-Light.ttf"),
  });

  useEffect(() => {
    SplashScreen.hideAsync();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => {
      setUser(undefined);
    };
  }, [user]);
  if (!loaded && !error) {
    return null;
  }
  if (splashLoading) {
    return (
      <>
        <CustomSplashScreen />
        <StatusBar backgroundColor={colors.buttons} />
      </>
    );
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.bg} />
      <AlertToast />
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
