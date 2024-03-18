import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../../Providers/ThemeProvider";
import { fetchAllDeliveries } from "../../../../../Redux/Deliveries/Deliveries";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../../../Redux/Users/Users";
import { fetchNotifications } from "../../../../../Redux/Notifications/Notifications";

export default function Successss() {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDeliveries());
  }, [dispatch]);



  const userr = useSelector((state) => state?.profile?.success?.data?.fullName);
  const user = useSelector((state) => state.auth.user);
  const ordinaryUserId = user?.ordinaryUserId;

  useEffect(() => {
    dispatch(fetchUser({ ordinaryUserId }))
      .then((response) => {
      })
      .catch((error) => {});
  }, [userr]);

  const notifications = useSelector(
    (state) => state?.notifications?.notifications
  );
  const loadingNotifications = useSelector(
    (state) => state?.notifications.loading
  );
  const successNotifications = useSelector(
    (state) => state?.notifications.success
  );

  useEffect(() => {
    dispatch(fetchNotifications());
    if (loadingNotifications) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, successNotifications]);



  const unreadNotifications = notifications?.data?.filter(
    (notification) => notification.isRead === false
  );



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

  const logoImage = require("../../../../../assets/QuicklogisticsLogo/Successilllustration.png");
  return (
    <View
      style={[styles.containerfirst, { backgroundColor: theme.backgroundAuth }]}
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  containerfirst: {
    backgroundColor: "#000",
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
