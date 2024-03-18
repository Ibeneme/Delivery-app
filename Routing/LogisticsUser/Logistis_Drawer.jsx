import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "../../Providers/ThemeProvider";
import { View, StatusBar, Text } from "react-native";

// import { FontAwesome5 } from "react-native-vector-icons";
import Draw from "../../UserTypes/Logistics/Draw";
import Order from "../../UserTypes/Logistics/Vehicles-and-Orders/Orders";
import Wallet from "../../UserTypes/Logistics/Wallet-and-Payment/Wallet";
import Notifications from "../../UserTypes/Logistics/Others/Notification";
import PaymentHistory from "../../UserTypes/Logistics/Wallet-and-Payment/PaymentHistory";
import Settings from "../../UserTypes/Logistics/Others/Settings";
import ApiKey from "../../UserTypes/Logistics/ApiKey/ApiKey";
import Equipment from "../../UserTypes/Logistics/Vehicles-and-Orders/Equipment";
import LogOutLogistics from "../../UserTypes/Logistics/Others/LogOut";
import LogOutNew from "../../UserTypes/Logistics/Others/LogOutNew";
import Marketplace from "../../UserTypes/Logistics/Vehicles-and-Orders/MarketPlace";

function LogisticsDrawerNavigations() {
  const { theme } = useTheme();
  const LogisticsDrawer = createDrawerNavigator();
  const drawerIconStyle = {
    marginRight: -16,
    width: 28,
    color: `${theme.text}`,
  };
  const drawerLabelStyle = {
    fontFamily: "MontserratRegular",
    fontSize: 13,
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <StatusBar />
      <LogisticsDrawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: "#FDD037",
          drawerInactiveTintColor: theme.text,
          drawerActiveTintColor: "#000000",
          activeTintColor: "#000000",
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: theme.backgroundAuth,
            width: "75%",
            paddingTop: 48,
          },
          headerStyle: {
            borderBottomWidth: 3,
          },
        }}
      >
        <LogisticsDrawer.Screen
          name="Home"
          component={Draw}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Dashboard
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="home"
            //     size={16}
            //   />
            // ),
          }}
        />

        <LogisticsDrawer.Screen
          name="Equipment"
          component={Equipment}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Equipment
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="car"
            //     size={16}
            //   />
            // ),
          }}
        />

        <LogisticsDrawer.Screen
          name="Book Rider"
          component={Order}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Order
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="bicycle"
            //     size={16}
            //   />
            // ),
          }}
        />

        <LogisticsDrawer.Screen
          name="Wallet"
          component={Wallet}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Wallet
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="wallet"
            //     size={16}
            //   />
            // ),
          }}
        />
        <LogisticsDrawer.Screen
          name="Marketplace"
          component={Marketplace}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Marketplace
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="shopping-bag"
            //     size={16}
            //   />
            // ),
          }}
        />
        <LogisticsDrawer.Screen
          name="Notifications"
          component={Notifications}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Notifications
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="bell"
            //     size={16}
            //   />
            // ),
          }}
        />
        <LogisticsDrawer.Screen
          name="Payment History"
          component={PaymentHistory}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Payment History
              </Text>
            ),
            // // drawerIcon: ({ focused, color, size }) => (
            // //   <FontAwesome5
            // //     style={[
            // //       drawerIconStyle,
            // //       { color: focused ? "#000" : `${theme.text}` },
            // //     ]}
            // //     name="history"
            // //     size={16}
            // //   />
            // // ),
          }}
        />

        <LogisticsDrawer.Screen
          name="API Key"
          component={ApiKey}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                API Key
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="key"
            //     size={16}
            //   />
            // ),
          }}
        />

        <LogisticsDrawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Settings
              </Text>
            ),
            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="cog"
            //     size={16}
            //   />
            // ),
          }}
        />
        <LogisticsDrawer.Screen
          name="Log Out"
          component={LogOutLogistics}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Accounts
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="user"
            //     size={16}
            //   />
            // ),
          }}
        />
        <LogisticsDrawer.Screen
          name="LogOutNew"
          component={LogOutNew}
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  drawerLabelStyle,
                  { color: focused ? "#000" : `${theme.text}` },
                ]}
              >
                Log Out
              </Text>
            ),

            // drawerIcon: ({ focused, color, size }) => (
            //   <FontAwesome5
            //     style={[
            //       drawerIconStyle,
            //       { color: focused ? "#000" : `${theme.text}` },
            //     ]}
            //     name="sign-out-alt"
            //     size={16}
            //   />
            // ),
          }}
        />
      </LogisticsDrawer.Navigator>
    </View>
  );
}

export default LogisticsDrawerNavigations;
