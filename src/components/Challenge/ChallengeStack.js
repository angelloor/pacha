import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ChallengeScreen from '../../screens/ChallengeScreen'
import Challenge from './Challenge'
import ChallengeCategory from './ChallengeCategory'

const Stack = createStackNavigator()

const ChallengeStack = (props) => {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="ChallengeScreen">
            <Stack.Screen name='ChallengeScreen' component={ChallengeScreen} />
            <Stack.Screen name='ChallengeCategory' component={ChallengeCategory} />
            <Stack.Screen name='Challenge' component={Challenge} />
        </Stack.Navigator>
    )
}

export default ChallengeStack