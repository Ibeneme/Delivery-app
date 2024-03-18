import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useTheme} from '../../../../../Providers/ThemeProvider';
import TruckSVG from '../../../Icons/Truck';
// import { FontAwesome5 } from "react-native-vector-icons";

const DashboardSquares = ({
  // iconName,
  totalDeliveries,
  totalText,
}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: 'left',
      paddingTop: 12,
      paddingBottom: 0,
      color: `${theme.text}`,
      fontSize: 20,
      fontFamily: 'MontserratRegular',
    },
    containerfirst: {
      color: '#ffffff',
      width: '48%',
      height: 150,
      marginTop: 16,
      fontFamily: 'MontserratRegular',
    },
    text: {
      color: `${theme.text}89`,
      fontSize: 14,
      fontFamily: 'MontserratRegular',
    },
    orderView: {
      borderBottomWidth: 0,
      backgroundColor: theme.views,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'column',
      gap: 6,
      justifyContent: 'space-between',
      borderRadius: 12,
      width: '100%',
      height: 150,
    },
  });

  return (
    <View style={[styles.containerfirst]}>
      <View style={styles.orderView}>
        <View>
          <TruckSVG color="#f1c40f" width={24} height={24} />
        </View>
        <Text style={[styles.passwordtext]}>{totalDeliveries}</Text>
        <Text style={[styles.text]}>{totalText}</Text>
      </View>
    </View>
  );
};

export default DashboardSquares;
