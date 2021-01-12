import React, { Component } from 'react';
 
import { StyleSheet, Text, View,StatusBar,Image, TouchableOpacity,TouchableNativeFeedback, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';
import colour from '../colors';
var name="shijin"

export default class mainapp extends Component {
 
  dialCall = () => {
 
    let phoneNumber = '';
 
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${7909245062}';
    }
    else {
      phoneNumber = 'telprompt:${7909245062}';
    }
 
    Linking.openURL(phoneNumber);
  };
 
  render() {
    return (
        <View style={styles.container}>
        <View style={styles.topbar}>
          <Entypo name="menu" size={30} color="gray" />
          <View style={styles.logo}>
            <Image 
            style={{width: 30 , height:30,}}
            source={require('../../images/logo.png')}
            />
          </View>
          <MaterialIcons name="notifications-none" size={30} color="gray" />
        </View>
        <View style={styles.profilePicture}>
          <Image 
            style={{width: 60 , height:60,borderRadius: 50}}
            source={require('../../images/images.jpg')}
  
            />
  
        </View>
        <Text style={{fontWeight: 'bold',position: 'relative',top:35,alignSelf:'center'}}>Profile</Text>
  
        <View style={styles.box}>
          <Text style={{paddingLeft: 50,paddingTop:20,}}>Name-DR.{name}</Text>
          <Text style={{paddingLeft: 50,paddingTop:10,}}>Qualification-{name}</Text>
          <Text style={{paddingLeft: 50,paddingTop:10,}}>Specialized-{name}</Text>
          <Text style={{paddingLeft: 50,paddingTop:10,}}>Experience-{name}</Text>
          <Text style={{paddingLeft: 50,paddingTop:10,}}>Working Time-{name}</Text>
          <Text style={{paddingLeft: 50,paddingTop:10,}}>Gender-{name}</Text>
          <Text style={{paddingLeft: 50,paddingTop:10,}}>Rating - 4.9/5.0</Text>
          <View>
            <Text style={{paddingTop:10,fontWeight: 'bold',alignSelf: 'center'}}>Contacts</Text>
            <Text style={{paddingLeft: 50,paddingTop:20,}}>Email-{name}</Text>
          </View>
          <View>
            <Text style={{paddingTop:10,fontWeight: 'bold',alignSelf: 'center'}}>Social Media</Text>
            <View style={styles.social}>
              <TouchableNativeFeedback>
                <Image style={{width: 30 , height:30,borderRadius:5}}source={require('../../images/2.png')}/>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <Image style={{width: 30 , height:30,borderRadius:5}}source={require('../../images/3.jpg')}/>
  
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <Image style={{width: 30 , height:30,borderRadius:3}}source={require('../../images/1.jpg')}/>
  
              </TouchableNativeFeedback>
            </View>
          </View>
  
        </View>
  
  
  
        <View style={styles.buttons}>
        <View style={styles.buttons1}>
            <TouchableNativeFeedback>
              <Text style={{color: colour.GREEN_COL,fontWeight: 'bold'}}>Set An Appointment</Text>
            </TouchableNativeFeedback>
          </View>
          
          <View style={styles.buttons2}>
            <TouchableNativeFeedback onPress={this.dialCall} >
              <Entypo name="phone" size={24} color="#6BE0D4" />
            </TouchableNativeFeedback>
          </View>
        </View>
  
      </View>
 
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colour.BACKGROUND_COL,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight+5 : 0
    //    alignItems: 'center',
    //    justifyContent: 'center',
      },
      buttons: {
        position: 'absolute',
        top:610,
        flexDirection: "row",
    
        alignSelf: "center"
        
      },
      buttons1: {
    
        justifyContent: 'center',
        alignItems:'center',
    
        width: 250,
        height: 50,
        marginRight: 10,
        borderRadius: 30 ,
        backgroundColor: 'white',
    
    
        
      },
      buttons2: {
    
      justifyContent: 'center',
      alignItems:'center',
    
     marginLeft: 10,
      width: 50,
      height: 50,
      borderRadius: 30 ,
      backgroundColor: 'white'
        
      },
      logo: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      profilePicture: {
        alignItems: 'center',
        position: 'relative',
        top: 20,
        
      },
      box: {
    
        backgroundColor: colour.BOX_COL,
        borderRadius: 10,
        width:320,
        height: 400,
        position: 'relative',
        top:40,
        alignSelf: 'center'
    
      },
      social: {
        flexDirection:'row',
        justifyContent: 'space-around',
        paddingTop: 20
      },
      topbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5
      }
    
    });
    