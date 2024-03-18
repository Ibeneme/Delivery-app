import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Button,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../../Providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  fetchDeliveryById,
  updateDelivery,
} from "../../../../Redux/Deliveries/Deliveries";

const Update = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [receiverName, setReceiversName] = useState("");
  const [phoneNumber, setReceiversPhoneNumber] = useState("");
  const [recieversEmail, setReceiversEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [recieversEmailError, setReceiversEmailError] = useState("");
  const [err, setErr] = useState("");
  const route = useRoute();
  const { deliveryID } = route.params;
  const userr = useSelector((state) => state?.delivery);
  const [pickupTimes, setPickupTimes] = useState(new Date());
  const currentDate = new Date();

  const [dates, setDates] = useState(new Date());
  const [Errdates, setErrDates] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchDeliveryById(deliveryID));
        const responseData = response?.payload;
        setItem(response?.payload?.data);
        //console.log(response?.payload?.data, "delivery");
      } catch (error) {
        // Handle the error appropriately
      }
    };
    fetchData();
  }, [dispatch, deliveryID]);

  const onChange = (event, selectedDate) => {
    setErrDates("");
    setShowPicker(Platform.OS === "ios");

    if (selectedDate) {
      setDates(selectedDate);
      console.log(dates, "      console.log(dates)");
    } else if (!selectedDate) {
      setErrDates("Select a Pickup Date");
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const handleReceiversNameChange = (receiverName) => {
    const formattedName = receiverName
      ? receiverName.charAt(0).toUpperCase() +
        receiverName.slice(1).toLowerCase()
      : "";

    //setNameError("Name must be more than 3 letters");
    setReceiversName(formattedName);
    if (formattedName < 4) {
      setNameError("Must be more than 4 letters");
    } else {
      setNameError("");
    }
  };

  const handleReceiverPhoneNumberChange = (phoneNumber) => {
    const numericInput = phoneNumber.replace(/\D/g, "");
    setReceiversPhoneNumber(numericInput);
    if (numericInput < 11) {
      setPhoneNumberError("Must be 11 digits");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleReceiversEmailChange = (receiverEmail) => {
    const formattedEmail = receiverEmail
      ? receiverEmail.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
      : "";

    setReceiversEmail(formattedEmail);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formattedEmail);
    setReceiversEmailError(isValidEmail);
  };

  const formatDateToMonthDayYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formattedPickupDate = formatDateToMonthDayYear(
        pickupTimes?.toISOString().split("T")[0]
      );

      const deliveryData = {
        receiverPhoneNumber: phoneNumber
          ? phoneNumber
          : item?.receiverPhoneNumber,
        receiverName: receiverName ? receiverName : item?.receiverName,
        pickupTime: item?.pickupTime?  item?.pickupTime: dates,
        deliveryId: deliveryID,
      };

      // Include recieversEmail in deliveryData if it is not an empty string
      if (recieversEmail && recieversEmail.trim() !== "") {
        deliveryData.recieversEmail = recieversEmail.trim();
      }

      const deletedMessage = "Successfully updated";

      const response = await dispatch(updateDelivery(deliveryData));

      if (response?.type === "delivery/updateDelivery/fulfilled") {
        navigation.navigate("DeleteSuccess", { deleted: deletedMessage });
      } else if (response?.type === "delivery/updateDelivery/rejected") {
        setErr("Please enter a valid email, name, and phone number. Alsoe check if your pickup time is greater then now");
      }
    } catch (error) {
      // Handle any errors that may occur during form submission or action dispatch
      // You can add error handling logic here
    } finally {
      // Ensure that the loading state is always cleared, even in case of errors
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    errorText: {
      color: "#ff0650",
      marginTop: 4,
      fontSize: 13,
      fontFamily: "MontserratRegular",
    },

    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 14,
      color: `${theme.text}60`,
    },
    selectedTextStyle: {
      fontSize: 14,
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
      fontSize: 13,
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
      backgroundColor: theme.walletViews,
      borderRadius: 12,
      height: "auto",
      padding: 16,
      marginTop: -24,
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
      fontSize: 14,
      height: 50,
      marginTop: 24,
      width: "100%",
      fontFamily: "MontserratRegular",
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
    // buttonClicks: {
    //   backgroundColor: "#f1c40f45",
    //   width: "100%",
    //   height: 50,
    //   borderRadius: 4,
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    keyb: {
      flex: 1,
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
      title: "Edit a Delivery",
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
            <View style={styles.orderView}>
              <View style={styles.grayed}>
                <View style={styles.Nextgrayed}>
                  <Text style={[styles.text, { fontSize: 18, marginTop: 8 }]}>
                    Edit Pickup Details
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      marginTop: 24,
                      marginBottom: -18,
                      fontSize: 14,
                      fontFamily: "MontserratRegular",
                      color: `${theme.text}`,
                    }}
                  >
                    Receivers Name
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={receiverName}
                    onChangeText={handleReceiversNameChange}
                    placeholder={item?.receiverName}
                    placeholderTextColor={`${theme.text}60`}
                  />
                  {nameError ? (
                    <Text style={styles.errorText}>{nameError}</Text>
                  ) : null}
                </View>
                <View>
                  <Text
                    style={{
                      marginTop: 24,
                      marginBottom: -18,
                      fontSize: 14,
                      fontFamily: "MontserratRegular",
                      color: `${theme.text}`,
                    }}
                  >
                    Receivers Phone Number
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={handleReceiverPhoneNumberChange}
                    placeholder={item?.receiverPhoneNumber}
                    placeholderTextColor={`${theme.text}60`}
                    keyboardType="numeric"
                  />
                  {phoneNumberError ? (
                    <Text style={styles.errorText}>{phoneNumberError}</Text>
                  ) : null}
                </View>
                <View>
                  <Text
                    style={{
                      marginTop: 24,
                      marginBottom: -18,
                      fontSize: 14,
                      fontFamily: "MontserratRegular",
                      color: `${theme.text}`,
                    }}
                  >
                    Receivers Email Address
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={recieversEmail}
                    onChangeText={handleReceiversEmailChange}
                    placeholder={item?.receiverEmail}
                    placeholderTextColor={`${theme.text}60`}
                  />
                  {recieversEmailError ? (
                    <Text style={styles.errorText}>{recieversEmailError}</Text>
                  ) : null}
                </View>
                <View style={{ alignItems: "flex-start", width: "100%" }}>
                  <Text
                    style={{
                      marginTop: 24,
                      marginBottom: -18,
                      fontSize: 14,
                      fontFamily: "MontserratRegular",
                      color: `${theme.text}`,
                    }}
                  >
                    Pickup Date
                  </Text>
                  <View
                    style={[
                      styles.input,
                      {
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <View>
                      <Text
                        style={[
                          {
                            fontFamily: "MontserratRegular",
                            color: `${theme.text}65`,
                            fontSize: 14,
                          },
                        ]}
                      >
                        {item?.pickupTime
                          ? item?.pickupTime
                          : dates.toISOString().split("T")[0]}
                      </Text>
                    </View>
                    <View>
                      <Button onPress={showDatepicker} title="Choose Date" />
                      {showPicker && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={
                            dates
                              ? dates
                              : item?.pickupTime.toISOString().split("T")[0]
                          }
                          mode="datetime"
                          is24Hour={true}
                          display="default"
                          onChange={onChange}
                          minimumDate={currentDate}
                        />
                      )}
                    </View>
                  </View>
                  {Errdates ? (
                    <Text style={styles.errorText}>{Errdates}</Text>
                  ) : null}
                </View>
                <View style={{ marginTop: 24 }}></View>
                <View style={{ marginTop: 24, marginBottom: 24 }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.buttonClick}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { fontFamily: "MontserratBold" },
                      ]}
                    >
                      {loading ? (
                        <ActivityIndicator color={theme.text} />
                      ) : (
                        "Next"
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
                {err ? (
                  <Text
                    style={{
                      padding: 12,
                      backgroundColor: "#ff000015",
                      color: "#ff0000",
                      textAlign: "center",
                      fontFamily: "MontserratBold",
                    }}
                  >
                    {err}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Update;
