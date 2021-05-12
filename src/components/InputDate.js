import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Calendar from '../assets/icons/Calendar'
import Info from '../assets/icons/Info'
import Color from '../resources/Color'

const InputDate = ({ eventDD, eventMM, eventAAAA, setddInput,
    setmmInput, setaaaaInput, focusmmInput, focusaaaaInput, focusMailInput, event }) => {
    return (
        <View style={styles.containerInput}>
            <View style={styles.containerIcon}>
                <Calendar
                    width='20'
                    height='20'
                    color={Color.White}
                />
            </View>
            <TextInput
                ref={setddInput}
                style={styles.inpuD}
                maxLength={2}
                placeholder='DD'
                onChange={eventDD}
                placeholderTextColor={Color.White}
                keyboardType='phone-pad'
                onSubmitEditing={() => { focusmmInput() }}
            />
            <TextInput
                ref={setmmInput}
                style={styles.inputM}
                maxLength={2}
                placeholder='MM'
                onChange={eventMM}
                placeholderTextColor={Color.White}
                keyboardType='phone-pad'
                onSubmitEditing={() => { focusaaaaInput() }}
            />
            <TextInput
                ref={setaaaaInput}
                style={styles.inputA}
                maxLength={4}
                placeholder='AAAA'
                onChange={eventAAAA}
                placeholderTextColor={Color.White}
                keyboardType='phone-pad'
                onSubmitEditing={() => { focusMailInput() }}
            />
            <View style={styles.containerIcon}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={event}
                >
                    <Info
                        width='20'
                        height='20'
                        color={Color.White}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
        width: '90%',
        height: 45,
        flexDirection: 'row',
        backgroundColor: Color.backgroundInput,
        borderColor: Color.White,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        alignSelf: 'center',
    },
    containerIcon: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputA: {
        width: '30%',
        color: Color.White,
        fontFamily: 'Nunito-Regular'
    },
    inputM: {
        width: '20%',
        color: Color.White,
        fontFamily: 'Nunito-Regular'
    },
    inpuD: {
        width: '20%',
        color: Color.White,
        fontFamily: 'Nunito-Regular'
    }
})

export default InputDate