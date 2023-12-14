import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GroupScreen from '../screens/Groups/GroupScreen';
import CreateGroupScreen from '../screens/Groups/CreateGroupScreen';
import GroupDetailsScreen from '../screens/Groups/GroupDetailsScreen';


const GroupStack = createNativeStackNavigator();

function GroupNavigation() {
    return (
        <>
            <GroupStack.Navigator screenOptions={{headerShown: false,  contentStyle: { backgroundColor: '#fff' }}}>
                <GroupStack.Screen name="GroupOverview" component={GroupScreen}/>
                <GroupStack.Screen name="CreateGroup" component={CreateGroupScreen}/>
                <GroupStack.Screen name="GroupDetails" component={GroupDetailsScreen}/>
            </GroupStack.Navigator>
        </>
    );
}

export default GroupNavigation;