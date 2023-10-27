// Doc for react nav  https://reactnavigation.org/docs/getting-started/
// Tut: https://www.youtube.com/watch?v=AnjyzruZ36E

import * as React from 'react';
import {Text, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";

//Screens
import HomeScreen from "../screens/HomeScreen";
import DiffScreen from "../screens/DiffScreen";

//Screens name
const homeName = "Home";
const diffName = "Diff"

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === diffName) {
                            iconName = focused ? 'diff' : 'diff-outline'
                        }

                        //TODO return icon not text
                        return <Text>iconName</Text>;
                    }
                })}>
                <Tab.Screen name={homeName} component={HomeScreen}></Tab.Screen>
                <Tab.Screen name={diffName} component={DiffScreen}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}