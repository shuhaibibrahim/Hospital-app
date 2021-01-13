//shows the doctors filtered out

import React,{useEffect, useState} from 'react'
import { View, StyleSheet, Text, TextInput, ScrollView, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { SearchBar } from 'react-native-elements';
import axios from 'axios'

import colour from '../colors';
import { docPick } from '../../redux/patient/patientActions';

const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const RenderProfiles=(props)=>{

    const user=useSelector(state=>state.login.user);
    const dateSelected=useSelector(state=>state.patient.dateSelected)

    const dispatch=useDispatch();
    
    const [profiles,setProfiles]=useState([])
    const [index,setIndex]=useState(0)

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

                    const newData=data.map(d=>{
                        return { name: d.name,
                                 username: d.username
                                }
                    })

                    console.log(newData);
                    setProfiles(newData);
                }
            }
            
        }).catch(err=>{console.log(err)})
    },[]);

    const renderProfiles=({item,index})=>{
        const deptDiv=
                    <TouchableOpacity 
                        style={styles.search}
                        activeOpacity={0.92}
                        onPress={()=>{
                            dispatch({
                                ...docPick(),
                                docUser: item.username
                            })
                            props.navigation.navigate('docprofile')
                        }}
                    >
                        <View style={styles.profileView} key={item.dept}>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
        return deptDiv;
    }

    return (
        <View style={styles.container}>
            <Text style={{position:'absolute', top:windowHeight-windowHeight*.9}}>Doctors available on {dateSelected.format("MM/DD/YYYY")}</Text>
            <Text style={{position:'absolute', top:windowHeight-windowHeight*.85}}>Department : {props.route.params.dept}</Text>
            <Carousel
                layout={"stack"}
                layoutCardOffset={7}
                data={profiles}
                sliderWidth={windowWidth}
                itemWidth={windowWidth-windowWidth*.2}
                renderItem={renderProfiles}
                containerCustomStyle={styles.profiles}
                contentContainerStyle={styles.profileView}
                onSnapToItem = { index => setIndex(index) }
            />

            <Pagination
              dotsLength={profiles.length}
              activeDotIndex={index}
              containerStyle={{ position:'absolute',top:windowHeight*.8 }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
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