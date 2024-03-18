import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const Webview = () => {
  const route = useRoute();
  const { checkoutLink } = route.params;

  const navigation = useNavigation();
  const [webViewUrl, setWebViewUrl] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    setWebViewUrl(url);
    if (url.includes("&status=successful&amount")) {
      navigation.navigate("SuccessPage");
    } else if (url.includes("status=cancelled&")) {
      navigation.goBack();
    } else {
      //alert("An Error occurred");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const lol = checkoutLink;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: lol }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};

export default Webview;
