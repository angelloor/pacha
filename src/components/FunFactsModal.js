import React from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Color from '../resources/Color'
import MyAppText from './MyAppText'
import MyHeaderText from './MyHeaderText'

const FunFactsModal = ({ text, textBtn, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <LinearGradient
                    colors={[Color.funFacts.start, Color.funFacts.end]}
                    style={styles.modalView}>
                    <MyHeaderText fontSize={18} color={'white'} style={styles.modalText}>¿Sabías que?</MyHeaderText>
                    <MyAppText fontSize={14} color={'white'} style={{ textAlign: 'justify', marginBottom: 15 }}>{text}</MyAppText>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.button]}
                        onPress={() => {
                            setModalVisible()
                        }}
                    >
                        <MyHeaderText fontSize={14} color={Color.Green} style={{ textAlign: 'center' }}>Interesante</MyHeaderText>
                    </TouchableOpacity>
                </LinearGradient>
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
        backgroundColor: Color.Gray,
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
        elevation: 2,
        backgroundColor: Color.White,
    },
    modalText: {
        marginBottom: 15,
    }
})

export default FunFactsModal