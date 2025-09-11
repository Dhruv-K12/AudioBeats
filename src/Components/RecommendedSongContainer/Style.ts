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
      borderBottomWidth: 0.7,
      borderColor: colors.buttons,
      borderBottomLeftRadius: 10,
    },
    img: {
      width: 60,
      height: 60,
      borderRadius: 12,
      borderWidth: 0.7,
      borderColor: colors.buttons,
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
