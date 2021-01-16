import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, StatusBar, Button,TouchableWithoutFeedback,TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CalendarPicker from 'react-native-calendar-picker'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

import colour from '../colors';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

export default function SignUp(props)
{

  const [name,setName]=useState('')
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
//   const [confirmPassword,setConfirmPassword]=useState('')
  const [usernameDisp,setUsernameDisp]=useState(<View/>)
  const [passwordDisp,setPasswordDisp]=useState(<View/>)

  const [date, setDate] = useState(new Date())
  const [calToggle,setCalToggle] = useState(false)
  const [datePlaceHolder,setdatePlaceHolder]=useState('Date of Birth')

  const renderCalender=()=>{
    const cal=calToggle==true?
    <View style={{flex:1,width:windowWidth,position:'absolute',height:'100%'}}>
        <TouchableWithoutFeedback onPress={()=>{setCalToggle(false)}}>
        <View style={{backgroundColor:'black',flex:2, justifyContent:'center',alignItems:'center'}} opacity={0.5}>
            <Text style={{color:'white',fontSize:40,fontWeight:'bold'}}>Pick a date</Text>
        </View>
        </TouchableWithoutFeedback>
        <View style={styles.calendar}>
            <CalendarPicker
            startFromMonday={true}
            minDate={new Date(1970,1,1)}
            maxDate={new Date(2030,1,1)}
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={date=>{
                // console.log(date.slice(10))
                setDate(date)
                setCalToggle(false)
                setdatePlaceHolder(date.format("MM/DD/YYYY"))
            }}
            customDatesStyles={[
                {containerStyle:{
                    backgroundColor:'white'  
                }}
            ]}
            />
        </View>
    </View>:<View/>

    return cal
  }

  const verifyUsername=(username)=>{
    if(username){
        axios.get(
            'https://asdserver.herokuapp.com/patient/verifyUsername',
            {
                params : {
                    username:username
                }
            }
        ).then(res=>{
            if(res.status===200)
            {
                if(res.data[0].count==="0")
                {
                    console.log("new user");
                    setUsernameDisp(<View/>)
                }
                else
                {
                    console.log(res.data)
                    setUsernameDisp(<View style={{alignItems:'center',justifyContent:'center',position:'relative',top:-20}}>
                        <Text style={{color:'red',justifyContent:'center'}}>Username already exist</Text>
                    </View>)
                    // const data=res.data;
    
                    // const newData={ 
                    //                 name: data[0].name,
                    //                 qualification: data[0].qualification,
                    //                 spec: data[0].spec,
                    //                 gender: data[0].gender,
                    //                 email: data[0].email
                    //               }
    
                    // console.log(newData);
                    // setProfile(newData);
                }
            }
            
        }).catch(err=>{console.log(err)})
    }
    else{
        setUsernameDisp(<View/>)
    }
  }

  const validatePassword=(newPassword)=>{
      if(newPassword!=password){
        setPasswordDisp(<View style={{alignItems:'center',justifyContent:'center',position:'relative',top:-20}}>
            <Text style={{color:'red',justifyContent:'center'}}>Password doesn't match</Text>
        </View>)
      }
      else{
          setPasswordDisp(<View/>)
      }
  }

  const signmeUp=()=>{
      if(password&&date&&username&&name)
      {
        axios.get(
            'https://asdserver.herokuapp.com/patient/signup',
            {
                params : {
                    username:username,
                    password:password,
                    name:name,
                    date:date
                }
            }
        ).then(res=>{
            if(res.status===200)
            {
                console.log("Insert success")
                props.navigation.navigate('Login')
            }
            
        }).catch(err=>{console.log(err)})
      }
  }

  return(
    // <KeyboardAwareScrollView
    //     // style={{ backgroundColor: '#4c69a5' }}
    //     resetScrollToCoords={{ x: 0, y: 0 }}
    //     // contentContainerStyle={styles.container1}
    //     scrollEnabled={true}
    //     >
       
    <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
    >
      {/* <View style={styles.container}> */}
        <Image source={require('../../images/logo1.png')} style={styles.logo}/>
        <View style={{width:'90%'}}>
            <TextInput label="Name" style={styles.inputBox} onChangeText={name=>setName(name)} placeholder="Name" />
            <TextInput 
                style={styles.inputBox} 
                placeholder="Username" 
                onChangeText={username=>{
                                    setUsername(username)
                                    verifyUsername(username)
                                }
                        } 
            />
            {usernameDisp}
            <TextInput style={styles.inputBox} placeholder="Password" onChangeText={password=>setPassword(password)} secureTextEntry={true} />
            <TextInput style={styles.inputBox} placeholder="Confirm Password" onChangeText={password=>validatePassword(password)} secureTextEntry={true} />
            {passwordDisp}
            <TouchableWithoutFeedback onPress={()=>setCalToggle(true)}>
                <View style={styles.datePickerStyle}> 
                    <Icon name="calendar-check-o" size={18} color="blue" />
                    <Text style={styles.datePickerLabel}>{datePlaceHolder}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
        
        <TouchableOpacity style={styles.Button} onPress={()=>{signmeUp()}}>
            <Text >SignUp</Text> 
        </TouchableOpacity>
        
        <Text style={styles.endText}>Already have an account?</Text>

        <TouchableOpacity style={styles.Button}  onPress={()=>{props.navigation.navigate('Login')}}>
          <Text >SignIn</Text>
        </TouchableOpacity>
        
        {renderCalender()}
        
        {/* </View> */}
    </KeyboardAwareScrollView>
  );
  }


   const styles = StyleSheet.create({
 
    calendar:{
      backgroundColor:colour.SEC_COL,
      position:'absolute',
      bottom:0,
      zIndex:10,
    //   marginBottom:0,
      borderBottomWidth:1,
      borderColor:'black',
      
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    // container : {
    //     flex: 1,

    //     backgroundColor: colour.PRI_COL,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
    // },

    // container:{
    //     width:'75%',
    // },
    container: {
        backgroundColor:colour.PRI_COL,
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },

    datePickerLabel:{
      justifyContent:'center',
      color: 'black',
      opacity:.4, 
      paddingLeft:2,
    },

    datePickerStyle: {
        flexDirection:'row',
        // position:'absolute',
        // top:windowHeight*.18,
        width: '100%',
        height:40,
        marginTop: -10,
        backgroundColor:colour.SEC_COL,
        borderRadius:50,
        paddingLeft:10,
        alignItems:'center'
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
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },

    Button: {
       alignSelf:'center',
       alignItems: "center",
       textAlign: 'center',
       backgroundColor: colour.LOGB_COL,
       width: '40%',
       padding: '2%',
       marginTop:20,
    //    shadowColor: "#000",
    //    shadowOffset: {
    //        width: 0,
    //        height: 2,
    //     },
    //    shadowOpacity: 0.25,
    //    shadowRadius: 3.84,
    //    elevation: 5,
    },

    endText: {
        fontSize: 15,
        marginTop: 20,
        alignSelf:'center',
        alignItems: "center",
        fontWeight: 'bold',
    }

  });