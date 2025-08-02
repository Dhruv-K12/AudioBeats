import { StyleSheet } from "react-native";
import React from "react";
import { colors } from "../Constants/colors";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useMainCtx } from "../Context/MainContext";
import Entypo from "@expo/vector-icons/Entypo";

const BottomSheet = ({}) => {
  const { sheetHeight } = useMainCtx();
  const container = useAnimatedStyle(() => {
    return {
      height: interpolate(
        sheetHeight.value,
        [0, 1],
        [0, 300]
      ),
      opacity: interpolate(
        sheetHeight.value,
        [0, 1],
        [0, 1]
      ),
    };
  });
  return (
    <Animated.View style={[styles.container, container]}>
      <Entypo
        name="chevron-down"
        size={30}
        color={"white"}
        style={{ alignSelf: "center" }}
      />
    </Animated.View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: colors.buttons,
    alignSelf: "center",
    borderRadius: 12,
    position: "absolute",
    bottom: 0,
  },
});
