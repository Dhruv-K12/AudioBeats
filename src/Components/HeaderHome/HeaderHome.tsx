import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMainCtx } from "../../Context/MainContext";
import { useAuthCtx } from "../../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { navigationType } from "../../Types/types";
import { usethemeStore } from "../../Store/themeStore";
import { getStyles } from "./Style";
import { fonts } from "../../Constants/fonts";
const HeaderHome = () => {
  const colors = usethemeStore((state) => state.theme);
  const styles = getStyles(colors);
  const { playing, searchVal } = useMainCtx();
  const { user } = useAuthCtx();
  const navigation = useNavigation<navigationType>();
  const navigateToSettings = () => navigation.navigate("Settings");
  if (searchVal.trim().length !== 0) return;
  return (
    <View style={styles.container}>
      <LottieView
        source={colors.logo}
        style={styles.logo}
        autoPlay={playing}
        loop={playing}
        speed={3}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={[styles.greet, { fontFamily: fonts.heading }]}>
            Hello,
          </Text>
          <Text style={styles.greet}>{user?.displayName}</Text>
        </View>
        <TouchableOpacity
          onPress={navigateToSettings}
          style={styles.settingsLogo}
        >
          <Ionicons name="settings-outline" size={26} color={colors.bg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderHome;
