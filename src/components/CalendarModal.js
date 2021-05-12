import React from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Http from '../libs/http'
import Color from '../resources/Color'
import MyAppText from './MyAppText'
import MyHeaderText from './MyHeaderText'

class CalendarModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { modalVisible, setModalVisible, itemCalendar } = this.props

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                { (itemCalendar)
                    ?
                    <View style={styles.centeredView}>
                        <LinearGradient
                            colors={[itemCalendar.categoryId.colorPosition[1], itemCalendar.categoryId.colorPosition[0]]}
                            style={styles.modalView}>
                            <View style={styles.sectionPrimary}>
                                <View style={styles.containerImg}>
                                    <Image
                                        style={styles.img}
                                        source={{ uri: `${Http.instance.server}${itemCalendar.categoryId.imageUrl}` }}
                                    />
                                </View>
                                <View style={styles.containerDetails}>
                                    <MyHeaderText fontSize={20} color={'white'} style={styles.textDay}>{itemCalendar.dayText}</MyHeaderText>
                                    <MyHeaderText fontSize={13} color={'white'} style={{ marginBottom: 5 }}>{itemCalendar.isCelebrated}</MyHeaderText>
                                </View>
                            </View>
                            <View style={styles.sectionSecundary}>
                                <MyAppText fontSize={16} color={'white'} style={{ textAlign: 'justify' }}>{itemCalendar.description}</MyAppText>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.button}
                                onPress={() => {
                                    setModalVisible()
                                }}
                            >
                                <MyHeaderText fontSize={14} color={Color.Green} style={{ textAlign: "center" }}>Genial</MyHeaderText>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    :
                    <></>
                }

            </Modal>
        )
    }
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
        marginTop: 10
    },
    sectionPrimary: {
        flexDirection: 'row'
    },
    containerImg: {
        width: '20%',
        paddingBottom: '2.5%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    img: {
        width: 50,
        height: 50
    },
    containerDetails: {
        width: '80%',
        paddingLeft: 10
    },
    textDay: {
        fontWeight: 'bold',
        marginBottom: 3
    }
})

export default CalendarModal