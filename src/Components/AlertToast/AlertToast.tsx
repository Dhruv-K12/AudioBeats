import { Text } from "react-native";
import React, { useEffect } from "react";
import Foundation from "@expo/vector-icons/Foundation";
import { useAuthCtx } from "../../Context/AuthContext";
import Animated, {
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getStyles } from "./Style";
import { usethemeStore } from "../../Store/themeStore";
const AlertToast = () => {
  const { error, setError } = useAuthCtx();
  const colors = usethemeStore((state) => state.theme);
  const styles = getStyles(colors);
  const topInsert = useSafeAreaInsets().top;
  const progress = useSharedValue(0);
  const resetError = () => setError("");
  const containerStyle = useAnimatedStyle(() => {
    return {
      top: topInsert,
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
      pointerEvents="none"
      style={[styles.container, containerStyle]}
    >
      <Foundation name="alert" size={30} color={colors.secondaryText} />
      <Text style={styles.text}>{error}</Text>
    </Animated.View>
  );
};

export default AlertToast;
