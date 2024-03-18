import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GetRide from '../UserTypes/OrdinaryUser/Pages/Deliveries/GetRide';
import GetRider from '../UserTypes/OrdinaryUser/Pages/Deliveries/GetRideTwo';
import OrderDetails from '../UserTypes/OrdinaryUser/Pages/Deliveries/OrderDetails';
import Fund from '../UserTypes/OrdinaryUser/Pages/Wallet-and-Payment/Fund';
import Webview from '../UserTypes/OrdinaryUser/Pages/Wallet-and-Payment/webview';
import Success from '../UserTypes/OrdinaryUser/Pages/Extras/Components/Success';
import Err from '../UserTypes/OrdinaryUser/Pages/Extras/Components/Error';
import Maps from '../UserTypes/OrdinaryUser/Pages/Maps/Maps';
import Delivery from '../UserTypes/OrdinaryUser/Pages/Deliveries/Delivery';
import Successss from '../UserTypes/OrdinaryUser/Pages/Extras/Components/Successs';
import DeleteSuccess from '../UserTypes/OrdinaryUser/Pages/Extras/Components/DeleteSucess';
import Update from '../UserTypes/OrdinaryUser/Pages/Update-Delivery/Update';
import NewBookRide from '../UserTypes/OrdinaryUser/Pages/Deliveries/NewBookRide';
import WalletHistory from '../UserTypes/OrdinaryUser/Pages/Wallet-and-Payment/WalletHistory';
import GDelivery from '../UserTypes/OrdinaryUser/Pages/Google-auto-complete/GDelivery';
import WebviewDelivery from '../UserTypes/OrdinaryUser/Pages/Wallet-and-Payment/webViewDelivery';
import NewGetRide from '../UserTypes/OrdinaryUser/Pages/Deliveries/NewGetRide';
import Book from '../UserTypes/OrdinaryUser/Pages/Deliveries/Book';
import GooglePlacesInput from '../UserTypes/OrdinaryUser/Pages/Google-auto-complete/GooglePlacesInput';
import GDeliveryDelivery from '../UserTypes/OrdinaryUser/Pages/Google-multple-delivery/GDelivery';
import GooglePlacesInputDelivery from '../UserTypes/OrdinaryUser/Pages/Google-multple-delivery/GooglePlacesInput';
import MultipleBookRide from '../UserTypes/OrdinaryUser/Pages/Deliveries/MultipleBookRide';
import GetMultipleRide from '../UserTypes/OrdinaryUser/Pages/Deliveries/GetMultipleRide';
import MultipleTotalDeliveries from '../UserTypes/OrdinaryUser/Pages/Deliveries/MulitpleTotalDeliveries';
import {TestApp} from '../UserTypes/OrdinaryUser/Pages/Deliveries/Test';
import SampleComponent from '../UserTypes/OrdinaryUser/Pages/Deliveries/SampleCompenent';
import MainDrawerNavigations from './Drawer';
import MainDrawer from './Drawer';
import Withdrawal from '../UserTypes/OrdinaryUser/Pages/Wallet-and-Payment/Withdraw';

export const Main_Stack = () => {
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="tab"
        options={{headerShown: false}}
        component={MainDrawer}
      />
      <MainStack.Screen name="GetRide" component={GetRide} />
      <MainStack.Screen name="NewGetRide" component={NewGetRide} />
      <MainStack.Screen name="Book Rider" component={GooglePlacesInput} />
      {/* <MainStack.Screen name="Order" component={Order} /> */}
      <MainStack.Screen name="GetRider" component={GetRider} />
      <MainStack.Screen name="Orderdetails" component={OrderDetails} />
      <MainStack.Screen name="Delivery" component={Delivery} />
      <MainStack.Screen name="TestApp" component={TestApp} />
      <MainStack.Screen name="fund" component={Fund} />
      {/* <MainStack.Screen name="withdraw" component={Withdrawal} /> */}
      <MainStack.Screen name="book" component={Book} />
      <MainStack.Screen
        screenOptions={{
          headerShown: false,
        }}
        name="webb"
        component={Webview}
      />
      <MainStack.Screen
        screenOptions={{
          headerShown: false,
        }}
        name="webdelivery"
        component={WebviewDelivery}
      />
      <MainStack.Screen name="SampleComponent" component={SampleComponent} />
      <MainStack.Screen name="SuccessPage" component={Success} />
      <MainStack.Screen name="ErrorPage" component={Err} />
      <MainStack.Screen name="successcash" component={Successss} />
      <MainStack.Screen name="updateDelivery" component={Update} />
      <MainStack.Screen name="DeleteSuccess" component={DeleteSuccess} />
      {/* <MainStack.Screen name="Google" component={GooglePlacesInput} /> */}
      <MainStack.Screen
        name="gd"
        // options={{
        //   headerShown: false,
        // }}
        component={GDelivery}
      />

      <MainStack.Screen
        name="deliveryaddressMultiple"
        component={GDeliveryDelivery}
      />

      <MainStack.Screen
        name="pickupAddressMultiple"
        component={GooglePlacesInputDelivery}
      />
      <MainStack.Screen name="multipleDelivery" component={MultipleBookRide} />
      <MainStack.Screen name="GetMultipleRide" component={GetMultipleRide} />
      <MainStack.Screen name="NewBookRide" component={NewBookRide} />
      <MainStack.Screen name="WalletHistory" component={WalletHistory} />
      <MainStack.Screen
        name="MultipleTotalDeliveries"
        component={MultipleTotalDeliveries}
      />
      <MainStack.Screen name="withdraw" component={Withdrawal} />
      <MainStack.Screen
        name="Maps"
        component={Maps}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};
