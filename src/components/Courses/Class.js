import NetInfo from "@react-native-community/netinfo"
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { cambiarContent, cambiarUser } from '../../actions/index'
import Http from '../../libs/http'
import Storage from '../../libs/Storage'
import BackGroundGradient from '../BackGroundGradient'
import ButtonNextClass from '../ButtonNextClass'
import Congratulations from '../Congratulations'
import Error from '../Error'
import Loader from '../Loader'
import MyHeaderText from '../MyHeaderText'
import QuestionModal from '../QuestionModal'
import ScreenHeaderGradient from '../ScreenHeaderGradient'
import SectionContent from './SectionContent'

var idTimeOut
var timeout01
var timeout02

const Class = ({ route, user, cambiarUser, cambiarContent, contentGeneral }) => {
    const { categoryId, indexOne, indexTwo } = route.params
    let item = contentGeneral[indexOne].topic[indexTwo]
    const { content, imageTopic, correctAnswer, isCompleted } = item

    const isCompletedFunction = () => {
        let element = contentGeneral[indexOne].topic[indexTwo]
        element = {
            ...element,
            isCompleted: true
        }
        contentGeneral[indexOne].topic.splice(indexTwo, 1)
        contentGeneral[indexOne].topic.splice(indexTwo, 0, element)
        return contentGeneral
    }

    const url = `${Http.instance.server}${imageTopic}`

    const [modalVisible, setModalVisible] = useState(false)
    const [category, setCategory] = useState({})


    const addTopicsUser = () => {
        return new Promise((resolve, reject) => {
            const body = {
                userId: user._id,
                topics: item._id,
            }
            Http.instance.post('/topicsUser', body)
                .then((data) => {
                    if (data.error != '') {
                        reject(data.error)
                    } else {
                        resolve('Ok')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    useEffect(() => {
        return () => {
            clearTimeout(idTimeOut)
            clearTimeout(timeout01)
            clearTimeout(timeout02)
        }
    }, [])

    const closeModal = () => {
        setModalVisible(false)
        activeLoading()
        idTimeOut = setTimeout(() => {
            Storage.instance.get(`selectedAnswer`)
                .then((data) => {
                    if (data == correctAnswer) {
                        NetInfo.fetch().then(state => {
                            if (state.isConnected) {
                                const body = {
                                    userId: user._id,
                                    newCoint: user.coint + item.reward.coint,
                                    newExperience: user.experience + item.reward.experiencie,
                                }
                                Http.instance.post('/user/changeReward', body)
                                    .then((data) => {
                                        if (data.error != '') {
                                            timeout01 = setTimeout(() => {
                                                desactiveLoading()
                                                activeError(data.error)
                                            }, 1000)
                                            return
                                        } else {
                                            timeout02 = setTimeout(async () => {
                                                const newArrayContent = isCompletedFunction()
                                                cambiarContent(newArrayContent)
                                                cambiarUser({
                                                    ...user,
                                                    experience: user.experience + item.reward.experiencie,
                                                    coint: user.coint + item.reward.coint
                                                })

                                                const r = await addTopicsUser()
                                                desactiveLoading()
                                                openCongratulations(true)
                                            }, 1000)
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err)
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
                    } else {
                        NetInfo.fetch().then(state => {
                            if (state.isConnected) {
                                const body = {
                                    userId: user._id,
                                    newExperience: user.experience + item.reward.experiencie,
                                }
                                activeLoading()
                                Http.instance.post('/user/changeExperience', body)
                                    .then((data) => {
                                        if (data.error != '') {
                                            timeout01 = setTimeout(() => {
                                                desactiveLoading()
                                                activeError(data.error)
                                            }, 1000)
                                            return
                                        } else {
                                            timeout02 = setTimeout(async () => {
                                                const newArrayContent = isCompletedFunction()
                                                cambiarContent(newArrayContent)
                                                cambiarUser({
                                                    ...user,
                                                    experience: user.experience + item.reward.experiencie
                                                })

                                                const r = await addTopicsUser()
                                                desactiveLoading()
                                                openCongratulations(false)
                                            }, 1000)
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err)
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
                })
                .catch((error) => {
                    desactiveLoading()
                    console.log(error)
                })
        }, 10)
    }

    const hanleNextClass = (categoryId) => {
        setCategory(categoryId)
        setModalVisible(true)
    }

    const [congratulationsState, setCongratulations] = useState(false)
    const [statusCongratulations, setStatusCongratulations] = useState(false)

    const openCongratulations = (status) => {
        setCongratulations(true)
        setStatusCongratulations(status)
    }

    const closeCongratulations = () => {
        setCongratulations(false)
    }


    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false)

    const activeLoading = () => {
        setLoading(true)
    }

    const desactiveLoading = () => {
        setLoading(false)
    }

    const activeError = (errorText) => {
        setError(true)
        setErrorText(errorText)
    }

    const desactiveError = () => {
        setError(false)
        setErrorText('')
    }

    return (
        <SafeAreaView>
            <BackGroundGradient>
                <ScreenHeaderGradient title={item.name} categoryId={categoryId} />
                <Error status={error} desactiveError={desactiveError} errorText={errorText} />
                <Loader status={loading} />
                <QuestionModal
                    item={item}
                    modalVisible={modalVisible}
                    setModalVisible={closeModal}
                    category={category}
                />
                <Congratulations
                    modalVisible={congratulationsState}
                    setModalVisible={closeCongratulations}
                    statusCongratulations={statusCongratulations}
                />
                <FlatList
                    data={content}
                    keyExtractor={(index) => index.toString()}
                    renderItem={({ item, index }) => <SectionContent item={item} index={index} url={url} />}
                    contentContainerStyle={styles.container}
                    ListFooterComponent={
                        <View>
                            {(isCompleted)
                                ?
                                <></>
                                :
                                <ButtonNextClass
                                    title='Finalizar'
                                    isCompleted={isCompleted}
                                    textColor={categoryId.colorPosition[0]}
                                    event={() => { hanleNextClass(categoryId) }}
                                />

                            }
                            {(isCompleted)
                                ?
                                <LinearGradient
                                    colors={[categoryId.colorPosition[1], categoryId.colorPosition[0]]}
                                    style={
                                        {
                                            marginTop: 10,
                                            padding: 20,
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }
                                    }>
                                    <MyHeaderText color={'white'} fontSize={16}>Clase finalizada</MyHeaderText>
                                </LinearGradient>
                                :
                                <></>
                            }
                        </View>
                    }
                />


            </BackGroundGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 100
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

export default connect(mapStateToProps, mapDispatchToProps)(Class)
