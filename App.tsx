import { StatusBar, StyleSheet } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { AuthContextProvider } from "./src/Context/AuthContext";
import { colors } from "./src/Constants/colors";
import { MainCtxProvider } from "./src/Context/MainContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <AuthContextProvider>
        <MainCtxProvider>
          <GestureHandlerRootView>
            <Navigation />
          </GestureHandlerRootView>
        </MainCtxProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
