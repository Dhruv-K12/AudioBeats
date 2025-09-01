import { Keyboard, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderHome from "../../Components/HeaderHome/HeaderHome";
import RecommededSection from "../../Components/RecommededSection";
import { getSongs } from "../../Services/getSongs";
import { useMainCtx } from "../../Context/MainContext";
import { getDownloadedSong } from "../../Storage/getDownloadedSong";
import { getFavourite } from "../../Services/getFavourite";
import { useAuthCtx } from "../../Context/AuthContext";
import RecentSection from "../../Components/RecentSection";
import { getRecentSongs } from "../../Storage/getRecentSongs";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { getPlaylist } from "../../Services/getPlaylist";
import SearchInput from "../../Components/SearchInput";
import { usethemeStore } from "../../Store/themeStore";
const Home = () => {
  const { user } = useAuthCtx();
  const colors = usethemeStore((state) => state.theme);
  const {
    setTabBarHeight,
    setSongs,
    setDownloadedSong,
    setFavourite,
    setRecentSongs,
    setPlaylist,
  } = useMainCtx();
  const tabBarHeight = useBottomTabBarHeight();
  const dismissKeyboard = () => Keyboard.dismiss();
  useEffect(() => {
    const unsubscribe: (() => void)[] = [];
    unsubscribe.push(getSongs(setSongs));
    if (user?.uid) {
      unsubscribe.push(getFavourite(user?.uid, setFavourite));
      unsubscribe.push(getPlaylist(user?.uid, setPlaylist));
    }
    setTabBarHeight(tabBarHeight);
    getDownloadedSong(setDownloadedSong);
    getRecentSongs(setRecentSongs);
    return () => {
      unsubscribe.forEach((unsub) => unsub && unsub());
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Pressable style={{ flex: 1 }} onPress={dismissKeyboard}>
        <HeaderHome />
        <SearchInput />
        <RecentSection />
        <RecommededSection />
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
