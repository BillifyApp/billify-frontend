import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreateGroupScreen from '../screens/Groups/CreateGroupScreen';
import GroupDetailsScreen from '../screens/Groups/GroupDetailsScreen';
import GroupScreen from '../screens/Groups/GroupScreen';


const GroupStack = createNativeStackNavigator();

function GroupNavigation() {
    return (
        <>
            <GroupStack.Navigator screenOptions={{headerShown: false,  contentStyle: { backgroundColor: '#fff' }}}>
                <GroupStack.Screen name="GroupScreen" component={GroupScreen}/>
                <GroupStack.Screen name="GroupDetails" component={GroupDetailsScreen}/>
            </GroupStack.Navigator>
        </>
    );
}

export default GroupNavigation;