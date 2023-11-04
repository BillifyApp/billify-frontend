import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import {Trans, useTranslation} from "react-i18next";
import i18n from 'i18next';
import i18next from "i18next";

function LoginScreen({navigation}: any) {
    const {t} = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {onLogin, onRegister, onLogout} = useAuth();

    const login = async () => {
        console.log('Login button pressed')
        const result = await onLogin!(username, password);

        if (result && result.error) {
            alert(result.msg);
        }
    }

    const logout = async () => {
        const result = await onLogout!();
        if (result && result.error) {
            alert(result.msg);
        }
    };

    return (
        <>
            <SafeAreaView>
                <Text>{t('common.login')}</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder={t('common.username')+ "/" + t('common.email')}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t('common.password')}
                    secureTextEntry={true}
                />

                <Text>{t('common.no_acc')}
                    <Text
                        onPress={() => navigation.navigate('SignIn')}
                        style={styles.link}
                    >{t('common.sign_in')}
                    </Text>
                </Text>

                <Button title={t('common.login')} onPress={login}/>

                {/*<CustomButton title="Logout" onPress={logout} style={styles.input}/>*/}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: "underline"
    }
});

export default LoginScreen;