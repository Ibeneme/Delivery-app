
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../../../Providers/ThemeProvider";

export default function MarketPlaceSuccess() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      
    });
  }, [navigation]);

  const navigateToLogin = () => {
    navigation.navigate("tabs");
  };

  const { theme } = useTheme();
  const logoImage = require("../../../assets/QuicklogisticsLogo/Successilllustration.png");

  return (
    <View
      style={[styles.containerfirst, { backgroundColor: theme.backgroundAuth }]}
    >
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />

        <Text style={styles.text}>Delivery Accepted Successfully</Text>
        <Text style={[styles.textsmall, { color: theme.text }]}>
          Order processed Successfully
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
    //padding: 16,
    flex: 1,
    flexGrow: 1,
  },
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#f1c40f",
    fontSize: 14,
    fontWeight: "600",
    marginTop: "5%",
    textAlign: "center",
    fontFamily: "MontserratBold",
  },
  logo: {
    width: 220,
    resizeMode: "contain",
    marginTop: 120,
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
