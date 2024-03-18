// import { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwtDecode from 'jwt-decode';

// const useAuth = () => {
//   const [authData, setAuthData] = useState(null);
//   const [error, setError] = useState(null);

//   const login = async (credentials) => {
//     try {
//       // Your authentication API call
//       const response = await authenticateUser(credentials);

//       // Check if the authentication was successful
//       if (response?.data?.token) {
//         const accessToken = response?.data.token.accessToken;
//         const refreshToken = response?.data.token.refreshToken;

//         // Store tokens in AsyncStorage
//         try {
//           const decodedToken = jwtDecode(accessToken);
//           await AsyncStorage.setItem('thisUser', JSON.stringify(decodedToken));
//           await AsyncStorage.setItem('accessToken', accessToken);
//           console.log('Access token stored in AsyncStorage:', accessToken);

//           // Update the state with the authentication data
//           setAuthData({
//             accessToken,
//             refreshToken,
//             decodedToken,
//           });

//           return response?.data;
//         } catch (error) {
//           console.error('Error storing access token:', error);
//           setError('Error storing access token');
//         }
//       } else {
//         // Handle authentication failure
//         setError('Authentication failed');
//       }
//     } catch (error) {
//       console.error(JSON.stringify(error.response, null, 3));
//       setError(error?.response?.status || 'An error occurred');
//     }
//   };

//   const logout = async () => {
//     // // Clear tokens from AsyncStorage and reset state
//     try {
//       await AsyncStorage.removeItem('thisUser');
//       await AsyncStorage.removeItem('accessToken');
//       setAuthData(null);
//     } catch (error) {
//       console.error('Error clearing tokens:', error);
//     }
//   };

//   return { authData, error, login, logout };
// };

// export default useAuth;
