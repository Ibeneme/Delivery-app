import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../Providers/ThemeProvider';
import {formattedDate} from '../OrdinaryUser/Pages/Extras/GetTime';
import DashboardSquares from '../OrdinaryUser/Pages/Extras/Components/DashboardSquares';
import OrderSquares from '../OrdinaryUser/Pages/Extras/Components/Order';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllDeliveries} from '../../Redux/Deliveries/Deliveries';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import {fetchNotifications} from '../../Redux/Notifications/Notifications';
// import {FontAwesome5} from 'react-native-vector-icons';
import {
  fetchLogisticsDeliveries,
  updateDeliveryStatus,
} from '../../Redux/Logistics/Deliveries';
import {fetchUserLogisticsHere} from '../../Redux/Users/Test';
import ChartExample from './component/Chart';
import {fetchUserLogistics} from '../../Redux/Users/Profile';
import OrderSquaresLogistics from './component/OrderSquare';
import IconSquares from '../OrdinaryUser/Pages/Extras/Components/IconSquares';
const imageLoader = require('../../assets/QuicklogisticsLogo/Logo.png');
const screenHeight = Dimensions.get('window').height;

import {useLocalization} from '../OrdinaryUser/Pages/Localization/LocalizationContext';
import i18n from '../OrdinaryUser/Pages/Localization/i18n';
import {LockIcon} from '../OrdinaryUser/Icons/AllIcons';
const LogisticsDashboard = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {theme} = useTheme();
  const userr = useSelector(state => state?.auth.user);
  const [success, setSuccess] = useState('');
  //console.log(success, "successsuccess");
  const profile = useSelector(state => state.userProfile);
  const profileData = useSelector(state => state.auth.user);
  const logisticUserId = profileData.logisticUserId;

  console.log(profileData, 'responseresponse');
  const userrr = useSelector(state => state.profile?.success);
  useEffect(() => {
    dispatch(fetchUserLogistics(logisticUserId))
      .then(response => {
        console.log(
          response?.payload?.data,
          'responseresponseresponseresponse',
        );
        console.log(userrr?.data, 'cnn');
        const dataa = response?.payload?.data;
        setSuccess(dataa);
        console.log(dataa, 'lll');
      })
      .catch(error => {
        console.log(error, 'cnn');
        //console.log(error, "propsee");
      });
  }, [profile?.success?.data?.logisticsName]);
  console.log(success);

  useEffect(() => {}, [[profile?.success?.data?.logisticsName], profile]);
  const notifications = useSelector(
    state => state?.notifications?.notifications,
  );
  const loadingNotifications = useSelector(
    state => state?.notifications.loading,
  );
  const successNotifications = useSelector(
    state => state?.notifications.success,
  );

  const newuserr = useSelector(state => state?.profile);
  const newuser = useSelector(
    state => state.profileTwo?.success?.data?.logisticsName,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [nameFul, setFullName] = useState('');
  const [deliveries, setDeliveries] = useState('');
  const [totalDeliveries, setTotalDeliveries] = useState('');
  const [pendingDeliveries, setPendingDeliveries] = useState('');
  const [assignedDeliveries, setAssignedDeliveries] = useState('');
  const [deliveredDeliveries, setDeliveredDeliveries] = useState('');
  const [inTransit, setInTransitDeliveries] = useState('');
  const [accepted, setAcceptDeliveries] = useState('');
  const [received, setReceivedDeliveries] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const unreadNotifications = notifications?.data?.filter(
    notification => notification.isRead === false,
  );

  const logisticsId = userr.logisticUserId;
  const numberOfUnreadNotifications = unreadNotifications?.length;

  useEffect(() => {
    dispatch(fetchUserLogistics({logisticsId}))
      .then(response => {
        setFullName(response?.payload?.data?.logisticsName);
      })
      .catch(error => {});
  }, [userr, newuser]);

  useEffect(() => {
    if (loadingNotifications) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, successNotifications, loadingNotifications]);

  const [orders, setOrders] = useState([]);

  const fetchDeliveries = async () => {
    try {
      const response = await dispatch(fetchLogisticsDeliveries());
      const responseData = response?.payload;

      setDeliveries(responseData);
      setIsLoading(false);
      if (Array.isArray(responseData?.data)) {
        const totalItems = responseData.data.length;
        setTotalDeliveries(totalItems);
        const pendingItems = responseData.data.filter(
          delivery => delivery.status === 'pending',
        ).length;
        setPendingDeliveries(pendingItems);
        const transitItems = responseData.data.filter(
          delivery => delivery.status === 'inTransit',
        ).length;
        setInTransitDeliveries(transitItems);
        const deliveredItems = responseData.data.filter(
          delivery => delivery.status === 'delivered',
        ).length;
        setDeliveredDeliveries(deliveredItems);
        const acceptedItems = responseData.data.filter(
          delivery => delivery.status === 'accepted',
        ).length;
        setAcceptDeliveries(acceptedItems);
        const receivedItems = responseData.data.filter(
          delivery => delivery.status === 'inTransit',
        ).length;
        setReceivedDeliveries(receivedItems);
        const assignedItems = responseData.data.filter(
          delivery => delivery.status === 'cancelled',
        ).length;
        setAssignedDeliveries(assignedItems);
      } else {
        setTotalDeliveries(0);
        setPendingDeliveries(0);
        setAssignedDeliveries(0);
        setDeliveredDeliveries(0);
        setInTransitDeliveries(0);
        setReceivedDeliveries(0);
      }
    } catch (error) {
      setError(error);
    }
  };

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

  // const fetchDeliveries = useCallback(async () => {
  //   try {
  //     const response = await dispatch(fetchLogisticsDeliveries());
  //     const responseData = response?.payload;
  //     setDeliveries(responseData);
  //     setIsLoading(false);
  //     if (Array.isArray(responseData?.data)) {
  //       const totalItems = responseData.data.length;
  //       setTotalDeliveries(totalItems);
  //       const pendingItems = responseData.data.filter(
  //         (delivery) => delivery.status === "pending"
  //       ).length;
  //       setPendingDeliveries(pendingItems);
  //       const transitItems = responseData.data.filter(
  //         (delivery) => delivery.status === "inTransit"
  //       ).length;
  //       setInTransitDeliveries(transitItems);
  //       const deliveredItems = responseData.data.filter(
  //         (delivery) => delivery.status === "delivered"
  //       ).length;
  //       setDeliveredDeliveries(deliveredItems);
  //       const acceptedItems = responseData.data.filter(
  //         (delivery) => delivery.status === "accepted"
  //       ).length;
  //       setAcceptDeliveries(acceptedItems);
  //       const receivedItems = responseData.data.filter(
  //         (delivery) => delivery.status === "inTransit"
  //       ).length;
  //       setReceivedDeliveries(receivedItems);
  //       const assignedItems = responseData.data.filter(
  //         (delivery) => delivery.status === "cancelled"
  //       ).length;
  //       setAssignedDeliveries(assignedItems);
  //     } else {
  //       setTotalDeliveries(0);
  //       setPendingDeliveries(0);
  //       setAssignedDeliveries(0);
  //       setDeliveredDeliveries(0);
  //       setInTransitDeliveries(0);
  //       setReceivedDeliveries(0);
  //     }
  //   } catch (error) {
  //     setError(error);
  //   }
  // }, [
  //   dispatch,
  //   setDeliveries,
  //   setIsLoading,
  //   setTotalDeliveries,
  //   setPendingDeliveries,
  //   setAssignedDeliveries,
  //   setDeliveredDeliveries,
  //   setError,
  //   setInTransitDeliveries,
  //   setReceivedDeliveries,
  // ]);

  useEffect(() => {
    dispatch(fetchLogisticsDeliveries());
    fetchDeliveries();
  }, [dispatch, newuserr]);

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
  const headerTintColor = theme.text;
  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
    borderBottomWidth: 0,
    fontSize: 14,
  };
  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
    fontSize: 14,
  };

  const styles = StyleSheet.create({
    orderscolumn: {
      flexDirection: 'column',
      gap: 12,
      marginBottom: 12,
    },
    dayAndDate: {
      color: `${theme.text}85`,
      fontFamily: 'MontserratBold',

      marginTop: 32,
      marginBottom: 10,
      textAlign: 'left',
      fontSize: 12,
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
      fontSize: 16,
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
    containerfirst: {
      color: '#ffffff',
      height: '100%',
      padding: 16,
    },
    modalContainer: {
      backgroundColor: '#00000050',
      flex: 1,
      flexGrow: 1,
      bottom: 0,
      position: 'relative',
      paddingBottom: 48,
    },
    modalContainerView: {
      height: 'auto',
      bottom: 0,
      position: 'absolute',
      width: '100%',
      backgroundColor: '#f1c40f',
      borderRadius: 21,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: 200,
      width: '100%',
    },
    modalContents: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    address: {
      fontFamily: 'MontserratBold',
      textAlign: 'left',
      fontSize: 12,
      marginBottom: 4,
    },
    addressNext: {
      fontFamily: 'MontserratRegular',
      fontSize: 12,
      marginBottom: 4,
    },
    modalText: {
      fontFamily: 'MontserratBold',
      fontSize: 16,
      marginBottom: 12,
      marginTop: 6,
      color: theme.text,
    },
    modalTexts: {
      fontFamily: 'MontserratRegular',
      fontSize: 12,
      marginBottom: 3,
      marginTop: 3,
      color: `${theme.text}85`,
    },
    modalViews: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    touchs: {
      height: 55,
      width: '100%',
      backgroundColor: '#000000',
      marginTop: 24,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    touchsText: {
      color: '#f1c40f',
      fontFamily: 'MontserratBold',
      fontSize: 14,
    },
    touchsTexts: {
      color: '#000000',
      fontFamily: 'MontserratBold',
      fontSize: 14,
    },
    touchss: {
      height: 55,
      width: '100%',
      borderColor: '#000000',
      borderWidth: 2,
      marginBottom: 0,
      marginTop: 8,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const logisticsDeliveries = useSelector(
    state => state?.deliveriesLogistics?.deliveries?.data,
  );

  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const filteredDeliveries = logisticsDeliveries?.filter(item => {
    if (selectedStatusFilter === 'all') {
      return true; // Show all items when "all" is selected
    } else {
      return item.status === selectedStatusFilter;
    }
  });
  const delivery = useSelector(state => state.delivery);

  const {loading} = useSelector(state => state.deliveriesLogistics);
  const [reload, setReload] = useState(0);

  const handleRefresh = () => {
    dispatch(fetchLogisticsDeliveries());
    setRefreshing(true);
  };
  const handleUpdateStatusDeclined = () => {
    const res = dispatch(
      updateDeliveryStatus({deliveryId: selectedItem?.id, status: 'declined'}),
    );
    console.log(selectedItem.id, selectedItem.status, 'nexttt');
    dispatch(fetchLogisticsDeliveries());
    handleRefresh();
    setReload(prevReload => prevReload + 1);
    handleRefresh();
    handleRefresh();
    setModalVisible(false);
  };

  const handleUpdateStatusAccept = selectedItem => {
    const res = dispatch(
      updateDeliveryStatus({deliveryId: selectedItem?.id, status: 'accepted'}),
    );
    console.log(selectedItem.id, selectedItem.status, 'nexttt');
    dispatch(fetchLogisticsDeliveries());
    handleRefresh();
    setReload(prevReload => prevReload + 1);
    handleRefresh();
    handleRefresh();
    setModalVisible(false);
  };

  const handleUpdateStatusCancelled = selectedItem => {
    const res = dispatch(
      updateDeliveryStatus({
        deliveryId: selectedItem?.id,
        status: 'cancelled',
      }),
    );
    console.log(selectedItem.id, selectedItem.status, 'nexttt');
    dispatch(fetchLogisticsDeliveries());
    handleRefresh();
    setReload(prevReload => prevReload + 1);
    handleRefresh();
    handleRefresh();
    setModalVisible(false);
  };

  const handleUpdateStatusIntransit = selectedItem => {
    const res = dispatch(
      updateDeliveryStatus({
        deliveryId: selectedItem?.id,
        status: 'inTransit',
      }),
    );
    console.log(selectedItem.id, selectedItem.status, 'nexttt');
    dispatch(fetchLogisticsDeliveries());
    handleRefresh();
    setReload(prevReload => prevReload + 1);
    handleRefresh();
    handleRefresh();
    setModalVisible(false);
  };

  const handleUpdateStatusDelivered = selectedItem => {
    const deliveryId = selectedItem?.id;
    const statuss = 'delivered';
    setIsLoadingg(true);
    dispatch(updateDeliveryStatus({deliveryId: deliveryId, status: statuss}))
      .then(response => {
        console.log(response, selectedItem);
        dispatch(fetchLogisticsDeliveries());
        setReload(prevReload => prevReload + 1);
        handleRefresh();
        setIsLoadingg(false);
        setModalVisible(false);
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchLogisticsDeliveries());
    }
  }, [isLoading]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handlePhonePress = () => {
    const phoneNumber = selectedItem.receiverPhoneNumber;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        {backgroundColor: theme.background, minHeight: screenHeight},
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => dispatch(fetchLogisticsDeliveries())}
        />
      }>
      <ScrollView>
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
            <View style={styles.content}>
              {error ? (
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
              ) : null}
              <View
                style={{
                  backgroundColor: theme.backgroundAuth,
                  padding: 12,
                  borderRadius: 12,
                  gap: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: -20,
                }}>
                <View>
                  <Text style={[styles.currentTime, {fontSize: 12}]}>
                    {formattedDate}
                  </Text>
                  <Text style={[styles.greetings, {fontSize: 14}]}>
                    👋 Hello, {success?.logisticsName}
                  </Text>
                </View>
                {numberOfUnreadNotifications ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Notifications')}
                    //onPress={() => navigation.navigate("locationGD")}

                    style={{position: 'relative', width: 28, height: 28}}>
                    <LockIcon color="#f1c40f" width={24} height={24} />

                    <View
                      style={{
                        backgroundColor: 'red',
                        width: 'auto',
                        height: 'auto',
                        padding: 2,
                        borderRadius: 20,
                        top: -6,
                        left: -4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'MontserratBold',
                          fontSize: 12,
                          color: '#ffffff',
                        }}>
                        {numberOfUnreadNotifications}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={styles.viewContainer}>
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={totalDeliveries}
                  totalText="Total Deliveries"
                />
                <DashboardSquares
                  iconName="calendar"
                  totalDeliveries={pendingDeliveries}
                  totalText="Pending Orders"
                />
              </View>
              <View style={styles.viewContainer}>
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={accepted}
                  totalText="Accepted"
                />
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={assignedDeliveries}
                  totalText="Cancelled Order"
                />
              </View>
              <View style={styles.viewContainer}>
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={inTransit}
                  totalText="In Transit Orders"
                />
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={deliveredDeliveries}
                  totalText="Delivered Orders"
                />
              </View>
              <View style={styles.viewContainer}>
                <DashboardSquares
                  iconName="truck"
                  totalDeliveries={received}
                  totalText="Confirmed as Received"
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 36,
                borderRadius: 12,
                marginBottom: 120,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'MontserratBold',
                  marginBottom: 4,
                  marginTop: 36,
                  color: theme.text,
                }}>
                Most Recent Orders
              </Text>
              <View style={{marginTop: 10}}>
                {filteredDeliveries?.map(item => (
                  <OrderSquaresLogistics
                    key={item.id.toString()} // Don't forget to add a unique key
                    pickupInfo={item.pickupAddress}
                    deliveryInfo={item.deliveryAddress}
                    recieversName={item.receiverName}
                    button={item.status}
                    onPress={() => openModal(item)} // Open the modal when pressed
                  />
                ))}
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContainerView}>
                    {selectedItem && (
                      <View
                        style={{
                          width: '100%',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'MontserratBold',
                            fontSize: 14,
                            marginBottom: 16,
                            marginTop: 18,
                            textAlign: 'right',
                          }}
                          onPress={closeModal}>
                          Close
                        </Text>
                        <View style={styles.modalContents}>
                          <IconSquares
                            //iconName="car"
                            ImageBackgroundColor={'#000000'}
                            IconColor={'#f1c40f'}
                          />
                        </View>
                        <Text
                          style={{
                            fontFamily: 'MontserratBold',
                            width: '100%',
                            textAlign: 'center',
                            fontSize: 14,
                            marginTop: 12,
                            marginBottom: 4,
                          }}>
                          NGN {selectedItem.cost}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'MontserratRegular',
                            width: '100%',
                            textAlign: 'center',
                            fontSize: 14,
                          }}>
                          Receiver: {selectedItem.receiverName}
                        </Text>
                        <TouchableOpacity onPress={handlePhonePress}>
                          <Text
                            style={{
                              fontFamily: 'MontserratRegular',
                              width: '100%',
                              textAlign: 'center',
                              fontSize: 14,
                            }}>
                            Contact: {selectedItem.receiverPhoneNumber}
                          </Text>
                        </TouchableOpacity>

                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            gap: 2,
                            marginTop: 16,
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              width: '49%',
                            }}>
                            <Text style={styles.address}>Pickup Address:</Text>
                            <Text style={styles.addressNext}>
                              {selectedItem.pickupAddress}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              width: '49%',
                            }}>
                            <Text
                              style={[styles.address, {textAlign: 'right'}]}>
                              Delivery Address:
                            </Text>
                            <Text
                              style={[
                                styles.addressNext,
                                {textAlign: 'right'},
                              ]}>
                              {selectedItem.deliveryAddress}
                            </Text>
                          </View>
                        </View>
                        <View style={{marginTop: 24}}>
                          <View style={[styles.modalViews]}>
                            <Text style={styles.addressNext}>
                              Package Weight
                            </Text>
                            <Text
                              style={[
                                styles.addressNext,
                                {textAlign: 'right'},
                              ]}>
                              {selectedItem.packageWeight}
                            </Text>
                          </View>
                          <View style={[styles.modalViews]}>
                            <Text style={styles.addressNext}>
                              Email Address
                            </Text>
                            <Text
                              style={[
                                styles.addressNext,
                                {textAlign: 'right'},
                              ]}>
                              {selectedItem.receiverEmail}
                            </Text>
                          </View>
                          <View style={[styles.modalViews]}>
                            <Text style={styles.addressNext}>
                              Payment Status
                            </Text>
                            <Text
                              style={[
                                styles.addressNext,
                                {textAlign: 'right'},
                              ]}>
                              {selectedItem.paymentStatus}
                            </Text>
                          </View>
                          <View style={[styles.modalViews]}>
                            <Text style={styles.addressNext}>
                              Payment Method
                            </Text>
                            <Text
                              style={[
                                styles.addressNext,
                                {textAlign: 'right'},
                              ]}>
                              {selectedItem.paymentMethod}
                            </Text>
                          </View>
                          {/* <View style={[styles.modalViews]}>
                    <Text style={styles.addressNext}>Payment Status</Text>
                    <Text style={[styles.addressNext, { textAlign: "right" }]}>
                      {selectedItem.paymentMethod === 'wallet'? 'paid' : null}
                      {selectedItem.paymentMethod === 'card'? 'paid' : null}
                      {selectedItem.paymentMethod === 'cash'? 'unpaid' : null}
                    </Text>
                  </View> */}
                        </View>

                        {selectedItem.status === 'pending' ? (
                          <TouchableOpacity
                            style={[styles.touchs]}
                            onPress={() =>
                              handleUpdateStatusAccept(selectedItem)
                            }>
                            <Text style={[styles.touchsText]}>
                              Approve Delivery Request
                            </Text>
                          </TouchableOpacity>
                        ) : null}

                        {selectedItem.status === 'pending' ? (
                          <TouchableOpacity
                            style={[styles.touchss]}
                            onPress={() =>
                              handleUpdateStatusDeclined(selectedItem)
                            }>
                            <Text style={[styles.touchsTexts]}>
                              Decline Delivery Request
                            </Text>
                          </TouchableOpacity>
                        ) : null}

                        {selectedItem.status === 'accepted' ? (
                          <TouchableOpacity
                            style={[styles.touchs]}
                            onPress={() =>
                              handleUpdateStatusIntransit(selectedItem)
                            }>
                            <Text style={[styles.touchsText]}>
                              Transit Delivery Request
                            </Text>
                          </TouchableOpacity>
                        ) : null}

                        {selectedItem.status === 'accepted' ? (
                          <TouchableOpacity
                            style={[styles.touchss]}
                            onPress={() =>
                              handleUpdateStatusCancelled(selectedItem)
                            }>
                            <Text style={[styles.touchsTexts]}>
                              Cancel Delivery Request
                            </Text>
                          </TouchableOpacity>
                        ) : null}

                        {selectedItem.status === 'inTransit' ? (
                          <TouchableOpacity
                            style={[styles.touchs]}
                            onPress={() =>
                              handleUpdateStatusDelivered(selectedItem)
                            }>
                            <Text style={[styles.touchsText]}>Delivered</Text>
                          </TouchableOpacity>
                        ) : null}
                        {/* {selectedItem.status === "delivered" ? (
                  <TouchableOpacity
                    style={[styles.touchss]}
                    onPress={() => handleUpdateStatusReceived(selectedItem)}
                  >
                    <Text style={[styles.touchsTexts]}>
                      Received By the Receiver
                    </Text>
                  </TouchableOpacity>
                ) : null} */}
                      </View>
                    )}
                  </View>
                </View>
              </Modal>

              {/*             
              <FlatList
                data={sortedDaysAndDates}
                keyExtractor={(dayAndDate) => dayAndDate}
                renderItem={({ item: dayAndDate }) => (
                  <View
                    key={dayAndDate}
                    style={{
                   
                    }}
                  >
                    <Text style={styles.dayAndDate}>{dayAndDate}</Text>
                    {groupedDeliveries[dayAndDate]?.map((delivery) => (
                      <View style={styles.orderscolumn} key={delivery?.id}>
                        <OrderSquares
                          pickupInfo={` ${delivery?.pickupAddress}`}
                          recieversName={` Receivers Name: ${delivery?.receiverName}`}
                          deliveryInfo={`${delivery?.deliveryAddress}`}
                          button={delivery?.status}
                          buttonBackgroundColor={"#00000000"}
                          buttonBorderColor={"#f1c40f"}
                          textColor={"#f1c40f"}
                          onPress={() => navigateSpecifiDelivery(delivery?.id)}
                        />
                      </View>
                    ))}
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      marginTop: 24,
                      textAlign: "center",
                      fontFamily: "MontserratBold",
                      color: `${theme.text}`,
                      width: "100%",
                    }}
                  >
                    {deliveries?.error === "Resource Not Found" ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#ff000021",
                          width: "100%",
                          padding: 18,
                        }}
                      >
                        <Text
                          style={{
                            color: "#ff0000",
                            fontSize: 16,
                            textAlign: "center",
                            fontFamily: "MontserratBold",
                          }}
                        >
                          Server Downtime, Resource Not Found
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#f1c40f17",
                          width: "100%",
                          padding: 18,
                          alignItems: "center",
                          height: "auto",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          borderRadius: 13,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            gap: 5,
                            marginTop: 12,
                            marginBottom: 12,
                          }}
                        >
                          <Text
                            style={{
                              color: "#D6AD08",
                              textAlign: "left",
                              fontFamily: "MontserratRegular",
                              fontSize: 16,
                            }}
                          >
                            No Recent Orders
                          </Text>
                        </View>
                        <Icon name="arrow-right" size={16} color="#f1c40f" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              /> */}
            </View>
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogisticsDashboard;
