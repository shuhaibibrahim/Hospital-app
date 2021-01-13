import React, { useState, useRef } from 'react'
import { Animated, StyleSheet, Text, View, StatusBar, Dimensions, TextInput, TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colour from '../colors';
import Note from "./Note";
import Icon from 'react-native-vector-icons/MaterialIcons';

const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const Todo=()=>{

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     noteArray: [],
  //     noteText: '',
  //   }
  // }
  const [noteArray,setnoteArray]=useState([])
  const [noteText,setnoteText]=useState('')
  const [reminderToggle, setreminderToggle]=useState(false)

  const heightAnim = useRef(new Animated.Value(windowHeight*.05)).current;
  // const heightAnim=windowHeight*.05

  const changeHeight = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(heightAnim, {
      toValue: reminderToggle===true?windowHeight*.5:windowHeight*.05,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const addNote=()=>{
    
    var newArray=noteArray
    if (noteText) {
      var d = new Date();
      newArray.push({'date': d.getFullYear() +"/"+ (d.getMonth() + 1) + "/" + d.getDate(), 'note': noteText
    });
      setnoteArray([...newArray])
      setnoteText('');
    }
  }

  const deleteNote=(key)=>{
    var newArray=noteArray
    newArray.splice(key,1)
    setnoteArray([...newArray])
  }

  let notes = noteArray.map((val,key) => {
    return <Note key={key} keyval={key} val={val}
    deleteMethod={ ()=> deleteNote(key) }/>
  });

  //styles is kept inside the cfunction to use the reminderToggle state
  const styles = StyleSheet.create({
    container: {
      flex:1,
      position:'absolute',
      backgroundColor:colour.SEC_COL, 
      bottom:0,
      width:'100%',
      // height:reminderToggle===true?windowHeight*.5:windowHeight*.05
    },
    header: {
      // backgroundColor: colour.TEAL_GREEN,
      // alignItems: 'center',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      padding:10,
      // borderBottomWidth: 10,
      height:windowHeight*.05,
      borderBottomColor: '#ddd'
    },
    headertext: {
      color: 'black',
      fontSize: 18,
  
    },
    scrollcontainer: {
      flex:1,
      marginBottom:10,
    },
    footer: {
  
      position: 'relative',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: "row",
      backgroundColor: '#252525',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
      justifyContent: 'space-between'
  
    },
    textinput: {
      alignSelf:'stretch',
      color: '#fff',
      padding: 20,
      marginRight: 55,
  
    },
    addButton: {
      position: 'absolute',
     // zIndex: 19,
     // right: 20,
     // bottom: 90,
      right: 10,
      backgroundColor: 'dodgerblue',
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      elevation: 10,
  
    },
    addButtonText: {
      color: '#fff',
      fontSize: 24,
    }
  });
  
  return(
    <Animated.View 
    style={[
      styles.container,
      {
        height:heightAnim
      }
    ]}>
      <View style={styles.header}>
        <Text style={styles.headertext}> REMINDERS</Text>
        
        <TouchableOpacity onPress={()=>{
            changeHeight()
            setreminderToggle(flag=>!flag)
        }}>
          <Icon name={reminderToggle===true?'keyboard-arrow-up':'keyboard-arrow-down'} size={27} color="blue" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollcontainer}>
        {/* <Text style={{position:'relative', top: 2,fontSize:50 }}>Add Some Reminders</Text> */}
        {notes}
      </ScrollView>

        <View style={styles.footer}>
          <TextInput style={styles.textinput} 
          onChangeText={(noteText) =>{
            console.log(noteText)
            setnoteText(noteText)}}
          value={noteText}
          placeholder="Type your reminder"
          placeholderTextColor='white' 
          underlineColorAndroid='transparent'></TextInput>
          
          <TouchableOpacity style={styles.addButton} onPress={()=>addNote()}>
            <Text style={styles.addButtonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        
    </Animated.View>
  );

} 

export default Todo;