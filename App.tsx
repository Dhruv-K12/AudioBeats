import { StatusBar, StyleSheet } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { AuthContextProvider } from "./src/Context/AuthContext";
import { colors } from "./src/Constants/colors";
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <AuthContextProvider>
        <Navigation />
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
