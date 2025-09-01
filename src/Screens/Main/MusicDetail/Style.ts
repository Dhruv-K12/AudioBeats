import { fonts } from "../../../Constants/fonts";
import { themeType } from "../../../Store/themeStore";
import { StyleSheet } from "react-native";
export const getStyles = (colors: themeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      alignItems: "center",
    },
    header: {
      flexDirection: "row",
      width: "95%",
      justifyContent: "space-between",
      margin: 8,
    },
    headerText: {
      color: colors.primaryText,
      fontFamily: fonts.heading,
    },
    img: {
      width: "95%",
      height: "42%",
      resizeMode: "cover",
      borderRadius: 12,
      margin: 12,
    },
    sliderContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    slider: {
      width: "70%",
      margin: 8,
    },
    sliderText: {
      color: colors.buttons,
    },
    functionalityContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "90%",
      alignItems: "center",
      margin: 8,
    },
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      margin: 16,
      alignSelf: "center",
    },
  });
};
