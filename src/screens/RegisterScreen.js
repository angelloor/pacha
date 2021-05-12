import React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IDNumber from '../assets/icons/IDNumber'
import Mail from '../assets/icons/Mail'
import User from '../assets/icons/User'
import BackGroundGradient from '../components/BackGroundGradient'
import ButtonGreen from '../components/ButtonGreen'
import InputDate from '../components/InputDate'
import SimpleModal from '../components/SimpleModal'
import TitleLogo from '../components/TitleLogo'
import Color from '../resources/Color'

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props)

        //Numero de cedula    
        this.iDNumberInput = null
        this.setIDNumberInput = element => {
            this.iDNumberInput = element
        }
        this.focusIDNumberInput = () => {
            if (this.iDNumberInput) this.iDNumberInput.focus()
        }
        //Nombres    
        this.userInput = null
        this.setUserInput = element => {
            this.userInput = element
        }
        this.focusUserInput = () => {
            if (this.userInput) this.userInput.focus()
        }
        //dia    
        this.ddInput = null

        this.setddInput = element => {
            this.ddInput = element
        }

        this.focusddInput = () => {
            if (this.ddInput) this.ddInput.focus()
        }
        //mes 
        this.mmInput = null

        this.setmmInput = element => {
            this.mmInput = element
        }

        this.focusmmInput = () => {
            if (this.mmInput) this.mmInput.focus()
        }
        //año
        this.aaaaInput = null

        this.setaaaaInput = element => {
            this.aaaaInput = element
        }

        this.focusaaaaInput = () => {
            if (this.aaaaInput) this.aaaaInput.focus()
        }
        //Correo    
        this.mailInput = null

        this.setMailInput = element => {
            this.mailInput = element
        }

        this.focusMailInput = () => {
            if (this.mailInput) this.mailInput.focus()
        }
    }

    state = {
        statusModalInfo: false,
        statusModal: false,
        textModal: '',
        idNumber: '',
        Names: '',
        Email: '',
        DD: '',
        MM: '',
        AAAA: '',
        dateOfBirth: ''
    }

    //Modal
    openModal = (textModal) => {
        this.setState({
            statusModal: true,
            textModal
        })
    }

    closeModal = () => {
        this.setState({
            statusModal: false
        })
    }

    //Modal Info
    openModalInfo = () => {
        this.setState({
            statusModalInfo: true
        })
    }

    closeModalInfo = () => {
        this.setState({
            statusModalInfo: false
        })
    }

    //Actualizar campos
    onChangeIDNumber = (event) => {
        this.setState({
            idNumber: event.nativeEvent.text
        })
    }
    onChangeUser = (event) => {
        this.setState({
            Names: event.nativeEvent.text
        })
    }

    onChangeDD = (event) => {
        this.setState({
            DD: event.nativeEvent.text
        })
    }

    onChangeMM = (event) => {
        this.setState({
            MM: event.nativeEvent.text
        })
    }

    onChangeAAAA = (event) => {
        this.setState({
            AAAA: event.nativeEvent.text
        })
    }

    onChangeEmail = (event) => {
        this.setState({
            Email: event.nativeEvent.text
        })
    }

    handleRegistration = (user) => {
        const { idNumber, Names, Email, dateOfBirth } = user
        const { DD, MM, AAAA } = this.state

        if (idNumber == '' || Names == '' || Email == '' || dateOfBirth == '') {
            this.openModal('Ingrese todos los campos')
            return
        }

        if ((DD.length != 2) || (MM.length != 2) || (AAAA.length != 4)) {
            this.openModal('Fecha invalida')
            return
        }

        if (!(DD >= 1 && DD <= 31)) {
            this.openModal('Ingrese un día valido para el registro')
            return
        }

        if (!(MM >= 1 && MM <= 12)) {
            this.openModal('Ingrese un mes valido para el registro')
            return
        }

        const date = new Date()
        let anio = date.getFullYear()

        if (!(AAAA >= 1000 && AAAA <= anio)) {
            this.openModal('Ingrese un año valido para el registro')
            return
        }

        if (DD.length != 2) {
            this.openModal('Ingrese un día valido para el registro')
            return
        }
        if (MM.length != 2) {
            this.openModal('Ingrese un mes valido para el registro')
            return
        }
        if (AAAA.length != 4) {
            this.openModal('Ingrese un año valido para el registro')
            return
        }

        var patronEmail = /^([a-z\d\.-\_\.\-]+)@([a-z\d-]+)\.([a-z){2,8})(\.[a-z]{2,8})?$/

        if (!(patronEmail.test(Email))) {
            this.openModal('Ingrese un correo valido para el registro 👌')
            return
        }

        this.props.navigation.navigate('RegisterSecondStep', { user: user })
    }

    render() {
        const { statusModal, textModal, statusModalInfo, idNumber, Names, DD, MM, AAAA, Email } = this.state
        const user = {
            idNumber: idNumber,
            Names: Names,
            dateOfBirth: `${DD}-${MM}-${AAAA}`,
            Email: Email,
        }
        return (
            <SafeAreaView style={styles.container}>
                <BackGroundGradient>
                    <KeyboardAvoidingView
                        style={styles.containerKey}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>

                                {/* modal */}
                                <SimpleModal
                                    text={textModal}
                                    textBtn='Ok'
                                    modalVisible={statusModal}
                                    setModalVisible={this.closeModal}
                                />

                                <SimpleModal
                                    text='Formato de la fecha DD-MM-AAAA'
                                    textBtn='Ok'
                                    modalVisible={statusModalInfo}
                                    setModalVisible={this.closeModalInfo}
                                />
                                {/* modal */}
                                <View style={styles.containerTitleLogo}>
                                    <TitleLogo
                                        firstWord='CREAR'
                                        secondWord='CUENTA'
                                    />
                                </View>
                                {/* Imput  cedula */}
                                <View style={styles.containerInput}>
                                    <View style={styles.containerIcon}>
                                        <IDNumber
                                            width='20'
                                            height='20'
                                            color={Color.White}
                                        />
                                    </View>
                                    <TextInput
                                        ref={this.setIDNumberInput}
                                        style={styles.input}
                                        onChange={this.onChangeIDNumber}
                                        placeholder='Número de cédula'
                                        placeholderTextColor={Color.White}
                                        clearTextOnFocus={true}
                                        keyboardType='phone-pad'
                                        maxLength={10}
                                        autoCompleteType='cc-number'
                                        onSubmitEditing={() => { this.focusUserInput() }}
                                    />
                                </View>
                                {/* Imput  Nombres */}
                                <View style={styles.containerInput}>
                                    <View style={styles.containerIcon}>
                                        <User
                                            width='20'
                                            height='20'
                                            color={Color.White}
                                        />
                                    </View>
                                    <TextInput
                                        autoCapitalize='characters'
                                        ref={this.setUserInput}
                                        style={styles.input}
                                        onChange={this.onChangeUser}
                                        placeholder='Nombres'
                                        placeholderTextColor={Color.White}
                                        autoCapitalize='words'
                                        keyboardType='default'
                                        autoCompleteType='name'
                                        onSubmitEditing={() => { this.focusddInput() }}
                                    />
                                </View>
                                {/* Imput  Fecha nacimiento */}
                                <InputDate event={this.openModalInfo}
                                    eventDD={this.onChangeDD}
                                    eventMM={this.onChangeMM}
                                    eventAAAA={this.onChangeAAAA}
                                    setddInput={this.setddInput}
                                    setmmInput={this.setmmInput}
                                    setaaaaInput={this.setaaaaInput}
                                    focusmmInput={this.focusmmInput}
                                    focusaaaaInput={this.focusaaaaInput}
                                    focusMailInput={this.focusMailInput}
                                />
                                {/* Imput  Correo Electronico */}
                                <View style={styles.containerInput}>
                                    <View style={styles.containerIcon}>
                                        <Mail
                                            width='20'
                                            height='20'
                                            color={Color.White}
                                        />
                                    </View>
                                    <TextInput
                                        autoCapitalize='none'
                                        ref={this.setMailInput}
                                        style={styles.input}
                                        onChange={this.onChangeEmail}
                                        placeholder='Correo electrónico'
                                        placeholderTextColor={Color.White}
                                        keyboardType='email-address'
                                        autoCompleteType='email'
                                    />
                                </View>
                                <View style={styles.footer}>
                                    <ButtonGreen
                                        title={'Siguiente'}
                                        event={() => this.handleRegistration(user)}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </BackGroundGradient>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    containerKey: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    containerTitleLogo: {
        paddingTop: '20%',
    },
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
    input: {
        width: '85%',
        color: Color.White,
        fontFamily: 'Nunito-Regular'
    },
    footer: {
        paddingBottom: '20%'
    },
    // modal
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
        elevation: 2
    },
    buttonClose: {
        backgroundColor: Color.Green,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: Color.White
    }
})

export default RegisterScreen