import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../Providers/ThemeProvider";
import RideSquares from "../Extras/Components/GetRide";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fetchLogisticsCompanies } from "../../../../Redux/Deliveries/Deliveries";

const NewGetRide = () => {
  const navigation = useNavigation();

  const { theme } = useTheme();

  const [refreshing, setRefreshing] = useState(false);



  const onRefresh = () => {
    setRefreshing(true);
  };

  const navigateToThisRide = (
    vehicleID,
    companyCost,
    companyName,
    logisticsCompanyID
  ) => {
    navigation.navigate("GetRider", {
      receiverName: receiverName,
      packageType: packageType,
      phoneNumber: phoneNumber,
      recieversEmail: recieversEmail,
      pickupAddress: pickupAddress,
      deliveryAddress: deliveryAddress,
      pickupTimes: pickupTimes,
      packageWeight: packageWeight,
      vehicleID: vehicleID,
      logisticsCompanyID: logisticsCompanyID,
      companyName: companyName,
      companyCost: companyCost,
      deliveryLat: deliveryLat,
      deliveryLng: deliveryLng,
      pickupLat: pickupLat,
      pickupLng: pickupLng,
    });
  };

  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: "left",
      paddingTop: 12,
      paddingBottom: 12,
      color: `${theme.text}55`,
      fontSize: 14,
    },

    containerfirst: {
      gap: 12,
      height: "100%",
      padding: 16,
    },
    text: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "bold",
    },
    orderView: {
      borderBottomWidth: 1,
      borderColor: `${theme.text}20`,
      marginBottom: 12,
    },
    notificationCircle: {
      width: 14,
      height: 14,
      backgroundColor: "#f1c40f",
      borderRadius: 24,
      marginTop: 3,
    },
    rows: {
      flexDirection: "row",
      gap: 12,
      marginTop: 12,
    },
  });

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
    borderBottomWidth: 0,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };


  const headerTintColor = theme.text;


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Get Ride",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);


  const route = useRoute();
  const {
    receiverName,
    phoneNumber,
    recieversEmail,
    pickupAddress,
    deliveryAddress,
    pickupTimes,
    packageWeight,
    packageType,
    deliveryLat,
    deliveryLng,
    pickupLat,
    pickupLng,
    vehicleType,
  } = route.params;

  console.log(pickupTimes, packageWeight, pickupLng, "pickupTimes");
  // const phoneNumbers = phoneNumber;
  // const recieversEmails = recieversEmail;
  // const pickupAddresss = pickupAddress;
  // const deliveryAddresss = deliveryAddress;
  // const pickupTimess = pickupTimes;
  // const packageWeights = packageWeight;
  //console.log(vehicleType, vehicleType, "vehicleTypevehicleTypevehicleType");
  const dispatch = useDispatch();
  const [seeData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await dispatch(
  //         fetchLogisticsCompanies({
  //           packageWeight,
  //           pickupAddress,
  //           deliveryAddress,
  //           vehicleType,
  //         })
  //       );
  //       setLoading(false);
  //       const responseData = response?.payload;
  //       //console.log(responseData?.data, "responseDatas");
  //       //console.log(
  //       //   responseData?.data?.vehiclesWithCalculatedCosts,
  //       //  "responseDatavehicleReviews"
  //       // );
  //       //console.log(parse, "parse");

  //       response?.payload?.data?.vehiclesWithCalculatedCosts;
  //       const parse = JSON.stringify(
  //         response?.payload?.data?.vehiclesWithCalculatedCosts
  //       );
  //       //console.log(parse, "parse");
  //       setData(JSON.parse(parse), "responseDatatwo");
  //       let responseDatas = responseData.success;
  //       //console.log(responseData, "yeahh");
  //       const checkCost = responseData?.data?.vehiclesWithCalculatedCosts;
  //       if (Array.isArray(checkCost)) {
  //         checkCost.forEach((vehicleData) => {
  //           if (vehicleData.cost === null) {
  //             alert("Location doesn't exist for some vehicles");
  //           }
  //         });
  //       } else if (
  //         JSON.stringify(responseDatas) === `"Successfully retrieved vehicles"`
  //       ) {
  //       } else {
  //       }
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, [
  //   dispatch,
  //   navigation,
  //   receiverName,
  //   phoneNumber,
  //   recieversEmail,
  //   pickupAddress,
  //   deliveryAddress,
  //   pickupTimes,
  //   packageWeight,
  //   deliveryLat,
  //   deliveryLng,
  //   pickupLat,
  //   pickupLng,
  // ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dispatch(
          fetchLogisticsCompanies({
            packageWeight,
            pickupAddress,
            deliveryAddress,
            vehicleType,
          })
        );
        setLoading(false);

        if (response && response.payload && response.payload.data) {
          const responseData = response.payload.data;
          //console.log(responseData?.vehiclesWithCalculatedCosts, "responseDatavehicleReviews");

          const vehiclesWithCalculatedCosts =
            responseData.vehiclesWithCalculatedCosts;

          if (!vehiclesWithCalculatedCosts) {
            alert("Location doesn't exist for some vehicles");
          } else {
            const parse = JSON.stringify(vehiclesWithCalculatedCosts);
            //console.log(parse, "parse");
            setData(JSON.parse(parse), "responseDatatwo");
            // setData(responseData?.data?.vehiclesWithCalculatedCosts);

            const responseMessage = responseData.message;
            if (responseMessage === "Successfully retrieved vehicles") {
              // Handle success
            } else {
              // Handle other cases
            }
          }
        } else {
          alert("Data structure is not as expected.");
        }
      } catch (error) {
        alert("An error occurred while fetching data.");
        console.error(error);
      }
    };

    fetchData();
  }, [
    dispatch,
    navigation,
    receiverName,
    phoneNumber,
    recieversEmail,
    pickupAddress,
    deliveryAddress,
    pickupTimes,
    packageWeight,
    deliveryLat,
    deliveryLng,
    pickupLat,
    pickupLng,
  ]);

  const renderItem = ({ item }) => (
    <View
      style={{

        marginBottom: 8,
        marginLeft: 12,
        marginRight: 12,

      }}
    >
      <RideSquares
        companyName={item.name}
        pickupTime={item.pickupDuration}
        deliveryTime={item.deliveryDuration}
        price={item.cost}
        iconSource={{ uri: item.logo }}
        onPress={() =>
          navigateToThisRide(
            item.vehicleID,
            item.cost,
            item.name,
            item.logisticsCompanyID,
            item.vehicleNumber
          )
        }
      />
    </View>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        flex: 1,
        // padding: 12,
        paddingTop: 32,
      }}
    >
      <View>
        {seeData?.length === 0 ? (
          loading ? (
            <Text
              style={{
                backgroundColor: "#f1c40f25",
                color: "#f1c40f",
                textAlign: "center",
                padding: 24,
                margin: 24,
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              Loading...
            </Text>
          ) : (
            <Text
              style={{
                backgroundColor: "#f1c40f25",
                color: "#f1c40f",
                textAlign: "center",
                padding: 24,
                margin: 24,
                fontFamily: "MontserratBold",
                fontSize: 16,
              }}
            >
              {vehicleType} does not exist
            </Text>
          )
        ) : null}

        {seeData?.length === undefined ? (
          <Text
            style={{
              backgroundColor: "#f1c40f25",
              color: "#f1c40f",
              textAlign: "center",
              padding: 24,
              margin: 24,
              fontFamily: "MontserratBold",
              fontSize: 16,
            }}
          >
            An error occured while loading {vehicleType}
          </Text>
        ) : null}
        {console.log(seeData, "seeData")}
      </View>
      <View>
        <FlatList
          data={seeData}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.vehicleID.toString()}
          style={{ backgroundColor: theme.background }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewGetRide;
