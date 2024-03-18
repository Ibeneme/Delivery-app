import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../Providers/ThemeProvider';
import {useDispatch} from 'react-redux';
import {registerBusiness} from '../../Redux/Auth/Auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import { CloseEyeIcon, EyeIcon } from '../OrdinaryUser/Icons/AllIcons';
//import Toast from "react-native-root-toast";

const BusinessCreateAccount = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [businessNameError, setBusinessNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigateToSuccess = () => {
    navigation.navigate('Success');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleEmailChange = email => {
    setError('');
    setEmailError('');
    const formattedEmail = email
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setEmail(formattedEmail);
  };

  const handleNameChange = businessName => {
    setError('');
    setBusinessNameError('');
    const formattedName = businessName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setBusinessName(formattedName);
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
  // const [toastShown, //setToastShown] = useState(false);
  // const showToast = () => {
  //   if (!toastShown) {
  //     //setToastShown(true);

  //     let toast = Toast.show("Please check your mail to verify your account.", {
  //       duration: Toast.durations.LONG,
  //       position: Toast.positions.CENTER,
  //       shadow: true,
  //       animation: true,
  //       hideOnPress: true,
  //       delay: 0,
  //     });

  //     setTimeout(function hideToast() {
  //       Toast.hide(toast);
  //     }, 10000);
  //   }
  // };

  const handleRegister = () => {
    const userData = {
      email,
      businessName,
      phoneNumber,
      password,
      userType: 'BusinessOwner',
    };

    dispatch(registerBusiness(userData))
      .then(response => {
        if (
          response.payload.message ===
          `Please check your mail to verify your account.`
        ) {
          //setToastShown();

          navigation.navigate('Success');
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
          setEmailError(`Email not Incorrect`);
        } else if (
          response.payload.error === `"businessName" is not allowed to be empty`
        ) {
          setBusinessNameError(`Enter your Business Name`);
        } else if (
          response.payload.error ===
          `Full name should contain both first name and last name`
        ) {
          setBusinessNameError(`Enter your First and Last Names`);
        } else if (response.payload.error === `User already registered`) {
          setError('User already registered');
        } else if (response.payload.error === `User Exist`) {
          setError('User Exist');
        }
      })
      .catch(error => {});
  };

  const toastStyle = {
    backgroundColor: 'red',
    width: 250,
    opacity: 0.8,
    borderRadius: 10,
    marginTop: 48,
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
      fontSize: 16,
      fontFamily: 'MontserratRegular',
      height: 50,
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
      marginBottom: 72,
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
      fontSize: 16,
      fontFamily: 'MontserratRegular',
    },
    textBold: {
      color: '#f1c40f',
      fontSize: 24,
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
    },
  });

  const headerStyle = {
    backgroundColor: theme.background,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create a Business Account',
      headerStyle,
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <SafeAreaView
      style={[
        styles.containerfirst,
        {
          backgroundColor: theme.background,
          height: '100%',
          flexGrow: 1,
          flex: 1,
        },
      ]}>
      <ScrollView style={{backgroundColor: theme.background}}>
        <View style={{backgroundColor: theme.background, paddingBottom: 276}}>
          <View>
            <Text style={styles.textBold}>Welcome</Text>
            <Text style={styles.text}>
              Already have an Account?{' '}
              <Text onPress={navigateToLogin} style={styles.textSpan}>
                Login
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
              <Text style={styles.text}>Full Name</Text>
              <TextInput
                style={[
                  styles.input,
                  businessNameError && {borderColor: 'red'},
                  focusedInput === 'businessName' && {
                    borderColor: '#f1c40f',
                  },
                ]}
                onFocus={() => setFocusedInput('businessName')}
                onBlur={() => setFocusedInput(null)}
                value={businessName}
                onChangeText={handleNameChange}
                placeholder="Enter your full Name"
                placeholderTextColor={`${theme.text}60`}
              />
              {businessNameError ? (
                <Text style={styles.errorText}>{businessNameError}</Text>
              ) : null}
            </View>
            <View>
              <Text style={styles.text}>Email Address</Text>
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
                placeholder="Enter Email Address"
                placeholderTextColor={`${theme.text}60`}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>
            <View>
              <Text style={styles.text}>Phone Number</Text>
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
                placeholder="Enter Phone Number"
                placeholderTextColor={`${theme.text}60`}
              />
              {phoneNumberError ? (
                <Text style={styles.errorText}>{phoneNumberError}</Text>
              ) : null}
            </View>

            <View>
              <Text style={styles.text}>Create a Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    passwordError && {borderColor: 'red'},
                    focusedInput === 'password' && {borderColor: '#f1c40f'},
                  ]}
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="Enter Password"
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
            <TouchableOpacity
              style={styles.buttonClick}
              onPress={handleRegister}>
              <Text style={styles.buttonText}>Create an Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessCreateAccount;
