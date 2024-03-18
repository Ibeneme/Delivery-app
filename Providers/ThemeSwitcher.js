import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { useTheme } from "./ThemeProvider";

export const ThemeSwitcher = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleTheme();
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#f1c40f" }}
        thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    alignItems: "flex-end",
    paddingRight: 16,
    paddingTop: 8,
  },
})