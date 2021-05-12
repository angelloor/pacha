import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import NewsScreen from '../../screens/NewsScreen'
import NewsDetails from './NewsDetails'

let CollapseTransition = (index, position) => {
    const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 1]
    })
    const scaleY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 1]
    })
    return {
        opacity,
        transform: [{ scaleY }]
    }
}

const Stack = createStackNavigator()

const NewsStack = (props) => {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="NewsScreen">
            <Stack.Screen name='NewsScreen' component={NewsScreen} />
            <Stack.Screen
                name='NewsDetails'
                component={NewsDetails}
            // options={{
            //     transitionSpec: {
            //         open: CollapseTransition,
            //         close: CollapseTransition,
            //     },
            // }}
            />
        </Stack.Navigator>
    )
}

export default NewsStack