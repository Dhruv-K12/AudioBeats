import { StatusBar } from "react-native";
import React, { useEffect } from "react";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuthCtx } from "../Context/AuthContext";
import AlertToast from "../Components/AlertToast/AlertToast";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import CustomSplashScreen from "../Components/CustomSplashScreen";
import MainStack from "./MainStack";
import BottomSheet from "../Components/BottomSheet/BottomSheet";
import { PaperProvider } from "react-native-paper";
import DialogAction from "../Components/DialogAction";
import { usethemeStore } from "../Store/themeStore";
SplashScreen.preventAutoHideAsync();
const Navigation = () => {
  const colors = usethemeStore((state) => state.theme);
  const { user, setUser, splashLoading } = useAuthCtx();
  const [loaded, error] = useFonts({
    "Inter-SemiBold": require("../../assets/Fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Light": require("../../assets/Fonts/Inter_18pt-Light.ttf"),
  });

  useEffect(() => {
    SplashScreen.hide();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

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
      <PaperProvider>
        <StatusBar backgroundColor={colors.bg} />
        <AlertToast />
        <DialogAction />
        {user ? (
          <>
            <MainStack />
            <BottomSheet />
          </>
        ) : (
          <AuthStack />
        )}
      </PaperProvider>
    </NavigationContainer>
  );
};

export default Navigation;
