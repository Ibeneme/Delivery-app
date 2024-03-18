import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../Providers/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {
  googleRegistrationOrdinary,
  registerUser,
} from '../../../Redux/Auth/Auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLocalization} from '../Pages/Localization/LocalizationContext';
import i18n from '../Pages/Localization/i18n';
import {androidClientId, iosClientId} from '../../../Redux/BaseUrl/Baseurl';
// import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CloseEyeIcon, EyeIcon} from '../Icons/AllIcons';

const CreateAccount = () => {
  const GooglePng = require('../../../assets/Flags/Googlepng.png');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigateToSuccess = () => {
    navigation.navigate('Success');
  };

  const navigateToLogin = () => {
    //navigation.navigate("GoogleLogin");
    navigation.navigate('Login');
  };

  // const [token, setToken] = useState("");
  // const [userInfo, setUserInfo] = useState(null);
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
  //         email: email,
  //         fullName: name,
  //         userType: "OrdinaryUser",
  //       };
  //       console.log(userData, "hshshshshs");
  //       try {
  //         dispatch(googleRegistrationOrdinary(userData))
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

  const handleNameChange = fullName => {
    setError('');
    setFullNameError('');
    const formattedName = fullName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setFullName(formattedName);
  };

  const handlePhoneNumberChange = phoneNumber => {
    setError('');
    setPhoneNumberError('');
    setPhoneNumber(phoneNumber);
  };
  const handlePasswordChange = password => {
    setError('');
    setPasswordError('');
    setPassword(password);
  };

  const dispatch = useDispatch();
  const [toastShown, setToastShown] = useState(false);
  const showToast = () => {
    if (!toastShown) {
      setToastShown(true);

      let toast = Toast.show('Please check your mail to verify your account.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 10000);
    }
  };

  const handleRegister = () => {
    setLoading(true);
    const userData = {
      email,
      fullName,
      phoneNumber,
      password,
      userType: 'OrdinaryUser',
    };

    dispatch(registerUser(userData))
      .then(response => {
        console.log(response, 'res');
        setLoading(false);
        if (
          response.payload.message ===
          `Please check your mail to verify your account.`
        ) {
          navigation.navigate('Success-forgot');
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
          setEmailError(`Email is not correct`);
        } else if (
          response.payload.error === `"fullName" is not allowed to be empty`
        ) {
          setFullNameError(`Enter your Full Name`);
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
        setLoading(false);
        console.log(error, 'error');
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
      fontSize: 14,
      fontFamily: 'MontserratRegular',
      height: 55,
      marginTop: 4,
      width: '100%',
    },

    errorText: {
      color: '#ff0650',
      marginTop: 4,
      fontSize: 12,
      fontFamily: 'MontserratRegular',
    },
    passwordtext: {
      textAlign: 'right',
      marginTop: 12,
      color: theme.text,
      fontSize: 12,
      fontFamily: 'MontserratRegular',
    },
    buttonClick: {
      backgroundColor: '#f1c40f',
      width: '100%',
      height: 55,
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      color: theme.text,
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
      paddingTop: 8,
      flex: 1,
      flexGrow: 1,
      margin: 0,
    },
    text: {
      color: theme.text,
      marginTop: 4,
      fontSize: 12,
      fontFamily: 'MontserratRegular',
    },
    textBold: {
      color: '#f1c40f',
      fontSize: 18,
      fontFamily: 'MontserratBold',
      fontWeight: 900,
    },
    textSpan: {
      color: '#f1c40f',
      fontSize: 16,
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
      fontSize: 12,
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

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
    fontFamily: 'MontserratBold',
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      //  title: "Create an Account",
      title: '',
      headerStyle,
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const {locale, changeLanguage} = useLocalization();

  const t = key => i18n.t(key); // Define the translation function

  const handleLanguageChange = () => {
    const newLanguage = locale === 'en' ? 'fr' : 'en';
    changeLanguage(newLanguage);
  };
  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.keyb, {flex: 1}]}>
      <SafeAreaView
        style={{backgroundColor: theme.backgroundAuth, height: '100%'}}>
        <ScrollView
          style={{backgroundColor: theme.backgroundAuth, flexGrow: 1}}>
          <View
            style={[
              styles.containerfirst,
              {backgroundColor: theme.backgroundAuth},
            ]}>
            <View>
              <Text style={styles.textBold}>{i18n.t('welcome')}</Text>
              <Text style={styles.text}>
                {i18n.t('alreadyHave')}
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
                <Text style={styles.text}>{i18n.t('name')}</Text>
                <TextInput
                  style={[
                    styles.input,
                    fullNameError && {borderColor: 'red'},
                    focusedInput === 'fullName' && {borderColor: '#f1c40f'},
                  ]}
                  onFocus={() => setFocusedInput('fullName')}
                  onBlur={() => setFocusedInput(null)}
                  value={fullName}
                  onChangeText={handleNameChange}
                  placeholder={i18n.t('namePlaceholder')}
                  placeholderTextColor={`${theme.text}60`}
                />
                {fullNameError ? (
                  <Text style={styles.errorText}>{fullNameError}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.text}> {i18n.t('email')}</Text>
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
                <Text style={styles.text}>{i18n.t('password')}</Text>
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
              <TouchableOpacity
                style={styles.buttonClick}
                onPress={handleRegister}>
                <Text style={styles.buttonText}>
                  {loading ? <ActivityIndicator /> : `${i18n.t('Create')}`}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {/*      <TouchableOpacity
                style={styles.buttonClicks}
                onPress={() => {
                  promptAsync();
                }}
              >
                <Text style={styles.text}>Sign up with Google</Text>
                <Image source={GooglePng} style={styles.image} />
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;
