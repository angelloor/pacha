import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Http from '../../libs/http'
import MyAppText from '../MyAppText'

const LessonItem = ({ item, onPress, categoryId }) => {
    const { name } = item
    const start = categoryId.colorPosition[1]
    const end = categoryId.colorPosition[0]
    const url = `${Http.instance.server}${categoryId.imageUrl}`

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}>
            <LinearGradient
                colors={[start, end]}
                style={styles.container}
            >
                <View style={styles.containerImage}>
                    <Image
                        style={styles.Img}
                        source={{ uri: url }}
                    />
                </View>
                <View style={styles.containerTitle}>
                    <MyAppText fontSize={15} color={'white'}>{name}</MyAppText>
                </View>
            </LinearGradient>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        borderRadius: 10,
        flexDirection: 'row',
        margin: '2.5%',
        marginBottom: 0,
        padding: '5%'
    },
    containerImage: {
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Img: {
        width: 30,
        height: 30
    },
    containerTitle: {
        width: '80%',
        justifyContent: 'center',
        paddingLeft: 5
    }
})

export default LessonItem