import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Logo from '../assets/static/iso.png'
import Color from '../resources/Color'
import MyAppText from './MyAppText'
import MyHeaderText from './MyHeaderText'


const TitleLogo = ({ firstWord, secondWord }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={Logo} />
            <View style={{ flexDirection: 'row' }}>
                <MyHeaderText fontSize={20} color={'white'}>{firstWord}</MyHeaderText>
                <MyAppText fontSize={20} color={'white'}>{' '}{secondWord}</MyAppText>
            </View>
            <View style={styles.bar}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    img: {
        width: 130,
        height: 130,
    },
    bar: {
        width: 120,
        height: 1,
        backgroundColor: Color.White,
        margin: 20,
        marginBottom: 20
    }
})

export default TitleLogo