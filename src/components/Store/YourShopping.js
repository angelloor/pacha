import React from 'react'
import { FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import Color from '../../resources/Color'
import BackGroundGradient from '../BackGroundGradient'
import MyAppText from '../MyAppText'
import ScreenHeader from '../ScreenHeader'
import YourShoppingItem from './YourShoppingItem'

class YourShopping extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { yourShopping } = this.props

        let countYourShopping = yourShopping.length
        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <ScreenHeader title='Tus compras' />
                    {(countYourShopping == 0)
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
                            <MyAppText fontSize={16} color={'white'}>Aún no tienes compras</MyAppText>
                        </LinearGradient>
                        :
                        <FlatList
                            data={yourShopping}
                            keyExtractor={(item) => (item._id).toString()}
                            renderItem={({ item }) => <YourShoppingItem item={item} />}
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
        yourShopping: state.yourShopping
    }
}

export default connect(mapStateToProps, null)(YourShopping)
