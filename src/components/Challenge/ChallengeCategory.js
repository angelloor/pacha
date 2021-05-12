import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackGroundGradient from '../BackGroundGradient'
import ScreenHeaderGradient from '../ScreenHeaderGradient'
import ChallengueItem from './ChallengeItem'

class ChallengeCategory extends React.Component {
    constructor(props) {
        super(props)
    }

    navigateChallenge = (item, categoryId, indexOne, index) => {
        this.props.navigation.navigate('Challenge', { item, categoryId, indexOne, indexTwo: index })
    }

    render() {
        const { route } = this.props

        const { item, indexOne } = route.params
        const { challenge, categoryId } = item
        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <ScreenHeaderGradient title={item.name} categoryId={categoryId} />
                    <FlatList
                        data={challenge}
                        keyExtractor={(item) => (item._id).toString()}
                        renderItem={({ item, index }) =>
                            <ChallengueItem
                                categoryId={categoryId}
                                item={item}
                                onPress={() => this.navigateChallenge(item, categoryId, indexOne, index)}
                            />
                        }
                        contentContainerStyle={{ paddingBottom: 110 }}
                    />
                </BackGroundGradient>
            </SafeAreaView>
        )
    }
}

export default ChallengeCategory