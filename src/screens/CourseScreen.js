import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import BackGroundGradient from '../components/BackGroundGradient'
import CourseItem from '../components/Courses/CourseItem'
import ScreenHeader from '../components/ScreenHeader'

class CourseScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        courses: this.props.content
    }

    navigateCourseLesson = (item, index) => {
        this.props.navigation.navigate('CourseLessons', { item, indexOne: index })
    }

    render() {

        const { courses } = this.state

        return (
            <SafeAreaView>
                <BackGroundGradient>
                    <ScreenHeader title='Cursos' />
                    <FlatList
                        data={courses}
                        keyExtractor={(item) => (item._id).toString()}
                        renderItem={({ item, index }) =>
                            <CourseItem
                                item={item}
                                onPress={() => this.navigateCourseLesson(item, index)}
                            />
                        }
                        contentContainerStyle={{ paddingBottom: 110 }}
                    />
                </BackGroundGradient>
            </SafeAreaView>

        )
    }
}

const mapStateToProps = state => {
    return {
        content: state.content,
    }
}

export default connect(mapStateToProps, null)(CourseScreen)