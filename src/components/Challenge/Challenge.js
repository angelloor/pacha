import NetInfo from "@react-native-community/netinfo"
import * as ImagePicker from 'expo-image-picker'
import mime from "mime"
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { cambiarContent, cambiarUser } from '../../actions/index'
import cointIcon from '../../assets/static/cointFhd.png'
import experience from '../../assets/static/experienceFhd.png'
import Http from '../../libs/http'
import Storage from '../../libs/Storage'
import Color from '../../resources/Color'
import { getFullDate, getTimeChallenge } from '../../utils/otherUtils'
import BackGroundGradient from '../BackGroundGradient'
import Error from '../Error'
import Loader from '../Loader'
import MyAppText from '../MyAppText'
import MyHeaderText from "../MyHeaderText"
import ConfirmModal from "./ConfirmModal"
import QuestionPhoto from './QuestionPhoto'

const heightHeader = (Dimensions.get('window').height) / 2.5

let timeOut1
let timeOut2

const Challenge = ({ route, user, cambiarUser, cambiarContent, contentGeneral }) => {
    const { item, categoryId, indexOne, indexTwo } = route.params
    const { ambientalImpact, description, name, reward } = item
    const isCom = contentGeneral[indexOne].challenge[indexTwo].isCompleted
    const { coint, experiencie } = reward
    const start = categoryId.colorPosition[1]
    const end = categoryId.colorPosition[0]
    const url = `${Http.instance.server}/fhd${categoryId.imageUrl}`

    const [isProgressStatus, setIsProgres] = useState(false)
    const [isSimilarChallenge, setIsSimilarChallenge] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [statusConfirmModal, setStatusConfirmModal] = useState(false)

    const [questionUploadFoto, setQuestionUploadFoto] = useState(false)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)


    const logistButtons = async () => {
        const inProgress = await returnInProgress()
        const challengeInProgressAsync = await returnChallengeInProgress()

        if (inProgress) {
            setIsProgres(true)

            if (challengeInProgressAsync == item._id) {
                setIsSimilarChallenge(true)
            }

            let fechaStart = new Date(inProgress)
            let fechaActual = new Date(getFullDate())

            const timeChallenge = getTimeChallenge(fechaStart, fechaActual)

            if (timeChallenge.isFinished) {
                setIsFinished(true)
            }
        }
    }

    useEffect(() => {
        logistButtons()
        clearTimeout(timeOut1)
        clearTimeout(timeOut2)
    }, [])

    const handleStart = async () => {
        Storage.instance.get(`inProgress`)
            .then((response) => {
                if (response) {
                    activeError('Ya tienes asignado un reto, termínalo y podrás continuar con tu aventura😊')
                    return
                } else {
                    setIsProgres(true)
                    setIsSimilarChallenge(true)
                    let fechaActual = getFullDate()
                    Storage.instance.store('inProgress', fechaActual)
                    Storage.instance.store('challengeInProgress', item._id)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleInProcess = () => {
        Storage.instance.get(`inProgress`)
            .then((response) => {
                if (response) {
                    let fechaStart = new Date(response)
                    let fechaActual = new Date(getFullDate())
                    const timeChallenge = getTimeChallenge(fechaStart, fechaActual)
                    if (timeChallenge.isFinished) {
                        activeError('El tiempo de espera ha finalizado sube tu foto🤗')
                        setIsFinished(true)
                    } else {
                        activeError('El reto esta en curso 😎 regresa en ' + timeChallenge.timeRemaining + ' para que puedas subir tu foto')
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const clearStorage = async () => {
        await Storage.instance.remove('inProgress')
        await Storage.instance.remove('challengeInProgress')
        setIsProgres(false)
        setIsSimilarChallenge(false)
        setIsFinished(false)
    }

    const closeModalConfirm = () => {
        setStatusConfirmModal(false)
    }

    const openModalConfirm = () => {
        setStatusConfirmModal(true)
    }

    const confirmChallenge = () => {
        closeModalConfirm()
        handleStart()
    }

    const returnInProgress = () => {
        return new Promise((resolve, reject) => {
            Storage.instance.get(`inProgress`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    const returnChallengeInProgress = () => {
        return new Promise((resolve, reject) => {
            Storage.instance.get(`challengeInProgress`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })

        })
    }

    //funcionar para ya enviar
    const openQuestionPhoto = () => {
        setQuestionUploadFoto(true)
    }

    const closeQuestionPhoto = () => {
        setQuestionUploadFoto(false)
    }

    const cancel = () => {
        closeQuestionPhoto()
        setImage(null)
    }

    const send = () => {
        if (!image) {
            activeError('Tienes que seleccionar una imagen para continuar🙄')
            return
        }
        saveImage(image)
        cancel()
    }

    const activeLoading = () => {
        setLoading(true)
    }

    const desactiveLoading = () => {
        setLoading(false)
    }

    const activeError = (errorText) => {
        setErrorText(errorText)
        setError(true)
    }

    const desactiveError = () => {
        setError(false)
        setErrorText('')
    }

    const isCompletedFunction = () => {
        let element = contentGeneral[indexOne].challenge[indexTwo]
        element = {
            ...element,
            isCompleted: true
        }
        contentGeneral[indexOne].challenge.splice(indexTwo, 1)
        contentGeneral[indexOne].challenge.splice(indexTwo, 0, element)
        return contentGeneral
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(result)
        }
    }

    const createFormData = (photo, body) => {
        const data = new FormData()
        const newImageUri = "file:///" + photo.uri.split("file:/").join("")

        data.append('photoChallengue', {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split('/').pop(),
        })

        Object.keys(body).forEach((key) => {
            data.append(key, body[key])
        })

        return data
    }

    const saveImage = async (image) => {
        const data = createFormData(image,
            {
                idUser: user._id,
                idChallenge: item._id,
                newCoint: user.coint + item.reward.coint,
                newExperience: user.experience + item.reward.experiencie,
            })

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                activeLoading()
                Http.instance.postFormData('/challenge/saveImage', data)
                    .then((response) => {
                        if (response.error != '') {
                            timeOut2 = setTimeout(() => {
                                desactiveLoading()
                                activeError(response.error)
                            }, 1000)
                            return
                        } else {
                            if (response.body === 'ok') {
                                timeOut2 = setTimeout(() => {
                                    const newArrayContent = isCompletedFunction()
                                    cambiarContent(newArrayContent)

                                    cambiarUser({
                                        ...user,
                                        experience: user.experience + item.reward.experiencie,
                                        coint: user.coint + item.reward.coint
                                    })
                                    //borrar el Storage
                                    clearStorage()
                                    //felicitaciones
                                    desactiveLoading()
                                    activeError('Felicidades👏🥳 Gracias por ser parte de la solución y contribuir al cuidado del ambiente.')
                                }, 1000)
                            }
                        }
                    })
                    .catch((error) => {
                        desactiveLoading()
                        activeError(error)
                    })
            } else {
                desactiveLoading()
                activeError('Revisa tu conexión a internet🥶')
                return
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <SafeAreaView>
            <BackGroundGradient>
                <ScrollView>
                    <Error status={error} desactiveError={desactiveError} errorText={errorText} />
                    <Loader status={loading} />
                    <QuestionPhoto
                        modalVisible={questionUploadFoto}
                        pickImage={pickImage}
                        cancel={cancel}
                        send={send}
                        image={image}
                    />
                    <ConfirmModal
                        text='¿Estas seguro de comenzar el reto?'
                        modalVisible={statusConfirmModal}
                        setModalVisible={closeModalConfirm}
                        confirmChallenge={confirmChallenge}
                    />
                    <LinearGradient
                        style={styles.containerHeader}
                        colors={[start, end]}>
                    </LinearGradient>
                    <View style={styles.containerBody}>
                        <View style={styles.firstSection}>
                            <View style={styles.containerRewad}>
                                <View style={styles.containerItemReward}>
                                    <MyHeaderText fontSize={30} color={'white'} style={{ marginBottom: 5 }}>{experiencie}</MyHeaderText>
                                    <Image source={experience} style={styles.imgReward} />
                                </View>
                            </View>
                            <View style={styles.containerImgCenter}>
                                <Image source={{ uri: url }} style={styles.imgCenter} />
                            </View>
                            <View style={styles.containerRewad}>
                                <View style={styles.containerItemReward}>
                                    <MyHeaderText fontSize={30} color={'white'} style={{ marginBottom: 5 }}>{coint}</MyHeaderText>
                                    <Image source={cointIcon} style={styles.imgReward} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.secondSection}>
                            <View style={styles.row}>
                                <MyHeaderText fontSize={22} color={'white'} style={{ alignSelf: 'center' }}>{name}</MyHeaderText>
                            </View>
                            <View style={styles.row}>
                                <MyAppText fontSize={16} color={'white'} style={{ textAlign: 'justify' }}>{description}</MyAppText>

                            </View>
                            <View style={styles.row}>
                                <MyAppText fontSize={18} color={'white'} style={{ textAlign: 'center' }}>
                                    <MyHeaderText fontSize={18} color={'white'}>Impacto </MyHeaderText>
                                    <MyAppText fontSize={18} color={'white'}>al medio {"\n"}ambiente</MyAppText>
                                </MyAppText>
                            </View>
                            <View style={styles.row}>
                                <MyAppText fontSize={16} color={'white'} style={{ textAlign: 'justify' }}>{ambientalImpact}</MyAppText>
                            </View>
                            <View style={[styles.row, { alignItems: 'center' }]}>

                                {
                                    (isCom)
                                        ?
                                        <TouchableOpacity
                                            activeOpacity={0.6}
                                            disabled={true}
                                        >
                                            <LinearGradient
                                                style={styles.btnChallengue}
                                                colors={[start, end]}>
                                                <MyHeaderText fontSize={16} color={'white'} style={{ alignSelf: 'center' }}>Finalizado</MyHeaderText>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        :
                                        (isProgressStatus)
                                            ?
                                            (isSimilarChallenge)
                                                ?
                                                (isFinished)
                                                    ?
                                                    <TouchableOpacity
                                                        activeOpacity={0.6}
                                                        onPress={() => openQuestionPhoto()}
                                                        disabled={false}
                                                    >
                                                        <LinearGradient
                                                            style={styles.btnChallengue}
                                                            colors={[start, end]}>
                                                            <MyHeaderText fontSize={16} color={'white'} style={{ alignSelf: 'center' }}>Subir foto</MyHeaderText>
                                                        </LinearGradient>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity
                                                        activeOpacity={0.6}
                                                        onPress={() => handleInProcess()}
                                                        disabled={false}
                                                    >
                                                        <LinearGradient
                                                            style={styles.btnChallengue}
                                                            colors={[start, end]}>
                                                            <MyHeaderText fontSize={16} color={'white'} style={{ alignSelf: 'center' }}>En curso</MyHeaderText>
                                                        </LinearGradient>
                                                    </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    activeOpacity={0.6}
                                                    onPress={() => handleStart()}
                                                    disabled={false}
                                                >
                                                    <LinearGradient
                                                        style={styles.btnChallengue}
                                                        colors={[start, end]}>
                                                        <MyHeaderText fontSize={16} color={'white'} style={{ alignSelf: 'center' }}>Comenzar</MyHeaderText>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                activeOpacity={0.6}
                                                onPress={() => openModalConfirm()}
                                                disabled={false}
                                            >
                                                <LinearGradient
                                                    style={styles.btnChallengue}
                                                    colors={[start, end]}>
                                                    <MyHeaderText fontSize={16} color={'white'} style={{ alignSelf: 'center' }}>Comenzar</MyHeaderText>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </BackGroundGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerFlex: {
        flex: 1,
    },
    containerHeader: {
        width: '100%',
        height: heightHeader,
    },
    containerBody: {
        marginTop: -(heightHeader)
    },
    text: {
        width: '100%',
        height: 50,
    },
    firstSection: {
        width: '90%',
        height: heightHeader * 0.5,
        marginTop: heightHeader * 0.15,
        marginBottom: heightHeader * 0.15,
        marginLeft: '5%',
        marginRight: '5%',
        flexDirection: 'row'
    },
    secondSection: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: Color.Gray,
        borderRadius: 20,
        padding: 20
    },
    containerRewad: {
        width: '30%',
    },
    containerItemReward: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgReward: {
        width: 50,
        height: 50,
    },
    containerImgCenter: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    imgCenter: {
        width: 120,
        height: 120,
    },
    row: {
        paddingTop: 15
    },
    btnChallengue: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        paddingBottom: 15,
        paddingTop: 15
    }

})

const mapDispatchToProps = {
    cambiarUser,
    cambiarContent,
}

const mapStateToProps = state => {
    return {
        user: state.user,
        contentGeneral: state.content,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge)
