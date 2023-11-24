import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import { Trans, useTranslation } from "react-i18next";
import i18n from "i18next";
import i18next from "i18next";
import { styles } from "../../styles/styles";

function WelcomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  return (
    <>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.h1, { marginVertical: 250 }]}>Billify</Text>
          <View style={{ width: "80%" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default WelcomeScreen;
