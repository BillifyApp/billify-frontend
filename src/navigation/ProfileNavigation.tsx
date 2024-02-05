import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {profileScreen, splitAmountScreen} from "../stores/route_names";
import ProfileScreen from "../screens/ProfileScreen";
import SplitAmountScreen from "../screens/Groups/SplitAmountScreen";

const ProfileStack = createNativeStackNavigator();

function ProfileNavigation() {
    return (
        <>
            <ProfileStack.Navigator initialRouteName={profileScreen}>
                <ProfileStack.Screen name={profileScreen} component={ProfileScreen}/>
                <ProfileStack.Screen name={splitAmountScreen} component={SplitAmountScreen}/>
            </ProfileStack.Navigator>
        </>
    );
}

export default ProfileNavigation;
