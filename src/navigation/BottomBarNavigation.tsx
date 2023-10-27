import {Text} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";

//Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import GroupScreen from "../screens/GroupScreen";
import SearchScreen from "../screens/SearchScreen";


//Screens name
const searchName = "Search"
const groupName = "Group"
const homeName = "Home";
const notificationName = "Notification"
const profileName = "Profile"

const Tab = createBottomTabNavigator();

export default function BottomBarNavigation() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name
                    if (rn === searchName) {
                        iconName = focused ? 'search' : 'search-outline'
                    } else if (rn === groupName) {
                        iconName = focused ? 'group' : 'group-outline'
                    } else if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === notificationName) {
                        iconName = focused ? 'notification' : 'notification-outline'
                    } else if (rn === profileName) {
                        iconName = focused ? 'profile' : 'profile-outline'
                    }

                    //TODO return icon not text
                    return <Text>iconName</Text>;
                }
            })}>
            <Tab.Screen name={searchName} component={SearchScreen}></Tab.Screen>
            <Tab.Screen name={groupName} component={GroupScreen}></Tab.Screen>
            <Tab.Screen name={homeName} component={HomeScreen}></Tab.Screen>
            <Tab.Screen name={notificationName} component={NotificationScreen}></Tab.Screen>
            <Tab.Screen name={profileName} component={ProfileScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}