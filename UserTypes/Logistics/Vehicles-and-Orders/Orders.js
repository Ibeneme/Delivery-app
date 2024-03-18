import React, { useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import OrderSquaresLogistics from "../component/OrderSquare";
import {
  fetchLogisticsDeliveries,
  updateDeliveryStatus,
} from "../../../Redux/Logistics/Deliveries";
import { useSelector, useDispatch } from "react-redux";
import IconSquares from "../../OrdinaryUser/Pages/Extras/Components/IconSquares";
//import { TouchableOpacity } from "react-native-gesture-handler";

const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handlePhonePress = () => {
    const phoneNumber = selectedItem.receiverPhoneNumber;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const styles = StyleSheet.create({
    containerfirst: {
      color: "#ffffff",
      height: "100%",
      padding: 16,
    },
    modalContainer: {
      backgroundColor: "#00000050",
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      position: "relative",
      paddingBottom: 48,
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
    },
    modalContent: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: 200,
      width: "100%",
    },
    modalContents: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
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
    modalTexts: {
      fontFamily: "MontserratRegular",
      fontSize: 12,
      marginBottom: 3,
      marginTop: 3,
      color: `${theme.text}85`,
    },
    modalViews: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
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
    touchsTexts: {
      color: "#000000",
      fontFamily: "MontserratBold",
      fontSize: 14,
    },
    touchss: {
      height: 55,
      width: "100%",
      borderColor: "#000000",
      borderWidth: 2,
      marginBottom: 0,
      marginTop: 8,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
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
      title: "Order",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const logisticsDeliveries = useSelector(
    (state) => state?.deliveriesLogistics?.deliveries?.data
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchLogisticsDeliveries());
    }
  }, [reload]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const Maps = () => {
    closeModal();
    navigation.navigate("Map", {
      pickupCoordinates: selectedItem.pickupCoordinates,
      deliveryCoordinates: selectedItem.deliveryCoordinates,
      deliveryAddress: selectedItem.deliveryAddress,
      pickupAddress: selectedItem.pickupAddress,
      cost: selectedItem.cost,
      status: selectedItem.status,
    });
  };
  const delivery = useSelector((state) => state.delivery);

  const { loading } = useSelector((state) => state.deliveriesLogistics);

  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(0);

  const handleRefresh = () => {
    dispatch(fetchLogisticsDeliveries());
    setRefreshing(true);
  };

  const [isLoadingg, setIsLoadingg] = useState(false);

  useEffect(() => {
    if (logisticsDeliveries) {
      setRefreshing(false);
    }
  }, [reload, refreshing, logisticsDeliveries?.status]);

  const handleUpdateStatusDeclined = () => {
    const res = dispatch(
      updateDeliveryStatus({ deliveryId: selectedItem?.id, status: "declined" })
    );
    console.log(selectedItem.id, selectedItem.status, "nexttt");
    dispatch(fetchLogisticsDeliveries());
    handleRefresh();
    setReload((prevReload) => prevReload + 1);
    handleRefresh();
    handleRefresh();
    setModalVisible(false);
  };

  const handleUpdateStatusAccept = (selectedItem) => {
    const res = dispatch(
      updateDeliveryStatus({ deliveryId: selectedItem?.id, status: "accepted" })
    );
    console.log(selectedItem.id, selectedItem.status, "nexttt");
    dispatch(fetchLogisticsDeliveries());
    handleRefresh();
    setReload((prevReload) => prevReload + 1);
    handleRefresh();
    handleRefresh();
    setModalVisible(false);
  };

  const handleUpdateStatusCancelled = (selectedItem) => {
    const res = dispatch(
      updateDeliveryStatus({
        deliveryId: selectedItem?.id,
        status: "cancelled",
      })
    );
    console.log(selectedItem.id, selectedItem.status, "nexttt");
    dispatch(fetchLogisticsDeliveries());
    handleRefresh();
    setReload((prevReload) => prevReload + 1);
    handleRefresh();
    handleRefresh();
    setModalVisible(false);
  };

  const handleUpdateStatusIntransit = (selectedItem) => {
    const res = dispatch(
      updateDeliveryStatus({
        deliveryId: selectedItem?.id,
        status: "inTransit",
      })
    );
    console.log(selectedItem.id, selectedItem.status, "nexttt");
    dispatch(fetchLogisticsDeliveries());
    handleRefresh();
    setReload((prevReload) => prevReload + 1);
    handleRefresh();
    handleRefresh();
    setModalVisible(false);
  };

  const handleUpdateStatusDelivered = (selectedItem) => {
    const deliveryId = selectedItem?.id;
    const statuss = "delivered";
    setIsLoadingg(true);
    dispatch(updateDeliveryStatus({ deliveryId: deliveryId, status: statuss }))
      .then((response) => {
        console.log(response, selectedItem);
        // If the status update is successful, you can handle any additional actions here.
        // For example, fetching the updated deliveries and closing the modal.
        dispatch(fetchLogisticsDeliveries());
        setReload((prevReload) => prevReload + 1);
        handleRefresh();
        setIsLoadingg(false);
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        // Handle errors here
      });
  };

  useEffect(() => {}, [delivery, reload]);

  useEffect(() => {
    if (!modalVisible) {
      dispatch(fetchLogisticsDeliveries());
    }
  }, [modalVisible, dispatch, reload]);

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const handleFilterByStatus = (status) => {
    setSelectedStatusFilter(status);
  };
  const filteredDeliveries = logisticsDeliveries?.filter((item) => {
    if (selectedStatusFilter === "all") {
      return true; // Show all items when "all" is selected
    } else {
      return item.status === selectedStatusFilter;
    }
  });

  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [cancelledDeliveries, setCancelledDeliveries] = useState(0);
  const [inTransitDeliveries, setInTransitDeliveries] = useState(0);
  const [deliveredDeliveries, setDeliveredDeliveries] = useState(0);
  const [acceptedDeliveries, setAcceptedDeliveries] = useState(0);

  //console.log(logisticsDeliveries), "logisticsDeliverieslogisticsDeliveries";

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchLogisticsDeliveries());
    } else {
      const pending = logisticsDeliveries?.filter(
        (delivery) => delivery?.status === "pending"
      )?.length;
      const cancelled = logisticsDeliveries?.filter(
        (delivery) => delivery?.status === "cancelled"
      )?.length;
      const inTransit = logisticsDeliveries?.filter(
        (delivery) => delivery?.status === "inTransit"
      )?.length;
      const delivered = logisticsDeliveries?.filter(
        (delivery) => delivery?.status === "delivered"
      )?.length;
      const accepted = logisticsDeliveries?.filter(
        (delivery) => delivery?.status === "accepted"
      )?.length;

      setPendingDeliveries(pending);
      setCancelledDeliveries(cancelled);
      setInTransitDeliveries(inTransit);
      setDeliveredDeliveries(delivered);
      setAcceptedDeliveries(accepted);
    }
  }, [reload, refreshing, isLoading]);

  const isLoading = useMemo(() => !logisticsDeliveries, [logisticsDeliveries]);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, height: "100%" }}>
      <View
        style={{
          padding: 16,
          marginTop: 24,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 32,
            marginBottom: 12,
            padding: 12,
            height: 50,
            alignItems: "center",
            borderRadius: 16,
            backgroundColor: theme.backgroundAuth,
          }}
        >
          <TouchableOpacity
            onPress={() => handleFilterByStatus("all")}
            color={selectedStatusFilter === "all" ? "#f1c40f" : `${theme.text}`}
          >
            <Text
              style={{
                color:
                  selectedStatusFilter === "all" ? "#f1c40f" : `${theme.text}`,
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              All Orders
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterByStatus("pending")}
            color={
              selectedStatusFilter === "pending" ? "#f1c40f" : `${theme.text}`
            }
          >
            <Text
              style={{
                color:
                  selectedStatusFilter === "pending"
                    ? "#f1c40f"
                    : `${theme.text}`,
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              Pending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterByStatus("accepted")}
            color={
              selectedStatusFilter === "accepted" ? "#f1c40f" : `${theme.text}`
            }
          >
            <Text
              style={{
                color:
                  selectedStatusFilter === "accepted"
                    ? "#f1c40f"
                    : `${theme.text}`,
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              Accepted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFilterByStatus("inTransit")}
            color={
              selectedStatusFilter === "inTransit" ? "#f1c40f" : `${theme.text}`
            }
          >
            <Text
              style={{
                color:
                  selectedStatusFilter === "inTransit"
                    ? "#f1c40f"
                    : `${theme.text}`,
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              In-Transit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFilterByStatus("delivered")}
            color={
              selectedStatusFilter === "delivered" ? "#f1c40f" : `${theme.text}`
            }
          >
            <Text
              style={{
                color:
                  selectedStatusFilter === "delivered"
                    ? "#f1c40f"
                    : `${theme.text}`,
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              Delivered
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterByStatus("cancelled")}
            color={
              selectedStatusFilter === "cancelled" ? "#f1c40f" : `${theme.text}`
            }
          >
            <Text
              style={{
                color:
                  selectedStatusFilter === "cancelled"
                    ? "#f1c40f"
                    : `${theme.text}`,
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFilterByStatus("received")}
            color={
              selectedStatusFilter === "received" ? "#f1c40f" : `${theme.text}`
            }
          >
            <Text
              style={{
                color:
                  selectedStatusFilter === "received"
                    ? "#f1c40f"
                    : `${theme.text}`,
                fontFamily: "MontserratBold",
                fontSize: 14,
              }}
            >
              Received
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Pass the refreshing state
              onRefresh={handleRefresh} // Callback when user pulls to refresh
            />
          }
        >
          {loading ? <ActivityIndicator color={theme.text} /> : null}
          {filteredDeliveries?.length === 0 ||
          filteredDeliveries?.length === false ? (
            <View
              style={{
                height: 100,
                backgroundColor: "#f1c40f30",
                marginTop: 28,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1c40f",
                  fontFamily: "MontserratBold",
                }}
              >
                No orders here
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: 10 }}>
              {filteredDeliveries?.map((item) => (
                <OrderSquaresLogistics
                  key={item.id.toString()} // Don't forget to add a unique key
                  pickupInfo={item.pickupAddress}
                  deliveryInfo={item.deliveryAddress}
                  recieversName={item.receiverName}
                  button={item.status}
                  onPress={() => openModal(item)} // Open the modal when pressed
                />
              ))}
            </View>
          )}
        </ScrollView>
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
                    //iconName="car"
                    ImageBackgroundColor={"#000000"}
                    IconColor={"#f1c40f"}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    width: "100%",
                    textAlign: "center",
                    fontSize: 20,
                    marginTop: 12,
                    marginBottom: 4,
                  }}
                >
                  NGN {selectedItem.cost}
                </Text>
                <Text
                  style={{
                    fontFamily: "MontserratRegular",
                    width: "100%",
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  Receiver: {selectedItem.receiverName}
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
                    Contact: {selectedItem.receiverPhoneNumber}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    gap: 2,
                    marginTop: 16,
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
                      {selectedItem.pickupAddress}
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
                      {selectedItem.deliveryAddress}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 24 }}>
                  <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Package Weight</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedItem.packageWeight}
                    </Text>
                  </View>
                  <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Email Address</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedItem.receiverEmail}
                    </Text>
                  </View>
                  <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Payment Status</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedItem.paymentStatus}
                    </Text>
                  </View>
                  <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Payment Method</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedItem.paymentMethod}
                    </Text>
                  </View>
                  {/* <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Payment Status</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedItem.paymentMethod === 'wallet'? 'paid' : null}
                      {selectedItem.paymentMethod === 'card'? 'paid' : null}
                      {selectedItem.paymentMethod === 'cash'? 'unpaid' : null}
                    </Text>
                  </View> */}
                </View>

                {selectedItem.status === "pending" ? (
                  <TouchableOpacity
                    style={[styles.touchs]}
                    onPress={() => handleUpdateStatusAccept(selectedItem)}
                  >
                    <Text style={[styles.touchsText]}>
                      Approve Delivery Request
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {selectedItem.status === "pending" ? (
                  <TouchableOpacity
                    style={[styles.touchss]}
                    onPress={() => handleUpdateStatusDeclined(selectedItem)}
                  >
                    <Text style={[styles.touchsTexts]}>
                      Decline Delivery Request
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {selectedItem.status === "accepted" ? (
                  <TouchableOpacity
                    style={[styles.touchs]}
                    onPress={() => handleUpdateStatusIntransit(selectedItem)}
                  >
                    <Text style={[styles.touchsText]}>
                      Transit Delivery Request
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {selectedItem.status === "accepted" ? (
                  <TouchableOpacity
                    style={[styles.touchss]}
                    onPress={() => handleUpdateStatusCancelled(selectedItem)}
                  >
                    <Text style={[styles.touchsTexts]}>
                      Cancel Delivery Request
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {selectedItem.status === "inTransit" ? (
                  <TouchableOpacity
                    style={[styles.touchs]}
                    onPress={() => handleUpdateStatusDelivered(selectedItem)}
                  >
                    <Text style={[styles.touchsText]}>Delivered</Text>
                  </TouchableOpacity>
                ) : null}
                {/* {selectedItem.status === "delivered" ? (
                  <TouchableOpacity
                    style={[styles.touchss]}
                    onPress={() => handleUpdateStatusReceived(selectedItem)}
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

export default Order;
