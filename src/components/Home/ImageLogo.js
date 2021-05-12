import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import Logo from '../../assets/static/logo.png'
import logoPrefectura from '../../assets/static/logoPrefectura.png'

const heightImage = (Dimensions.get('window').height) / 6
const widtdImage = heightImage

const ImageLogo = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.logoIntitucion} source={logoPrefectura} />
            <Image style={styles.logo} source={Logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoIntitucion: {
        width: widtdImage / 2,
        height: widtdImage / 2,
        position: 'absolute',
        left: widtdImage / 10,
        top: widtdImage / 10,
    },
    logo: {
        width: heightImage * 1.2,
        height: widtdImage * 1.2,
    }

})

export default ImageLogo