import { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { styles } from "../styles/styles";

function ProcessingScreen({ navigation }: any) {
  return (
    <>
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Text style={[styles.h1, { marginBottom: 20 }]}>
          We are processing your bill in the background
        </Text>
      </SafeAreaView>
    </>
  );
}
export default ProcessingScreen;
