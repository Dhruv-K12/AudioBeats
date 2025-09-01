import { fonts } from "../../Constants/fonts";
import { themeType } from "../../Store/themeStore";
import { StyleSheet } from "react-native";
export const getStyles = (colors: themeType) => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      alignSelf: "center",
      backgroundColor: colors.buttons,
      zIndex: 999,
      alignItems: "center",
      flexDirection: "row",
      borderRadius: 20,
      padding: 16,
    },
    text: {
      width: "80%",
      color: colors.secondaryText,
      fontFamily: fonts.heading,
      textAlign: "center",
    },
  });
};
