import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Button,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../Providers/ThemeProvider';
//import Icon from 'react-native-vector-icons/FontAwesome';
import WalletSquares from '../Extras/Components/WalletSquares';
import {useDispatch, useSelector} from 'react-redux';
import {fundWallet, walletHistory} from '../../../../Redux/Payment/Payments';
import logo from '../Extras/Components/images/Rectangle 6633.png';
//import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IconSquares from '../Extras/Components/IconSquares';

const WalletHistory = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const maskedBalance = '******';

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const styles = StyleSheet.create({
    refreshIcon: {
      fontSize: 14,
      color: theme.text,
      marginLeft: 10,
    },
    modalContainer: {
      backgroundColor: '#00000050',
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      position: 'relative',
    },
    modalContainerView: {
      height: 500,
      bottom: 0,
      position: 'absolute',
      width: '100%',
      backgroundColor: '#f1c40f',
      borderRadius: 21,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: 200,
      width: '100%',
    },
    passwordtext: {
      textAlign: 'left',
      paddingTop: 12,
      paddingBottom: 12,
      color: `${theme.text}55`,
      fontSize: 13,
      fontFamily: 'MontserratBold',
    },
    notFound: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundText: {
      color: `${theme.text}`,
      fontSize: 14,
      fontFamily: 'MontserratBold',
    },
    headerImage: {
      height: 250,
      width: 250,
      marginBottom: 36,
    },

    containerfirst: {
      backgroundColor: '#000',
      color: '#ffffff',
      height: 260,
      padding: 16,
      borderRadius: 24,
    },
    text: {
      color: theme.text,
      fontSize: 14,
      fontFamily: 'MontserratBold',
    },
    orderView: {
      borderBottomWidth: 1,
      borderColor: `${theme.text}20`,
      marginBottom: 12,
    },
    notificationCircle: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    row: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      padding: 16,
      gap: 24,
      alignItems: 'center',
    },

    rows: {
      flexDirection: 'column',
      marginTop: 12,
      height: '100%',
      justifyContent: 'space-between',

      width: '100%',
    },
    column: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    buttons: {
      borderColor: `${theme.text}`,
      borderWidth: 1,
      width: '46%',
      alignItems: 'center',
      height: 50,
      justifyContent: 'center',
      borderRadius: 12,
    },
    buttonss: {
      width: '46%',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#f1c40f',
      justifyContent: 'center',
      color: '#000',
      borderRadius: 12,
    },
  });

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Wallet History',
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: 'MontserratBold',
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const [walletHistoryy, setWalletHistory] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  console.log(walletBalance, '++++++ƒ');
  const fundWalletResults = useSelector(
    state => state.payment.fundWalletResults,
  );

  const walletHistorys = useSelector(
    state => state.payment.walletHistoryResults,
  );

  const user = useSelector(state => state.auth.user);

  const balance = fundWalletResults?.data?.user?.balance;

  const history = walletHistorys?.data?.walletHistory;

  const fetchWalletBalance = async () => {
    try {
      const result = await dispatch(fundWallet());
      const string = JSON.stringify(result.payload.data);
      const parse = JSON.parse(string);
      console.log(parse?.user?.currency, 'kkk');
      setWalletBalance(parse?.user?.currency);
    } catch (error) {}
  };
  const [error, setError] = useState(null);
  const [errorFetch, setErrorFetch] = useState(null);
  useEffect(() => {
    dispatch(fundWallet());
    fetchWalletBalance();
  }, []);

  const fetchWalletHistory = async () => {
    try {
      const result = await dispatch(walletHistory());
      const string = JSON.stringify(result.payload.data);
      const parse = JSON.parse(string);
      setWalletHistory(parse);
      dispatch(walletHistory());
    } catch (error) {
      setError('Server Downtime, Network Error');
    }
  };

  useEffect(() => {
    fetchWalletHistory();
  }, []);

  const logoImage = require('../../../../assets/QuicklogisticsLogo/Wallet.png');
  const [refreshing, setRefreshing] = useState(false); // Add a refreshing state

  // ... Existing code ...

  // Function to handle the refresh action
  const handleRefresh = async () => {
    setRefreshing(false);
    setRefreshing(false);
  };

  const groupByDate = data => {
    const groupedData = {};
    data?.forEach(item => {
      const date = new Date(item.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  };

  // Group and sort wallet history data
  const groupedWalletHistory = groupByDate(history);
  const sortedDates = Object.keys(groupedWalletHistory).sort(
    (a, b) => new Date(b) - new Date(a),
  );
  // sortedDates.reverse();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to open the modal with the selected item details
  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={{padding: 16}}>
        {errorFetch ? (
          <View
            style={{
              backgroundColor: '#ff000021',
              fontSize: 14,
              alignItems: 'center',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              height: 50,
              justifyContent: 'center',
              marginTop: 48,
              marginBottom: 24,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
                fontSize: 14,
                fontFamily: 'MontserratRegular',
              }}>
              {error}
            </Text>
          </View>
        ) : null}

        {/* <FlatList
          data={sortedDates}
          keyExtractor={(date) => date}
          renderItem={({ item: date }) => (
            <View>
              <Text
                style={{
                  color: `${theme.text}86`,
                  fontSize: 14,
                  fontFamily: "MontserratBold",
                  marginTop: 36,
                  marginBottom: 4,
                }}
              >
                {date}
              </Text>
              {groupedWalletHistory[date].map((item, index) => (
                <WalletSquares
                  key={index}
                  onPress={() => openModal(item)}
                  iconName={item?.fundedAmount ? "credit-card" : "wallet"}
                  ImageBackgroundColor={
                    item?.fundedAmount ? "#f1c40f25" : "#FF5B5B35"
                  }
                  IconColor={item?.fundedAmount ? "#f1c40f" : "#FF5B5B"}
                  WalletStatus={`${
                    item.fundedAmount
                      ? `Wallet Credited with ${
                          item?.fundedCurrency === "USD" ? "$" : "₦"
                        }${item?.fundedAmount?.toLocaleString("en-US")}`
                      : `Wallet Debited with ${
                          item?.fundedCurrency === "USD" ? "$" : "₦"
                        }${item?.debitedAmount?.toLocaleString("en-US")}`
                  }`}
                  WalletDescription={`Your wallet balance is now ${
                    walletBalance === "NGN" ? "₦" : "$"
                  }${item?.amount?.toLocaleString("en-US")}`}
                  WalletPaymentDate={` Payment Date ${
                    new Date(item?.createdAt).toISOString().split("T")[0]
                  }`}
                  isFirst={index === 0}
                  isLast={index === groupedWalletHistory[date].length - 1}
                />
              ))}
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.notFound}>
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>No Transactions Yet</Text>
                </View>
              ) : null}
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        /> */}
        <FlatList
          data={sortedDates}
          keyExtractor={date => date}
          renderItem={({item: date}) => (
            <View>
              <Text
                style={{
                  color: `${theme.text}86`,
                  fontSize: 14,
                  fontFamily: 'MontserratBold',
                  marginTop: 36,
                  marginBottom: 4,
                }}>
                {date}
              </Text>
              {groupedWalletHistory[date].map((item, index) => (
                <WalletSquares
                  key={index}
                  onPress={() => openModal(item)}
                  // iconName={item?.fundedAmount ? 'credit-card' : 'wallet'}
                  // ImageBackgroundColor={
                  //   item?.fundedAmount ? '#f1c40f25' : '#FF5B5B35'
                  // }
                  IconColor={item?.fundedAmount ? '#f1c40f' : '#FF5B5B'}
                  WalletStatus={`${
                    item.fundedAmount
                      ? `Wallet Credited with ${
                          item?.fundedCurrency === 'USD' ? '$' : '₦'
                        }${item?.fundedAmount?.toLocaleString('en-US')}`
                      : `Wallet Debited with ${
                          item?.fundedCurrency === 'USD' ? '$' : '₦'
                        }${item?.debitedAmount?.toLocaleString('en-US')}`
                  }`}
                  WalletDescription={`Your wallet balance is now ${
                    walletBalance === 'NGN' ? '₦' : '$'
                  }${item?.amount?.toLocaleString('en-US')}`}
                  WalletPaymentDate={` Payment Date ${
                    new Date(item?.createdAt).toLocaleString('en-US', {
                      timeZone: 'Africa/Lagos',
                    }) // Use your preferred time zone here
                  }`}
                  isFirst={index === 0}
                  isLast={index === groupedWalletHistory[date].length - 1}
                />
              ))}
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.notFound}>
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>No Transactions Yet</Text>
                </View>
              ) : null}
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContainerView}>
              {selectedItem && (
                <View style={styles.modalContent}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        marginBottom: 16,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'MontserratBold',
                          fontSize: 14,
                        }}>
                        {`${
                          new Date(selectedItem?.createdAt).toLocaleString(
                            'en-US',
                            {
                              timeZone: 'Africa/Lagos',
                            },
                          ) // Use your preferred time zone here
                        }`}
                        {/* {
                          new Date(selectedItem?.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }{" "}
                        -{" "}
                        {
                          new Date(selectedItem?.createdAt)
                            .toISOString()
                            .split("T")[1]
                            .split(".")[0]
                        } */}
                      </Text>
                    </View>
                    <IconSquares
                      // iconName={
                      //   selectedItem?.fundedAmount ? 'credit-card' : 'wallet'
                      // }
                      ImageBackgroundColor={
                        selectedItem?.fundedAmount ? '#000000' : '#FF5B5B'
                      }
                      IconColor={
                        selectedItem?.fundedAmount ? '#f1c40f' : '#ff0000'
                      }
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 36,
                      fontFamily: 'MontserratBold',
                      marginTop: 24,
                      marginBottom: 24,
                    }}>
                    &#8358;
                    {/* { WalletDescription={`Your wallet balance is now ${
                    walletBalance === "NGN" ? "₦" : "$"
                  }} */}
                    {selectedItem.fundedAmount
                      ? `${selectedItem.fundedAmount?.toLocaleString('en-US')}+`
                      : `${selectedItem.debitedAmount?.toLocaleString(
                          'en-US',
                        )}-`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'MontserratBold',
                    }}>
                    {selectedItem.fundedAmount
                      ? `Wallet Credited Successful`
                      : `Wallet Debited Successful`}
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'MontserratRegular',
                      marginTop: 8,
                    }}>
                    Payment Reference: {selectedItem.paymentRefernce}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'MontserratRegular',
                      marginTop: 8,
                    }}>
                    {selectedItem.transactionDescription
                      ? `   Transaction Description: ${selectedItem.transactionDescription}`
                      : null}
                  </Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#000000',
                      height: 55,
                      width: '100%',
                      marginTop: 48,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={closeModal}>
                    <Text
                      style={{
                        color: '#f1c40f',
                        fontSize: 16,
                        fontFamily: 'MontserratBold',
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default WalletHistory;
