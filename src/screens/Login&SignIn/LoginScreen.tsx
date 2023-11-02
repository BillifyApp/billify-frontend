import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton";

function LoginScreen({navigation}: any) {
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
                <Text>Login Screen</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={true}
                />

                <Text>No Account yet?
                    <Text
                        onPress={() => navigation.navigate('SignIn')}
                        style={styles.link}
                    >Sign in!
                    </Text>
                </Text>

                <Button title="Login" onPress={login}/>

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