import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import coint from '../../assets/static/coint.png'
import experience from '../../assets/static/experience.png'
import Http from '../../libs/http'
import MyAppText from '../MyAppText'
import MyHeaderText from '../MyHeaderText'

const ChallengeItem = ({ categoryId, item, onPress }) => {
    const { name, shortDescription, reward } = item
    const start = categoryId.colorPosition[1]
    const end = categoryId.colorPosition[0]
    const url = `${Http.instance.server}${categoryId.imageUrl}`

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}>
            <LinearGradient
                colors={[start, end]}
                style={styles.container}>
                <View style={styles.containerTitle}>
                    <View style={styles.containerImg}>
                        <Image
                            style={styles.img}
                            source={{ uri: url }}
                        />
                    </View>
                    <View style={styles.containerDetails}>
                        <MyHeaderText fontSize={18} color={'white'} style={{ marginBottom: 3 }}>{name}</MyHeaderText>
                    </View>
                </View>
                <View style={styles.containerDescription}>
                    <MyAppText fontSize={14} color={'white'} style={styles.descriptionText}>{shortDescription}</MyAppText>
                    <View style={styles.containerReward}>
                        <MyHeaderText fontSize={16} color={'white'}>Recompensa</MyHeaderText>
                        <View style={styles.containerRewardItems}>
                            <View style={styles.containerItemReward}>
                                <Image
                                    style={styles.imgReaward}
                                    source={experience}
                                />
                                <MyAppText fontSize={14} color={'white'}>{reward.experiencie}</MyAppText>
                            </View>
                            <View style={[styles.containerItemReward, { marginLeft: 10 }]}>
                                <Image
                                    style={styles.imgReaward}
                                    source={coint}
                                />
                                <MyAppText fontSize={14} color={'white'}>{reward.coint}</MyAppText>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        borderRadius: 10,
        flexDirection: 'column',
        margin: '2.5%',
        marginBottom: 0,
        padding: '5%'
    },
    containerTitle: {
        flexDirection: 'row'
    },
    containerImg: {
        width: '20%',
        paddingBottom: '2.5%',
    },
    img: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    containerDetails: {
        width: '80%',
        alignSelf: 'center'
    },
    containerDescription: {
        width: '100%',
        flexDirection: 'row'
    },
    descriptionText: {
        width: '50%',
        textAlign: 'justify',
        padding: 5,
        paddingRight: 10
    },

    //containerRewardItems
    containerReward: {
        width: '50%',
        flexDirection: 'column',
        padding: 5,
        paddingLeft: 10
    },
    containerRewardItems: {
        flexDirection: 'row',
        marginTop: 5
    },
    containerItemReward: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgReaward: {
        width: 30,
        height: 30,
    },
})

export default ChallengeItem