import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, Image, Linking, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import RNExitApp from 'react-native-exit-app'
import fb from '../../assets/static/fb.png'
import ig from '../../assets/static/ig.png'
import logoPrefectura from '../../assets/static/logoPrefectura.png'
import youtube from '../../assets/static/youtube.png'
import Http from '../../libs/http'
import Storage from '../../libs/Storage'
import Color from '../../resources/Color'
import { getDataParentGate } from '../../utils/otherUtils'
import MyAppText from '../MyAppText'
import OpenURLButton from '../OpenURLButton'
import OpenURLButtonNeverStyle from '../OpenURLButtonNeverStyle'
import ParentalGate from '../ParentalGate'
import SimpleModal from '../SimpleModal'
import ChangePassword from './ChangePassword'

var idTimeOut
let dataParentGate = ''
let url = ''

const Body = (props) => {
    const { onChangePassword, modalVisible, openModalVisible, closeModalVisible, setOne, setTwo, setThree, focusTwo, focusThree, configuration } = props
    const configurationRow = configuration[0]
    const privacyPolicies = `${Http.instance.server}${configurationRow.Links.privacyPolicies}`
    const termsAndConditions = `${Http.instance.server}${configurationRow.Links.termsAndConditions}`

    //parentalGate
    useEffect(() => {
        return () => {
            clearTimeout(idTimeOut)
        }
    }, [])

    const handleCloseSesion = async () => {
        const user = await Storage.instance.remove(`user`)
        const password = await Storage.instance.remove(`password`)
        if (user && password) {
            if (Platform.OS === 'android') {
                BackHandler.exitApp()
            } else {
                RNExitApp.exitApp()
            }
        }
    }

    //modal Link 
    const [textModal, setTextModal] = useState('')
    const [statusModal, setStatusModal] = useState(false)

    //parentalGate
    const [statusParentalGate, setStatusParentalGate] = useState(false)
    const [question, setQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [answers, setAnswers] = useState([])

    const openModal = (textModal) => {
        setTextModal(textModal)
        setStatusModal(true)
    }

    const closeModal = () => {
        setTextModal('')
        setStatusModal(false)
    }


    //parentalGate
    const openParentalGate = () => {
        setStatusParentalGate(true)
        dataParentGate = getDataParentGate()
        setQuestion(dataParentGate.question)
        setCorrectAnswer(dataParentGate.correctAnswer)
        setAnswers(dataParentGate.answers)
    }

    const closeParentalGate = () => {
        setStatusParentalGate(false)
        idTimeOut = setTimeout(() => {
            Storage.instance.get(`selectedAnswer`)
                .then((data) => {
                    if (dataParentGate.correctAnswer == data) {
                        handlePress()
                    } else {
                        return
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }, 10)
    }

    //handlePress
    const handlePress = useCallback(async () => {
        Storage.instance.get(`url`)
            .then(async (url) => {
                console.log(url)
                const supported = await Linking.canOpenURL(url)
                if (supported) {
                    await Linking.openURL(url)
                } else {
                    openModal(`No se puede abrir la url: ${url}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [url])

    return (
        <View style={styles.container}>
            <View style={styles.containerAll}>
                <SimpleModal
                    text={textModal}
                    textBtn='Ok'
                    modalVisible={statusModal}
                    setModalVisible={closeModal}
                />
                <ParentalGate
                    question={question}
                    answers={answers}
                    correctAnswer={correctAnswer}
                    modalVisible={statusParentalGate}
                    setModalVisible={closeParentalGate}
                />
                <ChangePassword
                    modalVisible={modalVisible}
                    closeModalVisible={closeModalVisible}
                    setOne={setOne}
                    setTwo={setTwo}
                    setThree={setThree}
                    focusTwo={focusTwo}
                    focusThree={focusThree}
                    onChangePassword={onChangePassword}
                />
                <View style={styles.containerSection}>
                    <View style={styles.containerImage}>
                        <Image
                            style={styles.imgLogo}
                            source={logoPrefectura}
                        />
                    </View>
                    <View style={styles.containerText}>
                        <MyAppText fontSize={14} color={'white'}>
                            El Gobierno Autónomo Descentralizado Provincial de Pastaza a la vanguardia del desarrollo Regional fortalece la Educación Ambiental en territorio
                </MyAppText>
                    </View>
                </View>
                <View style={styles.containerLink}>
                    <MyAppText fontSize={15} color={'white'}>Políticas de privacidad</MyAppText>
                    <OpenURLButton url={privacyPolicies} openParentalGate={() => { openParentalGate() }} handlePress={() => { handlePress() }}>Leer</OpenURLButton>
                </View>
                <View style={styles.containerLink}>
                    <MyAppText fontSize={15} color={'white'}>Términos y condiciones</MyAppText>
                    <OpenURLButton url={termsAndConditions} openParentalGate={() => { openParentalGate() }} handlePress={() => { handlePress() }}>Leer</OpenURLButton>
                </View>
                <View style={styles.containerLink}>
                    <MyAppText fontSize={15} color={'white'}>¿Necesitas ayuda?</MyAppText>
                    <OpenURLButton url={configurationRow.Links.suport} openParentalGate={() => { openParentalGate() }} handlePress={() => { handlePress() }}>Soporte</OpenURLButton>
                </View>
                <View style={styles.containerPass}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.btnChangePassword}
                        onPress={() => {
                            openModalVisible()
                        }}
                    >
                        <MyAppText fontSize={15} color={'white'}>Cambiar contraseña</MyAppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.btnChangePassword, styles.space]}
                        onPress={() => {
                            handleCloseSesion()
                        }}
                    >
                        <MyAppText fontSize={15} color={'white'}>Cerrar sesión</MyAppText>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerSocialLink}>
                    <OpenURLButtonNeverStyle url={configurationRow.socialLinks.facebook} openParentalGate={() => { openParentalGate() }} handlePress={() => { handlePress() }}>
                        <Image
                            style={styles.img}
                            source={fb} />
                    </OpenURLButtonNeverStyle>
                    <OpenURLButtonNeverStyle url={configurationRow.socialLinks.instagram} openParentalGate={() => { openParentalGate() }} handlePress={() => { handlePress() }}>
                        <Image
                            style={styles.img}
                            source={ig} />
                    </OpenURLButtonNeverStyle>
                    <OpenURLButtonNeverStyle url={configurationRow.socialLinks.youtube} openParentalGate={() => { openParentalGate() }} handlePress={() => { handlePress() }}>
                        <Image
                            style={styles.img}
                            source={youtube} />
                    </OpenURLButtonNeverStyle>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: Color.Gray,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2.5%',
        marginTop: 0,
        paddingTop: '2.5%',
        paddingBottom: '2.5%',
        justifyContent: 'center'
    },
    containerAll: {
        width: '95%',
    },
    imgLogo: {
        width: 150,
        height: 150
    },
    containerLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10
    },
    containerPass: {
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: 'center',
    },
    img: {
        width: 40,
        height: 40
    },
    containerSocialLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    containerSection: {
        flexDirection: 'row',
    },
    containerImage: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerText: {
        width: '50%',
        paddingRight: 20,
        justifyContent: 'center',
    },
    btnChangePassword: {
        backgroundColor: Color.Green,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    space: {
        marginTop: 20
    }
})

export default Body