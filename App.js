import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store'

import Main from './main'
import DocMain from './components/Doctor/DocMain';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DocHome from './components/Doctor/DocHome';
import LoginPage from './components/Auth/LoginPage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Appointment from './components/Patient/Appointment';
import Docprofile from './components/Patient/DocProfile';

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <KeyboardAwareScrollView> */}
          <Main/>
        {/* </KeyboardAwareScrollView> */}
      </NavigationContainer>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="NULL">
          <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen 
            name="dochome" 
            component={DocHome} 
            options={{ title: 'Home' }}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
    </Provider>
  );
}


