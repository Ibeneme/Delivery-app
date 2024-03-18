
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import logoImage from "../../../../../assets/QuicklogisticsLogo/Successilllustration.png";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../../../../../Providers/ThemeProvider";

export default function DeleteFailed() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const navigateToLogin = () => {
    navigation.navigate("Home");
  };


  const { theme } = useTheme();

  return (
    <View
      style={[styles.containerfirst, { backgroundColor: theme.background }]}
    >
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.text}>Hurray!!</Text>
        <Text style={[styles.textsmall, { color: theme.text }]}>
          Order Booked Successfully
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
  },
  container: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 94,
  },
  text: {
    color: "#f1c40f",
    fontSize: 18,
    fontWeight: "600",
    marginTop: "5%",
    fontFamily: "MontserratBold",
  },
  logo: {
    width: 220,
    resizeMode: "contain",
  },
  textsmall: {
    textAlign: "center",
    fontSize: 14,
    marginTop: "5%",
    fontFamily: "MontserratRegular",
  },
  containerButton: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "center",
  },
  buttonClick: {
    backgroundColor: "#f1c40f",
    width: "100%",
    height: 50,
    borderRadius: 4,
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
