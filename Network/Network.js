import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const NetworkAlert = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      Alert.alert("No Internet Connection", "Please connect to the internet.");
    }
  }, [isConnected]);

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default NetworkAlert;
