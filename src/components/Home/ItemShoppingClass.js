import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Http from '../../libs/http'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'

const ItemViewClass = ({ item }) => {
    const url = `${Http.instance.server}${item.urlImage}`
    return (
        <LinearGradient
            colors={['#00bef1', '#0b4f8b']}
            style={styles.container}
        >
            <View style={styles.containerImg}>
                <Image
                    style={styles.img}
                    source={{ uri: url }}
                />
            </View>
            <View style={styles.containerCount}>
                <MyHeaderText fontSize={15} color={'white'}>{item.count}</MyHeaderText>

            </View>
            <View style={styles.containerText}>
                <MyAppText fontSize={15} color={'white'}>{item.title}</MyAppText>

            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
    },
    containerImg: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 5
    },
    containerText: {
        width: '80%',
        justifyContent: 'center'
    },
    containerCount: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ItemViewClass