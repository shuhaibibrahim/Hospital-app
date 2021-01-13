import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import CalendarPicker from 'react-native-calendar-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import colour from '../colors';
import { datePick } from '../../redux/patient/patientActions';
import Todo from './Todo'

const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const Pathome=(props)=>{

    const [dept, setDept] = useState(null);
    const [date, setDate] = useState(new Date())
    const [datePlaceHolder,setdatePlaceHolder]=useState('Pick a date')
    // const [calendar,setCalender] = useState(<View/>)
    const [calToggle,setCalToggle] = useState(false)

    const user=useSelector(state=>state.login.user)
    const dispatch=useDispatch()
    const dropDownRef = useRef();

    const renderCalender=()=>{
        const cal=calToggle==true?
            <View style={{flex:1, justifyContent:'flex-end'}}>
                <View style={{backgroundColor:'black',flex:2, justifyContent:'center',alignItems:'center'}} opacity={0.5}>
                    <Text style={{color:'white',fontSize:40,fontWeight:'bold'}}>Pick a date</Text>
                </View>
                <View style={styles.calendar}>
                    <CalendarPicker
                    startFromMonday={true}
                    minDate={new Date()}
                    maxDate={new Date(2030,1,1)}
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={date=>{
                        // console.log(date.slice(10))
                        setDate(date)
                        setCalToggle(false)
                        setdatePlaceHolder(date.format("MM/DD/YYYY"))
                        dispatch({
                                ...datePick(),
                                date:date
                            });
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

    console.log(user);
    return (
        <TouchableWithoutFeedback 
            onPress={()=>{
                dropDownRef.current.close()
                setCalToggle(false)
            }}
        >     
        <View style={styles.container}>
        
            <DropDownPicker
                items={[
                    {label: 'PEDIATRICIAN', value: 'PEDIATRICIAN', icon: () => <Icon name="stethoscope" size={18} color="blue" />},
                    {label: 'CARDIOLOGIST', value: 'CARDIOLOGIST', icon: () => <Icon name="stethoscope" size={18} color="blue" />},
                    {label: 'GYNECOLOGIST', value: 'GYNECOLOGIST', icon: () => <Icon name="stethoscope" size={18} color="blue" />},
                    {label: 'SURGEON', value: 'SURGEON', icon: () => <Icon name="stethoscope" size={18} color="blue" />},
                    {label: 'ORTHOPEDIST', value: 'ORTHOPEDIST', icon: () => <Icon name="stethoscope" size={18} color="blue" />},
                    {label: 'ENT', value: 'ENT', icon: () => <Icon name="stethoscope" size={18} color="blue" />}
                ]}

                controller={instance => dropDownRef.current=instance}

                defaultValue={null}
                placeholder="Select a department"

                containerStyle={styles.deptDropdown}
                style={{backgroundColor: colour.SEC_COL}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: colour.SEC_COL,height:1000}}
                labelStyle={{color: 'black', paddingLeft:5}}

                selectedLabelStyle={{paddingLeft:5}}

                placeholderStyle={{marginLeft:10}}

                onChangeItem={item => setDept(item.value)}
            />
            <TouchableWithoutFeedback onPress={()=>setCalToggle(true)}>
                <View style={styles.datePickerStyle}> 
                    <Icon name="calendar-check-o" size={18} color="blue" />
                    <Text style={styles.datePickerLabel}>{datePlaceHolder}</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity
                style={styles.search}
                activeOpacity={0.7}
                onPress={()=>{
                    console.log(date)
                    if(dept!=null && datePlaceHolder!='Pick a date'){
                            props.navigation.navigate('doctors',{
                                date: date.toString(),
                                dept: dept,
                            })
                    }
                }}
            >
                    <Text>Find doctors</Text>
            </TouchableOpacity>

            {renderCalender()}

            {/* <View style={{position:'absolute',backgroundColor:colour.SEC_COL, bottom:0,width:'100%',height:windowHeight*.5 }}> */}
                <Todo/>
            {/* </View> */}
            {/* <CalendarPicker
                startFromMonday={true}
                minDate={new Date()}
                maxDate={new Date(2030,1,1)}
                
                containerStyle={{backgroundColor:'white'}}

                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={date=>setDate(date)}
            /> */}
        
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    calendar:{
        backgroundColor:colour.SEC_COL,
        // position:'absolute',
        // bottom:0,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    container: {
        backgroundColor:colour.PRI_COL,
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    
    datePickerLabel:{
        justifyContent:'center',
        color: 'black', 
        paddingLeft:10,
    },

    datePickerStyle: {
        flexDirection:'row',
        position:'absolute',
        top:windowHeight*.15,
        width: '90%',
        height:40,
        marginTop: 20,
        backgroundColor:colour.SEC_COL,
        borderRadius:5,
        paddingLeft:10,
        alignItems:'center'
    },

    deptDropdown:{
        height: 40,
        width:'90%',
        position:'absolute',
        top:windowHeight*.1
    },

    search:{
        backgroundColor:colour.SEC_COL,
        width:'90%',
        height:40,
        borderRadius:50,
        position:'absolute',
        top:windowHeight*.3,
        justifyContent:'center',
        alignItems:'center',

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    }
    
});

export default Pathome;