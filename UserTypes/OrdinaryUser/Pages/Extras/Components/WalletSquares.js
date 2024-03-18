import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../../../../Providers/ThemeProvider";
import { FontAwesome5 } from "react-native-vector-icons";

const WalletSquares = ({
  WalletStatus,
  WalletDescription,
  onPress,
  WalletPaymentDate,
  notificationCircleBackgroundColor,
  ImageBackgroundColor,
  iconName,
  IconColor,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: "left",
      paddingBottom: 12,
      color: `${theme.text}`,
      fontWeight: "bold",
      fontSize: 16,
      fontFamily: "MontserratBold",
    },
    containerfirst: {
      color: "#ffffff",
      backgroundColor: theme.views,
      padding: 12,
      flexGrow: 1,
      marginBottom: 8,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "MontserratRegular",
    },
    containerSecond: {
      flexDirection: "row",
      height: "100%",
      width: "100%",
      gap: 9,
    },

    text: {
      color: `${theme.text}89`,
      fontSize: 14,
      fontFamily: "MontserratRegular",
      marginTop: 8,
    },
    texts: {
      color: `${theme.text}`,
      fontSize: 14,
      marginTop: -7,
      width: '100%',
      fontFamily: "MontserratRegular",
    },
    orderView: {
      borderBottomWidth: 0,
      padding: 16,
      marginBottom: 12,
      flexDirection: "column",
      gap: 4,
      justifyContent: "space-between",
      borderRadius: 12,
      width: "100%",
    },
    notificationCircle: {
      width: 11,
      height: 11,
      backgroundColor: notificationCircleBackgroundColor,
      borderRadius: 24,
      marginTop: 4,
    },
    notificationdash: {
      height: 14,
      width: 24,
    },
    cons: {
      flexDirection: "column",
      justifyContent: "space-between",
      marginBottom: 12,
      marginTop: 8,
    },
    con: {
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "right",
    },
    greenBackground: {
      backgroundColor: ImageBackgroundColor,
      padding: 8,
      borderRadius: 2222,
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
  });
 return (
    <TouchableOpacity onPress={onPress} style={[styles.containerfirst]}>
      <View style={styles.containerSecond}>
        {/* <View style={styles.cons}>
          <View style={styles.greenBackground}>
            <FontAwesome5 name={iconName} size={22} color={IconColor} />
          </View>
        </View> */}
        <View style={styles.cons}>
          <Text style={[styles.passwordtext]}>{WalletStatus}</Text>
          <Text style={[styles.texts]}>{WalletDescription}</Text>
          <Text style={[styles.text]}>{WalletPaymentDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WalletSquares;
