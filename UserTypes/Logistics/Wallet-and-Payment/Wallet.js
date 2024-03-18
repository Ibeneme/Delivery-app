import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../Providers/ThemeProvider';
//import Icon from "react-native-vector-icons/FontAwesome";
import {useDispatch, useSelector} from 'react-redux';
import {fundWallet, walletHistory} from '../../../Redux/Payment/Payments';
//mport FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IconSquares from '../../OrdinaryUser/Pages/Extras/Components/IconSquares';
import ArrowRight from '../../OrdinaryUser/Icons/ArrowRight';
import {HistoryIcon} from '../../OrdinaryUser/Icons/AllIcons';

const Wallet = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const maskedBalance = '******';

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = payment => {
    setSelectedItem(payment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    upgradeOption: {
      height: 'auto',
      width: '100%',
      marginTop: 3,
      backgroundColor: '#fff',
      padding: 16,
    },
    upgradeOptionText: {
      fontFamily: 'MontserratBold',
      fontSize: 16,
      color: theme.text,
    },
    upgradeOptionTexts: {
      fontFamily: 'MontserratRegular',
      fontSize: 14,
      color: theme.text,
      marginTop: 4,
    },
    refreshIcon: {
      fontSize: 14,
      color: theme.text,
      marginLeft: 10,
    },
    modalContainer: {
      backgroundColor: '#00000099',
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
      borderRadius: 12,
      backgroundColor: '#000000',
      borderColor: theme.edgeColor,
      borderWidth: 1,
      flex: 1,
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
      borderColor: `#fff`,
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
      title: 'Wallet',
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: 'MontserratBold',
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  //const [walletHistoryy, setWalletHistory] = useState([]);
  const [walletBalance, setWalletBalance] = useState('');
  const fundWalletResults = useSelector(
    state => state.payment.fundWalletResults,
  );

  const walletHistorys = useSelector(
    state => state.payment.walletHistoryResults,
  );
  // const user = useSelector((state) => state.auth.user);

  const balance = fundWalletResults?.data?.user?.balance;

  const curr = fundWalletResults?.data?.user?.currency;
  //console.log(curr, "curr");
  const history = walletHistorys?.data?.walletHistory;

  const fetchWalletBalance = async () => {
    try {
      const result = await dispatch(fundWallet());
      const string = JSON.stringify(result.payload.data);
      const parse = JSON.parse(string);
      setWalletBalance(parse);
    } catch (error) {}
  };
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fundWallet());
    fetchWalletBalance();
  }, [dispatch, balance, history]);

  // const fetchWalletHistory = async () => {
  //   try {
  //     const result = await dispatch(walletHistory());
  //     const string = JSON.stringify(result.payload.data);
  //     const parse = JSON.parse(string);
  //     setWalletHistory(parse);
  //     dispatch(walletHistory());
  //   } catch (error) {
  //     setError("Network Error, Pls try again");
  //   }
  // };

  useEffect(() => {
    dispatch(walletHistory());
  }, []);

  const logoImage = require('../../../assets/QuicklogisticsLogo/Wallet.png');
  const [refreshing, setRefreshing] = useState(false); // Add a refreshing state

  const handleRefresh = async () => {
    setRefreshing(false);
    setRefreshing(false);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [isNextButtonClickable, setIsNextButtonClickable] = useState(false);
  const [modalUpgrade, setModalUpgrade] = useState(false);

  const openModalUpgrade = () => {
    setModalUpgrade(true);
  };

  const closeModalUpgrade = () => {
    setModalUpgrade(false);
  };

  const handleOptionSelect = option => {
    setSelectedOption(option);
    setIsNextButtonClickable(true);
  };

  const handleNextButtonClick = () => {
    if (selectedOption) {
      if (selectedOption === 'premium') {
        const amount = '119';
        setModalUpgrade(false);
        navigation.navigate('subscription', {
          selectedOptions: selectedOption,
          amount: amount,
        });
      } else if (selectedOption === 'basic') {
        const amount = '19';
        setModalUpgrade(false);
        navigation.navigate('subscription', {
          selectedOptions: selectedOption,
          amount: amount,
        });
      } else if (selectedOption === 'essential') {
        const amount = '59';
        setModalUpgrade(false);
        navigation.navigate('subscription', {
          selectedOptions: selectedOption,
          amount: amount,
        });
      }
    }
  };

  return (
    <SafeAreaView
      style={{backgroundColor: theme.backgroundAuth, height: '100%'}}>
      <View
        style={[
          styles.containerfirst,
          {backgroundColor: theme.backgroundAuth},
        ]}>
        <View style={styles.rows}>
          <View style={styles.notificationCircle}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text
                  style={[
                    styles.text,
                    {fontSize: 14, textAlign: 'center', color: '#ffffff'},
                  ]}>
                  Wallet Balance
                </Text>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon
                    name={showPassword ? 'eye-slash' : 'eye'}
                    size={20}
                    color={'#ffffff'}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'baseline',
                }}>
                {/* <TouchableOpacity onPress={fetchWalletHistory}>
                  <FontAwesomeIcon
                    name="refresh" // Replace with the name of your refresh icon
                    style={[styles.refreshIcon, { color: "#ffffff" }]}
                  />
                </TouchableOpacity> */}
                <Text style={[styles.text, {fontSize: 16, color: '#ffffff'}]}>
                  {curr === 'NGN' ? '₦' : null}
                  {curr === 'USD' ? '$' : null}
                  {showPassword
                    ? maskedBalance
                    : `${balance ? balance?.toLocaleString('en-US') : '00.00'}`}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 12,
                  marginTop: 12,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('fund')}
                  style={styles.buttonss}>
                  <Text style={[styles.text, {color: '#000'}]}> Fund</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('withdrawal')}
                  style={styles.buttons}>
                  <Text style={[styles.text, {color: '#ffffff'}]}>
                    {' '}
                    Withdraw
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                padding: 0,
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  height: 'auto',
                  alignItems: 'left',
                  backgroundColor: '#f1c40f',
                  borderRadius: 8,
                  marginTop: 32,
                  flexDirection: 'column',
                  gap: 24,
                  width: '100%',
                }}
                onPress={openModalUpgrade}>
                {/* <View
                  style={{
                    backgroundColor: '#131313',
                    width: 48,
                    height: 48,
                    borderRadius: 338,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 16,
                  }}>
                  <FontAwesomeIcon
                    name="credit-card"
                    style={[{color: '#f1c40f', fontSize: 16}]}
                  />
                </View> */}
                <View>
                  <Text
                    style={{
                      fontFamily: 'MontserratBold',
                      paddingLeft: 16,
                      marginTop: -12,
                      fontSize: 14,
                    }}>
                    Upgrade Wallet
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: 3,
                      paddingRight: 16,
                    }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'MontserratRegular',
                          paddingLeft: 16,
                          marginBottom: 24,
                        }}>
                        Upgrade plan with Wallet Balance
                      </Text>
                    </View>
                    <View>
                      <ArrowRight color="#000000" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 'auto',
                  alignItems: 'left',
                  backgroundColor: theme.backgroundAuth,
                  borderRadius: 8,
                  flexDirection: 'column',
                  gap: 24,
                  marginTop: 12,
                  borderWidth: 2,
                  borderColor: '#f1c40f',
                }}
                onPress={() => navigation.navigate('wallethistory')}>
                <View
                  style={{
                    backgroundColor: '#f1c40f25',
                    width: 48,
                    height: 48,
                    borderRadius: 338,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 16,
                  }}>
                  <HistoryIcon style={[{color: '#f1c40f', fontSize: 20}]} />
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'MontserratBold',
                      paddingLeft: 16,
                      marginTop: -12,
                      fontSize: 14,
                      color: theme.edgeColor,
                    }}>
                    Wallet History
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: 3,
                      paddingRight: 16,
                    }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'MontserratRegular',
                          paddingLeft: 16,
                          marginBottom: 24,
                          color: theme.edgeColor,
                          // border: theme.edgeColor,
                          // borderColor: theme.edgeColor,
                        }}>
                        View your transaction history
                      </Text>
                    </View>
                    <View>
                      <ArrowRight color="#000000" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View
            style={{
              marginTop: 48,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.text, { marginBottom: 16 }]}>
                Transaction History
              </Text>
              <Text
                onPress={() => navigation.navigate("wallethistory")}
                style={[
                  {
                    marginBottom: 16,
                    fontSize: 14,
                    fontFamily: "MontserratRegular",
                    color: `${theme.text}`,
                  },
                ]}
              >
                {history?.length === 0 ? null : "See all"}
              </Text>
            </View>
            <View>
              {history?.length === 0 ? (
                <View style={styles.notFound}>
                  <View
                    style={{
                      height: 50,
                      width: "100%",
                    }}
                  >
                    {error ? (
                      <View
                        style={{
                          backgroundColor: "#ff000021",
                          fontSize: 16,
                          alignItems: "center",
                          paddingLeft: 24,
                          paddingRight: 24,
                          paddingTop: 12,
                          paddingBottom: 12,
                          height: 50,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "red",
                            fontSize: 16,
                            fontFamily: "MontserratRegular",
                          }}
                        >
                          Error Fetching Transactions Yet
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: "#f1c40f21",
                          fontSize: 16,
                          alignItems: "center",
                          paddingLeft: 24,
                          paddingRight: 24,
                          paddingTop: 12,
                          paddingBottom: 12,
                          height: 50,
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#f1c40f",
                            fontSize: 16,
                            fontFamily: "MontserratRegular",
                          }}
                        >
                          No Transactions Yet
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ) : (
                history
                  ?.slice(0, -1)
                  .map((payment, index) => (
                    <WalletSquares
                      key={index}
                      onPress={() => openModal(payment)}
                      iconName={
                        payment?.fundedAmount ? "credit-card" : "wallet"
                      }
                      ImageBackgroundColor={
                        payment?.fundedAmount ? "#f1c40f25" : "#FF5B5B35"
                      }
                      IconColor={payment?.fundedAmount ? "#f1c40f" : "#FF5B5B"}
                      WalletStatus={`${
                        payment.fundedAmount
                          ? `Wallet Credited`
                          : `Wallet Debited`
                      }`}
                      WalletDescription={`Your wallet balance is now  ${payment?.amount.toLocaleString(
                        "en-US"
                      )}`}
                      WalletPaymentDate={` Payment Date ${
                        new Date(payment?.createdAt).toISOString().split("T")[0]
                      }`}
                      isFirst={index === 0}
                      isLast={index === history.length - 1}
                    />
                  ))
              )}
            </View>
          </View> */}
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
                          fontSize: 16,
                        }}>
                        {
                          new Date(selectedItem?.createdAt)
                            .toISOString()
                            .split('T')[0]
                        }{' '}
                        -{' '}
                        {
                          new Date(selectedItem?.createdAt)
                            .toISOString()
                            .split('T')[1]
                            .split('.')[0]
                        }
                      </Text>
                    </View>
                    <IconSquares
                      // iconName={
                      //   selectedItem?.fundedAmount ? 'credit-card' : 'wallet'
                      // }
                      ImageBackgroundColor={
                        selectedItem?.fundedAmount ? '#000000' : '#FF5B5B85'
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
                    Transaction Description:{' '}
                    {selectedItem.transactionDescription}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUpgrade}
          onRequestClose={closeModalUpgrade}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContainerView,
                {
                  height: 500,
                  width: '100%',
                  backgroundColor: theme.background,
                },
              ]}>
              <View style={[styles.modalContent, {width: '100%'}]}>
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}
                    onPress={closeModalUpgrade}>
                    <Text
                      style={{
                        fontFamily: 'MontserratBold',
                        fontSize: 20,
                        marginBottom: 24,
                        gap: 12,
                        color: theme.text,
                      }}>
                      Select a Plan
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'MontserratBold',
                        fontSize: 14,
                        marginBottom: 24,
                        gap: 12,
                        color: theme.text,
                      }}
                      onPress={closeModalUpgrade}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect('basic')}
                    style={[
                      styles.upgradeOption,
                      {
                        borderColor:
                          selectedOption === 'basic'
                            ? '#f1c40f'
                            : 'transparent',
                        backgroundColor:
                          selectedOption === 'basic'
                            ? '#000000'
                            : 'transparent',
                        borderRadius: 8,
                        borderWidth: 3,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.upgradeOptionText,
                        {
                          color:
                            selectedOption === 'basic'
                              ? 'white'
                              : `${theme.text}`,
                        },
                      ]}>
                      Basic
                    </Text>
                    <Text
                      style={[
                        styles.upgradeOptionTexts,
                        {
                          color:
                            selectedOption === 'basic'
                              ? 'white'
                              : `${theme.text}`,
                        },
                      ]}>
                      $19 Monthly
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect('essential')}
                    style={[
                      styles.upgradeOption,
                      {
                        borderColor:
                          selectedOption === 'essential'
                            ? '#f1c40f'
                            : 'transparent',
                        backgroundColor:
                          selectedOption === 'essential'
                            ? '#000000'
                            : 'transparent',
                        borderRadius: 8,
                        borderWidth: 3,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.upgradeOptionText,
                        {
                          color:
                            selectedOption === 'essential'
                              ? 'white'
                              : `${theme.text}`,
                        },
                      ]}>
                      Essential
                    </Text>
                    <Text
                      style={[
                        styles.upgradeOptionTexts,
                        {
                          color:
                            selectedOption === 'essential'
                              ? 'white'
                              : `${theme.text}`,
                        },
                      ]}>
                      $59 Monthly
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect('premium')}
                    style={[
                      styles.upgradeOption,
                      {
                        borderColor:
                          selectedOption === 'premium'
                            ? '#f1c40f'
                            : 'transparent',
                        backgroundColor:
                          selectedOption === 'premium'
                            ? '#000000'
                            : 'transparent',
                        borderRadius: 8,
                        borderWidth: 3,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.upgradeOptionText,
                        {
                          color:
                            selectedOption === 'premium'
                              ? 'white'
                              : `${theme.text}`,
                        },
                      ]}>
                      Premium
                    </Text>
                    <Text
                      style={[
                        styles.upgradeOptionTexts,
                        {
                          color:
                            selectedOption === 'premium'
                              ? 'white'
                              : `${theme.text}`,
                        },
                      ]}>
                      $119 Monthly
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    {
                      backgroundColor: isNextButtonClickable
                        ? '#f1c40f'
                        : 'transparent',
                      height: 55,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      marginTop: 36,
                      marginBottom: 24,
                    },
                  ]}
                  onPress={handleNextButtonClick}
                  disabled={!isNextButtonClickable}>
                  <Text
                    style={{
                      color: isNextButtonClickable ? '#000000' : 'transparent',
                      fontSize: 16,
                      fontFamily: 'MontserratBold',
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
