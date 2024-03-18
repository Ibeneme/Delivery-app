import React from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTheme} from '../../../../Providers/ThemeProvider';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Text, Modal} from 'react-native';
import axios from 'axios';
// import * as Location from "expo-location";
// import polyline from "@mapbox/polyline";
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
//import {FontAwesome5} from 'react-native-vector-icons';
import {GOOGLE_API_KEY} from '../../../../Redux/BaseUrl/Baseurl';
import {TrashSVG} from '../../Icons/AllIcons';

const GDeliveryDelivery = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [markedForDeletion, setMarkedForDeletion] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // navigation.navigate("multipleDelivery", {
  //   deliveryAddress: getPickup,
  //   deliveryLat: pickuplat,
  //   deliveryLng: pickuplng,
  //   pickupAddress: pickupAddress,
  //   pickupLat: pickupLat,
  //   pickupLng: pickupLng,

  const [initialPosition, setInitialPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const mapRef = useRef(null); // Ref for MapView
  const [addressText, setAddressText] = useState('');
  const googlePlacesAutocompleteRef = useRef(null); // Ref for GooglePlacesAutocomplete
  const [isFocused, setIsFocused] = useState(false); // State to manage focus

  const [pickuplat, setPickuplat] = useState('');
  const [pickuplng, setPickuplng] = useState('');
  const [err, setError] = useState('');
  const [getPickup, setPickupAddress] = useState('');
  const [key, setKey] = useState(0);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handlePlaceSelections = (data, details) => {
    const deliveryAddress = data?.description;
    const lat = details?.geometry?.location?.lat;
    const lng = details?.geometry?.location?.lng;

    if (lat === undefined || lng === undefined) {
      const errorMessage = 'Enter a valid address';
      return;
    }

    const selectedLocation = {
      address: deliveryAddress,
      latitude: lat,
      longitude: lng,
    };

    setSelectedLocations(prevLocations => [...prevLocations, selectedLocation]);

    // Log the selected location
    console.log(
      `Location ${selectedLocations.length}:`,
      selectedLocation,
      selectedLocations,
    );
    setKey(prevKey => prevKey + 1);
    setAddressText('');
    resetForm();
  };

  const destination = {
    latitude: pickuplat, // Lagos latitude
    longitude: pickuplng, // Lagos longitude
  };

  const resetForm = () => {
    setPickuplat('');
    setPickuplng('');
    setPickupAddress('');
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
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
  const handleDelete = () => {
    const updatedLocations = selectedLocations.filter(
      (location, index) => !markedForDeletion.includes(index),
    );
    setMarkedForDeletion([]);
    setSelectedLocations(updatedLocations);
  };

  const handleMarkForDeletion = index => {
    setMarkedForDeletion(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index],
    );
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
    backgroundColor: '#f1c40f',
  };

  const headerTintColor = '#000000';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
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

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      padding: 12,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#f1c40f',
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
    deleteButton: {
      marginBottom: 16,
      width: '100%',
      alignItems: 'center',
      height: 55,
      borderWidth: 1.3,
      borderColor: '#ff0000',
      justifyContent: 'center',
      color: '#000',
      borderRadius: 12,
      backgroundColor: '#ff000021',
    },
    selectedItem: {
      borderColor: 'red',
      borderWidth: 1.4,
      backgroundColor: '#ff000025',
      borderRadius: 6,
      padding: 6,
    },
    selectedItems: {
      color: '#ff0000',
    },
    normalItem: {
      color: theme.text,
      width: '82%',
    },
    normalItems: {
      backgroundColor: theme.edgeColor,
    },

    normalItemss: {
      color: theme.backgroundAuth,
    },
    nextButton: {
      // Style for the "Next" button
      backgroundColor: '#000000',
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 48,
      width: 100,
      gap: 12,
      flexDirection: 'row',
      marginBottom: 10, // Add margin to separate buttons
    },

    modalButton: {
      // Style for the button that opens the modal
      backgroundColor: '#000000',
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 48,
      width: 100,
      gap: 12,
      flexDirection: 'row',
    },

    modalContainer: {
      backgroundColor: '#00000090',
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      position: 'relative',
    },
    modalContainerView: {
      height: 700,
      bottom: 0,
      position: 'absolute',
      width: '100%',
      backgroundColor: `${theme.backgroundAuth}`,
      borderRadius: 21,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: 200,
      width: '100%',
    },
    modalText: {
      fontFamily: 'MontserratBold',
      fontSize: 14,
      marginBottom: 12,
      marginTop: 6,
      color: theme.text,
    },
    modalTexts: {
      fontFamily: 'MontserratBold',
      fontSize: 14,
      marginBottom: 12,
      marginTop: 6,
    },
    buttons: {
      marginBottom: 64,
      width: '100%',
      alignItems: 'center',
      height: 55,
      backgroundColor: '#f1c40f',
      justifyContent: 'center',
      color: '#000',
      borderRadius: 12,
    },
  });
  const pickupLocation = {
    pickupAddress: pickupAddress,
    pickupLat: pickupLat,
    pickupLng: pickupLng,
  };
  console.log(pickupAddress, pickupLat, '  pickupLng:', pickupLng);
  const handleSubmissions = () => {
    console.log(
      selectedLocations,
      JSON.stringify(selectedLocations, null, 3),
      '00',
    );
    navigation.navigate('multipleDelivery', {
      selectedLocations: selectedLocations,
      pickupLocation: pickupLocation,
    });
    setModalVisible(false);
  };
  console.log(
    selectedLocations,
    JSON.stringify(selectedLocations, null, 3),
    '00',
  );
  const handleSubmission = () => {
    // Handle the submission logic here
    if (pickuplat && pickuplng) {
      navigation.navigate('multipleDelivery', {
        deliveryAddress: getPickup,
        deliveryLat: pickuplat,
        deliveryLng: pickuplng,
        pickupAddress: pickupAddress,
        pickupLat: pickupLat,
        pickupLng: pickupLng,
      });
      Keyboard.dismiss();
    } else {
      setError('Enter a Valid Location');
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.map}>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
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
              Enter your Delivery Locations?
            </Text>
            <View
              style={{
                marginTop: 18,
                flexDirection: 'row',
                gap: 8,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#000000',
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 48,
                  width: '50%',
                  gap: 12,
                  flexDirection: 'row',
                }}
                onPress={handleSubmission}>
                <Text style={[styles.backText, {color: '#ffffff'}]}>
                  Add Location
                </Text>
              </TouchableOpacity>
              {selectedLocations?.length === 0 ? null : (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'transparent',
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 48,
                    width: '50%',
                    gap: 12,
                    borderColor: '#000000',
                    borderWidth: 1.7,
                    flexDirection: 'row',
                  }}
                  onPress={toggleModal}>
                  <Text style={[styles.backText, {color: '#000'}]}>
                    View Locations
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <GooglePlacesAutocomplete
        value={addressText}
        key={key}
        ref={googlePlacesAutocompleteRef}
        onChangeText={text => setAddressText(text)}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        placeholder="Enter your Delivery Address"
        onSubmitEditing={handleSubmission}
        onPress={(data, details) => {
          handlePlaceSelections(data, details, navigation);
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
            placeholderTextColor: 'red',
            fontSize: 12,
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
            fontSize: 12,
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

      {selectedLocations?.length === 0 ? null : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContainerView}>
              <Text
                style={{
                  fontFamily: 'MontserratBold',
                  fontSize: 14,
                  paddingTop: 24,
                  width: '100%',
                  textAlign: 'right',
                  color: theme.text,
                }}
                onPress={toggleModal}>{`Close`}</Text>
              <Text
                style={{
                  fontFamily: 'MontserratBold',
                  fontSize: 14,
                  paddingTop: 24,
                  color: theme.text,
                }}>{`Delivery Locations - Scrollable`}</Text>

              <FlatList
                style={{
                  height: 80,
                  zIndex: -2,
                  width: '100%',
                  paddingTop: 24,
                  marginBottom: 64,
                }}
                data={selectedLocations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={[
                      markedForDeletion.includes(index) && styles.selectedItem,
                      {
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 6,
                        width: '100%',
                        padding: 6,
                      },
                    ]}
                    onPress={() => handleMarkForDeletion(index)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                      }}>
                      <View
                        style={[
                          styles.normalItems,
                          markedForDeletion.includes(index) &&
                            styles.selectedItem,
                          {
                            width: 40,
                            height: 40,
                            borderRadius: 343,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.normalItemss,
                            markedForDeletion.includes(index) &&
                              styles.selectedItems,

                            {
                              fontFamily: 'MontserratBold',
                              fontSize: 14,
                            },
                          ]}>
                          {index + 1}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.normalItem,
                          markedForDeletion.includes(index) &&
                            styles.selectedItems,
                          {
                            fontFamily: 'MontserratRegular',
                            fontSize: 14,
                          },
                        ]}>{` ${item.address}`}</Text>
                    </View>

                    <TrashSVG
                      color="#f1c40f"
                      style={[
                        styles.normalItem,
                        markedForDeletion.includes(index) &&
                          styles.selectedItems,
                        {
                          fontFamily: 'MontserratRegular',
                          paddingRight: 16,
                        },
                      ]}
                      width={16}
                      height={16}
                    />
                    {/* <FontAwesome5
                      name="trash"
                      size={14}
                      style={[
                        styles.normalItem,
                        markedForDeletion.includes(index) &&
                          styles.selectedItems,
                        {
                          fontFamily: 'MontserratRegular',
                          paddingRight: 16,
                        },
                      ]}
                    /> */}
                  </TouchableOpacity>
                )}
              />
              {markedForDeletion?.length === 0 ? null : (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}>
                  <Text style={styles.backText}>
                    Delete Selected {markedForDeletion?.length}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleSubmissions}
                style={styles.buttons}>
                <Text onPress={handleSubmissions} style={styles.modalTexts}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default GDeliveryDelivery;
