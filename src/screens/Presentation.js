import NetInfo from "@react-native-community/netinfo"
import React, { Component } from 'react'
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native'
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
import Logo from '../assets/static/logo.png'
import BackGroundGradient from '../components/BackGroundGradient'
import ButtonGreen from '../components/ButtonGreen'
import ButtonWhite from '../components/ButtonWhite'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Storage from '../libs/Storage'
import Http from '../libs/http'

var timeout01

class Presentation extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        loading: false,
        error: false,
        errorText: '',
    }

    componentWillUnmount = () => {
        clearTimeout(timeout01)
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

    handlePressRegister = () => {
        this.props.navigation.navigate('Register')
    }

    handlePressLogin = async () => {
        const user = await Storage.instance.get(`user`)
        const password = await Storage.instance.get(`password`)

        if (user && password) {
            const body = {
                email: user,
                password
            }

            NetInfo.fetch().then(state => {
                if (state.isConnected) {
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
        } else {
            this.props.navigation.navigate('Login')
        }
    }

    render() {
        const { loading, error, errorText } = this.state
        return (
            <SafeAreaView>
                <StatusBar hidden={Platform.OS === 'ios' ? false : true} />
                <BackGroundGradient>
                    <View
                        style={styles.container}
                    >
                        <Loader status={loading} />
                        <Error status={error} desactiveError={this.desactiveError} errorText={errorText} />
                        <Image
                            style={styles.img}
                            source={Logo} />
                        <ButtonWhite
                            title='Iniciar Sesión'
                            event={this.handlePressLogin}
                        />
                        <ButtonGreen
                            title='Registrarse'
                            event={this.handlePressRegister}
                        />
                    </View>
                </BackGroundGradient>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 280,
        height: 280,
        marginBottom: 20,
    },
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
    cambiarFunFacts
}

export default connect(null, mapDispatchToProps)(Presentation)