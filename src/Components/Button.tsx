import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { colors } from "../Constants/colors";
import { btnProps } from "./types";
import { fonts } from "../Constants/fonts";
import { useAuthCtx } from "../Context/AuthContext";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Button = ({ text, onPress }: btnProps) => {
  const { loading } = useAuthCtx();
  const width = useWindowDimensions().width;
  const progress = useSharedValue(0);
  const container = useAnimatedStyle(() => {
    return {
      width: interpolate(
        progress.value,
        [0, 1],
        [width / 2, width / 4]
      ),
      borderRadius: interpolate(
        progress.value,
        [0, 1],
        [12, width / 4]
      ),
    };
  });
  const AnimatedPressable =
    Animated.createAnimatedComponent(Pressable);
  useEffect(() => {
    if (loading) {
      progress.value = withSpring(1);
    } else {
      progress.value = withSpring(0);
    }
  }, [loading]);
  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={loading}
      style={[styles.container, container]}
    >
      {loading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </AnimatedPressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.buttons,
    height: 60,
    borderRadius: 12,
    elevation: 8,
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: fonts.heading,
    color: "white",
  },
});
