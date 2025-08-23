import { StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../Constants/colors";
import Foundation from "@expo/vector-icons/Foundation";
import { fonts } from "../Constants/fonts";
import { useAuthCtx } from "../Context/AuthContext";
import Animated, {
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
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
      progress.value = withSequence(
        withSpring(1, {
          stiffness: 10,
          damping: 80,
          mass: 0.3,
          overshootClamping: true,
          reduceMotion: ReduceMotion.System,
        }),
        withSpring(0, {}, (finished) => {
          if (finished) runOnJS(resetError)();
        })
      );
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
    top: 10,
  },
  text: {
    width: "80%",
    color: "white",
    fontFamily: fonts.heading,
    textAlign: "center",
  },
});
