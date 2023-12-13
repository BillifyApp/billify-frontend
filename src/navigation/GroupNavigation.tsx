import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GroupScreen from '../screens/Groups/GroupScreen';
import CreateGroupScreen from '../screens/Groups/CreateGroupScreen';


const GroupStack = createNativeStackNavigator();

function GroupNavigation() {
    return (
        <>
            <GroupStack.Navigator screenOptions={{headerShown: false,  contentStyle: { backgroundColor: '#fff' }}}>
                <GroupStack.Screen name="GroupOverview" component={GroupScreen}/>
                <GroupStack.Screen name="CreateGroup" component={CreateGroupScreen}/>
            </GroupStack.Navigator>
        </>
    );
}

export default GroupNavigation;