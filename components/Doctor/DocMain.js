import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native'
import { useSelector } from 'react-redux';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';

import DocHome from './DocHome';
import colour from '../colors';
import MyPatients from './MyPatients';
import Appoinments from './MyAppoinment';
import Docquora from '../Docquora/Docquora';
import Answers from '../Docquora/Answers';
import DDrawerContent from './DDrawerContent'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator=()=>{
  return (
    <Stack.Navigator >
        <Stack.Screen 
          name="dochome" 
          component={DocHome} 
          options={{ title: 'Home',
          headerLeft: () => (
            <Entypo name="menu" size={24} color="black" style={{paddingLeft: 10}}/>

          )
         }}
        />
        <Stack.Screen 
          name="mypatients" 
          component={MyPatients}
          options={{title:'Patients'}} 
        />
        <Stack.Screen 
          name="appoinments" 
          component={Appoinments}
          options={{title:'Appoinments'}} 
        />
        <Stack.Screen 
          name="docquoraQues" 
          component={Docquora}
          options={{title:'Questions'}} 
        />
        <Stack.Screen 
          name="docquoraAns" 
          component={Answers}
          options={{title:'Answers'}} 
        />
    </Stack.Navigator>
  )
}

export default function DocMain(props) {

  const loggedIn=useSelector(state => state.login.loggedIn);
  const user=useSelector(state => state.login.user);
  return (
    // <NavigationContainer>
    <Drawer.Navigator drawerContent={props => <DDrawerContent {...props} />} initialRouteName="mainhome" >
      <Drawer.Screen name="mainhome" component={MainStackNavigator} />
    </Drawer.Navigator>
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



