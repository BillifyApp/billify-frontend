import React from 'react';
import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import {createStackNavigator} from "@react-navigation/stack";

//https://reactnavigation.org/docs/modal/

//https://medium.com/@my.maithi/react-native-navigation-add-custom-button-in-the-middle-of-tabbar-6c390201a2bb

const HomeRootStack = createStackNavigator();

function HomeNavigation() {
    return (
        <>
            <HomeRootStack.Navigator screenOptions={{headerShown: false,}}>
                <HomeRootStack.Group>
                    <HomeRootStack.Screen name="Home" component={HomeScreen}/>
                    {/* <HomeRootStack.Screen name="Details" component={DetailsScreen}/>*/}
                </HomeRootStack.Group>
                <HomeRootStack.Group screenOptions={{presentation: 'modal'}}>
                    <HomeRootStack.Screen name="MyModal" component={UploadScreen}/>
                </HomeRootStack.Group>
            </HomeRootStack.Navigator>
        </>
    );
}

export default HomeNavigation;