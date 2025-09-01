import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AuthInputProps } from "./types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../Constants/colors";
import { fonts } from "../Constants/fonts";

const AuthInput = ({
  children,
  placeholder,
  value,
  onChangeText,
  showPassword,
}: AuthInputProps) => {
  const [pass, showPass] = useState(false);
  const togglePassword = () => showPass((state) => !state);
  return (
    <View style={styles.container}>
      {children}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!pass && showPassword}
      />
      {showPassword && (
        <TouchableOpacity onPress={togglePassword}>
          <Ionicons name={pass ? "eye" : "eye-off"} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    padding: 8,
    margin: 8,
  },
  input: {
    marginLeft: 8,
    color: colors.bg,
    width: "80%",
    height: 60,
    fontFamily: fonts.heading,
  },
});
