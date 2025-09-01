import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SettingOptionProps } from "./types";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { colors } from "../Constants/colors";
import { fonts } from "../Constants/fonts";

const SettingOption = ({ children, title, onPress }: SettingOptionProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "30%",
        }}
      >
        {children}
        <Text style={styles.text}>{title}</Text>
      </View>
      <EvilIcons name="chevron-right" size={34} color={colors.buttons} />
    </TouchableOpacity>
  );
};

export default SettingOption;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: colors.buttons,
    fontFamily: fonts.heading,
  },
});
