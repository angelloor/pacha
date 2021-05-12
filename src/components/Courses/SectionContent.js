import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import MyAppText from '../MyAppText'

const width = (Dimensions.get('window').width) / 2.5

const SectionContent = props => {
    const { url } = props
    const item = props.item
    const index = props.index

    return (
        <View style={styles.containerText}>
            { index == 1 ?
                <View style={styles.containerEspecial}>
                    <View style={{ width: '50%', height: width, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Image style={{ width: width, height: width, borderRadius: 10 }} source={{ uri: url }} />
                    </View>
                    <MyAppText fontSize={15} color={'white'} style={{ textAlign: 'justify', width: '50%' }}>{item}</MyAppText>
                </View>
                :
                <MyAppText fontSize={15} color={'white'} style={{ textAlign: 'justify' }}>{item}</MyAppText>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerText: {
        paddingBottom: 20,
        flexDirection: 'column'
    },
    containerEspecial: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default SectionContent