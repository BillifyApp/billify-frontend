import React from "react";
import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import { createStackNavigator } from "@react-navigation/stack";
import {
  addReceiptAutoName,
  allReceiptsName,
  editReceiptName,
  homeName,
  oneReceiptName,
  successfullyAddedName,
  uploadName,
} from "../stores/route_names";
import AddReceiptAutoScreen from "../screens/AddReceiptAutoScreen";
import oneReceiptScreen from "../screens/OneReceiptScreen";
import SuccessfullyAddedScreen from "../screens/SuccessfullyAddedScreen";
import AllReceiptsScreen from "../screens/AllReceiptsScreen";
import EditReceiptScreen from "../screens/EditReceiptScreen";

//https://reactnavigation.org/docs/modal/

//https://medium.com/@my.maithi/react-native-navigation-add-custom-button-in-the-middle-of-tabbar-6c390201a2bb
//https://www.npmjs.com/package/@gorhom/bottom-sheet

const HomeRootStack = createStackNavigator();

function HomeNavigation() {
  return (
    <>
      <HomeRootStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeRootStack.Group>
          <HomeRootStack.Screen name={homeName} component={HomeScreen} />
          <HomeRootStack.Screen
            name={oneReceiptName}
            component={oneReceiptScreen}
          />
          <HomeRootStack.Screen
            name={allReceiptsName}
            component={AllReceiptsScreen}
          />
          <HomeRootStack.Screen
            name={editReceiptName}
            component={EditReceiptScreen}
          />
          <HomeRootStack.Screen name={uploadName} component={UploadScreen} />
          <HomeRootStack.Screen
            name={addReceiptAutoName}
            component={AddReceiptAutoScreen}
            initialParams={{ receipts_id: null }}
          />
          <HomeRootStack.Screen
            name={successfullyAddedName}
            component={SuccessfullyAddedScreen}
          />
        </HomeRootStack.Group>
      </HomeRootStack.Navigator>
    </>
  );
}

export default HomeNavigation;
