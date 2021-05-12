import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Http from '../../libs/http'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'

const CourseItem = ({ item, onPress }) => {
    const { name, description, categoryId } = item
    const start = categoryId.colorPosition[1]
    const end = categoryId.colorPosition[0]
    const url = `${Http.instance.server}${categoryId.imageUrl}`

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}>
            <LinearGradient
                colors={[start, end]}
                style={styles.container}>
                <View style={styles.containerTitle}>
                    <View style={styles.containerImg}>
                        <Image
                            style={styles.img}
                            source={{ uri: url }}
                        />
                    </View>
                    <View style={styles.containerDetails}>
                        <MyHeaderText fontSize={18} color={'white'} style={{ marginBottom: 3 }}>{name}</MyHeaderText>
                    </View>
                </View>
                <View style={styles.containerDescription}>
                    <MyAppText fontSize={14} color={'white'} style={{ textAlign: 'justify' }}>{description}</MyAppText>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        borderRadius: 10,
        flexDirection: 'column',
        margin: '2.5%',
        marginBottom: 0,
        padding: '5%'
    },
    containerTitle: {
        flexDirection: 'row'
    },
    containerImg: {
        width: '15%',
        paddingBottom: '2.5%',
    },
    img: {
        width: 30,
        height: 30,
        alignSelf: 'flex-start',
    },
    containerDetails: {
        width: '90%',
        alignSelf: 'center'
    },
    containerDescription: {
        width: '100%',
    }
})

export default CourseItem