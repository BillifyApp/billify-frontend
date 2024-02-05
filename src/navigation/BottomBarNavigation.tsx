import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

//Screens
import NotificationScreen from "../screens/NotificationScreen";
import SearchScreen from "../screens/SearchScreen";
import {
    groupName,
    homeName,
    homeNavName,
    notificationName,
    profileNavName,
    searchName,
} from "../stores/route_names";
import HomeNavigation from "./HomeNavigation";
import GroupNavigation from "./GroupNavigation";
import { Icon } from "../styles/fonts";
import { t } from "i18next";
import ProfileNavigation from "./ProfileNavigation";

const Tab = createBottomTabNavigator();

export default function BottomBarNavigation() {
    return (
        <Tab.Navigator
            initialRouteName={homeNavName}
            
            screenOptions={({ route }) => ({
                headerShown: false,
                gestureEnabled: true, // If you want to swipe back like iOS on Android
                tabBarActiveTintColor:"#24AFFE",
                tabBarInactiveTintColor:"#888888",
                contentStyle: {backgroundColor: "#fff"},
            })}
        >
            <Tab.Screen
                name={searchName}
                component={SearchScreen}
                options={{
                    title:t("common.search"),
                    unmountOnBlur: true,
                    tabBarIcon: ({ size, focused, color }) => {
                        return <Icon name="search" size={size} color={color}/>;
                    },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name={groupName}
                component={GroupNavigation}
                options={{
                    title:t("common.groups.many"),
                    unmountOnBlur: true,
                    tabBarIcon: ({ size, focused, color }) => {
                        return <Icon name="groups" size={size} color={color}/>;
                    },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name={homeNavName}
                component={HomeNavigation}
                options={{
                    title: t("common.home"),
                    unmountOnBlur: true,
                    tabBarIcon: ({ size, focused, color }) => {
                        return <Icon name="home" size={size} color={color}/>;
                    },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name={notificationName}
                component={NotificationScreen}
                options={{
                    title: t("common.notifications"),
                    unmountOnBlur: true,
                    tabBarIcon: ({ size, focused, color }) => {
                        return <Icon name="notifications" size={size} color={color}/>;
                    },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name={profileNavName}
                component={ProfileNavigation}
                options={{
                    title: t("common.profile"),
                    unmountOnBlur: true,
                    tabBarIcon: ({ size, focused, color }) => {
                        return <Icon name="profile" size={size} color={color}/>;
                    },
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}
