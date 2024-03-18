import { View, Image } from "react-native";
import React from "react";

const Loader = () => {
  const loader = require("../../../assets/QuicklogisticsLogo/Logo.png");
  return (
    <View

      style={{
        marginTop: 300,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 48,
          height: 48,
        }}
        source={loader}
      />
    </View>
  );
};

export default Loader;
