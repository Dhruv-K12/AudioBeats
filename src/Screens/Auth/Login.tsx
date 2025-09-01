import { Image, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../Components/AuthInput";
import EmailIcon from "../../Components/EmailIcon";
import PasswordIcon from "../../Components/PasswordIcon";
import Button from "../../Components/Button";
import { validateAuth } from "../../Utils/validateAuth";
import { useAuthCtx } from "../../Context/AuthContext";
import { colors } from "../../Constants/colors";
import { fonts } from "../../Constants/fonts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading, setError } = useAuthCtx();
  const validateHandler = async () => {
    setLoading(true);
    await validateAuth(email, password, setLoading, setError);
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../../assets/Images/Login.png")}
      />
      <Text style={styles.text}>
        Please enter your email and password to continue
      </Text>

      <AuthInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email "
      >
        <EmailIcon />
      </AuthInput>
      <AuthInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password "
        showPassword
      >
        <PasswordIcon />
      </AuthInput>
      <Button text="Login" onPress={validateHandler} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  img: {
    width: "90%",
    resizeMode: "contain",
    height: "30%",
    margin: 12,
  },
  text: {
    fontFamily: fonts.subHeading,
    color: colors.primaryText,
  },
});

export default Login;
