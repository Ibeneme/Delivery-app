import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import {
  acceptDelivery,
  fetchMarketPlaceDeliveries,
} from "../../../Redux/Marketplace/MarketPlace";
import { useSelector, useDispatch } from "react-redux";
import OrderSquares from "../../OrdinaryUser/Pages/Extras/Components/Order";
import IconSquares from "../../OrdinaryUser/Pages/Extras/Components/IconSquares";
import { fetchVehicles } from "../../../Redux/Logistics/Logistics";

const DisplayVehiclesMarketplace = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const deliveries = useSelector((state) => state.marketplace.deliveries);
  const loading = useSelector((state) => state.marketplace.loading);
  const { isLoading, error, vehicles } = useSelector(
    (state) => state.logistics
  );

  const { theme } = useTheme();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    dispatch(fetchMarketPlaceDeliveries());
    if (loading === true) {
      dispatch(fetchMarketPlaceDeliveries());
    }
  }, [dispatch]);

  console.log(id, "yeah");

  const handleVehiclePress = (vehicleId) => {
    console.log("Pressed on Vehicle ID:", vehicleId);
    const deliveryId = id;
    dispatch(acceptDelivery({ deliveryId, vehicleId }))
      .then((response) => {
        if (response?.type === "marketplace/acceptDelivery/fulfilled") {
          dispatch(acceptDelivery({ deliveryId, vehicleId }))
            .then((response) => {
              if (response) {
                navigation.navigate("SuccessMarketPlacee");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          navigation.navigate("SuccessMarketPlacee");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    dispatch(fetchMarketPlaceDeliveries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const styles = StyleSheet.create({
    containerfirst: {
      color: "#ffffff",
      height: 260,
      padding: 16,
      borderRadius: 24,
    },
    text: {
      color: theme.text,
      fontSize: 14,
      fontFamily: "MontserratBold",
    },

    rows: {
      flexDirection: "column",
      marginTop: 12,
      height: 200,
      justifyContent: "space-evenly",
      backgroundColor: "#f1c40f",
      borderRadius: 12,
      width: "100%",
      padding: 12,
    },

    buttonsss: {
      width: "100%",
      alignItems: "center",
      height: 55,
      borderColor: "#f1c40f",
      borderWidth: 2,
      justifyContent: "center",
      color: "#000",
      borderRadius: 12,
      marginTop: 10,
    },
    buttonss: {
      width: "100%",
      alignItems: "center",
      height: 55,
      backgroundColor: "#000000",
      justifyContent: "center",
      color: "#000",
      borderRadius: 12,
    },
    buttons: {
      width: "100%",
      alignItems: "center",
      height: 55,
      backgroundColor: "#f1c40f",
      justifyContent: "center",
      color: "#000",
      borderRadius: 12,
    },

    type: {
      color: theme.text,
      fontSize: 14,
      fontFamily: "MontserratBold",
      marginTop: 6,
    },
    capacity: {
      color: theme.text,
      fontSize: 14,
      marginTop: 6,
      fontFamily: "MontserratRegular",
      marginBottom: 6,
    },
    price: {
      color: theme.text,
      fontSize: 14,
      fontFamily: "MontserratBold",
    },
    modalContainer: {
      backgroundColor: "#00000090",
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      position: "relative",
    },
    modalContainerView: {
      height: 700,
      bottom: 0,
      position: "absolute",
      width: "100%",
      backgroundColor: `${theme.backgroundAuth}`,
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
    modalText: {
      fontFamily: "MontserratBold",
      fontSize: 14,
      marginBottom: 12,
      marginTop: 6,
      color: theme.text,
    },
    modalTexts: {
      fontFamily: "MontserratRegular",
      fontSize: 14,
      marginBottom: 3,
      marginTop: 3,
      color: `${theme.text}85`,
    },
    modalViews: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },

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
      fontSize: 16,
      marginBottom: 12,
      marginTop: 6,
      color: theme.text,
    },
  });

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
      title: "Choose a Vehicle",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.backgroundColor, height: "100%" }}
    >
      <View style={{ padding: 16 }}>
        <ScrollView style={{}}>
          {vehicles?.data?.length === 0 ? (
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                color: `${theme.text}`,
                fontFamily: "MontserratBold",
                marginTop: 64,
              }}
            >
              You have no added vehicles yet.
            </Text>
          ) : (
            vehicles?.data?.map((vehicle) => (
              <TouchableOpacity
                style={{
                  borderRadius: 8,
                  backgroundColor: theme.walletViews,
                  marginTop: 6,
                  height: "auto",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  width: "100%",
                }}
                key={vehicle.id}
                onPress={() => handleVehiclePress(vehicle.id)}
              >
                <View
                  style={{
                    width: "65%",
                  }}
                >
                  <Text style={styles.type}>Vehicle: {vehicle.type}</Text>
                  <Text style={styles.capacity}>
                    Delivery Duration: {vehicle?.deliveryDuration}days
                  </Text>

                  <Text style={[styles.capacity, { marginTop: 0 }]}>
                    Delivery Duration: {vehicle?.pickupDuration}
                  </Text>
                </View>
                <View
                  style={{
                    width: "35%",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.price}>&#8358;{vehicle.basePrice}</Text>
                </View>
                {/* 
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                      setSelectedVehicle(null);
                      setModalVisible(!isModalVisible);
                    }}
                  >
                    <View
                      style={styles.modalContainer}
                      onPress={() => setModalVisible(!isModalVisible)}
                    >
                      <View
                        style={styles.modalContainerView}
                        onPress={() => setModalVisible(!isModalVisible)}
                      >
                        {selectedVehicle && (
                          <View style={styles.modalContent}>
                            <View
                              style={{
                                textAlign: "right",
                                width: "100%",
                              }}
                            >
                              <Text
                                style={[
                                  styles.text,
                                  {
                                    fontFamily: "MontserratRegular",
                                    width: "100%",
                                    textAlign: "right",
                                  },
                                ]}
                                //onPress={() => setModalVisible(!isModalVisible)}
                              >
                                Close
                              </Text>
                            </View>
                            <View>
                              <Image
                                source={{ uri: selectedVehicle?.image }}
                                style={{ width: 100, height: 100 }}
                              />
                            </View>
                            <Text
                              style={[
                                styles.modalText,
                                { textAlign: "center" },
                              ]}
                            >
                              Vehicle Type: {selectedVehicle?.type}
                            </Text>
                            <Text
                              style={[
                                styles.capacity,
                                {
                                  marginBottom: 6,
                                  marginTop: 0,
                                  textAlign: "center",
                                },
                              ]}
                            >
                              Vehicle Name: {selectedVehicle?.name}
                            </Text>

                            <Text
                              style={[
                                styles.capacity,
                                {
                                  marginBottom: 24,
                                  marginTop: 0,
                                  textAlign: "center",
                                },
                              ]}
                            >
                              Rider: {selectedVehicle?.riderName} - Tel: {""}{" "}
                              {selectedVehicle?.riderPhoneNumber}
                            </Text>

                            <View style={styles.modalViews}>
                              <Text
                                style={[
                                  styles.modalTexts,
                                  { fontFamily: "MontserratBold" },
                                ]}
                              >
                                Pickup Duration:
                              </Text>
                              <Text style={styles.modalTexts}>
                                {selectedVehicle?.pickupDuration}mins
                              </Text>
                            </View>

                            <View style={styles.modalViews}>
                              <Text
                                style={[
                                  styles.modalTexts,
                                  { fontFamily: "MontserratBold" },
                                ]}
                              >
                                Delivery Duration:
                              </Text>
                              <Text style={styles.modalTexts}>
                                {selectedVehicle?.deliveryDuration}mins
                              </Text>
                            </View>

                            <View
                              style={[
                                styles.modalViews,
                                {
                                  flexDirection: "column",
                                  marginTop: 16,
                                  marginBottom: 16,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.modalTexts,
                                  { fontFamily: "MontserratBold" },
                                ]}
                              >
                                Location
                              </Text>
                              <Text style={styles.modalTexts}>
                                {selectedVehicle?.location}
                              </Text>
                            </View>

                            <View style={styles.modalViews}>
                              <Text
                                style={[
                                  styles.modalTexts,
                                  { fontFamily: "MontserratBold" },
                                ]}
                              >
                                Capacity
                              </Text>
                              <Text style={styles.modalTexts}>
                                {selectedVehicle?.capacity}
                              </Text>
                            </View>

                            <View style={styles.modalViews}>
                              <Text
                                style={[
                                  styles.modalTexts,
                                  { fontFamily: "MontserratBold" },
                                ]}
                              >
                                Vehicle Number
                              </Text>
                              <Text style={styles.modalTexts}>
                                {selectedVehicle?.vehicleNumber}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "space-between",
                                marginTop: 16,
                                marginBottom: 16,
                              }}
                            >
                              <Text
                                style={[
                                  styles.modalTexts,
                                  { fontFamily: "MontserratBold" },
                                ]}
                              >
                                Available?
                              </Text>
                              <Switch
                                style={styles.newText}
                                trackColor={{
                                  false: "#767577",
                                  true: "#f1c40f",
                                }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={selectedVehicle.available}
                              />
                            </View>

                            <View
                              style={{
                                alignItems: "center",
                                marginBottom: 0,
                              }}
                            >
                              <Text style={styles.modalTexts}>Base Price:</Text>
                              <Text style={styles.modalText}>
                                &#8358;{selectedVehicle?.basePrice}
                              </Text>
                            </View>
{/* 
                            <TouchableOpacity
                              onPress={() =>
                                navigateSpecificDelivery(selectedVehicle?.id)
                              }
                              style={styles.buttons}
                            >
                              <Text
                                style={{
                                  color: "#000000",
                                  fontFamily: "MontserratBold",
                                }}
                                onPress={() =>
                                  navigateSpecificDelivery(selectedVehicle?.id)
                                }
                              >
                                Update Vehicle
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.buttonsss}
                              onPress={() =>
                                deleteVehicles(selectedVehicle?.id)
                              }
                            >
                              <Text
                                style={{
                                  color: "#f1c40f",
                                  fontFamily: "MontserratBold",
                                }}
                              >
                                Delete Vehicle
                              </Text>
                            </TouchableOpacity> 
                          </View>
                        )}
                      </View>
                    </View>
                  </Modal> */}
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DisplayVehiclesMarketplace;
