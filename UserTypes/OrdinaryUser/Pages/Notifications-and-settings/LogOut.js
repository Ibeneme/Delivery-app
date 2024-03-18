import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logoImage from "../../../../assets/QuicklogisticsLogo/Logo.png";
import { useTheme } from "../../../../Providers/ThemeProvider";
import AccountSquares from "../Extras/Components/AccountSquares";
import LogoutModal from "./LogoutModal";
import { logoutUs } from "../../../../Redux/Auth/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../../Redux/Users/Users";

const LogOut = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [modalVisibless, setModalVisibless] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  ////console.log(user.sub, "psll");
  const ordinaryUserId = user?.sub;
  const { theme } = useTheme();

  const headerTintColor = theme.text;
  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
    borderBottomWidth: 0,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        ...headerStyle,
        borderBottomWidth: 0,
      },
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Image source={logoImage} style={styles.headerImage} />
        </View>
      ),
    });
  }, [navigation, theme]);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(logoutUs());
    setModalVisible(false);
    //console.log(user, " //console.log(user, user,);");
  };

  const handleDelete = async () => {
    dispatch(deleteUser(ordinaryUserId))
      .then((response) => {
        //console.log("Response:", response);
        handleLogout();
      })
      .catch((error) => {
        //console.erLOGror("Error:", error);
      });
    setModalVisibles(false);
    //console.log(user, " //console.log(user, user,);");
  };
  const styles = StyleSheet.create({
    headerImage: {
      width: 32,
      height: 30,
    },
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      padding: 16,
    },
    flexview: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
      marginTop: 56,
    },

    imag: {
      width: 48,
      height: 48,
      resizeMode: "contain",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: "#ccc",
    },

    greeting: {
      fontSize: 16,
      marginBottom: 32,
      color: `${theme.text}`,
      fontWeight: "bold",
      fontFamily: "MontserratBold",
    },

    viewOrders: {
      flexDirection: "column",
      marginTop: 48,
    },
    orderscolumn: {
      flexDirection: "column",
      gap: 12,
    },
  });
  const screenHeight = Dimensions.get("window").height;

  const handleTermsLinkPress = () => {
    const termsURL = "https://www.quicklogisticshub.com/terms";
    Linking.openURL(termsURL);
  };
  const handlePrivacyTerms = () => {
    const termsURL = "https://www.quicklogisticshub.com/privacy";
    Linking.openURL(termsURL);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        { backgroundColor: theme.background, minHeight: screenHeight },
      ]}
    >
      <ScrollView>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <ScrollView>
            <View style={styles.viewOrders}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: -34,
                }}
              ></View>
              {/* <View style={styles.orderscolumn}>
                <AccountSquares
                  onPress={() => setModalVisible(true)}
                  pickupInfo="Log Out"
                  deliveryInfo="Log out your account here "
                />
              </View> */}

              <View
                style={[
                  styles.orderscolumn,
                  {
                    marginTop: 44,
                  },
                ]}
              >
                <AccountSquares
                  onPress={handleTermsLinkPress}
                  pickupInfo="Terms and Condition"
                  deliveryInfo="View our Terms and Conditions "
                />
              </View>
              <View
                style={[
                  styles.orderscolumn,
                  {
                    marginTop: 44,
                  },
                ]}
              >
                <AccountSquares
                  onPress={handlePrivacyTerms}
                  pickupInfo="Privacy Policy"
                  deliveryInfo="View our Privacy Policy "
                />
              </View>

              <View
                style={[
                  styles.orderscolumn,
                  {
                    marginTop: 44,
                  },
                ]}
              >
                <AccountSquares
                  onPress={() => setModalVisibles(true)}
                  pickupInfo="Delete your account"
                  deliveryInfo="Delete your account "
                />
              </View>
            </View>

            <LogoutModal
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              onLogout={handleLogout}
              cancelButtonText="Cancel"
              logoutButtonText="Logout"
              text="Are you sure you want to log out?"
            />

            <LogoutModal
              visible={modalVisibles}
              onRequestClose={() => setModalVisibles(false)}
              onLogout={handleDelete}
              cancelButtonText="No Cancel"
              logoutButtonText="Yes Delete"
              text="Are you sure you want to Delete your account with us?"
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogOut;
