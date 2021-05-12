import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import Color from '../../resources/Color'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'

const height = Dimensions.get('window').height

const Statistics = ({ count, onPressOne, yourShopping, onPressTwo }) => {
    return (
        <View style={styles.container}>
            <View style={styles.sectionTitle}>
                <MyHeaderText fontSize={(height < 600) ? (18 * 0.8) : 18} color={'white'}>Tu progreso</MyHeaderText>
            </View>
            <View style={styles.sectionInfo}>
                <View style={styles.progress}>
                    <MyAppText fontSize={(height < 600) ? (16 * 0.8) : 16} color={'white'}>Tus aportes</MyAppText>
                    <MyHeaderText fontSize={(height < 600) ? (20 * 0.8) : 20} color={'white'}>{count}</MyHeaderText>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={onPressOne}
                        style={styles.btnOpen}>
                        <MyAppText fontSize={(height < 600) ? (14 * 0.8) : 14} color={'white'}>Ver</MyAppText>
                    </TouchableOpacity>
                </View>
                <View style={styles.actually}>
                    <MyAppText fontSize={(height < 600) ? (16 * 0.8) : 16} color={'white'}>Total de compras</MyAppText>
                    <MyHeaderText fontSize={(height < 600) ? (20 * 0.8) : 20} color={'white'}>{yourShopping}</MyHeaderText>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={onPressTwo}
                        style={styles.btnOpen}>
                        <MyAppText fontSize={(height < 600) ? (14 * 0.8) : 14} color={'white'}>Ver</MyAppText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '100%',
        backgroundColor: Color.Gray,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    sectionTitle: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionInfo: {
        width: '100%',
        height: '70%',
        flexDirection: 'row',
    },
    progress: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
    },
    actually: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
    },
    btnOpen: {
        backgroundColor: Color.Green,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        marginTop: 5
    }
})

export default Statistics