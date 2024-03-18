
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "../../../../../Providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDeliveries } from "../../../../../Redux/Deliveries/Deliveries";

export default function DeleteSuccess() {
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { success } = useSelector((state) => state?.delivery);

  const logoImage = require("../../../../../assets/QuicklogisticsLogo/Successilllustration.png");

  useEffect(() => {
    dispatch(fetchAllDeliveries());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(success?.data)) {
      setDeliveries(success);
    } else {
    }
  }, [success?.data]);

  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigateToLogin = () => {
    navigation.navigate("Home");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const route = useRoute();
  const { deleted } = route.params;
  console.log(deleted, '  const [Errdates, ErrSetdates] = useState("");');
  return (
    <View
      style={[styles.containerfirst, { backgroundColor: theme.backgroundAuth }]}
    >
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.text}>Whoops</Text>
        <Text style={[styles.textsmall, { color: theme.text }]}>
          You {deleted} an order
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
