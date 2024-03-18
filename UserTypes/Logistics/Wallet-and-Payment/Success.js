// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";

export default function ErrPage() {
  const dispatch = useDispatch;
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const navigateToLogin = () => {
    navigation.navigate("Home");
  };

  //const [walletHistoryy, setWalletHistory] = useState([]);
  const [walletBalance, setWalletBalance] = useState("");
  const fundWalletResults = useSelector(
    (state) => state.payment.fundWalletResults
  );

  const walletHistorys = useSelector(
    (state) => state.payment.walletHistoryResults
  );

  const balance = fundWalletResults?.data?.user?.balance;

  const history = walletHistorys?.data?.walletHistory;

  const fetchWalletBalance = async () => {
    try {
      const result = await dispatch(fundWallet());
      const string = JSON.stringify(result.payload.data);
      const parse = JSON.parse(string);
      setWalletBalance(parse);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(fundWallet());
    fetchWalletBalance();
  }, [dispatch, balance, walletBalance, history]);

  const { theme } = useTheme();
  const logoImage = require("../../../assets/QuicklogisticsLogo/Successilllustration.png");

  return (
    <View
      style={[styles.containerfirst, { backgroundColor: theme.background }]}
    >
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />

        <Text style={styles.text}>Payment Successful</Text>
        <Text style={[styles.textsmall, { color: theme.text }]}>
          Payment processed Successfully
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.buttonClick} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Proceed to Home</Text>
        </TouchableOpacity>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  containerfirst: {
    color: "#ffffff",
    height: "100%",
    padding: 16,
    flex: 1,
    flexGrow: 1,
  },
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#f1c40f",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "5%",
    fontFamily: "MontserratBold",
  },
  logo: {
    width: 220,
    resizeMode: "contain",
    marginTop: 120,
  },
  textsmall: {
    textAlign: "center",
    fontSize: 12,
    marginTop: "2%",
    fontFamily: "MontserratRegular",
  },
  containerButton: {
    width: "100%",
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24,
    justifyContent: "center",
  },
  buttonClick: {
    backgroundColor: "#f1c40f",
    width: "100%",
    height: 50,
    borderRadius: 444,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 12,
    fontFamily: "MontserratBold",
  },
});
