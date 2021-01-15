import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, StatusBar, Button } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import colour from '../colors';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function SignUp()
{

/*const SignUp=(props)=>{
  const [Name,setName] = useState('');
   const [userName,setUserName] = useState('');
   const [email,setemail] = useState('');
   const [phone,setphone] = useState('');
   const [password,setPassword] = useState('');
   const [confirmpassword,setconfirmPassword] = useState('');
   const [signUpMessage,setMessage]=useState(<View/>);
    

  handleSubmit = (e) => {
    
    // perform all neccassary validations
    if (typeof input["password"] !== "undefined" && typeof input["confirmpassword"] !== "undefined") {
       if (input["password"] != input["confirmpassword"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
      }
  
    }
  }

  const [invalidAddress,setinvalidAdrs] = useState('');
  const [address,setaddress] = useState('');
   
  checkAdrs() 
  {
      let rjx="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
      this.setState({address:e})
      if(!rjx.test(e)){
          this.setState({invalidAddress:"Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"})
      }
      else{
          this.setState({invalidAddress:""})
      }
  }
  submit()
   {
      if(this.state.address.length==0)
      {
          alert('All fields are required!')
      }
  }*/
  return(
      <KeyboardAwareScrollView
          style={{ backgroundColor: '#4c69a5' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container1}
          scrollEnabled={true}
          >

      <View style={styles.container}>
        <Image source={require('../../images/logo1.png')} style={styles.logo}/>
        <View>
             <TextInput label="Name" style={styles.inputBox} placeholder="Name" />
              <TextInput style={styles.inputBox} placeholder="Username" />
              <TextInput style={styles.inputBox} placeholder="Password" secureTextEntry={true} />
              </View>
                <TouchableOpacity>
                <Text style={styles.Button}>SignUp</Text>
                
                </TouchableOpacity>
                <Text style={styles.endText}>Already have an account?</Text>

                 <TouchableOpacity 
                    onPress={() => this.navigation.navigate('LoginPage')}>
                    <Text style={styles.Button}>SignIn</Text>
                 </TouchableOpacity>
                
        </View>
      </KeyboardAwareScrollView>
  );
  }


   const styles = StyleSheet.create({
 
      container1 : {
        flex: 1,
        backgroundColor: colour.PRI_COL,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
      },

      container:{
        width:'75%',
      },

      logo: {
        justifyContent : 'center',
        alignItems: 'center',
        alignSelf:'center',
        width: 100,
        height: 100,
        top: -50,
      },

      inputBox: {
         backgroundColor: colour.SEC_COL,
        alignSelf: 'center',
        padding: 3,
        paddingLeft:30,
        top: -20,
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },

      Button: {
       alignSelf:'center',
       alignItems: "center",
       textAlign: 'center',
       backgroundColor: colour.LOGB_COL,
       width: '40%',
       padding: '2%',
       marginTop:20,
       shadowColor: "#000",
       shadowOffset: {
           width: 0,
           height: 2,
        },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
      },

      endText: {
        fontSize: 15,
        marginTop: 20,
        alignSelf:'center',
        alignItems: "center",
        fontWeight: 'bold',
      }

  });