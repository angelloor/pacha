import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Color from '../resources/Color'
import MyAppText from './MyAppText'

const ButtonWhite = ({ event, title }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={event}>
            <MyAppText fontSize={16} color={Color.Green}>{title}</MyAppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 180,
        backgroundColor: Color.White,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center'
    }
})

export default ButtonWhite