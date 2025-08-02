import { Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../Constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderHome from "../../Components/HeaderHome";
import RecommededSection from "../../Components/RecommededSection";
import MiniPlayer from "../../Components/MiniPlayer";
import { getSongs } from "../../Services/getSongs";
import { useMainCtx } from "../../Context/MainContext";
import BottomSheet from "../../Components/BottomSheet";
import { withSpring } from "react-native-reanimated";
const Home = () => {
  const { setSongs, sheetHeight } = useMainCtx();
  const closeBottomSheet = () => {
    sheetHeight.value = withSpring(0);
  };
  useEffect(() => {
    getSongs(setSongs);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={closeBottomSheet}
        style={styles.container}
      >
        <HeaderHome />
        <RecommededSection />
        <MiniPlayer />
        <BottomSheet />
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
