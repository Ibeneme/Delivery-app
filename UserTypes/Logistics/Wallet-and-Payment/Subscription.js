import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useDispatch } from "react-redux";
import { upgradeWalletSubscription } from "../../../Redux/Users/ApiKey";
import { upgradeLogisticsPlan } from "../../../Redux/Subscription/Subscription";
import { PAYMENT_URL } from "../../../Redux/BaseUrl/Baseurl";

const Subscription = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const headerStyle = {
    backgroundColor: "#f1c40f",
    borderBottomWidth: 0,
  };
  const headerTitleStyle = {
    color: "#000000",
    borderBottomWidth: 0,
  };

  const headerTintColor = "#000000";
  const route = useRoute();
  const { selectedOptions, amount } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Subscription",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isNextButtonClickable, setIsNextButtonClickable] = useState(false);
  const [modalUpgrade, setModalUpgrade] = useState(true);
  const [loading, setLoading] = useState(false);

  const closeModalUpgrade = () => {
    setModalUpgrade(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsNextButtonClickable(true);
  };

  const handleNextButtonClick = () => {
    if (selectedOption === "wallet") {
      dispatch(
        upgradeWalletSubscription({
          amount: amount,
          subscriptionPlan: selectedOptions,
          currency: "USD",
          successPageURL: `${PAYMENT_URL}`,
          transactionDescription: "upgrading plan from wallet",
        })
      )
        .then(async (response) => {
          setLoading(false);
          //console.log(response, "Subscription Successful");
          if (response?.type === "api/receiveApiKey/fulfilled") {
            alert("Subscription Successful");
            navigation.navigate("SuccessPage");
          } else {
           // alert("Error Occurred");
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else if (selectedOption === "card") {
      dispatch(
        upgradeLogisticsPlan({
          amount: amount,
          subscriptionPlan: selectedOptions,
          currency: "USD",
          successPageURL: `${PAYMENT_URL}`,
          transactionDescription: "upgrading plan from wallet",
        })
      )
        .then(async (response) => {
          setLoading(false);
          //console.log(response, 'leel');
          if (response?.error?.code === "ERR_BAD_RESPONSE") {
            // alert("Error while Processing");
            navigation.goBack();
          } else if (response?.payload?.checkout) {
            const checkoutLink = response?.payload?.checkout;
            setModalUpgrade(false);
            navigation.navigate("webview", { checkoutLink: checkoutLink });
          } else {
            //alert("An Error Occurred");
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      // alert("An Error Occured");
    }
  };

  const styles = StyleSheet.create({
    upgradeOption: {
      height: "auto",
      width: "100%",
      marginTop: 3,
      backgroundColor: "#fff",
      padding: 16,
    },
    upgradeOptionText: {
      fontFamily: "MontserratBold",
      fontSize: 18,
      color: "#000000",
    },
    upgradeOptionTexts: {
      fontFamily: "MontserratRegular",
      fontSize: 16,
      color: "#000000",
      marginTop: 4,
    },
    refreshIcon: {
      fontSize: 16,
      color: "#000000",
      marginLeft: 10,
    },
    modalContainer: {
      backgroundColor: "#00000099",
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      position: "relative",
    },
    modalContainers: {
      backgroundColor: "#00000099",
      flex: 1,
      flexGrow: 1,
    },
    modalContainerViews: {
      height: "100%",
      width: "100%",
      backgroundColor: "#f1c40f",
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    modalContainerView: {
      height: 500,
      bottom: 0,
      position: "absolute",
      width: "100%",
      backgroundColor: "#f1c40f",
      borderRadius: 21,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: 200,
      width: "100%",
    },
  });
  const { height: screenHeight } = Dimensions.get("window");

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f1c40f",
        height: screenHeight,
        flex: 1,
        flexGrow: 1,
      }}
    >
      <View
        style={{
          marginTop: 48,
        }}
      >
        {modalUpgrade ? null : (
          <View style={styles.modalContainers}>
            <View
              style={[
                styles.modalContainerViews,
                {
                  height: 500,
                  width: "100%",
                  backgroundColor: "#f1c40f",
                },
              ]}
            >
              <View style={[styles.modalContent, { width: "100%" }]}>
                <View
                  style={{
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "left",
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <Text
                      style={{
                        fontFamily: "MontserratBold",
                        fontSize: 20,
                        marginBottom: 3,
                        gap: 12,
                        color: "#000000",
                      }}
                    >
                      You Can try Again
                    </Text>
                    <Text
                      style={{
                        fontFamily: "MontserratRegular",
                        fontSize: 16,
                        marginBottom: 44,
                        gap: 12,
                        color: "#000000",
                      }}
                    >
                      Whoops seems you cancelled
                    </Text>
                    {/* <Text
                   style={{
                     fontFamily: "MontserratBold",
                     fontSize: 14,
                     marginBottom: 24,
                     gap: 12,
                     color: "#000000",
                   }}
                   onPress={() => navigation.goBack()}
                 >
                   Cancel
                 </Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("card")}
                    style={[
                      styles.upgradeOption,
                      {
                        borderColor:
                          selectedOption === "card" ? "#ffffff" : "transparent",
                        backgroundColor:
                          selectedOption === "card" ? "#000000" : "transparent",
                        borderRadius: 8,
                        borderWidth: 3,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.upgradeOptionText,
                        {
                          color: selectedOption === "card" ? "white" : `black`,
                        },
                      ]}
                    >
                      Pay with Card
                    </Text>
                    <Text
                      style={[
                        styles.upgradeOptionTexts,
                        {
                          color: selectedOption === "card" ? "white" : `black`,
                        },
                      ]}
                    >
                      Credit and Debit cards accepted
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("wallet")}
                    style={[
                      styles.upgradeOption,
                      {
                        borderColor:
                          selectedOption === "wallet"
                            ? "#ffffff"
                            : "transparent",
                        backgroundColor:
                          selectedOption === "wallet"
                            ? "#000000"
                            : "transparent",
                        borderRadius: 8,
                        borderWidth: 3,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.upgradeOptionText,
                        {
                          color:
                            selectedOption === "wallet" ? "white" : `black`,
                        },
                      ]}
                    >
                      Pay from Wallet
                    </Text>
                    <Text
                      style={[
                        styles.upgradeOptionTexts,
                        {
                          color:
                            selectedOption === "wallet" ? "white" : `black`,
                        },
                      ]}
                    >
                      Amount to be debited from your wallet
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    {
                      backgroundColor: "#000000",
                      height: 55,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginTop: 36,
                      marginBottom: 12,
                      borderRadius: 6,
                    },
                  ]}
                  onPress={handleNextButtonClick}
                  disabled={!isNextButtonClickable}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "MontserratBold",
                    }}
                  >
                    Proceed to Pay
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    {
                      borderColor: "#000000",
                      borderWidth: 1.3,
                      height: 55,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: 24,
                      borderRadius: 6,
                    },
                  ]}
                  onPress={() => navigation.goBack()}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "MontserratBold",
                    }}
                  >
                    Cancel Payment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* <TouchableOpacity
          style={{
            height: "auto",
            alignItems: "left",
            backgroundColor: theme.backgroundAuth,
            borderRadius: 8,
            marginTop: 32,
            flexDirection: "column",
            gap: 24,
            marginTop: 12,
            borderWidth: 2,
            borderColor: "#f1c40f",
          }}
          onPress={() => navigation.navigate("wallethistory")}
        >
          <View
            style={{
              backgroundColor: "#f1c40f25",
              width: 48,
              height: 48,
              borderRadius: 338,
              justifyContent: "center",
              alignItems: "center",
              margin: 16,
            }}
          >
            <FontAwesomeIcon
              name="history"
              style={[{ color: "#f1c40f", fontSize: 20 }]}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "MontserratBold",
                paddingLeft: 16,
                marginTop: -12,
                fontSize: 18,
                color: theme.text,
              }}
            >
              Wallet History
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 3,
                paddingRight: 16,
                marginTop: 3,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "MontserratRegular",
                    paddingLeft: 16,
                    marginBottom: 24,
                    color: theme.text,
                    // border: theme.text,
                    // borderColor: theme.text,
                  }}
                >
                  View your transaction history
                </Text>
              </View>
              <View>
                <FontAwesomeIcon
                  name="arrow-right"
                  style={[{ color: theme.text, fontSize: 16 }]}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUpgrade}
          onRequestClose={closeModalUpgrade}
        >
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContainerView,
                {
                  height: 500,
                  width: "100%",
                  backgroundColor: "#f1c40f",
                },
              ]}
            >
              <View style={[styles.modalContent, { width: "100%" }]}>
                <View
                  style={{
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <Text
                      style={{
                        fontFamily: "MontserratBold",
                        fontSize: 20,
                        marginBottom: 24,
                        gap: 12,
                        color: "#000000",
                      }}
                    >
                      Almost there!
                    </Text>
                    {/* <Text
                      style={{
                        fontFamily: "MontserratBold",
                        fontSize: 14,
                        marginBottom: 24,
                        gap: 12,
                        color: "#000000",
                      }}
                      onPress={() => navigation.goBack()}
                    >
                      Cancel
                    </Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("card")}
                    style={[
                      styles.upgradeOption,
                      {
                        borderColor:
                          selectedOption === "card" ? "#ffffff" : "transparent",
                        backgroundColor:
                          selectedOption === "card" ? "#000000" : "transparent",
                        borderRadius: 8,
                        borderWidth: 3,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.upgradeOptionText,
                        {
                          color: selectedOption === "card" ? "white" : `black`,
                        },
                      ]}
                    >
                      Pay with Card
                    </Text>
                    <Text
                      style={[
                        styles.upgradeOptionTexts,
                        {
                          color: selectedOption === "card" ? "white" : `black`,
                        },
                      ]}
                    >
                      Credit and Debit cards accepted
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("wallet")}
                    style={[
                      styles.upgradeOption,
                      {
                        borderColor:
                          selectedOption === "wallet"
                            ? "#ffffff"
                            : "transparent",
                        backgroundColor:
                          selectedOption === "wallet"
                            ? "#000000"
                            : "transparent",
                        borderRadius: 8,
                        borderWidth: 3,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.upgradeOptionText,
                        {
                          color:
                            selectedOption === "wallet" ? "white" : `black`,
                        },
                      ]}
                    >
                      Pay from Wallet
                    </Text>
                    <Text
                      style={[
                        styles.upgradeOptionTexts,
                        {
                          color:
                            selectedOption === "wallet" ? "white" : `black`,
                        },
                      ]}
                    >
                      Amount to be debited from your wallet
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    {
                      backgroundColor: "#000000",
                      height: 55,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginTop: 36,
                      marginBottom: 12,
                      borderRadius: 6,
                    },
                  ]}
                  onPress={handleNextButtonClick}
                  disabled={!isNextButtonClickable}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "MontserratBold",
                    }}
                  >
                    Proceed to Pay
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    {
                      borderColor: "#000000",
                      borderWidth: 1.3,
                      height: 55,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: 24,
                      borderRadius: 6,
                    },
                  ]}
                  onPress={() => navigation.goBack()}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "MontserratBold",
                    }}
                  >
                    Cancel Payment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Subscription;
