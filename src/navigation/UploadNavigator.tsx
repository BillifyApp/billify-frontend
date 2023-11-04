import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UploadScreen from "../screens/UploadScreen";
import {View} from "react-native";

const UploadStack = createNativeStackNavigator();

function UploadNavigator({}) {
    return (
        <>
            <View>
                <UploadStack.Navigator>
                    <UploadStack.Screen name="upload" component={UploadScreen}/>
                </UploadStack.Navigator>
            </View>
        </>
    );
}

export default UploadNavigator;