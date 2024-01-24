// Doc for react nav  https://reactnavigation.org/docs/getting-started/
// Tut: https://www.youtube.com/watch?v=AnjyzruZ36E

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import BottomBarNavigation from "../navigation/BottomBarNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Screens
import SettingsScreen from "../screens/SettingsScreen";
import LoginContainer from "../navigation/LoginContainer";
import UploadScreen from "../screens/UploadScreen";
import GroupNavigation from "../navigation/GroupNavigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GroupDetailsScreen from "../screens/Groups/GroupDetailsScreen";
import CreateGroupScreen from "../screens/Groups/CreateGroupScreen";
import CategoriesNavigation from "../navigation/CategoriesNavigation";

const Stack = createNativeStackNavigator();

export default function MainContainer() {
  const { authState } = useAuth();
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            {authState?.authenticated ? (
              <>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="BottomBar"
                    component={BottomBarNavigation}
                  />
                  <Stack.Screen
                    name="CreateGroup"
                    component={CreateGroupScreen}
                  />
                  <Stack.Screen
                    name="CategoriesNavigation"
                    component={CategoriesNavigation}
                  />
                  <Stack.Screen name="Settings" component={SettingsScreen} />
                  <Stack.Screen name="Upload" component={UploadScreen} />
                </Stack.Navigator>
              </>
            ) : (
              <>
                <LoginContainer />
              </>
            )}
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
