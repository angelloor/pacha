import React from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Http from '../../libs/http'
import MyAppText from '../MyAppText'

const height = Dimensions.get('window').height

const CarouselItemCourse = ({ item, onPress }) => {
    const { name, categoryId } = item
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
                <Image
                    style={styles.imgIcon}
                    source={{ uri: url }} />
                <MyAppText fontSize={13} color={'white'} style={styles.txtName}>{name}</MyAppText>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: (height > 700) ? '85%' : '90%',
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgIcon: {
        width: 50,
        height: 50,
        marginBottom: 10
    },
    txtName: {
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center'
    }
})

export default CarouselItemCourse