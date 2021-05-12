import React from 'react'
import { TouchableOpacity } from 'react-native'
import Color from '../resources/Color'
import MyHeaderText from './MyHeaderText'


const ButtonNextClass = ({ isCompleted, event, title, textColor }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={{
                width: 180,
                backgroundColor: (isCompleted) ? Color.Gray : Color.White,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10,
                alignSelf: 'center'

            }}
            disabled={isCompleted}
            onPress={event}>
            <MyHeaderText fontSize={16} color={(isCompleted) ? Color.White : textColor}>{title}</MyHeaderText>
        </TouchableOpacity>
    )
}

export default ButtonNextClass