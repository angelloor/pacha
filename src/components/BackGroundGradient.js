import React from 'react'
import { Dimensions } from 'react-native'
import RadialGradient from 'react-native-radial-gradient'
import Color from '../resources/Color'

const mWidth = (Dimensions.get('window').width) / 2
const mHeight = (Dimensions.get('window').height) / 2

const BackGroundGradient = props => {
    return (
        <RadialGradient
            style={{
                width: mWidth * 2, height: mHeight * 2
            }}
            colors={[Color.backgroundGradient.start, Color.backgroundGradient.end]}
            stops={[0, 1]}
            center={[mWidth, mHeight]}
            radius={mWidth * 2}>
            {props.children}
        </RadialGradient>
    )
}



export default BackGroundGradient