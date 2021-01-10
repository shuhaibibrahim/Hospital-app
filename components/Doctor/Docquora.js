import React from 'react';
import { StyleSheet, Text,Keyboard, View,ScrollView,KeyboardAvoidingView,TextInput, Image, Platform,StatusBar, Button, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';
import colour from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );


export default function App() {
  return (


    <ScrollView style={styles.scrollView}>
    <KeyboardAvoidingView >
    <DismissKeyboard>
    <View style={styles.container}>
        <View style={styles.box}>
            <Text style={{color:"gray",justifyContent:'center',paddingTop:200,alignSelf:'center'}}>
                Ask questions...
            </Text>
        </View>
        <View style ={styles.button}>
        <TextInput
              style={{
                height: 40,
                paddingLeft: 30,
                paddingRight: 30,
                marginBottom: 30,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 30,
                width: 280,
                alignSelf: "center",
              }}
              placeholder="Type a message.."
            />
            <View style={styles.buttons2}>
          <TouchableNativeFeedback>
            <FontAwesome name="send" size={20} color="#6BE0D4" />
          </TouchableNativeFeedback>
        </View>
        </View>
    </View>
    </DismissKeyboard>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colour.BACKGROUND_COL,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight+5 : 0
//    alignItems: 'center',
//    justifyContent: 'center',
  },

  box: {
    flex:1,
    backgroundColor: colour.BOX_COL,
    borderRadius: 10,
    marginBottom: 70,

    width:320,
    height: 500,
    position: 'relative',
    top:40,
    alignSelf: 'center'

  },
  button:{
      flexDirection: 'row',
      justifyContent: 'center'


  },
  buttons2: {
      backgroundColor: "white",
      width:40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginLeft: 20

  },
  scrollView: {
    backgroundColor: '#ECF0F3',
    marginBottom: 0
}
 

});
