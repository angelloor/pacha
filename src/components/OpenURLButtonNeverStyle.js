import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Storage from '../libs/Storage';

const OpenURLButtonNeverStyle = ({ url, children, openParentalGate, user, handlePress }) => {
    const platformOs = Platform.OS
    const ageUser = user.age

    return <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={(platformOs == 'ios' && ageUser < 15) ? () => { Storage.instance.store(`url`, url); openParentalGate() } : () => { Storage.instance.store(`url`, url); handlePress() }}>
        {children}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(OpenURLButtonNeverStyle)