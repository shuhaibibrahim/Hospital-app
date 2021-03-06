import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Image, TouchableNativeFeedback, SafeAreaView, Platform, StatusBar, Button} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import { docLogIn } from '../../redux/doctor/doctorActions'
import { patLogIn } from '../../redux/patient/patientActions';

import axios from 'axios'

import colour from '../colors';
import { TouchableOpacity } from 'react-native';

const LoginPage=(props)=>{
    const [value, setValue] = useState("doctor");
    const options = [
        { label: "Doctor", value: "doctor" },
        { label: "Patient", value: "patient" }
    ];
    
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const [loginMessage,setLoginMessage]=useState(<View/>);

    // let signUp=<View/>;
    const [signUp, setsignUp]=useState(<View/>)

    const authenticate=()=>{
        if(password==='' || userName==='')
        {
            setLoginMessage(<Text style={{position:'relative', top:-10, textAlign:'center', color:'blue'}}>Please fill both fields</Text>)
            return;
        }
        if(value==='doctor')
        {
            axios.get(
                'https://asdserver.herokuapp.com/doctor',
                {
                    params : {
                        username: userName,
                        password : password
                    }
                }
            ).then(res=>{
                if(res.status===200)
                {
                    console.log(res.data)
                    if(res.data.length===0)
                    {
                        setLoginMessage(<Text style={{position:'relative', top:-10, textAlign:'center', color:'red'}}>Invalid username or password</Text>)
                        // console.log(loginMessage);
                    }
                    else
                    {
                        props.dispatch({
                            ...docLogIn(),
                            user:res.data[0].username,
                            name:res.data[0].name
                            });
                        // props.navigation.navigate('dochome') 
                    }
                }
                
            }).catch(err=>{console.log(err)})
        }

        else if(value==='patient')
        {
            axios.get(
                'https://asdserver.herokuapp.com/patient',
                {
                    params : {
                        username: userName,
                        password : password
                    }
                }
            ).then(res=>{
                if(res.status===200)
                {
                    console.log(res.data)
                    if(res.data.length===0)
                    {
                        setLoginMessage(<Text 
                            style={
                                {
                                    position:'relative', 
                                    top:-10, textAlign:'center', 
                                    color:'red'
                                }
                            }
                        >Invalid username or password</Text>)
                        // console.log(loginMessage);
                    }
                    else
                    {
                        props.dispatch({
                            ...patLogIn(),
                            user:res.data[0].username,
                            name:res.data[0].name
                            });
                        // props.navigation.navigate('pathome') 
                    }
                }
                
            }).catch(err=>{console.log(err)})
        }
        
    }

    return (
    <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container1}
        scrollEnabled={true}
    >
    <View style={styles.container}> 
        
        <Image source={require('../../images/logo1.png')} style={styles.logo}/>
        <SwitchSelector
            options={options}
            initial={0}
            value={0}   /* To slect doctor by default initially */
            animationDuration={.1}
            buttonColor={colour.LOGB_COL}
            onPress={value => {
                setValue(value);
                console.log(value);
                if(value==="patient")
                {
                    setsignUp(
                    <TouchableOpacity
                        style={
                            {...styles.loginButton,
                                padding:'5.5%',
                                top: 200,
                                position:'absolute'
                                }
                        }
                        activeOpacity={0.7}
                        onPress={()=>{props.navigation.navigate('signup')}}
                    >    
                        <Text style={{color:'white'}}>sign up</Text>
                    </TouchableOpacity>)
                }
                else    
                {
                    setsignUp(<View/>)
                }
            }}
            style={styles.docPat}
        />
        <View>
            <TextInput 
                placeholder="Enter User Name"  
                style={styles.inputBox}
                onChangeText={user=>{
                    setUserName(user);
                    setLoginMessage(<View/>);
                    }
                }/>

            <TextInput
                secureTextEntry={true}
                placeholder="Enter Password"
                style={styles.inputBox}
                onChangeText={pass=>{
                    setPassword(pass);
                    setLoginMessage(<View/>);
                    }
                }/>
            <TouchableOpacity
                style={
                    {...styles.loginButton,
                    top: 60,
                    position:'relative'
                    }
                }
                activeOpacity={0.7}
                onPress={authenticate}
            >
                    <Text style={{color:'white'}}>login</Text>
            </TouchableOpacity>

            {signUp}

            {loginMessage}

            {console.log("logged in : ",props.loggedIn)}
        </View>

    </View>
    </KeyboardAwareScrollView>
    );
};

//redux
const mapStateToProps = state =>{
    return {
        loggedIn: state.login.loggedIn,
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        dispatch: dispatch
    }
}

//style
const styles = StyleSheet.create({

    container1: {
        flex: 1,
        backgroundColor: colour.PRI_COL,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
    },

    container: {
        // backgroundColor:'red',
        width:'75%',
    },

    docPat: {
        width:'60%',
        alignSelf:"center",
        position:'relative',
        bottom:'30%'
    },

    inputBox: {
        backgroundColor: colour.SEC_COL,
        padding: 3,
        paddingLeft:20,
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    loginButton: {
        alignSelf:'center',
        alignItems: "center",
        backgroundColor: colour.LOGB_COL,
        width: '40%',
        padding: '2%',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    logo: {
        bottom: '60%',
        position: 'relative',
        width: 100,
        height:100,
        alignSelf:'center',

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);