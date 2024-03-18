// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import logoImage from "../../../assets/QuicklogisticsLogo/Successilllustration.png";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../../../Providers/ThemeProvider";
import i18n from "../Pages/Localization/i18n";
import { useLocalization } from "../Pages/Localization/LocalizationContext";

export default function Success() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToDashboard = () => {
    navigation.navigate("tab");
  };
  const { theme, toggleTheme } = useTheme();
  const { locale, changeLanguage } = useLocalization();

  const t = (key) => i18n.t(key); // Define the translation function

  return (
    <View
      style={[styles.containerfirst, { backgroundColor: theme.backgroundAuth }]}
    >
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.text}>{i18n.t("mail")}</Text>
        <Text style={[styles.textsmall, { color: theme.text }]}>
        {i18n.t("mailSent")}
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.buttonClick} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>{i18n.t("Login")}</Text>
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
    fontSize: 24,
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
