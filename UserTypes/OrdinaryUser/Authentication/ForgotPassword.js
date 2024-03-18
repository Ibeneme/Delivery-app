import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../Redux/Auth/Auth";
import i18n from "../Pages/Localization/i18n";
import { useLocalization } from "../Pages/Localization/LocalizationContext";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const dispatch = useDispatch();

  const navigateToHome = () => {
    navigation.navigate("Dashboard");
  };
  const navigateToVerifyLogin = () => {
    navigation.navigate("Success-forgot");
  };
  const handleEmailChange = (email) => {
    setError(" ");
    setEmail(email);
  };

  const handleForgotPassword = async () => {
    const userData = {
      email,
    };
    setLoading(true);
    try {
      const response = await dispatch(forgetPassword(userData));
      setLoading(false);
      if (
        response.payload &&
        response.payload.error === "Missing required fields"
      ) {
        setError("Enter your email address");
      } else if (
        response.payload &&
        response.payload.error === "User not found"
      ) {
        setError("User not found");
      } else if (response?.payload?.message === "Password reset email sent") {
        setLoading(false);
        navigateToVerifyLogin();
      } else {
      }
    } catch (error) {}
  };

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontSize: 14,
      height: 55,
      marginTop: 4,
      width: "100%",
      fontFamily: "MontserratRegular",
    },
    errorText: {
      color: "#ff0650",
      marginTop: 4,
      fontSize: 12,
      fontFamily: "MontserratRegular",
    },
    resendText: {
      fontSize: 12,
      color: "#f1c40f",
      textAlign: "right",
      marginTop: 12,
      fontFamily: "MontserratBold",
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
    containerfirst: {
      color: "#ffffff",
      height: "100%",
      padding: 17,
    },
    text: {
      color: theme.text,
      marginTop: 4,
      fontSize: 14,
      fontFamily: "MontserratRegular",
    },
    textBold: {
      color: "#f1c40f",
      fontSize: 18,
      fontFamily: "MontserratBold",
      fontWeight: 900,
      marginTop: 48,
    },
    textSpan: {
      color: "#f1c40f",
      fontSize: 16,
      paddingLeft: 8,
    },
    viewForInputs: {
      marginTop: 48,
      marginBottom: 48,
    },
  });

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
      title: null,
      headerStyle,
      headerTitleStyle,
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
      <View>
        <Text style={styles.textBold}>{i18n.t("forgot")}</Text>
        <Text style={styles.text}>{i18n.t("forgotText")}
        </Text>
      </View>

      <View style={styles.viewForInputs}>
        <View>
          <Text style={styles.text}>{i18n.t("email")}</Text>

          <TextInput
            style={[
              styles.input,
              error && { borderColor: "red" },
              focusedInput === "email" && { borderColor: "#f1c40f" },
            ]}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            value={email}
            onChangeText={handleEmailChange}
            placeholder={i18n.t("emailPlaceholder")}
            placeholderTextColor={`${theme.text}60`}
            autoFocus
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonClick}
          onPress={handleForgotPassword}
        >
          <Text
            style={{
              fontFamily: "MontserratBold",
            }}
          >
            {loading ? <ActivityIndicator color="#000" /> : `${i18n.t("submit")}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
