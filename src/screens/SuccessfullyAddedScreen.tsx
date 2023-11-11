import React from 'react';
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {Image, Pressable, Text, View} from "react-native";
import {homeName} from "../stores/route_names";

const image = require('./../assets/favicon.png')

// @ts-ignore
function SuccessfullyAddedScreen({navigation}) {

    return (
        <CustomSafeAreaView>
            <View>
                <Image source={image}></Image>
                <Text>TODO text hier</Text>
                <Text>TODO beschreibung hier</Text>

                <Pressable onPress={() => navigation.navigate(homeName)}><Text>TODO Hauptmenü</Text></Pressable>
            </View>
        </CustomSafeAreaView>
    );
}

export default SuccessfullyAddedScreen;
