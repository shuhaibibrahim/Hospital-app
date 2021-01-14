import React, { useState, useEffect } from 'react';
import {Alert, StyleSheet, Text,Keyboard, View,ScrollView,Dimensions ,TextInput, Image, Platform,StatusBar, Button, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';
import colour from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';


const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );


const Docquora=(props)=>{

  const [que,setQue]=useState('')
  const [questions,setQuestions]=useState([])
  const [questionsDisp,setquestionsDisp]=useState([])
  
  const loggedIn=useSelector(state=>state.login.loggedIn)

  useEffect(()=>{

    axios.get('https://asdserver.herokuapp.com/docquora/questions').then(res=>{
        if(res.status===200)
        {
            if(res.data.length===0)
            {
                console.log("No questions");
                // console.log(loginMessage);
            }
            else
            {
                // console.log(res.data)
                const data=res.data;

                const newData=data.map(d=>{
                    return {
                              qid:d.qid,
                              question:d.question,
                              ansnumbers:d.ansnumbers
                            }
                })

                console.log(newData);
                setQuestions(newData);
                // setPatientSearch(newData);
                console.log(newData);
                
                setquestionsDisp(
                    newData.map(d=>
                    (<View key={d.qid} style={styles.div}>
                        <Text style={{position:"absolute", top:10,left:10, fontSize:20}}>
                            Q : {d.question}
                        </Text>

                        <TouchableOpacity onPress={()=>{
                                  props.navigation.navigate('docquoraAns',{
                                    ansFlag:loggedIn==='DOC'?true:false,
                                    qid:d.qid,
                                    question:d.question
                                  })
                                }
                              }
                              style={{position:"absolute",bottom:10,right:10}}>
                            <View>
                              <Text style={{fontSize:10,fontWeight:'bold'}}>
                                  Answered : {d.ansnumbers}
                              </Text>
                            </View>
                        </TouchableOpacity>
                    </View>))
                )
            }
            // return (<View style={styles.div}><Text>hii</Text></View>);
        }
        
    }).catch(err=>{console.log(err)})

  },[]);

  const postQuestion=()=>{
    
    var newQuestions=questions
    var newQuestionsDisp=questionsDisp

    if (que) {

      axios.get(
          'https://asdserver.herokuapp.com/docquora/postquestion',
          {
              params : {
                  question:que
              }
          }
      ).then(res=>{
          if(res.status===200)
          {
              console.log("insert success.. rows: ",res.data)
              
              newQuestions.push({
                qid:res.data[0].qid,
                question:que,
                ansnumbers:0
              });

              console.log("no problem here")
              newQuestionsDisp.push(<View key={res.data[0].qid} style={styles.div}>
                <Text style={{position:"absolute", top:10,left:10, fontSize:20}}>
                    Q : {que}
                </Text>

                <TouchableOpacity onPress={()=>{
                                  props.navigation.navigate('docquoraAns',{
                                    ansFlag:loggedIn==='DOC'?true:false,
                                    qid:res.data[0].qid,
                                    question:que
                                  })
                                }
                              }
                              style={{position:"absolute",bottom:10,right:10}}>

                    <View>
                        <Text style={{fontSize:10,fontWeight:'bold'}}>
                            Answered : {0}
                        </Text>
                    </View>
                </TouchableOpacity>
              </View>)

              setQuestions([...newQuestions])
              setquestionsDisp([...newQuestionsDisp])
          }
          
      }).catch(err=>{console.log(err)})

      setQue('');

    }
  }
  
  return (
    <KeyboardAwareScrollView
            style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
        >

        <View style={styles.header}>
            <Text style={styles.headerText}>
              DocQuora
            </Text>
        </View>
        {/* <View style={styles.box}>
            <Text style={{color:"gray",justifyContent:'center',paddingTop:200,alignSelf:'center'}}>
                Ask questions...
            </Text>
        </View> */}
        {/* <KeyboardAwareScrollView
            style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
        >
        <View style={styles.questions}>
          {questionsDisp}
        </View>
        </KeyboardAwareScrollView> */}
        <View style={styles.questions}>
          <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}} fadingEdgeLength={10} showsVerticalScrollIndicator={false}>
                {questionsDisp}
          </ScrollView>
        </View>

        {props.route.params.askFlag&&<View style ={styles.ask}>
          <TextInput
              style={styles.qinput}
              placeholder="Ask anything.."
              onChangeText={que=>setQue(que)}
          />

          <View style={styles.send}>
            <TouchableNativeFeedback onPress={()=>{postQuestion()}}>
              <FontAwesome name="send" size={20} color="#6BE0D4" />
            </TouchableNativeFeedback>
          </View>
        </View>}

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({

  ask:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    position:'absolute',
    bottom:windowHeight*.05,
    width:'100%',
    height:windowHeight*.12,
    backgroundColor: '#252525',
    alignItems:'center',
    position:'absolute',
    bottom:0,
    paddingLeft:10,
    paddingRight:10,
  },
  
  container: {
    flex: 1,
    backgroundColor: colour.PRI_COL,
    alignItems: 'center',
    justifyContent: 'center',
  },

  div: {
    backgroundColor: colour.SEC_COL,
    width:'100%',
    height:90,
    // margin:10,
    // alignItems:'center',
    paddingLeft:50,
    borderBottomWidth:1,
    borderColor:'black',
    // justifyContent:'center',
    // borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  header:{
    position:'absolute',
    top:0,
    width:windowWidth,
    flex:2
  },

  headerText:{
    fontSize:windowHeight*.03,
    // position:'absolute',
    paddingTop:windowHeight*.05,
    paddingBottom:windowHeight*.05,
    paddingLeft:windowWidth*.03,
    width:'100%',
    backgroundColor: '#252525',
    color:'white'
  },

  qinput:{
    height: 40,
    paddingLeft: 30,
    // paddingRight: 30,
    // marginBottom: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 30,
    width: '80%',
    backgroundColor:colour.SEC_COL,
    // position:'absolute',
    // bottom:windowHeight*.1
  },

  questions:{
    alignItems:'center',
    width:'100%',
    marginBottom:windowHeight*.12,
    marginTop:windowHeight*.14,
  },

  send: {
      backgroundColor: "white",
      width:40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,

  },
  // scrollView: {
  //   backgroundColor: '#ECF0F3',
  //   marginBottom: 0
  // }
 
});

export default Docquora;
