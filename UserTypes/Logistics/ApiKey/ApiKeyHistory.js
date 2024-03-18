import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Providers/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { getApiKeyHistory } from "../../../Redux/Users/ApiKey";
import { FontAwesome5 } from "react-native-vector-icons";

const ApiKeyHistory = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.auth.user);
  const [data, setData] = useState('');

  useEffect(() => {
    dispatch(getApiKeyHistory(profileData?.logisticUserId))
      .then((response) => {
        setData(response?.payload?.data?.history);
      })
      .catch((error) => {});
  }, [dispatch, profileData]);

  const styles = StyleSheet.create({
    containerfirst: {
      backgroundColor: theme.background,
      color: "#ffffff",
      height: "100%",
      padding: 16,
      marginTop: 24,
    },
    text: {
      color: theme.text,
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "MontserratBold",
    },
    orderView: {
      borderBottomWidth: 0,
      borderColor: `${theme.text}20`,
      marginBottom: 12,
    },
    grayed: {
      backgroundColor: theme.views,
      borderRadius: 12,
      height: "auto",
      padding: 16,
      marginTop: -12,
      paddingBottom: 48,
    },
    input: {
      borderWidth: 1,
      borderColor: `${theme.text}60`,
      color: theme.text,
      padding: 10,
      borderRadius: 5,
      fontSize: 12,
      height: 50,
      marginTop: 24,
      width: "100%",
      fontFamily: "MontserratRegular",
    },
    keyb: {
      flex: 1,
    },
  });

  const headerStyle = {
    backgroundColor: theme.backgroundAuth,
  };

  const headerTitleStyle = {
    color: theme.text,
    borderBottomWidth: 0,
  };

  const headerTintColor = theme.text;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Api Key History",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "MontserratBold",
        fontSize: 14
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation, theme]);

  return (
    <KeyboardAvoidingView
      enabled={true}
    style={styles.keyb}
    >
      <SafeAreaView
        style={{ backgroundColor: theme.background, height: "100%" }}
      >
        <View style={[styles.containerfirst]}>
          <View style={styles.orderView}>
            <View style={[styles.grayed]}>
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      marginTop: 24,
                      gap: 8,
                    }}
                  >
                   
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "MontserratBold",
                          marginBottom: 3,
                          color: theme.text,
                        }}
                      >
                        Date Sent: {item.dateSent}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "MontserratRegular",
                          marginBottom: 3,
                          color: theme.text,
                        }}
                      >
                        Received API Key: {item.receivedapiKey}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "MontserratRegular",
                          marginBottom: 3,
                          color: `${theme.text}75`,
                        }}
                      >
                        Time: {item.time}
                      </Text>
                    </View>
                  </View>
                )}
              />
              <View
                style={{
                  marginTop: 24,
                  marginBottom: -12,
                }}
              ></View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ApiKeyHistory;
