import React from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Color from '../resources/Color'
import MyHeaderText from './MyHeaderText'

const ScreenHeaderGradient = ({ title, categoryId }) => {
    const start = categoryId.colorPosition[1]
    const end = categoryId.colorPosition[0]

    return (
        <LinearGradient
            colors={[start, end]}
            style={styles.container}>
            <MyHeaderText fontSize={18} color={'white'} style={styles.headerTitle}>{title}</MyHeaderText>
        </LinearGradient>
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

export default ScreenHeaderGradient