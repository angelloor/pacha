import React from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Color from '../../resources/Color'
import MyAppText from '../MyAppText'

const ProgressBar = ({ actual, final }) => {
    var progressBarActually = (actual / final) * 100

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[Color.backgroundGradient.start,
            Color.backgroundGradient.end]}
            style={styles.sectionSecond}>
            <View style={{
                width: `${progressBarActually}%`,
                height: '100%',
                backgroundColor: Color.progressBar,
                borderRadius: 4,
                position: 'absolute',
                left: 0,
                top: 0
            }}>

            </View>
            <MyAppText fontSize={10} color={'white'}>{actual} / {final}</MyAppText>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    sectionSecond: {
        margin: 10,
        marginTop: 0,
        borderRadius: 4,
        alignItems: 'center'
    }
})

export default ProgressBar