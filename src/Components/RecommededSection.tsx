import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fonts } from "../Constants/fonts";
import RecommendedSongContainer from "./RecommendedSongContainer/RecommendedSongContainer";
import { useMainCtx } from "../Context/MainContext";
import { songType } from "../Types/types";
import { searchSong } from "../Services/searchSong";
import { usethemeStore } from "../Store/themeStore";
import { useSongsStore } from "../Store/songsStore";

const RecommededSection = () => {
  const colors = usethemeStore((state) => state.theme);
  const songs = useSongsStore((state) => state.songs);
  const { currSong, searchVal } = useMainCtx();
  const [searchData, setSearchData] = useState<songType[]>([]);
  useEffect(() => {
    if (searchVal.trim().length !== 0) {
      searchSong(setSearchData, searchVal);
    }
  }, [searchVal]);
  return (
    <View
      style={[
        styles.container,
        {
          flex: currSong ? 0.85 : 1,
        },
      ]}
    >
      {searchVal.trim().length == 0 && (
        <Text style={[styles.heading, { color: colors.primaryText }]}>
          Recomended For You
        </Text>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchVal.trim().length === 0 ? songs : searchData}
        renderItem={({ item }) => (
          <RecommendedSongContainer item={item} id={item.id} />
        )}
      />
    </View>
  );
};

export default RecommededSection;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  heading: {
    fontFamily: fonts.heading,
  },
});
