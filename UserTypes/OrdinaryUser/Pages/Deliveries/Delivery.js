import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../../Providers/ThemeProvider";
import MyLocationMap from "../Maps/Maps";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryById } from "../../../../Redux/Deliveries/Deliveries";

const Delivery = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const { theme } = useTheme();
  const [data, setData] = useState("");
  const [seeDeliveryAddress, setDeliveryAddress] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchDeliveryById(deliveryID));
        const responseData = response?.payload;
        const data = responseData;
        setData(data);
        setDeliveryAddress(data?.data?.deliveryAddress);
      } catch (error) {}
    };
    //console.log(data, "ff");
    //console.log(data.data?.vehicle?.riderName, "rider");
    fetchData();
  }, [dispatch, deliveryID]);

  //console.log(data, "ff");
  //console.log(
  // pickupAddress,
  // pickupCoordinates,
  // deliveryCoordinates,
  // "dhdhhdhd"
  //);

  const navigateToThisRide = () => {
    navigation.navigate("Delivery");
  };
  const route = useRoute();
  const {
    deliveryID,
    deliveryAddress,
    pickupAddress,
    pickupCoordinates,
    deliveryCoordinates,
    cost,
    status,
  } = route.params;

  if (deliveryCoordinates == null || pickupCoordinates == null) {
  }

  const deliveryCoordinatesArray = deliveryCoordinates
    ?.split("/")
    ?.map(parseFloat);
  const pickupCoordinatesArray = pickupCoordinates?.split("/")?.map(parseFloat);

  const deliveryLat = deliveryCoordinatesArray?.[0] ?? null;
  const deliveryLng = deliveryCoordinatesArray?.[1] ?? null;

  const pickupLat = pickupCoordinatesArray?.[0] ?? null;
  const pickupLng = pickupCoordinatesArray?.[1] ?? null;

  const navigateToThisOrder = () => {
    if (deliveryID) {
      navigation.navigate("Orderdetails", { deliveryID });
    }
  };

  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: "left",
      paddingTop: 8,
      fontSize: 12,
      fontFamily: "MontserratRegular",
    },
    touchView: {
      flexDirection: "row",
      alignItems: "center",
      gap: 24,
      backgroundColor: theme.views,
      borderRadius: 247,
      height: 70,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.edge,
    },
    touchsActive: {
      width: "45%",
      borderRadius: 1233,
      backgroundColor: "#f1c40f",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
    },
    touchs: {
      width: "45%",
      borderRadius: 1233,
      justifyContent: "center",
      alignItems: "center",
      height: 50,
    },
    touchsText: {
      textAlign: "center",
      color: "#000",
      fontSize: 16,
    },
    touchsTextActive: {
      textAlign: "center",
      color: "#000",
      fontSize: 16,
    },

    containerfirst: {
      backgroundColor: "#000",
      color: "#ffffff",
      height: "100%",
      padding: 16,
      marginTop: 24,
    },
    text: {
      color: theme.text,
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "MontserratBold",
    },
    orderView: {
      borderBottomWidth: 0,
      borderColor: `${theme.text}20`,
      marginBottom: 12,
    },
    grayed: {
      backgroundColor: theme.views,
      borderRadius: 12,
      height: "auto",
      padding: 16,
      marginTop: 24,
    },
    Nextgrayed: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      paddingBottom: 12,
      alignItems: "center",
      borderBottomColor: `${theme.text}50`,
    },
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontSize: 12,
      height: 50,
      marginTop: 24,
      width: "100%",
    },
    buttonClick: {
      backgroundColor: "#f1c40f",
      width: "100%",
      height: 50,
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
      marginBottom: 24,
    },
    keyb: {
      flex: 1,
    },
    radioLabel: {
      color: `${theme.text}`,
      fontSize: 12,
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
      title: "Delivery",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <KeyboardAvoidingView enabled={true} style={styles.keyb}>
      <SafeAreaView
        style={{ backgroundColor: theme.background, height: "100%" }}
      >
        <ScrollView style={{ backgroundColor: theme.background }}>
          <View
            style={[
              styles.containerfirst,
              { backgroundColor: theme.background },
            ]}
          >
            <View style={styles.touchView}>
              <TouchableOpacity
                onPress={navigateToThisOrder}
                style={styles.touchs}
              >
                <Text
                  style={[
                    styles.touchsTextActive,
                    { fontFamily: "MontserratBold", color: theme.edgeColor },
                  ]}
                >
                  Orders
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateToThisRide}
                style={styles.touchsActive}
              >
                <Text
                  style={[styles.touchsText, { fontFamily: "MontserratBold" }]}
                >
                  Delivery
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.orderView}>
              {/* <TouchableOpacity
                style={styles.grayed}
                onPress={() =>
                  navigation.navigate("Maps", {
                    seeDeliveryAddress: seeDeliveryAddress,
                  })
                }
              >
                <TouchableOpacity style={[styles.Nextgrayed, { height: 400 }]}>
                  {/* <MyLocationMap
                    onPress={() =>
                      navigation.navigate("Maps", {
                        seeDeliveryAddress: seeDeliveryAddress,
                      })
                    }
                  /> 
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Maps", {
                      deliveryLat: deliveryLat,
                      deliveryLng: deliveryLng,
                      pickupLat: pickupLat,
                      pickupLng: pickupLng,
                      deliveryAddress: deliveryAddress,
                      pickupAddress: pickupAddress,
                      cost: cost,
                      status: status,
                    })
                  }
                  style={styles.buttonClick}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "MontserratBold" },
                    ]}
                  >
                    View Map
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity> */}

              {data.data?.vehicle ? (
                <View style={styles.grayed}>
                  <View style={styles.Nextgrayed}>
                    <Text style={[styles.text, { fontSize: 14, marginTop: 8 }]}>
                      Rider details
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.passwordtext,
                        { color: `${theme.text}55`, marginTop: 12 },
                      ]}
                    >
                      Name
                    </Text>
                    <Text
                      style={[styles.passwordtext, { color: `${theme.text}` }]}
                    >
                      {data.data?.vehicle?.riderName}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.passwordtext,
                        { color: `${theme.text}55`, marginTop: 12 },
                      ]}
                    >
                      Phone number
                    </Text>
                    <Text
                      style={[styles.passwordtext, { color: `${theme.text}` }]}
                    >
                      {data.data?.vehicle?.riderPhoneNumber}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.passwordtext,
                        { color: `${theme.text}55`, marginTop: 12 },
                      ]}
                    >
                      Ride Type
                    </Text>
                    <Text
                      style={[styles.passwordtext, { color: `${theme.text}` }]}
                    >
                      {data.data?.vehicle?.type}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.passwordtext,
                        { color: `${theme.text}55`, marginTop: 12 },
                      ]}
                    >
                      Ride Name
                    </Text>
                    <Text
                      style={[styles.passwordtext, { color: `${theme.text}` }]}
                    >
                      {data.data?.vehicle?.name}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.passwordtext,
                        { color: `${theme.text}55`, marginTop: 12 },
                      ]}
                    >
                      Vehicle Number
                    </Text>
                    <Text
                      style={[styles.passwordtext, { color: `${theme.text}` }]}
                    >
                      {data.data?.vehicle?.vehicleNumber}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.passwordtext,
                        { color: `${theme.text}55`, marginTop: 12 },
                      ]}
                    >
                      Pickup Duration in days
                    </Text>
                    <Text
                      style={[styles.passwordtext, { color: `${theme.text}` }]}
                    >
                      {data.data?.vehicle?.pickupDuration} days
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.passwordtext,
                        { color: `${theme.text}55`, marginTop: 12 },
                      ]}
                    >
                      Delivery Duration in days
                    </Text>
                    <Text
                      style={[styles.passwordtext, { color: `${theme.text}` }]}
                    >
                      {data.data?.vehicle?.deliveryDuration} days
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 24,
                    }}
                  ></View>

                  {/* <TouchableOpacity style={styles.buttonClick}>
                    <Text
                      style={[
                        styles.buttonText,
                        { fontFamily: "MontserratBold" },
                      ]}
                    >
                      Cancel Delivery
                    </Text>
                  </TouchableOpacity> */}
                </View>
              ) : (
                <Text
                  style={{
                    backgroundColor: "#f1c40f25",
                    color: "#f1c40f",
                    padding: 24,
                    marginTop: 32,
                    marginBottom: 24,
                    fontSize: 14,
                    textAlign: "center",
                    fontFamily: "MontserratBold",
                  }}
                >
                  {console.log(data.data, "lests")}
                  No Rider assigned to deliver your item yet
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Delivery;
