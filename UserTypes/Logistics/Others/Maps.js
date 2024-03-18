import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker, 
  //Polyline,
   PROVIDER_GOOGLE } from "react-native-maps";
// import * as Location from "expo-location";
import axios from "axios";
// import polyline from "@mapbox/polyline";
import { useRoute } from "@react-navigation/native";

export default function MyLocationMap({ navigation }) {
  const [initialPosition, setInitialPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const rotation = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const {
    deliveryLat,
    deliveryLng,
    pickupLat,
    pickupLng,
    cost,
    deliveryAddress,
    pickupAddress,
  } = route.params;

  // console.log(deliveryLat, deliveryLng, pickupLat, pickupLng, ", pickupLat, pickupLng");

  const defaultCoordinates = {
    // latitude: 4.555, // Default latitude
    // longitude: 3.444, // Default longitude
    // latitudeDelta: 0.09,
    // longitudeDelta: 0.035,
  };

  const destination = {
    latitude: isNaN(deliveryLat) ? defaultCoordinates.latitude : deliveryLat,
    longitude: isNaN(deliveryLng) ? defaultCoordinates.longitude : deliveryLng,
    ...defaultCoordinates,
  };

  const pickup = {
    latitude: isNaN(pickupLat) ? defaultCoordinates.latitude : pickupLat,
    longitude: isNaN(pickupLng) ? defaultCoordinates.longitude : pickupLng,
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // setInitialPosition({
        //   latitude: isNaN(pickupLat) ? defaultCoordinates.latitude : pickupLat,
        //   longitude: isNaN(pickupLng)
        //     ? defaultCoordinates.longitude
        //     : pickupLng,
        //   ...defaultCoordinates,
        //   latitudeDelta: 0.09,
        //   longitudeDelta: 0.035,
        // });

        // setCurrentLocation({
        //   latitude,
        //   longitude,
        // });

        setIsLoading(false);

        const apiKey = "AIzaSyAnQKOhhSxTuxexCIen54OvE8c0ItuhPkQ"; // Replace with your API key
        const origin = `${pickup?.latitude},${pickup?.longitude}`;
        const destinationStr = `${destination?.latitude},${destination?.longitude}`;
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
        latitude: pickupLat,
        longitude: pickupLng,
      });
    }
  }, [currentLocation]);

  // function decodePolyline(encoded) {
  //   return polyline.decode(encoded).map((coord) => ({
  //     latitude: coord[0],
  //     longitude: coord[1],
  //   }));
  // }

  function startRotationAnimation() {
    rotation.setValue(0);
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(startRotationAnimation);
  }

  function stopRotationAnimation() {
    Animated.timing(rotation).stop();
  }

  useEffect(() => {
    if (isLoading) {
      startRotationAnimation();
    } else {
      stopRotationAnimation();
    }
  }, [isLoading]);

  function startRotationAnimation() {
    rotation.setValue(0);
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(startRotationAnimation);
  }

  function stopRotationAnimation() {
    Animated.timing(rotation).stop();
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialPosition}
        ref={mapRef}
      >
        {pickup && (
          <Marker
            coordinate={pickup}
            pinColor="purple"
            title="Current Location"
          >
            <View
              style={{
                backgroundColor: "#ffffff",
                padding: 16,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
            
              {/* <View>
                <Text
                  style={{
                    color: "#000000",
                    fontFamily: "MontserratBold",
                    fontSize: 18,
                  }}
                >
                  Pickup Address
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 15,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {pickupAddress}
                </Text>
              </View> */}
            </View>
          </Marker>
        )}
        {destination && (
          <Marker coordinate={destination} title="Destination">
            <View
              style={{
                backgroundColor: "#ffffff",
                padding: 16,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <View
                style={{
                  height: 48,
                  backgroundColor: "#6A1ECB25",
                  width: 48,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                }}
              >
                <Icon name="map-marker" size={36} color="#6A1ECB" />
              </View>
              {/* <View>
                <Text
                  style={{
                    color: "#000000",
                    fontFamily: "MontserratBold",
                    fontSize: 18,
                  }}
                >
                  Delivery Address
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 15,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {pickupAddress}
                </Text>
              </View> */}
            </View>
          </Marker>
        )}
        {routeCoordinates && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="black"
          />
        )}
      </MapView>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.radar,
              {
                transform: [
                  {
                    rotate: rotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: "column",
          gap: 8,
          position: "absolute",
          top: 10,
          left: 0,
          width: "100%",
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={15} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            height: "auto",
            marginTop: 100,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 24,
              fontFamily: "MontserratBold",
            }}
          >
            {" "}
            &#8358;{cost}
          </Text>
          {/* <View style={{
            backgroundColor:'#000000',
            padding: 12,
            width: 'auto'
          }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color:'white',
                fontFamily: "MontserratRegular",
              }}
            >
              {" "}
              {status}
            </Text>
          </View> */}

          <Text
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: 16,
              fontFamily: "MontserratBold",
              marginTop: 16,
            }}
            // onPress={()=> navigation.navigate('swiper')}
          >
            Pickup <Text style={{
              color:'#6A1ECB'
            }}>Address:</Text>
          </Text>

          <Text style={{ fontFamily: "MontserratRegular", fontSize: 15 }}>
            {pickupAddress}
          </Text>
          <Text
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: 16,
              fontFamily: "MontserratBold",
              marginTop: 16,
            }}
          >
            Delivery <Text style={{
              color:'#ff0000'
            }}>Address:</Text>
          </Text>

          <Text
            style={{
              fontFamily: "MontserratRegular",
              fontSize: 15,
              marginBottom: 16,
            }}
          >
            {deliveryAddress}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  radar: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 50,
    borderStyle: "dotted",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    //backgroundColor: "#f1c40f",
    backgroundColor: "#000",
    marginTop: 32,
    borderRadius: 12,
    flexDirection: "row",
    gap: 16,
    padding: 16,
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "MontserratBold",
  },
});
