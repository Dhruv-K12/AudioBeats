import { fonts } from "../../../Constants/fonts";
import { themeType } from "../../../Store/themeStore";
import { StyleSheet } from "react-native";
export const getStyles = (colors: themeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      padding: 8,
    },
    optionsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    selectedChip: {
      backgroundColor: colors.buttons,
    },
    unselectedChip: {
      backgroundColor: colors.secondaryText,
    },
    errorContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      alignSelf: "center",
      padding: 8,
    },
    playlistContainer: {
      flexDirection: "row",
      margin: 10,
      width: "70%",
    },
    playlistIcon: {
      width: 50,
      height: 50,
      elevation: 12,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      marginRight: 8,
    },

    playlistText: {
      fontFamily: fonts.subHeading,
      color: colors.primaryText,
    },
  });
};
