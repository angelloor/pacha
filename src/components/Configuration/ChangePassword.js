import React, { useState } from 'react'
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Eye from '../../assets/icons/Eye'
import EyeSlash from '../../assets/icons/EyeSlash'
import Password from '../../assets/icons/Password'
import Color from '../../resources/Color'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'
import SimpleModal from '../SimpleModal'

const ChangePassword = (props) => {
    const { modalVisible, closeModalVisible, setOne, setTwo, setThree, focusTwo, focusThree, onChangePassword } = props

    const [btnPasswordOne, setBtnPasswordOne] = useState(true)
    const [btnPasswordTwo, setBtnPasswordTwo] = useState(true)
    const [btnPasswordThree, setBtnPasswordThree] = useState(true)

    const [changeOne, setChangeOne] = useState('')
    const [changeTwo, setChangeTwo] = useState('')
    const [changeThree, setChangeThree] = useState('')

    const [statusModal, setStatusModal] = useState(false)
    const [textModal, setTextModal] = useState('')

    const openModal = (text) => {
        setStatusModal(true)
        setTextModal(text)
    }

    const closeModal = () => {
        setStatusModal(false)
    }

    const onChangeOne = (event) => {
        setChangeOne(event.nativeEvent.text)
    }

    const onChangeTwo = (event) => {
        setChangeTwo(event.nativeEvent.text)
    }

    const onChangeThree = (event) => {
        setChangeThree(event.nativeEvent.text)
    }

    const handleChangePassword = () => {
        if (changeOne == '' || changeTwo == '' || changeThree == '') {
            openModal('Tienes que ingresar todos los campos')
            return
        } else {
            if (!(changeTwo == changeThree)) {
                openModal('Las contraseñas no coinciden')
                return
            } else {
                if (changeOne == changeTwo) {
                    openModal('La nueva contraseña es igual a la anterior')
                    return
                } else {
                    onChangePassword(changeOne, changeTwo)
                    closeModalVisible()
                }
            }
        }
    }

    const btnPasswordReset = () => {
        setBtnPasswordOne(true)
        setBtnPasswordTwo(true)
        setBtnPasswordThree(true)
        setChangeOne('')
        setChangeTwo('')
        setChangeThree('')
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <SimpleModal
                        text={textModal}
                        textBtn='Ok'
                        modalVisible={statusModal}
                        setModalVisible={closeModal}
                    />
                    <MyHeaderText fontSize={16} color={'white'} style={styles.modalText}>Cambiar contraseña</MyHeaderText>
                    {/* contraseña actual */}
                    <View style={styles.containerInput}>
                        <View style={styles.containerIcon}>
                            <Password
                                width='20'
                                height='20'
                                color={Color.White}
                            />
                        </View>
                        <TextInput
                            ref={setOne}
                            style={styles.inputPassword}
                            name="pass"
                            onChange={onChangeOne}
                            secureTextEntry={btnPasswordOne}
                            placeholder='Contraseña actual'
                            placeholderTextColor={Color.White}
                            onSubmitEditing={() => { focusTwo() }}
                        />
                        <TouchableOpacity style={styles.containerEye}
                            onPress={() => {
                                setBtnPasswordOne(!btnPasswordOne)
                            }}
                        >
                            {btnPasswordOne === true ?
                                <Eye
                                    width='20'
                                    height='20'
                                    color={Color.White}
                                /> :
                                <EyeSlash
                                    width='20'
                                    height='20'
                                    color={Color.White}
                                />
                            }

                        </TouchableOpacity>
                    </View>
                    {/* contraseña actual */}
                    {/* contraseña nueva */}
                    <View style={styles.containerInput}>
                        <View style={styles.containerIcon}>
                            <Password
                                width='20'
                                height='20'
                                color={Color.White}
                            />
                        </View>
                        <TextInput
                            ref={setTwo}
                            style={styles.inputPassword}
                            name="pass"
                            onChange={onChangeTwo}
                            secureTextEntry={btnPasswordTwo}
                            placeholder='Nueva contraseña'
                            placeholderTextColor={Color.White}
                            onSubmitEditing={() => { focusThree() }}
                        />
                        <TouchableOpacity style={styles.containerEye}
                            onPress={() => {
                                setBtnPasswordTwo(!btnPasswordTwo)
                            }}
                        >
                            {btnPasswordTwo === true ?
                                <Eye
                                    width='20'
                                    height='20'
                                    color={Color.White}
                                /> :
                                <EyeSlash
                                    width='20'
                                    height='20'
                                    color={Color.White}
                                />
                            }

                        </TouchableOpacity>
                    </View>
                    {/* contraseña nueva */}
                    {/* repetir contraseña nueva */}
                    <View style={styles.containerInput}>
                        <View style={styles.containerIcon}>
                            <Password
                                width='20'
                                height='20'
                                color={Color.White}
                            />
                        </View>
                        <TextInput
                            ref={setThree}
                            style={styles.inputPassword}
                            name="pass"
                            onChange={onChangeThree}
                            secureTextEntry={btnPasswordThree}
                            placeholder='Confirmar contraseña'
                            placeholderTextColor={Color.White}
                        />
                        <TouchableOpacity style={styles.containerEye}
                            onPress={() => {
                                setBtnPasswordThree(!btnPasswordThree)
                            }}
                        >
                            {btnPasswordThree === true ?
                                <Eye
                                    width='20'
                                    height='20'
                                    color={Color.White}
                                /> :
                                <EyeSlash
                                    width='20'
                                    height='20'
                                    color={Color.White}
                                />
                            }

                        </TouchableOpacity>
                    </View>
                    {/* repetir contraseña nueva */}
                    <View style={styles.containerButton}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.button}
                            onPress={() => {
                                closeModalVisible()
                                btnPasswordReset()
                            }}
                        >
                            <MyAppText fontSize={14} color={'white'} style={{ textAlign: "center" }}>Cancelar</MyAppText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.button}
                            onPress={() => {
                                handleChangePassword()
                            }}
                        >
                            <MyAppText fontSize={14} color={'white'} style={{ textAlign: "center" }}>Aceptar</MyAppText>
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
        margin: 10,
        backgroundColor: Color.BlueStrong,
        borderRadius: 10,
        padding: 10,
        paddingBottom: 35,
        paddingTop: 35,
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
    containerButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 10
    },
    button: {
        borderRadius: 10,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: Color.Green,
        marginLeft: 5,
        marginRight: 5
    },
    modalText: {
        textAlign: "center",
        marginBottom: 10
    },
    containerInput: {
        width: '90%',
        height: 45,
        flexDirection: 'row',
        backgroundColor: Color.Gray,
        borderColor: Color.White,
        borderWidth: 1,
        borderRadius: 10,
        color: Color.White,
        margin: 10,
        marginTop: 5,
        marginBottom: 5
    },
    inputPassword: {
        color: Color.White,
        width: '70%',
        fontSize: 12,
        fontFamily: 'Nunito-Regular'
    },
    containerIcon: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerEye: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ChangePassword