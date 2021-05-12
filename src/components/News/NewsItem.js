import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Http from '../../libs/http'
import Color from '../../resources/Color'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'

const NewsItem = ({ item, onPress }) => {
    const { title, shortDescription, imageUrl } = item
    const url = `${Http.instance.server}${imageUrl}`

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.containerImg}>
                <Image
                    style={styles.img}
                    source={{
                        uri: url,
                    }}
                />
            </View>
            <View style={styles.containerText}>
                <MyHeaderText fontSize={15} color={'white'}>{title}</MyHeaderText>
                <MyAppText fontSize={14} color={'white'} style={{ textAlign: 'justify' }}>{shortDescription}</MyAppText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        borderRadius: 10,
        backgroundColor: Color.Gray,
        flexDirection: 'row',
        margin: '2.5%',
        marginBottom: 0,
        padding: '5%'
    },
    containerImg: {
        width: '30%',
    },
    img: {
        width: '100%',
        height: 90,
        borderRadius: 10
    },
    containerText: {
        width: '70%',
        paddingLeft: 10,
    }
})

export default NewsItem