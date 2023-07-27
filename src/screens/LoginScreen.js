import CheckBox from '@react-native-community/checkbox'
import NetInfo from "@react-native-community/netinfo"
import React from 'react'
import {
    Keyboard, KeyboardAvoidingView,

    Platform, StyleSheet, TextInput, TouchableOpacity,
    TouchableWithoutFeedback, View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import {
    cambiarCalendar,
    cambiarConfiguration,
    cambiarContent,
    cambiarExperience,
    cambiarFunFacts, cambiarNews,
    cambiarStoreItem, cambiarUser, cambiarYourShopping
} from '../actions/index'
import Eye from '../assets/icons/Eye'
import EyeSlash from '../assets/icons/EyeSlash'
import Mail from '../assets/icons/Mail'
import Password from '../assets/icons/Password'
import BackGroundGradient from '../components/BackGroundGradient'
import ButtonWhite from '../components/ButtonWhite'
import Error from '../components/Error'
import Loader from '../components/Loader'
import MyAppText from '../components/MyAppText'
import SimpleModal from '../components/SimpleModal'
import TitleLogo from '../components/TitleLogo'
import Storage from '../libs/Storage'
import Http from '../libs/http'
import Color from '../resources/Color'

var timeout01

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        //email
        this.email = null
        this.setEmail = element => {
            this.email = element
        }
        this.focusEmail = () => {
            if (this.email) this.email.focus()
        }

        //Password
        this.password = null
        this.setPassword = element => {
            this.password = element
        }

        this.focusPassword = () => {
            if (this.password) this.password.focus()
        }
    }

    state = {
        stateBtnPassword: true,
        statusModal: false,
        textModal: '',
        user: '',
        password: '',
        statusCkeckBox: false,
        loading: false,
        error: false,
        errorText: '',
    }

    componentWillUnmount = () => {
        clearTimeout(timeout01)
    }

    changeStatusCkeckBox = (statusActually) => {
        this.setState({
            statusCkeckBox: !statusActually
        })
    }

    //modal validacion
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

    onChangeEmail = (event) => {
        this.setState({
            user: event.nativeEvent.text
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.nativeEvent.text
        })
    }

    onSubmitLogin = async () => {
        const { user, password } = this.state
        if (user == '' || password == '') {
            this.openModal('Tienes que ingresar todos los campos')
            return
        }

        var patronEmail = /^([a-z\d\.-\_\.\-]+)@([a-z\d-]+)\.([a-z){2,8})(\.[a-z]{2,8})?$/


        if (!(patronEmail.test(user))) {
            this.openModal('El correo ingresado es invalido🤔')
            return
        }

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                //enviar peticion
                const body = {
                    email: user,
                    password
                }
                this.activeLoading()
                Http.instance.post('/user/login', body)
                    .then(async (data) => {
                        if (data.error != '') {
                            timeout01 = setTimeout(() => {
                                this.desactiveLoading()
                                this.activeError(data.error)
                            }, 1000)
                            return
                        } else {
                            this.desactiveLoading()
                            //set estado global
                            this.props.cambiarUser(data.body.user)
                            this.props.cambiarCalendar(data.body.calendar)
                            this.props.cambiarNews(data.body.news)
                            this.props.cambiarConfiguration(data.body.configuration)
                            this.props.cambiarStoreItem(data.body.storeItem)
                            this.props.cambiarContent(data.body.content)
                            this.props.cambiarYourShopping(data.body.yourShopping)
                            this.props.cambiarFunFacts(data.body.funFacts)

                            if (this.state.statusCkeckBox) {
                                Storage.instance.store(`user`, user)
                                Storage.instance.store(`password`, password)
                            }
                            Storage.instance.store(`countNews`, (data.body.news.length).toString())

                            this.props.navigation.navigate('HomeStack', {
                                screen: 'Home',
                            })
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

    render() {
        const { stateBtnPassword, statusModal, textModal, statusCkeckBox, loading, error, errorText } = this.state

        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>
                                <Loader status={loading} />
                                <Error status={error} desactiveError={this.desactiveError} errorText={errorText} />
                                <SimpleModal
                                    text={textModal}
                                    textBtn='Ok'
                                    modalVisible={statusModal}
                                    setModalVisible={this.closeModal}
                                />
                                <TitleLogo
                                    firstWord='INICIAR'
                                    secondWord='SESIÓN'
                                />
                                <View style={styles.containerInput}>
                                    <View style={styles.containerIcon}>
                                        <Mail
                                            width='20'
                                            height='20'
                                            color={Color.White}
                                        />
                                    </View>
                                    <TextInput
                                        ref={this.setEmail}
                                        style={styles.input}
                                        name="email"
                                        onChange={this.onChangeEmail}
                                        placeholder='Correo electrónico'
                                        placeholderTextColor={Color.White}
                                        keyboardType='email-address'
                                        autoCompleteType='email'
                                        autoCapitalize='none'
                                        onSubmitEditing={() => { this.focusPassword() }}
                                    />
                                </View>
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
                                        name="password"
                                        secureTextEntry={stateBtnPassword}
                                        onChange={this.onChangePassword}
                                        placeholder='Contraseña'
                                        placeholderTextColor={Color.White}
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
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        tintColors={Platform.OS === 'ios' ? 'yellow' : { true: Color.Yellow, false: Color.Green }}
                                        onValueChange={() => {
                                            this.changeStatusCkeckBox(statusCkeckBox)
                                        }}
                                        onTintColor={Platform.OS === 'ios' ? Color.Yellow : { true: Color.White }}
                                        onCheckColor={Platform.OS === 'ios' ? Color.Yellow : { true: Color.White }}
                                        value={statusCkeckBox}
                                        style={styles.checkbox}
                                    />
                                    <MyAppText fontSize={16} color={'white'}>Recuérdame</MyAppText>
                                </View>
                                <ButtonWhite
                                    event={this.onSubmitLogin}
                                    title={'Siguiente'}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </BackGroundGradient>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInput: {
        width: '90%',
        height: 45,
        flexDirection: 'row',
        backgroundColor: Color.backgroundInput,
        borderColor: Color.White,
        borderWidth: 1,
        borderRadius: 10,
        color: Color.White,
        margin: 10
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
    inputPassword: {
        color: Color.White,
        width: '70%',
        fontFamily: 'Nunito-Regular'
    },
    checkboxContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        marginBottom: Platform.OS === 'ios' ? 10 : 0
    },
    checkbox: {
        alignSelf: "center",
        color: Color.White,
        borderColor: Color.White,
        marginRight: Platform.OS === 'ios' ? 10 : 0
    },
    containerEye: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapDispatchToProps = {
    cambiarUser,
    cambiarCalendar,
    cambiarConfiguration,
    cambiarContent,
    cambiarNews,
    cambiarStoreItem,
    cambiarExperience,
    cambiarYourShopping,
    cambiarFunFacts,
}

export default connect(null, mapDispatchToProps)(LoginScreen)