import { Ref, useEffect, useRef, useState } from "react";
import React, { Text } from "react-native";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import CustomButton from "../../components/atom/CustomButton";
import { useAuth } from "../../context/AuthContext";
import isExisting from "../../stores/actions/db.users";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { styles } from "../../styles/styles";
import { useTranslation } from "react-i18next";
import CustomInput from "../../components/atom/CustomInput";
import PasswordInput from "../../components/atom/PasswordInput";

function SignInScreen({ navigation }: any) {
  const { t } = useTranslation();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [messages, setMessages] = useState<[][]>([[]]);
  const u = useRef<TextInput>(null);
  const e = useRef<TextInput>(null);
  const f = useRef<TextInput>(null);
  const l = useRef<TextInput>(null);
  const p0 = useRef<TextInput>(null);
  const p1 = useRef<TextInput>(null);
  const [inputs, setInputs] = useState<React.TextInput[]>([]);
  const { onRegister, onLogin } = useAuth();

  useEffect(() => {
    getInputs();
    setMessages([]);
  }, []);

  function getInputs() {
    let tempInput: any = [];
    tempInput[0] = u;
    tempInput[1] = e;
    tempInput[2] = f;
    tempInput[3] = l;
    tempInput[4] = p0;
    tempInput[5] = p1;

    setInputs(tempInput);
  }

  const login = async () => {
    const result = await onLogin!(username, password);

    if (result && result.error) {
      //alert(result.msg);
    }
  };

  const register = async () => {
    const firstName = firstname.trim().length !== 0 ? firstname : undefined;
    const lastName = lastname.trim().length !== 0 ? firstname : undefined;

    const result = await onRegister!(
      username,
      email,
      password,
      firstName,
      lastName
    );
    if (result && result.error) {
      //alert(result.msg);
    } else {
      console.log("Failed Sign-In");
      //await login();
    }
  };

  async function validate() {
    try {
      getInputs();
      let tempMessages = new Array(5); //delete all and check again

      for (let i = 0; i < tempMessages.length; i++) {
        tempMessages[i] = [];
      }

      const existing = await isExisting(username);

      //console.log(existing)

      //TODO validate
      if (username.trim().length === 0) {
        tempMessages[0].push("Please enter a username");
      } else if (existing /* TODO change to look up function in db */) {
        tempMessages[0].push("This username already exists");
      }
      if (email.trim().length === 0) {
        tempMessages[1].push("Please enter an E-mail-address");
      }
      /*
                    if (firstname.trim().length === 0) {
                        tempMessages[2].push('Please enter your firstname');
                    }

                    if (lastname.trim().length === 0) {
                        tempMessages[3].push('Please enter your lastname');
                    }
            */
      if (password.trim().length === 0) {
        tempMessages[4].push("Please enter a password");
      } else {
        //password is verified then check repeated pw
        if (password !== passwordRepeat) {
          tempMessages[5].push("Repeated Password differs.");
        }
      }

      //console.log(inputs);

      setMessages(tempMessages);

      //console.log(messages)
      //console.log(`Message String: ${messages}`)

      let errors = 0;
      for (let i = 0; i < tempMessages.length; i++) {
        if (tempMessages[i].length != 0) {
          //inputs[i].setNativeProps({styles: styles.error});
          errors++;
          alert("Not valid");
        } else {
          //inputs[i]?.setNativeProps({styles: styles.input});
        }
      }

      if (errors == 0) {
        await register();
        await login();
      }
    } catch (e) {
      alert("Fail login while validation " + e);
    }
  }

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
          {t("common.create_account")}
        </Text>
        <CustomInput
          innerRef={u}
          value={username}
          onChangeText={setUsername}
          placeholder={t("common.username")}
        />
        <CustomInput
          innerRef={e}
          value={email}
          onChangeText={setEmail}
          placeholder={t("common.email")}
        />
        <CustomInput
          innerRef={f}
          value={firstname}
          onChangeText={setFirstname}
          placeholder={t("common.firstname")}
        />
        <CustomInput
          innerRef={l}
          value={lastname}
          onChangeText={setLastname}
          placeholder={t("common.lastname")}
        />
        <PasswordInput
          innerRef={p0}
          value={password}
          onChangeText={setPassword}
          placeholder={t("common.password")}
        />
        <PasswordInput
          innerRef={p1}
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
          placeholder={t("common.repeat_password")}
        />
        <CustomButton
          title={t("common.create_account_short")}
          width="50%"
          onPress={validate}
        />
      </SafeAreaView>
    </>
  );
}

export default SignInScreen;
