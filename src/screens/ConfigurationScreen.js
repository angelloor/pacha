import NetInfo from "@react-native-community/netinfo"
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import BackGroundGradient from '../components/BackGroundGradient'
import Body from '../components/Configuration/Body'
import Header from '../components/Configuration/Header'
import Error from '../components/Error'
import Loader from '../components/Loader'
import ScreenHeader from '../components/ScreenHeader'
import SimpleModal from '../components/SimpleModal'
import Http from '../libs/http'
import Storage from '../libs/Storage'
import { getLevel } from '../utils/otherUtils'

var timeout01
var timeout02

class ConfigurationScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            configuration: props.configuration,
            dataExperience: getLevel(props.user.experience),
            modalVisible: false,
            loading: false,
            statusModal: false,
            textModal: '',
            error: false,
            errorText: '',

        }

        // references
        this.one = null
        this.setOne = element => {
            this.one = element
        }
        this.focusOne = () => {
            if (this.one) this.one.focus()
        }

        this.two = null
        this.setTwo = element => {
            this.two = element
        }
        this.focusTwo = () => {
            if (this.two) this.two.focus()
        }

        this.three = null
        this.setThree = element => {
            this.three = element
        }
        this.focusThree = () => {
            if (this.three) this.three.focus()
        }
    }

    componentWillUnmount = () => {
        clearTimeout(timeout01)
        clearTimeout(timeout02)
    }

    onChangePassword = (changeOne, changeTwo) => {
        const { _id } = this.state.user

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                const body = {
                    user: _id,
                    passwordActually: changeOne,
                    passwordNew: changeTwo
                }
                this.activeLoading()
                Http.instance.post('/user/changePassword', body)
                    .then(async (data) => {
                        if (data.error != '') {
                            timeout01 = setTimeout(() => {
                                this.desactiveLoading()
                                this.openModal(data.error)
                            }, 1000)
                            return
                        } else {
                            const user = await Storage.instance.remove(`user`)
                            const password = await Storage.instance.remove(`password`)
                            if (user && password) {
                                timeout02 = setTimeout(() => {
                                    this.desactiveLoading()
                                    this.openModal('Contraseña actualizada')
                                }, 1000)
                            } else {
                                timeout02 = setTimeout(() => {
                                    this.desactiveLoading()
                                    this.openModal('Ocurrió un Error: Borre el cache de la App')
                                }, 1000)
                                return
                            }
                        }
                    })
                    .catch((err) => {
                        this.desactiveLoading()
                        this.openModal(err)
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

    //Error
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

    //Loading
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

    //Modal
    openModalVisible = () => {
        this.setState({
            modalVisible: true
        })
    }

    closeModalVisible = () => {
        this.setState({
            modalVisible: false,
        })
    }

    render() {
        const { user, configuration, dataExperience, modalVisible, loading, statusModal, textModal, error, errorText } = this.state
        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <ScreenHeader title='Acerca de Pacha App' />
                    <ScrollView contentContainerStyle={styles.containerConf}>
                        <Loader status={loading} />
                        <Error status={error} desactiveError={this.desactiveError} errorText={errorText} />
                        {/* modal */}
                        <SimpleModal
                            text={textModal}
                            textBtn='Ok'
                            modalVisible={statusModal}
                            setModalVisible={this.closeModal}
                        />
                        {/* modal */}
                        <Header user={user} level={dataExperience.level} />
                        <Body
                            configuration={configuration}
                            modalVisible={modalVisible}
                            openModalVisible={this.openModalVisible}
                            closeModalVisible={this.closeModalVisible}
                            setOne={this.setOne}
                            setTwo={this.setTwo}
                            setThree={this.setThree}
                            focusTwo={this.focusTwo}
                            focusThree={this.focusThree}
                            onChangePassword={this.onChangePassword}
                        />
                    </ScrollView>
                </BackGroundGradient>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containerConf: {
        paddingBottom: '20%'
    }
})

const mapStateToProps = state => {
    return {
        configuration: state.configuration,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(ConfigurationScreen)