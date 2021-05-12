import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackGroundGradient from '../BackGroundGradient'
import ScreenHeaderGradient from '../ScreenHeaderGradient'
import LessonItem from './LessonItem'

const CourseLessons = ({ route, navigation }) => {
    const { item, indexOne } = route.params
    const { topic, categoryId } = item

    const navigateClass = (item, categoryId, indexOne, index) => {
        navigation.navigate('Class', { item, categoryId, indexOne, indexTwo: index })
    }

    return (
        <SafeAreaView>
            <BackGroundGradient>
                <ScreenHeaderGradient title={item.name} categoryId={categoryId} />
                <FlatList
                    data={topic}
                    keyExtractor={(item) => (item._id).toString()}
                    renderItem={({ item, index }) =>
                        <LessonItem
                            categoryId={categoryId}
                            item={item}
                            onPress={() => navigateClass(item, categoryId, indexOne, index)}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: 110 }}
                />
            </BackGroundGradient>
        </SafeAreaView>
    )
}

export default CourseLessons