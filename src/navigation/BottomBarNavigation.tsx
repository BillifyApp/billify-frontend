import {Image, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";

//Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import GroupScreen from "../screens/GroupScreen";
import SearchScreen from "../screens/SearchScreen";
import {groupName, homeName, notificationName, profileName, searchName} from "../stores/route_names";
import HomeNavigation from "./HomeNavigation";

//Icons
export const iconHome_outline = require('../assets/bottom-bar-nav/home.png');
export const iconProfile_outline = require('../assets/bottom-bar-nav/user.png');
export const iconNotif_outline = require('../assets/bottom-bar-nav/notificationon.png');
export const iconGroup_outline = require('../assets/bottom-bar-nav/users.png');
export const iconSearch_outline = require('../assets/bottom-bar-nav/search.png');


const Tab = createBottomTabNavigator();

export default function BottomBarNavigation() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                    headerShown: false,
                    gestureEnabled: true, // If you want to swipe back like iOS on Android
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name
                        if (rn === searchName) {
                            iconName = focused ? 'search' : iconSearch_outline
                        } else if (rn === groupName) {
                            iconName = focused ? 'group' : iconGroup_outline
                        } else if (rn === homeName) {
                            iconName = focused ? 'home' : iconHome_outline
                        } else if (rn === notificationName) {
                            iconName = focused ? 'notification' : iconNotif_outline
                        } else if (rn === profileName) {
                            iconName = focused ? 'profile' : iconProfile_outline
                        }

                        //TODO return icon not text
                        return (
                            <>
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Image style={{width: '100%', height: '100%'}}
                                           source={iconName}/>
                                </View>
                            </>
                        )
                    }
                }
            )}>
            <Tab.Screen name={searchName} component={SearchScreen}></Tab.Screen>
            <Tab.Screen name={groupName} component={GroupScreen}></Tab.Screen>
            <Tab.Screen name={homeName} component={HomeNavigation}></Tab.Screen>
            <Tab.Screen name={notificationName} component={NotificationScreen}></Tab.Screen>
            <Tab.Screen name={profileName} component={ProfileScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}