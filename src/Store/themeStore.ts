import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { royalTheme } from "../Constants/theme";
import { AnimationObject } from "lottie-react-native";

export type themeType = {
  bg: string;
  primaryText: string;
  secondaryText: string;
  buttons: string;
  rare: string;
  logo: AnimationObject;
  splashScreen: AnimationObject;
  visualizer: AnimationObject;
};
type themeStore = {
  theme: themeType;
  setTheme: (theme: themeType) => void;
};
export const usethemeStore = create<themeStore>()(
  persist(
    (set) => ({
      theme: royalTheme,
      setTheme: (theme) => set({ theme: theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
