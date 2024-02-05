import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GroupDetailsScreen from "../screens/Groups/GroupDetailsScreen";
import GroupScreen from "../screens/Groups/GroupScreen";
import {
    addMember,
    addReceiptAutoName,
    clearDebts,
    editReceiptName,
    groupDetails,
    groupScreen,
    oneReceiptName,
    splitAmountScreen,
} from "../stores/route_names";
import AddMember from "../screens/Groups/AddMember";
import AddReceiptAutoScreen from "../screens/Receipts/AddReceiptAutoScreen";
import oneReceiptScreen from "../screens/Receipts/OneReceiptScreen";
import SplitAmountScreen from "../screens/Groups/SplitAmountScreen";
import EditReceiptScreen from "../screens/Receipts/EditReceiptScreen";
import ClearDebts from "../screens/Groups/ClearDebts";

const GroupStack = createNativeStackNavigator();

function GroupNavigation() {

    return (
        <>
            <GroupStack.Navigator
                initialRouteName={groupScreen}
                screenOptions={{
                    headerShown: false,
                    contentStyle: {backgroundColor: "#fff"},
                }}
            >
                <GroupStack.Screen name={groupScreen} component={GroupScreen}/>

                <GroupStack.Screen
                    name={groupDetails}
                    component={GroupDetailsScreen}
                    initialParams={[]}
                />
                <GroupStack.Screen
                    name={addReceiptAutoName}
                    component={AddReceiptAutoScreen}
                    initialParams={{receipts_id: null}}
                />
                <GroupStack.Screen
                    name={splitAmountScreen}
                    component={SplitAmountScreen}/>
                <GroupStack.Screen
                    name={oneReceiptName}
                    component={oneReceiptScreen}
                />
                <GroupStack.Screen
                    name={editReceiptName}
                    component={EditReceiptScreen}
                />
                <GroupStack.Screen name={clearDebts} component={ClearDebts}/>
                <GroupStack.Screen name={addMember} component={AddMember}/>
            </GroupStack.Navigator>
        </>
    );
}

export default GroupNavigation;
