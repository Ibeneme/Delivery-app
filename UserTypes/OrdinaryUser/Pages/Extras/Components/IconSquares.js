import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../../../Providers/ThemeProvider';
// import {FontAwesome5} from 'react-native-vector-icons';

const IconSquares = ({ImageBackgroundColor, iconName, IconColor}) => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    passwordtext: {
      textAlign: 'left',
      paddingBottom: 12,
      color: `${theme.text}`,
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: 'MontserratBold',
    },
    containerfirst: {
      color: '#ffffff',

      borderColor: `${theme.text}25`,
      borderBottomWidth: 1,
      padding: 0,
      flexGrow: 1,

      flexDirection: 'row',
      justifyContent: 'space-between',
      fontFamily: 'MontserratRegular',
    },
    containerSecond: {
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      gap: 9,
    },

    text: {
      color: `${theme.text}89`,
      fontSize: 12,
      fontFamily: 'MontserratRegular',
      marginTop: 8,
    },
    texts: {
      color: `${theme.text}`,
      fontSize: 14,
      marginTop: -6,
      fontFamily: 'MontserratRegular',
    },

    cons: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 12,
      marginTop: 8,
    },
    con: {
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'right',
    },
    greenBackground: {
      backgroundColor: ImageBackgroundColor,
      padding: 8,
      borderRadius: 2222,
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <TouchableOpacity>
      <View>
        <View>
          <View style={styles.greenBackground}>
            {/* <FontAwesome5 name={iconName} size={48} color={IconColor} />
             */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IconSquares;
