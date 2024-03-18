import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import WalletSquares from "../../OrdinaryUser/Pages/Extras/Components/WalletSquares";
import { useDispatch, useSelector } from "react-redux";
import { LogisticsUserPaymentHistory } from "../../../Redux/Payment/Payments";

const PaymentHistory = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const [dataArray, setDataArray] = useState([]);
  const [error, setError] = useState("");
  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: "#00000050",
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      position: "relative",
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
    containerfirst: {
      backgroundColor: theme.background,
      color: "#ffffff",
      height: "100%",
      padding: 16,
    },
    text: {
      color: theme.text,
      fontSize: 18,
      fontFamily: "MontserratBold",
    },
    orderView: {
      borderBottomWidth: 1,
      borderColor: `${theme.text}20`,
      marginBottom: 12,
    },
    rows: {
      flexDirection: "row",
      gap: 12,
      marginTop: 12,
    },

    notFound: {
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    notFoundText: {
      color: `${theme.text}`,
      fontSize: 14,
      textAlign: "center",
      fontFamily: "MontserratBold",
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to open the modal with the selected item details
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const headerStyle = {
    backgroundColor: theme.background,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Payment History",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const user = useSelector((state) => state.auth.user);
  const logisticsUserId = user?.sub;

  useEffect(() => {
    LogisticsUserPaymentHistory(logisticsUserId);
  }, [dispatch]);

  const [payments, setWalletHistory] = useState("");
  const fetchWalletHistory = async () => {
    setLoading(true)
    try {
      setError("");
      const result = await dispatch(
        LogisticsUserPaymentHistory(logisticsUserId)
      );
      setLoading(false)
      const string = JSON.stringify(result.payload.data);
      const parse = JSON.parse(string);
      setWalletHistory(parse?.payments);
    } catch (error) {
      setError("Server Down Time, Network Error");
    }
  };
  useEffect(() => {
    fetchWalletHistory();
  }, []);

  const sortedPayments = [...payments].sort(
    (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
  );
  const groupedPayments = sortedPayments.reduce((groups, payment) => {
    const paymentDate = new Date(payment.paymentDate).toLocaleDateString();

    if (!groups[paymentDate]) {
      groups[paymentDate] = [];
    }

    groups[paymentDate].push(payment);
    return groups;
  }, {});

  const flatListData = Object.keys(groupedPayments).map((date) => ({
    date,
    payments: groupedPayments[date],
  }));

  const keyExtractor = (item, index) => item.id.toString();
  const filteredFlatListData = flatListData.filter((item) =>
    item.payments.some((payment) => payment.currency !== null)
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWalletHistory(); // Call your data fetching function here
    setRefreshing(false);
  };

  // console.log(flatListData, "iteeee");
  const renderItem = ({ item }) => (
    <View>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "MontserratBold",
          color: `${theme.text}75`,
          marginTop: 16,
          marginBottom: 4,
          textAlign: "right",
        }}
      >
        {item?.date}
      </Text>
      <View>
        {item?.payments
          // ?.filter((payment) => payment.currency !== null)
          .map((payment, index) => (
            <View key={index}>
              <WalletSquares
                iconName={payment.status === "successful" ? "wallet" : "wallet"}
                ImageBackgroundColor={
                  payment.status === "successful" ? "#f1c40f25" : "#f1c40f25"
                }
                IconColor={
                  payment.status === "successful" ? "#f1c40f" : "#f1c40f"
                }
                //  payment.status === "successful" ? "#f1c40f" : "#666666"
                WalletStatus={`${
                  payment.status === "pending"
                    ? `Payment Pending  ${
                        payment?.currency === "NGN" ? "NGN" : "$"
                      }${payment.amount.toLocaleString("en-US")}`
                    : `Payment Successful  ${
                        payment?.currency === null ? "NGN" : "NGN"
                      }${payment.amount.toLocaleString("en-US")}`
                }`}
                WalletDescription={`Payment Ref${payment.reference}`}
                isFirst={index === 0}
                isLast={index === item?.payments?.length - 1}
              />
            </View>
          ))}
      </View>
    </View>
  );

  //console.log(payments, "flatListData");
  return (
    <SafeAreaView style={{ backgroundColor: theme.background, height: "100%" }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#f1c40f" // Change this color to your preferred refresh indicator color
          />
        }
      >
        <View>
          <View
            style={[
              styles.containerfirst,
              { backgroundColor: theme.background },
            ]}
          >
            <View>
              <View>
                {error ? (
                  <View
                    style={{
                      backgroundColor: "#ff000021",
                      fontSize: 16,
                      alignItems: "center",
                      paddingLeft: 24,
                      paddingRight: 24,
                      paddingTop: 12,
                      paddingBottom: 12,
                      height: 50,
                      justifyContent: "center",
                      marginTop: 48,
                      marginBottom: 24,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 16,
                        fontFamily: "MontserratRegular",
                      }}
                    >
                      {error}
                    </Text>
                  </View>
                ) : null}
              </View>

              {loading ? (
                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    fontSize: 16,
                    textAlign: "center",
                    color: "#f1c40f",
                    backgroundColor: "#f1c40f12",
                    padding: 24,
                    marginTop: 48,
                  }}
                >
                  Loading....
                </Text>
              ) : (
                <View>
                  <FlatList
                    data={flatListData}
                    keyExtractor={(item) => item.date}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContainer}
                  />

                  {/* {history?.length > 0 ? (
                  history?.map((payment, index) => (
                    <WalletSquares
                      key={index}
                      iconName={payment.fundedAmount ? "credit-card" : "wallet"}
                      ImageBackgroundColor={
                        payment.fundedAmount ? "#f1c40f25" : "#ff000025"
                      }
                      IconColor={payment.fundedAmount ? "#f1c40f" : "#B40F0F"}
                      WalletStatus={`${
                        payment.fundedAmount
                          ? "Wallet Credited"
                          : "Wallet Debited"
                      } with ${payment?.fundedAmount?.toLocaleString("en-US")}`}
                      WalletDescription={`Your wallet balance is now  ${payment.amount}`}
                      WalletPaymentDate={` Payment Date ${
                        new Date(payment?.createdAt).toISOString().split("T")[0]
                      }`}
                      isFirst={index === 0}
                      isLast={index === history.length - 1}
                    />
                  ))
                ) : (
                  <View style={styles.notFound}>
                    <Image source={logo} style={styles.headerImage} />
                    <Text style={styles.notFoundText}>
                      No Payment History Found
                    </Text>
                  </View>
                )} */}
                </View>
              )}
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContainerView}>
                {selectedItem && (
                  <View style={styles.modalContent}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          marginBottom: 16,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "MontserratBold",
                            fontSize: 16,
                          }}
                        >
                          {
                            new Date(selectedItem?.createdAt)
                              .toISOString()
                              .split("T")[0]
                          }{" "}
                          -{" "}
                          {
                            new Date(selectedItem?.createdAt)
                              .toISOString()
                              .split("T")[1]
                              .split(".")[0]
                          }
                        </Text>
                      </View>
                      <IconSquares
                        iconName={
                          selectedItem?.fundedAmount ? "credit-card" : "wallet"
                        }
                        ImageBackgroundColor={
                          selectedItem?.fundedAmount ? "#000000" : "#FF5B5B"
                        }
                        IconColor={
                          selectedItem?.fundedAmount ? "#f1c40f" : "#ff0000"
                        }
                      />
                    </View>

                    <Text
                      style={{
                        fontSize: 36,
                        fontFamily: "MontserratBold",
                        marginTop: 24,
                        marginBottom: 24,
                      }}
                    >
                      &#8358;
                      {selectedItem.fundedAmount
                        ? `${selectedItem.fundedAmount}+`
                        : `${selectedItem.debitedAmount}-`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "MontserratBold",
                      }}
                    >
                      {selectedItem.fundedAmount
                        ? `Wallet Credited Successful`
                        : `Wallet Debited Successful`}
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "MontserratRegular",
                        marginTop: 8,
                      }}
                    >
                      Payment Reference: {selectedItem.paymentRefernce}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "MontserratRegular",
                        marginTop: 8,
                      }}
                    >
                      Transaction Description:{" "}
                      {selectedItem.transactionDescription}
                    </Text>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#000000",
                        height: 55,
                        width: "100%",
                        marginTop: 48,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={closeModal}
                    >
                      <Text
                        style={{
                          color: "#f1c40f",
                          fontSize: 16,
                          fontFamily: "MontserratBold",
                        }}
                      >
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentHistory;
