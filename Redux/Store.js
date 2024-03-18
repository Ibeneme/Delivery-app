import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import deliveryReducer from "./Deliveries/Deliveries";
import paymentReducer from "./Payment/Payments";
import banksReducer from "./Payment/Bank";
import profileReducer from "./Users/Users";
import withdrawalReducer from "./Payment/Withdrawal";
import logisticsReducer from "./Logistics/Logistics";
import deliveriesLogisticsReducer  from "./Logistics/Deliveries";
import ratingReducer from "./Deliveries/Reviews";
import notificationReducer from "./Notifications/Notifications";
import profileTwoReducer from "./Users/Test";
import apiReducer from "./Users/ApiKey";
import languageReducer from './Translation/Translation'
import marketplaceReducer from './Marketplace/MarketPlace'
import newDeliveryReducer from './Deliveries/NewDeliveries'

const saveStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = JSON.stringify(store.getState());
  AsyncStorage.setItem("reduxState", state);

  return result;
};

import { reducer as network } from "react-native-offline";
import fetchingDeliveriesReducer from "./Logistics/Deliveries";
import userProfileReducer from './Users/Profile';


const store = configureStore({
  reducer: {
    auth: authReducer,
    newDelivery: newDeliveryReducer,
    delivery: deliveryReducer,
    payment: paymentReducer,
    banks: banksReducer,
    profile: profileReducer,
    userProfile: userProfileReducer,
    withdrawal: withdrawalReducer,
    logistics: logisticsReducer,
    deliveriesLogistics: deliveriesLogisticsReducer,
    rating: ratingReducer,
    network,
    notifications: notificationReducer,
    fetchingDeliveries: fetchingDeliveriesReducer,
    profileTwo: profileTwoReducer,
    api: apiReducer,
    language: languageReducer,
    marketplace: marketplaceReducer,

  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(saveStateMiddleware);
  },

});

export default store;
