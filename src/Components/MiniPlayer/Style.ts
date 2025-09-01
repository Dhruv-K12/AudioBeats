import { fonts } from "../../Constants/fonts";
import { themeType } from "../../Store/themeStore";
import { StyleSheet } from "react-native";
export const getStyles = (colors: themeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: "absolute",
      alignItems: "center",
    },
    mainContainer: {
      width: "95%",
      height: 70,
      backgroundColor: colors.buttons,
      borderRadius: 12,
      margin: 4,
      flexDirection: "row",
      elevation: 12,
      justifyContent: "space-between",
    },
    img: {
      width: 70,
      height: 70,
      borderRadius: 12,
    },
    textContainer: {
      margin: 8,
    },
    text: {
      fontFamily: fonts.subHeading,
      color: colors.secondaryText,
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: "40%",
    },
    slider: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "80%",
    },
    animation: {
      width: 30,
      height: 30,
    },
  });
};
