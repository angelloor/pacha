import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ConfigurationScreen from '../screens/ConfigurationScreen'
import Login from '../screens/LoginScreen'
import Presentation from '../screens/Presentation'
import Register from '../screens/RegisterScreen'
import RegisterSecondStepScreen from '../screens/RegisterSecondStepScreen'
import ChallengeStack from './Challenge/ChallengeStack'
import CourseStack from './Courses/CourseStack'
import HomeStack from './Home/HomeStack'

const Stack = createStackNavigator()

const InitialStack = (props) => {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="Presentation" mode="card" animationEnabled="true" animationTypeForReplace="pop">
            <Stack.Screen name='Inicio' component={Presentation} options={{ title: '', }} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='ConfigurationScreen' component={ConfigurationScreen} />
            <Stack.Screen name='CourseStack' component={CourseStack} />
            <Stack.Screen name='ChallengeStack' component={ChallengeStack} />
            <Stack.Screen name='RegisterSecondStep' component={RegisterSecondStepScreen} />
            <Stack.Screen name='HomeStack' component={HomeStack} />
        </Stack.Navigator>
    )
}

export default InitialStack