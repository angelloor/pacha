import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Storage from '../libs/Storage';
import Color from '../resources/Color';
import MyAppText from './MyAppText';

const OpenURLButton = ({ url, children, openParentalGate, user, handlePress }) => {
    const platformOs = Platform.OS
    const ageUser = user.age

    return <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={(platformOs == 'ios' && ageUser < 15) ? () => { Storage.instance.store(`url`, url); openParentalGate() } : () => { Storage.instance.store(`url`, url); handlePress() }}>
        <MyAppText fontSize={15} color={'black'}>{children}</MyAppText>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Color.White,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    }
})

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(OpenURLButton)