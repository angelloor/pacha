import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import CourseScreen from '../../screens/CourseScreen'
import Class from './Class'
import CourseLessons from './CourseLessons'

const Stack = createStackNavigator()

const CourseStack = (props) => {
    return (
        <Stack.Navigator headerMode='none' initialRouteName="Course">
            <Stack.Screen name='Course' component={CourseScreen} />
            <Stack.Screen name='CourseLessons' component={CourseLessons} />
            <Stack.Screen name='Class' component={Class} />
        </Stack.Navigator>
    )
}

export default CourseStack