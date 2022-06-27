import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Provider } from 'react-redux';
import {store} from "./app/config/store";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SocketProvider from "./app/providers/socket"
import OrderBook from './app/screens/order'
import Settings from './app/screens/settings'
import { MaterialCommunityIcons } from "@expo/vector-icons";


const MainNav = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
      <NavigationContainer>
       <MainNav.Navigator initialRouteName={"settings"} screenOptions={screenOptions}>
          <Fragment>
              <MainNav.Screen name={"order-book"} component={OrderBook}/>
              <MainNav.Screen name={"settings"} component={Settings} options={{headerShown:false}}/>
          </Fragment>
        </MainNav.Navigator>
       </NavigationContainer>
       </SocketProvider>
    </Provider>
  );
}


const screenOptions = ({ navigation, route }) => {
  return {
      title: "",
      headerStyle: {
          backgroundColor: "white",
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: "grey",
      },
      gestureEnabled: true,
      headerShadowVisible: false,
      headerTintColor: "white",
      headerTitleStyle: {
          color: "black",
          textTransform: "uppercase",
          fontSize: 14,
          letterSpacing: 1,
      },
      headerLeft: () => {
          return (
              <Pressable onPress={() => navigation.goBack()}>
                  <MaterialCommunityIcons name={"arrow-left"} size={16} color={"black"} />
              </Pressable>
          );
      },
  };
};
