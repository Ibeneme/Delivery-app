import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import { fetchMarketPlaceDeliveries } from "../../../Redux/Marketplace/MarketPlace";
import { useSelector, useDispatch } from "react-redux";
import OrderSquares from "../../OrdinaryUser/Pages/Extras/Components/Order";
import IconSquares from "../../OrdinaryUser/Pages/Extras/Components/IconSquares";

const Marketplace = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const deliveries = useSelector((state) => state.marketplace.deliveries);
  const loading = useSelector((state) => state.marketplace.loading);
  const { theme } = useTheme();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handlePhonePress = () => {
    const phoneNumber = selectedOrder?.receiverPhoneNumber;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleAcceptDelivery = () => {
    if (selectedOrder) {
      console.log("Accepted Delivery for Order ID:", selectedOrder?.id);
      navigation.navigate("displayvehicles", { id: selectedOrder?.id });
      setSelectedOrder(null);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch updated data
    dispatch(fetchMarketPlaceDeliveries())
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  useEffect(() => {
    setRefreshing(true)
    handleRefresh()
    dispatch(fetchMarketPlaceDeliveries());
    if (loading === true) {
      handleRefresh()
      handleRefresh()
      dispatch(fetchMarketPlaceDeliveries());
      setRefreshing(false)
    }
    handleRefresh()
    setRefreshing(false)
  }, [dispatch]);

  const styles = StyleSheet.create({
    orderscolumn: {
      flexDirection: "column",
      gap: 12,
      marginBottom: 12,
    },
    modalContents: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    modalViews: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    modalContainer: {
      backgroundColor: "#00000050",
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      position: "relative",
      paddingBottom: 48,
    },
    touchs: {
      height: 55,
      width: "100%",
      backgroundColor: "#000000",
      marginTop: 24,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    touchsText: {
      color: "#f1c40f",
      fontFamily: "MontserratBold",
      fontSize: 13,
    },
    modalContainerView: {
      height: "auto",
      bottom: 0,
      position: "absolute",
      width: "100%",
      backgroundColor: "#f1c40f",
      borderRadius: 21,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 24,
    },
    modalContent: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: 200,
      width: "100%",
    },
    modalText: {
      fontFamily: "MontserratBold",
      fontSize: 16,
      marginBottom: 12,
      color: theme.text,
    },
    address: {
      fontFamily: "MontserratBold",
      textAlign: "left",
      fontSize: 12,
      marginBottom: 4,
    },
    addressNext: {
      fontFamily: "MontserratRegular",
      fontSize: 12,
      marginBottom: 4,
    },
    modalText: {
      fontFamily: "MontserratBold",
      fontSize: 14,
      marginBottom: 12,
      marginTop: 6,
      color: theme.text,
    },
  });

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Market Place",
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
    <SafeAreaView
      style={{ backgroundColor: theme.backgroundColor, height: "100%" }}
    >
      <View style={{ padding: 16, marginTop: 24 }}>
        <View style={{ gap: 32, marginBottom: 12 }}>
          <FlatList
            data={deliveries?.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.orderscolumn} key={item?.id}>
                <OrderSquares
                  pickupInfo={` ${item?.pickupAddress}`}
                  recieversName={`Pickup Name: ${item?.pickupName}`}
                  deliveryInfo={`${item?.deliveryAddress}`}
                  button={`₦${item?.cost?.toLocaleString("en-US")}`}
                  buttonBackgroundColor={theme.backgroundAuth}
                  buttonBorderColor={theme.backgroundAuth}
                  textColor={theme.text}
                  style={{ marginBottom: 8 }}
                  onPress={() => openModal(item)}
                />
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedOrder !== null}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContainerView}>
            {selectedOrder && (
              <View
                style={{
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    fontSize: 14,
                    marginBottom: 16,
                    marginTop: 18,
                    textAlign: "right",
                  }}
                  onPress={closeModal}
                >
                  Close
                </Text>
                <View style={styles.modalContents}>
                  <IconSquares
                   // iconName="car"
                    ImageBackgroundColor={"#000000"}
                    IconColor={"#f1c40f"}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    width: "100%",
                    textAlign: "center",
                    fontSize: 18,
                    marginTop: 12,
                    marginBottom: 4,
                  }}
                >
                  NGN {selectedOrder?.cost}
                </Text>
                <Text
                  style={{
                    fontFamily: "MontserratRegular",
                    width: "100%",
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  Receiver: {selectedOrder?.receiverName}
                </Text>
                <TouchableOpacity onPress={handlePhonePress}>
                  <Text
                    style={{
                      fontFamily: "MontserratRegular",
                      width: "100%",
                      textAlign: "center",
                      fontSize: 14,
                    }}
                  >
                    Contact: {selectedOrder?.receiverPhoneNumber}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    gap: 2,
                    marginTop: 14,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      width: "49%",
                    }}
                  >
                    <Text style={styles.address}>Pickup Address:</Text>
                    <Text style={styles.addressNext}>
                      {selectedOrder?.pickupAddress}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "49%",
                    }}
                  >
                    <Text style={[styles.address, { textAlign: "right" }]}>
                      Delivery Address:
                    </Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedOrder?.deliveryAddress}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 24 }}>
                  <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Package Weight</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedOrder?.packageWeight}
                    </Text>
                  </View>
                  <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Email Address</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedOrder?.receiverEmail}
                    </Text>
                  </View>
                  <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Pickup Phone Number</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedOrder?.pickupPhoneNumber}
                    </Text>
                  </View>
                  <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Pickup Date and Time</Text>
                    <Text style={styles.addressNext}>
                      {new Date(selectedOrder?.pickupTime).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Text>
                  </View>
                  {/* <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Payment Status</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedOrder.paymentMethod === 'wallet'? 'paid' : null}
                      {selectedOrder.paymentMethod === 'card'? 'paid' : null}
                      {selectedOrder.paymentMethod === 'cash'? 'unpaid' : null}
                    </Text>
                  </View> */}
                </View>

                {selectedOrder ? (
                  <TouchableOpacity
                    style={[styles.touchs]}
                    onPress={handleAcceptDelivery}
                    //onPress={() => handleUpdateStatusDelivered(selectedOrder)}
                  >
                    <Text style={[styles.touchsText]}>Accept Delivery</Text>
                  </TouchableOpacity>
                ) : null}
                {/* {selectedOrder.status === "delivered" ? (
                  <TouchableOpacity
                    style={[styles.touchss]}
                    onPress={() => handleUpdateStatusReceived(selectedOrder)}
                  >
                    <Text style={[styles.touchsTexts]}>
                      Received By the Receiver
                    </Text>
                  </TouchableOpacity>
                ) : null} */}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Marketplace;
