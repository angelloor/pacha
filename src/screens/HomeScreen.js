import NetInfo from "@react-native-community/netinfo"
import React, { Component } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import iconAbout from '../assets/static/about.png'
import iconCoins from '../assets/static/coint.png'
import Avatar from '../assets/static/user.png'
import BackGroundGradient from '../components/BackGroundGradient'
import CalendarModal from '../components/CalendarModal'
import ViewAmbientalImpact from '../components/Challenge/ViewAmbientalImpact'
import FunFactsModal from '../components/FunFactsModal'
import CarouselItemChallenge from '../components/Home/CarouselItemChallenge'
import CarouselItemCourse from '../components/Home/CarouselItemCourse'
import ImageLogo from '../components/Home/ImageLogo'
import Preview from '../components/Home/Preview'
import ProgressBar from '../components/Home/ProgressBar'
import Statistics from '../components/Home/Statistics'
import ViewClassModal from '../components/Home/ViewClassModal'
import ViewYourShoppingModal from '../components/Home/ViewYourShoppingModal'
import IsBirthdayModal from '../components/IsBirthdayModal'
import MyAppText from '../components/MyAppText'
import MyHeaderText from '../components/MyHeaderText'
import Http from '../libs/http'
import Storage from '../libs/Storage'
import Color from '../resources/Color'
import { getDayMonth, getLevel } from '../utils/otherUtils'

const height = Dimensions.get('window').height

var idTimeOut01
var idTimeOut02
var idTimeOut03

class HomeScreen extends Component {
    constructor(props) {
        super(props)

        let year = this.getYear()

        Storage.instance.get(`yearNotify`)
            .then((yearNotify) => {
                if (year != yearNotify) {
                    if (this.props.user.isBirthday) {
                        idTimeOut01 = setTimeout(() => {
                            this.setState({
                                statusIsBirthday: (this.props.user.isBirthday) ? true : false
                            })
                            Storage.instance.store('yearNotify', year.toString())
                        }, 5000)
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })

        {/* funFacts */ }
        let day = getDayMonth()

        // day = '27/04'
        const isObjEmpty = Object.keys(props.funFacts).length === 0

        if (!isObjEmpty) {
            Storage.instance.get(`dayNotifyFunFacts`)
                .then((dayNotifyFunFacts) => {
                    if (day != dayNotifyFunFacts) {
                        idTimeOut02 = setTimeout(() => {
                            NetInfo.fetch().then(state => {
                                if (state.isConnected) {
                                    this.openModalFun(props.funFacts.content)
                                    const body = {
                                        userId: props.user._id,
                                        funFactsId: props.funFacts._id
                                    }
                                    Http.instance.post('/funFactsUser', body)
                                        .then(() => {
                                            Storage.instance.store('dayNotifyFunFacts', day.toString())
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                }
                            })
                                .catch(err => {
                                    console.log(err)
                                })
                        }, 10000)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        {/* funFacts */ }
    }

    state = {
        statusModal: false,
        itemCalendar: this.props.calendar[0],
        statusIsBirthday: false,
        textModalFun: '',
        statusModalFun: false,
        modalViewClass: false,
        modalViewShopping: false,
        modalModalAmbientalImpact: false
    }

    countClassTerminated = (array) => {
        let count = 0
        array.map((item) => {
            item.topic.map((itemTopics) => {
                if (itemTopics.isCompleted == true) {
                    count++
                }
            })
        })
        return count
    }

    getItemToRenderClass = (array) => {
        let topicsToRender = []
        array.map((item, indexArray) => {
            item.topic.map((itemTopics) => {
                if (itemTopics.isCompleted == true) {
                    let element = itemTopics
                    element = {
                        categoryId: array[indexArray].categoryId,
                        _id: element._id,
                        name: element.name,
                    }
                    topicsToRender.push(element)
                }
            })
        })
        return topicsToRender
    }

    getYourShopping = (array) => {
        let data = []
        array.map((itemArray) => {
            if (data.length == 0) {
                let element = {
                    _id: itemArray.itemId._id,
                    title: itemArray.itemId.title,
                    urlImage: itemArray.itemId.urlImage,
                    count: 1
                }
                data.push(element)
            } else {
                let efectt = false
                data.map((itemData, indexData) => {
                    if (itemArray.itemId._id == itemData._id) {
                        let otherElement = {
                            ...itemData,
                            count: itemData.count + 1
                        }
                        data.splice(indexData, 1)
                        data.splice(indexData, 0, otherElement)
                        efectt = true
                    }
                })
                if (efectt == false) {
                    let element = {
                        _id: itemArray.itemId._id,
                        title: itemArray.itemId.title,
                        urlImage: itemArray.itemId.urlImage,
                        count: 1
                    }
                    data.push(element)
                }
            }
        })
        return data
    }

    getYear = () => {
        const date = new Date()
        let year = date.getFullYear()
        return year
    }


    getCountNews = async () => {
        countNews = await Storage.instance.get(`countNews`)
        return countNews
    }

    getCountYourShopping = (array) => {
        return array.length
    }

    componentDidMount = () => {
        const { calendar } = this.props
        let day = getDayMonth()

        //day = '02/02'

        const itemCalendar = calendar.find(element => element.dayCelebrate == day)
        calendar.map((item) => {
            if (day == item.dayCelebrate) {
                Storage.instance.get(`calendarNotified`)
                    .then((data) => {
                        if (data != day) {
                            idTimeOut03 = setTimeout(() => {
                                this.openModal(itemCalendar)
                            }, 2000)
                            Storage.instance.store('calendarNotified', day)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
    }

    //ModalAmbientalImpact
    openModalAmbientalImpact = () => {
        this.setState({
            modalModalAmbientalImpact: true
        })
    }

    closeModalAmbientalImpact = () => {
        this.setState({
            modalModalAmbientalImpact: false
        })
    }

    //Modal your shopping
    openModalViewShopping = () => {
        this.setState({
            modalViewShopping: true
        })
    }

    closeModalViewShopping = () => {
        this.setState({
            modalViewShopping: false
        })
    }

    //Modal view class
    openModalViewClass = () => {
        this.setState({
            modalViewClass: true
        })
    }

    closeModalViewClass = () => {
        this.setState({
            modalViewClass: false
        })
    }

    closeModalIsBirthday = () => {
        this.setState({
            statusIsBirthday: false
        })
    }

    //Modal validacion
    openModal = (itemCalendar) => {
        this.setState({
            statusModal: true,
            itemCalendar
        })
    }

    closeModal = () => {
        this.setState({
            statusModal: false
        })
    }

    //Modal fun
    openModalFun = (textModalFun) => {
        this.setState({
            statusModalFun: true,
            textModalFun
        })
    }

    closeModalFun = () => {
        this.setState({
            statusModalFun: false
        })
    }

    handleConfig = () => {
        this.props.navigation.navigate('ConfigurationScreen')
    }

    handleCourse = (item, index) => {
        this.props.navigation.navigate('CourseStack', { screen: 'CourseLessons', params: { item, indexOne: index } })
    }

    handleChallenge = (item, index) => {
        this.props.navigation.navigate('ChallengeStack', { screen: 'ChallengeCategory', params: { item, indexOne: index } })
    }

    handleOpenViewFinish = () => {
        this.openModalViewClass()
    }

    handleOpenYourShopping = () => {
        this.openModalViewShopping()
    }

    componentWillUnmount = () => {
        clearInterval()
        clearTimeout()
    }

    getItemToRenderAmbientalImpact = (array) => {
        let ambientalImpact = []
        array.map((item, indexArray) => {
            item.challenge.map((itemChallenge) => {
                if (itemChallenge.isCompleted == true) {
                    let element = {
                        _id: itemChallenge._id,
                        categoryId: array[indexArray].categoryId,
                        ambientalImpact: itemChallenge.ambientalImpact
                    }
                    ambientalImpact.push(element)
                }
            })
        })
        return ambientalImpact
    }

    componentWillUnmount = () => {
        clearTimeout(idTimeOut01)
        clearTimeout(idTimeOut02)
        clearTimeout(idTimeOut03)
    }

    render() {


        const { statusModal, itemCalendar, statusIsBirthday, textModalFun, statusModalFun, modalViewClass, modalViewShopping, modalModalAmbientalImpact } = this.state
        const { content, yourShopping, user } = this.props
        const { names, coint, age, experience } = user

        const dataExperience = getLevel(experience)
        let count
        let itemToRenderClass

        let itemYourShopping = this.getYourShopping(yourShopping)
        let countYourShopping = this.getCountYourShopping(yourShopping)

        let itemToRenderAmbientalImpact

        if (age < 15) {
            count = this.countClassTerminated(content)
            itemToRenderClass = this.getItemToRenderClass(content)

        } else {
            itemToRenderAmbientalImpact = this.getItemToRenderAmbientalImpact(content)
            count = itemToRenderAmbientalImpact.length
        }

        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <View style={styles.header}>
                        {/* FunFactsModal */}
                        <FunFactsModal
                            text={textModalFun}
                            textBtn='Interesante'
                            modalVisible={statusModalFun}
                            setModalVisible={this.closeModalFun}
                        />
                        {/* CalendarModal */}
                        <CalendarModal
                            modalVisible={statusModal}
                            setModalVisible={this.closeModal}
                            itemCalendar={itemCalendar}
                        />
                        {/* IsBirthdayModal */}
                        <IsBirthdayModal
                            modalVisible={statusIsBirthday}
                            setModalVisible={this.closeModalIsBirthday}
                        />
                        <ViewYourShoppingModal
                            modalVisible={modalViewShopping}
                            setModalVisible={this.closeModalViewShopping}
                            itemToRenderClass={itemYourShopping}
                        />
                        {(age < 15) ?
                            <>
                                <ViewClassModal
                                    modalVisible={modalViewClass}
                                    setModalVisible={this.closeModalViewClass}
                                    itemToRenderClass={itemToRenderClass}
                                />
                            </>
                            :
                            <>
                                <ViewAmbientalImpact
                                    modalVisible={modalModalAmbientalImpact}
                                    setModalVisible={this.closeModalAmbientalImpact}
                                    itemToRenderClass={itemToRenderAmbientalImpact}
                                />
                            </>
                        }
                        <View style={styles.sectionPrimary}>
                            <View style={styles.containerUser}>
                                <View style={styles.user}>
                                    <View style={styles.containerAvatar}>
                                        <Image
                                            style={styles.avatar}
                                            source={Avatar} />
                                    </View>
                                    <View style={styles.containerInfo}>
                                        <MyAppText fontSize={14} color={'white'}>{names}</MyAppText>
                                        <MyHeaderText fontSize={14} color={'white'}>{`Nivel ${dataExperience.level}`}</MyHeaderText>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.containeConf}>
                                <View style={styles.containerIconConfig}>
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        style={styles.btnConfig}
                                        onPress={this.handleConfig}>
                                        <Image
                                            style={styles.imgWidth}
                                            source={iconAbout}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerCoins}>
                                    <MyHeaderText fontSize={14} color={'white'}>{`${coint} `}</MyHeaderText>
                                    <Image
                                        style={styles.imgWidth}
                                        source={iconCoins}
                                    />
                                </View>
                            </View>
                        </View>
                        <ProgressBar actual={dataExperience.actual} final={dataExperience.meta} />
                    </View>
                    <View style={styles.statistics}>
                        {(age < 15)
                            ?
                            <Preview classFinal={count}
                                yourShopping={countYourShopping}
                                onPressOne={() => { this.handleOpenViewFinish() }}
                                onPressTwo={() => { this.handleOpenYourShopping() }}
                            />
                            :
                            <Statistics count={count}
                                yourShopping={countYourShopping}
                                onPressOne={() => { this.openModalAmbientalImpact() }}
                                onPressTwo={() => { this.handleOpenYourShopping() }}

                            />
                        }
                    </View>
                    <View
                        style={styles.containerLogo}
                    >
                        <ImageLogo />
                    </View>
                    <View style={styles.containerFlatlist}>
                        {(age < 15)
                            ?
                            <FlatList
                                horizontal={true}
                                data={content}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }) =>
                                    <CarouselItemCourse
                                        item={item}
                                        onPress={() => { this.handleCourse(item, index) }}
                                    />}
                                contentContainerStyle={{ alignItems: 'center' }}
                            />
                            :
                            <FlatList
                                horizontal={true}
                                data={content}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }) =>
                                    <CarouselItemChallenge
                                        item={item}
                                        onPress={() => { this.handleChallenge(item, index) }}
                                    />}
                                contentContainerStyle={{ alignItems: 'center' }}
                            />
                        }
                    </View>
                </BackGroundGradient>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: (Platform.OS === 'ios') ? '16%' : '20%',
        backgroundColor: Color.Gray,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    sectionPrimary: {
        flexDirection: 'row',
    },
    user: {
        width: '90%',
        height: '80%',
        flexDirection: 'row',
    },
    containerUser: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        flexDirection: 'row',
        height: 80,
        backgroundColor: Color.Gray,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Color.Green,

    },
    containeConf: {
        width: '20%',
        margin: 10,
        marginLeft: 0

    },
    containerAvatar: {
        flex: 2,
    },
    containerInfo: {
        flex: 4,
        justifyContent: 'center'
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 100
    },
    containerIconConfig: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    btnConfig: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        alignSelf: 'flex-end'
    },
    containerCoins: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    imgWidth: {
        width: 30,
        height: 30
    },
    containerLogo: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%'
    },
    statistics: {
        height: '20%',
        marginTop: (height > 700) ? '5%' : '2%'
    },
    containerFlatlist: {
        width: '100%',
        height: (Platform.OS === 'ios') ? '29%' : '25%',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        paddingBottom: (Platform.OS === 'ios') ? 20 : 0,
    },
})

const mapStateToProps = state => {
    return {
        user: state.user,
        calendar: state.calendar,
        configuration: state.configuration,
        content: state.content,
        news: state.news,
        storeItem: state.storeItem,
        experience: state.experience,
        yourShopping: state.yourShopping,
        funFacts: state.funFacts,
        yourShopping: state.yourShopping
    }
}

export default connect(mapStateToProps, null)(HomeScreen)
