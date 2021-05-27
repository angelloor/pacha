import React from 'react'
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import Color from '../resources/Color'
import ItemAnswer from './Courses/ItemAnswer'
import MyAppText from './MyAppText'
import MyHeaderText from './MyHeaderText'

const ParentalGate = ({ modalVisible, setModalVisible, question, answers, correctAnswer }) => {
    let end = '#0b4f8b'

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={{ width: '100%', marginTop: -15 }}
                        onPress={() => {
                            setModalVisible()
                        }}
                    >
                        <MyHeaderText fontSize={18} color={'white'} style={{ textAlign: "right" }}>X</MyHeaderText>
                    </TouchableOpacity>
                    <MyHeaderText fontSize={15} color={'white'} style={{ marginBottom: 15, textAlign: "center", }}>Pregúntales a tus padres</MyHeaderText>
                    <MyAppText fontSize={15} color={'white'} style={{ marginBottom: 15, textAlign: "center", }}>{question}</MyAppText>
                    <FlatList
                        data={answers}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => <ItemAnswer onPress={setModalVisible} item={item} color={end} />
                        }
                    />
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

export default ParentalGate