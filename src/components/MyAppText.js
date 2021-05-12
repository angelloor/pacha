import React from 'react'
import { Text } from 'react-native'

const MyAppText = ({ fontSize, color, children, style }) => {
    return (
        <Text style={
            [
                {
                    fontFamily: 'Nunito-Regular',
                    fontSize: fontSize,
                    color: color
                },
                style
            ]
        }>
            {children}
        </Text>
    )
}

export default MyAppText