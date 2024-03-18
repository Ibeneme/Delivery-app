import React from 'react';
import { WebView } from 'react-native-webview';

const CheckoutScreen = ({ route }) => {
  const { checkoutLink } = route.params; 

  return (
    <WebView source={{ uri: checkoutLink }} />
  );
};

export default CheckoutScreen;
