import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
