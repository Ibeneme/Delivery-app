import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogisticsDrawerNavigations from './Logistis_Drawer';
import AddVehicle from '../../UserTypes/Logistics/Vehicles-and-Orders/AddVehicle';
import UpdateVehicle from '../../UserTypes/Logistics/Vehicles-and-Orders/updateVehilce';
import WalletHistory from '../../UserTypes/Logistics/Wallet-and-Payment/WalletHistory';
//import Withdrawal from "../../UserTypes/Logistics/Wallet-and-Payment/Withdraw";
import Fund from '../../UserTypes/Logistics/Wallet-and-Payment/Fund';
import Webview from '../../UserTypes/Logistics/Wallet-and-Payment/webView';
import ErrPage from '../../UserTypes/Logistics/Wallet-and-Payment/Success';
import ErrOr from '../../UserTypes/Logistics/Wallet-and-Payment/Error';
import VehicleSuccess from '../../UserTypes/Logistics/component/Success';
import MyLocationMap from '../../UserTypes/Logistics/Others/Maps';
import Subscription from '../../UserTypes/Logistics/Wallet-and-Payment/Subscription';
import ApiKeyHistory from '../../UserTypes/Logistics/ApiKey/ApiKeyHistory';
import LocationGD from '../../UserTypes/Logistics/Vehicles-and-Orders/LocationgGD';
import UpdateLocationGD from '../../UserTypes/Logistics/Vehicles-and-Orders/UpdateGD';
import DisplayVehiclesMarketplace from '../../UserTypes/Logistics/Vehicles-and-Orders/DisplayVehicles';
import MarketPlaceSuccess from '../../UserTypes/Logistics/Vehicles-and-Orders/MarketPlaceSuccess';

export const Logistics_Stack = () => {
  const LogisticsStack = createStackNavigator();
  return (
    <LogisticsStack.Navigator>
      <LogisticsStack.Screen
        name="tabs"
        options={{headerShown: false}}
        component={LogisticsDrawerNavigations}
      />

      <LogisticsStack.Screen name="AddVehicle" component={AddVehicle} />
      <LogisticsStack.Screen name="UpdateVehicle" component={UpdateVehicle} />
      <LogisticsStack.Screen
        options={{headerShown: false}}
        name="Map"
        component={MyLocationMap}
      />

      <LogisticsStack.Screen name="wallethistory" component={WalletHistory} />
      {/* //<LogisticsStack.Screen name="withdrawal" component={Withdrawal} /> */}
      <LogisticsStack.Screen name="fund" component={Fund} />
      <LogisticsStack.Screen
        name="displayvehicles"
        component={DisplayVehiclesMarketplace}
      />
      <LogisticsStack.Screen name="webview" component={Webview} />
      <LogisticsStack.Screen name="subscription" component={Subscription} />
      <LogisticsStack.Screen name="apikeyhistory" component={ApiKeyHistory} />

      <LogisticsStack.Screen name="locationGD" component={LocationGD} />
      <LogisticsStack.Screen
        name="updatelocationGD"
        component={UpdateLocationGD}
      />

      <LogisticsStack.Screen
        name="SuccessMarketPlacee"
        component={MarketPlaceSuccess}
      />
      <LogisticsStack.Screen name="SuccessPage" component={ErrPage} />
      <LogisticsStack.Screen name="ErrorPage" component={ErrOr} />
      <LogisticsStack.Screen name="VehicleSuccess" component={VehicleSuccess} />
    </LogisticsStack.Navigator>
  );
};
