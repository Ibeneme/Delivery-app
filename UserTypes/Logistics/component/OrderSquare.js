import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../Providers/ThemeProvider";

const OrderSquaresLogistics = ({
  pickupInfo,
  deliveryInfo,
  onPress,
  recieversName,
  button,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    containerfirst: {
      color: "#ffffff",
      backgroundColor: theme.views,
      width: "100%",
      borderRadius: 12,
      height: "auto",
      padding: 12,
      marginBottom: 10,
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
      width: "70%",
      gap: 12,
    },
    text: {
      color: `${theme.text}89`,
      fontSize: 13,
      fontFamily: "MontserratRegular",
    },
    textbig: {
      color: `${theme.text}`,
      fontSize: 16,
      fontFamily: "MontserratBold",
      marginBottom: 8,
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
      borderColor: "#f1c40f",
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
            <Text style={[styles.text]}>From: {pickupInfo}</Text>
            <Text style={[styles.text]}>To: {deliveryInfo}</Text>
          </View>
        </View>
        <View style={styles.con}>
          <View style={styles.pendingButton}>
            <Text
              style={{
                textAlign: "center",
                color: "#f1c40f",
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

export default OrderSquaresLogistics;
