import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  Pressable,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "../../components/atom/CustomButton";
import { Trans, useTranslation } from "react-i18next";
import i18n from "i18next";
import i18next from "i18next";
import { styles } from "../../styles/styles";
import { COLORS } from "../../styles/colors";
import CustomInput from "../../components/atom/CustomInput";
import PasswordInput from "../../components/atom/PasswordInput";

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
          marginTop: 60,
          alignItems: "center",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Text style={[styles.h1, { marginBottom: 20 }]}>
          {t("common.loginTitle")}
        </Text>
        <CustomInput
          value={username}
          onChangeText={setUsername}
          placeholder={t("common.username") + "/" + t("common.email")}
        />
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder={t("common.password")}
        />
        <Text
          style={{
            textAlign: "right",
            width: "75%",
            marginBottom: 40,
            fontFamily: "Poppins-Regular",
          }}
        >
          {t("common.forgot_password")}
        </Text>
        <CustomButton
          title={t("common.loginButton")}
          onPress={login}
          width="50%"
        />
      </SafeAreaView>
    </>
  );
}

export default LoginScreen;
