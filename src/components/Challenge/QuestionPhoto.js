import React from 'react'
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import openFiles from '../../assets/static/upload.png'
import Color from '../../resources/Color'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const QuestionPhoto = ({ modalVisible, cancel, send, pickImage, image }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={[{ padding: (image) ? 0 : 10 }, (image) ? {} : styles.button]}
                            onPress={() => {
                                pickImage()
                            }}
                        >
                            {(image)
                                ?
                                <View >
                                    <Image source={{ uri: image.uri }} style={{ width: width * 0.8, height: height * 0.5, borderRadius: 10, alignSelf: 'center' }} />
                                </View>
                                :
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={openFiles} style={styles.imgSelect} />
                                    <Text style={styles.textStyle}>Subir Foto</Text>
                                </View>
                            }

                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={[styles.button, { marginLeft: 10 }]}
                            onPress={() => {
                                cancel()
                            }}
                        >
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={[styles.button, { marginLeft: 10 }]}
                            onPress={() => {
                                send()
                            }}
                        >
                            <Text style={styles.textStyle}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
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
        elevation: 2,
        backgroundColor: Color.White,
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        color: Color.Green,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: Color.White
    },
    imgSelect: {
        width: 50,
        height: 50
    }
})

export default QuestionPhoto