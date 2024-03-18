import React from "react";
import { View, ImageBackground } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, 
  //Polyline,
   PROVIDER_GOOGLE } from "react-native-maps";
// import * as Location from "expo-location";
import axios from "axios";
// import polyline from "@mapbox/polyline";
import { useSelector, useDispatch } from "react-redux";
//import Icon from "react-native-vector-icons/FontAwesome";
import { fetchUser } from "../../../Redux/Users/Users";
import { getVehicle } from "../../../Redux/Logistics/Logistics";
import { GOOGLE_API_KEY } from "../../../Redux/BaseUrl/Baseurl";

const UpdateLocationGD = () => {
  const theme = useTheme();
  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: "#000",
  };

  const headerTintColor = "#000";

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Update your Vehicle",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const [initialPosition, setInitialPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [pickuplat, setPickuplat] = useState("");
  const [pickuplng, setPickuplng] = useState("");
  const [err, setError] = useState("");
  const [getPickup, setPickupAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  const destination = {
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
  };
  const user = useSelector((state) => state?.auth?.user);
  //console.log(user?.fullName, "user");
  const route = useRoute();
  const { id } = route.params;
  console.log(id, "iddd");

  const [vehicleData, setVehicleData] = useState("");
  useEffect(() => {
    dispatch(getVehicle(id))
      .then((response) => {
        setVehicleData(response?.payload.data);
        console.log(response?.payload.data, "response");
      })
      .catch((error) => {});
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser({ ordinaryUserId }))
      .then((response) => {
        setFullName(response?.payload?.data?.fullName);
      })
      .catch((error) => {
        //console.error("Error fetching user:", error);
      });
  }, [userr]);

  const dispatch = useDispatch();
  const userr = useSelector((state) => state?.profile?.data?.data?.fullName);
  //console.log(userr, "userrs");

  ordinaryUserId = user?.ordinaryUserId;
  const [name, setFullName] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setInitialPosition({
          latitude,
          longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        });

        setCurrentLocation({
          latitude,
          longitude,
        });

        setIsLoading(false);

        const apiKey = GOOGLE_API_KEY;
        const origin = `${latitude},${longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationStr}&key=${apiKey}`
        );

        if (response?.data?.routes.length > 0) {
          // const route = response?.data?.routes[0];
          // const routeCoordinates = decodePolyline(
          //   route.overview_polyline.points
          // );
          // setRouteCoordinates(routeCoordinates);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        ...initialPosition,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  }, [currentLocation]);

  // function decodePolyline(encoded) {
  //   return polyline.decode(encoded).map((coord) => ({
  //     latitude: coord[0],
  //     longitude: coord[1],
  //   }));
  // }

  const navigation = useNavigation();

  const handlePlaceSelection = (data, details, navigation) => {
    const pickupAddress = data?.description;
    const lat = details?.geometry?.location?.lat;
    const lng = details?.geometry?.location?.lng;

    if (lat === undefined || lng === undefined) {
      const errorMessage = "Enter a valid address";
      //console.error(errorMessage);
      return;
    }
    setPickuplat(lat);
    setPickuplng(lng);
    setPickupAddress(pickupAddress);

    navigation.navigate("UpdateVehicle", {
      pickupAddress: pickupAddress ? pickupAddress : vehicleData?.location,
      id: id,
    });

    //console.log(lat, lng, pickupAddress, "lol");
  };

  const NewhandlePlaceSelection = () => {
    navigation.navigate("UpdateVehicle", {
      pickupAddress: vehicleData?.location,
      id: id,
    });

    console.log(vehicleData?.location, "lol");
  };

  const handlePlaceSelectionButton = () => {
    if (pickuplat === undefined || pickuplng === undefined) {
      alert("Enter a valid address");
      return;
    } else if (pickuplat === " " || pickuplng === " ") {
    } else if ((pickuplat, pickuplng)) {
    } else {
      setError("Enter a Valid Location");
    }
  };

  return (
    <View>
      <ImageBackground
        style={styles.map}
        source={require("../../../assets/QuicklogisticsLogo/bg.png")}
      >
        <View
          style={{
            marginTop: 74,
            margin: 12,
            //  marginBottom: -20,
            height: 110,
            backgroundColor: "#ffffff",
            padding: 16,
            marginBottom: 12,
            borderRadius: 4,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View></View>
            {/* <TouchableOpacity
            style={{
              backgroundColor: "#000",
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              flexDirection: "column",
              height: 45,
              //marginTop: -12,
            }}
            onPress={NewhandlePlaceSelection}
          >
            <Text
              style={{
                fontSize: 16,

                color: "#f1c40f",
                fontFamily: "MontserratBold",
              }}
            >
              Skip
            </Text>
          </TouchableOpacity> */}

            <Text
              style={{
                fontSize: 15,
                fontFamily: "MontserratBold",
              }}
            >
              Update the Location of the Vehicle
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 3,
                marginBottom: 24,
                fontFamily: "MontserratRegular",
              }}
            >
              {vehicleData?.location}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 24,
                justifyContent: "space-between",
              }}
            ></View>
          </View>
        </View>
        <View style={styles.container}>
          <GooglePlacesAutocomplete
            placeholder="Enter a new Address"
            onPress={(data, details = null) =>
              handlePlaceSelection(data, details, navigation)
            }
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
              nearbyPlacesAPI: "GooglePlacesSearch",
            }}
            returnKeyType={"default"}
            listViewDisplayed="auto"
            fetchDetails={true}
            styles={{
              textInputContainer: {
                // backgroundColor: `#f1c40f`,
                top: 185,
                paddingBottom: 55,
                height: 60,
                placeholderTextColor: "red",
              },
              textInput: {
                //backgroundColor: `#f1c40f`,
                placeholderTextColor: "red",
              },
              listView: {
                // backgroundColor: `#f1c40f`,

                marginTop: 180,
              },
              predefinedPlacesDescription: {},
              container: {
                flex: 1,
                flexGrow: 1,
                backgroundColor: `transparent`,
              },
              textInput: {
                color: "#000000",
                fontFamily: "MontserratBold",
              },
              predefinedPlacesDescription: {
                fontFamily: "MontserratBold",
                color: "#1faadb",
              },
            }}
            textInputProps={{
              autoCapitalize: "none",
            }}
          />

          {/* {isLoading ? (
        <ActivityIndicator
          size="large"
          color="blue"
          style={styles.loadingIndicator}
        />
      ) : (
        // <MapView
        //   provider={PROVIDER_GOOGLE}
        //   style={styles.map}
        //   initialRegion={initialPosition}
        //   ref={mapRef} // Assign the ref
        // >
        //   {currentLocation && (
        //     <Marker
        //       coordinate={currentLocation}
        //       title="My Location"
        //       description="You are here!"
        //     />
        //   )}
        //   {destination && (
        //     <Marker
        //       coordinate={destination}
        //       title="Lagos"
        //       description="Destination: Lagos, Nigeria"
        //     />
        //   )}
        //   {routeCoordinates && (
        //     <Polyline
        //       coordinates={routeCoordinates}
        //       strokeWidth={5}
        //       strokeColor="blue"
        //     />
        //   )}
        //   <GooglePlacesAutocomplete
        //     placeholder="Enter your Pickup Address"
        //     onPress={(data, details) =>
        //       handlePlaceSelection(data, details, navigation)
        //     }
        //     query={{
        //       key: GOOGLE_API_KEY,
        //       language: "en",
        //       nearbyPlacesAPI: "GooglePlacesSearch",
        //     }}
        //     listViewDisplayed="auto"
        //     fetchDetails={true}
        //     styles={{
        //       textInputContainer: {
        //         // backgroundColor: `#f1c40f`,
        //         paddingTop: 270,
        //         paddingLeft: 12,
        //         paddingRight: 12,
        //         paddingBottom: -22,
        //         placeholderTextColor: "red",
        //       },
        //       // textInput: {
        //       //   //backgroundColor: `#f1c40f`,
        //       //   placeholderTextColor: "red",
        //       // },
        //       listView: {
        //         // backgroundColor: `#f1c40f`,
        //         padding: 12,
        //         margin: 0,
        //       },
        //       // predefinedPlacesDescription: {

        //       // },
        //       container: {
        //         flex: 1,
        //         flexGrow: 1,
        //         // backgroundColor: `#f1c40f`,
        //       },
        //       textInput: {
        //         color: "#000000",
        //         fontFamily: "MontserratBold",
        //       },
        //       predefinedPlacesDescription: {
        //         fontFamily: "MontserratBold",
        //         color: "#1faadb",
        //       },
        //     }}
        //     textInputProps={{
        //       autoCapitalize: "none",
        //     }}
        //   />
        // </MapView>
      )} */}
        </View>
      </ImageBackground>

      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          width: 100,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
          flexDirection: "column",
          height: 45,
          margin: 16,
          //marginTop: -12,
        }}
        onPress={NewhandlePlaceSelection}
      >
        <Text
          style={{
            fontSize: 16,

            color: "#f1c40f",
            fontFamily: "MontserratBold",
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>
    </View>

    // </MapView>
  );
};

export default UpdateLocationGD;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 12,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 1000,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // backButton: {
  //   position: "absolute",
  //   top: 20,
  //   left: 20,
  //   backgroundColor: "transparent",
  //   padding: 10,
  // },
  backText: {
    color: "#ff0000",
    fontSize: 14,
    marginBottom: 0,
    fontFamily: "MontserratBold",
  },
});
