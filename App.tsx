import {Button, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import MainContainer from "./src/containers/MainContainer";
import {AuthProvider} from "./src/context/AuthContext";


export default function App() {
    return (
        <AuthProvider>
            <MainContainer/>
        </AuthProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
