import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import {url} from "../stores/constants";


// @ts-ignore
function LoginScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function authenticateUser() {
        fetch(url + "/login", {
                method: 'POST',
                headers: {
                    //Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password, //todo verschlüsseln
                })
            }
        )
            .then(response => response.json())
            .then(data => {console.log(data); alert(`Logged in as id ${data.id} with firstname ${data.firstname}`)})
            .catch((error) => {
                    console.log(JSON.stringify(error.body))
                    console.error(error)
                }
            )

    }

    return (
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
            />
            <Button title="Login" onPress={authenticateUser}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default LoginScreen;