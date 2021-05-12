import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Avatar from '../../assets/static/user.png'
import Color from '../../resources/Color'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'

const Header = props => {
    const { user, level } = props
    const { imageUrl } = user
    return (
        <View style={styles.container}>
            <View style={styles.containerFoto}>
                <View style={styles.containerAll}>
                    <Image
                        style={styles.imgAvatar}
                        source={imageUrl == '' ? Avatar : { uri: imageUrl }} />
                </View>
            </View>
            <View style={styles.containerName}>
                <View style={styles.containerText}>
                    <MyAppText fontSize={15} color={'white'}>{user.names}</MyAppText>
                    <MyHeaderText fontSize={16} color={'white'}>{`Nivel ${level}`}</MyHeaderText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '20%',
        backgroundColor: Color.Gray,
        margin: '2.5%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '2.5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFoto: {
        width: '25%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerAll: {
        width: 80,
        height: 80,
    },
    imgAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    containerText: {
        width: '90%',
        height: '50%',
    },
    containerName: {
        width: '70%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Header