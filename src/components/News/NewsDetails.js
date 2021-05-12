import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Http from '../../libs/http'
import Color from '../../resources/Color'
import BackGroundGradient from '../BackGroundGradient'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'
import OpenURLButtonNeverStyle from '../OpenURLButtonNeverStyle'
import ScreenHeader from '../ScreenHeader'
import SimpleModal from '../SimpleModal'

const NewsDetails = ({ route }) => {
    const { nameButton, linkButton, imageUrl, title, description, datePublished } = route.params.item
    const url = `${Http.instance.server}${imageUrl}`

    //modal Link 
    const [textModal, setTextModal] = useState('')
    const [statusModal, setStatusModal] = useState(false)

    const openModal = (textModal) => {
        setStatusModal(true)
        setTextModal(textModal)
    }

    const closeModal = () => {
        setStatusModal(false)
        setTextModal('')
    }

    return (
        <SafeAreaView>
            <BackGroundGradient>
                <ScreenHeader title='Noticias' />
                <ScrollView>
                    <View style={styles.container}>
                        <SimpleModal
                            text={textModal}
                            textBtn='Ok'
                            modalVisible={statusModal}
                            setModalVisible={closeModal}
                        />
                        <View style={styles.containerTitle}>
                            <MyHeaderText fontSize={16} color={'white'} style={styles.titleTxt}>{title}</MyHeaderText>
                        </View>
                        <View style={styles.containerImg}>
                            <Image
                                style={styles.ImgNews}
                                source={{
                                    uri: url,
                                }}
                            />
                        </View>
                        <View style={styles.containerDescription}>
                            <MyAppText fontSize={14} color={'white'} style={styles.description}>{description}</MyAppText>
                        </View>
                        <View style={styles.containerDatePublished}>
                            <MyAppText fontSize={14} color={'white'} style={styles.datePublished}>{datePublished}</MyAppText>
                        </View>
                        {(nameButton) ?
                            <OpenURLButtonNeverStyle url={linkButton} openModal={openModal}>
                                <View style={styles.containerButton}>
                                    <MyAppText fontSize={14} color={'white'}>{nameButton}</MyAppText>
                                </View>
                            </OpenURLButtonNeverStyle>
                            :
                            <></>
                        }
                    </View>
                </ScrollView>
            </BackGroundGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: Color.Gray,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingBottom: 20,
        marginTop: 20,
        marginBottom: 100,
    },
    containerTitle: {
        width: '90%',
    },
    titleTxt: {
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    containerImg: {
        width: '90%',
        alignItems: 'center'
    },
    ImgNews: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    containerDescription: {
        width: '90%',
    },
    description: {
        textAlign: 'justify',
        paddingBottom: 10,
        paddingTop: 10
    },
    containerDatePublished: {
        width: '90%',
    },
    datePublished: {
        textAlign: 'right',
        paddingBottom: 10,
        paddingTop: 10
    },
    containerButton: {
        backgroundColor: Color.Green,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        marginTop: 10
    },
})

export default NewsDetails