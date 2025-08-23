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
  const { songs, currSong } = useMainCtx();
  return (
    <View
      style={[
        styles.container,
        { flex: currSong ? 0.85 : 1 },
      ]}
    >
      <Text style={styles.heading}>Recommeded for you</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={songs}
        renderItem={({ item }) => (
          <RecommendedSongContainer
            item={item}
            id={item.id}
          />
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
