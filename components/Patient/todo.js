import React from 'react'
import { StyleSheet, Text, View,StatusBar,TextInput, TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colour from '../colors';
import Note from "./Note";

export default class Todo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }
  }


  render(){

    let notes = this .state.noteArray.map((val,key) => {
      return <Note key={key} keyval={key} val={val}
      deleteMethod={ ()=> this.deleteNote(key) }/>
    });
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertext}> REMINDERS</Text>
        </View>
        <ScrollView style={styles.scrollcontainer}>
          <Text style={{position:'relative', top: 2,fontSize:50 }}>Add Some Reminders</Text>
          {notes}
        </ScrollView>

          <View style={styles.footer}>
            <TextInput style={styles.textinput} 
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholder="Type name of medicine..."
            placeholderTextColor='white' 
            underlineColorAndroid='transparent'></TextInput>
            <TouchableOpacity style={styles.addButton} onPress={this.addNote.bind(this)}>
              <Text style={styles.addButtonText}>
                +
              </Text>
          </TouchableOpacity>
          </View>
          
      </View>
    );
  }
  addNote(){
    if (this.state.noteText) {
      var d = new Date();
      this.state.noteArray.push({'date': d.getFullYear() +"/"+ (d.getMonth() + 1) + "/" + d.getDate(), 'note': this.state.noteText
    });
      this.setState({ noteArray: this.state.noteArray})
      this.setState({ noteText: ''});
    }
  }

  deleteNote(key) {
    this.state.noteArray.splice(key,1)
    this.setState({ noteArray: this.state.noteArray})
  }
} 

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    backgroundColor: colour.TEAL_GREEN,
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd'
  },
  headertext: {
    color: 'white',
    fontSize: 18,
    padding: 26,

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