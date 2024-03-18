import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../Providers/ThemeProvider";

const Book = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    touchButton: {
      backgroundColor: theme.backgroundAuth,
      marginBottom: 12,
      borderRadius: 12,
      minHeight: 80,
      borderColor: theme.edge,
      borderWidth: 2,
      padding: 16,
    },
    texts: {
      color: theme.text,
      fontFamily: "MontserratBold",
      fontSize: 14,
    },
    textsmall: {
      color: theme.text,
      fontFamily: "MontserratRegular",
      fontSize: 12,
      marginTop: 4,
    },
  });
  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
    borderBottomWidth: 0,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
    fontSize: 12,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Book a Ride",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
        fontSize: 12,
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: theme.background,
          paddingTop: 48,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <TouchableOpacity
          style={styles.touchButton}
          onPress={() => navigation.navigate("Book Rider")}
        >
          <Text style={styles.texts}>Book a Single Delivery</Text>
          <Text style={styles.textsmall}>
            From One Pickup address to one delivery address{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchButton}
          onPress={() => navigation.navigate("pickupAddressMultiple")}
        >
          <Text style={styles.texts}>Book Multiple Deliveries</Text>
          <Text style={styles.textsmall}>
            From One Pickup address to multiple delivery addresses{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Book;
