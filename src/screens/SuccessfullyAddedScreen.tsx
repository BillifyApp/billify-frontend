import React from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import { Image, Pressable, Text, View } from "react-native";
import {
  addReceiptAutoName,
  homeName,
  successfullyAddedName,
} from "../stores/route_names";
import CustomButton from "../components/CustomButton";
import { styles } from "../styles/styles";

const image = require("./../assets/favicon.png");

// @ts-ignore
function SuccessfullyAddedScreen({ navigation }) {
  return (
    <CustomSafeAreaView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <View style={{ marginVertical: 250, alignItems: "center" }}>
          <Image source={require("../assets/bookmark.png")}></Image>
          <Text style={[styles.h1, { textAlign: "center", marginBottom: 10 }]}>
            Your receipt got added successfully!
          </Text>
          <Text>You can review your receipts in the main menu.</Text>
        </View>
        <CustomButton
          title="Home"
          width="60%"
          onPress={() => {
            navigation.navigate(homeName);
          }}
        />
      </View>
    </CustomSafeAreaView>
  );
}

export default SuccessfullyAddedScreen;
