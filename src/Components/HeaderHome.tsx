import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Constants/colors";
import LottieView from "lottie-react-native";
import { useAuthCtx } from "../Context/AuthContext";
import { fonts } from "../Constants/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
const HeaderHome = () => {
  const { user } = useAuthCtx();
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/Animation/Logo.json")}
        style={styles.logo}
        autoPlay={true}
        speed={2}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "85%",
        }}
      >
        <View>
          <Text style={styles.greet}>Hello,</Text>
          <Text style={styles.greet}>Dhruv</Text>
        </View>
        <Ionicons
          name="notifications-circle-sharp"
          size={50}
          color={colors.buttons}
        />
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
  },
  greet: {
    fontFamily: fonts.subHeading,
  },
});
