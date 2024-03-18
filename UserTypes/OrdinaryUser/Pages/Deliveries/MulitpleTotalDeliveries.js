import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Linking,ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../Providers/ThemeProvider";
//import { ActivityIndicator, RadioButton } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import {
  createDelivery,
  fetchAllDeliveries,
} from "../../../../Redux/Deliveries/Deliveries";
import {
  OrdinaryUserPaymentHistory,
  initializePayment,
  payFromWallet,
} from "../../../../Redux/Payment/Payments";
// import { WebView } from "react-native-webview";
const MultipleTotalDeliveries = () => {
  const currencyData = [
    { label: "NGN", value: "NGN" },
    { label: "USD", value: "USD" },
  ];
  const [currency, setCurrency] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const handleCurrency = (currency) => {
    if (currency === "") {
      setErrorCurrency("Choose a Currency");
    } else {
      setCurrency(currency?.value);
      console.log(currency?.value, "currency");
    }
  };

  const navigation = useNavigation();
  const { theme } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [error, setError] = useState("");
  const [errorCurrency, setErrorCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionDescriptionError, setTransactionDescriptionError] =
    useState("");
  const [showWebView, setShowWebView] = useState(false);
  const [checkoutLink, setCheckoutlink] = useState("false");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const ordinaryUserId = user?.sub;
  const [payments, setWalletHistory] = useState("");

  //onchange functions
  const handleTransactionDescription = (transactionDescription) => {
    // const formatteddes =
    //   transactionDescription.charAt(0).toUpperCase() +
    //   transactionDescription.slice(1).toLowerCase();

    setTransactionDescriptionError("");
    //console.log("transactionDescription", transactionDescription);
    setTransactionDescription(transactionDescription);
  };
  const handlePaymentChange = (newMethod) => {
    setPaymentMethod(newMethod);
    console.log(paymentMethod, newMethod, "paymentMethod");
  };

  //   useEffect(() => {
  //     // Re-fetch whenever `payments` change or component mounts
  //     fetchWalletHistory();
  //   }, [payments]);

  //   useEffect(() => {
  //     OrdinaryUserPaymentHistory(ordinaryUserId);
  //   }, [dispatch]);

  const fetchWalletHistory = async () => {
    try {
      setError("");
      const result = await dispatch(OrdinaryUserPaymentHistory(ordinaryUserId));
      const string = JSON.stringify(result.payload.data);
      const parse = JSON.parse(string);
      setWalletHistory(parse?.payments);
    } catch (error) {
      setError("Server Down Time, Network Error");
    }
  };

  console.log(selectedItemsArray, "selectedItemsArray");

  const route = useRoute();
  //   const {
  //     receiverName,
  //     phoneNumber,
  //     recieversEmail,
  //     pickupAddress,
  //     deliveryAddress,
  //     pickupTimes,
  //     packageWeight,
  //     logisticsCompanyID,
  //     vehicleID,
  //     companyName,
  //     companyCost,
  //     packageType,
  //     vehicleNumber,
  //     deliveryLat,
  //     deliveryLng,
  //     pickupLat,
  //     pickupLng,
  //     selectedItemsArray,
  //   } = route.params;
  const { selectedItemsArray } = route.params;
  const [
    rideOption,
    deliveryAddress,
    pickupAddress,
    packageWeight,
    vehicleType,
    pickupLat,
    pickupLng,
    deliveryLat,
    deliveryLng,
  ] = selectedItemsArray;
  const [deliveries, setDeliveryData] = useState([]);

  console.log(
    JSON.stringify(rideOption, deliveryAddress, null, 3),
    "rideOption"
  );

  const handleCreateDelivery = async () => {
    setLoading(true);

    if (currency !== "NGN" && currency !== "USD") {
      alert("Choose a valid Currency");
      setLoading(false);
      return;
    }

    if (transactionDescription.trim() === "") {
      setTransactionDescriptionError("Enter a Transaction Description");
      setLoading(false);
      return;
    }

    const isUSD = currency === "USD";
    const companyCostNew = isUSD ? totalCost / 780.904 : totalCost;

    const deliveryDataArray = selectedItemsArray.map((item) => {
      const deliveryData = {
        receiverPhoneNumber: rideOption?.phoneNumber || null,
        pickupAddress: rideOption?.pickupAddress,
        deliveryAddress: rideOption?.deliveryAddress,
        cost: companyCostNew || null,
        packageWeight: rideOption?.packageWeight,
        paymentMethod: paymentMethod,
        receiverName: rideOption?.firstName,
        pickupTime: rideOption?.selectedDate,
        logisticsCompanyID: rideOption?.rideOption?.logisticsCompanyID,
        vehicleID: rideOption?.rideOption?.vehicleID,
        pickupCoordinates: `${rideOption?.pickupLat}/${rideOption?.pickupLng}`,
        deliveryCoordinates: `${rideOption?.deliveryLat}/${rideOption?.deliveryLng}`,
        pickupPhoneNumber: rideOption?.phoneNumber || null,
        pickupName: rideOption?.firstName || null,
      };
      if (item?.recieversEmail) {
        deliveryData.recieversEmail = item?.recieversEmail;
      }

      return deliveryData;
    });

    try {
      const response = await dispatch(createDelivery(deliveryDataArray));
      setLoading(false);
      console.log(response?.payload?.data?.paymentRef, "respoo");
      setPaymentRef(response?.payload?.data?.paymentRef);
      if (response?.payload?.success === "Delivery Added successfully") {
        if (paymentMethod === "card") {
          handleInitializePayment();
        } else if (paymentMethod === "wallet") {
          handleInitializeWallet();
        } else if (paymentMethod === "cash") {
          navigation.navigate("successcash");
        } else {
          alert("An Error Occurred while processing");
        }
      } else if (
        response?.payload?.data &&
        response?.payload?.data.err === "Bad Request" &&
        response?.payload?.data.errors.includes(
          '"recieversEmail" must be a valid email'
        )
      ) {
        alert("Bad Request");
      } else {
        alert("Bad Request");
      }
    } catch (error) {
      console.log(error, "errheres");
      alert(
        "Please Go Back and verify you used a valid Email address or Phone Number or and a Pickup date greater than today, Thanks"
      );
      console.log(error, "shhs");

      if (error === `[ReferenceError: Property 'resultAction' doesn't exist]`) {
        alert(
          "Please Go Back and verify you used a valid Email address or Phone Number or and a Pickup date greater than today, Thanks"
        );
      }
    }
  };

  const handleInitializePayment = () => {
    setLoading(true);
    const isUSD = currency === "USD";
    const companyCostNew = isUSD ? totalCost / 780.904 : totalCost;

    if (currency === "NGN") {
      const paymentData = {
        amount: companyCostNew,
        paymentRef: paymentRef ? paymentRef : null,
        currency: currency,
        successPageURL: "https://www.quicklogisticshub.com/payment_feedback",
        transactionDescription: transactionDescription,
        logisticsId: logisticsCompanyID,
        logisticsName: companyName ? companyName : " ",
      };
      dispatch(initializePayment(paymentData))
        .then((response) => {
          setLoading(false);
          console.log(response, "5399838383838381");
          if (response?.payload?.checkout) {
            const checkoutLink = response.payload.checkout;
            setCheckoutlink(checkoutLink);
            navigation.navigate("webdelivery", {
              checkoutLink: checkoutLink,
            });
          } else if (response?.payload === undefined) {
            setLoading(false);
            alert("Error in processing transaction");
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else if (currency === "USD") {
      const paymentData = {
        amount: rideOption?.rideOption?.cost / 780.904,
        currency: currency,
        paymentRef: paymentRef,
        successPageURL: "https://www.quicklogisticshub.com/payment_feedback",
        transactionDescription: transactionDescription,
        logisticsId: logisticsCompanyID,
        logisticsName: companyName ? companyName : " ",
      };
      dispatch(initializePayment(paymentData))
        .then((response) => {
          setLoading(false);
          console.log(response, "5399838383838381");
          if (response?.payload?.checkout) {
            const checkoutLink = response.payload.checkout;
            setCheckoutlink(checkoutLink);
            navigation.navigate("webdelivery", {
              checkoutLink: checkoutLink,
            });
          } else if (response?.payload === undefined) {
            setLoading(false);
            alert("Error in processing transaction");
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const handleInitializeWallet = () => {
    setLoading(true);
    const isUSD = currency === "USD";
    const companyCostNew = isUSD ? totalCost / 780.904 : totalCost;

    if (currency === "NGN") {
      const paymentData = {
        amount: companyCostNew,
        delivery: rideOption?.rideOption?.logisticsCompanyID,
        currency: currency,
        transactionDescription: transactionDescription,
        paymentRef: paymentRef,
      };

      dispatch(payFromWallet(paymentData))
        .then((response) => {
          console.log(response, "payrespo");
          setLoading(false);
          if (response?.error?.message === "Insufficient Balance") {
            alert("Insufficient Wallet Balance");
          } else if (response?.type === "payment/payFromWallet/fulfilled") {
            //handleCreateDelivery();
            navigation.navigate("successcash");
          } else alert("Error while processing");
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
          setError("Pls Check you email address, enter a valid one");
        });
    } else if (currency === "NGN") {
      const paymentData = {
        amount: companyCostNew,
        delivery: rideOption?.rideOption?.logisticsCompanyID,
        currency: currency,
        transactionDescription: transactionDescription,
        paymentRef: paymentRef,
      };

      dispatch(payFromWallet(paymentData))
        .then((response) => {
          console.log(response, "payrespo");
          setLoading(false);
          if (response?.error?.message === "Insufficient Balance") {
            alert("Insufficient Wallet Balance");
          } else if (response?.type === "payment/payFromWallet/fulfilled") {
            //handleCreateDelivery();
            navigation.navigate("successcash");
          } else alert("Error while processing");
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
          setError("Pls Check you email address, enter a valid one");
        });
    }
  };

  const styles = StyleSheet.create({
    errorText: {
      color: "#ff0650",
      marginTop: 4,
      fontSize: 14,
      fontFamily: "MontserratRegular",
    },
    placeholderStyle: {
      fontSize: 17,
      color: `${theme.text}65`,
      fontFamily: "MontserratRegular",
    },
    selectedTextStyle: {
      fontSize: 17,
      color: `${theme.text}`,
      fontFamily: "MontserratRegular",
    },
    selectedStyle: {
      backgroundColor: theme.backgroundAuth,
    },
    passwordtext: {
      textAlign: "left",
      paddingTop: 16,
      fontSize: 15,
      fontFamily: "MontserratBold",
    },
    passwordtexts: {
      textAlign: "left",
      paddingTop: 5,
      fontSize: 15,
      fontFamily: "MontserratRegular",
    },
    dropdown: {
      height: 55,
      borderColor: `${theme.text}65`,
      borderWidth: 0.5,
      borderRadius: 4,
      paddingHorizontal: 8,
      marginTop: 8,
      marginBottom: 24,
      backgroundColor: theme.backgroundAuth,
    },
    containerfirst: {
      backgroundColor: "#000",
      color: "#ffffff",
      height: "100%",
      padding: 15,
      marginTop: 24,
    },
    text: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "bold",
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
      fontSize: 16,
      height: 50,
      marginTop: 24,
      width: "100%",
      fontFamily: "MontserratRegular",
    },

    keyb: {
      flex: 1,
    },
    radioLabel: {
      color: `${theme.text}`,
      fontSize: 16,
      fontFamily: "MontserratRegular",
    },
    buttonClick: {
      backgroundColor: "#f1c40f",
      width: "100%",
      height: 50,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
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
      title: "Ride Summary",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const [checked, setChecked] = React.useState("first");

  const renderRadioButtonIcon = ({ checked }) => (
    <View style={[styles.radioButton, checked && { backgroundColor: "red" }]} />
  );

  const totalCost = selectedItemsArray.reduce(
    (accumulator, item) => accumulator + item?.rideOption.cost,
    0
  );
  const toggleDetailsVisibility = (index) => {
    const newVisibility = [...detailsVisibility];
    newVisibility[index] = !newVisibility[index];
    setDetailsVisibility(newVisibility);
  };

  const [detailsVisibility, setDetailsVisibility] = useState(
    Array(selectedItemsArray.length).fill(true)
  );

  return (
    <KeyboardAvoidingView enabled={true} style={styles.keyb}>
      <SafeAreaView
        style={{ backgroundColor: theme.background, height: "100%" }}
      >
        <ScrollView style={{ backgroundColor: theme.background }}>
          <View
            style={[
              styles.containerfirst,
              { backgroundColor: theme.background },
            ]}
          >
            {/* {selectedItemsArray.map((item, index) => (
              <View key={index}>
                {/* Destructure item properties 
                <Text>Pickup Address: {item?.pickupAddress}</Text>
                <Text>Delivery Address: {item?.deliveryAddress}</Text>
                <Text>Pickup Address: {item?.pickupAddress}</Text>
                <Text>phoneNumber: {item?.phoneNumber}</Text>
                <Text>vehicleID: {item?.rideOption.vehicleID}</Text>
                <Text>firstName: {item?.firstName}</Text>
                <Text>pickupTime: {item?.selectedDate}</Text>
                <Text>pickupLat: {item?.pickupLat}</Text>
                <Text>pickupLng: {item?.pickupLng}</Text>
                <Text>deliveryLat: {item?.deliveryLat}</Text>
                <Text>deliveryLng: {item?.deliveryLng}</Text>
                <Text>Package Weight: {item?.packageWeight}</Text>
                <Text>Package Type: {item?.packageType}</Text>


                <Text>
                  Vehicle Type: {item?.vehicleType} {item?.logisticsCompanyID}
                </Text>
                <Text>Cost: {item?.rideOption.cost}</Text>
      
              </View>
            ))} */}
            <View style={styles.orderView}>
              <View style={styles.grayed}>
                <View
                  style={[
                    styles.Nextgrayed,
                    { flexDirection: "column", alignItems: "flex-start" },
                  ]}
                >
                  <Text style={[styles.text, { fontSize: 16, marginTop: 8 }]}>
                    Bill Summary
                  </Text>
                  <View
                    style={{
                      width: "100%",
                    }}
                  >
                    {selectedItemsArray.map((item, index) => (
                      <View key={index}>
                        <TouchableOpacity
                          style={[
                            styles.buttonClick,
                            {
                              width: "100%",
                              alignItems: "flex-start",
                              padding: 16,
                            },
                          ]}
                          onPress={() => toggleDetailsVisibility(index)}
                        >
                          <Text
                            style={{
                              fontFamily: "MontserratBold",
                            }}
                          >
                            {detailsVisibility[index]
                              ? `Hide Details for ${item?.deliveryAddress}`
                              : `Show Details for ${item?.deliveryAddress}`}
                          </Text>
                        </TouchableOpacity>

                        {detailsVisibility[index] && (
                          <View key={index}>
                            <View>
                              <Text
                                style={[
                                  styles.passwordtext,
                                  { color: `${theme.text}`, marginTop: 12 },
                                ]}
                              >
                                Pickup Address
                              </Text>
                              <Text
                                style={[
                                  styles.passwordtexts,
                                  { color: `${theme.text}65` },
                                ]}
                              >
                                {item?.pickupAddress}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.passwordtext,
                                  { color: `${theme.text}`, marginTop: 12 },
                                ]}
                              >
                                Delivery Address
                              </Text>
                              <Text
                                style={[
                                  styles.passwordtexts,
                                  { color: `${theme.text}65` },
                                ]}
                              >
                                {item?.deliveryAddress}
                              </Text>
                            </View>

                            <View>
                              <Text
                                style={[
                                  styles.passwordtext,
                                  { color: `${theme.text}`, marginTop: 12 },
                                ]}
                              >
                                Pickup Time
                              </Text>
                              <Text
                                style={[
                                  styles.passwordtexts,
                                  { color: `${theme.text}65` },
                                ]}
                              >
                                {item?.selectedDate?.toDateString()}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.passwordtext,
                                  { color: `${theme.text}`, marginTop: 12 },
                                ]}
                              >
                                Package Type
                              </Text>
                              <Text
                                style={[
                                  styles.passwordtexts,
                                  { color: `${theme.text}65` },
                                ]}
                              >
                                {item?.packageType}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.passwordtext,
                                  { color: `${theme.text}`, marginTop: 12 },
                                ]}
                              >
                                Package Weight
                              </Text>
                              <Text
                                style={[
                                  styles.passwordtexts,
                                  { color: `${theme.text}65` },
                                ]}
                              >
                                {item?.packageWeight}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.passwordtext,
                                  { color: `${theme.text}`, marginTop: 12 },
                                ]}
                              >
                                Logistics Service
                              </Text>
                              <Text
                                style={[
                                  styles.passwordtexts,
                                  { color: `${theme.text}65` },
                                ]}
                              >
                                {item?.rideOption.name}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={[
                                  styles.passwordtext,
                                  { color: `${theme.text}`, marginTop: 12 },
                                ]}
                              >
                                Delivery Fee
                              </Text>
                              <Text
                                style={[
                                  styles.passwordtexts,
                                  { color: `${theme.text}65` },
                                ]}
                              >
                                ₦{item?.rideOption.cost}
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    ))}
                    <View
                      style={{
                        marginBottom: 72,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.passwordtext,
                          { color: `${theme.text}`, marginTop: 72 },
                        ]}
                      >
                        Total
                      </Text>
                      <Text
                        style={[
                          styles.passwordtexts,
                          {
                            color: "#f1c40f",
                            fontFamily: "MontserratBold",
                            fontSize: 28,
                          },
                        ]}
                      >
                        ₦{totalCost?.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 24,
                    }}
                  ></View>
                </View>

                <View style={styles.grayed}>
                  <View style={styles.Nextgrayed}>
                    <Text style={[styles.text, { fontSize: 16, marginTop: 8 }]}>
                      Payment Method
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: theme.text,
                        fontFamily: "MontserratBold",
                        fontSize: 15,
                        marginTop: 32,
                      }}
                    >
                      Choose a Currency
                    </Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={{
                        display: "none",
                      }}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={{
                        fontSize: 17,
                        color: `${theme.text}`,
                        fontFamily: "MontserratRegular",
                      }}
                      itemContainerStyle={{
                        backgroundColor: theme.backgroundAuth,
                      }}
                      data={currencyData}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select a Currency"
                      searchPlaceholder="Search..."
                      value={currency}
                      onChange={handleCurrency}
                    />
                  </View>

                  <View>
                    {/* <RadioButton.Group
                      onValueChange={handlePaymentChange}
                      value={paymentMethod}
                    >
                      <View style={styles.radioContainer}>
                        <RadioButton.Item
                          label="Pay with Cash"
                          value="cash"
                          labelStyle={styles.radioLabel}
                          color="red"
                          style={styles.radioButton}
                          labelPlacement="end"
                          icon={renderRadioButtonIcon}
                        />

                        <RadioButton.Item
                          label="Pay with Card"
                          value="card"
                          labelStyle={styles.radioLabel}
                          color="red"
                          style={styles.radioButton}
                        />
                        <RadioButton.Item
                          label="Pay with Wallet"
                          value="wallet"
                          labelStyle={styles.radioLabel}
                          color="red"
                          style={styles.radioButton}
                        />
                      </View>
                    </RadioButton.Group> */}
                    <View>
                      <TextInput
                        style={styles.input}
                        value={transactionDescription}
                        onChangeText={handleTransactionDescription}
                        placeholder="Enter the transaction Description"
                        placeholderTextColor={`${theme.text}60`}
                      />
                      {transactionDescriptionError ? (
                        <Text style={styles.errorText}>
                          {transactionDescriptionError}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>
                <View>
                  {loading ? (
                    <TouchableOpacity
                      // onPress={handleCreateDelivery}
                      style={styles.buttonClick}
                    >
                      <Text
                        style={[
                          {
                            fontFamily: "MontserratBold",
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {loading ? <ActivityIndicator color="#000" /> : "Next"}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (paymentMethod === "cash" && error) {
                          handleCreateDelivery();
                        } else if (paymentMethod === "wallet" && error === "") {
                          handleCreateDelivery();
                        } else if (paymentMethod === "wallet" && error !== "") {
                          alert(
                            "Server Down Time: Cannot create delivery by Wallet."
                          );
                        } else if (paymentMethod === "card" && error === "") {
                          handleCreateDelivery();
                        } else if (paymentMethod === "card" && error !== "") {
                          alert(
                            "Server Down Time: Cannot create delivery by Card"
                          );
                        } else if (paymentMethod === "cash") {
                          handleCreateDelivery();
                        } else {
                          alert("An error occurred. Cannot create delivery.");
                        }
                      }}
                      style={styles.buttonClick}
                    >
                      <Text
                        style={[
                          {
                            fontFamily: "MontserratBold",
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        ]}
                      >
                        {loading ? <ActivityIndicator color="#000" /> : "Next"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    color: "red",
                    marginTop: 12,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  {error}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MultipleTotalDeliveries;
