import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { sheetContent } from "./types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fonts } from "../Constants/fonts";
const SheetContent = ({
  text,
  onPress,
  showArrow,
  children,
}: sheetContent) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {children}
        <Text style={styles.text}>{text}</Text>
      </View>
      {showArrow && (
        <AntDesign
          name="arrowright"
          size={24}
          color="white"
        />
      )}
    </TouchableOpacity>
  );
};

export default SheetContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  text: {
    color: "white",
    fontFamily: fonts.subHeading,
    margin: 8,
  },
});
