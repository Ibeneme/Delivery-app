import { View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
// import { useTheme } from "../../../Providers/ThemeProvider";

const ErrprLoader = () => {
  const loader = require("../../../assets/QuicklogisticsLogo/errorNew.png");
  return (
    <View
      style={{
        // marginTop: 300,
        height: Dimensions.get("window").height,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        gap: 24
      }}
    >
      <Image
        style={{
          width: 200,
          height: 200,
        }}
        source={loader}
      />
      <Text
        style={{
          color:'#f1c40f',
          fontSize: 14,
          fontFamily: 'MontserratBold'

        }}
      >
        Whoops.... Error while Loading
      </Text>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

export default ErrprLoader;
