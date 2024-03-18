import React from 'react';
import {View, ImageBackground} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTheme} from '../../../../Providers/ThemeProvider';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
// import * as Location from "expo-location";
// import axios from "axios";
// import polyline from "@mapbox/polyline";
///import Icon from "react-native-vector-icons/FontAwesome";
import {GOOGLE_API_KEY} from '../../../../Redux/BaseUrl/Baseurl';

const GDelivery = () => {
  const [initialPosition, setInitialPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const mapRef = useRef(null); // Ref for MapView

  const [pickuplat, setPickuplat] = useState('');
  const [pickuplng, setPickuplng] = useState('');
  const [err, setError] = useState('');
  const [getPickup, setPickupAddress] = useState('');

  const destination = {
    latitude: pickuplat, // Lagos latitude
    longitude: pickuplng, // Lagos longitude
  };

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = location.coords;

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

        //const apiKey = "AIzaSyAnQKOhhSxTuxexCIen54OvE8c0ItuhPkQ";
        const apiKey = GOOGLE_API_KEY;
        const origin = `${latitude},${longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationStr}&key=${apiKey}`,
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
    // Animate map zoom to current location when available
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

  const handlePlaceSelection = (data, details, navigation) => {
    const deliveryAddress = data?.description;
    const lat = details?.geometry?.location?.lat;
    const lng = details?.geometry?.location?.lng;

    if (lat === undefined || lng === undefined) {
      const errorMessage = 'Enter a valid address';
      return;
    }

    setPickuplat(lat);
    setPickuplng(lng);
    setPickupAddress(deliveryAddress);
  };

  const handlePlaceSelectionButton = () => {
    if (pickuplat === undefined || pickuplng === undefined) {
      const errorMessage = 'Enter a valid address';
      return;
    } else if (pickuplat === ' ' || pickuplng === ' ') {
    } else if ((pickuplat, pickuplng)) {
      navigation.navigate('NewBookRide', {
        deliveryAddress: getPickup,
        deliveryLat: pickuplat,
        deliveryLng: pickuplng,
        pickupAddress: pickupAddress,
        pickupLat: pickupLat,
        pickupLng: pickupLng,
      });
    } else {
      setError('Enter a Valid Location');
    }
  };
  const {theme} = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const {pickupAddress, pickupLat, pickupLng} = route.params;
  // console.log(
  //   pickupAddress,
  //   pickupLat,
  //   pickupLng,
  //   "pickupAddress, pickupLat, pickupLng"
  // );
  const headerStyle = {
    backgroundColor: 'transparent',
  };

  const headerTintColor = '#000000';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Enter Delivery Address',
      headerStyle: {},
      headerTitleStyle: {
        fontFamily: 'MontserratBold',
        fontSize: 14,
        color: '#000000',
      },
      headerTintColor,
      headerStyle,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <ImageBackground
      style={styles.map}
      source={require('../../../../assets/QuicklogisticsLogo/bg.png')}>
      <View
        style={{
          marginTop: 12,
          height: 'auto',
          backgroundColor: '#ffffff',
          margin: 16,
          padding: 16,
          borderRadius: 4,
          gap: 16,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          {/* <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity> */}

          <Text
            style={{
              fontSize: 14,
              fontFamily: 'MontserratBold',
            }}>
            Almost there!!!!
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 3,
              marginBottom: 6,
              fontFamily: 'MontserratRegular',
            }}>
            What's your Delivery Location?
          </Text>
        </View>

        {/* <TouchableOpacity
          style={{
            backgroundColor: "#000000",
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 48,
            width: 100,
            gap: 12,
            flexDirection: "row",
          }}
          onPress={handlePlaceSelectionButton}
        >
          <Text style={[styles.backText, { color: "#ffffff" }]}>Next</Text>
          <Icon name="angle-right" size={20} color="#ffffff" />
        </TouchableOpacity> */}
      </View>

      <GooglePlacesAutocomplete
        placeholder="Enter your Delivery Address"
        onPress={(data, details) => {
          const deliveryAddress = data?.description;
          const lat = details?.geometry?.location?.lat;
          const lng = details?.geometry?.location?.lng;

          if (lat === undefined || lng === undefined) {
            const errorMessage = 'Enter a valid address';
            return;
          }

          navigation.navigate('NewBookRide', {
            deliveryAddress: deliveryAddress,
            deliveryLat: lat,
            deliveryLng: lng,
            pickupAddress: pickupAddress,
            pickupLat: pickupLat,
            pickupLng: pickupLng,
          });
          console.log(details, pickupAddress, 'deliveryAddress');
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        listViewDisplayed="auto"
        fetchDetails={true}
        styles={{
          textInputContainer: {
            // backgroundColor: `#f1c40f`,
            top: 0,
            paddingBottom: 55,
            height: 60,
            margin: 16,
            marginTop: 0,
            //placeholderTextColor: "red",
          },
          textInput: {
            //backgroundColor: `#f1c40f`,
          },
          listView: {
            // backgroundColor: `#f1c40f`,

            marginTop: -24,
            margin: 16,
          },
          predefinedPlacesDescription: {},
          container: {
            flex: 1,
            flexGrow: 1,
            backgroundColor: `transparent`,
          },
          textInput: {
            color: '#000000',
            fontFamily: 'MontserratBold',
            fontSize: 14,
          },
          predefinedPlacesDescription: {
            fontFamily: 'MontserratBold',
            color: '#1faadb',
          },
        }}
        textInputProps={{
          autoCapitalize: 'none',
        }}
      />
    </ImageBackground>
  );
};

export default GDelivery;

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
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#ff0000',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 12,
    fontFamily: 'MontserratBold',
  },
});
