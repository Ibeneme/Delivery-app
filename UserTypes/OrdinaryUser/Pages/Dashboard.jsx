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
import {useTheme} from '../../../Providers/ThemeProvider';
import {formattedDate} from './Extras/GetTime';
import DashboardSquares from './Extras/Components/DashboardSquares';
import OrderSquares from './Extras/Components/Order';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllDeliveries} from '../../../Redux/Deliveries/Deliveries';
import {fetchUser} from '../../../Redux/Users/Users';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import {fetchNotifications} from '../../../Redux/Notifications/Notifications';
// import { subscribeToPushNotifications } from "../../../Redux/Notifications/PushNotification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Localizationn from './Localization/Localization';
import i18n from './Localization/i18n';
import {useLocalization} from './Localization/LocalizationContext';
import ArrowRight from '../Icons/ArrowRight';
import {LockIcon} from '../Icons/AllIcons';

const Dashboard = props => {
  const ststae = useSelector(state => state.pushSubscription);

  // useEffect(() => {
  //   const getTokenAndSubscribe = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("expoPushToken");
  //       if (token) {
  //         const mobile = "mobile";
  //         const response = await dispatch(
  //           subscribeToPushNotifications({
  //             pushToken: token,
  //             deviceType: mobile,
  //           })
  //         );
  //         console.log("Success:", response);
  //       } else {
  //         console.log(error, "Token not found in AsyncStorage");
  //       }
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   };

  //   getTokenAndSubscribe();
  // }, [dispatch]);

  console.log(ststae, 'ststae');
  const userr = useSelector(state => state.profile?.success?.data?.fullName);
  const user = useSelector(state => state.auth.user);
  const ordinaryUserId = user?.ordinaryUserId;

  useEffect(() => {
    dispatch(fetchUser({ordinaryUserId}))
      .then(response => {
        setFullName(response?.payload?.data?.fullName);
      })
      .catch(error => {});
  }, [userr]);

  const notifications = useSelector(
    state => state.notifications?.notifications,
  );
  const loadingNotifications = useSelector(
    state => state.notifications.loading,
  );
  const successNotifications = useSelector(
    state => state.notifications.success,
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

  // const DashboardSquares = ({
  //   //iconName,
  //   totalDeliveries,
  //   totalText,
  // }) => {
  //   return (
  //     <View style={styles.containerfirst}>
  //       <View style={styles.orderView}>
  //         <View>
  //           {/* {iconName ? (
  //             <FontAwesome5 color="#f1c40f" name={iconName} size={20} />
  //           ) : null} */}
  //         </View>
  //         <Text style={styles.passwordtext}>{totalDeliveries}</Text>
  //         <Text style={styles.text}>{totalText}</Text>
  //       </View>
  //     </View>
  //   );
  // };
  const numberOfUnreadNotifications = unreadNotifications?.length;
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [nameFul, setFullName] = useState('');
  const [deliveries, setDeliveries] = useState('');
  const [totalDeliveries, setTotalDeliveries] = useState('');
  const [pendingDeliveries, setPendingDeliveries] = useState('');
  const [assignedDeliveries, setAssignedDeliveries] = useState('');
  const [deliveredDeliveries, setDeliveredDeliveries] = useState('');
  const [receivedDeliveries, setReceivedDeliveries] = useState('');
  const [cancelledDeliveries, setCanceledDeliveries] = useState('');
  const [acceptedDeliveries, setAcceptedDeliveries] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const data = useSelector(state => state.delivery?.success?.data);

  const {success} = useSelector(state => state.delivery);

  const fetchDeliveries = useCallback(() => {
    dispatch(fetchAllDeliveries())
      .then(response => {
        // setIsLoading(false)
        const responseData = response?.payload?.data || [];
        const deliveryStatusCounts = responseData.reduce((counts, delivery) => {
          counts[delivery.status] = (counts[delivery.status] || 0) + 1;
          return counts;
        }, {});

        setDeliveries(responseData);
        setTotalDeliveries(responseData?.length);
        setPendingDeliveries(deliveryStatusCounts['pending'] || 0);
        setAssignedDeliveries(deliveryStatusCounts['inTransit'] || 0);
        setDeliveredDeliveries(deliveryStatusCounts['delivered'] || 0);
        setCanceledDeliveries(deliveryStatusCounts['cancelled'] || 0);
        setReceivedDeliveries(deliveryStatusCounts['received'] || 0);
        setAcceptedDeliveries(deliveryStatusCounts['accepted'] || 0);
      })
      .catch(error => {
        setError(error);
      });
  }, [
    dispatch,
    setDeliveries,
    setTotalDeliveries,
    setPendingDeliveries,
    setAssignedDeliveries,
    setDeliveredDeliveries,
    setCanceledDeliveries,
    setAcceptedDeliveries,
    setReceivedDeliveries,
    setError,
  ]);

  useEffect(() => {
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

  useEffect(() => {
    if (Array.isArray(success?.data)) {
      const pendingCount =
        success?.data?.filter(item => item.status === 'pending').length || 0;
      const assignedCount =
        success?.data?.filter(item => item.status === 'assigned').length || 0;
      const deliveredCount =
        success?.data?.filter(item => item.status === 'delivered').length || 0;

      const cancelledCount =
        success?.data?.filter(item => item.status === 'cancelled').length || 0;

      const acceptedCount =
        success?.data?.filter(item => item.status === 'accepted').length || 0;

      const receivedCount =
        success?.data?.filter(item => item.status === 'received').length || 0;
      setDeliveries(success);
      setTotalDeliveries(success?.data?.length || 0);
      setPendingDeliveries(pendingCount);
      setAssignedDeliveries(assignedCount);
      setDeliveredDeliveries(deliveredCount);
      setReceivedDeliveries(receivedCount);
      setCanceledDeliveries(cancelledCount);
      setAcceptedDeliveries(acceptedCount);
    } else {
    }
  }, [success?.data]);

  const navigation = useNavigation();
  const {theme} = useTheme();
  const headerTintColor = theme.text;
  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
    borderBottomWidth: 0,
  };
  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        ...headerStyle,
      },
      headerTitleStyle,
      headerTintColor,
      headerBackTitleVisible: false,
      headerTitle: () => <View style={styles.headerContainer}></View>,
    });
  }, [navigation, theme]);

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: '#f1c40f',
    },
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
      fontSize: 14,
      marginBottom: 0,
      color: `${theme.text}`,
      fontFamily: 'MontserratBold',
    },
    greetings: {
      fontSize: 16,
      marginBottom: 4,
      color: `${theme.text}`,
      fontFamily: 'MontserratBold',
    },
    currentTime: {
      fontSize: 14,
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
  const [name, setName] = useState('');

  const navigateSpecifiDelivery = id => {
    navigation.navigate('Orderdetails', {
      deliveryID: id,
    });
  };

  const imageLoader = require('../../../assets/QuicklogisticsLogo/Logo.png');
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

  const displayName = name?.charAt(0).toUpperCase() + name?.slice(1);
  const [fabVisible, setFabVisible] = useState(true);

  const {locale, changeLanguage} = useLocalization();

  const t = key => i18n.t(key);

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        {backgroundColor: theme.background, minHeight: screenHeight},
      ]}>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(fetchAllDeliveries())}
          />
        }
        ListHeaderComponent={
          <ScrollView
            style={[styles.container, {backgroundColor: theme.background}]}>
            <View style={styles.content}>
              {error && (
                <View
                  style={{
                    backgroundColor: '#f1c40f44',
                    height: 50,
                    marginBottom: 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#f1c40f',
                      fontSize: 14,
                      fontFamily: 'MontserratBold',
                    }}>
                    {error}
                  </Text>
                </View>
              )}
              <View
                style={{
                  backgroundColor: theme.backgroundAuth,
                  padding: 12,
                  borderRadius: 12,
                  gap: 2,
                  marginTop: -20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={[styles.currentTime, {fontSize: 13}]}>
                    {formattedDate()}
                  </Text>
                  <Text style={[styles.greetings, {fontSize: 14}]}>
                    👋 {i18n.t('greeting')} {nameFul}
                  </Text>
                </View>
                {numberOfUnreadNotifications ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Notifications')}
                    style={{position: 'relative', width: 28, height: 28}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Notifications')}
                      style={{
                        position: 'absolute',
                        left: 0,
                      }}>
                      <LockIcon color="#f1c40f" width={24} height={24} />
                    </TouchableOpacity>

                    <View
                      onPress={() => navigation.navigate('Notifications')}
                      style={{
                        backgroundColor: 'red',
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        top: -6,
                        left: -4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'MontserratBold',
                          fontSize: 13,
                          color: '#ffffff',
                        }}>
                        {numberOfUnreadNotifications}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>{''}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('book')}
                  style={{
                    backgroundColor: '#f1c40f',
                    width: '48%',
                    padding: 20,
                    borderRadius: 4,
                    marginTop: 16,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'MontserratBold',
                      textAlign: 'center',
                      fontSize: 12,
                    }}>
                    {i18n.t('book')} +
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewContainer}>
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={totalDeliveries}
                  totalText={i18n.t('total')}
                />
                <DashboardSquares
                  iconName="calendar"
                  totalDeliveries={pendingDeliveries}
                  totalText={i18n.t('pending')}
                />
              </View>

              {acceptedDeliveries || cancelledDeliveries ? (
                <View style={styles.viewContainer}>
                  <DashboardSquares
                    iconName="truck"
                    totalDeliveries={cancelledDeliveries}
                    totalText={i18n.t('cancelled')}
                  />
                  <DashboardSquares
                    iconName="truck"
                    totalDeliveries={acceptedDeliveries}
                    totalText={i18n.t('accepted')}
                  />
                </View>
              ) : null}
              <View style={styles.viewContainer}>
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={assignedDeliveries}
                  totalText={i18n.t('transit')}
                />
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={deliveredDeliveries}
                  totalText={i18n.t('delivered')}
                />
              </View>
              {receivedDeliveries ? (
                <View style={styles.viewContainer}>
                  <DashboardSquares
                    iconName="truck"
                    totalDeliveries={receivedDeliveries}
                    totalText={i18n.t('received')}
                  />
                </View>
              ) : null}
            </View>
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
                    {i18n.t('recent')}
                  </Text>
                </View>

                <View>
                  <View>
                    <FlatList
                      data={sortedDaysAndDates}
                      keyExtractor={dayAndDate => dayAndDate}
                      renderItem={({item: dayAndDate}) => (
                        <View key={dayAndDate}>
                          <Text style={styles.dayAndDate}>{dayAndDate}</Text>
                          {groupedDeliveries[dayAndDate]?.map(delivery => (
                            <View
                              style={styles.orderscolumn}
                              key={delivery?.id}>
                              <OrderSquares
                                pickupInfo={` ${delivery?.pickupAddress}`}
                                recieversName={` ${i18n.t('receiver')}: ${
                                  delivery?.receiverName
                                }`}
                                deliveryInfo={`${delivery?.deliveryAddress}`}
                                button={delivery?.status}
                                buttonBackgroundColor={'#00000000'}
                                buttonBorderColor={'#f1c40f'}
                                textColor={'#f1c40f'}
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
                            onPress={() => navigation.navigate('Book Rider')}>
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
                                  fontSize: 12,
                                }}>
                                No Recent Orders
                              </Text>
                              <Text
                                style={{
                                  color: '#D6AD08',
                                  textAlign: 'left',
                                  fontSize: 14,
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
                            {/* <Icon
                              name="arrow-right"
                              size={16}
                              color="#f1c40f"
                            /> */}
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        }
      />
    </SafeAreaView>
  );
};

export default Dashboard;
