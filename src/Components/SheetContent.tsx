import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { sheetContent } from "./types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fonts } from "../Constants/fonts";
import { usethemeStore } from "../Store/themeStore";
const SheetContent = ({ text, onPress, showArrow, children }: sheetContent) => {
  const textColor = usethemeStore((state) => state.theme.secondaryText);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {children}
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </View>
      {showArrow && <AntDesign name="arrowright" size={24} color={textColor} />}
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
    fontFamily: fonts.subHeading,
    margin: 8,
  },
});
