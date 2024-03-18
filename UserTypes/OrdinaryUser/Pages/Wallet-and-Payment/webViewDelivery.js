// import { useNavigation, useRoute } from "@react-navigation/native";
// import React, { useRef, useEffect, useState } from "react";
// import { SafeAreaView } from "react-native";
// import { WebView } from "react-native-webview";
// import { createDelivery } from "../../../../Redux/Deliveries/Deliveries";
// import { useDispatch } from "react-redux";

// const WebviewDelivery = () => {
//   const dispatch = useDispatch();
//   const route = useRoute();
//   const {
//     checkoutLink,
//     receiverName,
//     phoneNumber,
//     recieversEmail,
//     pickupAddress,
//     deliveryAddress,
//     pickupTimes,
//     packageWeight,
//     logisticsCompanyID,
//     vehicleID,
//     companyName,
//     companyCost,
//     packageType,
//     vehicleNumber,
//     deliveryLat,
//     deliveryLng,
//     pickupLat,
//     pickupLng,
//   } = route.params;

//   const navigation = useNavigation();
//   const [webViewUrl, setWebViewUrl] = useState("");

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: false,
//     });
//   }, []);

//   const handleNavigationStateChange = (newNavState) => {
//     const { url } = newNavState;
//     setWebViewUrl(url);
//     if (url.includes("&status=successful&amount")) {
//       handleCreateDelivery();
//       //navigation.navigate("SuccessPage");
//     } else if (url.includes("status=cancelled&")) {
//       navigation.goBack();
//     }
//   };

//   const handleCreateDelivery = async () => {

//       try {
//         const deliveryData = {
//           receiverPhoneNumber: phoneNumber,
//           pickupAddress: pickupAddress,
//           deliveryAddress: deliveryAddress,
//           cost: companyCost,
//           packageWeight: packageWeight,
//           paymentMethod: 'card',
//           receiverName: receiverName,
//           receiverEmail: recieversEmail,
//           pickupTime:pickupTimes,
//           logisticsCompanyID: logisticsCompanyID,
//           vehicleID: vehicleID,
//           pickupCoordinates: pickupLat + "/" + pickupLng,
//           deliveryCoordinates: deliveryLat + "/" + deliveryLng,
//           pickupCoordinates: `${pickupLat}/${pickupLng}`,
//           deliveryCoordinates: `${deliveryLat}/${deliveryLng}`,
//           pickupPhoneNumber: phoneNumber,
//           pickupName: receiverName,
//         };

//         dispatch(createDelivery([deliveryData]))
//           .then((response) => {
//             console.log("Responsedd:", response.payload?.success);
//             if (response?.payload?.success === "Delivery Added successfully") {
//               navigation.navigate("successcash");
//             } else if (
//               resultAction.payload.data &&
//               resultAction.payload.data.err === "Bad Request" &&
//               resultAction.payload.data.errors.includes(
//                 '"receiverEmail" must be a valid email'
//               )
//             ) {
//               alert("Bad Request");
//             } else {
//               alert("Bad Request");
//             }
//           })
//           .catch((error) => {
//             alert(error);
//           });
//       } catch (error) {
//         alert(error);
//       }

//   };

//   const lol = checkoutLink;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <WebView
//         source={{ uri: lol }}
//         onNavigationStateChange={handleNavigationStateChange}
//       />
//     </SafeAreaView>
//   );
// };

// export default WebviewDelivery;

import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const WebviewDelivery = () => {
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
      navigation.navigate("successcash");
    } else if (url.includes("status=cancelled&")) {
      navigation.goBack();
    }
  };

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

export default WebviewDelivery;
