import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import CalendarIcon from '../../assets/static/calendar.png'
import ChallengeIcon from '../../assets/static/challenges.png'
import CoursesIcon from '../../assets/static/courses.png'
import HomeIcon from '../../assets/static/home.png'
import NewsIcon from '../../assets/static/news.png'
import StoreIcon from '../../assets/static/store.png'
import Color from '../../resources/Color'
import CalendarScreen from '../../screens/CalendarScreen'
import HomeScreen from '../../screens/HomeScreen'
import ChallengeStack from '../Challenge/ChallengeStack'
import CourseStack from '../Courses/CourseStack'
import NewsStack from '../News/NewsStack'
import StoreStack from '../Store/StoreStack'

const Tab = createBottomTabNavigator()

const HomeStack = (props) => {

    return (
        <Tab.Navigator
            backBehavior='initialRoute'
            initialRouteName='Home'
            tabBarOptions={{
                activeTintColor: Color.Green,
                inactiveTintColor: Color.White,
                style: {
                    height: 70,
                    backgroundColor: Color.Gray,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                labelStyle: {
                    color: Color.White,
                    fontFamily: 'Nunito-Bold',
                }
            }}
        >
            <Tab.Screen
                name="Store"
                component={StoreStack}
                options={{
                    title: 'Ecotienda',
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            style={{ tintColor: color, width: size, height: size }}
                            source={StoreIcon}
                        />
                    ),
                }}
            />
            {(props.user.age < 15)
                ?
                <Tab.Screen
                    name="Courses"
                    component={CourseStack}
                    options={{
                        title: 'Cursos',
                        tabBarIcon: ({ size, color }) => (
                            <Image
                                style={{ tintColor: color, width: size, height: size }}
                                source={CoursesIcon}
                            />
                        )
                    }}
                />
                :
                <Tab.Screen
                    name="Challenge"
                    component={ChallengeStack}
                    options={{
                        title: 'Retos',
                        tabBarIcon: ({ size, color }) => (
                            <Image
                                style={{ tintColor: color, width: size, height: size }}
                                source={ChallengeIcon}
                            />
                        )
                    }}
                />
            }
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            style={{ tintColor: color, width: size * 1.3, height: size * 1.3 }}
                            source={HomeIcon}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    title: 'Calendario',
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            style={{ tintColor: color, width: size, height: size }}
                            source={CalendarIcon}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="News"
                component={NewsStack}
                options={{
                    title: 'Noticias',
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            style={{ tintColor: color, width: size, height: size }}
                            source={NewsIcon}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(HomeStack)