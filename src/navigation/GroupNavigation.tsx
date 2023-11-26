import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {createGroupName, groupName, oneGroupName, oneReceiptName,} from "../stores/route_names";
import GroupScreen from "../screens/GroupScreen";
import OneGroupScreen from "../screens/Group/OneGroupScreen";
import CreateGroupScreen from "../screens/Group/CreateGroupScreen";
import oneReceiptScreen from "../screens/Receipts/OneReceiptScreen";

//https://reactnavigation.org/docs/modal/

//https://medium.com/@my.maithi/react-native-navigation-add-custom-button-in-the-middle-of-tabbar-6c390201a2bb
//https://www.npmjs.com/package/@gorhom/bottom-sheet

const GroupRootStack = createStackNavigator();

function HomeNavigation() {
    return (
        <>
            <GroupRootStack.Navigator screenOptions={{headerShown: false}}>
                <GroupRootStack.Group>
                    <GroupRootStack.Screen name={groupName} component={GroupScreen}/>
                    <GroupRootStack.Screen name={createGroupName} component={CreateGroupScreen}/>
                    <GroupRootStack.Screen name={oneGroupName} component={OneGroupScreen}/>
                    <GroupRootStack.Screen name={oneReceiptName} component={oneReceiptScreen}/>
                </GroupRootStack.Group>
            </GroupRootStack.Navigator>
        </>
    );
}

export default HomeNavigation;
