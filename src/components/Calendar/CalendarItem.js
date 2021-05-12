import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Http from '../../libs/http'
import Color from '../../resources/Color'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'

const CalendarItem = (props) => {
    const { isCelebrated, description, dayText, categoryId } = props.item
    const start = categoryId.colorPosition[1]
    const end = categoryId.colorPosition[0]
    const url = `${Http.instance.server}${categoryId.imageUrl}`

    return (
        <LinearGradient
            colors={[start, end]}
            style={styles.container}>
            <View style={styles.sectionPrimary}>
                <View style={styles.containerImg}>
                    <Image
                        style={styles.img}
                        source={{ uri: url }}
                    />
                </View>
                <View style={styles.containerDetails}>
                    <MyHeaderText fontSize={18} color={'white'}>{dayText}</MyHeaderText>
                    <MyHeaderText fontSize={14} color={'white'}>{isCelebrated}</MyHeaderText>
                </View>
            </View>
            <View style={styles.sectionSecundary}>
                <MyAppText fontSize={14} color={'white'}>{description}</MyAppText>
            </View>
        </LinearGradient>
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
    sectionPrimary: {
        flexDirection: 'row'

    }, containerImg: {
        width: '20%',
        paddingBottom: '2.5%'
    },
    img: {
        width: 50,
        height: 50
    },
    containerDetails: {
        width: '80%',
    },
    textDay: {
        color: Color.White,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 3

    },
    textIsCelebrated: {
        color: Color.White,
        fontWeight: 'bold',
        marginBottom: 5
    },
    textDescription: {
        color: Color.White,
        textAlign: 'justify'

    }
})

export default CalendarItem