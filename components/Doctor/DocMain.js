import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native'
import { useSelector } from 'react-redux';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DocHome from './DocHome';
import colour from '../colors';
import MyPatients from './MyPatients';

const Stack = createStackNavigator();

export default function DocMain(props) {

  const loggedIn=useSelector(state => state.loggedIn);
  const user=useSelector(state => state.user);
  return (
    // <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen 
          name="dochome" 
          component={DocHome} 
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="mypatients" 
          component={MyPatients}
          options={{title:'Patients'}} 
        />
      </Stack.Navigator>
    // </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: colour.PRI_COL,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



