import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Intro from "../Screens/Authentication/Intro";
import Login from "../Screens/Authentication/Login";
import SignUp from "../Screens/Authentication/SignUp";
import { routeAuthStackParamList } from "./type";

const AuthStack = () => {
  const Stack =
    createNativeStackNavigator<routeAuthStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
