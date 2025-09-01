import { StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useAuthCtx } from "../Context/AuthContext";
import { usethemeStore } from "../Store/themeStore";

const CustomSplashScreen = () => {
  const splashImg = usethemeStore((state) => state.theme.splashScreen);
  const { setSplashLoading } = useAuthCtx();
  return (
    <LottieView
      style={styles.container}
      source={splashImg}
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
