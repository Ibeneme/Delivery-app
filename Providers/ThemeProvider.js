import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

const lightThemeColors = {
  background: "#f4f4f4",
  text: "#000000",
  views: "#ffffff",
  walletViews: "#ffffff",
  backgroundAuth: "#ffffff",
  edge: "#ffffff",
  edgeColor: "#000000",
  backgroundDark: "#fff",
  main: "#f1c40f",
};

const darkThemeColors = {
  background: "#131418",
  text: "#CDD1D6",
  views: "#ffffff09",
  walletViews: "#ffffff10",
  backgroundAuth: "#131418",
  backgroundDark: "#000",
  edge: "#f1c40f",
  edgeColor: "#f1c40f",
  main: "#f1c40f",
};

export const ThemeProvider = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(deviceColorScheme === "dark");

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedThemePreference = await AsyncStorage.getItem(
          "themePreference"
        );
        if (storedThemePreference !== null) {
          setDarkMode(storedThemePreference === "dark");
        } else {
          setDarkMode(deviceColorScheme === "dark");
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
      }
    };

    loadThemePreference();
  }, [deviceColorScheme]);

  const saveThemePreference = async (isDarkModeEnabled) => {
    try {
      await AsyncStorage.setItem(
        "themePreference",
        isDarkModeEnabled ? "dark" : "light"
      );
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    saveThemePreference(newDarkMode);
  };

  const theme = darkMode ? darkThemeColors : lightThemeColors;

  return (
    <ThemeContext.Provider
      value={{ isDarkModeEnabled: darkMode, toggleTheme, theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
