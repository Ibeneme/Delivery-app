import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../Providers/ThemeProvider";
import { ThemeSwitcher } from "../../../../Providers/ThemeSwitcher";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateProfile } from "../../../../Redux/Users/Users";
import { changePassword } from "../../../../Redux/Auth/Auth";

const Settings = () => {
  const navigation = useNavigation();
  const { theme, darkMode } = useTheme();

  const profileData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const userr = useSelector((state) => state?.profile?.success?.data?.fullName);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [successPassword, setSuccessPassword] = useState("");
  const [name, setName] = useState("Loading...");
  const [dataa, setDataa] = useState("");
  const ordinaryUserId = profileData?.ordinaryUserId;

  useEffect(() => {
    dispatch(fetchUser({ ordinaryUserId }))
      .then((response) => {
        setDataa(response?.payload?.data)
        console.log(response?.payload?.data, 'setDtaaa')
        setName(response?.payload?.data?.fullName);
      })
      .catch((error) => {});
  }, [ordinaryUserId]);

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handleUpdate = () => {
    setLoading(true);
    setSuccess("");
    const formData = {
      ordinaryId: profileData?.ordinaryUserId,
      fullName: fullName? fullName: dataa?.fullName,
      phoneNumber: phoneNumber? phoneNumber : dataa?.phoneNumber,
      address: address ? address: dataa?.address,
      location: location? location: dataa?.location,
    };

    dispatch(updateProfile(formData))
      .then(async (response) => {
        setLoading(false);
        setSuccess(response?.payload?.message);
      })
      .catch((error) => {});
  };

  const handleSetPassword = () => {
    setLoadingPassword(true);
    setSuccessPassword("");

    const userId = profileData?.sub;
    const currentPassword = password;

    dispatch(changePassword({ userId, currentPassword, newPassword }))
      .then(async (response) => {
        setLoadingPassword(false);
        setSuccessPassword(response?.payload?.message);
      })
      .catch((error) => {});
  };

  const handleNewPassword = (newPassword) => {
    setNewPassword(newPassword);
  };

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

  useEffect(() => {}, [userr]);

  const styles = StyleSheet.create({
    containerfirst: {
      color: "#ffffff",
      height: "100%",
      padding: 16,
      marginTop: -12,
    },
    text: {
      color: theme.text,
      fontSize: 14,
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
      fontSize: 12,
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
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;
  console.log(profileData, "profileData");
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
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
              <View
                style={[
                  styles.grayed,
                  {
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
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
                  <Text style={[styles.text, { fontSize: 13, marginTop: 8 }]}>
                    Profile Details
                  </Text>
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeFullName}
                    placeholder={dataa?.fullName}
                    placeholderTextColor={`${theme.text}`}
                  />
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangePhoneNumber}
                    placeholder={
                      dataa?.phoneNumber
                        ? dataa?.phoneNumber
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
                      dataa?.address
                        ? dataa?.address
                        : "Enter your Address"
                    }
                    placeholderTextColor={`${theme.text}`}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeLocation}
                    placeholder={
                      dataa?.location
                        ? dataa?.location
                        : "Enter your Location"
                    }
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
                    marginBottom: 0,
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
                      {loading ? <ActivityIndicator color="#000" /> : "Submit"}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: "center",
                      color: `${theme.text}`,
                      fontSize: 12,
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
                        <ActivityIndicator color="#000" />
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Settings;
