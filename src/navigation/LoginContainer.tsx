import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login&SignIn/LoginScreen";
import SignInScreen from "../screens/Login&SignIn/SignInScreen";


const LoginStack = createNativeStackNavigator();

function LoginContainer() {
    return (
        <>
            <LoginStack.Navigator screenOptions={{headerShown: true}}>
                <LoginStack.Screen name="Login" component={LoginScreen}/>
                <LoginStack.Screen name="SignIn" component={SignInScreen}/>
            </LoginStack.Navigator>
        </>
    );
}

export default LoginContainer;