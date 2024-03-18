import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../Providers/ThemeProvider';
import RideSquares from '../Extras/Components/GetRide';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchLogisticsCompanies} from '../../../../Redux/Deliveries/Deliveries';
import {Button} from 'react-native-elements';
//import Icon from "react-native-vector-icons/FontAwesome5";
import MultiRideSquares from '../Extras/Components/GetMultipleRides';
import {ArrowDownIcon, ArrowUpSVG} from '../../Icons/AllIcons';

const GetMultipleRide = () => {
  const navigation = useNavigation();

  const [selectedItemsDetails, setSelectedItemsDetails] = useState([]);

  const [isDetailsVisible, setIsDetailsVisible] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState({});

  const toggleDetails = index => {
    setIsDetailsVisible(prev => {
      const updatedArray = [...prev];
      updatedArray[index] = !updatedArray[index];
      return updatedArray;
    });
  };
  const handleItemPress = (index, item) => {
    setSelectedItemIndex(prev => ({
      ...prev,
      [index]: {
        rideOption: item,
        deliveryAddress: selectedLocations[index].deliveryAddress,
        pickupAddress: selectedLocations[index].pickupAddress,
        packageWeight: selectedLocations[index].packageWeight,
        vehicleType: selectedLocations[index].vehicleType,
        pickupLat: selectedLocations[index].pickupLat,
        pickupLng: selectedLocations[index].pickupLng,
        deliveryLat: selectedLocations[index].deliveryLat,
        deliveryLng: selectedLocations[index].deliveryLng,
        logisticsCompanyID: selectedLocations[index].logisticsCompanyID,
        name: selectedLocations[index].name,
        phoneNumber: selectedLocations[index].phoneNumber,
        firstName: selectedLocations[index].firstName,
        vehicleID: selectedLocations[index].vehicleID,
        selectedDate: selectedLocations[index].selectedDate,
        packageType: selectedLocations[index].packageType,
        recieversEmail: selectedLocations[index].recieversEmail
          ? selectedLocations[index].recieversEmail
          : null,
      },
    }));

    console.log('Selected Item Details:', item, {
      item,
      deliveryAddress: selectedLocations[index].deliveryAddress,
      pickupAddress: selectedLocations[index].pickupAddress,
      packageWeight: selectedLocations[index].packageWeight,
      vehicleType: selectedLocations[index].vehicleType,
      pickupLat: selectedLocations[index].pickupLat,
      pickupLng: selectedLocations[index].pickupLng,
      deliveryLat: selectedLocations[index].deliveryLat,
      deliveryLng: selectedLocations[index].deliveryLng,
    });
  };
  // navigation.navigate("Next", { selectedItemsDetails });
  // const handleItemPress = (index, item) => {
  //   setSelectedItemIndex((prev) => {
  //     const currentItems = prev[index] || [];
  //     return {
  //       ...prev,
  //       [index]: [...currentItems, item],
  //     };
  //   });

  //   console.log("Selected Item Details:", item, {
  //     item,
  //   });
  // };

  const {theme} = useTheme();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
  };

  //   const navigateToThisRide = (
  //     vehicleID,
  //     companyCost,
  //     companyName,
  //     logisticsCompanyID
  //   ) => {
  //     navigation.navigate("GetMultipleRider", {
  //       receiverName: receiverName,
  //       packageType: packageType,
  //       phoneNumber: phoneNumber,
  //       recieversEmail: recieversEmail,
  //       pickupAddress: pickupAddress,
  //       deliveryAddress: deliveryAddress,
  //       pickupTimes: pickupTimes,
  //       packageWeight: packageWeight,
  //       vehicleID: vehicleID,
  //       logisticsCompanyID: logisticsCompanyID,
  //       companyName: companyName,
  //       companyCost: companyCost,
  //       deliveryLat: deliveryLat,
  //       deliveryLng: deliveryLng,
  //       pickupLat: pickupLat,
  //       pickupLng: pickupLng,
  //     });
  //   };

  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: 'left',
      paddingTop: 12,
      paddingBottom: 12,
      color: `${theme.text}55`,
      fontSize: 13,
    },

    containerfirst: {
      gap: 12,
      height: '100%',
      padding: 16,
    },
    text: {
      color: theme.text,
      fontSize: 14,
    },
    orderView: {
      borderBottomWidth: 1,
      borderColor: `${theme.text}20`,
      marginBottom: 12,
    },
    notificationCircle: {
      width: 14,
      height: 14,
      backgroundColor: '#f1c40f',
      borderRadius: 24,
      marginTop: 3,
    },
    rows: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 12,
    },
  });

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
    borderBottomWidth: 0,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Select a Ride',
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: 'MontserratBold',
        fontSize: 12,
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  const route = useRoute();
  const {selectedLocations} = route.params;

  //   {
  //     firstName: "Ikenna",
  //     lastName: "",
  //     deliveryAddress: "Abuja, Nigeria",
  //     deliveryLat: 9.0764785,
  //     deliveryLng: 7.398574,
  //     pickupAddress: "Lagos, Nigeria",
  //     pickupLat: 6.5243793,
  //     pickupLng: 3.3792057,
  //     email: "",
  //     phoneNumber: "029283883333",
  //     selectedDate: "2023-11-27T22:02:51.325Z",
  //     packageType: "Fashion",
  //     vehicleType: "Cars",
  //     packageWeight: "333",
  //     addNotes: "",
  //     error: {
  //       firstName: "",
  //       email: "",
  //       phoneNumber: "",
  //       packageWeight: "",
  //       packageType: "",
  //       vehicleType: "",
  //     },
  //   },
  //   {
  //     firstName: "33333",
  //     lastName: "",
  //     deliveryAddress: "Abuja, Nigeria",
  //     deliveryLat: 9.0764785,
  //     deliveryLng: 7.398574,
  //     pickupAddress: "Lagos, Nigeria",
  //     pickupLat: 6.5243793,
  //     pickupLng: 3.3792057,
  //     email: "",
  //     phoneNumber: "33333333333",
  //     selectedDate: "2023-11-29T22:02:51.325Z",
  //     packageType: "Fashion",
  //     vehicleType: "Cars",
  //     packageWeight: "33",
  //     addNotes: "",
  //     error: {
  //       firstName: "",
  //       email: "",
  //       phoneNumber: "",
  //       packageWeight: "",
  //       packageType: "",
  //       vehicleType: "",
  //     },
  //   },
  //   // Add more objects as needed
  // ];
  const dispatch = useDispatch();
  const [see, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleButtonClicks = async () => {
    try {
      const promises = selectedLocations.map(async item => {
        if (
          !item ||
          !item.packageWeight ||
          !item.pickupAddress ||
          !item.deliveryAddress ||
          !item.vehicleType
        ) {
          console.log('Invalid item in selectedLocations:', item);
          return null;
        }

        const {packageWeight, pickupAddress, deliveryAddress, vehicleType} =
          item;

        // Fetch data for the current item
        const response = await dispatch(
          fetchLogisticsCompanies({
            packageWeight,
            pickupAddress,
            deliveryAddress,
            vehicleType,
          }),
        );

        return response.payload?.data?.vehiclesWithCalculatedCosts;
      });

      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      // Do something with the results
      // console.log(
      //   "Results:",
      //   JSON.stringify(
      //     packageWeight,
      //     pickupAddress,
      //     deliveryAddress,
      //     vehicleType,
      //     null,
      //     3
      //   ),
      //   JSON.stringify(selectedLocations, null, 3),
      //   results
      // );
    } catch (error) {
      // console.error("An error occurred:", error);
    }
  };

  const [results, setResults] = useState([]);

  const handleProceedPress = () => {
    const selectedItemsArray = Object.values(selectedItemIndex).flat();
    setSelectedItemsDetails(selectedItemsArray);
    console.log(
      'Selected Items Details:',
      JSON.stringify(selectedItemsArray, null, 3),
    );
    navigation.navigate('MultipleTotalDeliveries', {selectedItemsArray});
  };
  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const promises = selectedLocations.map(async (item, index) => {
        if (
          !item ||
          !item.packageWeight ||
          !item.pickupAddress ||
          !item.deliveryAddress ||
          !item.vehicleType
        ) {
          console.log(`Invalid item at index ${index}:`, item);
          return null;
        }

        const {packageWeight, pickupAddress, deliveryAddress, vehicleType} =
          item;
        const response = await dispatch(
          fetchLogisticsCompanies({
            packageWeight,
            pickupAddress,
            deliveryAddress,
            vehicleType,
          }),
        );
        setLoading(false);
        console.log(`Request at index ${index}:`, {
          packageWeight,
          pickupAddress,
          deliveryAddress,
          vehicleType,
        });
        console.log(
          `Response at index ${index}:`,
          response.payload?.data?.vehiclesWithCalculatedCosts,
        );

        return {
          index,
          request: {
            packageWeight,
            pickupAddress,
            deliveryAddress,
            vehicleType,
          },
          response: response.payload?.data?.vehiclesWithCalculatedCosts,
        };
      });
      const results = await Promise.all(promises);
      setLoading(false);
      //console.log("Results:", results);
      setResults(results);
    } catch (error) {
      setLoading(false);
      //console.error("An error occurred:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    handleButtonClick();
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      handleButtonClick();
    }, []),
  );

  const renderItem = ({item}) => (
    <View
      style={{
        marginBottom: 8,
        marginLeft: 12,
        marginRight: 12,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#f1c40f',
          minHeight: 50,
          borderRadius: 4,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
        }}
        onPress={() => toggleDetails(item?.index)}>
        <Text
          style={{
            fontFamily: 'MontserratBold',
            fontSize: 12,
            width: '92%',
          }}>{`Delivery Address: ${item?.request?.deliveryAddress}`}</Text>

        {isDetailsVisible[item?.index] ? (
          <ArrowDownIcon color="#000" width={20} height={20} />
        ) : (
          <ArrowUpSVG color="#000" width={20} height={20} />
        )}
      </TouchableOpacity>
      {isDetailsVisible[item?.index] &&
        item?.response?.map((responseItem, subIndex) => (
          <MultiRideSquares
            key={subIndex}
            companyName={responseItem?.name}
            pickupTime={responseItem?.pickupDuration}
            deliveryTime={responseItem?.deliveryDuration}
            price={responseItem?.cost?.toLocaleString()}
            iconSource={{uri: responseItem?.logo}}
            borderColor={
              selectedItemIndex[item?.index]?.rideOption === responseItem
                ? '#f1c40f'
                : '#000'
            }
            onPress={() => handleItemPress(item?.index, responseItem)}
          />
        ))}
    </View>
  );
  const calculateTotalCost = () => {
    const selectedItemsArray = Object.values(selectedItemIndex).flat();
    const totalCost = selectedItemsArray.reduce(
      (acc, item) => acc + item?.rideOption?.cost,
      0,
    );
    return totalCost;
  };

  const renderNextButton = () => {
    const totalCost = calculateTotalCost();

    const selectedIndexes = Object.keys(selectedItemIndex);

    if (selectedIndexes.length === selectedLocations.length) {
      return (
        <View
          style={{
            height: 'auto',
            width: 'auto',
            backgroundColor: '#f1c40f',
            margin: 12,
            borderRadius: 12,
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <Text
            style={{
              fontFamily: 'MontserratRegular',
              fontSize: 12,
              marginTop: 8,
            }}>
            Total Selected Cost:
          </Text>
          <Text
            style={{
              fontFamily: 'MontserratBold',
              fontSize: 12,
              marginTop: 12,
            }}>
            ₦{totalCost?.toLocaleString('en-NG')}
          </Text>

          <TouchableOpacity
            style={{
              height: 55,
              width: 'auto',
              borderColor: '#000',
              backgroundColor: '#fff',
              borderWidth: 1.4,
              borderRadius: 8,
              marginTop: 48,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleProceedPress}>
            <Text
              style={{
                fontFamily: 'MontserratBold',
                fontSize: 12,
              }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        flex: 1,
        paddingTop: 64,
      }}>
      <View>
        {results?.length === 0 ? (
          loading ? (
            <Text
              style={{
                backgroundColor: '#f1c40f25',
                color: '#f1c40f',
                textAlign: 'center',
                padding: 24,
                margin: 24,
                fontFamily: 'MontserratBold',
                fontSize: 14,
              }}>
              Loading...
            </Text>
          ) : (
            <Text
              style={{
                backgroundColor: '#f1c40f25',
                color: '#f1c40f',
                textAlign: 'center',
                padding: 24,
                margin: 24,
                fontFamily: 'MontserratBold',
                fontSize: 14,
              }}>
              does not exist
            </Text>
          )
        ) : null}

        {results?.length === undefined ? (
          <Text
            style={{
              backgroundColor: '#f1c40f25',
              color: '#f1c40f',
              textAlign: 'center',
              padding: 24,
              margin: 24,
              fontFamily: 'MontserratBold',
              fontSize: 14,
            }}>
            An error occurred while loading
          </Text>
        ) : null}
      </View>
      <View
        style={{
          marginTop: 64,
        }}>
        {renderNextButton()}
        <FlatList
          data={results}
          // // key={index}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={item => item?.response?.vehicleID?.toString()}
          style={{backgroundColor: theme.background}}
        />
      </View>
    </SafeAreaView>
  );
};

export default GetMultipleRide;
