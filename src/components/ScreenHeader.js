import React from 'react'
import { StyleSheet, View } from 'react-native'
import Color from '../resources/Color'
import MyHeaderText from './MyHeaderText'

const ScreenHeader = ({ title }) => {
    return (
        <View style={styles.container}>
            <MyHeaderText fontSize={18} color={'white'} style={styles.headerTitle}>{title}</MyHeaderText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Color.Gray,
        justifyContent: 'center'
    },
    headerTitle: {
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 15
    }
})

export default ScreenHeader