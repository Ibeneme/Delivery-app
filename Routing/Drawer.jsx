import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "../Providers/ThemeProvider";
import { View, StatusBar, Text } from "react-native";

import { FontAwesome5 } from "react-native-vector-icons";
import Dashboard from "../UserTypes/OrdinaryUser/Pages/Dashboard";
import Wallet from "../UserTypes/OrdinaryUser/Pages/Wallet-and-Payment/Wallet";
import Notifications from "../UserTypes/OrdinaryUser/Pages/Notifications-and-settings/Notifications";
import PaymentHistory from "../UserTypes/OrdinaryUser/Pages/Wallet-and-Payment/PaymentHistory";
import Settings from "../UserTypes/OrdinaryUser/Pages/Notifications-and-settings/Settings";
import LogOut from "../UserTypes/OrdinaryUser/Pages/Notifications-and-settings/LogOut";
import NewDeliveries from "../UserTypes/OrdinaryUser/Pages/Deliveries/NewDeliveries";
import GooglePlacesInput from "../UserTypes/OrdinaryUser/Pages/Google-auto-complete/GooglePlacesInput";
import LogOutNew from "../UserTypes/OrdinaryUser/Pages/Notifications-and-settings/LogOutNew";
import { useLocalization } from "../UserTypes/OrdinaryUser/Pages/Localization/LocalizationContext";
import i18n from "../UserTypes/OrdinaryUser/Pages/Localization/i18n";
import Book from "../UserTypes/OrdinaryUser/Pages/Deliveries/Book";

const Drawer = createDrawerNavigator();

function MainDrawerNavigations() {
  const { theme } = useTheme();

  const drawerIconStyle = {
    marginRight: -16,
    width: 28,
    color: `${theme.text}`,
  };
  const drawerLabelStyle = {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    marginLeft:12
  };

  const { locale, changeLanguage } = useLocalization();

  const t = (key) => i18n.t(key);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <StatusBar />
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: "#FDD037",
          drawerInactiveTintColor: theme.text,
          drawerActiveTintColor: "#000000",
          activeTintColor: "#000000",
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: theme.background,
            width: "75%",
            paddingTop: 48,
          },
          headerStyle: {
            borderBottomWidth: 3,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Dashboard}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("home")}
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="home"
            //     size={20}
            //   />
            // ),
          }}
        />

        <Drawer.Screen
          name="Book"
          component={Book}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("book")}
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="car"
            //     size={20}
            //   />
            // ),
          }}
        />

        {/* <Drawer.Screen
          name="Book Rider"
          component={GooglePlacesInput}
          options={{
            //headerShown: false,
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`,
                fontSize: 14 },
                ]}
              >
                {i18n.t("book")}
              </Text>
            ),
            drawerIcon: ({ focused, color, size }) => (
              <FontAwesome5
                style={[
                  drawerIconStyle,
                  { color: focused ? "#000" : `${theme.text}`,
                fontSize: 14 },
                ]}
                name="bicycle"
                size={20}
              />
            ),
          }}
        /> */}
        <Drawer.Screen
          name="Wallet"
          component={Wallet}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("wallet")}
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="wallet"
            //     size={20}
            //   />
            // ),
          }}
        />
        <Drawer.Screen
          name="Deliveries"
          component={NewDeliveries}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("deliveries")}
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="truck"
            //     size={20}
            //   />
            // ),
          }}
        />
        <Drawer.Screen
          name="Notifications"
          component={Notifications}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("notification")}
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="bell"
            //     size={20}
            //   />
            // ),
          }}
        />
        <Drawer.Screen
          name="Payment History"
          component={PaymentHistory}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("payment")}
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="history"
            //     size={20}
            //   />
            // ),
          }}
        />

        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("settings")}
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="cog"
            //     size={20}
            //   />
            // ),
          }}
        />
        <Drawer.Screen
          name="Log Out"
          component={LogOut}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("Accounts")}
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="user"
            //     size={20}
            //   />
            // ),
          }}
        />
        <Drawer.Screen
          name="LogOutNew"
          component={LogOutNew}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
                ]}
              >
                {i18n.t("logout")}
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}`, fontSize: 14 },
            //     ]}
            //     name="sign-out-alt"
            //     size={20}
            //   />
            // ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
}

export default MainDrawerNavigations;
