import { fonts } from "../../Constants/fonts";
import { themeType } from "../../Store/themeStore";
import { StyleSheet } from "react-native";
export const getStyles = (colors: themeType) => {
  return StyleSheet.create({
    container: {
      width: "95%",
      alignSelf: "center",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
    },
    logo: {
      width: 60,
      height: 60,
    },
    greet: {
      fontFamily: fonts.subHeading,
      color: colors.primaryText,
    },
    settingsLogo: {
      width: 42,
      height: 42,
      borderRadius: 30,
      backgroundColor: colors.buttons,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
