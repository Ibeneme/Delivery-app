import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Platform,
  Image,
  Switch,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useDispatch } from "react-redux";
import { getVehicle, updateVehicle } from "../../../Redux/Logistics/Logistics";
// import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

const UpdateVehicle = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [name, setNameNumber] = useState("");
  const [nameError, setNameNumberError] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const [vehicleData, setVehicleData] = useState("");
  useEffect(() => {
    dispatch(getVehicle(id))
      .then((response) => {
        setVehicleData(response?.payload.data);
        console.log(response?.payload.data, "response");
      })
      .catch((error) => {});
  }, [dispatch]);

  const route = useRoute();
  const { id, pickupAddress } = route.params;

  const styles = StyleSheet.create({
    dropdown: {
      height: 53,
      borderColor: `${theme.text}65`,
      borderWidth: 0.5,
      borderRadius: 4,
      paddingHorizontal: 8,
      marginTop: 24,
      backgroundColor: theme.views,
    },
    errorText: {
      color: "#ff0650",
      marginTop: 4,
      fontSize: 14,
      fontFamily: "MontserratRegular",
    },

    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: `${theme.text}60`,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: `${theme.text}`,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      display: "none",
    },
    passwordtext: {
      textAlign: "left",
      paddingTop: 8,
      fontSize: 14,
      fontFamily: "MontserratRegular",
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
      fontSize: 18,
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
      marginTop: -10,
    },

    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
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
    },
    buttonClicks: {
      backgroundColor: "#f1c40f45",
      width: "100%",
      height: 50,
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    keyb: {
      flex: 1,
    },
    newText: {
      fontSize: 14,
      fontFamily: "MontserratBold",
      color: `${theme.text}65`,
      marginBottom: -20,
      marginTop: 24,
    },
    newTexts: {
      fontSize: 14,
      fontFamily: "MontserratBold",
      color: `${theme.text}65`,
    },
  });

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Update a Vehicle",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState(null);

  const handleCreateVehicle = async () => {
    // Validation checks
    setIsLoading(true);
    // if (
    //   type.length >= 3 &&
    //   capacity !== "" &&
    //   location.length >= 3 &&
    //   basePrice !== "" &&
    //   riderName.length >= 3 &&
    //   riderPhoneNumber !== "" &&
    //   pickupDuration !== "" &&
    //   deliveryDuration !== "" &&
    //   vehicleNumber !== "" &&
    //   name !== ""
    // ) {
    setIsLoading(true);

    const formData = {
      id: id,
      name: type ? type : vehicleData?.name,
      capacity: capacity ? capacity : vehicleData?.capacity,
      location: pickupAddress ? pickupAddress : vehicleData?.location,
      isEnabled: isEnabled,
      riderName: riderName ? riderName : vehicleData?.riderName,
      basePrice: basePrice ? basePrice : vehicleData?.basePrice,
      riderPhoneNumber: riderPhoneNumber
        ? riderPhoneNumber
        : vehicleData?.riderPhoneNumber,
      pickupDuration: pickupDuration
        ? pickupDuration
        : vehicleData?.pickupDuration,
      deliveryDuration: deliveryDuration
        ? deliveryDuration
        : vehicleData?.deliveryDuration,
      vehicleNumber: vehicleNumber ? vehicleNumber : vehicleData?.vehicleNumber,
      image: image ? image : vehicleData.image,
      type: name ? name : vehicleData.type,
    };
    console.log(formData, "formData");
    try {
      const response = await dispatch(updateVehicle(formData));
      setIsLoading(false);
      console.log(response, "hhhh");
      if (response?.payload?.success === "Vehicle Updated Successfully.") {
        navigation.navigate("VehicleSuccess");
      }
      if (response?.payload?.status === 413) {
        setError('Image size is too big to upload')
      }
    } catch (error) {
      console.log(error, "hhhherror");
      setIsLoading(false);
    }
    // } else {
    //   setError("Complete the form");
    // }
  };

  const nameOfVehicle = [
    { label: "Bike", value: "Bike" },
    { label: "Motor", value: "Motor" },
    { label: "Cars", value: "Cars" },
    { label: "Trucks", value: "Trucks" },
    { label: "Motorcycles", value: "Motorcycles" },
    { label: "Bicycles", value: "Bicycles" },
    { label: "Vans", value: "Vans" },
    { label: "Trains", value: "Trains" },
    { label: "Buses", value: "Buses" },
    { label: "Trolleys and Trams", value: "Trolleys and Trams" },
    { label: "Specialized Vehicles", value: "Specialized Vehicles" },
    {
      label: "Recreational Vehicles (RVs)",
      value: "Recreational Vehicles (RVs)",
    },
    { label: "Golf Carts", value: "Golf Carts" },
    { label: "Bicycles", value: "Bicycles" },
    { label: "Snowmobiles", value: "Snowmobiles" },
    { label: "Utility Vehicles", value: "Utility Vehicles" },
    { label: "Electric Scooters", value: "Electric Scooters" },
    { label: "Off-Road Vehicles", value: "Off-Road Vehicles" },
    { label: "Go-Karts", value: "Go-Karts" },
    { label: "Horse-drawn Carriages", value: "Horse-drawn Carriages" },
    { label: "planes", value: "planes" },
  ];

  const handleVehicleType = (nameOfVehicle) => {
    setNameNumber(nameOfVehicle?.value);
    console.log(nameOfVehicle, "nam");
    //console.log(nameOfVehicle?.value, "vehicleTypes");
    //console.log(name,'hhh')
  };

  const [image, setImage] = useState(null);

  const MINIMUM_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB in bytes
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the photo library is required!");
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = () => {
    setImageError("");
    const options = {
      mediaType: 'photo', // Only allow selecting photos
      includeBase64: false, // Do not include base64 string of the image
    };
  
    // Launch image library
    launchImageLibrary(options, response => {
      // Check if image selection was successful
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // Selected image details
        console.log('Selected image URI: ', response.uri);
        console.log('Selected image width: ', response.width);
        console.log('Selected image height: ', response.height);
        // You can do further processing with the selected image here
      }
    });

    // const options = {
    //   mediaType: "photo",
    //   quality: 1,
    //   maxWidth: 500,
    //   maxHeight: 500,
    // };
  
    // launchImageLibrary(options, (response) => {
    //   if (!response.didCancel) {
    //     if (response.fileSize && response.fileSize >= MINIMUM_IMAGE_SIZE_BYTES) {
    //       setImageData(response.uri);
    //       setImageError("Selected image is too big. Please choose a smaller image");
    //     } else {
    //       setImageData(response.uri);
    //     }
    //   }
    // });
  };

  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState("");
  const [capacity, setCapacity] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [basePriceError, setBasePriceError] = useState("");
  const [riderName, setRiderName] = useState("");
  const [riderNameError, setRiderNameError] = useState("");
  const [riderPhoneNumber, setRiderPhoneNumber] = useState("");
  const [riderPhoneNumberError, setRiderPhoneNumberError] = useState("");
  const [pickupDuration, setPickupDuration] = useState("");
  const [pickupDurationError, setPickupDurationError] = useState("");
  const [deliveryDuration, setDeliveryDuration] = useState("");
  const [deliveryDurationError, setDeliveryDurationError] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleNumberError, setVehicleNumberError] = useState("");

  const handleTypeChange = (type) => {
    if (type.length >= 3) {
      setType(type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
      console.log(type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
      setTypeError("");
    } else {
      console.log(type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
      setType(type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
      setTypeError("Minimum 3 letters required");
    }
  };

  const handleLocationChange = (location) => {
    if (location.length >= 3) {
      setLocation(
        location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()
      );
      setLocationError("");
    } else {
      setLocation(
        location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()
      );
      setLocationError("Minimum 3 letters required");
    }
  };

  const handleRiderNameChange = (riderName) => {
    if (riderName.length >= 3) {
      setRiderName(
        riderName.charAt(0).toUpperCase() + riderName.slice(1).toLowerCase()
      );
      setRiderNameError("");
    } else {
      setRiderName(
        riderName.charAt(0).toUpperCase() + riderName.slice(1).toLowerCase()
      );
      setRiderNameError("Minimum 3 letters required");
    }
  };

  const handleCapacityChange = (capacity) => {
    if (capacity.length === " ") {
      setCapacity(capacity);
      setCapacityError("Enter a Number");
    } else {
      setCapacity(capacity);
      setCapacityError(" ");
    }
  };
  const handlebasePriceChange = (basePrice) => {
    if (basePrice.length === " ") {
      setBasePrice(basePrice);
      setBasePriceError("Enter a Number");
    } else {
      setBasePrice(basePrice);
      setBasePriceError(" ");
    }
  };
  const handleDeliveryDurationrChange = (deliveryAddress) => {
    if (deliveryAddress.length === " ") {
      setDeliveryDuration(deliveryAddress);
      setDeliveryDurationError("Enter a Number");
    } else {
      setDeliveryDuration(deliveryAddress);
      setDeliveryDurationError(" ");
    }
  };
  const handlePickupDurationrChange = (pickupDuration) => {
    setPickupDurationError("");
    if (pickupDuration.length === " ") {
      setPickupDuration(pickupDuration);
      setPickupDurationError("Enter a Number");
    } else {
      setPickupDuration(pickupDuration);
      setPickupDurationError(" ");
    }
  };
  const handleVehicleNumberChange = (vehicleNumber) => {
    setVehicleNumberError("");
    if (vehicleNumber.length === " ") {
      setVehicleNumber(vehicleNumber);
      setVehicleNumberError("Enter a Number");
    } else {
      setVehicleNumber(vehicleNumber);
      setVehicleNumberError(" ");
    }
  };
  const handleRiderPhoneNumberChange = (riderPhoneNumber) => {
    setRiderPhoneNumberError("");
    if (riderPhoneNumber.length === " ") {
      setRiderPhoneNumber(riderPhoneNumber);
      setRiderPhoneNumberError("Enter a Number");
    } else {
      setRiderPhoneNumber(riderPhoneNumber);
      setRiderPhoneNumberError("");
    }
  };

  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.keyb, { flex: 1 }]}
    >
      <SafeAreaView
        style={{ backgroundColor: theme.background, height: "100%" }}
      >
        <ScrollView style={{ backgroundColor: theme.background, flexGrow: 1 }}>
          <View
            style={[
              styles.containerfirst,
              { backgroundColor: theme.background },
            ]}
          >
            <View style={styles.orderView}>
              {imageData && (
                <Image
                  source={{ uri: imageData.uri }}
                  style={{ width: 100, height: 100 }}
                />
              )}

              <View style={styles.grayed}>
                <Text style={styles.newText}>What's your Type of Vehicle?</Text>
                <View>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    selectedStyle={styles.selectedStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={{
                      fontSize: 17,
                      color: `${theme.text}`,
                      fontFamily: "MontserratRegular",
                    }}
                    itemContainerStyle={{
                      backgroundColor: theme.backgroundAuth,
                    }}
                    data={nameOfVehicle}
                    //search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={vehicleData?.type}
                    searchPlaceholder="Search..."
                    value={name} // Use the value state here
                    onChange={handleVehicleType}
                  />
                </View>

                <View>
                  <Text style={styles.newText}>
                    What's your Name of Vehicle?
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={type}
                    onChangeText={handleTypeChange}
                    placeholder={
                      vehicleData
                        ? vehicleData?.name
                        : "Enter the Type of Ride e.g Mercendes, Toyota e.t.c"
                    }
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                  />
                  {typeError ? (
                    <Text style={styles.errorText}>{typeError}</Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.newText}>
                    What's your Vehicle Capacity in Kg?
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={capacity}
                    onChangeText={handleCapacityChange}
                    placeholder={`${vehicleData?.capacity}`}
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                    keyboardType="numeric"
                  />
                  {capacityError ? (
                    <Text style={styles.errorText}>{capacityError}</Text>
                  ) : null}
                </View>
                {/* <View>
                  <Text style={styles.newText}>What's your Location?</Text>
                  <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={handleLocationChange}
                    placeholder={vehicleData?.location}
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                  />
                  {locationError ? (
                    <Text style={styles.errorText}>{locationError}</Text>
                  ) : null}
                </View> */}
                <View>
                  <Text style={styles.newText}>What's your Base Price?</Text>
                  <TextInput
                    style={styles.input}
                    value={basePrice}
                    onChangeText={handlebasePriceChange}
                    placeholder={`${vehicleData?.basePrice}`}
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                    keyboardType="numeric"
                  />
                  {basePriceError ? (
                    <Text style={styles.errorText}>{basePriceError}</Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.newText}>What's your Rider's Name?</Text>
                  <TextInput
                    style={styles.input}
                    value={riderName}
                    onChangeText={handleRiderNameChange}
                    placeholder={`${vehicleData?.riderName}`}
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                  />
                  {riderNameError ? (
                    <Text style={styles.errorText}>{riderNameError}</Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.newText}>
                    What's your Rider's Phone Number?
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={riderPhoneNumber}
                    onChangeText={handleRiderPhoneNumberChange}
                    placeholder={`${vehicleData?.riderPhoneNumber}`}
                    //placeholder="Enter the capacity of your vehicle"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                    keyboardType="numeric"
                  />
                  {riderPhoneNumberError ? (
                    <Text style={styles.errorText}>
                      {riderPhoneNumberError}
                    </Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.newText}>
                    What's your Pickup Duration in days?
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={pickupDuration}
                    onChangeText={handlePickupDurationrChange}
                    placeholder={`${vehicleData?.pickupDuration}`}
                    // placeholder="Enter your Pickup Duration in minutes"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                    keyboardType="numeric"
                  />
                  {pickupDurationError ? (
                    <Text style={styles.errorText}>{pickupDurationError}</Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.newText}>
                    What's your Delivery Duration in days?
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={deliveryDuration}
                    onChangeText={handleDeliveryDurationrChange}
                    placeholder={`${vehicleData?.pickupDuration}`}
                    //placeholder="Enter your Delivery Duration in minutes"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                    keyboardType="numeric"
                  />
                  {deliveryDurationError ? (
                    <Text style={styles.errorText}>
                      {deliveryDurationError}
                    </Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.newText}>
                    What's your Vehicle Number?
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={vehicleNumber}
                    onChangeText={handleVehicleNumberChange}
                    placeholder={`${vehicleData?.vehicleNumber}`}
                    //placeholder="Enter your Delivery Duration in minutes"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                  />
                  {vehicleNumberError ? (
                    <Text style={styles.errorText}>{vehicleNumberError}</Text>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.newText}>Available?</Text>
                  <Switch
                    style={styles.newText}
                    trackColor={{ false: "#767577", true: "#f1c40f" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>

                <View
                  style={{
                    padding: 16,
                    marginTop: 48,
                    marginBottom: 48,
                    borderWidth: 1,
                    borderColor: `${theme.text}`,
                    borderStyle: "dashed",
                    height: "auto",
                  }}
                >
                  <TouchableOpacity onPress={pickImage}>
                    <Text style={[styles.newTexts, { color: `${theme.text}` }]}>
                      Choose an Image
                    </Text>
                  </TouchableOpacity>

                  {image ? (
                    <Image
                      style={{
                        marginTop: 16,
                        width: "100%",
                        height: 200,
                      }}
                      source={{ uri: image }}
                    />
                  ) : (
                    <Image
                      style={{
                        marginTop: 16,
                        width: "100%",
                        height: 200,
                      }}
                      source={{ uri: vehicleData?.image }}
                    />
                  )}
                </View>
                {imageError ? (
                  <View
                    style={{
                      backgroundColor: "#ff000021",
                      height: 55,
                      marginBottom: 24,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#ff0000",
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: "MontserratBold",
                      }}
                    >
                      {imageError}
                    </Text>
                  </View>
                ) : null}
                {error ? (
                  <View
                    style={{
                      backgroundColor: "#ff000021",
                      height: 55,
                      marginBottom: 24,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#ff0000",
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: "MontserratBold",
                      }}
                    >
                      {error}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                }}
              >
                <TouchableOpacity
                  onPress={handleCreateVehicle}
                  style={styles.buttonClick}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "MontserratBold", fontSize: 16 },
                    ]}
                  >
                    {isLoading ? <ActivityIndicator color="#fff" /> : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default UpdateVehicle;
