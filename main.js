import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native'
import { useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
// import FlashMessage from "react-native-flash-message";

import colour from './components/colors.js';
import LoginPage from './components/Auth/LoginPage';
import PatMain from './components/Patient/PatMain'
import DocMain from './components/Doctor/DocMain.js';
import DocHome from './components/Doctor/DocHome.js';

const Stack = createStackNavigator();

export default function Main() {

  const loggedIn=useSelector(state => state.loggedIn);
  const user=useSelector(state => state.user);
  return (
      // <NativeRouter>
      //       <Route path="/" exact render={
      //         loggedIn==='DOC'
      //           ?((props) => (<DocMain {...props} user={user} />)):(
      //               loggedIn==='PAT'?((props) => (<PatHome {...props} user={user}/>))
      //               :((props) => (<LoginPage {...props} />))
      //           )
      //       }/>
      // </NativeRouter>
      <>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardOverlayEnabled: true,
          gestureEnabled: true,
        }}
      >
          {loggedIn==='DOC'
          ?(<Stack.Screen name="Home" component={DocMain}/>):
          loggedIn==='PAT'?(<Stack.Screen name="Home" component={PatMain}/>):
          (<Stack.Screen name="Login" component={LoginPage}/>) }
      </Stack.Navigator>
      
      {/* <FlashMessage position="top"></FlashMessage> */}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colour.PRI_COL,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
  },
});
