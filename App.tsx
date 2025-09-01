import { StyleSheet } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContextProvider } from "./src/Context/AuthContext";
import { MainCtxProvider } from "./src/Context/MainContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <MainCtxProvider>
            <Navigation />
          </MainCtxProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
