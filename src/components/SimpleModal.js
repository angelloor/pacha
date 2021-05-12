import React from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import Color from '../resources/Color'
import MyAppText from './MyAppText'
import MyHeaderText from './MyHeaderText'

const SimpleModal = ({ text, textBtn, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <MyAppText fontSize={15} color={'white'} style={{ marginBottom: 15, textAlign: "center", }}>{text}</MyAppText>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible()
                        }}
                    >
                        <MyHeaderText fontSize={14} color={'white'} style={{ textAlign: "center" }}>{textBtn}</MyHeaderText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: Color.BlueStrong,
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: Color.White,
        color: Color.White,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        width: '50%',
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: Color.Green,
    }
})

export default SimpleModal