import React,{useEffect, useState} from 'react'
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { SearchBar } from 'react-native-elements';
import axios from 'axios'

import colour from '../colors';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MyPatients=(props)=>{

    const user=useSelector(state=>state.user);
    
    // const [patients,setPatients] = useState(<View/>);
    const [patients,setPatients] = useState([]);
    const [patientDisp,setPatientDisp] = useState(<View/>);
    const [search,setSearch] = useState(''); 

    // const renderPatients=  () => {
    useEffect(()=>{
        axios.get(
            'http://192.168.1.9:8080/doctor/mypatients',
            {
                params : {
                    username: user,
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
                    //     <Text>Name : {p.name}</Text>
                    // </View>))

                    const newData=data.map(p=>{
                        return {name: p.name,
                                username: p.username,
                                dob: p.dob
                                }
                    })

                    console.log(newData);
                    setPatients(newData);
                    // setPatientSearch(newData);
                    console.log(patients);
                    
                    setPatientDisp(
                        newData.map(p=>
                        (<View key={p.username} style={styles.div}>
                            <Text>
                                Name : {p.name} {'\n'}
                                DOB    : {p.dob.slice(0,10)}
                            </Text>
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
                (<View key={p.username} style={styles.div}>
                    <Text>
                        Name : {p.name} {'\n'}
                        DOB    : {p.dob.slice(0,10)}
                    </Text>
                </View>))
            )
            
        }
        else{
            setPatientDisp(
                patients.map(p=>
                (<View key={p.username} style={styles.div}>
                    <Text>
                        Name : {p.name} {'\n'}
                        DOB    : {p.dob.slice(0,10)}
                    </Text>
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
                        <Text style={{fontSize:20, fontWeight:'900', position:'relative', bottom:10}}>
                            patients
                        </Text>
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
        // alignItems:'center',
        paddingLeft:50,
        justifyContent:'center',
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
        marginTop:130
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
    }
});

export default MyPatients;