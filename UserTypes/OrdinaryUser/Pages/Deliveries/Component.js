import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const FloatingButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 20,  
  },
  button: {
    backgroundColor: "#f1c40f", 
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: 'MontserratRegular'
  },
});


export default FloatingButton;
