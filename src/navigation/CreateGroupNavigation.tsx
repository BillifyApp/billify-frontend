import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GroupScreen from '../screens/Groups/GroupScreen';
import CreateGroupScreen from '../screens/Groups/CreateGroupScreen';
import GroupDetailsScreen from '../screens/Groups/GroupDetailsScreen';


const CreateGroupStack = createNativeStackNavigator();

function CreateGroupNavigation() {
    return (
        <>
            <CreateGroupStack.Navigator screenOptions={{headerShown: false,  contentStyle: { backgroundColor: '#fff' }}}>
                <CreateGroupStack.Screen name="CreateGroup" component={CreateGroupScreen}/>
                <CreateGroupStack.Screen name="GroupDetails" component={GroupDetailsScreen}/>
            </CreateGroupStack.Navigator>
        </>
    );
}

export default CreateGroupNavigation;