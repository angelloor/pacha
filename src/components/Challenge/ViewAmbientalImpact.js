import React from 'react'
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Color from '../../resources/Color'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'
import ItemViewImpact from './ItemViewImpact'

const ViewAmbientalImpact = ({ modalVisible, setModalVisible, itemToRenderClass }) => {

    const paddingItem = (itemToRenderClass, incrementForRow) => {
        let pad = 0
        itemToRenderClass.map((item) => {
            let x = item.ambientalImpact.length / 30
            pad += (x * incrementForRow)
        })
        return pad
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <MyHeaderText fontSize={20} color={'white'} style={{ marginBottom: 10 }}>Impactos ambientales</MyHeaderText>
                    {
                        (itemToRenderClass.length == 0)
                            ?
                            <LinearGradient
                                colors={[Color.funFacts.start, Color.funFacts.end]}
                                style={
                                    {
                                        width: '90%',
                                        margin: '5%',
                                        padding: 20,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }
                                }>
                                <MyAppText fontSize={15} color={'white'} style={{ textAlign: 'center' }}>Aún no tienes aportes</MyAppText>
                            </LinearGradient>
                            :
                            <FlatList
                                horizontal={false}
                                data={itemToRenderClass}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) =>
                                    <ItemViewImpact
                                        item={item}
                                    />
                                }
                                contentContainerStyle={{ alignItems: 'center', paddingBottom: (itemToRenderClass.length >= 5) ? (paddingItem(itemToRenderClass, 4)) : (paddingItem(itemToRenderClass, 3)) }}
                            />
                    }

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.button}
                        onPress={() => {
                            setModalVisible()
                        }}
                    >
                        <MyAppText fontSize={15} color={'white'} style={{ textAlign: "center" }}>Cerrar</MyAppText>
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
        width: '95%',
        maxHeight: 500,
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
        backgroundColor: Color.Green,
        marginTop: 20
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: Color.White
    }
})

export default ViewAmbientalImpact