import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../Components/AuthInput";
import PasswordIcon from "../../Components/PasswordIcon";
import Button from "../../Components/Button";
import EmailIcon from "../../Components/EmailIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { validateAuth } from "../../Utils/validateAuth";
import { useAuthCtx } from "../../Context/AuthContext";
import { fonts } from "../../Constants/fonts";
import { colors } from "../../Constants/colors";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading, setError } = useAuthCtx();
  const validateHandler = () => {
    if (name.trim().length === 0) {
      setError("Your name is empty");
    } else {
      validateAuth(email, password, setLoading, setError, name);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            style={styles.img}
            source={require("../../../assets/Images/Signup.png")}
          />
          <Text style={styles.text}>
            Please enter your name, email and password to continue
          </Text>
          <AuthInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name "
          >
            <FontAwesome name="user-o" size={24} color="black" />
          </AuthInput>
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
          <Button text="Signup" onPress={validateHandler} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

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
    textAlign: "center",
  },
});
