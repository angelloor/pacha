import NetInfo from "@react-native-community/netinfo"
import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { cambiarUser, cambiarYourShopping } from '../actions/index'
import iconCoins from '../assets/static/coint.png'
import heroStore from '../assets/static/heroStore.png'
import iconStore from '../assets/static/store.png'
import BackGroundGradient from '../components/BackGroundGradient'
import BuyModal from '../components/BuyModal'
import Error from "../components/Error"
import Loader from '../components/Loader'
import MyAppText from '../components/MyAppText'
import MyHeaderText from '../components/MyHeaderText'
import SimpleModal from '../components/SimpleModal'
import StoreItem from '../components/Store/StoreItem'
import Http from '../libs/http'
import Storage from '../libs/Storage'
import Color from '../resources/Color'

var idTimeOut
var timeout01
var timeout02

class StoreScreen extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        statusModal: false,
        textModal: '',
        itemSelected: {},
        statusM: false,
        textM: '',
        loading: false,
        error: false,
        errorText: ''
    }

    navigateYourShopping = () => {
        this.props.navigation.navigate('YourShopping')
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

    //loading
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

    // Modal
    openM = (textM) => {
        this.setState({
            statusM: true,
            textM
        })
    }

    closeM = () => {
        this.setState({
            statusM: false
        })
    }

    // Modal
    openModal = (textModal, item) => {
        this.setState({
            statusModal: true,
            textModal,
            itemSelected: item
        })
    }

    closeModal = () => {
        this.setState({
            statusModal: false
        })
    }

    handleBuy = (item) => {
        this.openModal('¿Estás seguro de realizar la compra?', item)
    }

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }

    confirmBuy = () => {
        this.setState({
            statusModal: false
        })

        const { storeItem, user } = this.props

        idTimeOut = setTimeout(() => {
            Storage.instance.get(`itemSelected`)
                .then((data) => {
                    const itemFound = storeItem.find(element => element._id == data)
                    const { price } = itemFound
                    const { coint } = user
                    if (price > coint) {
                        this.openM('AmbientalCoins Insuficientes 😢')
                    } else {
                        NetInfo.fetch().then(state => {
                            if (state.isConnected) {
                                const body = {
                                    itemId: itemFound._id,
                                    userId: user._id,
                                    price: itemFound.price
                                }
                                this.activeLoading()
                                Http.instance.post('/yourShopping', body)
                                    .then(async (data) => {
                                        if (data.error != '') {
                                            timeout01 = setTimeout(() => {
                                                this.desactiveLoading()
                                                this.activeError(data.error)
                                            }, 1000)
                                            return
                                        } else {
                                            const item = {
                                                _id: this.getRandomInt(1, 99999),
                                                deliveryDate: '',
                                                deliveryStatus: false,
                                                itemId: {
                                                    _id: itemFound._id,
                                                    description: itemFound.description,
                                                    title: itemFound.title,
                                                    urlImage: itemFound.urlImage,

                                                },
                                                shoppingDate: '13-04-2021',
                                                userId: user._id,
                                            }
                                            let yourShoppingActually = this.props.yourShopping
                                            yourShoppingActually.push(item)

                                            this.props.cambiarYourShopping(yourShoppingActually)
                                            this.props.cambiarUser({
                                                ...user,
                                                coint: coint - price
                                            })
                                            timeout02 = setTimeout(() => {
                                                this.desactiveLoading()
                                                this.openM('Compra realizada con éxito 😎')
                                            }, 0)
                                        }
                                    })
                                    .catch((err) => {
                                        this.desactiveLoading()
                                        this.activeError(err)
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
                })
                .catch((error) => {
                    console.log(error)
                })
        }, 1)
    }

    componentWillUnmount = () => {
        clearTimeout(idTimeOut)
        clearTimeout(timeout01)
        clearTimeout(timeout02)
    }

    render() {
        const { statusModal, textModal, itemSelected, textM, statusM, loading, error, errorText } = this.state
        const { storeItem, user } = this.props
        const { coint } = user
        let countStoreItem = storeItem.length
        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <LinearGradient
                        colors={[Color.backgroundStore.end, Color.backgroundStore.start]}
                        style={styles.headerStore}
                    >
                        <View style={styles.container}>
                            <Loader status={loading} />
                            <Error status={error} desactiveError={this.desactiveError} errorText={errorText} />
                            {/* modal */}
                            <SimpleModal
                                text={textM}
                                textBtn='Ok'
                                modalVisible={statusM}
                                setModalVisible={this.closeM}
                            />

                            <BuyModal
                                text={textModal}
                                textBtn='Cancelar'
                                modalVisible={statusModal}
                                setModalVisible={this.closeModal}
                                confirmBuy={this.confirmBuy}
                                itemSelected={itemSelected}
                            />
                            <View style={styles.containerCoins}>
                                <MyHeaderText fontSize={16} color={'white'} style={{ alignSelf: 'center' }}>{`${coint} `}</MyHeaderText>
                                <Image
                                    style={styles.imgWidth}
                                    source={iconCoins}
                                />
                            </View>
                            <View style={styles.yourShopping}>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    style={styles.btnShopping}
                                    onPress={this.navigateYourShopping}
                                >
                                    <MyHeaderText fontSize={16} color={'white'}>Tus compras</MyHeaderText>
                                    <Image
                                        style={styles.imgShopping}
                                        source={iconStore}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={styles.containerImageHeader}>
                            <Image
                                style={styles.imgWidthStore}
                                source={heroStore}
                            />
                        </View>
                    </LinearGradient>
                    {countStoreItem == 0 ?
                        <LinearGradient
                            colors={[Color.backgroundStore.end, Color.backgroundStore.start]}
                            style={
                                {
                                    width: '90%',
                                    margin: '5%',
                                    padding: 20,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }
                            }>
                            <MyAppText fontSize={16} color={'white'}>Aún no hay ítems en la tienda</MyAppText>
                        </LinearGradient>
                        :
                        <FlatList
                            data={storeItem}
                            keyExtractor={(item) => (item._id).toString()}
                            renderItem={({ item }) => <StoreItem item={item} onPress={() => { this.handleBuy(item) }} />}
                            contentContainerStyle={{ paddingBottom: 110 }}
                        />
                    }

                </BackGroundGradient>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    headerStore: {
        width: '100%',
        height: '30%',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    containerCoins: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingLeft: 10,
    },
    yourShopping: {
        width: '50%',
    },
    btnShopping: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginRight: 10
    },
    imgShopping: {
        width: 30,
        height: 30
    },
    imgWidth: {
        width: 30,
        height: 30
    },
    containerImageHeader: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgWidthStore: {
        width: '90%',
        height: '90%'
    },
})


const mapDispatchToProps = {
    cambiarUser,
    cambiarYourShopping
}

const mapStateToProps = state => {
    return {
        user: state.user,
        storeItem: state.storeItem,
        yourShopping: state.yourShopping
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen)