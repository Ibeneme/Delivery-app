import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../../Providers/ThemeProvider";
import { circle } from "../../../../../assets/QuicklogisticsLogo/Ellipse.png";

const AccountSquares = ({ pickupInfo, deliveryInfo, onPress }) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: "left",
      color: `${theme.text}`,
      fontWeight: "bold",
      fontSize: 15,
      fontFamily: "MontserratBold",
      //marginBottom: 9
    },
    containerfirst: {
      color: "#ffffff",
      backgroundColor: theme.views,
      borderColor: theme.edge,
      borderWidth: 1.4,
      width: "100%",
      marginTop: -30,
      //borderWidth: 1,
      //borderColor: `${theme.text}25`,
      borderRadius: 12,
      height: 80,
      padding: 16,
      flexGrow: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "MontserratRegular",
    },
    containerSecond: {
      flexDirection: "row",
      height: "100%",
      justifyContent: "space-between",
      gap: 12,
    },
    text: {
      color: `${theme.text}89`,
      fontSize: 12,
      fontFamily: "MontserratRegular",
    },
    orderView: {
      borderBottomWidth: 0,
      backgroundColor: theme.views,
      padding: 16,
      marginBottom: 12,
      flexDirection: "column",
      gap: 6,
      justifyContent: "space-between",
      borderRadius: 12,
      width: "100%",
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
      backgroundColor: "#f1c40f",
      padding: 4,
      width: 80,
      textAlign: "center",
      borderRadius: 12,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={[styles.containerfirst]}>
      <View style={styles.containerSecond}>
        <View style={styles.cons}>
          <Text style={[styles.passwordtext]}>{pickupInfo}</Text>
          <Text style={[styles.text]}>{deliveryInfo}</Text>
        </View>
      </View>
      <View style={styles.con}>
        
      </View>
    </TouchableOpacity>
  );
};

export default AccountSquares;
