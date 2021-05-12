import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Http from '../../libs/http'
import MyAppText from '../MyAppText'

const ItemShoppingClass = ({ item }) => {
    const start = item.categoryId.colorPosition[1]
    const end = item.categoryId.colorPosition[0]
    const url = `${Http.instance.server}${item.categoryId.imageUrl}`
    return (
        <LinearGradient
            colors={[start, end]}
            style={styles.container}
        >
            <View>
                <View style={styles.containerImg}>
                    <Image
                        style={styles.img}
                        source={{ uri: url }}
                    />
                </View>
            </View>
            <View style={styles.containerText}>
                <MyAppText fontSize={13} color={'white'}> {item.ambientalImpact}</MyAppText>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
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
        height: 30
    },
    containerText: {
        width: '80%',
        justifyContent: 'center'
    }
})

export default ItemShoppingClass