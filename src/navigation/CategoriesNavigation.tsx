import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GroupDetailsScreen from '../screens/Groups/GroupDetailsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';


const GroupStack = createNativeStackNavigator();

function CategoriesNavigation() {
    return (
        <>
            <GroupStack.Navigator screenOptions={{headerShown: false,  contentStyle: { backgroundColor: '#fff' }}}>
                <GroupStack.Screen name="CategoriesScreen" component={CategoriesScreen}/>
            </GroupStack.Navigator>
        </>
    );
}

export default CategoriesNavigation;