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
import { createVehicle } from "../../../Redux/Logistics/Logistics";
// import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ImagePicker from "react-native-image-picker";

const AddVehicle = () => {
  
  const route = useRoute();
  const { pickupAddress, pickupLat, pickupLng } = route.params ?? {};

  console.log(pickupAddress, "view");
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  console.log(isEnabled, "previousState");

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
    placeholderStyle: {
      fontSize: 14,
      color: `${theme.text}65`,
      fontFamily: "MontserratRegular",
    },
    selectedTextStyle: {
      fontSize: 14,
      color: `${theme.text}`,
      fontFamily: "MontserratRegular",
    },
    selectedStyle: {
      backgroundColor: theme.backgroundAuth,
    },
    errorText: {
      color: "#ff0650",
      marginTop: 4,
      fontSize: 12,
      fontFamily: "MontserratRegular",
    },

    placeholderStyle: {
      fontSize: 12,
      color: `${theme.text}60`,
    },
    containerfirst: {
      color: "#ffffff",
      height: "100%",
      padding: 14,
      marginTop: 24,
    },

    orderView: {
      borderBottomWidth: 0,
      borderColor: `${theme.text}20`,
      marginBottom: 12,
    },
    grayed: {
      backgroundColor: theme.walletViews,
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
      fontSize: 14,
      height: 52,
      fontFamily: "MontserratRegular",
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
      fontSize: 12,
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
      title: "Add a Vehicle",
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
  const [image, setImageData] = useState(null);

  const MINIMUM_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

  // const requestPermissions = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Permission to access the photo library is required!");
  //   }
  // };

  // useEffect(() => {
  //   requestPermissions();
  // }, []);

  // const pickImage = async () => {
  //   setImageError("");
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     if (result.assets && result.assets.length > 0) {
  //       const selectedAsset = result.assets[0];
  //       if (selectedAsset.fileSize >= MINIMUM_IMAGE_SIZE_BYTES) {
  //         setImageData(selectedAsset.uri);
  //         setImageError(
  //           "Selected image is too big. Please choose a smaller image"
  //         );
  //       } else {
  //         console.log(selectedAsset.uri, "selectedAsset");
  //         setImageData(selectedAsset.uri);
  //       }
  //     }
  //   }
  // };

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

  // const pickImage = async () => {
  //   setImageError("");
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     if (result.fileSize && result.fileSize >= MINIMUM_IMAGE_SIZE_BYTES) {
  //       setImageData(result.uri);
  //       console.log(result.uri, "console");
  //       setImageError(
  //         "Selected image is too big. Please choose a smaller image"
  //       );
  //     } else {
  //       setImageData(result.uri);
  //     }
  //   }
  // };

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
  const [name, setNameNumber] = useState("");
  const [nameError, setNameNumberError] = useState("");

  const handleNameChange = (name) => {
    if (name.length >= 3) {
      setNameNumber(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
      setNameNumberError("");
    } else {
      setNameNumber(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
      setNameNumberError("Minimum 3 letters required");
    }
  };

  const handleTypeChange = (type) => {
    if (type.length >= 3) {
      setType(type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
      setTypeError("");
    } else {
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
    if (capacity.trim() === "") {
      setCapacity(capacity);
      setCapacityError("Enter a Number");
    } else {
      setCapacity(capacity);
      setCapacityError("");
    }
  };

  const handlebasePriceChange = (basePrice) => {
    if (basePrice.trim() === "") {
      setBasePrice(basePrice);
      setBasePriceError("Enter a Number");
    } else {
      setBasePrice(basePrice);
      setBasePriceError("");
    }
  };

  const handleDeliveryDurationrChange = (deliveryDuration) => {
    if (deliveryDuration.trim() === "") {
      setDeliveryDuration(deliveryDuration);
      setDeliveryDurationError("Enter a Number");
    } else {
      setDeliveryDuration(deliveryDuration);
      setDeliveryDurationError("");
    }
  };

  const handlePickupDurationrChange = (pickupDuration) => {
    if (pickupDuration.trim() === "") {
      setPickupDuration(pickupDuration);
      setPickupDurationError("Enter a Number");
    } else {
      setPickupDuration(pickupDuration);
      setPickupDurationError("");
    }
  };

  const handleVehicleNumberChange = (vehicleNumber) => {
    if (vehicleNumber.trim() === "") {
      setVehicleNumber(vehicleNumber);
      setVehicleNumberError("Enter a Number");
    } else {
      setVehicleNumber(vehicleNumber);
      setVehicleNumberError("");
    }
  };

  const handleRiderPhoneNumberChange = (riderPhoneNumber) => {
    if (riderPhoneNumber.trim() === "") {
      setRiderPhoneNumber(riderPhoneNumber);
      setRiderPhoneNumberError("Enter a Number");
    } else {
      setRiderPhoneNumber(riderPhoneNumber);
      setRiderPhoneNumberError("");
    }
  };

  // Define options for image library
  const options = {
    mediaType: "photo", // Specify that you want to pick photos only
    quality: 1,
    // Other options can be added here if needed
  };

  // Function to pick a single image from the library
  const pickSingleImage = () => {
    // Launch image library with options
    launchImageLibrary(options, (response) => {
      // Check if the user didn't cancel and there are no errors
      if (!response.didCancel && !response.errorMessage) {
        // Get the URI of the selected image
        const selectedImage = response.assets?.[0]?.uri;

        // Do something with the selected image
        if (selectedImage) {
          // Handle the selected image URI
          console.log("Selected image URI:", selectedImage);
          // You can use the URI for display or further processing
        }
      }
    });
  };

  // const handleCreateVehicle = async () => {
  //   setError("");
  //   if (
  //     type.length >= 3 &&
  //     capacity !== "" &&
  //     //location.length >= 3 &&
  //     basePrice !== "" &&
  //     riderName.length >= 3 &&
  //     riderPhoneNumber !== "" &&
  //     pickupDuration !== "" &&
  //     deliveryDuration !== "" &&
  //     vehicleNumber !== ""
  //   ) {
  //     setIsLoading(true);

  //     const formData = {
  //       name: type,
  //       capacity: capacity,
  //       location: pickupAddress,
  //       isEnabled: isEnabled,
  //       riderName: riderName,
  //       basePrice: basePrice,
  //       riderPhoneNumber: riderPhoneNumber,
  //       pickupDuration: pickupDuration,
  //       deliveryDuration: deliveryDuration,
  //       vehicleNumber: vehicleNumber,
  //       image: image,
  //       type: name,
  //     };
  //     try {
  //       console.log(formData, "jjjdd");
  //       const response = await dispatch(createVehicle(formData));
  //       console.log(response?.payload.status, "responsedssddd");
  //       setIsLoading(false);
  //       if (response?.payload?.success === "Vehicle Added Successfully.") {
  //         navigation.navigate("VehicleSuccess");
  //       }
  //       if (response?.payload.status === 413) {
  //         setError("Image size is too large");
  //       }
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     setError("Complete the form");
  //   }
  // };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        const selectedImage = response?.assets[0]?.uri;
        setImage(selectedImage);
      }
    });
  };
  const handleCreateVehicle = async () => {
    setError("");
    if (
      type.length >= 3 &&
      capacity !== "" &&
      basePrice !== "" &&
      riderName.length >= 3 &&
      riderPhoneNumber !== "" &&
      pickupDuration !== "" &&
      deliveryDuration !== "" &&
      vehicleNumber !== "" &&
      image !== null
    ) {
      setIsLoading(true);

      const formData = {
        name: type,
        capacity: capacity,
        location: pickupAddress,
        isEnabled: isEnabled,
        riderName: riderName,
        basePrice: basePrice,
        riderPhoneNumber: riderPhoneNumber,
        pickupDuration: pickupDuration,
        deliveryDuration: deliveryDuration,
        vehicleNumber: vehicleNumber,
        image: image,
        type: name,
      };
      try {
        const response = await dispatch(createVehicle(formData));
        setIsLoading(false);
        if (response?.payload?.success === "Vehicle Added Successfully.") {
          navigation.navigate("VehicleSuccess");
        }
        if (response?.payload.status === 413) {
          setError("Image size is too large");
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setError("Complete the form");
    }
  };

  const nameOfVehicle = [
    { label: "Cars", value: "Cars" },
    { label: "Trucks", value: "Trucks" },
    { label: "Motorcycles", value: "Motorcycles" },
    { label: "Bicycles", value: "Bicycles" },
    { label: "Vans", value: "Vans" },
    // { label: "Trains", value: "Trains" },
    { label: "Buses", value: "Buses" },
    { label: "Planes", value: "Planes" },
  ];

  const handleVehicleType = (nameOfVehicle) => {
    setNameNumber(nameOfVehicle?.value);
    //console.log(nameOfVehicle?.value, "vehicleTypes");
    //console.log(name,'hhh')
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
                      fontSize: 14,
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
                    placeholder="Select Vehicle Type"
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
                    placeholder="Enter the name of your Ride e.g Mercendes, Toyota e.t.c"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                  />
                  {typeError ? (
                    <Text style={styles.errorText}>{typeError}</Text>
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
                    placeholder="Enter your  Vehicle Number"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                  />
                  {vehicleNumberError ? (
                    <Text style={styles.errorText}>{vehicleNumberError}</Text>
                  ) : null}
                </View>
                {/* <View>
                  <Text style={styles.newText}>What's your Location?</Text>
                  <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={handleLocationChange}
                    placeholder="Enter your Location"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                  />
                  {locationError ? (
                    <Text style={styles.errorText}>{locationError}</Text>
                  ) : null}
                </View> */}
                <View>
                  <Text style={styles.newText}>
                    What's your Vehicle Capacity in Kg?
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={capacity}
                    onChangeText={handleCapacityChange}
                    placeholder="Enter the capacity of your vehicle"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{ fontFamily: "MontserratBold" }}
                    keyboardType="numeric"
                  />
                  {capacityError ? (
                    <Text style={styles.errorText}>{capacityError}</Text>
                  ) : null}
                </View>

                <View>
                  <Text style={styles.newText}>What's your Base Price?</Text>
                  <TextInput
                    style={styles.input}
                    value={basePrice}
                    onChangeText={handlebasePriceChange}
                    placeholder="Enter your base price"
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
                    placeholder="Enter your Rider's Name"
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
                    placeholder="Enter your Rider's Phone Number"
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
                    placeholder="Enter your Pickup Duration"
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
                    placeholder="Enter your Delivery Duration"
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
                    // disabled={!isEnabled}
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
                    <Text style={[styles.newTexts]}>Choose an Image</Text>
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
                  ) : null}
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
                        fontSize: 14,
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
                        fontSize: 14,
                        textAlign: "center",
                        fontFamily: "MontserratBold",
                      }}
                    >
                      {error}
                    </Text>
                  </View>
                ) : null}
              </View>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={styles.imageUploadButton}
              >
                <Text style={styles.buttonText}>Choose a Photo</Text>
              </TouchableOpacity>
              {selectedImage && (
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.image}
                    onError={(error) =>
                      console.log("Image loading error:", error)
                    }
                  />
                  <TouchableOpacity
                    onPress={handleDeleteImage}
                    style={styles.deleteButton}
                  ></TouchableOpacity>
                </View>
              )}
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
                      { fontFamily: "MontserratBold", fontSize: 12 },
                    ]}
                  >
                    {isLoading ? <ActivityIndicator color="#fff" /> : "Next"}
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

export default AddVehicle;
