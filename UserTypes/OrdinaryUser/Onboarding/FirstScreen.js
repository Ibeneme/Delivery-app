// import { StyleSheet, Text, Image, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import React  from "react";
// import { useTheme } from "../../../Providers/ThemeProvider";

// export default function FirstScreen() {
//   const navigation = useNavigation();
//   const { theme } = useTheme();

//   React.useLayoutEffect(() => {
//     const delay = 10 * 10;
//     const timeout = setTimeout(() => {
//       navigation.navigate("SecondScreen");
//     }, delay);

//     return () => clearTimeout(timeout);
//   }, [navigation]);

//   const logoImage = require("../../../assets/QuicklogisticsLogo/Logo.png");

//   return (
//     <View style={[styles.container, { backgroundColor: theme.backgroundAuth }]}>
//       <Image source={logoImage} style={styles.logo} />
//       <Text style={styles.text}>QuickLogistics Hub</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "600",
//     marginTop: "2%",
//     color: "#f1c40f",
//     fontFamily: "MontserratBold",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     resizeMode: "contain",
//   },
// });
