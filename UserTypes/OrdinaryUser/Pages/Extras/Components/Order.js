import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../../../../../Providers/ThemeProvider";
import { circle } from "../../../../../assets/QuicklogisticsLogo/Ellipse.png";

const OrderSquares = ({ pickupInfo, deliveryInfo, onPress, recieversName, button, buttonBackgroundColor, buttonBorderColor, textColor}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: "left",
      paddingTop: 12,
      paddingBottom: 12,
      color: `${theme.text}`,
      fontWeight: "bold",
      fontSize: 14,
      fontFamily: "MontserratRegular",
    },
    containerfirst: {
      color: "#ffffff",
      backgroundColor: theme.views,
      width: "100%",
      //borderWidth: 1,
      //borderColor: `${theme.text}25`,
      borderRadius: 12,
      height: 'auto',
      padding: 12,
      paddingTop: 18,
      paddingBottom: 18,
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: "MontserratRegular",
    },
    containerfirstNext: {
      flexGrow: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "MontserratRegular",
      width: "100%",
    },
    containerSecond: {
      flexDirection: "row",
      height: "100%",
      width: '70%',
      gap: 12,
    },
    text: {
      color: `${theme.text}89`,
      fontSize: 12,
      fontFamily: "MontserratRegular",
    },
    textbig:{
      color: `${theme.text}`,
      fontSize: 14,
      fontFamily: "MontserratBold",
      marginBottom:6
    },
    orderView: {
      borderBottomWidth: 0,
      backgroundColor: `${theme.text}12`,
      padding: 20,
      marginBottom: 12,
      flexDirection: "column",
      gap: 6,
      justifyContent: "space-between",
      borderRadius: 12,
      width: "100%",
    },
    notificationCircle: {
      width: 14,
      height: 14,
      backgroundColor: "#f1c40f",
      borderRadius: 24,
    },
    notificationdash: {
      height: 14,
      width: 24,
    },
    cons: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
    con: {
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "right",
    },
    pendingButton: {
      backgroundColor: buttonBackgroundColor || "#f1c40f", // Default color if not provided
      borderColor: buttonBorderColor,

      borderWidth: 2,
      padding: 4,
      width: 80,
      textAlign: "center",
      borderRadius: 12,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={[styles.containerfirst]}>
      <Text style={[styles.textbig]}>{recieversName}</Text>
      <View style={[styles.containerfirstNext]}>
        <View style={styles.containerSecond}>
          <View style={styles.cons}>
            <Image source={circle} style={styles.notificationCircle} />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{ height: 4, width: 1, backgroundColor: "#f1c40f" }}
              />
              <View
                style={{ height: 4, width: 1, backgroundColor: "#f1c40f" }}
              />
            </View>
            <Image source={circle} style={styles.notificationCircle} />
          </View>

          <View style={styles.cons}>
            <Text style={[styles.text]}>{pickupInfo}</Text>
            <Text style={[styles.text]}>{deliveryInfo}</Text>
          </View>

        </View>
        <View style={styles.con}>
          <View style={styles.pendingButton}>
            <Text
              style={{
                textAlign: "center",
                color: textColor,
                fontFamily:'MontserratBold'
              }}
            >
              {button}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderSquares;
