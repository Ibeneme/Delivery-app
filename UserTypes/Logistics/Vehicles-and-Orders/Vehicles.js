import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../../Providers/ThemeProvider";

const Vehicles = () => {
const theme = useTheme();
  return (
    <View
      style={{
        borderColor: "#f1c40f",
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: theme.background,
      }}
    >
      <View>
        <Text>Type</Text>
        <Text>Capacity</Text>
      </View>
      <View>
        <Text>$23,000</Text>
      </View>
    </View>
  );
};

export default Vehicles;
