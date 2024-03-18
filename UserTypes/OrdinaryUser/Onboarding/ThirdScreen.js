
import {
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import logoImage from "../../../assets/QuicklogisticsLogo/Logo.png";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useLocalization } from "../Pages/Localization/LocalizationContext";
import i18n from "../Pages/Localization/i18n";

export default function ThirdScreen() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  const navigateToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };
  const navigateToLogisticsCreateAccount = () => {
    navigation.navigate("LogisticsCreateAccount");
  };
  const { theme } = useTheme();

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle,
      headerTitleStyle: {
        fontFamily: "MontserratRegular",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const { locale, changeLanguage } = useLocalization();

  const t = (key) => i18n.t(key); // Define the translation function

  const handleLanguageChange = () => {
    const newLanguage = locale === "en" ? "fr" : "en";
    changeLanguage(newLanguage);
  };


  
  return (
    <View
      style={[styles.containerfirst, { backgroundColor: theme.backgroundAuth }]}
    >
      {/* <View>
        <Text>{locale === "en" ? "English" : "Français"}</Text>
        <Text>{i18n.t("greeting")}</Text>
        <Text>{i18n.t("farewell")}</Text>
        <Button title="Change Language" onPress={handleLanguageChange} />
      </View> */}

      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.text}>QuickLogistics Hub</Text>
        {/* <Text style={[styles.textsmall, { color: theme.text }]}>
          Lorem ipsum dolor sit amet consectetur. Fermentum turpis est sem
          scelerisque aliquet et orci nibh. Velit dictum enim curabitur
          tincidunt tincidunt egestas diam. Sit tortor sit vel ac.
        </Text> */}
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.buttonClick}
          onPress={navigateToCreateAccount}
        >
          <Text style={styles.buttonText}>{i18n.t("signupLogistics")}</Text>
        </TouchableOpacity>
        {/*    <TouchableOpacity
          style={styles.buttonClick}
          onPress={navigateToBusinessCreateAccount}
        >
          <Text style={styles.buttonText}>Sign up as Business User</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.buttonClick}
          onPress={navigateToLogisticsCreateAccount}
        >
          <Text style={styles.buttonText}>{i18n.t("signupLogisticsProvider")}</Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 24,
            color: theme.text,
            textAlign: "center",
            fontFamily: "MontserratRegular",
          }}
          onPress={navigateToLogin}
        >
        {i18n.t("alreadyHave")} {""}
          <Text
            style={{
              color: "#f1c40f",
              textAlign: "center",
              fontFamily: "MontserratBold",
            }}
          >
              {i18n.t("Login")}
          </Text>
        </Text>
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
    flex: 2,
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
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  textsmall: {
    color: "#ffffff",
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
    height: 55,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 13,
    fontFamily: "MontserratBold",
  },
});
