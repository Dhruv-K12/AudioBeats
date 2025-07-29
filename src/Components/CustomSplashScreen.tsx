import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useAuthCtx } from "../Context/AuthContext";

const CustomSplashScreen = () => {
  const { setSplashLoading } = useAuthCtx();
  return (
    <LottieView
      style={styles.container}
      source={require("../../assets/Animation/Splash Screen.json")}
      autoPlay
      loop={false}
      onAnimationFinish={() => setSplashLoading(false)}
      resizeMode="cover"
    />
  );
};

export default CustomSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
