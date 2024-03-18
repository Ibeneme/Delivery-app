import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../Providers/ThemeProvider';
//import Icon from "react-native-vector-icons/FontAwesome";
import {googleUserLogin, loginUser} from '../../../Redux/Auth/Auth';
import {useDispatch, useSelector} from 'react-redux';
// import * as SecureStore from "expo-secure-store";
import {useLocalization} from '../Pages/Localization/LocalizationContext';
import i18n from '../Pages/Localization/i18n';
// import { setLanguage } from "../../../Redux/Translation/Translation";
// import i18n from "i18n-js";
// import * as Localization from "expo-localization";
//import { androidClientId, iosClientId } from "../../../Redux/BaseUrl/Baseurl";
//import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CloseEyeIcon, EyeIcon} from '../Icons/AllIcons';

const Login = () => {
  const GooglePng = require('../../../assets/Flags/Googlepng.png');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const userData = {
      email,
      password,
    };

    try {
      const response = await dispatch(loginUser(userData));
      console.log(response, 'res');
      if (response.payload?.error === '"email" is not allowed to be empty') {
        setError('Email Cannot be empty');
      } else if (response?.payload?.token?.accessToken) {
        navigation.navigate('Home');
      } else if (response?.payload === 'Network Error') {
        setError('Network Error');
      } else if (response?.payload === 'timeout exceeded') {
        setError('Please Check your internet');
      } else {
        setError('Invalid email or password');
      }

      // Save email to SecureStore
      // await save("email", email);
      // await save("password", password);
    } catch (error) {
      console.log(error, 'error');
      // Handle errors here
    } finally {
      setLoading(false);
    }
  };

  // const save = async (key, value) => {
  //   await SecureStore.setItemAsync(key, value);
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

  const navigateToLogin = () => {
    navigation.navigate('ThirdScreen');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handlePasswordChange = password => {
    setError('');
    setPasswordError('');
    setPassword(password);
  };

  const {theme} = useTheme();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
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
  //       const { email } = user;

  //       try {
  //         dispatch(googleUserLogin({ email: email }))
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

  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontFamily: 'MontserratRegular',
      fontSize: 13,
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
    forgotPassword: {
      color: theme.text,
      marginTop: -12,
      fontSize: 12,
      textAlign: 'right',
      fontFamily: 'MontserratRegular',
    },
    passwordtext: {
      textAlign: 'right',
      marginTop: 12,
      color: theme.text,
      fontFamily: 'MontserratRegular',
      fontSize: 12,
    },
    buttonClick: {
      backgroundColor: '#f1c40f',
      width: '100%',
      height: 55,
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
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
    buttonText: {
      fontFamily: 'MontserratBold',
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
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
    },
    passwordVisibilityIcon: {
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
    text: {
      color: theme.text,
      marginTop: 4,
      fontFamily: 'MontserratRegular',
      fontSize: 13,
    },
    textBold: {
      color: '#f1c40f',
      fontFamily: 'MontserratBold',
      fontSize: 18,

      marginTop: 48,
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
  });

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  // useEffect(() => {
  //   dispatch(setLanguage(language));
  // }, [dispatch]);

  // const [locale, setLocale] = useState(Localization.locale);
  // const language = useSelector((state) => state.language);
  // const setupI18n = () => {
  //   i18n.translations = language;
  //   i18n.locale = Localization.locale;
  //   i18n.fallbacks = true;
  // };
  // console.log(i18n, "ll");
  // useEffect(() => {
  //   setupI18n();
  // }, []);

  const {locale, changeLanguage} = useLocalization();

  const t = key => i18n.t(key); // Define the translation function

  const handleLanguageChange = () => {
    const newLanguage = locale === 'en' ? 'fr' : 'en';
    changeLanguage(newLanguage);
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle,
      headerTitleStyle: {
        fontFamily: 'MontserratRegular',
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <ScrollView style={{flexGrow: 1, backgroundColor: theme.backgroundAuth}}>
      <View
        style={[
          styles.containerfirst,
          {backgroundColor: theme.backgroundAuth},
        ]}>
        <View>
          <Text style={styles.textBold}>
            {i18n.t('welcome')} {''}
          </Text>
          <Text style={styles.text}>
            {i18n.t('Dont')}
            <Text onPress={navigateToLogin} style={styles.textSpan}>
              {' '}
              {i18n.t('Create')}
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

              {/* 
              <TouchableOpacity
              </TouchableOpacity> 
              */}
            </View>

            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
          <TouchableOpacity onPress={navigateToForgotPassword}>
            <Text style={styles.forgotPassword}> {i18n.t('forgot')}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonClick} onPress={handleLogin}>
            <Text style={[styles.buttonText, {fontFamily: 'MontserratBold'}]}>
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                `${i18n.t('Login')}`
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* <TouchableOpacity
            style={styles.buttonClicks}
            onPress={() => {
              promptAsync();
            }}
          >
            <Text style={styles.text}>Sign in with Google</Text>
            <Image source={GooglePng} style={styles.image} />
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
