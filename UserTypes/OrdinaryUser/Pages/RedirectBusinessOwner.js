import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { logoutUs } from "../../../Redux/Auth/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RedirectBusinessOwner = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user, "dhdhdh");
  const { theme } = useTheme();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    const websiteUrl = "https://www.quicklogisticshub.com/user_login";
    Linking.openURL(websiteUrl);
    console.log(user, " console.log(user, user,);");
    dispatch(logoutUs());
  };

  const logo = require("../../../assets/QuicklogisticsLogo/Logo.png");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        color: theme.text,
        padding: 24,
        // paddingLRight1: 24,
        justifyContent: "center",
      }}
    >
      <View
        style={
          {
            // marginTop: 120,
          }
        }
      >
        <Text
          style={{
            color: theme.text,
            textAlign: "center",
            fontSize: 24,
            marginBottom: 16,
            fontFamily: "MontserratBold",
          }}
        >
          Whoops.........
        </Text>
        <Text
          style={{
            color: theme.text,
            textAlign: "center",
            fontSize: 16,
            fontFamily: "MontserratRegular",
          }}
        >
          Business User not available on our Mobile App, please use our website
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            marginBottom: 50
          }}
        >
          <Image
            source={logo}
            style={{
              width: 64,
              height: 64,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#f1c40f",
            height: 55,
            borderRadius: 788,
            marginTop: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleLogout}
        >
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontFamily: "MontserratBold",
              fontSize: 16,
            }}
          >
            {" "}
            Login using the Web
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RedirectBusinessOwner;
