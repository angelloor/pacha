import React from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import BackGroundGradient from '../components/BackGroundGradient'
import YourChallengeItem from '../components/Challenge/YourChallengeItem'
import MyAppText from '../components/MyAppText'
import ScreenHeader from '../components/ScreenHeader'
import Color from '../resources/Color'

class ChallengeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        change: false
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            let chag = !this.state.change
            this.setState({ change: chag })
        });
    }

    getYourChallenge = (array) => {
        let challengeToRender = []
        array.map((item, indexArray) => {
            item.challenge.map((itemChallenge) => {
                if (itemChallenge.isCompleted == true) {
                    let element = {
                        categoryId: array[indexArray].categoryId,
                        _id: itemChallenge._id,
                        name: itemChallenge.name,
                        reward: itemChallenge.reward,
                        shortDescription: itemChallenge.shortDescription
                    }
                    challengeToRender.push(element)
                }
            })
        })
        return challengeToRender
    }

    render() {
        const { change } = this.state
        const yourChallenge = this.getYourChallenge(this.props.content)
        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <ScreenHeader title='Tus retos' />
                    {
                        (yourChallenge.length == 0)
                            ?
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
                                <MyAppText fontSize={16} color={'white'}>Aún no has terminado ningún reto</MyAppText>
                            </LinearGradient>
                            :
                            <FlatList
                                data={yourChallenge}
                                keyExtractor={(item) => (item._id).toString()}
                                renderItem={({ item }) =>
                                    <YourChallengeItem
                                        item={item}
                                        change={change}
                                    />
                                }
                                contentContainerStyle={{ paddingBottom: 110 }}
                            />
                    }
                </BackGroundGradient>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {
        content: state.content,
    }
}

export default connect(mapStateToProps, null)(ChallengeScreen)