import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useTheme } from "../../../../Providers/ThemeProvider";

const LogoutModal = ({ visible, onRequestClose, onLogout, text,cancelButtonText, logoutButtonText }) => {

  const handleLogout = () => {
    onRequestClose();
  };
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#f1c40f",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 16,
      height: 300,
    },
    modalText: {
      fontSize: 14,
      marginBottom: 20,
      color: "black",
      textAlign: "center",
      marginTop: 32,
      fontFamily: "MontserratBold",
    },
    buttonContainer: {
      flexDirection: "column",
      justifyContent: "flex-end",
      width: "100%",
      gap: 12,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: "100%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelButton: {
      backgroundColor: "#000",
    },
    logoutButton: {
      backgroundColor: "#f1c40f",
      color: "#000000",
      borderColor: "#000000",
      borderWidth: 1.5,
    },
    buttonText: {
      color: "white",
      fontSize: 14,
      fontFamily: "MontserratBold",
    },
    buttonTexts: {
      color: "#000000",
      fontSize: 14,
      fontFamily: "MontserratBold",
    },
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
           {text}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>{cancelButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={onLogout}
            >
              <Text style={styles.buttonTexts}>{logoutButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
