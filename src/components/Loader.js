import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import Color from '../resources/Color'

const Loader = ({ status }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={status}
        >
            <View
                style={styles.centeredView}>
                <ActivityIndicator animating={status} size="large" color={Color.Green} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
})

export default Loader