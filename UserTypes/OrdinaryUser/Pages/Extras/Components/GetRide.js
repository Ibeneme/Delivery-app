import React, {useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../../../../Providers/ThemeProvider";
import { FontAwesome5 } from "react-native-vector-icons";
import { useRoute } from "@react-navigation/native";

const RideSquares = ({
  companyName,
  pickupTime,
  deliveryTime,
  price,
  iconSource,
  onPress,
}) => {

  const [refreshing, setRefreshing] = useState(false);

const onRefresh = () => {
  setRefreshing(true);
  fetchWalletHistory(); // Call your data fetching function here
  setRefreshing(false);
};

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: "left",
      color: `${theme.text}`,
      fontWeight: "bold",
      fontSize: 14,
      fontFamily: "MontserratRegular",
    },
    containerfirst: {
      color: "#ffffff",
      backgroundColor: theme.backgroundDark,
      width: "100%",
      borderWidth: 1,
      borderColor: `#f1c40f`,
      borderRadius: 12,
      height: 120,
      padding: 12,
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "MontserratRegular",
    },
    containerSecond: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    text: {
      color: `${theme.text}89`,
      fontSize: 12,
      fontFamily: "MontserratRegular",
    },
    orderView: {
      borderBottomWidth: 0,
      backgroundColor: `${theme.text}12`,
      padding: 16,
      marginBottom: 12,
      flexDirection: "column",
      gap: 6,
      justifyContent: "space-between",
      borderRadius: 12,
      width: "100%",
    },
    notificationCircle: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderColor: `${theme.text}89`,
      borderRadius: 24,
    },
    notificationdash: {
      height: 14,
      width: 24,
    },
    cons: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
  });

  const route = useRoute();
  const { pickupTimes } = route.params;
  const { pickupAddress } = route.params;
  const { deliveryAddress } = route.params;
  const { packageWeight } = route.params;
  const { name } = route.params;
  const { phoneNumber } = route.params;
  const { recieversEmail } = route.params;


  return (
    <TouchableOpacity onPress={onPress} style={[styles.containerfirst]}>
      <View style={styles.containerSecond}>
        <Image source={iconSource} style={styles.notificationCircle} />
        <Text style={styles.passwordtext}>{companyName}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ gap: 8 }}>
          <View style={styles.cons}>
            <FontAwesome5
              name="clock"
              color={theme.text}
              width={20}
              size={16}
            />
            <Text style={styles.text}>Pickup within {pickupTime} days</Text>
          </View>
          <View style={styles.cons}>
            <FontAwesome5
              name="bicycle"
              color={theme.text}
              width={20}
              size={16}
            />
            <Text style={styles.text}>
              Delivery between {deliveryTime} days
            </Text>
          </View>
        </View>
        <Text style={styles.passwordtext}>₦{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RideSquares;
