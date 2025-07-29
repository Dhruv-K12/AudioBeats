import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../Constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import LottieView from "lottie-react-native";
import { introProps } from "./type";
import { fonts } from "../../Constants/fonts";

const Intro = ({ navigation }: introProps) => {
  const navigateToLogin = () =>
    navigation.navigate("Login");
  const navigateToSignUp = () =>
    navigation.navigate("SignUp");
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require("../../../assets/Animation/Logo.json")}
        style={styles.logo}
        autoPlay
        speed={2.5}
      />
      <Text style={styles.title}>AudioBeats</Text>
      <Text style={styles.description}>
        AudipBeats is your personal music companion —
        simple, stylish, and immersive. Whether you’re
        relaxing, studying, working out, or just vibing,
        AuraBeat delivers the perfect sound experience. With
        a clean design and smooth controls, enjoy your music
        anytime, anywhere.
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={navigateToSignUp}
        >
          <Text style={styles.btnText}>Get Started</Text>
          <AntDesign
            name="arrowright"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.text}>
            Already have an account?Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    padding: 8,
  },
  logo: {
    width: "100%",
    height: "30%",
  },
  title: {
    color: colors.text,
    fontSize: 16,
    margin: 12,
    fontFamily: fonts.heading,
  },
  description: {
    fontFamily: fonts.subHeading,
  },
  btn: {
    width: "95%",
    backgroundColor: colors.buttons,
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 8,
    margin: 12,
    elevation: 12,
  },
  btnText: {
    color: "white",
  },
  text: {
    color: colors.text,
  },
});
