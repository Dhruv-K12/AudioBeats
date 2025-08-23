import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../Constants/colors";
import { fonts } from "../Constants/fonts";
import { mySongContainerProps } from "./types";

const MySongsContainer = ({
  children,
  text,
  onPress,
}: mySongContainerProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      {children}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MySongsContainer;
const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 200,
    borderRadius: 12,
    backgroundColor: colors.buttons,
    margin: 8,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontFamily: fonts.heading,
  },
});
