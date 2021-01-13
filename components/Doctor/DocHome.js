import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native';
import colour from '../colors';

const Dochome=(props)=>{

    console.log("user : ",props);

    return (
        <View style={styles.container}>

            <TouchableOpacity activeOpacity={0.7} style={styles.div} onPress={()=>{props.navigation.navigate('mypatients')}}>
                <Text > Patients </Text>
            </TouchableOpacity>
      
            <TouchableOpacity activeOpacity={0.7} style={styles.div} onPress={()=>{props.navigation.navigate('appoinments')}}>
                <Text> Appoinments </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.div} onPress={()=>{console.log('heloo')}}>
                <Text> Doquora </Text>
            </TouchableOpacity>

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
        height:'15%',
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

export default Dochome;