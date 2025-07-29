import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import { colors } from "../Constants/colors";
const EmailIcon = () => {
  return (
    <Fontisto
      name="email"
      size={24}
      color={colors.buttons}
    />
  );
};

export default EmailIcon;

const styles = StyleSheet.create({});
