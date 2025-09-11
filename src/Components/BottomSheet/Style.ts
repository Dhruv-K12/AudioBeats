import { fonts } from "../../Constants/fonts";
import { themeType } from "../../Store/themeStore";
import { StyleSheet } from "react-native";
export const getStyles = (colors: themeType) => {
  return StyleSheet.create({
    container: {
      width: "98%",
      backgroundColor: colors.buttons,
      alignSelf: "center",
      borderRadius: 12,
      position: "absolute",
      bottom: 0,
    },
    songContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    img: {
      width: 60,
      height: 60,
      borderRadius: 8,
      margin: 8,
    },
    txt: {
      color: colors.secondaryText,
      fontFamily: fonts.heading,
      margin: 8,
    },
    playlistContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 8,
    },
    inputContainer: {
      width: "95%",
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      margin: 8,
      justifyContent: "space-between",
    },
    input: {
      backgroundColor: "white",
      width: "70%",
      borderRadius: 8,
      fontFamily: fonts.subHeading,
      color: "black",
    },
    playlistItem: {
      width: "95%",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 8,
      alignItems: "center",
    },
    addIconContainer: {
      width: 30,
      height: 30,
      backgroundColor: "white",
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
