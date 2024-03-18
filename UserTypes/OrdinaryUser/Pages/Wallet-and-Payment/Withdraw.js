import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../Providers/ThemeProvider';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { ListItem } from "react-native-elements";
import {Dropdown} from 'react-native-element-dropdown';
import {fetchSelectedBank} from '../../../../Redux/Payment/Bank';
import {initializeWithdrawal} from '../../../../Redux/Payment/Withdrawal';
import {ArrowDownIcon} from '../../Icons/AllIcons';

const Withdrawal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState(null);
  const [amount, setAmount] = useState('');
  const [userAccountNumber, setTransactionDescription] = useState('');
  const [amountError, setAmountError] = useState('');
  const [userAccountNumberError, setTransactionDescriptionError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDescription = description => {
    setDescriptionErr('');
    setDescription(description);
    if (description.length < 5) {
      setDescriptionErr('Transaction Description should be above 5 letters');
    } else {
      setDescriptionErr('');
      setDescription(description);
    }
  };
  const handleAmountChnage = amount => {
    setError('');
    setAmountError('');

    // Convert input to a number
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      // Handle non-numeric input
      setAmount('');
    } else if (numericAmount < 10) {
      // Handle amount less than 10
      setAmount(numericAmount.toString());
      setAmountError('Minimum amount is 10');
    } else {
      // Set the valid amount
      setAmount(numericAmount.toString());
    }
  };

  // const handleAccountNumber = (accnumber) => {
  //   setError("");
  //   setAmountError("");
  //   const numericAmount = parseFloat(accnumber);

  //   if (isNaN(numericAmount)) {
  //     setAmount("");
  //   } else if (numericAmount < 10) {
  //     setAmount(numericAmount.toString());
  //     setAmountError("Minimum accnumber is 10");
  //   } else {
  //     setAmount(numericAmount.toString());
  //   }
  // };

  const handleInitializePayment = () => {
    setLoading(true);
    if (userAccountNumber.length !== 10) {
    } else {
      setTransactionDescriptionError('');
    }

    if (parseInt(amount) < 10) {
      setAmountError('Minimum amount is 10');
    } else {
      setAmountError('');
    }

    if (userAccountNumber.length === 10 && parseInt(amount) >= 10) {
      if (currency == '') {
        alert('Choose a Currency');
      } else {
        const paymentData = {
          amount: amount,
          currency: currency,
          userAccountNumber: userAccountNumber,
          bankCode: selectedBankCode,
          transactionDescription: description,
        };
        dispatch(initializeWithdrawal(paymentData))
          .then(response => {
            setLoading(false);
            console.log(response, 'fff');
            if (response?.payload?.message === 'withdrawal successful') {
              navigation.navigate('SuccessPage');
              console.log(response, 'response');
            } else {
              navigation.navigate('ErrorPage');
              console.log(error, 'error');
            }
          })
          .catch(error => {
            console.log(error, 'errr');
            navigation.navigate('ErrorPage');
          });
      }
    }
  };

  const handleTransactionDescription = userAccountNumber => {
    setError('');
    setTransactionDescriptionError('');
    const numericDescription = userAccountNumber.replace(/[^0-9]/g, '');
    if (numericDescription.length < 10) {
      setTransactionDescription(numericDescription);
      setTransactionDescriptionError('Account Numbers are 10 digits long');
    } else {
      setTransactionDescription(numericDescription);
    }
  };

  const {theme} = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBankCode, setSelectBankCode] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleItemSelect = item => {
    setSelectBankCode(item?.bankCode);
    setSelectedItem(item);
    setIsModalVisible(false);
  };

  const closeButton = () => {
    setIsModalVisible(false);
  };

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState('');

  const handleSearch = text => {
    const filtered = data?.filter(item =>
      item.bankName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredItems(filtered);
  };

  const [data, setServerData] = useState('');
  const items = useSelector(
    state => state?.banks?.selectedBank?.data?.bankAndCode,
  );

  const banksError = useSelector(state => state?.error);
  const [responseData, setResponseData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchSelectedBank());

        (newData = response?.payload?.data?.bankAndCode),
          setResponseData(newData);
        setServerData(newData);
      } catch (error) {}
    };

    fetchData();
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle,
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const styles = StyleSheet.create({
    dropdown: {
      height: 55,
      borderColor: `${theme.text}65`,
      borderWidth: 0.5,
      borderRadius: 4,
      paddingHorizontal: 8,
      marginTop: 8,
      marginBottom: 24,
      backgroundColor: theme.backgroundAuth,
    },
    placeholderStyle: {
      fontSize: 14,
      color: `${theme.text}65`,
      fontFamily: 'MontserratRegular',
    },
    selectedTextStyle: {
      fontSize: 14,
      color: `${theme.text}`,
      fontFamily: 'MontserratRegular',
    },
    selectedStyle: {
      backgroundColor: theme.backgroundAuth,
    },

    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontFamily: 'MontserratRegular',
      fontSize: 16,
      height: 50,
      marginTop: 4,
      width: '100%',
    },
    inputs: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontFamily: 'MontserratRegular',
      fontSize: 14,
      height: 50,
      marginTop: 8,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    errorText: {
      color: '#ff0650',
      marginTop: 4,
      fontSize: 14,
      fontFamily: 'MontserratRegular',
    },
    forgotTransactionDescription: {
      color: theme.text,
      marginTop: -12,
      fontSize: 14,
      textAlign: 'right',
      fontFamily: 'MontserratRegular',
    },
    viewbox: {
      marginTop: 32,
    },
    userAccountNumbertext: {
      textAlign: 'right',
      marginTop: 12,
      color: theme.text,
      fontFamily: 'MontserratRegular',
      fontSize: 14,
    },

    buttonClickLoading: {
      backgroundColor: '#f1c40f45',
      width: '100%',
      height: 50,
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userAccountNumberInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
    },
    userAccountNumberVisibilityIcon: {
      position: 'absolute',
      bottom: '10%',
      right: 0,
      padding: 10,
      color: theme.text,
      fontFamily: 'MontserratRegular',
    },
    containerfirst: {
      color: '#ffffff',
      height: '100%',
      padding: 16,
    },
    containerModal: {
      color: '#ffffff',
      height: '100%',
      paddingTop: 40,
      paddingLeft: 12,
      paddingRight: 12,
      backgroundColor: `${theme.backgroundAuth}`,
    },
    container: {
      color: '#ffffff',
      height: '100%',

      backgroundColor: `${theme.backgroundAuth}`,
    },
    text: {
      color: theme.text,
      marginTop: 4,
      fontFamily: 'MontserratRegular',
      fontSize: 14,
    },
    textBold: {
      color: `${theme.text}`,
      fontFamily: 'MontserratBold',
      fontSize: 16,
      marginBottom: 24,
    },
    textSpan: {
      color: '#f1c40f',
      fontFamily: 'MontserratRegular',
      fontSize: 14,
      paddingLeft: 8,
    },
    viewForInputs: {
      marginTop: 48,
      justifyContent: 'space-between',
      gap: 24,
      marginBottom: 72,
    },
    closeButton: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    closeButtonText: {
      color: `${theme.text}`,
      fontFamily: 'MontserratBold',
    },
    itemContainer: {
      padding: 18,
      backgroundColor: `${theme.backgroundAuth}`,
      borderWidth: 1,
      borderColor: `${theme.text}40`,
      borderRadius: 4,
    },
    selectButtonText: {
      color: `${theme.text}`,
      fontFamily: 'MontserratRegular',
      fontSize: 14,
    },
    viewInput: {
      padding: 12,

      marginTop: 48,
    },
    buttonClick: {
      backgroundColor: '#f1c40f',
      width: '100%',
      height: 50,
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
    fontFamily: 'MontserratBold',
  };

  const headerTintColor = theme.text;

  const currencyData = [
    {label: 'NGN', value: 'NGN'},
    {label: 'USD', value: 'USD'},
  ];
  const [currency, setCurrency] = useState('');

  const handleCurrency = currency => {
    if (currency === '') {
      //setErrorCurrency("Choose a Currency");
    } else {
      setCurrency(currency?.value);
      console.log(currency?.value, 'currency');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{backgroundColor: theme.backgroundAuth}}>
        <View>
          <View style={[styles.viewInput]}>
            <Text style={styles.textBold}>Withdraw from Wallet</Text>
            <View>
              <Text style={styles.text}>Select a Bank</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={[styles.inputs]}>
                <Text style={styles.text}>
                  {selectedItem?.bankName
                    ? selectedItem.bankName
                    : 'Select a Bank'}
                </Text>

                <ArrowDownIcon color={theme.text} width={24} height={24} />

                {/* 
                <Icon
                  name="angle-down"
                  size={20}
                  color={theme.text}
                  style={styles.arrowIcon}
                /> */}
              </TouchableOpacity>
            </View>

            <View style={styles.viewbox}>
              <Text style={styles.text}>Enter an Amount</Text>
              <TextInput
                style={[
                  styles.input,
                  amountError && {borderColor: 'red'},
                  focusedInput === 'amount' && {borderColor: '#f1c40f'},
                ]}
                onFocus={() => setFocusedInput('amount')}
                onBlur={() => setFocusedInput(null)}
                value={amount}
                onChangeText={handleAmountChnage}
                placeholder="Enter an Amount"
                keyboardType="numeric"
                placeholderTextColor={`${theme.text}60`}
              />
              {amountError ? (
                <Text style={styles.errorText}>{amountError}</Text>
              ) : null}
            </View>
            <View
              style={{
                color: theme.text,
                fontFamily: 'MontserratRegular',
                fontSize: 14,
                marginTop: 36,
                marginBottom: -22,
              }}>
              <Text
                style={{
                  color: theme.text,
                  fontFamily: 'MontserratRegular',
                  fontSize: 14,
                  // marginTop: 16,
                }}>
                Choose a Currency
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={{
                  display: 'none',
                }}
                iconStyle={styles.iconStyle}
                itemTextStyle={{
                  fontSize: 14,
                  color: `${theme.text}`,
                  fontFamily: 'MontserratRegular',
                }}
                itemContainerStyle={{
                  backgroundColor: theme.backgroundAuth,
                }}
                data={currencyData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select a Currency"
                searchPlaceholder="Search..."
                value={currency}
                onChange={handleCurrency}
              />
            </View>

            <View style={styles.viewbox}>
              <Text style={styles.text}>Account Number</Text>
              <View style={styles.userAccountNumberInputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    userAccountNumberError && {borderColor: 'red'},
                    focusedInput === 'userAccountNumber' && {
                      borderColor: '#f1c40f',
                    },
                  ]}
                  value={userAccountNumber}
                  onChangeText={handleTransactionDescription}
                  placeholder="Enter your account Number"
                  onFocus={() => setFocusedInput('userAccountNumber')}
                  onBlur={() => setFocusedInput(null)}
                  placeholderTextColor={`${theme.text}60`}
                  secureTextEntry={false} // Set this to false
                  keyboardType="numeric"
                />
              </View>

              {userAccountNumberError ? (
                <Text style={styles.errorText}>{userAccountNumberError}</Text>
              ) : null}
            </View>
            <View style={styles.viewbox}>
              <Text style={styles.text}>Transaction Description</Text>
              <View style={styles.userAccountNumberInputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    descriptionErr && {borderColor: 'red'},
                    focusedInput === 'description' && {
                      borderColor: '#f1c40f',
                    },
                  ]}
                  value={description}
                  onChangeText={handleDescription}
                  placeholder="Enter your description"
                  onFocus={() => setFocusedInput('description')}
                  onBlur={() => setFocusedInput(null)}
                  placeholderTextColor={`${theme.text}60`}
                  secureTextEntry={false} // Set this to false
                  keyboardType="numeric"
                />
              </View>

              {descriptionErr ? (
                <Text style={styles.errorText}>{descriptionErr}</Text>
              ) : null}
            </View>
          </View>

          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setIsModalVisible(false)}>
            <SafeAreaView style={styles.container}>
              <View style={styles.containerModal}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeButton}>
                  <Text style={[styles.closeButtonText, {marginBottom: 16}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <View>
                  <TextInput
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      marginBottom: 10,
                      color: `${theme.text}`,
                      padding: 12,
                      height: 50,
                      fontFamily: 'MontserratBold',
                    }}
                    placeholder="Search for bank"
                    placeholderTextColor={`${theme.text}50`}
                    onChangeText={text => {
                      setSearchText(text);
                      handleSearch(text);
                    }}
                    value={searchText}
                  />
                  <FlatList
                    data={filteredItems}
                    keyExtractor={item => item.bankCode}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => handleItemSelect(item)}>
                        <Text>{item.bankName}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Modal>
          <View
            style={{
              padding: 12,
              marginTop: 48,
            }}>
            <TouchableOpacity
              style={styles.buttonClick}
              onPress={handleInitializePayment}>
              <Text style={[styles.buttonText, {fontFamily: 'MontserratBold'}]}>
                {loading ? <ActivityIndicator color="#000" /> : 'Proceed'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Withdrawal;
