import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native'
import { useSelector } from 'react-redux';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PatHome from './PatHome';
import RenderProfiles from './RenderProfiles'
import DocProfile from './DocProfile'
import Docquora from '../Docquora/Docquora'
import Answers from '../Docquora/Answers'
import colour from '../colors';
import PDrawerContent from './PDrawerContent'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator=()=>{
  return (
    <Stack.Navigator >
        <Stack.Screen 
          name="pathome" 
          component={PatHome} 
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="doctors" 
          component={RenderProfiles}
          options={{title:'Doctors'}} 
        />
        <Stack.Screen 
          name="docprofile" 
          component={DocProfile} 
          options={{ title: 'Profile' }}
        />
        <Stack.Screen 
          name="docquoraQues" 
          component={Docquora} 
          options={{ title: 'Questions' }}
        />
        <Stack.Screen 
          name="docquoraAns" 
          component={Answers} 
          options={{ title: 'Answers' }}
        />
      </Stack.Navigator>
  )
}

export default function DocMain(props) {

  const loggedIn=useSelector(state => state.loggedIn);
  const user=useSelector(state => state.user);
  return (
    // <NavigationContainer>
        // <MainStackNavigator/>
      <Drawer.Navigator drawerContent={props => <PDrawerContent {...props} />} initialRouteName="mainhome" >
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