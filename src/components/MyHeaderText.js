import React from 'react'
import { Text } from 'react-native'

const MyHeaderText = ({ fontSize, color, children, style }) => {
    return (
        <Text style={
            [
                {
                    fontFamily: 'Nunito-Black',
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


export default MyHeaderText