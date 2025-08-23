import { StyleSheet } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContextProvider } from "./src/Context/AuthContext";
import { colors } from "./src/Constants/colors";
import { MainCtxProvider } from "./src/Context/MainContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={styles.container}>
        <AuthContextProvider>
          <MainCtxProvider>
            <Navigation />
          </MainCtxProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
