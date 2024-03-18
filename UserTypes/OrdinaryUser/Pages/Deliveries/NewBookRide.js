import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../../../../Providers/ThemeProvider';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch} from 'react-redux';
import {fetchLogisticsCompanies} from '../../../../Redux/Deliveries/Deliveries';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import from the new package
import {Button, Platform} from 'react-native';
import {fetchLogisticsCompaniesNew} from '../../../../Redux/Deliveries/NewDeliveries';

const NewBookRide = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const resetForm = () => {
    setReceiversName('');
    setReceiversPhoneNumber('');
    setReceiversEmail('');
    setPickupTime('');
    setPackageWeight('');
    setPackageType(null);
    setNameError('');
    setPhoneNumberError('');
    setReceiversEmailError('');
    setDeliveryError('');
    setPickupError('');
    setPickupTimeError('');
    setPackagError('');
    setEditError('');
    setErrorr('');
    setVehicleTypes('');
  };

  const navigation = useNavigation();
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const data = [
    {label: 'Fashion', value: 'Fashion'},
    {label: 'Electronics', value: 'Electronics'},
    {label: 'Groceries', value: 'Groceries'},
    {label: 'Clothing', value: 'Clothing'},
    {label: 'Jewelry / Accessories', value: 'Jewelry / Accessories'},
    {label: 'Documents', value: 'Documents'},
    {label: 'Health', value: 'Health'},
    {label: 'Products', value: 'Products'},
    {label: 'Computer Accessories', value: 'Computer Accessories'},
    {label: 'Phones', value: 'Phones'},
    {label: 'Frozen Foods', value: 'Frozen Foods'},
    {label: 'Food', value: 'Food'},
    {label: 'Miscellaneous', value: 'Miscellaneous'},
    {label: 'Others', value: 'Others'},
  ];

  const dataWeight = [
    {label: 'Mobile Phone', value: '0-1kg (Mobile Phone)'},
    {
      label: 'Laptop or Small Camera',
      value: '1- 3kg (Laptop or Small Camera)',
    },
    {
      label: 'Small Suitcase or Tool Box',
      value: 'Small Suitcase or Tool Box',
    },
    {label: '10kg-20kg', value: '10kg-20kg Large Backpack or Microwave'},
    {label: 'Jewelry / Accessories', value: 'Jewelry / Accessories'},
    {label: 'Documents', value: 'Documents'},
    {label: 'Health', value: 'Health'},
    {label: 'Products', value: 'Products'},
    {label: 'Computer Accessories', value: 'Computer Accessories'},
    {label: 'Phones', value: 'Phones'},
    {label: 'Frozen Foods', value: 'Frozen Foods'},
    {label: 'Food', value: 'Food'},
    {label: 'Miscellaneous', value: 'Miscellaneous'},
    {label: 'Others', value: 'Others'},
  ];

  const vehicleType = [
    {label: 'Cars', value: 'Cars'},
    {label: 'Trucks', value: 'Trucks'},
    {label: 'Motorcycles', value: 'Motorcycles'},
    {label: 'Bicycles', value: 'Bicycles'},
    {label: 'Vans', value: 'Vans'},
    // { label: "Trains", value: "Trains" },
    {label: 'Buses', value: 'Buses'},
    {label: 'Planes', value: 'Planes'},
  ];

  const [date, setDate] = useState('09-10-2021');

  //const [value, setValue] = useState(null);
  const handleTextChange = newText => {
    setText(newText);
  };

  //Use states to hold states of inputs
  const [isEditing, setIsEditing] = useState(false);
  const [receiverName, setReceiversName] = useState('');
  const [phoneNumber, setReceiversPhoneNumber] = useState('');
  const [recieversEmail, setReceiversEmail] = useState('');
  const [pickupTimes, setPickupTime] = useState('');
  const [packageWeight, setPackageWeight] = useState('');
  const [packageTypes, setPackageType] = useState(null);
  const [nameError, setNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [recieversEmailError, setReceiversEmailError] = useState('');
  const [deliveryError, setDeliveryError] = useState('');
  const [pickupError, setPickupError] = useState('');
  const [pickupTimesError, setPickupTimeError] = useState('');
  const [packageError, setPackagError] = useState('');
  const [editError, setEditError] = useState('');
  const [err, setErrorr] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState('');
  const route = useRoute();
  const {
    deliveryAddress,
    deliveryLat,
    deliveryLng,
    pickupAddress,
    pickupLat,
    pickupLng,
  } = route.params;

  // console.log(
  //   deliveryAddress,
  //   deliveryLat,
  //   deliveryLng,
  //   pickupAddress,
  //   pickupLat,
  //   pickupLng,
  //   "vehicleTypesrrr"
  // );
  //Onchnage functions
  const formatAndValidateAddress = address => {
    const formattedAddress =
      address.charAt(0).toUpperCase() + address.slice(1).toLowerCase();

    return formattedAddress;
  };

  const handleDeliveryAddress = newDeliveryAddress => {
    const formattedAddress = formatAndValidateAddress(newDeliveryAddress);
    setDeliveryAddress(formattedAddress);

    if (formattedAddress.length <= 11) {
      setDeliveryError(
        'Must be 10 characters, Name of Street, City and State.',
      );
    } else {
      setDeliveryError('');
    }
  };

  // const handlePickupAddress = (pickupAddress) => {
  //   const formattedAddress = formatAndValidateAddress(pickupAddress);
  //   setPickupAddress(formattedAddress);

  //   if (formattedAddress.length <= 11) {
  //     setPickupError("Must be 10 characters, Name of Street, City and State.");
  //   } else {
  //     setPickupError("");
  //   }
  // };

  const [addNotes, setNotes] = useState('');
  const [addNotesError, setNotesError] = useState('');
  const handleNotes = notes => {
    // Capitalize the first letter of each sentence
    const formattedNotes = notes.replace(/\. *([a-z])/g, (match, group) => {
      return `. ${group.toUpperCase()}`;
    });

    // Capitalize the first letter of the entire string
    const finalFormattedNotes =
      formattedNotes.charAt(0).toUpperCase() + formattedNotes.slice(1);

    setNotes(finalFormattedNotes);

    if (finalFormattedNotes.length <= 11) {
      setNotesError('Must be 10 characters');
    } else {
      setNotesError('');
    }
  };

  const handlePickupTime = pickupTimes => {
    setPickupTimeError('');
    const currentDate = new Date();

    const timeZone = 'Europe/Paris'; // GMT+1 (Central European Time)
    const options = {timeZone, timeZoneName: 'short'};

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(currentDate);

    console.log(formattedDate, 'ddd');

    const selectedInputDate = new Date(pickupTimes);
    if (selectedInputDate < currentDate) {
      setPickupTimeError('Please select a future date.');
    } else {
      setPickupTime(pickupTimes);
    }
  };

  const handlePackageWeight = packageWeight => {
    setPackagError('');
    setPackageWeight(packageWeight);
  };
  const handleVehicleType = vehicleTypes => {
    setVehicleTypes(vehicleTypes?.value);
    //console.log(vehicleTypes?.value, "vehicleTypes");
  };
  const handlePackageType = packageTypes => {
    if (packageTypes.value && typeof packageTypes.value === 'string') {
      let packageType = packageTypes.value;
      if (packageType.startsWith('(') && packageType.endsWith(')')) {
        packageType = packageType.slice(1, -1);
      }
      setPackageType(packageType);
    }
    return packageTypes;
  };

  const handleReceiversNameChange = receiverName => {
    const words = receiverName.split(' ');
    const formattedName = words
      .map(word => {
        if (word.length > 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return '';
      })
      .join(' ');

    setNameError('');
    setReceiversName(formattedName);

    if (formattedName.replace(/\s/g, '').length <= 2) {
      setNameError('Name must be more than 2 letters');
    }
  };

  const handleReceiverPhoneNumberChange = phoneNumber => {
    // Remove non-numeric characters from the input
    const numericInput = phoneNumber.replace(/\D/g, '');

    // Ensure the length is at most 11 digits
    const truncatedNumericInput = numericInput.slice(0, 14);

    setReceiversPhoneNumber(truncatedNumericInput);

    if (/^\d{11}$/.test(truncatedNumericInput)) {
      // Valid 11-digit phone number
      setPhoneNumberError('');
    } else if (
      truncatedNumericInput?.length > 11 ||
      truncatedNumericInput?.length < 11
    ) {
      setPhoneNumberError('Must be 11 digits');
      // Invalid phone number
    }
  };

  const handleReceiversEmailChange = receiverEmail => {
    setReceiversEmailError('');
    const formattedEmail = receiverEmail
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());

    setReceiversEmail(formattedEmail);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const isValidEmail = emailPattern.test(formattedEmail);

    setReceiversEmailError(
      isValidEmail
        ? ''
        : `Recievers Email address is Optional, Please enter a valid email address if you choose to. Hint: "Example@mail.com" `,
    );

    if (isValidEmail) {
      setReceiversEmailError('');
    }
    if (isValidEmail === ' ') {
      setReceiversEmailError('');
    }
  };

  const navigateToThisRide = () => {
    navigation.navigate('NewGetRide', {
      receiverName: receiverName,
      phoneNumber: phoneNumber,
      recieversEmail: recieversEmail,
      pickupAddress: pickupAddress,
      deliveryAddress: deliveryAddress,
      pickupTimes: `${dates}`,
      packageWeight: packageWeight,
      packageType: packageTypes,
      deliveryLat: deliveryLat,
      deliveryLng: deliveryLng,
      pickupLat: pickupLat,
      pickupLng: pickupLng,
      vehicleType: vehicleTypes,
    });
  };
  console.log(recieversEmail, 'recieversEmailError');
  //onSubmit function
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErrorr('');
    setLoading(true);

    const errors = [];
    if (phoneNumberError || nameError) {
      setLoading(false);
    } else {
      //setLoading(false);
      // Reset all error states
      setPackagError('');
      setNameError('');
      setPhoneNumberError('');
      setReceiversEmailError('');
      ErrSetdates('');

      const errors = [];

      if (packageWeight.trim() === '') {
        //setLoading(false);
        setPackagError('Please enter a Package weight');
        errors.push('packageWeight');
        setLoading(false);
      }

      if (
        receiverName.trim() === '' ||
        receiverName === "Enter the Receiver's name"
      ) {
        setNameError("Please enter a Receiver's name");
        errors.push('receiverName');
        setLoading(false);
      }

      if (phoneNumber.trim() === '' || phoneNumber === '+234 xxx xxxx xxxx') {
        setPhoneNumberError("Please enter a Receiver's phone number");
        errors.push('phoneNumber');
        setLoading(false);
      }
      // setLoading(false);
      // if (
      //   recieversEmail.trim() === "" ||
      //   recieversEmail === "Enter the receivers Email address"
      // ) {
      //   setReceiversEmailError("Please enter a Receiver's email");
      //   errors.push("recieversEmail");
      // }

      if (dates === '') {
        ErrSetdates('Please Select a Pickup Dates');
        errors.push('Errdates');
      }

      if (errors.length > 0) {
        // If there are errors, do not proceed
        setLoading(false);
        setErrorr('');
      } else {
        const vehicleType = vehicleTypes;
        dispatch(
          fetchLogisticsCompaniesNew(
            {
              params: [
                packageWeight,
                vehicleType,
                pickupAddress,
                deliveryAddress,
              ],
            },
            // {
            //   packageWeight: packageWeight,
            //   pickupAddress: pickupAddress,
            //   deliveryAddress: deliveryAddress,
            //   vehicleType: vehicleTypes,
            // }
          ),
        )
          .then(response => {
            setLoading(false);
            console.log(response, 'fontSize: 14,');
            const stringifiedResponse = JSON.stringify(
              response?.payload?.success,
            );
            setLoading(false);

            switch (stringifiedResponse) {
              case `"Successfully retrieved vehicles"`:
                setLoading(false);
                navigateToThisRide();
                break;
              default:
                setLoading(false);
                setErrorr(
                  'Please check your inputs, pickup time, package weight, vehicle type and more',
                );
                break;
            }
          })
          .catch(error => {
            setLoading(false);
            // Handle the error if necessary
            console.error(error);
          });
      }
    }
  };

  //Navigation

  //styling
  const styles = StyleSheet.create({
    errorText: {
      color: '#ff0650',
      marginTop: 4,
      fontSize: 14,
      fontFamily: 'MontserratRegular',
    },

    icon: {
      marginRight: 5,
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
      backgroundColor: 'red',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      display: 'none',
    },
    placeholderTexts: {
      position: 'absolute',
      bottom: '10%',
      right: 10,
      padding: 10,
      color: 'red',
      fontFamily: 'MontserratRegular',
    },
    passwordVisibilityIcon: {
      position: 'absolute',
      bottom: '10%',
      right: 0,
      padding: 10,
      color: theme.text,
      fontFamily: 'MontserratRegular',
      borderColor: '#66666645',
      borderLeftWidth: 1,
    },
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
    },
    passwordtext: {
      textAlign: 'left',
      paddingTop: 8,
      fontSize: 14,
      fontFamily: 'MontserratRegular',
    },

    containerfirst: {
      backgroundColor: '#000',
      color: '#ffffff',
      height: '100%',
      padding: 16,
      marginTop: 24,
    },
    text: {
      color: theme.text,
      fontSize: 14,
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
      marginTop: 24,
    },
    Nextgrayed: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      paddingBottom: 12,
      alignItems: 'center',
      borderBottomColor: `${theme.text}50`,
    },
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontSize: 13,
      height: 53,
      marginTop: 24,
      width: '100%',
      fontFamily: 'MontserratRegular',
    },
    buttonClick: {
      backgroundColor: '#f1c40f',
      width: '100%',
      height: 53,
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonClicks: {
      backgroundColor: '#f1c40f45',
      width: '100%',
      height: 53,
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    keyb: {
      flex: 1,
    },
    dropdown: {
      height: 55,
      borderColor: `${theme.text}65`,
      borderWidth: 0.5,
      borderRadius: 4,
      paddingHorizontal: 8,
      marginTop: 24,
      backgroundColor: theme.backgroundAuth,
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
      title: 'Book a Ride',
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: 'MontserratBold',
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const [pickupTimess, setPickupTimes] = useState(new Date()); // Initialize with a default date
  const currentDate = new Date();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const handlePickupTimes = (event, selectedDate) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setPickupTimes(selectedDate);
      setShowDatePicker(false);
    }
  };

  const pickupTimesString = pickupTimess.toISOString();
  const [dates, setDates] = useState(new Date());

  useEffect(() => {
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + 4 * 60 * 60 * 1000);
    console.log(newDate, 'newdate');
    setDates(newDate);
  }, []);
  const [Errdates, ErrSetdates] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleShowPicker = () => {
    setShowPicker(true);
  };
  console.log(dates, 'datessss');
  const handleHidePicker = () => {
    setShowPicker(false);
  };

  const onChange = (event, selectedDate) => {
    ErrSetdates('');
    setShowPicker(Platform.OS === 'ios'); // For iOS, show the picker in modal
    if (selectedDate) {
      setDates(selectedDate);
      console.log(selectedDate, dates, 'ggg');
    } else if (selectedDate === ' ') {
      ErrSetdates('Select a Pickup Dater');
    }
  };
  console.log(dates, dates, 'datesdates');

  const showDatepicker = () => {
    setShowPicker(true);
    // console.log(date,'date')
  };

  return (
    <KeyboardAvoidingView enabled={true} style={[styles.keyb, {flex: 1}]}>
      <SafeAreaView style={{backgroundColor: theme.background, height: '100%'}}>
        <ScrollView style={{backgroundColor: theme.background, flexGrow: 1}}>
          <View
            style={[
              styles.containerfirst,
              {backgroundColor: theme.background, marginBottom: 343},
            ]}>
            <View style={styles.orderView}>
              <View style={[styles.grayed, {marginTop: -18}]}>
                <View style={[styles.Nextgrayed]}>
                  <Text style={[styles.text, {fontSize: 14, marginTop: 24}]}>
                    Add Delivery Details
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    value={receiverName}
                    onChangeText={handleReceiversNameChange}
                    placeholder="Enter the Receivers Full Name"
                    placeholderTextColor={`${theme.text}60`}
                    placeholderStyle={{fontFamily: 'MontserratBold'}}
                  />
                  {nameError ? (
                    <Text style={styles.errorText}>{nameError}</Text>
                  ) : null}
                </View>
                <View>
                  <TextInput
                    placeholderStyle={{fontFamily: 'MontserratBold'}}
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={handleReceiverPhoneNumberChange}
                    placeholder="Enter the Phone Number"
                    placeholderTextColor={`${theme.text}60`}
                    keyboardType="numeric" // Set keyboardType to accept only numeric input
                  />
                  {phoneNumberError ? (
                    <Text style={styles.errorText}>{phoneNumberError}</Text>
                  ) : null}
                </View>
                <View>
                  <TextInput
                    placeholderStyle={{fontFamily: 'MontserratBold'}}
                    style={styles.input}
                    value={recieversEmail}
                    onChangeText={handleReceiversEmailChange}
                    placeholder="Enter the Receivers Email Address"
                    placeholderTextColor={`${theme.text}60`}
                  />
                  {recieversEmailError ? (
                    <Text style={styles.errorText}>{recieversEmailError}</Text>
                  ) : null}
                </View>
                <Text
                  style={{
                    marginTop: 24,
                    marginBottom: -18,
                    fontSize: 14,
                    fontFamily: 'MontserratBold',
                    color: `${theme.text}`,
                  }}>
                  Choose Pickup date
                </Text>
                {/* android */}
                <View
                  style={[
                    styles.input,
                    {
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}>
                  <View>
                    <Text
                      style={[
                        {
                          fontFamily: 'MontserratRegular',
                          color: `${theme.text}65`,
                          fontSize: 14,
                        },
                      ]}>{`${
                      dates
                        ? dates.toISOString().split('T')[0]
                        : 'Choose Pickup date'
                    }`}</Text>
                  </View>
                  <View>
                    <Button onPress={showDatepicker} title="Choose Date" />
                    {showPicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={dates}
                        //mode="datetime"
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        minimumDate={currentDate}
                        timeZoneOffsetInMinutes={-60}
                      />
                    )}
                  </View>
                </View>
                {Errdates ? (
                  <Text style={styles.errorText}>{Errdates}</Text>
                ) : (
                  <Text
                    style={{
                      color: '#f1c40f',
                      fontFamily: 'MontserratRegular',
                      backgroundColor: '#f1c40f25',
                      padding: 16,
                      marginTop: 12,
                    }}>
                    Pickup Time Must be greater than now
                  </Text>
                )}

                {/* ios */}
                {/* <View
                  style={[
                    styles.input,
                    {
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    },
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        {
                          fontFamily: "MontserratRegular",
                          color: `${theme.text}65`,
                          fontSize: 16,
                        },
                      ]}
                    >{`${
                      dates
                        ? dates.toISOString().split("T")[0]
                        : "Choose Pickup date"
                    }`}</Text>
                  </View>
                  <View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dates}
                      mode="datetime"
                      // mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                      minimumDate={currentDate}
                      timeZoneOffsetInMinutes={-60}
                      style={{
                        color: "#f1c40f",
                        backgroundColor: "#f1c40f",
                        width: "100%",
                      }}
                    />
                  </View>
                </View>
                {Errdates ? (
                  <Text style={styles.errorText}>{Errdates}</Text>
                ) : (
                  <Text
                    style={{
                      color: "#f1c40f",
                      fontFamily: "MontserratRegular",
                      backgroundColor: "#f1c40f25",
                      padding: 16,
                      marginTop: 12,
                    }}
                  >
                    Pickup Time Must be greater than now
                  </Text>
                )} */}
                <View
                  style={{
                    marginTop: 24,
                  }}></View>
              </View>

              <View style={styles.grayed}>
                <View style={styles.Nextgrayed}>
                  <Text style={[styles.text, {fontSize: 14, marginTop: 8}]}>
                    Pickup Details
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      marginTop: 24,
                      marginBottom: -18,
                      fontSize: 12,
                      fontFamily: 'MontserratBold',
                      color: `${theme.text}90`,
                    }}>
                    Choose a package Weight in kg
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        position: 'relative',
                        flexDirection: 'column',
                        // alignItems: "center",
                        width: '100%',
                      },
                    ]}>
                    <View style={styles.passwordInputContainer}>
                      <TextInput
                        style={[styles.input]}
                        value={packageWeight}
                        onChangeText={handlePackageWeight}
                        placeholder="Package Weight (e.g: 2Kg)"
                        placeholderTextColor={`${theme.text}60`}
                        keyboardType="numeric"
                      />
                      <TouchableOpacity style={styles.passwordVisibilityIcon}>
                        <Text
                          style={{
                            fontFamily: 'MontserratBold',
                            color: theme.text,
                          }}>
                          Kg
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {packageError ? (
                      <Text style={styles.errorText}>{packageError}</Text>
                    ) : null}
                  </View>
                </View>

                <View>
                  <View>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      selectedStyle={styles.selectedStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={{
                        fontSize: 14,
                        color: `${theme.text}`,
                        fontFamily: 'MontserratRegular',
                      }}
                      itemContainerStyle={{
                        backgroundColor: theme.backgroundAuth,
                      }}
                      selectedItemStyle={{
                        backgroundColor: 'blue',
                      }}
                      data={data}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Package Type"
                      searchPlaceholder="Search..."
                      value={packageTypes}
                      onChange={handlePackageType}
                    />
                  </View>
                  <View>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      selectedStyle={styles.selectedStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={{
                        fontSize: 14,
                        color: `${theme.text}`,
                        fontFamily: 'MontserratRegular',
                      }}
                      itemContainerStyle={{
                        backgroundColor: theme.backgroundAuth,
                      }}
                      data={vehicleType}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Vehicle Type"
                      searchPlaceholder="Search..."
                      value={vehicleTypes}
                      onChange={handleVehicleType}
                    />
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 48,
                  }}>
                  <View style={styles.Nextgrayed}>
                    <Text style={styles.text}>Add Notes</Text>
                    <Text
                      style={[styles.passwordtext, {color: `${theme.text}`}]}>
                      Optional
                    </Text>
                  </View>

                  <View>
                    <TextInput
                      placeholderStyle={{fontFamily: 'MontserratBold'}}
                      value={addNotes}
                      style={styles.input}
                      onChangeText={handleNotes}
                      placeholder="Add Notes"
                      placeholderTextColor={`${theme.text}60`}
                    />
                    {addNotesError ? (
                      <Text style={styles.errorText}>{addNotesError}</Text>
                    ) : null}
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 24,
                  }}></View>
              </View>

              <View
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.buttonClick}
                  // disabled={loading}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {fontFamily: 'MontserratRegular', fontSize: 14},
                    ]}>
                    {loading ? <ActivityIndicator color="#000" /> : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {err ? (
                  <Text
                    style={{
                      backgroundColor: '#ff000021',
                      color: '#ff0000',
                      padding: 16,
                      fontFamily: 'MontserratRegular',
                      textAlign: 'center',
                      fontSize: 13,
                    }}>
                    {err}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NewBookRide;
