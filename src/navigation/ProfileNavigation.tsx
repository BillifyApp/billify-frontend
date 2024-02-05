import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {profileScreen} from "../stores/route_names";
import ProfileScreen from "../screens/ProfileScreen";

const ProfileStack = createNativeStackNavigator();

function ProfileNavigation() {
    return (
        <>
            <ProfileStack.Navigator initialRouteName={profileScreen} screenOptions={{headerShown: false}}>
                <ProfileStack.Screen name={profileScreen} component={ProfileScreen}/>
            </ProfileStack.Navigator>
        </>
    );
}

export default ProfileNavigation;
