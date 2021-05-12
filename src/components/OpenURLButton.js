import React, { useCallback } from 'react'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'
import Color from '../resources/Color'
import MyAppText from './MyAppText'

const OpenURLButton = ({ url, children, openModal }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url)
        if (supported) {
            await Linking.openURL(url)
        } else {
            openModal(`No se puede abrir la url: ${url}`)
        }
    }, [url])


    return <TouchableOpacity activeOpacity={0.6} style={styles.btn} onPress={handlePress}><MyAppText fontSize={15} color={'black'}>{children}</MyAppText></TouchableOpacity>
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Color.White,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    }
})

export default OpenURLButton