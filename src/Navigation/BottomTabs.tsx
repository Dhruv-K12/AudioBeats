import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Main/Home";
import MySongs from "../Screens/Main/MySongs/MySongs";
import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";
import MiniPlayer from "../Components/MiniPlayer/MiniPlayer";
import { usethemeStore } from "../Store/themeStore";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const BottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  const colors = usethemeStore((state) => state.theme);

  return (
    <View style={{ flex: 1 }}>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.bg,
            borderColor: colors.bg,
          },
          tabBarActiveTintColor: colors.buttons,
        }}
      >
        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={26}
                color={colors.buttons}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="My Songs"
          component={MySongs}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "musical-notes" : "musical-notes-outline"}
                size={26}
                color={colors.buttons}
              />
            ),
          }}
        />
      </Tabs.Navigator>
      <MiniPlayer />
    </View>
  );
};

export default BottomTabs;
