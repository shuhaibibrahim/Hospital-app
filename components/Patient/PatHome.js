import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import colour from '../colors';

const Pathome=(props)=>{

    return (
        <View style={styles.container}>
            <Text>Patient {props.user}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor:colour.PRI_COL,
        alignItems:'center'
    },
});

export default Pathome;