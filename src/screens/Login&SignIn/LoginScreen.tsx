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

function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister, onLogout } = useAuth();

  const login = async () => {
    console.log("Login button pressed");
    const result = await onLogin!(username, password);

    if (result && result.error) {
      alert(result.msg);
    }
  };

  const logout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      alert(result.msg);
    }
  };

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
        <Text style={[styles.h1, {marginBottom: 20}]}>{t("common.login")}</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder={t("common.username") + "/" + t("common.email")}
        />
        <TextInput
          style={[styles.input, {marginBottom: 20}] }
          value={password}
          onChangeText={setPassword}
          placeholder={t("common.password")}
          secureTextEntry={true}
        />
        <CustomButton title={t("common.login")} onPress={login} width="50%"/>
      </SafeAreaView>
    </>
  );
}

export default LoginScreen;
