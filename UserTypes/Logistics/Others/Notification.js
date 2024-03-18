import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../Providers/ThemeProvider';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchNotifications,
  markNotificationAsRead,
} from '../../../Redux/Notifications/Notifications';
// import Icon from "react-native-vector-icons/FontAwesome";

const Notifications = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const notifications = useSelector(
    state => state?.notifications?.notifications,
  );
  const loading = useSelector(state => state?.notifications.loading);
  const success = useSelector(state => state?.notifications.success);

  //console.log(notifications, "notifications");
  //console.log(success, "success");
  useEffect(() => {
    dispatch(fetchNotifications());
    if (loading) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, success]);

  useEffect(() => {}, [success]);

  const handleMarkAsRead = notificationId => {
    dispatch(markNotificationAsRead(notificationId))
      .then(response => {
        if (
          (response?.type,
          response,
          response?.type === 'notifications/markNotificationAsRead/fulfilled')
        ) {
        }
      })
      .catch(error => {});
  };

  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: 'left',
      paddingTop: 12,
      paddingBottom: 12,
      color: `${theme.text}55`,
      fontSize: 12,
      paddingRight: 24,
      fontFamily: 'MontserratRegular',
    },

    containerfirst: {
      backgroundColor: theme.background,
      color: '#ffffff',
      height: '100%',
      padding: 12,
      width: '100%',
    },
    orderView: {
      // borderBottomWidth: 1,
      // borderColor: `${theme.text}20`,
      // marginBottom: 12,
      paddingRight: 24,
    },
    rows: {
      gap: 12,
      marginTop: 12,
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.views,
      padding: 16,
      borderRadius: 16,
    },

    text: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'MontserratBold',
      color: `${theme.text}`,
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
      title: 'Notifications',
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

  const nots = notifications?.data;
  const groupAndSortNotifications = nots => {
    if (!nots || !Array.isArray(nots)) {
      return [];
    }

    const grouped = nots?.reduce((groups, notification) => {
      const date = notification.createdAt.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    }, {});

    const sortedGroups = Object.entries(grouped)
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .map(([date, nots]) => ({
        date,
        nots: nots.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      }));

    return sortedGroups;
  };

  const groupedAndSortedNotifications = groupAndSortNotifications(nots);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (!item.isRead) {
          handleMarkAsRead(item.id);
        }
      }}>
      <View
        style={[
          styles.rows,
          {
            borderColor: item.isRead ? 'transparent' : '#f1c40f',
            borderWidth: item.isRead ? 0 : 2,
          },
        ]}>
        <View style={styles.orderView}>
          <Text style={styles.text}>{item.subject}</Text>
          <Text
            style={{
              fontFamily: 'MontserratBold',
              fontSize: 12,
              color: `${theme.text}85`,
            }}>
            {` ${new Date(item?.createdAt).toISOString().split('T')[0]}`}
          </Text>
          <Text style={styles.passwordtext}>
            {item.isRead
              ? item.message
              : item.message.slice(0, 12) + '..................'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
      <View style={[styles.containerfirst]}>
        {loading ? (
          <View
            style={{
              height: 50,
              padding: 12,
            }}>
            <ActivityIndicator color={theme.text} />
          </View>
        ) : null}
        {!groupedAndSortedNotifications ||
        groupedAndSortedNotifications.length === 0 ? (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 120,
              padding: 24,
              backgroundColor: '#ff000015',
              color: '#ff0000',
              fontSize: 14,
              fontFamily: 'MontserratBold',
            }}>
            No New Notifications
          </Text>
        ) : (
          <FlatList
            data={groupedAndSortedNotifications}
            renderItem={({item}) => (
              <View>
                <Text
                  style={{
                    fontFamily: 'MontserratBold',
                    marginTop: 32,
                    textAlign: 'right',
                    color: theme.text,
                  }}>
                  {item.date}
                </Text>
                <FlatList
                  data={item.nots}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            )}
            keyExtractor={item => item.date.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
