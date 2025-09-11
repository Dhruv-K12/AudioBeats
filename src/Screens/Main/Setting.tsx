import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fonts } from "../../Constants/fonts";
import { useNavigation } from "@react-navigation/native";
import { navigationType } from "../../Types/types";
import ThemeSelector from "../../Components/ThemeSelector";
import { usethemeStore } from "../../Store/themeStore";
const Setting = () => {
  const colors = usethemeStore((state) => state.theme);
  const navigation = useNavigation<navigationType>();
  const goBackHandle = () => navigation.goBack();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBackHandle}>
          <Ionicons name="arrow-back" size={34} color={colors.buttons} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fonts.heading, color: colors.buttons }}>
          Setting
        </Text>
      </View>
      <ThemeSelector />
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-around",
    alignSelf: "flex-start",
    margin: 8,
    alignItems: "center",
  },
});
