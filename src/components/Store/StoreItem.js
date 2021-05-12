import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import iconCoins from '../../assets/static/coint.png'
import Http from '../../libs/http'
import Color from '../../resources/Color'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'

const StoreItem = ({ onPress, item }) => {
    const { urlImage, title, description, price } = item
    const url = `${Http.instance.server}${urlImage}`

    return (
        <View style={styles.containerItemStore}>
            <View style={styles.sectionImg}>
                <Image
                    style={styles.imgWidth}
                    source={{
                        uri: url
                    }}
                />
            </View>
            <View style={styles.sectionInfo}>
                <MyHeaderText fontSize={14} color={'white'} style={{ marginBottom: 5 }}>{title}</MyHeaderText>
                <MyAppText fontSize={13} color={'white'} style={{ marginBottom: 10 }}>{description}</MyAppText>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onPress}
                    style={styles.btnWatch}
                >
                    <MyHeaderText fontSize={14} color={'white'} style={{ alignSelf: 'center' }}>{`${price} `}</MyHeaderText>
                    <Image
                        style={styles.imgWidthCoin}
                        source={iconCoins}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerItemStore: {
        width: '90%',
        backgroundColor: Color.Gray,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: '5%',
        marginBottom: '0%',
        flexDirection: 'row'
    },
    imgWidth: {
        width: '100%',
        height: 125,
        borderRadius: 10,
    },
    btnWatch: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.Green,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Color.Green,
        marginRight: '20%',
        paddingTop: 5,
        paddingBottom: 5
    },
    sectionImg: {
        width: '50%',
        paddingRight: 10
    },
    sectionInfo: {
        width: '50%',
    },
    imgWidthCoin: {
        width: 20,
        height: 20
    },
    containerCoins: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
})


export default StoreItem