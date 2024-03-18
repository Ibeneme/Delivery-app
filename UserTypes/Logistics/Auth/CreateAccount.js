import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../Providers/ThemeProvider';
//import Icon from "react-native-vector-icons/FontAwesome";
import {useDispatch} from 'react-redux';
import {
  googleRegistrationLogistics,
  registerLogistics,
} from '../../../Redux/Auth/Auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLocalization} from '../../OrdinaryUser/Pages/Localization/LocalizationContext';
import i18n from '../../OrdinaryUser/Pages/Localization/i18n';
// import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {androidClientId, iosClientId} from '../../../Redux/BaseUrl/Baseurl';
import {CloseEyeIcon, EyeIcon} from '../../OrdinaryUser/Icons/AllIcons';

const LogisticsCreateAccount = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [logisticsName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [logisticsNameError, setFullNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId: androidClientId,
  //   iosClientId: iosClientId,
  // });

  // useEffect(() => {
  //   handleEffect();
  // }, [response, token]);

  // async function handleEffect() {
  //   const user = await getLocalUser();
  //   console.log("user", user);
  //   if (!user) {
  //     if (response?.type === "success") {
  //       getUserInfo(response.authentication.accessToken);
  //     }
  //   } else {
  //     setUserInfo(user);
  //     console.log("loaded locally");
  //   }
  // }

  // const getLocalUser = async () => {
  //   const data = await AsyncStorage.getItem("@user");
  //   if (!data) return null;
  //   return JSON.parse(data);
  // };

  // const getUserInfo = async (token) => {
  //   setError("");
  //   if (!token) return;
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const user = await response.json();
  //     console.log(user, "hshshshshs");

  //     if (user) {
  //       const { email, name } = user;

  //       const userData = {
  //         email: 'esssssfe@email',
  //         fullName: name,
  //         userType: "Logistics",
  //       };
  //       console.log(userData, "hshshshshs");
  //       try {
  //         dispatch(googleRegistrationLogistics(userData))
  //           .then((response) => {
  //             console.log("Success:", JSON.stringify(response, null, 3));
  //             if (
  //               response?.payload?.error ===
  //               "Request failed with status code 409"
  //             ) {
  //               setError("A user with this email already exists.");
  //             }
  //           })
  //           .catch((error) => {
  //             console.log("error:", JSON.stringify(error, null, 3));
  //             if (error?.message === "Invalid token specified") {
  //               setError("A user with this email already exists.");
  //             }
  //           });
  //       } catch (error) {
  //         console.log("Error:", error);
  //       }
  //     }
  //   } catch (error) {
  //     // Add your own error handler here
  //   }
  // };

  const handleEmailChange = email => {
    setError('');
    setEmailError('');
    const formattedEmail = email
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setEmail(formattedEmail);
  };

  const handleAddressChange = address => {
    setError('');
    setAddressError('');
    const formattedAddressl = address
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setAddress(formattedAddressl);
  };

  const handleNameChange = logisticsName => {
    setError('');
    setFullNameError('');
    const formattedName = logisticsName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setFullName(formattedName);
    //console.log(formattedName, "logis");
  };

  const handlePhoneNumberChange = phoneNumber => {
    setError('');
    setPhoneNumberError('');
    setPhoneNumber(phoneNumber);
    //console.log(phoneNumber);
  };
  const handlePasswordChange = password => {
    setError('');
    setPasswordError('');
    setPassword(password);
    //console.log(password);
  };

  const dispatch = useDispatch();

  const handleRegister = () => {
    const userData = {
      email,
      logisticsName,
      phoneNumber,
      password,
      userType: 'Logistics',
      address,
    };
    setLoading(true);
    dispatch(registerLogistics(userData))
      .then(response => {
        setLoading(false);
        //console.log(response.payload);
        if (
          response.payload.message ===
          `Please check your mail to verify your account.`
        ) {
          //setToastShown();
          navigation.navigate('Success-forgot');
          setPasswordError('Enter a Password');
        } else if (
          response.payload.error === `"password" is not allowed to be empty`
        ) {
          setPasswordError('Enter a Password');
        } else if (
          response.payload.error ===
          `Password should be at least 6 characters long`
        ) {
          setPasswordError('Password should be at least 6 characters long');
        } else if (
          response.payload.error === `"email" is not allowed to be empty`
        ) {
          setEmailError(`Email is not allowed to be empty`);
        } else if (response.payload.error === `Invalid email`) {
          //setEmailError(`Email not Incorrect`);
          setEmailError(`Email is not correct`);
        } else if (
          response.payload.error ===
          `"logisticsName" is not allowed to be empty`
        ) {
          setFullNameError(`Enter your Logistics Name`);
        } else if (response.payload.error === `"basePrice" is not allowed`) {
          setbasePriceError(`Enter your Least Charge per delivery`);
        } else if (response.payload.error === `"basePrice" is ot allowed`) {
          setpickupDurationError(`Enter your Least Charge per delivery`);
        } else if (
          response.payload.error ===
          `Full name should contain both first name and last name`
        ) {
          setFullNameError(`Enter your First and Last Names`);
        } else if (response.payload.error === `User already registered`) {
          setError('User already registered');
        } else if (response.payload.error === `User Exist`) {
          setError('User Exist');
        }
      })
      .catch(error => {
        //console.log("Registration error:", error);
      });
  };

  const {theme} = useTheme();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontSize: 17,
      fontFamily: 'MontserratRegular',
      height: 55,
      marginTop: 4,
      width: '100%',
    },

    errorText: {
      color: '#ff0650',
      marginTop: 4,
      fontSize: 14,
      fontFamily: 'MontserratRegular',
    },
    passwordtext: {
      textAlign: 'right',
      marginTop: 12,
      color: theme.text,
      fontSize: 14,
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
      marginBottom: 16,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      color: theme.text,
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
    passwordVisibilityIcon: {
      position: 'absolute',
      bottom: '10%',
      right: 0,
      padding: 10,
      color: theme.text,
    },
    containerfirst: {
      color: '#ffffff',
      paddingLeft: 16,
      paddingRight: 16,
      margin: 0,
    },
    text: {
      color: theme.text,
      marginTop: 4,
      fontSize: 14,
      fontFamily: 'MontserratRegular',
    },
    textBold: {
      color: '#f1c40f',
      fontSize: 24,
      marginTop: 48,
      fontFamily: 'MontserratBold',
    },
    textSpan: {
      color: '#f1c40f',
      fontSize: 14,
      fontFamily: 'MontserratRegular',
      paddingLeft: 8,
    },
    viewForInputs: {
      marginTop: 48,
      justifyContent: 'space-between',
      gap: 24,
      marginBottom: 48,
    },
    buttonText: {
      fontFamily: 'MontserratBold',
    },
    container: {
      color: '#ffffff',
      height: '100%',

      backgroundColor: `${theme.background}`,
    },

    buttonClicks: {
      borderColor: theme.text,
      borderWidth: 1,
      width: '100%',
      height: 55,
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 72,
      flexDirection: 'row',
      gap: 12,
    },
    image: {
      width: 28,
      height: 28,
    },
  });
  const GooglePng = require('../../../assets/Flags/Googlepng.png');
  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
    borderWidth: 0,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderWidth: 0,
    fontSize: 14,
    fontFamily: 'MontserratBold',
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle,
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const {locale, changeLanguage} = useLocalization();

  const t = key => i18n.t(key); // Define the translation function

  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundAuth}}>
      <ScrollView
        style={[
          styles.containerfirst,
          {backgroundColor: theme.backgroundAuth, paddingBottom: 256},
        ]}>
        <View>
          <View>
            <Text style={styles.textBold}>{i18n.t('welcome')}</Text>
            <Text style={styles.text}>
              {i18n.t('alreadyHave')}{' '}
              <Text onPress={navigateToLogin} style={styles.textSpan}>
                {i18n.t('Login')}
              </Text>
            </Text>
          </View>

          <View style={styles.viewForInputs}>
            {error ? (
              <Text
                style={[
                  styles.errorText,
                  {backgroundColor: '#ff000025', padding: 12},
                ]}>
                {error}
              </Text>
            ) : null}
            <View>
              <Text style={styles.text}> {i18n.t('logistics')}</Text>
              <TextInput
                style={[
                  styles.input,
                  logisticsNameError && {borderColor: 'red'},
                  focusedInput === 'logisticsName' && {
                    borderColor: '#f1c40f',
                  },
                ]}
                onFocus={() => setFocusedInput('logisticsName')}
                onBlur={() => setFocusedInput(null)}
                value={logisticsName}
                onChangeText={handleNameChange}
                placeholder={i18n.t('logPlaceholder')}
                placeholderTextColor={`${theme.text}60`}
              />
              {logisticsNameError ? (
                <Text style={styles.errorText}>{logisticsNameError}</Text>
              ) : null}
            </View>
            <View>
              <Text style={styles.text}>{i18n.t('email')}</Text>
              <TextInput
                style={[
                  styles.input,
                  emailError && {borderColor: 'red'},
                  focusedInput === 'email' && {borderColor: '#f1c40f'},
                ]}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                value={email}
                onChangeText={handleEmailChange}
                placeholder={i18n.t('emailPlaceholder')}
                placeholderTextColor={`${theme.text}60`}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>
            <View>
              <Text style={styles.text}>{i18n.t('phone')}</Text>
              <TextInput
                style={[
                  styles.input,
                  phoneNumberError && {borderColor: 'red'},
                  focusedInput === 'phoneNumber' && {
                    borderColor: '#f1c40f',
                  },
                ]}
                onFocus={() => setFocusedInput('phoneNumber')}
                onBlur={() => setFocusedInput(null)}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                placeholder={i18n.t('phonePlaceholder')}
                placeholderTextColor={`${theme.text}60`}
              />
              {phoneNumberError ? (
                <Text style={styles.errorText}>{phoneNumberError}</Text>
              ) : null}
            </View>

            <View>
              <Text style={styles.text}>Address</Text>
              <TextInput
                style={[
                  styles.input,
                  addressError && {borderColor: 'red'},
                  focusedInput === 'address' && {
                    borderColor: '#f1c40f',
                  },
                ]}
                onFocus={() => setFocusedInput('address')}
                onBlur={() => setFocusedInput(null)}
                value={address}
                onChangeText={handleAddressChange}
                placeholder={i18n.t('addressPlaceholder')}
                placeholderTextColor={`${theme.text}60`}
              />
              {addressError ? (
                <Text style={styles.errorText}>{addressError}</Text>
              ) : null}
            </View>
            {/* 
              <View>
                <Text style={styles.text}>Least Charge Per Delivery</Text>
                <TextInput
                  style={[
                    styles.input,
                    basePriceError && { borderColor: "red" },
                    focusedInput === "basePrice" && {
                      borderColor: "#f1c40f",
                    },
                  ]}
                  onFocus={() => setFocusedInput("basePrice")}
                  onBlur={() => setFocusedInput(null)}
                  value={basePrice}
                  onChangeText={handleBasePriceChange}
                  placeholder="Enter your least charge per delivery"
                  placeholderTextColor={`${theme.text}60`}
                />
                {basePriceError ? (
                  <Text style={styles.errorText}>{basePriceError}</Text>
                ) : null}
              </View>

              <View>
                <Text style={styles.text}>
                  Average Minute per Delivery Pickup
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    pickupDurationError && { borderColor: "red" },
                    focusedInput === "pickupDuration" && {
                      borderColor: "#f1c40f",
                    },
                  ]}
                  onFocus={() => setFocusedInput("pickupDuration")}
                  onBlur={() => setFocusedInput(null)}
                  value={pickupDuration}
                  onChangeText={handlePickupDuration}
                  placeholder="Average Minute per Delivery Pickup"
                  placeholderTextColor={`${theme.text}60`}
                />
                {pickupDurationError ? (
                  <Text style={styles.errorText}>{pickupDurationError}</Text>
                ) : null}
              </View>

              <View>
                <Text style={styles.text}>Average Minute per Delivery</Text>
                <TextInput
                  style={[
                    styles.input,
                    deliveryDurationError && { borderColor: "red" },
                    focusedInput === "deliveryDuration" && {
                      borderColor: "#f1c40f",
                    },
                  ]}
                  keyboardType="numeric"
                  onFocus={() => setFocusedInput("deliveryDuration")}
                  onBlur={() => setFocusedInput(null)}
                  value={deliveryDuration}
                  onChangeText={handledeliveryduration}
                  placeholder="Average Minute per Delivery"
                  placeholderTextColor={`${theme.text}60`}
                />
                {deliveryDurationError ? (
                  <Text style={styles.errorText}>{deliveryDurationError}</Text>
                ) : null}
              </View> */}

            <View>
              <Text style={styles.text}> {i18n.t('password')}</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    passwordError && {borderColor: 'red'},
                    focusedInput === 'password' && {borderColor: '#f1c40f'},
                  ]}
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder={i18n.t('passwordPlaceholder')}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  placeholderTextColor={`${theme.text}60`}
                />

                <TouchableOpacity
                  style={styles.passwordVisibilityIcon}
                  onPress={togglePasswordVisibility}>
                  {showPassword ? (
                    <CloseEyeIcon color={theme.text} width={20} height={20} />
                  ) : (
                    <EyeIcon color={theme.text} width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>
          </View>

          <View>
            {error ? (
              <Text
                style={[
                  styles.errorText,
                  {
                    backgroundColor: '#ff000025',
                    padding: 12,
                    marginBottom: 16,
                  },
                ]}>
                {error}
              </Text>
            ) : null}
          </View>

          <View>
            {loading === true ? (
              <TouchableOpacity
                style={styles.buttonClickLoading}
                onPress={handleRegister}>
                <Text
                  style={[styles.buttonText, {fontFamily: 'MontserratBold'}]}>
                  ....
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonClick}
                onPress={handleRegister}>
                <Text
                  style={[styles.buttonText, {fontFamily: 'MontserratBold'}]}>
                  {i18n.t('Create')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* 
          <View>
              <TouchableOpacity
                style={styles.buttonClicks}
                onPress={() => {
                  promptAsync();
                }}
              >
                <Text style={styles.text}>Sign up with Google</Text>
                <Image source={GooglePng} style={styles.image} />
              </TouchableOpacity>
            </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogisticsCreateAccount;
