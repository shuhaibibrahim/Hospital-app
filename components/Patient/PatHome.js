import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import DropDownPicker from 'react-native-dropdown-picker';
import CalendarPicker from 'react-native-calendar-picker';
import DatePicker from 'react-native-date-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import colour from '../colors';


const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const Pathome=(props)=>{

    const [deptIndex, setIndex] = useState(0);
    const [dept, setDept] = useState(null);
    const [date, setDate] = useState(new Date())
    const [datePlaceHolder,setdatePlaceHolder]=useState('Pick a date')
    // const [calendar,setCalender] = useState(<View/>)
    const [calToggle,setCalToggle] = useState(false)

    const user=useSelector(state=>state.user)
    const dropDownRef = useRef();

    const renderDept=({item,index})=>{
        const deptDiv=<View style={styles.deptView} key={item.dept}>
                        <Text>{item.dept}</Text>
                    </View>
        return deptDiv;
    }

    const renderCalender=()=>{
        const cal=calToggle==true?<View style={styles.calendar}>
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
                    }}
                    customDatesStyles={[
                        {containerStyle:{
                            backgroundColor:'white'  
                        }}
                    ]}
                    />
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
            // onPress={()=>dropDownRef.current.close()}
        >     
        <View style={styles.container}>
            {/* <Text style={{position:'absolute',top:windowHeight-(windowHeight*.88)}}>Departments</Text>

                <Carousel
                  layout={"default"}+
                  data={depts}
                  sliderWidth={windowWidth}
                  itemWidth={windowWidth-windowWidth*.2}
                  renderItem={renderDept}
                  containerCustomStyle={styles.depts}
                  contentContainerStyle={styles.deptView}
                  onSnapToItem = { index => setIndex(index) }
                />
                <Pagination
                    dotsLength={depts.length}
                    activeDotIndex={deptIndex}
                    containerStyle={styles.dots}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        // marginHorizontal: 8,
                        // backgroundColor: 'rgba(255, 255, 255, 0.92)'
                    }}
                    // inactiveDotStyle={{
                    //     // Define styles for inactive dots here
                    // }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                /> */}
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
                    props.navigation.navigate('doctors',{
                        date: date.toString(),
                        dept: dept,
                    })
                }}
            >
                    <Text>Find doctors</Text>
            </TouchableOpacity>

            {renderCalender()}
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
        position:'absolute',
        top:windowHeight-windowHeight*.5,
        
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
        top:windowHeight-windowHeight*.75,
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
        top:windowHeight-windowHeight*.8
    },

    depts:{
        position:'absolute',
        top:windowHeight-(windowHeight*.8),
        height:'60%',
    },

    deptView:{
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

    search:{
        backgroundColor:colour.SEC_COL,
        width:'90%',
        height:40,
        borderRadius:50,
        position:'absolute',
        top:windowHeight-windowHeight*.6,
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