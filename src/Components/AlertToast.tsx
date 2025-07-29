import { StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../Constants/colors";
import Foundation from "@expo/vector-icons/Foundation";
import { fonts } from "../Constants/fonts";
import { useAuthCtx } from "../Context/AuthContext";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AlertToast = () => {
  const { error, setError } = useAuthCtx();
  const progress = useSharedValue(0);
  const resetError = () => setError("");
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: progress.value }],
      opacity: progress.value,
    };
  });
  useEffect(() => {
    if (error.trim().length !== 0) {
      progress.value = withSpring(1, {}, (finsihed) => {
        if (finsihed) runOnJS(resetError)();
      });
    } else {
      progress.value = withSpring(0);
    }
  }, [error]);
  return (
    <Animated.View
      style={[styles.container, containerStyle]}
    >
      <Foundation name="alert" size={30} color="white" />
      <Text style={styles.text}>{error}</Text>
    </Animated.View>
  );
};

export default AlertToast;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colors.buttons,
    zIndex: 999,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    padding: 16,
    top: 5,
  },
  text: {
    width: "80%",
    color: "white",
    fontFamily: fonts.heading,
    textAlign: "center",
  },
});
