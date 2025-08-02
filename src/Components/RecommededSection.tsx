import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { fonts } from "../Constants/fonts";
import RecommendedSongContainer from "./RecommendedSongContainer";
import { useMainCtx } from "../Context/MainContext";

const RecommededSection = () => {
  const { songs } = useMainCtx();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recommeded for you</Text>
      <FlatList
        data={songs}
        renderItem={({ item }) => (
          <RecommendedSongContainer item={item} />
        )}
      />
    </View>
  );
};

export default RecommededSection;

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  heading: {
    fontFamily: fonts.heading,
  },
});
