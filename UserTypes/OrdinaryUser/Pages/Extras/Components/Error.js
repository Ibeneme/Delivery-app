
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import logoImage from "./images/material-symbols_error-rounded.png";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useEffect } from "react";
import { useTheme } from "../../../../../Providers/ThemeProvider";

export default function Err() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const previousScreens = useRef([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      const currentRoute = e.data.state.routes.slice(-1)[0];

      previousScreens.current.push(currentRoute.name);

      if (previousScreens.current.length > 5) {
        previousScreens.current.shift();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToLogin = () => {
    if (previousScreens.current.includes("Wallet")) {
      navigation.navigate("Wallet");
    } else {
      navigation.navigate("Home");
    }
  };

  const navigateToDashboard = () => {
    navigation.navigate("Home");
  };
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={[styles.containerfirst, { backgroundColor: theme.background }]}
    >
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />

        <Text style={styles.text}>Payment Failed</Text>
        <Text style={[styles.textsmall, { color: theme.text }]}>
          Payment unsuccessful
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.buttonClick} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Proceed to Home</Text>
        </TouchableOpacity>
      </View>
  
    </View>
  );
}

const styles = StyleSheet.create({
  containerfirst: {
    color: "#ffffff",
    height: "100%",
    padding: 16,
    // flex: 1,
    flexGrow: 1,
  },
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#f1c40f",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "5%",
    fontFamily: "MontserratBold",
  },
  logo: {
    width: 220,
    resizeMode: "contain",
   // marginTop: 120,
  },
  textsmall: {
    textAlign: "center",
    fontSize: 14,
    marginTop: "2%",
    fontFamily: "MontserratRegular",
  },
  containerButton: {
    width: "100%",
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24,
    justifyContent: "center",
  },
  buttonClick: {
    backgroundColor: "#f1c40f",
    width: "100%",
    height: 50,
    borderRadius: 444,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "MontserratBold",
  },
});
