import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Main/Home";
import MySongs from "../Screens/Main/MySongs";
import { colors } from "../Constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator screenOptions={containerConfig}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={homeConfig}
      />
      <Tabs.Screen
        name="My Songs"
        component={MySongs}
        options={mySongsConfig}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabs;

const containerConfig = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: colors.bg,
    borderColor: colors.bg,
  },
};

const homeConfig = {
  tabBarIcon: () => (
    <Feather name="home" size={24} color={colors.buttons} />
  ),
};
const mySongsConfig = {
  tabBarIcon: () => (
    <Feather
      name="music"
      size={24}
      color={colors.buttons}
    />
  ),
};
