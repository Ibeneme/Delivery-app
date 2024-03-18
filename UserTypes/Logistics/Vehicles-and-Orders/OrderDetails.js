// import React, { useState, useEffect } from "react";
// import {
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   Image,
//   KeyboardAvoidingView,
//   Modal,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useTheme } from "../../.././Providers/ThemeProvider";
// import { useRoute } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteDelivery,
//   fetchAllDeliveries,
//   fetchDeliveryById,
// } from "../../.././Redux/Deliveries/Deliveries";
// import LogoutModal from "../.././OrdinaryUser/Pages/Notifications-and-settings/LogoutModal";

// import { updateDeliveryRating } from "../../.././Redux/Deliveries/Reviews";
// import { Rating, AirbnbRating } from "react-native-ratings";

// const OrderDetails = () => {
//   const navigation = useNavigation();
//   const [text, setText] = useState("");
//   const [data, setData] = useState("");
//   const { theme } = useTheme();

//   const route = useRoute();
//   const { deliveryID } = route.params;

//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [pickupAddress, setPickupAddress] = useState("");

//   useEffect(() => {
//     setLoadingContent(true);
//     const fetchData = async () => {
//       try {
//         const response = await dispatch(fetchDeliveryById(deliveryID));
//         const responseData = response?.payload;
//         const data = responseData;
//         setLoadingContent(false);
//         setData(data);
//         setDeleteID(data?.data?.id);
//         setDeliveryAddress(data?.data?.deliveryAddress);
//         setPickupAddress(data?.data?.pickupAddress);
//       } catch (error) {
//         setLoadingContent(false);
//       }
//     };

//     fetchData();
//   }, [dispatch, data?.data?.id]);

//   const navigateToThisRide = () => {
//     navigation.navigate("Delivery", {
//       deliveryID: deliveryID,
//       deliveryAddress: deliveryAddress,
//       pickupAddress: pickupAddress,
//       deliveryCoordinates: data?.data?.deliveryCoordinates,
//       pickupCoordinates: data?.data?.pickupCoordinates,
//       cost : data?.data?.cost,
//       status: data?.data?.status
//     });
//   };

//   const [deliveries, setDeliveries] = useState("");
//   const [totalDeliveries, setTotalDeliveries] = useState("");
//   const [pendingDeliveries, setPendingDeliveries] = useState("");
//   const [assignedDeliveries, setAssignedDeliveries] = useState("");
//   const [deliveredDeliveries, setDeliveredDeliveries] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const { success } = useSelector((state) => state?.delivery);


//   useEffect(() => {
//     dispatch(fetchAllDeliveries());
//   }, [dispatch]);

//   useEffect(() => {
//     if (Array.isArray(success?.data)) {
//       const pendingCount =
//         success?.data?.filter((item) => item.status === "pending").length || 0;
//       const assignedCount =
//         success?.data?.filter((item) => item.status === "assigned").length || 0;
//       const deliveredCount =
//         success?.data?.filter((item) => item.status === "delivered").length ||
//         0;

//       // Update the state variables for each count
//       setDeliveries(success);
//       setTotalDeliveries(success?.data?.length || 0);
//       setPendingDeliveries(pendingCount);
//       setAssignedDeliveries(assignedCount);
//       setDeliveredDeliveries(deliveredCount);
//     } else {
//     }
//   }, [success?.data]);

//   const [loadingContent, setLoadingContent] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [deleteFailed, SetDeleteFailed] = useState(false);
//   const [deleteID, setDeleteID] = useState("");

//   const [updateModalVisible, setUpdateModalVisible] = useState(false);

//   const toggleUpdateModal = () => {
//     setUpdateModalVisible(!updateModalVisible);
//   };

//   const styles = StyleSheet.create({
//     passwordtext: {
//       textAlign: "left",
//       paddingTop: 8,
//       fontSize: 14,
//       fontFamily: "MontserratRegular",
//     },

//     passwordtextPop: {
//       textAlign: "left",
//       fontSize: 14,
//       fontFamily: "MontserratRegular",
//     },

//     touchView: {
//       flexDirection: "row",
//       alignItems: "center",
//       gap: 24,
//       backgroundColor: "#FFF3C5",
//       borderRadius: 247,
//       height: 60,
//       padding: 16,
//     },
//     touchsActive: {
//       width: "45%",
//       borderRadius: 1233,
//       backgroundColor: "#f1c40f",
//       justifyContent: "center",
//       alignItems: "center",
//       height: 50,
//     },
//     touchs: {
//       width: "45%",
//       borderRadius: 1233,
//       justifyContent: "center",
//       alignItems: "center",
//       height: 50,
//     },
//     touchsText: {
//       textAlign: "center",
//       color: "#000",
//       fontSize: 18,
//     },
//     touchsTextActive: {
//       textAlign: "center",
//       color: "#000",
//       fontSize: 18,
//     },

//     containerfirst: {
//       backgroundColor: "#000",
//       color: "#ffffff",
//       height: "100%",
//       padding: 16,
//       marginTop: 24,
//     },
//     text: {
//       color: theme.text,
//       fontSize: 18,
//       fontWeight: "bold",
//       fontFamily: "MontserratBold",
//     },
//     orderView: {
//       borderBottomWidth: 0,
//       borderColor: `${theme.text}20`,
//       marginBottom: 12,
//     },
//     grayed: {
//       backgroundColor: `${theme.text}10`,
//       borderRadius: 12,
//       height: "auto",
//       padding: 16,
//       marginTop: 24,
//     },
//     grayedPop: {
//       backgroundColor: `${theme.text}10`,
//       borderRadius: 12,
//       height: "auto",
//       padding: 16,
//       marginTop: 24,
//       justifyContent: "center",
//       alignItems: "center",
//     },

//     Nextgrayed: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       borderBottomWidth: 1,
//       paddingBottom: 12,
//       alignItems: "center",
//       borderBottomColor: `${theme.text}50`,
//     },
//     input: {
//       borderWidth: 1,
//       fontFamily: "MontserratBold",
//       borderColor: `${theme.text}60`,
//       padding: 12,
//       fontSize: 15,
//       color: theme.text,
//       width: "100%",
//       paddingTop: 10,
//       borderRadius: 5,
//       fontSize: 16,
//       height: 80,
//       marginTop: 4,
//     },
//     buttonClick: {
//       backgroundColor: "#f1c40f",
//       width: "100%",
//       height: 50,
//       borderRadius: 6,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       marginTop: 24,
//       marginBottom: 24,
//     },
//     buttonClickCancel: {
//       borderColor: "#f1c40f",
//       width: "100%",
//       height: 50,
//       borderRadius: 4,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       marginTop: -8,
//       marginBottom: 24,
//       borderWidth: 1.2,
//     },
//     keyb: {
//       flex: 1,
//     },
//     radioLabel: {
//       color: `${theme.text}`,
//       fontSize: 16,
//     },
//     modalContainer: {
//       backgroundColor: "#00000050",
//       flex: 1,
//       flexGrow: 1,
//       bottom: 0,
//       position: "relative",
//     },
//     modalContainerView: {
//       height: "auto",
//       bottom: 0,
//       position: "absolute",
//       width: "100%",
//       backgroundColor: theme.background,
//       borderRadius: 21,
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     star: {
//       gap: 12,
//       marginBottom: 48,
//     },
//     starContainer: {
//       gap: 12,
//     },
//     ratingContainer: {
//       gap: 12,
//     },
//     reviewText: {
//       color: "red",
//     },
//   });

//   const headerStyle = {
//     backgroundColor: theme.background,
//     borderBottomWidth: 0,
//   };

//   const headerTitleStyle = {
//     color: theme.text,
//     borderBottomWidth: 0,
//   };

//   const headerTintColor = theme.text;

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       title: "Order",
//       headerStyle,
//       headerTitleStyle: {
//         ...headerTitleStyle,
//         fontFamily: "MontserratBold",
//       },
//       headerTintColor,
//       headerBackTitleVisible: false,
//     });
//   }, [navigation, theme]);

//   const thisID = data?.data?.id;
//   const deliver = useSelector((state) => state?.delivery?.success);

//   const handleDelete = async () => {
//     setLoading(true);
//     SetDeleteFailed(false);

//     const deliveryID = deleteID;
//     try {
//       const resultAction = await dispatch(deleteDelivery(deliveryID));
//       setLoading(false);
//        if (resultAction?.payload?.success === "Delivery Deleted") {
//         setModalVisible(false);
//         navigation.navigate("DeleteSuccess");
//       } else {
//         SetDeleteFailed(true);
//        }
//     } catch (error) {
//       SetDeleteFailed(true);
//     }
//   };
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisibles, setModalVisibles] = useState(true);

//   const [modalShown, setModalShown] = useState(false);

//   const openRatingModal = () => {
//     if (data?.data?.status === "delivered" && modalShown) {
//       setModalVisibles(true);
//     } else {
//       setModalVisibles(false);
//     }
//   };

//   useEffect(() => {
//     openRatingModal();
//   }, [deliver]);

//   const [rating, setRating] = useState(2);
//   const [review, setReview] = useState("");
//   const [isTextInputFocused, setIsTextInputFocused] = useState(false); // State to track input focus

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//  };

//   const handleReviewChange = (text) => {
//     setReview(text);
//   };

//   const imageLoader = require("../../../../../assets/QuicklogisticsLogo/Logo.png");

//   const handleRatingUpdate = async () => {
//     try {
//       const response = await dispatch(
//         updateDeliveryRating({
//           deliveryId: thisID, // Use the appropriate delivery ID
//           rating: rating,
//           review: review,
//         })
//       );

//     } catch (error) {
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       enabled={true}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.keyb}
//     >
//       <SafeAreaView
//         style={{ backgroundColor: theme.background, height: "100%" }}
//       >
//         {loadingContent ? (
//           <View
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               flex: 1,
//               width: "100%",
//               height: "100%",
//               padding: 24,
//               height: 600,
//             }}
//           >
//             <View style={{}}>
//               <Image
//                 style={{
//                   width: 48,
//                   height: 48,
//                 }}
//                 source={imageLoader}
//               />
//             </View>
//           </View>
//         ) : (
//           <ScrollView style={{ backgroundColor: theme.background }}>
//             <View
//               style={[
//                 styles.containerfirst,
//                 { backgroundColor: theme.background },
//               ]}
//             >
//               <View style={styles.touchView}>
//                 <TouchableOpacity style={styles.touchsActive}>
//                   <Text
//                     style={[
//                       styles.touchsTextActive,
//                       { fontFamily: "MontserratBold" },
//                     ]}
//                   >
//                     Orders
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={navigateToThisRide}
//                   style={styles.touchs}
//                 >
//                   <Text
//                     style={[
//                       styles.touchsText,
//                       { fontFamily: "MontserratBold" },
//                     ]}
//                   >
//                     Delivery
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.orderView}>
//                 {/*   <View
//                   style={[
//                     styles.grayedPop,
//                     {
//                       margin: 0,
//                       color: `${theme.text}`,
//                       borderColor: "#f1c40f",
//                       borderWidth: 1,
//                     },
//                   ]}
//                 >
//                   <View>
//                     <Text
//                       style={[
//                         styles.passwordtextPop,
//                         {
//                           margin: 0,
//                           color: `${theme.text}`,
//                         },
//                       ]}
//                     >
//                       {data?.data?.status === "pending"
//                         ? ` Your Order is Pending.. please wait you'll be assigned a rider soon`
//                         : null}
//                       {data?.data?.status === "assigned"
//                         ? ` Hurray!!!!, Your Order is on its way`
//                         : null}
//                       {data?.data?.status === "delivered"
//                         ? ` Your Order has been delivered Successfully`
//                         : null}
//                     </Text> 
//                   </View>
//                 </View>*/}

//                 <View style={styles.grayed}>
//                   <View style={styles.Nextgrayed}>
//                     <Text style={[styles.text, { fontSize: 16, marginTop: 8 }]}>
//                       Pickup Details
//                     </Text>
//                   </View>

//                   <View>
//                     <Text
//                       style={[
//                         styles.passwordtext,
//                         { color: `${theme.text}55`, marginTop: 12 },
//                       ]}
//                     >
//                       Name
//                     </Text>
//                     <Text
//                       style={[styles.passwordtext, { color: `${theme.text}` }]}
//                     >
//                       {user?.fullName}
//                     </Text>
//                   </View>

//                   <View>
//                     <Text
//                       style={[
//                         styles.passwordtext,
//                         { color: `${theme.text}55`, marginTop: 12 },
//                       ]}
//                     >
//                       Reciever's Email
//                     </Text>
//                     <Text
//                       style={[styles.passwordtext, { color: `${theme.text}` }]}
//                     >
//                       {user?.email}
//                     </Text>
//                   </View>
//                   <View>
//                     <Text
//                       style={[
//                         styles.passwordtext,
//                         { color: `${theme.text}55`, marginTop: 12 },
//                       ]}
//                     >
//                       Cost
//                     </Text>
//                     <Text
//                       style={[styles.passwordtext, { color: `${theme.text}` }]}
//                     >
//                       {data?.data?.cost}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       marginTop: 24,
//                     }}
//                   ></View>
//                 </View>
//                 <View style={styles.grayed}>
//                   <View style={styles.Nextgrayed}>
//                     <Text style={[styles.text, { fontSize: 16, marginTop: 8 }]}>
//                       Delivery Details
//                     </Text>
//                   </View>
//                   <View>
//                     <Text
//                       style={[
//                         styles.passwordtext,
//                         { color: `${theme.text}55`, marginTop: 12 },
//                       ]}
//                     >
//                       Name
//                     </Text>
//                     <Text
//                       style={[styles.passwordtext, { color: `${theme.text}` }]}
//                     >
//                       {data?.data?.receiverName}
//                     </Text>
//                   </View>
//                   <View>
//                     <Text
//                       style={[
//                         styles.passwordtext,
//                         { color: `${theme.text}55`, marginTop: 12 },
//                       ]}
//                     >
//                       Delivery Address
//                     </Text>
//                     <Text
//                       style={[styles.passwordtext, { color: `${theme.text}` }]}
//                     >
//                       {data?.data?.deliveryAddress}
//                     </Text>
//                   </View>

//                   <View>
//                     <Text
//                       style={[
//                         styles.passwordtext,
//                         { color: `${theme.text}55`, marginTop: 12 },
//                       ]}
//                     >
//                       Phone number
//                     </Text>
//                     <Text
//                       style={[styles.passwordtext, { color: `${theme.text}` }]}
//                     >
//                       {data?.data?.receiverPhoneNumber}
//                     </Text>
//                   </View>
//                   <View>
//                     {data?.data?.packageCategory ? (
//                       <View>
//                         <Text
//                           style={[
//                             styles.passwordtext,
//                             { color: `${theme.text}55`, marginTop: 12 },
//                           ]}
//                         >
//                           Package Type
//                         </Text>
//                         <Text
//                           style={[
//                             styles.passwordtext,
//                             { color: `${theme.text}` },
//                           ]}
//                         >
//                           {data?.data?.packageType}
//                         </Text>
//                       </View>
//                     ) : null}
//                   </View>
//                   <View>
//                     <Text
//                       style={[
//                         styles.passwordtext,
//                         { color: `${theme.text}55`, marginTop: 12 },
//                       ]}
//                     >
//                       Package Weight
//                     </Text>
//                     <Text
//                       style={[styles.passwordtext, { color: `${theme.text}` }]}
//                     >
//                       {data?.data?.packageWeight}kg
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       marginTop: 24,
//                     }}
//                   ></View>
//                 </View>
//                 {data?.data?.status === "pending" ? (
//                   <View>
//                     <TouchableOpacity
//                       style={[
//                         styles.buttonClick,
//                         { fontFamily: "MontserratBold" },
//                       ]}
//                       onPress={() =>
//                         navigation.navigate("updateDelivery", {
//                           deliveryID: deleteID,
//                         })
//                       }
//                     >
//                       <Text
//                         style={[
//                           styles.buttonText,
//                           { fontFamily: "MontserratBold" },
//                         ]}
//                       >
//                         Update Delivery
//                       </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       onPress={() => setModalVisible(true)}
//                       style={[styles.buttonClickCancel]}
//                     >
//                       <Text
//                         style={[
//                           styles.buttonText,
//                           { fontFamily: "MontserratBold", color: "#f1c40f" },
//                         ]}
//                       >
//                         Cancel Delivery
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 ) : null}

//                 {data?.data?.status === "cancelled" ? (
//                   <View>
//                     <TouchableOpacity
//                       onPress={() => setModalVisible(true)}
//                       style={[styles.buttonClickCancel]}
//                     >
//                       <Text
//                         style={[
//                           styles.buttonText,
//                           { fontFamily: "MontserratBold", color: "#f1c40f" },
//                         ]}
//                       >
//                         Delete Delivery
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 ) : null}
//                 {/* {data?.data?.status === "delivered" ? (
//                   <View style={{}}>
//                     <TouchableOpacity
//                       style={[
//                         styles.buttonClick,
//                         { fontFamily: "MontserratBold" ,},
//                       ]}
//                       onPress={() => handleUpdateStatusReceived(data?.data?.id)}
//                     >
//                       <Text
//                         style={[
//                           styles.buttonText,
//                           { fontFamily: "MontserratBold" },
//                         ]}
                      
//                   >
//                         Confirm it's delivered
//                       </Text>
//                     </TouchableOpacity>
                    
//                   </View>
//                 ) : null} */}
//               </View>
//             </View>
//             <LogoutModal
//               visible={modalVisible}
//               onRequestClose={() => setModalVisible(false)}
//               onLogout={handleDelete}
//               cancelButtonText={`${
//                 deleteFailed ? "Back to Order" : "No, Cancel"
//               }`}
//               logoutButtonText={`${
//                 loading
//                   ? deleteFailed
//                     ? "Or Back to Home"
//                     : "Loading..."
//                   : "Yes, Cancel Order"
//               }`}
//               text={`${
//                 deleteFailed
//                   ? "Whoops.. Failed to Cancel"
//                   : "Are you sure you want to Cancel this Order?"
//               }`}
//             />
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisibles}
//               onRequestClose={() => setModalVisibles(false)}
//             >
//               <View style={styles.modalContainer}>
//                 <View style={styles.modalContainerView}>
//                   <Text
//                     onPress={() => {
//                       setModalVisibles(false); // Close the modal
//                       // Step 3: Mark the modal as shown
//                     }}
//                     style={{
//                       fontFamily: "MontserratBold",
//                       fontSize: 15,
//                       color: theme.text,
//                       marginTop: 32,
//                       marginBottom: 8,
//                       textAlign: "right",
//                       width: "100%",
//                       marginRight: 16,
//                     }}
//                   >
//                     Close
//                   </Text>
//                   <Text
//                     style={{
//                       fontFamily: "MontserratBold",
//                       fontSize: 18,
//                       color: theme.text,
//                       marginTop: 12,
//                     }}
//                   >
//                     Did you enjoy our service?
//                   </Text>
//                   <Text
//                     style={{
//                       fontFamily: "MontserratRegular",
//                       fontSize: 16,
//                       textAlign: "center",
//                       color: theme.text,
//                       marginTop: 8,
//                     }}
//                   >
//                     Leave a review to aid us improve in our service
//                   </Text>
//                   <View
//                     style={[
//                       styles.container,
//                       {
//                         width: "100%",
//                         padding: 16,
//                         marginBottom: 24,
//                         marginTop: 16,
//                       },
//                     ]}
//                   >
//                     <AirbnbRating
//                       count={5} // Number of stars
//                       reviews={[
//                         "😡", // Terrible
//                         "😐", // Fair
//                         "😊", // Good
//                         "😐", // Average
//                         "😄", // Excellent
//                       ]}
//                       reviewSize={48}
//                       reviewColor={theme.text}
//                       reviewFont="MontserratBold"
//                       reviewStyle={styles.reviewText}
//                       defaultRating={rating} // Initial rating (can be changed)
//                       onFinishRating={handleRatingChange} // Callback when rating is selected
//                       size={36}
//                       unfilledColor="#f1c40f"
//                       ratingColor="#f1c40f" // Star color when clicked
//                       selectedColor="#f1c40f"
//                       starStyle={styles.star} // Style for each star
//                       starContainerStyle={styles.starContainer} // Style for the star container
//                       style={styles.ratingContainer} // Style for the rating container
//                     />
//                     <View>
//                       <Text
//                         style={{
//                           fontFamily: "MontserratBold",
//                           fontSize: 16,
//                           color: theme.text,
//                           marginBottom: 6,
//                         }}
//                       >
//                         Write a Review
//                       </Text>
//                       <TextInput
//                         style={[
//                           styles.input, // Apply margin based on focus
//                           ,
//                           { padding: 24 },
//                         ]}
//                         placeholder="Write your review..."
//                         value={review}
//                         onChangeText={handleReviewChange}
//                         multiline={true}
//                         numberOfLines={4}
//                         placeholderTextColor="gray"
//                         onFocus={() => setIsTextInputFocused(true)} // Set focus state to true
//                         onBlur={() => setIsTextInputFocused(false)} // Set focus state to false
//                       />
//                     </View>

//                     <TouchableOpacity
//                       style={[
//                         styles.buttonClick,
//                         { marginBottom: isTextInputFocused ? 350 : 0 },
//                       ]}
//                       onPress={handleRatingUpdate}
//                     >
//                       <Text
//                         style={{
//                           fontFamily: "MontserratBold",
//                           fontSize: 16,
//                         }}
//                       >
//                         Submit
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                   {/* <TouchableOpacity
//                     style={styles.buttonClick}
//                     onPress={() => {
//                       // Dispatch the updateDeliveryRating action here
//                       dispatch(
//                         updateDeliveryRating({
//                           deliveryId: thisID, // Use the appropriate delivery ID
//                           rating: text, // Use the rating input value
//                           review: text, // Use the review input value
                     
//                         })
//                       );
//                       setModalVisibles(false); // Close the modal
//                       setModalShown(true); // Step 3: Mark the modal as shown
//                     }} 
//                   >
//                     <Text style={styles.buttonText}>
//                       Update Rating & Review
//                     </Text>
//                   </TouchableOpacity>*/}
//                 </View>
//               </View>
//             </Modal>
//           </ScrollView>
//         )}
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// export default OrderDetails;
