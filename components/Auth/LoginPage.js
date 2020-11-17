import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Image, TouchableNativeFeedback, KeyboardAvoidingView} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { connect } from 'react-redux';

import { docLogIn } from '../../redux/doctor/doctorActions'
import { patLogIn } from '../../redux/patient/patientActions';

import axios from 'axios'

import colour from '../colors';

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

    const authenticate=()=>
    {
        if(password==='' || userName==='')
        {
            setLoginMessage(<Text style={{position:'relative', top:-10, textAlign:'center', color:'blue'}}>Please fill both fields</Text>)
            return;
        }
        if(value==='doctor')
        {
            axios.get(
                'http://192.168.1.5:8080/doctor',
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

                        props.dispatch(docLogIn());
                        // setLoginMessage(<Text style={{position:'relative', top:-10, textAlign:'center', color:'green'}}>Welcome {value}</Text>)
                        
                    }
                }
                
            }).catch(err=>{console.log(err)})
        }

        else if(value==='patient')
        {
            axios.get(
                'http://192.168.1.5:8080/patient',
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
                        props.dispatch(patLogIn());
                    }
                }
                
            }).catch(err=>{console.log(err)})
        }
        
    }

    return (
    
    
    <View style={styles.container}> 
        
        <Image source={require('../../images/logo3.png')} style={styles.logo}/>
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
                    <TouchableNativeFeedback>    
                        <Text style={
                            // {...styles.loginButton,
                            
                            // padding:'5%',
                            // top: 200,
                            // position:'absolute'
                            // }
                            {...styles.loginButton,
                                padding:'5.5%',
                                top: 200,
                                position:'absolute'
                                }
                        }>sign up</Text>
                    </TouchableNativeFeedback>)
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
            <TouchableNativeFeedback  onPress={authenticate}>
                    <Text 
                        style={
                            {...styles.loginButton,
                            top: 60,
                            position:'relative'
                            }
                        }
                    >login</Text>
            </TouchableNativeFeedback>

            {signUp}

            {loginMessage}

            {console.log("doctor logged in : ",props.docLoggedIn)}
            {console.log("patient logged in : ",props.patLoggedIn)}
        </View>

    </View>
    );
};

//redux
const mapStateToProps = state =>{
    return {
        docLoggedIn: state.docLoggedIn,
        patLoggedIn: state.patLoggedIn
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        dispatch: dispatch
    }
}

//style
const styles = StyleSheet.create({

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
        textAlign: "center",
        backgroundColor: colour.LOGB_COL,
        color: 'white',
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
        borderColor:'black',
        borderWidth:2,
        borderRadius:50
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);