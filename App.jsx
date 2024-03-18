import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './Providers/ThemeProvider';
// import { useFonts } from "expo-font";
import store from './Redux/Store';
// import { RootSiblingParent } from "react-native-root-siblings";
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';
import {Main_Stack} from './Routing/MainStack';
import Auth_Stack from './Routing/Auth_Stack';
import {useDispatch} from 'react-redux';
import {Logistics_Stack} from './Routing/LogisticsUser/Logistics_Stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshingToken} from './Redux/Auth/Auth';
// import { ReduxNetworkProvider } from "react-native-offline";
import RedirectBusinessOwner from './UserTypes/OrdinaryUser/Pages/RedirectBusinessOwner';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NetworkAlert from './Network/Network';
// import * as BackgroundFetch from "expo-background-fetch";
// import * as TaskManager from "expo-task-manager";
// import Push from "./pushNotification";
import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image, TouchableOpacity, Modal} from 'react-native';
import i18n from 'i18n-js';
// import * as Localization from "expo-localization";
import {fetchUser} from './Redux/Users/Users';
import {FontAwesome5} from 'react-native-vector-icons';
import {useTheme} from './Providers/ThemeProvider';
import {en, fr} from './Redux/Translation/Languages';
import {setLanguage} from './Redux/Translation/Translation';
import {LocalizationProvider} from './UserTypes/OrdinaryUser/Pages/Localization/LocalizationContext';
import Localizationn from './UserTypes/OrdinaryUser/Pages/Localization/Localization';
import LocalizationSwitching from './UserTypes/OrdinaryUser/Pages/Localization/Localization';
// import LocalizationSwitching from "./UserTypes/OrdinaryUser/Pages/Localization/NewLocalizationSwitch";

// const BACKGROUND_FETCH_TASK = "background-fetch";
// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   const now = Date.now();
//    IbenemeIbenemeIbeneme@gmail.com  New1234@
//   console.log(
//     `Got background fetch call at date: ${new Date(now).toISOString()}`
//   );
//   return BackgroundFetch.BackgroundFetchResult.NewData;
// });

// async function registerBackgroundFetchAsync() {
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//     minimumInterval: 60 * 15, // 15 minutes
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   });
// }

// async function unregisterBackgroundFetchAsync() {
//   return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
// }

const AppContent = () => {
  const user = useSelector(state => state.auth.user);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  // React.useEffect(() => {
  //   checkStatusAsync();
  // }, []);

  // const checkStatusAsync = async () => {
  //   const status = await BackgroundFetch.getStatusAsync();
  //   const isRegistered = await TaskManager.isTaskRegisteredAsync(
  //     BACKGROUND_FETCH_TASK
  //   );
  //   setStatus(status);
  //   setIsRegistered(isRegistered);
  // };

  // const toggleFetchTask = async () => {
  //   if (isRegistered) {
  //     await unregisterBackgroundFetchAsync();
  //   } else {
  //     await registerBackgroundFetchAsync();
  //   }

  //   checkStatusAsync();
  // };

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
    } else {
    }
  }, [dispatch, user]);

  const refreshToken = useSelector(
    state => state?.auth?.refreshToken?.refreshToken,
  );

  const checkInternetConnectivity = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please connect to the internet.',
        );
      }
    });
  };

  useEffect(() => {
    checkInternetConnectivity();
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please connect to the internet.',
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      async function dispatchRefreshTokenAndLogResponse() {
        try {
          const response = await dispatch(refreshingToken(refreshToken));
          const newAccessToken = response?.payload?.token?.accessToken;
          AsyncStorage.getItem('accessToken');
          AsyncStorage.setItem('accessToken', newAccessToken);
        } catch (error) {}
      }
      const intervalId = setInterval(
        dispatchRefreshTokenAndLogResponse,
        3000000,
      );
      return () => clearInterval(intervalId);
    } else {
    }
  }, [dispatch, user]);

  return (
    <NavigationContainer>
      {user && user.userType === 'OrdinaryUser' ? <Main_Stack /> : null}
      {user && user.userType === 'Logistics' ? <Logistics_Stack /> : null}
      {user && user.userType === 'BusinessOwner' ? (
        <BusinessOwnerAlert />
      ) : null}
      {!user && <Auth_Stack />}
      <LocalizationSwitching />
    </NavigationContainer>
  );
};

const BusinessOwnerAlert = () => {
  return <RedirectBusinessOwner />;
};

// const setupI18n = () => {
//   i18n.translations = { en, fr };
//   i18n.locale = Localization.locale;
//   i18n.fallbacks = true;
// };

const App = () => {
  // const [loaded] = useFonts({
  //   MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
  //   MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }

  return (
    <Provider store={store}>
      {/* <ReduxNetworkProvider> */}
      <NetworkAlert>
        {/* <RootSiblingParent> */}
        <ThemeProvider>
          <LocalizationProvider>
            <AppContent />
          </LocalizationProvider>
        </ThemeProvider>
        {/* </RootSiblingParent> */}
      </NetworkAlert>
      {/* </ReduxNetworkProvider> */}
    </Provider>
  );
};

export default App;
