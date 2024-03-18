import React from "react";
import { View, ImageBackground } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useTheme } from "../../../../Providers/ThemeProvider";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
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
import { fetchUser } from "../../../../Redux/Users/Users";
import { GOOGLE_API_KEY } from "../../../../Redux/BaseUrl/Baseurl";

const GooglePlacesInput = () => {
  const { theme } = useTheme();
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

  useEffect(() => {
    dispatch(fetchUser({ ordinaryUserId }))
      .then((response) => {
        setFullName(response?.payload?.data?.fullName);
      })
      .catch((error) => {});
  }, [userr]);

  const dispatch = useDispatch();
  const userr = useSelector((state) => state?.profile?.data?.data?.fullName);

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
  const placesAutocompleteRef = useRef(null);

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
    resetInput();
    navigation.navigate("gd", {
      pickupAddress: pickupAddress,
      pickupLat: lat,
      pickupLng: lng,
    });
    if (placesAutocompleteRef.current) {
      placesAutocompleteRef.current.setAddressText(""); // Clears the input
    }

    //console.log(lat, lng, pickupAddress, "lol");
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
    if (placesAutocompleteRef.current) {
      placesAutocompleteRef.current.setAddressText(""); // Clears the input
    }
  };

  const resetInput = () => {
    setPickuplat("");
    setPickuplng("");
    setPickupAddress("");
  };

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
      title: "Choose a Pickup Address",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
        fontSize: 14
     
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <ImageBackground
      style={styles.map}
      source={require("../../../../assets/QuicklogisticsLogo/bg.png")}
    >
      <View
        style={{
          marginTop: 24,
          margin: 12,
          //  marginBottom: -20,
          height: "auto",
          backgroundColor: "#ffffff",
          padding: 16,
          borderRadius: 4,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "MontserratBold",
            }}
          >
            Hello {name}!
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 3,
              marginBottom: 24,
              fontFamily: "MontserratRegular",
            }}
          >
            What's your Pickup Location.
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
          ref={placesAutocompleteRef}
          placeholder="Enter your Pickup Address"
          onPress={(data, details = null) =>
            handlePlaceSelection(data, details, navigation)
          }
          query={{
            key:GOOGLE_API_KEY,
            language: "en",
            nearbyPlacesAPI: "GooglePlacesSearch",
          }}
          returnKeyType={"default"}
          listViewDisplayed="auto"
          fetchDetails={true}
          styles={{
            textInputContainer: {
              // backgroundColor: `#f1c40f`,
              top: 125,
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

              marginTop: 120,
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
              fontSize: 14
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
        //       key: "AIzaSyAnQKOhhSxTuxexCIen54OvE8c0ItuhPkQ",
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

    // </MapView>
  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 12,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
