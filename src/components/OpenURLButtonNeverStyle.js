import React, { useCallback } from 'react'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'

const OpenURLButtonNeverStyle = ({ url, children, openModal }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url)
        if (supported) {
            await Linking.openURL(url)
        } else {
            openModal(`No se puede abrir la url: ${url}`)
        }
    }, [url])


    return <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={handlePress}>
        {children}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OpenURLButtonNeverStyle