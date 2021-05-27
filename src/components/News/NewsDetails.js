import React, { useCallback, useEffect, useState } from 'react'
import { Image, Linking, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Http from '../../libs/http'
import Storage from '../../libs/Storage'
import Color from '../../resources/Color'
import { getDataParentGate } from '../../utils/otherUtils'
import BackGroundGradient from '../BackGroundGradient'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'
import OpenURLButtonNeverStyle from '../OpenURLButtonNeverStyle'
import ParentalGate from '../ParentalGate'
import ScreenHeader from '../ScreenHeader'
import SimpleModal from '../SimpleModal'

let dataParentGate = ''
var idTimeOut
var idTimeOut01

let url = ''

const NewsDetails = ({ route }) => {
    const { nameButton, linkButton, imageUrl, title, description, datePublished } = route.params.item
    const url = `${Http.instance.server}${imageUrl}`

    //parentalGate
    useEffect(() => {
        return () => {
            clearTimeout(idTimeOut)
        }
    }, [])

    //modal Link 
    const [textModal, setTextModal] = useState('')
    const [statusModal, setStatusModal] = useState(false)

    //parentalGate
    const [statusParentalGate, setStatusParentalGate] = useState(false)
    const [question, setQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [answers, setAnswers] = useState([])

    const openModal = (textModal) => {
        setStatusModal(true)
        setTextModal(textModal)
    }

    const closeModal = () => {
        setStatusModal(false)
        setTextModal('')
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
        <SafeAreaView>
            <BackGroundGradient>
                <ScreenHeader title='Noticias' />
                <ScrollView>
                    <View style={styles.container}>
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
                        <View style={styles.containerTitle}>
                            <MyHeaderText fontSize={16} color={'white'} style={styles.titleTxt}>{title}</MyHeaderText>
                        </View>
                        <View style={styles.containerImg}>
                            <Image
                                style={styles.ImgNews}
                                source={{
                                    uri: url,
                                }}
                            />
                        </View>
                        <View style={styles.containerDescription}>
                            <MyAppText fontSize={14} color={'white'} style={styles.description}>{description}</MyAppText>
                        </View>
                        <View style={styles.containerDatePublished}>
                            <MyAppText fontSize={14} color={'white'} style={styles.datePublished}>{datePublished}</MyAppText>
                        </View>
                        {(nameButton) ?
                            <OpenURLButtonNeverStyle url={linkButton} openParentalGate={() => { openParentalGate() }} handlePress={() => { handlePress() }}>
                                <View style={styles.containerButton}>
                                    <MyAppText fontSize={14} color={'white'}>{nameButton}</MyAppText>
                                </View>
                            </OpenURLButtonNeverStyle>
                            :
                            <></>
                        }
                    </View>
                </ScrollView>
            </BackGroundGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: Color.Gray,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingBottom: 20,
        marginTop: 20,
        marginBottom: 100,
    },
    containerTitle: {
        width: '90%',
    },
    titleTxt: {
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    containerImg: {
        width: '90%',
        alignItems: 'center'
    },
    ImgNews: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    containerDescription: {
        width: '90%',
    },
    description: {
        textAlign: 'justify',
        paddingBottom: 10,
        paddingTop: 10
    },
    containerDatePublished: {
        width: '90%',
    },
    datePublished: {
        textAlign: 'right',
        paddingBottom: 10,
        paddingTop: 10
    },
    containerButton: {
        backgroundColor: Color.Green,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        marginTop: 10
    },
})

export default NewsDetails