import { fonts } from "../../Constants/fonts";
import { themeType } from "../../Store/themeStore";
import { StyleSheet } from "react-native";
export const getStyles = (colors: themeType) => {
  return StyleSheet.create({
    songContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 8,
      borderBottomWidth: 0.8,
      borderColor: colors.buttons,
    },
    img: {
      width: 60,
      height: 60,
      borderRadius: 12,
    },
    textContainer: {
      margin: 5,
    },
    text: {
      color: colors.buttons,
      fontFamily: fonts.subHeading,
    },
    btn: {
      flexDirection: "row",
      width: "90%",
      justifyContent: "space-between",
    },
  });
};
