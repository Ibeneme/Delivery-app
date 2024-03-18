import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import { ThemeSwitcher } from "../../../Providers/ThemeSwitcher";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileLogistics } from "../../../Redux/Users/Profile";
import { changePassword } from "../../../Redux/Auth/Auth";
import { fetchUserLogistics } from "../../../Redux/Users/Profile";

const Settings = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const userr = useSelector((state) => state?.auth.user);
  const [success, setSuccess] = useState("");
  const [dataaa, setDataaa] = useState("");
  //console.log(success, "successsuccess");
  const profile = useSelector((state) => state.userProfile);
  const profileData = useSelector((state) => state.auth.user);
  const logisticUserId = profileData.logisticUserId;

  //console.log(profileData, "getProfile");
  const userrr = useSelector((state) => state.profile?.success);

  useEffect(() => {
    dispatch(fetchUserLogistics(logisticUserId))
      .then((response) => {
        //  console.log(response, "GetResponse");
        // console.log(response?.payload?.data, "GetResponseData");
        const dataa = response?.payload?.data || null;
        //setSuccess(dataa);
        setDataaa(dataa);
        console.log(dataa, "GetResponseDataGetResponseDatad");
      })
      .catch((error) => {
        console.log(error, "llalallalala");
        //console.log(error, "propsee");
      });
  }, [dataaa?.logisticsName]);
  console.log(dataaa, "dataaa");

  useEffect(() => {}, [userrr]);

  // useEffect(() => {
  //   dispatch(fetchUserLogistics({ logisticUserId }))
  //     .then((response) => {
  //       console.log(response, "response");
  //       const dataa = userrr?.data;
  //     })
  //     .catch((error) => {
  //       console.log(error, "cnn");
  //     });
  // }, [success]);
  // console.log(success, "jjjj");

  const styles = StyleSheet.create({
    containerfirst: {
      color: "#ffffff",
      height: "100%",
      padding: 16,
      marginTop: 5,
    },
    text: {
      color: theme.text,
      fontWeight: "bold",
      fontFamily: "MontserratBold",
      fontSize: 14,
      marginTop: 8,
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
      justifyContent: "space-between",
      flexDirection: "column",
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
    keyb: {
      flex: 1,
    },
  });

  const headerStyle = {
    backgroundColor: theme.background,
  };

  // useEffect(() => {
  //   handleUpdate();
  // }, [dispatch]);

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
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

  const handleUpdate = () => {
    setLoading(true);
    setSuccess("");
    const formData = {
      logisticsId: profileData?.logisticUserId,
      logisticsName: fullName ? fullName : dataaa?.logisticsName,
      phoneNumber: phoneNumber ? phoneNumber : dataaa?.phoneNumber,
      address: address ? address : dataaa?.address,
      location: location ? location : dataaa?.location,
      basePrice: 12,
      pickupDuration: 12,
      deliveryDuration: 12,
    };

    dispatch(updateProfileLogistics(formData))
      .then(async (response) => {
        //console.log(response, "chaneg");
        setLoading(false);
        setSuccess(response?.payload?.message);
      })
      .catch((error) => {
        //console.log(error, "errr");
      });
  };

  const handleSetPassword = () => {
    setLoadingPassword(true);
    setSuccessPassword("");

    const userId = profileData?.sub;

    const currentPassword = password;
    dispatch(changePassword({ userId, currentPassword, newPassword })) // Pass the arguments as an object
      .then(async (response) => {
        setLoadingPassword(false);
        setSuccessPassword(response?.payload?.message);
      })
      .catch((error) => {});
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handleNewPassword = (newPassword) => {
    setNewPassword(newPassword);
  };

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [pickupDuration, setPickupDuration] = useState("");
  const [deliveryDuration, setDeliveryDuration] = useState("");
  const [pickupDurationErr, setPickupDurationErr] = useState("");
  const [deliveryDurationErr, setDeliveryDurationErr] = useState("");
  const [basePriceErr, setBasePriceErr] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [successPassword, setSuccessPassword] = useState("");
  const [name, setName] = useState("");

  const handleChangeFullName = (newFullName) => {
    setSuccess("");
    let formattedFullName = "";

    if (newFullName) {
      let capitalizeNext = true;

      for (let i = 0; i < newFullName.length; i++) {
        const char = newFullName.charAt(i);

        if (char === " ") {
          capitalizeNext = true;
          formattedFullName += char;
        } else {
          formattedFullName += capitalizeNext
            ? char.toUpperCase()
            : char.toLowerCase();
          capitalizeNext = false;
        }
      }
    }
    setFullName(formattedFullName);
  };

  const handleChangeAddress = (newAddress) => {
    setSuccess("");
    const formattedAddress =
      newAddress?.charAt(0).toUpperCase() + newAddress?.slice(1).toLowerCase();
    setAddress(formattedAddress);
  };

  const handleChangeLocation = (newLocation) => {
    setSuccess("");
    const formattedLocation =
      newLocation?.charAt(0).toUpperCase() +
      newLocation?.slice(1).toLowerCase();
    setLocation(formattedLocation);
  };

  const handleChangePhoneNumber = (newPhoneNumber) => {
    setSuccess("");
    setPhoneNumberError("");
    const numericPhoneNumber = newPhoneNumber?.replace(/\D/g, "");
    if (numericPhoneNumber.length >= 11 && numericPhoneNumber.length <= 12) {
      setPhoneNumber(numericPhoneNumber);
    } else {
      setPhoneNumberError("Phone Numbers are 11 digits");
    }
  };

  const handleChangeBasePrice = (newBasePrice) => {
    setSuccess("");
    setBasePriceErr("");
    const numericPhoneNumber = newBasePrice?.replace(/\D/g, "");
    if (numericPhoneNumber.length >= 1 && numericPhoneNumber.length <= 12) {
      setBasePrice(numericPhoneNumber);
    } else {
      setBasePriceErr("BasePrice is needed");
    }
  };

  const handleChangePickupDuration = (newPickupDuration) => {
    setSuccess("");
    setPickupDurationErr("");
    const numericPhoneNumber = newPickupDuration?.replace(/\D/g, "");
    if (numericPhoneNumber.length >= 1 && numericPhoneNumber.length <= 12) {
      setPickupDuration(numericPhoneNumber);
    } else {
      setPickupDurationErr("Pickup Duration is needed");
    }
  };

  const handleChangeDeliveryLocation = (newDeliveryDuration) => {
    setSuccess("");
    setDeliveryDurationErr("");
    const numericPhoneNumber = newDeliveryDuration?.replace(/\D/g, "");
    if (numericPhoneNumber.length >= 1 && numericPhoneNumber.length <= 12) {
      setDeliveryDuration(numericPhoneNumber);
    } else {
      setDeliveryDurationErr("Pickup Duration is needed");
    }
  };

  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyb}
    >
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
            <View style={styles.orderView}>
              <View style={[styles.grayed]}>
                <Text
                  style={{
                    fontSize: 14,
                    color: `${theme.text}`,
                    fontFamily: "MontserratRegular",
                  }}
                >
                  Light Mode or Dark Mode
                </Text>
                <View>
                  <ThemeSwitcher />
                </View>
              </View>
              <View style={styles.grayed}>
                <View style={styles.Nextgrayed}>
                  <Text style={[styles.text]}>Profile Details</Text>
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeFullName}
                    placeholder={
                      dataaa?.logisticsName
                        ? dataaa?.logisticsName
                        : "Enter your Logistics Name"
                    }
                    placeholderTextColor={`${theme.text}`}
                  />
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangePhoneNumber}
                    placeholder={
                      dataaa?.phoneNumber
                        ? dataaa?.phoneNumber
                        : "Enter your Phone Number"
                    }
                    keyboardType="numeric"
                    placeholderTextColor={`${theme.text}`}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeAddress}
                    placeholder={
                      dataaa?.address ? dataaa?.address : "Enter your Address"
                    }
                    placeholderTextColor={`${theme.text}`}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeLocation}
                    placeholder={
                      dataaa?.location
                        ? dataaa?.location
                        : "Enter your Location"
                    }
                    placeholderTextColor={`${theme.text}`}
                  />
                </View>

                {/* <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeBasePrice}
                    placeholder={
                      dataaa?.basePrice
                        ? dataaa?.basePrice
                        : "Enter your base price"
                    }
                    placeholderTextColor={`${theme.text}`}
                  />
                </View> */}

                {/* <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangePickupDuration}
                    placeholder={
                      dataaa?.pickupDuration
                        ? dataaa?.pickupDuration
                        : "Enter your pickup duration"
                    }
                    placeholderTextColor={`${theme.text}`}
                  />
                </View> */}
                {/* <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeDeliveryLocation}
                    placeholder={
                      dataaa?.deliveryDuration
                        ? dataaa?.deliveryDuration
                        : "Enter your delivery duration"
                    }
                    placeholderTextColor={`${theme.text}`}
                  />
                </View> */}

                <View
                  style={{
                    marginTop: 24,
                  }}
                ></View>
              </View>

              <View
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                }}
              >
                <TouchableOpacity
                  onPress={handleUpdate}
                  style={styles.buttonClick}
                >
                  <Text
                    style={{
                      fontFamily: "MontserratBold",
                    }}
                  >
                    {loading ? <ActivityIndicator color="#000000" /> : "Submit"}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    color: `${theme.text}`,
                    fontSize: 14,
                    fontFamily: "MontserratRegular",
                    marginTop: 24,
                  }}
                >
                  {success}
                </Text>
              </View>
            </View>
            <View style={styles.grayed}>
              <View style={styles.Nextgrayed}>
                <Text style={[styles.text, { fontSize: 14, marginTop: 8 }]}>
                  Change Password
                </Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={handlePassword}
                  placeholder="Enter your old Password"
                  placeholderTextColor={`${theme.text}`}
                />
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleNewPassword}
                  placeholder="Enter your new Password"
                  placeholderTextColor={`${theme.text}`}
                />
              </View>

              <View
                style={{
                  marginTop: 24,
                }}
              ></View>

              <View
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                }}
              >
                <TouchableOpacity
                  onPress={handleSetPassword}
                  style={styles.buttonClick}
                >
                  <Text
                    style={{
                      fontFamily: "MontserratBold",
                    }}
                  >
                    {loadingPassword ? (
                      <ActivityIndicator color="#000000" />
                    ) : (
                      "Submit"
                    )}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    color: `${theme.text}`,
                    fontSize: 14,
                    fontFamily: "MontserratRegular",
                    marginTop: 24,
                  }}
                >
                  {successPassword}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Settings;
