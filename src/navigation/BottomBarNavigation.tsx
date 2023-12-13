import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

//Screens
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import GroupScreen from "../screens/Groups/GroupScreen";
import SearchScreen from "../screens/SearchScreen";
import {
  groupName,
  homeNavName,
  notificationName,
  profileName,
  searchName,
} from "../stores/route_names";
import HomeNavigation from "./HomeNavigation";
import GroupNavigation from "./GroupNavigation";

//Icons
const iconHome_outline = require("../assets/bottom-bar-nav/home.png");
const iconProfile_outline = require("../assets/bottom-bar-nav/user.png");
const iconNotif_outline = require("../assets/bottom-bar-nav/notificationon.png");
const iconGroup_outline = require("../assets/bottom-bar-nav/users.png");
const iconSearch_outline = require("../assets/bottom-bar-nav/search.png");

const Tab = createBottomTabNavigator();

export default function BottomBarNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={homeNavName}
      screenOptions={({ route }) => ({
        headerShown: false,
        gestureEnabled: true, // If you want to swipe back like iOS on Android
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === searchName) {
            iconName = focused ? "search" : iconSearch_outline;
          } else if (rn === groupName) {
            iconName = focused ? "group" : iconGroup_outline;
          } else if (rn === homeNavName) {
            iconName = focused ? "home" : iconHome_outline;
          } else if (rn === notificationName) {
            iconName = focused ? "notification" : iconNotif_outline;
          } else if (rn === profileName) {
            iconName = focused ? "profile" : iconProfile_outline;
          }

          //TODO return icon not text
          return (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={iconName}
                />
              </View>
            </>
          );
        },
      })}
    >
      <Tab.Screen name={searchName} component={SearchScreen}
       options={{
        unmountOnBlur: true,
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={
                require("../assets/bottom-bar-nav/search.png")
              }
            />
          );
        },
      }}></Tab.Screen>
      <Tab.Screen name={groupName} component={GroupNavigation}
       options={{
        unmountOnBlur: true,
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={
                require("../assets/bottom-bar-nav/users.png")
              }
            />
          );
        },
      }}></Tab.Screen>
      <Tab.Screen
        name={homeNavName}
        component={HomeNavigation}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={
                  require("../assets/bottom-bar-nav/home.png")
                }
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={notificationName}
        component={NotificationScreen}
        options={{
            unmountOnBlur: true,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={
                    require("../assets/bottom-bar-nav/notificationon.png")
                  }
                />
              );
            },
          }}
      ></Tab.Screen>
      <Tab.Screen name={profileName} component={ProfileScreen}
       options={{
        unmountOnBlur: true,
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={
                require("../assets/bottom-bar-nav/user.png")
              }
            />
          );
        },
      }}></Tab.Screen>
    </Tab.Navigator>
  );
}
