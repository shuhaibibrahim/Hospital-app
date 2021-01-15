import React,{useEffect, useState} from 'react'
import { View, StyleSheet, Text, TextInput, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { SearchBar } from 'react-native-elements';
import axios from 'axios'

import colour from '../colors';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const MyAppoinments=(props)=>{

    const user=useSelector(state=>state.login.user);
    
    // const [patients,setPatients] = useState(<View/>);
    const [patients,setPatients] = useState([]);
    const [patientDisp,setPatientDisp] = useState(<View/>);
    const [search,setSearch] = useState(''); 

    // const renderPatients=  () => {
    useEffect(()=>{
        axios.get(
            'https://asdserver.herokuapp.com/patient/myappoinments',
            {
                params : {
                    patUser: user,
                }
            }
        ).then(res=>{
            if(res.status===200)
            {
                if(res.data.length===0)
                {
                    console.log("No patinets");
                    // console.log(loginMessage);
                }
                else
                {
                    // console.log(res.data)
                    const data=res.data;
                    // const newData=data.map(p=>
                    // (<View key={p.username} style={styles.div}>
                    //     <Text>Doctor : {p.name}</Text>
                    // </View>))  
                    // console.log("data : ",data)
                    
                    const newData=data.map(p=>{
                        return {name: p.docuser,
                                token:p.token,
                                date:p.date.slice(0,10)
                                }
                    })

                    // console.log(newData);
                    setPatients(newData);
                    // setPatientSearch(newData);
                    // console.log(patients);
                    
                    setPatientDisp(
                        newData.map(p=>
                        (<View key={p.date+p.name+p.token+""} style={styles.div}>
                            <Text>
                                Doctor : {p.name} {'\n'}
                                Date     : {p.date.slice(0,10)}
                            </Text>
                            <View style={styles.token}>
                                <Text>{p.token}</Text>
                            </View>
                        </View>))
                    )
                }
                // return (<View style={styles.div}><Text>hii</Text></View>);
            }
            
        }).catch(err=>{console.log(err)})
    },[]);

    const searchFor= psearch=> {
        setSearch(psearch);
        if(psearch!='')
        {
            const mySearch=patients.filter(p=>p.name.toLowerCase().includes(psearch.toLowerCase()));
            console.log("mysearch : ",mySearch);

            setPatientDisp(
                mySearch.map(p=>
                (<View key={p.date+p.name+p.token+""} style={styles.div}>
                    <Text>
                        Doctor : {p.name} {'\n'}
                        Date     : {p.date.slice(0,10)}
                    </Text>
                    <View style={styles.token}>
                        <Text>{p.token}</Text>
                    </View>
                </View>))
            )
            
        }
        else{
            setPatientDisp(
                patients.map(p=>
                (<View key={p.date+p.name+p.token+""} style={styles.div}>
                    <Text>
                        Doctor : {p.name} {'\n'}
                        Date     : {p.date.slice(0,10)}
                    </Text>
                    <View style={styles.token}>
                        <Text>{p.token}</Text>
                    </View>
                </View>))
            )
        }

    }

    return (
        
        
        // <ScrollView fadingEdgeLength={5}>

        <KeyboardAwareScrollView
            style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
        >
                {/* <SearchBar
                    placeholder="Enter patient name..."
                    containerStyle={styles.searchbar}
                    inputContainerStyle={{width:'100%',height:10,backgroundColor:'white'}}
                    value={search}
                    onChangeText={search=>searchFor(search)}
                /> */}
                <TextInput 
                    placeholder="Enter patient name"  
                    style={styles.searchbar}
                    onChangeText={search=>searchFor(search)}
                />
                    <View style={styles.patientList}>
                        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between',width:'90%',padding:2}}>
                            <Text style={{fontSize:20, fontWeight:'900'}}>
                                Appoinments
                            </Text>
                            <Text style={{fontSize:20, fontWeight:'900',color:'blue'}}>{patients.length}</Text>
                        </View>
                        <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}} fadingEdgeLength={10} showsVerticalScrollIndicator={false}>
                                {patientDisp}
                        </ScrollView>
                    </View>
        </KeyboardAwareScrollView>
        // </ScrollView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:colour.PRI_COL
    },

    div: {
        backgroundColor: colour.SEC_COL,
        width:'90%',
        height:90,
        margin:10,
        flexDirection:'row',
        // alignItems:'center',
        paddingLeft:50,
        alignItems:'center',
        borderRadius: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },

    patientList: {
        width:'100%',
        alignItems:'center',
        marginTop:130,
        // position:'absolute',
        // top:windowHeight*.2
    },

    searchbar: {
        width:'85%',
        height:40,
        backgroundColor:'white',
        position:'absolute',
        top:50,
        justifyContent:'flex-start',
        paddingLeft:20,
        borderRadius: 50,
        // marginBottom:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    token:{
        justifyContent:'center',
        alignItems:'center',
        width:'15%',
        aspectRatio:1,
        borderRadius:windowWidth*.4/2,
        position:'absolute',
        right:10,
        backgroundColor:'gold',
      },
});

export default MyAppoinments;