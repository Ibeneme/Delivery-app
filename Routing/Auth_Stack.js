import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SecondScreen from "../UserTypes/OrdinaryUser/Onboarding/SecondScreen";
import ThirdScreen from "../UserTypes/OrdinaryUser/Onboarding/ThirdScreen";
import Login from "../UserTypes/OrdinaryUser/Authentication/Login";
import CreateAccount from "../UserTypes/OrdinaryUser/Authentication/CreateAccount";
import BusinessCreateAccount from "../UserTypes/Business/CreateAccount";
import LogisticsCreateAccount from "../UserTypes/Logistics/Auth/CreateAccount";
import ForgotPassword from "../UserTypes/OrdinaryUser/Authentication/ForgotPassword";
import Success from "../UserTypes/OrdinaryUser/Authentication/Success";
//import GoogleLogin from "../Googlelogin";
// import FirstScreen from "../UserTypes/OrdinaryUser/Onboarding/FirstScreen";

const Auth_Stack = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator>
      
      <AuthStack.Screen name="SecondScreen" component={SecondScreen} />
      {/* <AuthStack.Screen name="GoogleLogin" component={GoogleLogin} /> */}
      {/* <AuthStack.Screen
        name="Home"
        component={FirstScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <AuthStack.Screen name="ThirdScreen" component={ThirdScreen} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
      <AuthStack.Screen
        name="BusinessCreateAccount"
        component={BusinessCreateAccount}
      />
      <AuthStack.Screen
        name="LogisticsCreateAccount"
        component={LogisticsCreateAccount}
      />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="Success-forgot" component={Success} />
    </AuthStack.Navigator>
  );
};

export default Auth_Stack;
