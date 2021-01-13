import React from 'react'
import { StyleSheet, Text, View,StatusBar,TextInput, TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colour from '../colors';

export default class Todo extends React.Component {
  render(){
    return(
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.notetext}>{this.props.val.date}</Text>
        <Text style={styles.notetext}>{this.props.val.note}</Text>

        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.notedelete}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>

      </View>
    );
  }
} 

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'
    },
    notetext: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: colour.TEAL_GREEN

    },
    notedelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: '#2980b9',
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 20,
        padding: 15,
        top: 10,
        bottom: 10,
        right: 10,

    },
    notedeletetext:{
        color:'white'
    }
});