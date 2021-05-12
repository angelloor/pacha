import NetInfo from "@react-native-community/netinfo"
import React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Eye from '../assets/icons/Eye'
import EyeSlash from '../assets/icons/EyeSlash'
import Password from '../assets/icons/Password'
import PasswordVerify from '../assets/icons/PasswordVerify'
import Phone from '../assets/icons/Phone'
import BackGroundGradient from '../components/BackGroundGradient'
import ButtonGreen from '../components/ButtonGreen'
import Error from '../components/Error'
import Loader from '../components/Loader'
import SimpleModal from '../components/SimpleModal'
import TitleLogo from '../components/TitleLogo'
import Http from '../libs/http'
import Color from '../resources/Color'

var timeout01
var timeout02

class RegisterSecondStepScreen extends React.Component {
    constructor(props) {
        super(props)

        // ref telefono
        this.phone = null
        this.setPhone = element => {
            this.phone = element
        }
        this.focusPhone = () => {
            if (this.phone) this.phone.focus()
        }

        //ref password
        this.password = null
        this.setPassword = element => {
            this.password = element
        }
        this.focusPassword = () => {
            if (this.password) this.password.focus()
        }

        //ref password verify
        this.passwordVerify = null
        this.setPasswordVerify = element => {
            this.passwordVerify = element
        }
        this.focusPasswordVerify = () => {
            if (this.passwordVerify) this.passwordVerify.focus()
        }
    }

    state = {
        stateBtnPassword: true,
        stateBtnPasswordVerify: true,
        modalVisibleValidation: false,
        ModalValidationPassword: false,
        ModalSuccessRegister: false,
        phone: '',
        password: '',
        passwordVerify: '',
        loading: false,
        error: false,
        errorText: ''
    }


    componentWillUnmount = () => {
        clearTimeout(timeout01)
        clearTimeout(timeout02)
    }

    //modal validacion
    openModalValidation = () => {
        this.setState({
            modalVisibleValidation: true
        })
    }

    closeModalValidation = () => {
        this.setState({
            modalVisibleValidation: false
        })
    }

    //Modal Validation Password
    openModalValidationPassword = () => {
        this.setState({
            ModalValidationPassword: true
        })
    }

    closeModalValidationPassword = () => {
        this.setState({
            ModalValidationPassword: false
        })
    }

    //Modal Success Register
    openModalSuccessRegister = () => {
        this.setState({
            ModalSuccessRegister: true
        })
    }

    closeModalSuccessRegister = () => {
        this.setState({
            ModalSuccessRegister: false
        })
        this.props.navigation.navigate('Login')
    }

    onChangePhone = (event) => {
        this.setState({
            phone: event.nativeEvent.text
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.nativeEvent.text
        })
    }

    onChangePasswordVerify = (event) => {
        this.setState({
            passwordVerify: event.nativeEvent.text
        })
    }

    activeLoading = () => {
        this.setState({
            loading: true
        })
    }

    desactiveLoading = () => {
        this.setState({
            loading: false
        })
    }

    activeError = (errorText) => {
        this.setState({
            error: true,
            errorText
        })
    }

    desactiveError = () => {
        this.setState({
            error: false,
            errorText: ''
        })
    }

    handleRegistration = async (userFinal) => {
        const { phone, password, passwordVerify } = userFinal

        if (phone == '' || password == '' || passwordVerify == '') {
            this.openModalValidation()
            return
        }
        if (password != passwordVerify) {
            this.openModalValidationPassword()
            return
        }

        //Guardar Usuario
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this.activeLoading()
                Http.instance.post('/user', userFinal)
                    .then((data) => {
                        if (data.error != '') {
                            timeout01 = setTimeout(() => {
                                this.desactiveLoading()
                                this.activeError(data.error)
                            }, 1000)
                            return
                        } else {
                            timeout02 = setTimeout(() => {
                                this.desactiveLoading()
                                this.openModalSuccessRegister()
                            }, 1000)
                        }
                    })
                    .catch((err) => {
                        this.desactiveLoading()
                        this.activeError(err)
                        return
                    })
            } else {
                this.desactiveLoading()
                this.activeError('Revisa tu conexión a internet🥶')
                return
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { stateBtnPassword, stateBtnPasswordVerify, modalVisibleValidation,
            ModalValidationPassword, ModalSuccessRegister } = this.state
        const { user } = this.props.route.params
        const { phone, password, passwordVerify, loading, error, errorText } = this.state
        const userFinal = {
            ...user,
            phone,
            password,
            passwordVerify
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
                                <Loader status={loading} />
                                <Error status={error} desactiveError={this.desactiveError} errorText={errorText} />
                                {/* Modal Validacion */}
                                <SimpleModal
                                    text='Tienes que ingresar todos los campos'
                                    textBtn='Ok'
                                    modalVisible={modalVisibleValidation}
                                    setModalVisible={this.closeModalValidation}
                                />
                                <SimpleModal
                                    text='Las contraseñas no coinciden'
                                    textBtn='Ok'
                                    modalVisible={ModalValidationPassword}
                                    setModalVisible={this.closeModalValidationPassword}
                                />
                                <SimpleModal
                                    text='Cuenta creada con exito, Inicia Sesión'
                                    textBtn='Ok'
                                    modalVisible={ModalSuccessRegister}
                                    setModalVisible={this.closeModalSuccessRegister}
                                />
                                {/* Modal Validacion */}
                                <View style={styles.containerTitleLogo}>
                                    <TitleLogo
                                        firstWord='INFORMACIÓN' secondWord='ADICIONAL' />
                                </View>
                                {/* Imput  telefono */}
                                <View style={styles.containerInput}>
                                    <View style={styles.containerIcon}>
                                        <Phone
                                            width='20'
                                            height='20'
                                            color={Color.White}
                                        />
                                    </View>
                                    <TextInput
                                        ref={this.setPhone}
                                        style={styles.input}
                                        onChange={this.onChangePhone}
                                        placeholder='Telefono'
                                        placeholderTextColor={Color.White}
                                        keyboardType='phone-pad'
                                        maxLength={13}
                                        autoCompleteType='tel'
                                        onSubmitEditing={() => { this.focusPassword() }}
                                    />
                                </View>
                                {/* Imput  contraseña */}
                                <View style={styles.containerInput}>
                                    <View style={styles.containerIcon}>
                                        <Password
                                            width='20'
                                            height='20'
                                            color={Color.White}
                                        />
                                    </View>
                                    <TextInput
                                        ref={this.setPassword}
                                        style={styles.inputPassword}
                                        onChange={this.onChangePassword}
                                        secureTextEntry={stateBtnPassword}
                                        placeholder='Contraseña'
                                        placeholderTextColor={Color.White}
                                        keyboardType='default'
                                        autoCompleteType='password'
                                        onSubmitEditing={() => { this.focusPasswordVerify() }}
                                    />
                                    <TouchableOpacity style={styles.containerEye}
                                        onPress={() => {
                                            this.setState({
                                                stateBtnPassword: !stateBtnPassword
                                            })
                                        }}
                                    >
                                        {stateBtnPassword === true ?
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
                                {/* Imput  repetir contraseña */}
                                <View style={styles.containerInput}>
                                    <View style={styles.containerIcon}>
                                        <PasswordVerify
                                            width='20'
                                            height='20'
                                            color={Color.White}
                                        />
                                    </View>
                                    <TextInput
                                        ref={this.setPasswordVerify}
                                        style={styles.inputPassword}
                                        onChange={this.onChangePasswordVerify}
                                        secureTextEntry={stateBtnPasswordVerify}
                                        placeholder='Repetir contraseña'
                                        placeholderTextColor={Color.White}
                                        keyboardType='default'
                                    />
                                    <TouchableOpacity style={styles.containerEye}
                                        onPress={() => {
                                            this.setState({
                                                stateBtnPasswordVerify: !stateBtnPasswordVerify
                                            })
                                        }}
                                    >
                                        {stateBtnPasswordVerify === true ?
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
                                <View style={styles.footer}>
                                    <ButtonGreen event={() => this.handleRegistration(userFinal)} title={'Finalizar'} />
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
    inputPassword: {
        color: Color.White,
        width: '70%',
        fontFamily: 'Nunito-Regular'
    },
    containerEye: {
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
    }
})

export default RegisterSecondStepScreen