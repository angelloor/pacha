import React from 'react'
import { FlatList, Image, Modal, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import coint from '../assets/static/coint.png'
import experience from '../assets/static/experience.png'
import Color from '../resources/Color'
import ItemAnswer from './Courses/ItemAnswer'
import MyAppText from './MyAppText'
import MyHeaderText from './MyHeaderText'

const QuestionModal = ({ modalVisible, setModalVisible, category, item }) => {
    const { question, reward, answers } = item
    let start = ''
    let end = ''
    if (Object.keys(category) == 0) {
        start = '#00bef1'
        end = '#0b4f8b'
    } else {
        start = category.colorPosition[1]
        end = category.colorPosition[0]
    }

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >{(Object.keys(category) == 0)
            ?
            <View style={styles.centeredView}>
                <LinearGradient
                    colors={[start, end]}
                    style={styles.modalView}
                >
                    <View style={styles.row}>
                        <MyHeaderText fontSize={18} color={'white'}>Pregunta de la clase</MyHeaderText>
                    </View>
                    <View style={styles.row}>
                        <MyAppText fontSize={16} color={'white'}>{question}</MyAppText>
                    </View>
                    <View style={styles.row}>
                        <FlatList
                            data={answers}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => <ItemAnswer onPress={setModalVisible} item={item} color={end} />
                            }
                        />
                    </View>

                    <View style={styles.row}>
                        <MyHeaderText fontSize={18} color={'white'}>Recompensas</MyHeaderText>
                    </View>
                    <View style={styles.rowHorizontal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Image style={styles.imgQuestion} source={experience} />
                            </View>
                            <View>
                                <MyAppText fontSize={20} color={'white'}>{reward.experiencie}</MyAppText>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Image style={styles.imgQuestion} source={coint} />
                            </View>
                            <View>
                                <MyAppText fontSize={20} color={'white'}>{reward.coint}</MyAppText>
                            </View>
                        </View>
                    </View>

                </LinearGradient>
            </View>
            :
            <View style={styles.centeredView}>
                <LinearGradient
                    colors={[category.colorPosition[1], category.colorPosition[0]]}
                    style={styles.modalView}
                >
                    <View style={styles.row}>
                        <MyHeaderText fontSize={18} color={'white'}>Pregunta de la clase</MyHeaderText>
                    </View>
                    <View style={styles.row}>
                        <MyAppText fontSize={16} color={'white'}>{question}</MyAppText>
                    </View>
                    <View style={styles.row}>
                        <FlatList
                            data={answers}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => <ItemAnswer onPress={setModalVisible} item={item} color={end} />
                            }
                        />
                    </View>

                    <View style={styles.row}>
                        <MyHeaderText fontSize={18} color={'white'}>Recompensas</MyHeaderText>
                    </View>
                    <View style={styles.rowHorizontal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                            <View>
                                <Image style={styles.imgQuestion} source={experience} />
                            </View>
                            <View>
                                <MyAppText fontSize={20} color={'white'}>{reward.experiencie}</MyAppText>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            <View>
                                <Image style={styles.imgQuestion} source={coint} />
                            </View>
                            <View>
                                <MyAppText fontSize={20} color={'white'}>{reward.coint}</MyAppText>
                            </View>
                        </View>
                    </View>

                </LinearGradient>
            </View>
            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    rowHorizontal: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '90%',
        margin: 20,
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
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: Color.White
    },
    imgQuestion: {
        width: 40,
        height: 40
    }
})

export default QuestionModal