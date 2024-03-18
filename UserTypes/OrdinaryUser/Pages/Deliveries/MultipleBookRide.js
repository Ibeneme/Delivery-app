import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../../Providers/ThemeProvider";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch } from "react-redux";
import { fetchLogisticsCompanies } from "../../../../Redux/Deliveries/Deliveries";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Button, Platform } from "react-native";

const MultipleBookRide = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { selectedLocations, pickupLocation } = route.params;
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(
    Array(selectedLocations.length).fill(true)
  );

  const [currentDate, setCurrentDate] = useState(getCurrentDateWithOffset(4));
  function getCurrentDateWithOffset(offsetInHours) {
    const date = new Date();
    date.setHours(date.getHours() + offsetInHours);
    return date;
  }

  const [nameArray, setNameArray] = useState(
    selectedLocations.map((location, index) => ({
      firstName: "",
      lastName: "",
      deliveryAddress: location?.address || null,
      deliveryLat: location?.latitude || null,
      deliveryLng: location?.longitude || null,
      pickupAddress: pickupLocation?.pickupAddress || null,
      pickupLat: pickupLocation?.pickupLat || null,
      pickupLng: pickupLocation?.pickupLng || null,
      email: "",
      phoneNumber: "",
      selectedDate: currentDate,
      packageType: null,
      vehicleType: null,
      packageWeight: "",
      addNotes: "",
      error: {
        firstName: "",
        email: "",
        date: "",
        packageType: "",
        phoneNumber: "",
        vehicleType: "",
        packageWeight: "",
        addNotes: "",
      },
    }))
  );
  const handleNotesChange = (index, text) => {
    const formattedText = text.replace(/\. *([a-z])/g, (match, group) => {
      return `. ${group.toUpperCase()}`;
    });

    const newArray = [...nameArray];
    newArray[index].addNotes = formattedText;

    const finalFormattedText =
      formattedText.charAt(0).toUpperCase() + formattedText.slice(1);

    newArray[index].addNotes = finalFormattedText;
    newArray[index].error.addNotes = "";

    setNameArray(newArray);
  };

  const handlePackageWeightChange = (index, text) => {
    const newArray = [...nameArray];
    newArray[index].packageWeight = text;
    newArray[index].error.packageWeight = !text.trim()
      ? "Package weight must be filled"
      : "";
    setNameArray(newArray);
  };

  const handlePhoneNumberChange = (index, text) => {
    const newArray = [...nameArray];
    newArray[index].phoneNumber = text;
    newArray[index].error.phoneNumber =
      text.length > 0 && text.length < 10
        ? "Phone number must be at least 10 digits"
        : "";
    setNameArray(newArray);
  };

  const handleDropdownChange = (index, value, fieldName) => {
    const newArray = [...nameArray];
    newArray[index][fieldName] = value.value;
    newArray[index].error[fieldName] = "";
    setNameArray(newArray);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleSubmitt = async () => {
    setLoading(true);
    const newArray = nameArray.map((item, index) => {
      const updatedItem = { ...item };

      if (!item.packageType) {
        updatedItem.error.packageType = "Package Type must be selected";
      }
      if (!item.firstName.trim()) {
        updatedItem.error.firstName = "First Name is required";
      }
      if (!item.phoneNumber.trim() || item.phoneNumber.length < 10) {
        updatedItem.error.phoneNumber =
          "Phone number must be at least 10 digits";
      }
      if (!item.selectedDate) {
        updatedItem.error.date = "Selected date is required";
      }
      if (!item.packageWeight.trim()) {
        updatedItem.error.packageWeight = "Package weight is required";
      }
      if (!item.vehicleType) {
        updatedItem.error.vehicleType = "Vehicle Type must be selected";
      }

      return updatedItem;
    });

    setNameArray(newArray);

    for (let index = 0; index < newArray.length; index++) {
      const item = newArray[index];
      if (!Object.values(item.error).some(Boolean)) {
        const { packageWeight, deliveryAddress, pickupAddress, vehicleType } =
          item;
        try {
          const response = await dispatch(
            fetchLogisticsCompanies({
              packageWeight,
              pickupAddress,
              deliveryAddress,
              vehicleType,
            })
          );
          console.log(
            response,
            "0LTRkMDgtYTAzZS1mMzdlMzFmZGNjYWIiLCJ1c2VyVHlwZSI6Ik9yZGluYXJ5VXNlciIsInJvbGUiOiJBZG1pbiIsImlzVmVyaWZpZWRBY2NvdW50Ijp0cnVlLCJpYXQiOjE3MDgyNDk4OTEsImV4cCI6MTcwODI1MzQ5MX0.D6GfD6_lqVMfkhEo5b4jjUDJhM7lvoxnVjWh6a77bnw eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOWNmMjA5NC00YTZjLTQzZDUtOTQ4NC1iYTc2ODY1ZmNhMzgiLCJmdWxsTmFtZSI6IklrZW5uYSBJYmVuZW1lIiwiZW1haWwiOiJJYkBhbnRpZ3Jhdml0eWdyb3VwLm5nIiwib3JkaW5hcnlVc2VySWQiOiIzMTA5OTEwNS1lYjg0LTRkMDgtYTAzZS1mMzdlMzFmZGNjYWIiLCJ1c2VyVHlwZSI6Ik9yZGluYXJ5VXNlciIsInJvbGUiOiJBZG1pbiIsImlzVmVyaWZpZWRBY2NvdW50Ijp0cnVlLCJpYXQiOjE3MDgyNDk4OTEsImV4cCI6MTcwODI1MzQ5MX0.D6GfD6_lqVMfkhEo5b4jjUDJhM7lvoxnVjWh6a77bnw"
          );

          if (
            response?.payload?.data ==
            `{
            "err": {}
         }`
          ) {
            // console.log("omooo");
          } else if (
            response?.type === "delivery/fetchLogisticsCompanies/fulfilled"
          ) {
            // console.log(
            //   `Item ${index + 1} submitted successfully!`,
            //   response?.type
            // );
            navigation.navigate("GetMultipleRide", {
              selectedLocations: nameArray,
              pickupLocation: pickupLocation,
            });
          } else {
            // console.log(`Item ${index + 1} submitted successfully!`, response);
          }
        } catch (error) {
          // console.log(
          //   `Item ${index + 1} submission failed. Error:`,
          //   error?.response?.status
          // );
        }
      } else {
        // console.log(
        //   `Item ${index + 1} has errors. Please fill in all required fields.`
        // );
      }
    }

    setLoading(false);
  };

  const [showPicker, setShowPicker] = useState(false);
  const [showPickerIndex, setShowPickerIndex] = useState("");

  const showDatepicker = (index) => {
    setShowPicker(true);
    setShowPickerIndex(index);
    console.log("showw");
  };

  const onChange = (event, selectedDate, index) => {
    console.log(event?.type, selectedDate, index, "event");
    if (event.type === "set") {
      const newArray = [...nameArray];
      setShowPicker(false);
      if (selectedDate < new Date()) {
        newArray[index].error.date = "Selected date must be today or later";
      } else {
        newArray[index].error.date = "";
      }
      newArray[index].selectedDate = selectedDate;
      setNameArray(newArray); // moved this line inside the if block
    }
  };
  const handleChange = (index, key, text) => {
    const newArray = [...nameArray];
    newArray[index][key] = text;
    const { firstName, email } = newArray[index];
    const errors = {
      firstName:
        key === "firstName" && text.length < 3
          ? "Name must be at least 3 characters"
          : "",
      email:
        key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
          ? "Invalid email format"
          : "",
    };

    newArray[index].error = errors;

    setNameArray(newArray);
  };
  const toggleVisibility = (index) => {
    const newVisibility = [...visibility];
    newVisibility[index] = !newVisibility[index];
    setVisibility(newVisibility);
  };
  const navigation = useNavigation();
  const { theme } = useTheme();
  const packages = [
    { label: "Fashion", value: "Fashion" },
    { label: "Electronics", value: "Electronics" },
    { label: "Groceries", value: "Groceries" },
    { label: "Clothing", value: "Clothing" },
    { label: "Jewelry / Accessories", value: "Jewelry / Accessories" },
    { label: "Documents", value: "Documents" },
    { label: "Health", value: "Health" },
    { label: "Products", value: "Products" },
    { label: "Computer Accessories", value: "Computer Accessories" },
    { label: "Phones", value: "Phones" },
    { label: "Frozen Foods", value: "Frozen Foods" },
    { label: "Food", value: "Food" },
    { label: "Miscellaneous", value: "Miscellaneous" },
    { label: "Others", value: "Others" },
  ];
  const vehicleTypes = [
    { label: "Cars", value: "Cars" },
    { label: "Trucks", value: "Trucks" },
    { label: "Motorcycles", value: "Motorcycles" },
    { label: "Bicycles", value: "Bicycles" },
    { label: "Vans", value: "Vans" },
    // { label: "Trains", value: "Trains" },
    { label: "Buses", value: "Buses" },
    { label: "Planes", value: "Planes" },
  ];
  const styles = StyleSheet.create({
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
      fontSize: 13,
      color: `${theme.text}65`,
      fontFamily: "MontserratRegular",
    },
    selectedTextStyle: {
      fontSize: 14,
      color: `${theme.text}`,
      fontFamily: "MontserratRegular",
    },
    selectedStyle: {
      backgroundColor: "red",
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      display: "none",
    },
    placeholderTexts: {
      position: "absolute",
      bottom: "10%",
      right: 10,
      padding: 10,
      color: "red",
      fontFamily: "MontserratRegular",
    },
    passwordVisibilityIcon: {
      position: "absolute",
      bottom: "10%",
      right: 0,
      padding: 10,
      color: theme.text,
      fontFamily: "MontserratRegular",
      borderColor: "#66666645",
      borderLeftWidth: 1,
    },
    passwordInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      position: "relative",
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
      fontSize: 14,
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
    mainColor: {
      backgroundColor: theme.main,
    },
    Nextgrayed: {
      flexDirection: "column",
      justifyContent: "space-between",
      paddingBottom: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontSize: 13,
      height: 53,
      marginTop: 24,
      width: "100%",
      fontFamily: "MontserratRegular",
    },
    buttonClick: {
      backgroundColor: "#f1c40f",
      width: "100%",
      height: 53,
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonClicks: {
      backgroundColor: "#f1c40f45",
      width: "100%",
      height: 53,
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    keyb: {
      flex: 1,
    },
    dropdown: {
      height: 55,
      borderColor: `${theme.text}65`,
      borderWidth: 0.5,
      borderRadius: 4,
      paddingHorizontal: 8,
      marginTop: 24,
      backgroundColor: theme.backgroundAuth,
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
      title: "Multiple Delivery",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
        fontSize: 14,
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const hasErrors = nameArray.some((item) =>
    Object.values(item.error).some(Boolean)
  );

  return (
    <KeyboardAvoidingView enabled={true} style={[styles.keyb, { flex: 1 }]}>
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
            <View>
              <FlatList
                data={selectedLocations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.orderView}>
                    <View style={[styles.grayed, { marginTop: 18 }]}>
                      <View style={[styles.Nextgrayed]}>
                        <View key={index}>
                          <View
                            style={[
                              styles.mainColor,
                              // hasErrors && {
                              //   backgroundColor: "#ff290085",
                              //   borderColor: "#ff2900",
                              //   borderWidth: 2, },

                              {
                                height: "auto",
                                fontFamily: "MontserratBold",

                                padding: 12,
                                borderRadius: 6,
                                flexDirection: "column",
                                gap: 6,
                                width: "auto",
                              },
                            ]}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <View
                                style={[
                                  {
                                    backgroundColor: "#000",
                                    width: 40,
                                    height: 40,
                                    borderRadius: 343,
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                ]}
                              >
                                <Text
                                  style={[
                                    {
                                      fontFamily: "MontserratBold",
                                      fontSize: 15,
                                      color: "#fff",
                                    },
                                  ]}
                                >
                                  {index + 1}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => toggleVisibility(index)}
                              >
                                <Icon
                                  name={
                                    visibility[index]
                                      ? "chevron-down"
                                      : "chevron-up"
                                  }
                                  size={20}
                                  color={"#000"}
                                />
                              </TouchableOpacity>
                            </View>
                            <View>
                              <Text
                                style={{
                                  height: "auto",
                                  fontFamily: "MontserratBold",
                                  fontSize: 14,
                                  width: "auto",
                                  paddingRight: 16,
                                }}
                              >
                                {item.address}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {visibility[index] && (
                          <View>
                            <View>
                              <Text
                                style={[
                                  styles.text,
                                  { fontSize: 13, marginTop: 24 },
                                ]}
                              >
                                Add Delivery Details
                              </Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                              <TextInput
                                style={styles.input}
                                value={nameArray[index].firstName}
                                onChangeText={(text) =>
                                  handleChange(index, "firstName", text)
                                }
                                placeholder="Enter the Receivers Full Name"
                                placeholderTextColor={`${theme.text}60`}
                                placeholderStyle={{
                                  fontFamily: "MontserratBold",
                                }}
                              />
                              {nameArray[index].error.firstName ? (
                                <Text
                                  style={[styles.errorText, { color: "red" }]}
                                >
                                  {nameArray[index].error.firstName}
                                </Text>
                              ) : null}
                            </View>
                            <View>
                              <TextInput
                                style={styles.input}
                                value={nameArray[index].phoneNumber}
                                onChangeText={(text) =>
                                  handlePhoneNumberChange(index, text)
                                }
                                placeholder="Enter the Receiver's Phone Number"
                                keyboardType="numeric"
                                placeholderTextColor={`${theme.text}60`}
                                placeholderStyle={{
                                  fontFamily: "MontserratBold",
                                }}
                              />
                              {nameArray[index].error.phoneNumber ? (
                                <Text
                                  style={[styles.errorText, { color: "red" }]}
                                >
                                  {nameArray[index].error.phoneNumber}
                                </Text>
                              ) : null}
                            </View>
                            <View>
                              <TextInput
                                style={styles.input}
                                value={nameArray[index].email}
                                onChangeText={(text) =>
                                  handleChange(index, "email", text)
                                }
                                placeholder="Receiver's email address - (Optional)"
                                placeholderTextColor={`${theme.text}60`}
                                placeholderStyle={{
                                  fontFamily: "MontserratBold",
                                }}
                              />
                              {nameArray[index].error.email ? (
                                <Text
                                  style={[styles.errorText, { color: "red" }]}
                                >
                                  {nameArray[index].error.email}
                                </Text>
                              ) : null}
                            </View>
                            <View>
                              <Text
                                style={{
                                  marginTop: 24,
                                  marginBottom: -18,
                                  fontSize: 13,
                                  fontFamily: "MontserratBold",
                                  color: `${theme.text}`,
                                }}
                              >
                                Choose Pickup date
                              </Text>
                              <View
                                style={[
                                  styles.input,
                                  {
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "100%",
                                  },
                                ]}
                              >
                                <View>
                                  <Text
                                    style={[
                                      {
                                        fontFamily: "MontserratRegular",
                                        color: `${theme.text}65`,
                                        fontSize: 13,
                                      },
                                    ]}
                                  >{`${
                                    nameArray[index].selectedDate
                                      ? nameArray[index].selectedDate
                                          ?.toISOString()
                                          .split("T")[0]
                                      : "Choose Pickup date"
                                  }`}</Text>
                                </View>
                                <View key={index}>
                                  <Button
                                    onPress={() => showDatepicker(index)}
                                    title="Choose Date"
                                  />
                                  {showPicker && showPickerIndex === index && (
                                    <DateTimePicker
                                      testID="dateTimePicker"
                                      value={nameArray[index]?.selectedDate}
                                      mode="date"
                                      is24Hour={true}
                                      display="default"
                                      onChange={(event, selectedDate) =>
                                        onChange(event, selectedDate, index)
                                      }
                                      style={{
                                        backgroundColor: "#f1c40f",
                                        borderRadius: 24,
                                        width: "100%",
                                      }}
                                      minimumDate={new Date()}
                                      timeZoneOffsetInMinutes={-60}
                                    />
                                  )}
                                </View>
                                {/*  
                                <View>
                                  <Text
                                    style={[
                                      {
                                        fontFamily: "MontserratRegular",
                                        color: `${theme.text}65`,
                                        fontSize: 13,
                                      },
                                    ]}
                                  >{`${
                                    nameArray[index].selectedDate
                                      ? nameArray[index].selectedDate
                                          ?.toISOString()
                                          .split("T")[0]
                                      : "Choose Pickup date"
                                  }`}</Text>
                                </View>
                                <View>
                                  <DateTimePicker
                                    testID="dateTimePicker"
                                    value={nameArray[index]?.selectedDate}
                                    mode="datetime"
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, selectedDate) =>
                                      onChange(event, selectedDate, index)
                                    }
                                    style={{
                                      backgroundColor: "#f1c40f",
                                      borderRadius: 24,
                                      width: "100%",
                                    }}
                                    minimumDate={new Date()}
                                    timeZoneOffsetInMinutes={-60}
                                  />
                                </View>  */}
                              </View>

                              {nameArray[index].error.date ? (
                                <Text style={{ color: "red" }}>
                                  {nameArray[index].error.date}
                                </Text>
                              ) : null}
                            </View>

                            <View
                              style={{
                                marginTop: 48,
                              }}
                            >
                              <View style={styles.Nextgrayed}>
                                <Text
                                  style={[
                                    styles.text,
                                    { fontSize: 13, marginTop: 8 },
                                  ]}
                                >
                                  Pickup Details
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    marginTop: 24,
                                    marginBottom: -18,
                                    fontSize: 13,
                                    fontFamily: "MontserratBold",
                                    color: `${theme.text}90`,
                                  }}
                                >
                                  Choose a package Weight in kg
                                </Text>
                                <View
                                  style={[
                                    styles.inputContainer,
                                    {
                                      position: "relative",
                                      flexDirection: "column",
                                      // alignItems: "center",
                                      width: "100%",
                                    },
                                  ]}
                                >
                                  <View style={styles.passwordInputContainer}>
                                    <TextInput
                                      style={styles.input}
                                      value={nameArray[index].packageWeight}
                                      onChangeText={(text) =>
                                        handlePackageWeightChange(index, text)
                                      }
                                      placeholder="Enter Package Weight"
                                      keyboardType="numeric"
                                      placeholderTextColor={`${theme.text}60`}
                                      placeholderStyle={{
                                        fontFamily: "MontserratBold",
                                      }}
                                    />

                                    <TouchableOpacity
                                      style={styles.passwordVisibilityIcon}
                                    >
                                      <Text
                                        style={{
                                          fontFamily: "MontserratBold",
                                          color: theme.text,
                                        }}
                                      >
                                        Kg
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                  {nameArray[index].error.packageWeight ? (
                                    <Text
                                      style={[
                                        styles.errorText,
                                        { color: "red" },
                                      ]}
                                    >
                                      {nameArray[index].error.packageWeight}
                                    </Text>
                                  ) : null}
                                </View>
                              </View>

                              <View>
                                <View>
                                  <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    selectedStyle={styles.selectedStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{
                                      color: `${theme.text}`,
                                      fontFamily: "MontserratRegular",
                                      fontSize: 13,
                                    }}
                                    itemContainerStyle={{
                                      backgroundColor: theme.backgroundAuth,
                                    }}
                                    selectedItemStyle={{
                                      backgroundColor: "blue", // Set the background color for active (hovered) item
                                    }}
                                    data={packages}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Package Type"
                                    value={nameArray[index].packageType}
                                    onChange={(value) =>
                                      handleDropdownChange(
                                        index,
                                        value,
                                        "packageType"
                                      )
                                    }
                                  />
                                  {nameArray[index].error.packageType ? (
                                    <Text
                                      style={[
                                        styles.errorText,
                                        { color: "red" },
                                      ]}
                                    >
                                      {nameArray[index].error.packageType}
                                    </Text>
                                  ) : null}
                                </View>
                                <View>
                                  <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    selectedStyle={styles.selectedStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    itemTextStyle={{
                                      fontSize: 13,
                                      color: `${theme.text}`,
                                      fontFamily: "MontserratRegular",
                                    }}
                                    itemContainerStyle={{
                                      backgroundColor: theme.backgroundAuth,
                                    }}
                                    data={vehicleTypes}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={nameArray[index].vehicleType}
                                    placeholder="Select Vehicle Type"
                                    searchPlaceholder="Search..."
                                    onChange={(value) =>
                                      handleDropdownChange(
                                        index,
                                        value,
                                        "vehicleType"
                                      )
                                    }
                                  />
                                  {nameArray[index].error.vehicleType ? (
                                    <Text
                                      style={[
                                        styles.errorText,
                                        { color: "red" },
                                      ]}
                                    >
                                      {nameArray[index].error.vehicleType}
                                    </Text>
                                  ) : null}
                                </View>
                              </View>

                              <View
                                style={{
                                  marginTop: 48,
                                }}
                              >
                                <View style={styles.Nextgrayed}>
                                  <Text style={styles.text}>Add Notes</Text>
                                  <Text
                                    style={[
                                      styles.passwordtext,
                                      { color: `${theme.text}` },
                                    ]}
                                  >
                                    Optional
                                  </Text>
                                </View>

                                <View>
                                  <TextInput
                                    style={styles.input}
                                    value={nameArray[index].addNotes}
                                    onChangeText={(text) =>
                                      handleNotesChange(index, text)
                                    }
                                    placeholder="Add Notes (optional)"
                                    placeholderTextColor={`${theme.text}60`}
                                    placeholderStyle={{
                                      fontFamily: "MontserratBold",
                                    }}
                                  />
                                </View>
                              </View>
                              <View
                                style={{
                                  marginTop: 64,
                                }}
                              ></View>
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                )}
              />
              <View
                style={{
                  marginTop: 24,
                  marginBottom: 343,
                }}
              >
                <TouchableOpacity
                  onPress={handleSubmitt}
                  style={styles.buttonClick}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "MontserratBold", fontSize: 13 },
                    ]}
                  >
                    {loading ? (
                      <ActivityIndicator color="#000" />
                    ) : (
                      "Submit for all"
                    )}
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

export default MultipleBookRide;
