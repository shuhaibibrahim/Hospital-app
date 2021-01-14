import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text,Keyboard, View,ScrollView,Dimensions ,TextInput, Image, Platform,StatusBar, Button, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import colour from '../colors';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux'

const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );


const Answers=(props)=>{

  console.log(props.route.params)
  const [ans,setAns]=useState('')
  const [answers,setAnswers]=useState([])
  const [answersDisp,setanswersDisp]=useState([])

  const user=useSelector(state=>state.login.user);

  useEffect(()=>{
    axios.get('https://asdserver.herokuapp.com/docquora/answers',
    {
        params : {
            qid:props.route.params.qid,
        }
    }
    ).then(res=>{
        if(res.status===200)
        {
            if(res.data.length===0)
            {
                console.log("No answers");
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
                    return {
                              docUser:d.docuser,
                              answer:d.answer
                            }
                })

                console.log(newData);
                setAnswers(newData);
                
                setanswersDisp(
                    newData.map(d=>
                    (<View key={d.docUser+d.answer+""} style={styles.div}>
                        <Text style={{position:"absolute", top:10,left:10, fontSize:10,fontWeight:'bold'}}>
                            {d.docUser}
                        </Text>
                        <Text style={{position:"absolute",bottom:20,left:10,fontSize:15}}>
                            {d.answer}
                        </Text>
                    </View>))
                )
            }
            // return (<View style={styles.div}><Text>hii</Text></View>);
        }
        
    }).catch(err=>{console.log(err)})
  },[]);

  const postAnswer=()=>{
    
    var newAnswers=answers
    var newAnswersDisp=answersDisp

    if (ans) {

      console.log("answer :    ",ans)
      axios.get(
          'https://asdserver.herokuapp.com/docquora/postanswer',
          {
              params : {
                  qid:props.route.params.qid,
                  docUser:user,
                  answer:ans,
              }
          }
      ).then(res=>{
          if(res.status===200)
          {
              console.log("insert success.. rows: ",res.data)
              axios.get('https://asdserver.herokuapp.com/docquora/updateNumber',
                {
                    params : {
                        qid:props.route.params.qid
                    }
                }
              ).then(res=>{
                if(res.status===200)
                {
                    console.log("update success.. rows: ",res.data)
                }
              }).catch(err=>{console.log(err)})
      
              newAnswers.push({
                docUser:user,
                answer:ans
              });
              newAnswersDisp.push(<View key={user+ans+""} style={styles.div}>
                    <Text style={{position:"absolute", top:10,left:10, fontSize:10,fontWeight:'bold'}}>
                        {user}
                    </Text>
                    <Text style={{position:"absolute",bottom:20,left:10,fontSize:15}}>
                        {ans}
                    </Text>
                </View>)

              setAnswers([...newAnswers])
              setanswersDisp([...newAnswersDisp])
          }
          
      }).catch(err=>{console.log(err)})
      
      setAns('');
    }
  }
  
  return (
    <KeyboardAwareScrollView
            style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
        >

        <View style={styles.question}>
            <Text style={styles.questionText}>
              Q : {props.route.params.question}
            </Text>
        </View>

        <View style={styles.answers}>
          <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}} fadingEdgeLength={10} showsVerticalScrollIndicator={false}>
            {answersDisp}
          </ScrollView>
        </View>
        {props.route.params.ansFlag&&<View style ={styles.ask}>
          <TextInput
              style={styles.ainput}
              placeholder="Type your answer"
              onChangeText={ans=>setAns(ans)}
              value={ans}
          />

          <View style={styles.send}>
            <TouchableNativeFeedback onPress={()=>{postAnswer()}}>
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
  
  answers:{
    alignItems:'center',
    marginTop:windowHeight*.08,
    width:'100%',
    marginBottom:windowHeight*.12,
  },

  container: {
    flex: 1,
    backgroundColor: colour.PRI_COL,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight+5 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  div: {
    backgroundColor: colour.SEC_COL,
    width:'100%',
    height:90,
    // alignItems:'center',
    paddingLeft:50,
    // justifyContent:'center',
    // borderRadius: 5,
    borderBottomColor:'black',
    borderWidth:.5,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  ainput:{
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

  question:{
    position:'absolute',
    top:0,
    width:windowWidth,
    flex:2
  },

  questionText:{
    fontSize:windowHeight*.03,
    // position:'absolute',
    paddingTop:windowHeight*.05,
    paddingBottom:windowHeight*.05,
    paddingLeft:windowWidth*.03,
    width:'100%',
    backgroundColor: '#252525',
    color:'white'
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

export default Answers;
