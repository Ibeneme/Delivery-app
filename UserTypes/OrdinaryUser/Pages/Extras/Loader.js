import { View, Image, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  headerImage: {
    width: 120,
    height: 120,
  },
});

const logoImage = require("../Extras/Components/images/Gif-Tofa_V3.mov");

const Loader = () => {
  return (
    <View>
      <Image source={logoImage} style={styles.headerImage} />
    </View>
  );
};

export default Loader;
