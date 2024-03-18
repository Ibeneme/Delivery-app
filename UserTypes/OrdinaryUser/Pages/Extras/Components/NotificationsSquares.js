import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../../../../Providers/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationItem = ({
  iconName,
  iconBgColor,
  iconColor,
  title,
  message,
}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    rows: {
      flexDirection: 'row',
      marginTop: 8,
      width: '100%',
      gap: 8,
      backgroundColor: theme.walletViews,
      padding: 16,
      borderRadius: 16,
    },
    notificationCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    orderView: {
      flex: 1,
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'MontserratBold',
      color: `${theme.text}`,
    },
    passwordtext: {
      fontSize: 12,
      marginTop: 5,
      color: `${theme.text}85`,
      fontFamily: 'MontserratRegular',
    },
  });

  return (
    <View style={styles.rows}>
      <View
        style={{
          backgroundColor: iconBgColor,
          width: 48,
          height: 48,
          borderRadius: 48,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Icon name={iconName} size={24} color={iconColor} />
         */}
      </View>
      <View style={styles.orderView}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.passwordtext}>{message}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;
