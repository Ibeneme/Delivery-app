import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  fundWallet,
  initializeWalletFunding,
} from "../../../Redux/Payment/Payments";
import { Dropdown } from "react-native-element-dropdown";

const Fund = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState(null);
  const [amount, setAmount] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [amountError, setAmountError] = useState("");
  const [transactionDescriptionError, setTransactionDescriptionError] =
    useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkoutLink, setCheckoutlink] = useState("false");

  //onChange Events
  const handleAmountChnage = (amount) => {
    setError("");
    setAmountError("");
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      setAmount("");
    } else if (numericAmount < 10) {
      setAmount(numericAmount.toString());
      setAmountError("Minimum amount is 10");
    } else {
      setAmount(numericAmount.toString());
    }
  };

  const handleTransactionDescription = (transactionDescription) => {
    setError("");
    setTransactionDescriptionError("");
    const formattedDescription = transactionDescription
      .split(" ")
      .map((word) => {
        if (word.length > 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return "";
      })
      .join(" ");

    if (formattedDescription.length < 10) {
      setTransactionDescription(formattedDescription);
      setTransactionDescriptionError("");
    } else {
      setTransactionDescription(formattedDescription);
    }
  };

  //onPress event
  const fundWalletResults = useSelector(
    (state) => state.payment.fundWalletResults
  );
  const balance = fundWalletResults?.data?.user?.balance;
  const fetchWalletBalance = async () => {
    try {
      const result = await dispatch(fundWallet());
      const string = JSON.stringify(result.payload.data);
      const parse = JSON.parse(string);
      setWalletBalance(parse);
    } catch (error) {}
  };
  const [balanced, setWalletBalance] = useState(null);

  useEffect(() => {
    dispatch(fundWallet());
    fetchWalletBalance();
  }, [balance]);

  const handleInitializePayment = () => {
    console.log( "nns");
    setLoading(true);
    const paymentData = {
      amount: amount,
      currency: currency,
      successPageURL: "https://www.quicklogisticshub.com/payment_feedback",
      transactionDescription: transactionDescription,
    };

    dispatch(initializeWalletFunding(paymentData))
      .then((response) => {
        setLoading(false);
        console.log(response, "ngix");
        if (response?.payload?.checkout) {
          const checkoutLink = response.payload.checkout;
          setCheckoutlink(checkoutLink);
          navigation.navigate("webview", { checkoutLink: checkoutLink });
        } else if (response?.payload === undefined) {
          setError("Error in processing transaction");
        }
      })
      .catch((error) => {
        console.log(error, "ngix");
      });
    // } else {
    //   setLoading(false);
    //   if (transactionDescription.length < 10) {
    //     setTransactionDescriptionError(
    //       "Minimum description length is 10 characters"
    //     );
    //   }
    //   if (parseInt(amount) < 10) {
    //     setAmountError("Minimum amount is 10");
    //   }
    //}
  };

  //Styles and Navigation
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontFamily: "MontserratRegular",
      fontSize: 16,
      height: 50,
      marginTop: 4,
      width: "100%",
    },
    errorText: {
      color: "#ff0650",
      marginTop: 4,
      fontSize: 14,
      fontFamily: "MontserratRegular",
    },
    forgotTransactionDescription: {
      color: theme.text,
      marginTop: -12,
      fontSize: 14,
      textAlign: "right",
      fontFamily: "MontserratRegular",
    },
    transactionDescriptiontext: {
      textAlign: "right",
      marginTop: 12,
      color: theme.text,
      fontFamily: "MontserratRegular",
      fontSize: 14,
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
    buttonClickLoading: {
      backgroundColor: "#f1c40f45",
      width: "100%",
      height: 50,
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    transactionDescriptionInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      position: "relative",
    },
    transactionDescriptionVisibilityIcon: {
      position: "absolute",
      bottom: "10%",
      right: 0,
      padding: 10,
      color: theme.text,
      fontFamily: "MontserratRegular",
    },
    containerfirst: {
      backgroundColor: "#000",
      color: "#ffffff",
      height: "100%",
      padding: 16,
    },
    text: {
      color: theme.text,
      marginTop: 4,
      fontFamily: "MontserratRegular",
      fontSize: 16,
    },
    textBold: {
      color: "#f1c40f",
      fontFamily: "MontserratBold",
      fontSize: 24,

      marginTop: 48,
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

    textSpan: {
      color: "#f1c40f",
      fontFamily: "MontserratRegular",
      fontSize: 16,
      paddingLeft: 8,
    },
    viewForInputs: {
      marginTop: 48,
      justifyContent: "space-between",
      gap: 24,
      marginBottom: 72,
    },
  });
  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };
  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
    fontFamily: "MontserratBold",
  };
  const headerTintColor = theme.text;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Fund Wallet",
      headerStyle,
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const currencyData = [
    { label: "NGN", value: "NGN" },
    { label: "USD", value: "USD" },
  ];
  const [currency, setCurrency] = useState("");

  const handleCurrency = (currency) => {
    if (currency === "") {
      setErrorCurrency("Choose a Currency");
    } else {
      setCurrency(currency?.value);
      //console.log(currency?.value, "currency");
    }
  };

  return (
    <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor: theme.backgroundAuth,
      }}
    >
      <View
        style={[
          styles.containerfirst,
          { backgroundColor: theme.backgroundAuth },
        ]}
      >
        <View style={styles.viewForInputs}>
          {error ? (
            <Text
              style={[
                styles.errorText,
                { backgroundColor: "#ff000025", padding: 12 },
              ]}
            >
              {error}
            </Text>
          ) : null}

          <View>
            <Text style={styles.text}>Enter an Amount</Text>
            <TextInput
              style={[
                styles.input,
                amountError && { borderColor: "red" },
                focusedInput === "amount" && { borderColor: "#f1c40f" },
              ]}
              onFocus={() => setFocusedInput("amount")}
              onBlur={() => setFocusedInput(null)}
              value={amount}
              onChangeText={handleAmountChnage}
              placeholder="Enter an Amount"
              keyboardType="numeric"
              placeholderTextColor={`${theme.text}60`}
            />
            {amountError ? (
              <Text style={styles.errorText}>{amountError}</Text>
            ) : null}
          </View>
          <View
            style={{
              color: theme.text,
              fontFamily: "MontserratRegular",
              fontSize: 15,
              marginTop: 12,
              marginBottom: -22,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontFamily: "MontserratRegular",
                fontSize: 15,
                // marginTop: 16,
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
            <Text style={styles.text}>Transaction Description</Text>
            <View style={styles.transactionDescriptionInputContainer}>
              <TextInput
                style={[
                  styles.input,
                  transactionDescriptionError && { borderColor: "red" },
                  focusedInput === "transactionDescription" && {
                    borderColor: "#f1c40f",
                  },
                ]}
                value={transactionDescription}
                onChangeText={handleTransactionDescription}
                placeholder="Enter a transaction description"
                onFocus={() => setFocusedInput("transactionDescription")}
                onBlur={() => setFocusedInput(null)}
                placeholderTextColor={`${theme.text}60`}
                secureTextEntry={false}
              />
            </View>

            {transactionDescriptionError ? (
              <Text style={styles.errorText}>
                {transactionDescriptionError}
              </Text>
            ) : null}
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonClick}
            onPress={handleInitializePayment}
          >
            <Text style={[styles.buttonText, { fontFamily: "MontserratBold" }]}>
              {loading ? <ActivityIndicator color="#000" /> : "Proceed"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Fund;
