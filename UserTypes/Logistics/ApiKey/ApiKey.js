import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../Providers/ThemeProvider';
import {useSelector, useDispatch} from 'react-redux';
import {receiveApiKey} from '../../../Redux/Users/ApiKey';
//import {FontAwesome5} from 'react-native-vector-icons';
import {generateApiKey} from '../../../Redux/Users/Test';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HistoryIcon} from '../../OrdinaryUser/Icons/AllIcons';
//import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const ApiKey = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  const [isApiKeyVisible, setApiKeyVisible] = useState(true);
  const profileData = useSelector(state => state.auth.user);
  const logisticsUserId = profileData?.logisticUserId;
  const dispatch = useDispatch();

  const toggleApiKeyVisibility = () => {
    setApiKeyVisible(!isApiKeyVisible);
  };

  const styles = StyleSheet.create({
    containerfirst: {
      backgroundColor: '#000',
      color: '#ffffff',
      height: '100%',
      padding: 16,
      marginTop: 24,
    },
    text: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'MontserratBold',
    },
    orderView: {
      borderBottomWidth: 0,
      borderColor: `${theme.text}20`,
      marginBottom: 12,
    },
    grayed: {
      backgroundColor: theme.views,
      borderRadius: 12,
      height: 'auto',
      padding: 16,
      marginTop: -12,
      paddingBottom: 48,
    },
    Nextgrayed: {
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      paddingBottom: 12,
      borderBottomColor: `${theme.text}50`,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontSize: 13,
      height: 50,
      marginTop: 24,
      width: '100%',
      fontFamily: 'MontserratRegular',
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
    keyb: {
      flex: 1,
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
      title: 'Api Key',
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: 'MontserratBold',
        fontSize: 14,
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const handleUpdate = () => {
    setLoading(false);
    setSuccess('');

    if (fullName.length < 3) {
      setSuccess('Enter Api Secret Key!!');
      setLoading(true);
    } else {
      dispatch(
        receiveApiKey({
          logisticsCompanyId: profileData?.logisticUserId,
          receivedSecretKey: fullName,
          receivedAccessKey: phoneNumber,
          receivedApiKey: address,
        }),
      )
        .then(async response => {
          setLoading(false);
          if (response?.type === 'api/receiveApiKey/fulfilled') {
            setSuccess('Api Key Sent Succesfully');
          } else {
            setSuccess('Error Occurred');
          }
        })
        .catch(error => {
          setLoading(false);
        });
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setSuccessNext('');
    const token = await AsyncStorage.getItem('accessToken');

    const logisticsId = logisticsUserId;
    try {
      const response = await dispatch(generateApiKey(logisticsId));
      setIsLoading(false);
      setGenerateKey(response?.payload?.data?.apiKey);
    } catch (error) {}
  };

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [generateKey, setGenerateKey] = useState('Generate your Api Key');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [successNext, setSuccessNext] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChangeFullName = newFullName => {
    setSuccess('');
    const formattedFullName =
      newFullName?.charAt(0).toUpperCase() +
      newFullName?.slice(1).toLowerCase();
    setFullName(formattedFullName);
    setNameErr('Input is needed');
  };

  const handleChangeAddress = newAddress => {
    setSuccess('');
    const formattedAddress =
      newAddress?.charAt(0).toUpperCase() + newAddress?.slice(1).toLowerCase();
    setAddress(formattedAddress);
    setAddressErr('Input is needed');
  };

  const handleChangePhoneNumber = newPhoneNumber => {
    setSuccess('');
    //console.log(newPhoneNumber, "ssssss");
    setPhoneNumber(newPhoneNumber);
  };

  const handleChangeLocation = location => {
    setSuccess('');
    setSuccessNext('');
    //console.log(location, "location");
    setPhoneNumber(location);
  };

  return (
    <KeyboardAvoidingView enabled={true} style={styles.keyb}>
      <SafeAreaView style={{backgroundColor: theme.background, height: '100%'}}>
        <ScrollView style={{backgroundColor: theme.background}}>
          <View
            style={[
              styles.containerfirst,
              {backgroundColor: theme.background},
            ]}>
            <TouchableOpacity
              style={{
                height: 'auto',
                alignItems: 'left',
                backgroundColor: '#f1c40f',
                borderRadius: 8,
                marginBottom: 48,
                flexDirection: 'column',
                gap: 24,
                width: '100%',
              }}
              onPress={() => navigation.navigate('apikeyhistory')}>
              <View
                style={{
                  backgroundColor: '#131313',
                  width: 48,
                  height: 48,
                  borderRadius: 338,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 16,
                }}>
                <HistoryIcon color="#f1c40f" />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'MontserratBold',
                    paddingLeft: 16,
                    marginTop: -12,
                    fontSize: 16,
                  }}>
                  Api Key History
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
                      View your Api Key History
                    </Text>
                  </View>
                  <View>
                    <FontAwesomeIcon
                      name="arrow-right"
                      style={[{color: '#000000', fontSize: 14}]}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.orderView}>
              <View style={styles.grayed}>
                <View
                  style={[
                    styles.Nextgrayed,
                    {flexDirection: 'column', alignItems: 'flex-start'},
                  ]}>
                  <Text style={[styles.text, {fontSize: 16, marginTop: 8}]}>
                    Api Keys
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 13,
                        marginTop: 8,
                        fontFamily: 'MontserratRegular',
                      },
                    ]}>
                    Activate Quicklogistics hub for your business
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={toggleApiKeyVisibility}
                    style={{
                      position: 'absolute',
                      top: 40,
                      right: 10,
                      zIndex: 2,
                    }}>
                    <TouchableOpacity>
                      {isApiKeyVisible ? (
                        <CloseEyeIcon
                          color={theme.text}
                          width={20}
                          height={20}
                        />
                      ) : (
                        <EyeIcon color={theme.text} width={20} height={20} />
                      )}
                    </TouchableOpacity>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeFullName}
                    placeholder={'Enter your Api Secret Key'}
                    placeholderTextColor={`${theme.text}65`}
                    secureTextEntry={!isApiKeyVisible} // Hide text if isApiKeyVisible is false
                  />
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangePhoneNumber}
                    placeholder={'Enter your Api Access Key'}
                    placeholderTextColor={`${theme.text}65`}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeAddress}
                    placeholder={'Enter your Api Key'}
                    placeholderTextColor={`${theme.text}65`}
                  />
                </View>

                <View
                  style={{
                    marginTop: 24,
                    marginBottom: -12,
                  }}>
                  <TouchableOpacity
                    onPress={handleUpdate}
                    style={styles.buttonClick}>
                    <Text
                      style={{
                        fontFamily: 'MontserratBold',
                      }}>
                      {loading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        'Send Api Key'
                      )}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: `${theme.text}`,
                      fontSize: 13,
                      fontFamily: 'MontserratRegular',
                      marginTop: 24,
                    }}>
                    {success}
                  </Text>
                </View>
              </View>

              <View style={[styles.grayed, {marginTop: 24}]}>
                <View style={[styles.Nextgrayed]}>
                  <Text style={[styles.text, {fontSize: 16, marginTop: 8}]}>
                    Generate API Key
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChangeLocation}
                    placeholder={generateKey}
                    placeholderTextColor={`${theme.text}90`}
                    value={generateKey}
                  />
                  {/* <TouchableOpacity style={styles.copyButton}>
                    <Text style={styles.copyButtonText}>
                      {copied ? "Copied! Api Key" : "Click to Copy Key"}
                    </Text>
                  </TouchableOpacity> */}
                </View>

                <View
                  style={{
                    marginTop: 24,
                    marginBottom: -12,
                  }}>
                  <TouchableOpacity
                    onPress={handleGenerate}
                    style={styles.buttonClick}>
                    <Text
                      style={{
                        fontFamily: 'MontserratBold',
                      }}>
                      {isLoading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        'Generate Api Key'
                      )}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: `${theme.text}`,
                      fontSize: 13,
                      fontFamily: 'MontserratRegular',
                      marginTop: 24,
                    }}>
                    {successNext}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ApiKey;
