import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login&SignIn/LoginScreen";
import SignInScreen from "../screens/Login&SignIn/SignInScreen";
import WelcomeScreen from '../screens/Login&SignIn/WelcomeScreen';


const LoginStack = createNativeStackNavigator();

function LoginContainer() {
    return (
        <>
            <LoginStack.Navigator screenOptions={{headerShown: false}}>
                <LoginStack.Screen name="Welcome" component={WelcomeScreen}/>
                <LoginStack.Screen name="Login" component={LoginScreen}/>
                <LoginStack.Screen name="SignIn" component={SignInScreen}/>
            </LoginStack.Navigator>
        </>
    );
}

export default LoginContainer;