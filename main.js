import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import colour from './components/colors.js';
import LoginPage from './components/Auth/LoginPage.js'

export default function Main() {

  return (
    //   <Router>
        <SafeAreaView style={styles.container}>
            <LoginPage/>
        </SafeAreaView>
    //   </Router>
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
