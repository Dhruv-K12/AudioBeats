import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../Constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../Constants/fonts";
import RecommendedSongContainer from "./RecommendedSongContainer/RecommendedSongContainer";

const MySongDetail = ({ route }: any) => {
  const { item, name } = route.params;
  const queue = item;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{name}</Text>
      <FlatList
        data={item}
        renderItem={({ item }) => (
          <RecommendedSongContainer item={item} id={item.id} queue={queue} />
        )}
      />
    </SafeAreaView>
  );
};

export default MySongDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  heading: {
    fontFamily: fonts.heading,
    margin: 8,
  },
});
