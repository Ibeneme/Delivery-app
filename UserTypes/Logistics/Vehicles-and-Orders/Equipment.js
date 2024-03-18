import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Switch,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVehicle,
  fetchVehicles,
  getVehicle,
  updateVehicleAvailability,
} from "../../../Redux/Logistics/Logistics";
import { useTheme } from "../../../Providers/ThemeProvider";
const Equipment = () => {
  const { theme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [totalVehicles, setTotalVehicles] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchVehicles()); // Fetch vehicles when screen is in focus
    }, [dispatch])
  );

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
      fontSize: 12,
      marginTop: 6,
      fontFamily: "MontserratRegular",
      marginBottom: 6,
    },
    price: {
      color: theme.text,
      fontSize: 18,
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
      fontSize: 12,
      marginBottom: 3,
      marginTop: 3,
      color: `${theme.text}85`,
    },
    modalViews: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  });

  const toggleSwitch = async () => {
    const newAvailability = !selectedVehicle.available;
    setSelectedVehicle((prevState) => ({
      ...prevState,
      available: newAvailability,
    }));

    try {
      const response = await dispatch(
        updateVehicleAvailability({
          vehicleId: selectedVehicle.id,
          available: newAvailability,
        })
      );
    } catch (error) {}
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isLoading, error, vehicles } = useSelector(
    (state) => state.logistics
  );

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  useEffect(() => {
    const numberOfVehicles = vehicles?.data?.length || 0;
    setTotalVehicles(numberOfVehicles);
  }, [vehicles]);

  const handleGetVehicle = (id) => {
    dispatch(getVehicle(id))
      .then((response) => {
        setSelectedVehicle(response?.payload?.data);
        //console.log(response.payload.data);
        setModalVisible(true);
        //console.log(vehicles?.data);
      })
      .catch((error) => {});
  };

  const deleteVehicles = async (id) => {
    try {
      const response = await dispatch(deleteVehicle(id));
      setSelectedVehicle(response);
      setModalVisible(false);
    } catch (error) {}
  };

  const navigateSpecificDelivery = (id) => {
    setModalVisible(!isModalVisible);
    navigation.navigate("updatelocationGD", {
      id: id,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Equipment",
      headerStyle: {
        backgroundColor: theme.backgroundAuth,
      },
      headerTitleStyle: {
        fontFamily: "MontserratBold",
        fontSize: 14,
      },
      headerTintColor: theme.text,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, height: "100%" }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(fetchVehicles())}
          />
        }
      >
        <View style={[{ backgroundColor: theme.background, padding: 12 }]}>
          <View style={styles.rows}>
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 14,
                    fontFamily: "MontserratRegular",
                    textAlign: "center",
                    color: "#000000",
                    marginTop: 12,
                  },
                ]}
              >
                Vehicles Added
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 40,
                    color: "#000000",
                    marginTop: 12,
                    textAlign: "center",
                  },
                ]}
              >
                {totalVehicles}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                style={styles.buttonss}
                onPress={() => navigation.navigate("locationGD")}
              >
                <Text
                  style={[
                    {
                      color: "#ffffff",
                      fontFamily: "MontserratBold",
                      fontSize: 12,
                      borderRadius: 4,
                    },
                  ]}
                >
                  Add a Vehicle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 48,
            }}
          >
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
                  onPress={() => handleGetVehicle(vehicle?.id)}
                >
                  <View
                    style={{
                      width: "65%",
                    }}
                  >
                    <Text style={styles.type}>Vehicle: {vehicle.type}</Text>
                    <Text style={styles.capacity}>
                      Location: {vehicle.location}
                    </Text>

                    <Text style={[styles.capacity, { marginTop: 0 }]}>
                      Rider: {vehicle.riderName} - Tel: {""}{" "}
                      {vehicle.riderPhoneNumber}
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
                                onPress={() => setModalVisible(!isModalVisible)}
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
                  </Modal>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Equipment;
