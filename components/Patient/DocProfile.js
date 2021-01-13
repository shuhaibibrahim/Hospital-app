
import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity,TouchableNativeFeedback, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import axios from 'axios'

import colour from '../colors';

var name="shijin"

const DocProfile=(props)=>{
 
  const dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${7909245062}';
    }
    else {
      phoneNumber = 'telprompt:${7909245062}';
    }

    Linking.openURL(phoneNumber);
  };

  const docUser=useSelector(state=>state.patient.docUser)
  const [profile,setProfile]=useState({})

  useEffect(()=>{
    axios.get(
        'https://asdserver.herokuapp.com/patient/doctor',
        {
            params : {
                username:docUser
            }
        }
    ).then(res=>{
        if(res.status===200)
        {
            if(res.data.length===0)
            {
                console.log("There is some error");
            }
            else
            {
                // console.log(res.data)
                const data=res.data;

                const newData={ 
                                name: data[0].name,
                                qualification: data[0].qualification,
                                spec: data[0].spec,
                                gender: data[0].gender,
                                email: data[0].email
                              }

                console.log(newData);
                setProfile(newData);
            }
        }
        
    }).catch(err=>{console.log(err)})
  },[]);

  return (
      <View style={styles.container}>
        

      {/* <Text style={{fontWeight: 'bold',position: 'relative',top:35,alignSelf:'center'}}>Profile</Text> */}
      
      <View style={{width:'85%',alignSelf:'center'}}>
        <View style={styles.profilePicture}>
            <Image 
              style={{width: 60 , height:60,borderRadius: 50}}
              source={require('../../images/images.jpg')}
    
              />
        </View>
        <View style={styles.box}>
            {/* <Text style={{paddingLeft: 50,paddingTop:20,}}>dr.{profile.name}</Text>
            <Text style={{paddingLeft: 50,paddingTop:10,}}>{profile.qualification}</Text>
            <Text style={{paddingLeft: 50,paddingTop:10,}}>specialized on {profile.spec}</Text>
            <Text style={{paddingLeft: 50,paddingTop:10,}}>{profile.gender==='m'?'male':'female'}</Text> */}

            <Text style={{marginBottom:5}}>Dr.{profile.name}</Text>
            <Text style={{marginBottom:5}}>{profile.qualification}</Text>
            <Text style={{marginBottom:5}}>specialized on {profile.spec}</Text>
            <Text style={{marginBottom:5}}>{profile.gender==='m'?'male':'female'}</Text>

            <View>
              <Text style={{paddingTop:20,fontWeight: 'bold'}}>Contacts</Text>
              <Text style={{paddingTop:10}}>Email : {profile.email}</Text>
            </View>
          </View>

          {/* <View>
            <Text style={{paddingTop:20,fontWeight: 'bold'}}>Social Media</Text>
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
          </View> */}
  
      </View>
  
  
  
        <View style={styles.buttons}>
          <View style={styles.buttons1}>
            <TouchableNativeFeedback>
              <Text style={{color: colour.GREEN_COL,fontWeight: 'bold'}}>Set An Appointment</Text>
            </TouchableNativeFeedback>
          </View>
          
          <View style={styles.buttons2}>
            <TouchableNativeFeedback onPress={dialCall} >
              <Entypo name="phone" size={24} color="#6BE0D4" />
            </TouchableNativeFeedback>
          </View>
        </View>

  </View>

  );
}

 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colour.PRI_COL,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight+5 : 0
    //    alignItems: 'center',
    //    justifyContent: 'center',
      },

      box: {
    
        backgroundColor: colour.BOX_COL,
        borderRadius: 10,
        width:'100%',
        position: 'relative',
        top:40,
        padding:40,
        alignSelf: 'center'
    
      },

      buttons: {
        // position: 'absolute',
        width:'85%',
        marginTop:100,
        flexDirection: "row",
        justifyContent:'space-between',
    
        alignSelf: "center"
        
      },
      buttons1: {
    
        justifyContent: 'center',
        alignItems:'center',
    
        width: 250,
        height: 50,
        // marginRight: 10,
        // alignSelf:'flex-start',
        borderRadius: 30 ,
        backgroundColor: 'white',

      },
      buttons2: {
    
        justifyContent: 'center',
        alignItems:'center',
        
        // alignSelf:'flex-end',
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
        // alignItems: 'center',
        position: 'relative',
        top: 20,
        
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
    
export default DocProfile;