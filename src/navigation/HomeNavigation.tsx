import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import uploadScreen from "../screens/UploadScreen";

const HomeStack = createNativeStackNavigator();

function HomeNavigation({}) {
    return (
        <>
            <HomeStack.Navigator>
                <HomeStack.Screen name="homescreen" component={HomeScreen}/>
                <HomeStack.Screen name="Upload" component={uploadScreen}/>
            </HomeStack.Navigator>
        </>
    );
}

export default HomeNavigation;