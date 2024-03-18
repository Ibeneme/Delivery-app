import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import SearchableDropdown from "react-native-searchable-dropdown";
//import Icon from "react-native-vector-icons/FontAwesome";
//import { ListItem } from "react-native-elements";

import { fetchSelectedBank } from "../../../Redux/Payment/Bank";
import { initializeWithdrawal } from "../../../Redux/Payment/Withdrawal";
import { ArrowDownIcon } from "../../OrdinaryUser/Icons/AllIcons";
const Withdrawal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState(null);

  const [amount, setAmount] = useState("");
  const [userAccountNumber, setTransactionDescription] = useState("");

  const [amountError, setAmountError] = useState("");
  const [userAccountNumberError, setTransactionDescriptionError] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [checkoutLink, setCheckoutlink] = useState("false");

  const handleAmountChnage = (amount) => {
    setError("");
    setAmountError("");

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      setAmount("");
    } else if (numericAmount < 500) {
      setAmount(numericAmount.toString());
      setAmountError("Minimum amount is 500");
    } else {
      setAmount(numericAmount.toString());
    }
  };

  // const handleAccountNumber = (accnumber) => {
  //   setError("");
  //   setAmountError("");

  //   const numericAmount = parseFloat(accnumber);

  //   if (isNaN(numericAmount)) {
  //     setAmount("");
  //   } else if (numericAmount < 10) {
  //     setAmount(numericAmount.toString());
  //     setAmountError("Minimum accnumber is 10");
  //   } else {
  //   setAmount(numericAmount.toString());
  //   }
  // };

  // const handleInitializeWithdrawal = async () => {
  //   setLoading(true);
  //   const withdrawalData = {
  //     amount: amount,
  //     currency: "NGN",
  //     bankCode: selectedBankCode,
  //     userAccountNumber: userAccountNumber,
  //   };

  //  try {
  //     const response = await dispatch(initializeWithdrawal(withdrawalData));
  //     setLoading(false);
  //   } catch (error) {
  //  }
  // };

  const handleInitializePayment = () => {
    setLoading(true);
    if (userAccountNumber.length !== 10) {
    } else {
      setTransactionDescriptionError("");
    }

    if (parseInt(amount) < 500) {
      setAmountError("Minimum amount is 500");
    } else {
      setAmountError("");
    }

    if (userAccountNumber.length === 10 && parseInt(amount) >= 500) {
      const paymentData = {
        amount: amount,
        currency: "NGN",
        userAccountNumber: userAccountNumber,
        bankCode: selectedBankCode,
      };

      dispatch(initializeWithdrawal(paymentData))
        .then((response) => {
          setLoading(false);
          if (response?.payload?.message === "withdrawal successful") {
            navigation.navigate("SuccessPage");
          } else {
            navigation.navigate("ErrorPage");
          }
        })
        .catch((error) => {
          navigation.navigate("ErrorPage");
        });
    }
  };

  const handleTransactionDescription = (userAccountNumber) => {
    setError("");
    setTransactionDescriptionError("");
    const numericDescription = userAccountNumber.replace(/[^0-9]/g, "");
    if (numericDescription.length < 10) {
      setTransactionDescription(numericDescription);
      setTransactionDescriptionError("Account Numbers are 10 digits long");
    } else {
      setTransactionDescription(numericDescription);
    }
  };

  const { theme } = useTheme();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBankCode, setSelectBankCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleItemSelect = (item) => {
    setSelectBankCode(item?.bankCode);
    setSelectedItem(item);
    setIsModalVisible(false);
  };

  const closeButton = () => {
    setIsModalVisible(false);
  };

  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);

  const handleSearch = (text) => {
    const filtered = data?.filter((item) =>
      item.bankName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const [data, setServerData] = useState([]);

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
    inputs: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontFamily: "MontserratRegular",
      fontSize: 16,
      height: 50,
      marginTop: 8,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
    viewbox: {
      marginTop: 32,
    },
    userAccountNumbertext: {
      textAlign: "right",
      marginTop: 12,
      color: theme.text,
      fontFamily: "MontserratRegular",
      fontSize: 14,
    },
    // buttonClick: {
    //   backgroundColor: "#f1c40f",
    //   width: "100%",
    //   height: 50,
    //   borderRadius: 4,
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    buttonClickLoading: {
      backgroundColor: "#f1c40f45",
      width: "100%",
      height: 50,
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    userAccountNumberInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      position: "relative",
    },
    userAccountNumberVisibilityIcon: {
      position: "absolute",
      bottom: "10%",
      right: 0,
      padding: 10,
      color: theme.text,
      fontFamily: "MontserratRegular",
    },
    containerfirst: {
      color: "#ffffff",
      height: "100%",
      padding: 16,
    },
    containerModal: {
      color: "#ffffff",
      height: "100%",
      paddingTop: 40,
      paddingLeft: 12,
      paddingRight: 12,
      backgroundColor: `${theme.background}`,
    },
    container: {
      color: "#ffffff",
      height: "100%",

      backgroundColor: `${theme.background}`,
    },
    text: {
      color: theme.text,
      marginTop: 4,
      fontFamily: "MontserratRegular",
      fontSize: 16,
    },
    textBold: {
      color: `${theme.text}`,
      fontFamily: "MontserratBold",
      fontSize: 18,
      marginBottom: 24,
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
    closeButton: {
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    closeButtonText: {
      color: `${theme.text}`,
      fontFamily: "MontserratBold",
    },
    itemContainer: {
      padding: 18,
      backgroundColor: `${theme.background}`,
      borderWidth: 1,
      borderColor: `${theme.text}40`,
      borderRadius: 4,
    },
    selectButtonText: {
      color: `${theme.text}`,
      fontFamily: "MontserratRegular",
      fontSize: 16,
    },
    viewInput: {
      padding: 12,

      marginTop: 48,
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
  });

  const headerStyle = {
    backgroundColor: theme.background,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
    fontFamily: "MontserratBold",
  };

  const headerTintColor = theme.text;


  const banksError = useSelector((state) => state?.error);
  const [responseData, setResponseData] = useState(''); // State to hold the response data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchSelectedBank());

        (newData = response?.payload?.data?.bankAndCode),
          setResponseData(newData);
        setServerData(newData);
      } catch (error) {}
    };

    fetchData();
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle,
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: theme.background }}>
        <View>
          <View style={[styles.viewInput]}>
            <Text style={styles.textBold}>Withdraw from Wallet</Text>
            <View>
              <Text style={styles.text}>Select a Bank</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={[styles.inputs]}
              >
                <Text style={styles.text}>
                  {selectedItem?.bankName
                    ? selectedItem.bankName
                    : "Select a Bank"}
                </Text>
                <ArrowDownIcon color={theme.text} width={24} height={24} />

              </TouchableOpacity>
            </View>

            <View style={styles.viewbox}>
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
            <View style={styles.viewbox}>
              <Text style={styles.text}>Account Number</Text>
              <View style={styles.userAccountNumberInputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    userAccountNumberError && { borderColor: "red" },
                    focusedInput === "userAccountNumber" && {
                      borderColor: "#f1c40f",
                    },
                  ]}
                  value={userAccountNumber}
                  onChangeText={handleTransactionDescription}
                  placeholder="Enter your account Number"
                  onFocus={() => setFocusedInput("userAccountNumber")}
                  onBlur={() => setFocusedInput(null)}
                  placeholderTextColor={`${theme.text}60`}
                  secureTextEntry={false} // Set this to false
                  keyboardType="numeric"
                />
              </View>

              {userAccountNumberError ? (
                <Text style={styles.errorText}>{userAccountNumberError}</Text>
              ) : null}
            </View>
          </View>

          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <SafeAreaView style={styles.container}>
              <View style={styles.containerModal}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeButton}
                >
                  <Text style={[styles.closeButtonText, { marginBottom: 16 }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <View>
                  <TextInput
                    style={{
                      borderColor: "gray",
                      borderWidth: 1,
                      marginBottom: 10,
                      color: `${theme.text}`,
                      padding: 12,
                      height: 50,
                      fontFamily: "MontserratBold",
                    }}
                    placeholder="Search for bank"
                    placeholderTextColor={`${theme.text}50`}
                    onChangeText={(text) => {
                      setSearchText(text);
                      handleSearch(text);
                    }}
                    value={searchText}
                  />
                  <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => item.bankCode}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleItemSelect(item)}>
                     <Text>{item.bankName}</Text>F
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Modal>
          <View
            style={{
              padding: 12,
              marginTop: 48,
            }}
          >
            <TouchableOpacity
              style={styles.buttonClick}
              onPress={handleInitializePayment}
            >
              <Text
                style={[styles.buttonText, { fontFamily: "MontserratBold" }]}
              >
                {loading ? <ActivityIndicator color="#000" /> : "Proceed"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Withdrawal;
