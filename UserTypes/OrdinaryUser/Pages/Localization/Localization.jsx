import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image, TouchableOpacity, Modal} from 'react-native';
import i18n from 'i18n-js';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '../../../../Redux/Users/Users';
//import {FontAwesome5} from 'react-native-vector-icons';
import {useTheme} from '../../../../Providers/ThemeProvider';
import {en, fr} from '../../../../Redux/Translation/Languages';
import {useLocalization} from './LocalizationContext';
import {CloseSVG} from '../../Icons/AllIcons';

const LocalizationSwitching = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const dispatch = useDispatch();
  const {theme} = useTheme();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const user = useSelector(state => state.auth.user);
  const ordinaryUserId = user?.ordinaryUserId;
  const language = useSelector(state => state.language);

  useEffect(() => {
    dispatch(fetchUser({ordinaryUserId}))
      .then(response => {
        setFullName(response?.payload?.data?.fullName);
      })
      .catch(error => {});
  }, [user]);

  const ukFlag = require('../../../../assets/Flags/UK.png');
  const FranceFlag = require('../../../../assets/Flags/France.png');
  const {locale, changeLanguage} = useLocalization();

  const t = key => i18n.t(key); // Define the translation function

  const handleLanguageChange = () => {
    const newLanguage = locale === 'en' ? 'fr' : 'en';
    changeLanguage(newLanguage);
  };
  return (
    <View
      style={{
        backgroundColor: theme.backgroundAuth,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#f1c40f',
          width: 82,
          height: 64,
          borderTopRightRadius: 23,
          borderBottomRightRadius: 23,
          marginTop: 24,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -120,
          borderWidth: 1.5,
          borderColor: theme.text,
        }}
        onPress={toggleModal}>
        {locale === 'fr' ? (
          <Image source={FranceFlag} style={{width: 42, height: 28}} />
        ) : null}
        {locale === 'en' ? (
          <Image source={ukFlag} style={{width: 42, height: 28}} />
        ) : null}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000065',
            padding: 16,
          }}>
          <View
            style={{
              backgroundColor: '#f1c40f',
              padding: 20,
              borderRadius: 10,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: 'MontserratBold',
                  fontSize: 14,
                }}>
                {i18n.t('greeting')} {fullName ? fullName : null}
              </Text>

              {/* <FontAwesome5
                color="#000"
                name="window-close"
                size={24}
                onPress={toggleModal}
              /> */}
              <TouchableOpacity onPress={toggleModal}>
                <CloseSVG
                  color="#000"
                  width={24}
                  height={24}
                  onPress={toggleModal}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 48,
                gap: 12,
                marginTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                handleLanguageChange('en');
                toggleModal(); // Close the modal after changing the language
              }}>
              <View style={{borderRadius: 64}}>
                <Image
                  source={ukFlag}
                  style={{width: 32, height: 28, borderRadius: 64}}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'MontserratRegular',
                }}>
                Switch to English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 48,
                gap: 12,
                marginTop: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                handleLanguageChange('fr');
                toggleModal(); // Close the modal after changing the language
              }}>
              <View style={{borderRadius: 64}}>
                <Image source={FranceFlag} style={{width: 32, height: 28}} />
              </View>

              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'MontserratRegular',
                }}>
                Switch to French
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => changeLanguage("ja")}>
              <Text>Switch to Japanese</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LocalizationSwitching;
