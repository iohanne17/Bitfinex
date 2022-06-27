import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {store} from "./app/config/store";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const MainNav = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
       <MainNav.Navigator initialRouteName={"tabs"} screenOptions={{ headerShown: false }}>
          <Fragment>
              {/* <MainNav.Screen name={"tabs"} component={MainStack} />
              <MainNav.Screen name={"details"} component={DetailStack} /> */}
          </Fragment>
        </MainNav.Navigator>
       </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
