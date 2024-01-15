import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreateGroupScreen from '../screens/Groups/CreateGroupScreen';
import GroupDetailsScreen from '../screens/Groups/GroupDetailsScreen';
import GroupScreen from '../screens/Groups/GroupScreen';
import {addMember, groupDetails, groupScreen} from "../stores/route_names";
import AddMember from "../screens/Groups/AddMember";


const GroupStack = createNativeStackNavigator();

function GroupNavigation() {
    return (
        <>
            <GroupStack.Navigator initialRouteName={groupScreen} screenOptions={{headerShown: false,  contentStyle: { backgroundColor: '#fff' }}}>
                <GroupStack.Screen name={groupScreen} component={GroupScreen}/>
                <GroupStack.Screen name={groupDetails} component={GroupDetailsScreen}/>
                <GroupStack.Screen name={addMember} component={AddMember}/>
            </GroupStack.Navigator>
        </>
    );
}

export default GroupNavigation;