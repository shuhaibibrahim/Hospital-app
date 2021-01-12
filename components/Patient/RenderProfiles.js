//shows the doctors filtered out

import React,{useEffect, useState} from 'react'
import { View, StyleSheet, Text, TextInput, ScrollView, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { SearchBar } from 'react-native-elements';
import axios from 'axios'

import colour from '../colors';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const RenderProfiles=(props)=>{

    const user=useSelector(state=>state.user);
    
    const [profiles,setProfiles]=useState([])

    const newDate=new Date(props.route.params.date)
    console.log(newDate)
    console.log(newDate.getDay())

    // const renderPatients=  () => {
    useEffect(()=>{
        axios.get(
            'https://asdserver.herokuapp.com/patient/doctorProfiles',
            {
                params : {
                    dept: props.route.params.dept,
                    date: newDate
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

                    const newData=data.map(d=>{
                        return { name: d.name,
                                 username: d.username
                                }
                    })

                    console.log(newData);
                    setProfiles(newData);
                    // setPatientSearch(newData);
                    // console.log(profiles);
                    
                    // setPatientDisp(
                    //     newData.map(p=>
                    //     (<View key={p.username} style={styles.div}>
                    //         <Text>
                    //             Name : {p.name} {'\n'}
                    //             DOB    : {p.dob.slice(0,10)}
                    //         </Text>
                    //     </View>))
                    // )
                }
                // return (<View style={styles.div}><Text>hii</Text></View>);
            }
            
        }).catch(err=>{console.log(err)})
    },[]);

    const renderProfiles=({item,index})=>{
        const deptDiv=<View style={styles.profileView} key={item.dept}>
                        <Text>{item.name}</Text>
                    </View>
        return deptDiv;
    }

    return (
        <View style={styles.container}>
            <Carousel
                layout={"stack"}
                layoutCardOffset={7}
                data={profiles}
                sliderWidth={windowWidth}
                itemWidth={windowWidth-windowWidth*.2}
                renderItem={renderProfiles}
                containerCustomStyle={styles.profiles}
                contentContainerStyle={styles.profileView}
                // onSnapToItem = { index => setIndex(index) }
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor:colour.PRI_COL,
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    
    profiles:{
        position:'absolute',
        top:windowHeight-(windowHeight*.8),
        height:'60%',
    },

    profileView:{
        height:'100%',
        backgroundColor:colour.SEC_COL,
        alignItems:'center',
        justifyContent:'center',
        
    },
    dots:{
        position:'absolute',
        top:windowHeight-(windowHeight*.15),
        width:'20%'
    },
 
});

export default RenderProfiles;