import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import ProcessingScreen from "../screens/ProcessingScreen";
import UploadModal from "../screens/UploadModal";
import HomeScreen from "../screens/HomeScreen";

const UploadStack = createNativeStackNavigator();

function UploadNavigator({}) {
  return (
    <>
      <View>
        <UploadStack.Navigator>
          <UploadStack.Screen name="upload" component={UploadModal} />
          <UploadStack.Screen name="processing" component={ProcessingScreen} />
          <UploadStack.Screen name="home" component={HomeScreen} />
        </UploadStack.Navigator>
      </View>
    </>
  );
}

export default UploadNavigator;
