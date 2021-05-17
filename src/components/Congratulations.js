import React from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import iconCorrecto from '../assets/static/correcto.png'
import iconInCorrecto from '../assets/static/incorrecto.png'
import Color from '../resources/Color'
import MyAppText from './MyAppText'
import MyHeaderText from './MyHeaderText'

const Congratulations = ({ statusCongratulations, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image style={styles.imgCongratulations} source={(statusCongratulations) ? iconCorrecto : iconInCorrecto} />
                    <MyAppText fontSize={15} color={'white'} style={styles.modalText}>{(statusCongratulations) ? 'Excelente😊, veo que has prestado atención, obtendrás la experiencia y los AmbientalCoints prometidos' : 'Suerte para la próxima😔, obtendrás solo la experiencia\n'}</MyAppText>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible()
                        }}
                    >
                        <MyHeaderText fontSize={14} color={'white'} style={{ textAlign: "center" }}>Ok</MyHeaderText>
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
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    imgCongratulations: {
        width: 150,
        height: 150
    }
})

export default Congratulations