import React from 'react'
import { TouchableOpacity } from 'react-native'
import Storage from '../../libs/Storage'
import Color from '../../resources/Color'
import MyHeaderText from '../MyHeaderText'

const ItemAnswer = props => {
    const { onPress, item, color } = props

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={
                {
                    width: '100%',
                    borderRadius: 10,
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    elevation: 2,
                    marginBottom: 5,
                    borderWidth: 2,
                    borderColor: color,
                    backgroundColor: Color.White,
                }
            }
            onPress={() => {
                onPress()
                Storage.instance.store(`selectedAnswer`, item)
            }}
        >
            <MyHeaderText color={color} fontSize={14} style={{ textAlign: "center" }}>
                {item}
            </MyHeaderText>
        </TouchableOpacity>
    )
}

export default ItemAnswer