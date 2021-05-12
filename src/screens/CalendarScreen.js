import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import BackGroundGradient from '../components/BackGroundGradient'
import CalendarItem from '../components/Calendar/CalendarItem'
import ScreenHeader from '../components/ScreenHeader'
import { SafeAreaView } from 'react-native-safe-area-context'

class CalendarScreen extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        dates: this.props.calendar
    }

    render() {
        const { dates } = this.state
        return (
            <SafeAreaView>
            <BackGroundGradient>
                <ScreenHeader title='Calendario' />
                <FlatList
                    data={dates}
                    keyExtractor={(item) => (item._id).toString()}
                    renderItem={({ item }) => <CalendarItem item={item} />}
                    contentContainerStyle={{ paddingBottom: 110 }}
                />
            </BackGroundGradient>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {
        calendar: state.calendar,
    }
}

export default connect(mapStateToProps, null)(CalendarScreen)