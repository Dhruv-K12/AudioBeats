import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Main/Home";
import MySongs from "../Screens/Main/MySongs";
import { colors } from "../Constants/colors";
import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";
import MiniPlayer from "../Components/MiniPlayer";
const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <View style={{ flex: 1 }}>
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
      <MiniPlayer />
    </View>
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
