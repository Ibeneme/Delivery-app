import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../Providers/ThemeProvider';
import OrderSquares from '../Extras/Components/Order';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllDeliveries} from '../../../../Redux/Deliveries/Deliveries';
import {fetchUser} from '../../../../Redux/Users/Users';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchNotifications} from '../../../../Redux/Notifications/Notifications';
import ArrowRight from '../../Icons/ArrowRight';

const NewDeliveries = props => {
  const userr = useSelector(state => state?.profile?.data?.data?.fullName);

  useEffect(() => {
    dispatch(fetchUser({ordinaryUserId}))
      .then(response => {
        setFullName(response?.payload?.data?.fullName);
      })
      .catch(error => {});
  }, [userr]);

  const notifications = useSelector(
    state => state?.notifications?.notifications,
  );
  const loadingNotifications = useSelector(
    state => state?.notifications.loading,
  );
  const successNotifications = useSelector(
    state => state?.notifications.success,
  );

  useEffect(() => {
    dispatch(fetchNotifications());
    if (loadingNotifications) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, successNotifications]);

  useEffect(() => {}, [successNotifications]);

  const unreadNotifications = notifications?.data?.filter(
    notification => notification.isRead === false,
  );

  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [nameFul, setFullName] = useState('');
  const [deliveries, setDeliveries] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDeliveries = useCallback(async () => {
    try {
      const response = await dispatch(fetchAllDeliveries());
      const responseData = response?.payload;
      setDeliveries(responseData);
      setIsLoading(false);
      if (Array.isArray(responseData?.data)) {
        const totalItems = responseData.data.length;
        setTotalDeliveries(totalItems);
      } else {
      }
    } catch (error) {
      setError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(false);
    dispatch(fetchUser({ordinaryUserId}))
      .then(response => {
        setName(response?.payload?.data?.fullName);
      })
      .catch(error => {});
  }, [dispatch, ordinaryUserId]);

  useEffect(() => {
    dispatch(fetchAllDeliveries());
    fetchDeliveries();
  }, [dispatch]);

  const navigation = useNavigation();
  const {theme} = useTheme();
  const headerTintColor = theme.text;

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Order',
      headerStyle: {
        backgroundColor: theme.backgroundAuth,
      },
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
      headerTitle: () => <View style={styles.headerContainer}></View>,
    });
  }, [navigation, theme]);

  const styles = StyleSheet.create({
    dayAndDate: {
      color: `${theme.text}85`,
      fontFamily: 'MontserratBold',
      marginTop: 32,
      marginBottom: 10,
      textAlign: 'left',
      fontSize: 13,
    },
    headerImage: {
      width: 32,
      height: 30,
    },
    headerContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItem: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 16,
    },
    flexview: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      marginTop: 56,
    },

    imag: {
      width: 48,
      height: 48,
      resizeMode: 'contain',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },

    greeting: {
      fontSize: 18,
      marginBottom: 0,
      color: `${theme.text}`,
      fontFamily: 'MontserratBold',
    },
    greetings: {
      fontSize: 18,
      marginBottom: 4,
      color: `${theme.text}`,
      fontFamily: 'MontserratBold',
    },
    currentTime: {
      fontSize: 16,
      marginBottom: 2,
      color: `${theme.text}85`,
      fontFamily: 'MontserratRegular',
    },
    viewContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontFamily: 'MontserratRegular',
    },
    content: {
      marginTop: 24,
    },
    view: {
      width: 100,
      height: 100,
      margin: 16,
      backgroundColor: '#ccc',
    },
    viewOrders: {
      flexDirection: 'column',
      marginTop: 48,
      marginBottom: 120,
    },
    orderscolumn: {
      flexDirection: 'column',
      gap: 12,
      marginBottom: 12,
    },
  });
  const screenHeight = Dimensions.get('window').height;
  const user = useSelector(state => state.auth.user);
  const ordinaryUserId = user?.ordinaryUserId;

  const navigateSpecifiDelivery = id => {
    navigation.navigate('Orderdetails', {
      deliveryID: id,
    });
  };

  const imageLoader = require('../../../../assets/QuicklogisticsLogo/Logo.png');
  function groupDeliveriesByDayAndDate(deliveries) {
    const groupedDeliveries = {};

    deliveries?.forEach(delivery => {
      const createdAt = new Date(delivery.createdAt);
      const dayAndDate = createdAt.toDateString();

      if (!groupedDeliveries[dayAndDate]) {
        groupedDeliveries[dayAndDate] = [];
      }

      groupedDeliveries[dayAndDate]?.push(delivery);
    });

    return groupedDeliveries;
  }

  const groupedDeliveries = groupDeliveriesByDayAndDate(deliveries?.data);
  const sortedDaysAndDates = Object.keys(groupedDeliveries).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB - dateA;
  });

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        {backgroundColor: theme.background, minHeight: screenHeight},
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => dispatch(fetchAllDeliveries())}
        />
      }>
      <FlatList
        data={[null]}
        ListHeaderComponent={
          <>
            {isLoading ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  width: '100%',
                  height: screenHeight,
                  backgroundColor: theme.backgroundAuth,
                }}>
                <View style={{}}>
                  <Image
                    style={{
                      marginTop: -120,
                      width: 48,
                      height: 48,
                    }}
                    source={imageLoader}
                  />
                </View>
              </View>
            ) : (
              <ScrollView
                style={[styles.container, {backgroundColor: theme.background}]}>
                <View>
                  <View style={styles.viewOrders}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        onPress={() => navigation.navigate('Google')}
                        style={[
                          styles.greeting,
                          {fontSize: 14, marginBottom: -12},
                        ]}>
                        All Orders
                      </Text>
                    </View>

                    <View>
                      <View>
                        <FlatList
                          data={sortedDaysAndDates}
                          keyExtractor={dayAndDate => dayAndDate}
                          renderItem={({item: dayAndDate}) => (
                            <View key={dayAndDate}>
                              <Text style={styles.dayAndDate}>
                                {dayAndDate}
                              </Text>
                              {groupedDeliveries[dayAndDate]?.map(delivery => (
                                <View
                                  style={styles.orderscolumn}
                                  key={delivery?.id}>
                                  <OrderSquares
                                    pickupInfo={` ${delivery?.pickupAddress}`}
                                    recieversName={`Receiver: ${delivery?.receiverName}`}
                                    deliveryInfo={`${delivery?.deliveryAddress}`}
                                    button={
                                      delivery?.status
                                      //  === "pending"
                                      //   ? "Pending"
                                      //   : delivery?.status === "inTransit"
                                      //   ? "Assigned"
                                      //   : "Delivered"
                                    }
                                    buttonBackgroundColor={
                                      // delivery?.status === "pending"
                                      //?
                                      '#00000000'
                                      //: delivery?.status === "inTransit"
                                      //? "none"
                                      // : "#f1c40f"
                                    }
                                    buttonBorderColor={
                                      // delivery?.status === "pending"
                                      //   ? "#f1c40f"
                                      //   : delivery?.status === "inTransit"
                                      //   ? "none"
                                      //   :
                                      '#f1c40f'
                                    }
                                    textColor={
                                      // delivery?.status
                                      // === "pending"
                                      //   ?
                                      '#f1c40f'
                                      // : delivery?.status === "inTransit"
                                      // ? "f1c40f"
                                      // : "#000000"
                                    }
                                    onPress={() =>
                                      navigateSpecifiDelivery(delivery?.id)
                                    }
                                  />
                                </View>
                              ))}
                            </View>
                          )}
                          ListEmptyComponent={() => (
                            <View
                              style={{
                                marginTop: 24,
                                textAlign: 'center',
                                fontFamily: 'MontserratBold',
                                color: `${theme.text}`,
                                width: '100%',
                              }}>
                              {deliveries?.error === 'Resource Not Found' ? (
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#ff000021',
                                    width: '100%',
                                    padding: 18,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#ff0000',
                                      fontSize: 14,
                                      textAlign: 'center',
                                      fontFamily: 'MontserratBold',
                                    }}>
                                    Server Downtime, Resource Not Found
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#f1c40f17',
                                    width: '100%',
                                    padding: 18,
                                    alignItems: 'center',
                                    height: 'auto',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderRadius: 13,
                                  }}
                                  onPress={() =>
                                    navigation.navigate('Book Rider')
                                  }>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      gap: 5,
                                      marginTop: 12,
                                      marginBottom: 12,
                                    }}>
                                    <Text
                                      style={{
                                        color: '#D6AD08',
                                        textAlign: 'left',
                                        fontFamily: 'MontserratRegular',
                                        fontSize: 14,
                                      }}>
                                      No Recent Orders
                                    </Text>
                                    <Text
                                      style={{
                                        color: '#D6AD08',
                                        textAlign: 'left',
                                        fontSize: 16,
                                        fontFamily: 'MontserratBold',
                                      }}>
                                      Get Started, Book a rider
                                    </Text>
                                  </View>
                                  <ArrowRight
                                    color="#f1c40f"
                                    width={24}
                                    height={24}
                                  />
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};

export default NewDeliveries;
