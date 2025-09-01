import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usethemeStore } from "../Store/themeStore";
import { fonts } from "../Constants/fonts";
import { defaultTheme, royalTheme } from "../Constants/theme";
const radius = 12;
const insideRadius = radius - 2;
const ThemeSelector = () => {
  const colors = usethemeStore((state) => state.theme);
  const setTheme = usethemeStore((state) => state.setTheme);
  const selectRoyalTheme = () =>
    colors.bg !== royalTheme.bg && setTheme(royalTheme);
  const selectDefaultTheme = () =>
    colors.bg !== defaultTheme.bg && setTheme(defaultTheme);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Ionicons name="color-palette" size={30} color={colors.buttons} />
        <Text style={{ fontFamily: fonts.subHeading, color: colors.buttons }}>
          Theme
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Pressable
          onPress={selectRoyalTheme}
          style={[
            styles.colorSelector,
            colors.bg == royalTheme.bg && styles.selectedTheme,
          ]}
        >
          <View
            style={[
              styles.color,
              styles.topColor,
              { backgroundColor: "#F7EDD9" },
            ]}
          />
          <View
            style={[
              styles.color,
              styles.bottomColor,
              { backgroundColor: "#450403" },
            ]}
          />
        </Pressable>
        <Pressable
          onPress={selectDefaultTheme}
          style={[
            styles.colorSelector,
            colors.bg == defaultTheme.bg && styles.selectedTheme,
          ]}
        >
          <View
            style={[
              styles.color,
              styles.topColor,
              { backgroundColor: "#372772" },
            ]}
          />
          <View
            style={[
              styles.color,
              styles.bottomColor,
              { backgroundColor: "#C5BAFF" },
            ]}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ThemeSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    justifyContent: "space-around",
  },
  colorSelector: {
    width: 40,
    height: 40,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    borderRadius: radius,
  },
  color: {
    width: "100%",
    height: "50%",
  },
  topColor: {
    borderTopLeftRadius: insideRadius,
    borderTopRightRadius: insideRadius,
  },
  bottomColor: {
    borderBottomLeftRadius: insideRadius,
    borderBottomRightRadius: insideRadius,
  },
  selectedTheme: {
    borderColor: "green",
    elevation: 10,
  },
});
