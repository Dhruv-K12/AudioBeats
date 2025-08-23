import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fonts } from "../Constants/fonts";
import { colors } from "../Constants/colors";
import { useMainCtx } from "../Context/MainContext";
const SearchInput = () => {
  const { searchVal, setSearchVal } = useMainCtx();
  return (
    <View style={styles.searchInputContainer}>
      <AntDesign name="search1" size={24} color="black" />
      <TextInput
        value={searchVal}
        onChangeText={(value) => setSearchVal(value)}
        style={styles.searchInput}
        placeholder="Search songs or artist..."
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchInputContainer: {
    width: "95%",
    backgroundColor: "white",
    height: 50,
    alignSelf: "center",
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
  },
  searchInput: {
    width: "90%",
    fontFamily: fonts.subHeading,
    height: 50,
    margin: 8,
    color: colors.buttons,
  },
});
