import { StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import MusicDetail from "../Screens/Main/MusicDetail/MusicDetail";
import { rootMainStackParmList } from "./type";
import MySongDetail from "../Components/MySongDetail";
import PlaylistSongs from "../Screens/Main/PlaylistSongs";
import Setting from "../Screens/Main/Setting";

const MainStack = () => {
  const Stack = createNativeStackNavigator<rootMainStackParmList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen
        name="MusicDetail"
        component={MusicDetail}
        options={{
          animation: "slide_from_bottom",
          animationDuration: 800,
          animationTypeForReplace: "pop",
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen name="MySongDetail" component={MySongDetail} />
      <Stack.Screen name="PlaylistSongs" component={PlaylistSongs} />
      <Stack.Screen name="Settings" component={Setting} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
