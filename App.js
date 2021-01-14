import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

import Main from "./main";
import DocMain from "./components/Doctor/DocMain";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

<<<<<<< HEAD
import DocHome from "./components/Doctor/DocHome";
import LoginPage from "./components/Auth/LoginPage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Appointment from "./components/Patient/Appointment";
import Docprofile from "./components/Patient/DocProfile";
import Docquora from "./components/Doctor/Docquora";
import Todo from "./components/Patient/todo";
import Menu from "./components/Patient/Menu";
=======
import DocHome from './components/Doctor/DocHome';
import LoginPage from './components/Auth/LoginPage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Appointment from './components/Patient/Appointment';
import Docprofile from './components/Patient/DocProfile';
import Docquora from './components/Docquora/Docquora'
import Todo from './components/Patient/Todo'
>>>>>>> dc11fc0c02d609f7780f00e61e7b844feacc3b5b

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