import React,{useEffect, useState} from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { SearchBar } from 'react-native-elements';
import axios from 'axios'

import colour from '../colors';

const MyPatients=(props)=>{

    const user=useSelector(state=>state.user);
    
    const [patients,setPatients] = useState(<View/>);
    const [search,setSearch] = useState(''); 

    // const renderPatients=  () => {
    useEffect(()=>{
        axios.get(
            'http://192.168.1.8:8080/doctor/mypatients',
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
                    const newData=data.map(p=>
                    (<View key={p.username} style={styles.div}>
                        <Text>Name : {p.name}</Text>
                    </View>))

                    setPatients(newData)
                    console.log(patients);
                }
                // return (<View style={styles.div}><Text>hii</Text></View>);
            }
            
        }).catch(err=>{console.log(err)})
    },[]);

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Type Here..."
                containerStyle={{width:'85%',
                                height:40,
                                backgroundColor:'white',
                                position:'absolute',
                                top:'10%',
                                justifyContent:'flex-start',
                                paddingTop:'1.5%',
                                borderWidth: 1, 
                                borderRadius: 5
                            }}
                inputContainerStyle={{width:'100%',height:10,backgroundColor:'white'}}
                value={search}
                onChangeText={search=>{setSearch(search)}}
            />
            {patients}
            {/* <View style={styles.div}>
                <Text>hwloo</Text>
            </View> */}
        </View>
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
        width:'75%',
        height:'10%',
        margin:10,
        alignItems:'center',
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
});

export default MyPatients;