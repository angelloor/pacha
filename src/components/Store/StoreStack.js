import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import StoreScreen from '../../screens/StoreScreen'
import YourShopping from './YourShopping'

const Stack = createStackNavigator()

const StoreStack = (props) => {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="Store">
            <Stack.Screen name='Store' component={StoreScreen} />
            <Stack.Screen name='YourShopping' component={YourShopping} />
        </Stack.Navigator>
    )
}

export default StoreStack