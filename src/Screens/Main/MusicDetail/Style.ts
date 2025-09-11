import { fonts } from "../../../Constants/fonts";
import { themeType } from "../../../Store/themeStore";
import { Dimensions, StyleSheet } from "react-native";
export const getStyles = (colors: themeType) => {
  const { width, height } = Dimensions.get("window");
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
      width: width - 24,
      height: height / 3 + 80,
      resizeMode: "stretch",
      borderRadius: 12,
      margin: 12,
      borderWidth: 1,
      borderColor: colors.buttons,
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
      alignSelf: "center",
    },
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "70%",
      marginTop: 16,
      alignSelf: "center",
    },
  });
};
