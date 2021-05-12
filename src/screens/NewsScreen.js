import React, { Component } from 'react'
import { FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import BackGroundGradient from '../components/BackGroundGradient'
import MyAppText from '../components/MyAppText'
import NewsItem from '../components/News/NewsItem'
import ScreenHeader from '../components/ScreenHeader'
import Color from '../resources/Color'

class NewsScreen extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        news: this.props.news
    }

    navigateNew = (item) => {
        this.props.navigation.navigate('NewsDetails', { item })
    }

    render() {
        const { news } = this.state
        let countNews = news.length
        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <ScreenHeader title='Noticias' />
                    {(countNews == 0)
                        ?
                        <LinearGradient
                            colors={[Color.funFacts.start, Color.funFacts.end]}
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
                            <MyAppText fontSize={16} color={'white'}>Aún no hay noticias</MyAppText>
                        </LinearGradient>
                        :

                        <FlatList
                            data={news}
                            keyExtractor={(item) => (item._id).toString()}
                            renderItem={({ item }) =>
                                <NewsItem
                                    item={item}
                                    onPress={() => this.navigateNew(item)} />}
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
        news: state.news,
    }
}

export default connect(mapStateToProps, null)(NewsScreen)