
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Linking,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTheme } from "../../../Providers/ThemeProvider";
import i18n from "i18n-js";
// import * as Localization from "expo-localization";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../Redux/Translation/Translation";
import { useLocalization } from "../Pages/Localization/LocalizationContext";

export default function SecondScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLanguage(language));
  }, [dispatch]);
  const language = useSelector((state) => state.language);

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
    navigation.navigate("ThirdScreen");
  };

  const { theme } = useTheme();

  const logoImage = require("../../../assets/QuicklogisticsLogo/Logo.png");
  console.log(language, "fll");

  const handleTermsLinkPress = () => {
    const termsURL = "https://www.quicklogisticshub.com/terms";
    Linking.openURL(termsURL);
  };

  const handleTermsLinkPressPrivacy = () => {
    const termsURL = "https://www.quicklogisticshub.com/privacypolicy";
    Linking.openURL(termsURL);
  };

  const { locale, changeLanguage } = useLocalization();

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
        <Text style={styles.text}>QuickLogisticsHub</Text>
        <TouchableOpacity>
          <Text
            onPress={handleTermsLinkPress}
            style={[styles.textsmall, { color: theme.text }]}
          >
            {i18n.t("termsAndConditions")}
            {""}

            <Text
              style={{
                color: "#f1c40f",
              }}
            >
              {" "}
              {i18n.t("terms")} and {""}
            </Text>
            <Text style={[styles.textsmall, { color: theme.text }]}>
              and {""}
            </Text>
            <Text
              onPress={handleTermsLinkPressPrivacy}
              style={{
                color: "#f1c40f",
              }}
            >
              {""}
              {i18n.t("privacy")} {/* {i18n.t("clickToRead")} */}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.buttonClick} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>{i18n.t("existingUser")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonClick}
          onPress={navigateToCreateAccount}
        >
          <Text style={styles.buttonText}> {i18n.t("newUser")}</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={handleTermsLinkPress}>
          <Text
            style={[styles.textsmall, { color: theme.text, marginBottom: 200 }]}
          >
            {i18n.t("termsAndConditions")}
            <Text
              style={{
                color: "#f1c40f",
              }}
            >
              {" "}
              {i18n.t("clickToRead")}
            </Text>
          </Text>
        </TouchableOpacity> */}
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
    fontSize: 18,

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
