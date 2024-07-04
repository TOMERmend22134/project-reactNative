import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core';
import Register from '../componens/Register';
import Login from '../componens/Login';
import RegistrationOfHoursByClient from '../componens/RegistrationOfHoursByClient';
import ViewingClientDocuments from '../componens/ViewingClientDocuments';

export default function HomePage() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.text}>Register Page</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.text}>Login Page</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('RegistrationOfHoursByClient')}>
                    <Text style={styles.text}>RegistrationOfHoursByClient Page</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ViewingClientDocuments')}>
                    <Text style={styles.text}>ViewingClientDocuments Page</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        margin: 10,
    },
});

