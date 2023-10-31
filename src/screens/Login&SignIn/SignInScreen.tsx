import {Ref, useEffect, useRef, useState} from 'react';
import React, {Text} from "react-native";
import {SafeAreaView, StyleSheet, TextInput} from "react-native";
import CustomButton from "../../components/CustomButton";
import {useAuth} from "../../context/AuthContext";
import isExisting from "../../stores/actions/db.users";

function SignInScreen({navigation}: any) {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');
    const [messages, setMessages] = useState<[][]>([[]]);
    const u = useRef<TextInput>(null);
    const e = useRef<TextInput>(null);
    const f = useRef<TextInput>(null);
    const l = useRef<TextInput>(null);
    const p0 = useRef<TextInput>(null);
    const p1 = useRef<TextInput>(null);
    const [inputs, setInputs] = useState<React.TextInput[]>([]);
    const {onRegister} = useAuth();

    useEffect(() => {
        getInputs();
        setMessages([]);
    }, [])

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

    const register = async () => {
        const result = await onRegister!(username, email, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            console.log("Failed Signin")
            //await login();
        }
    }

    async function validate() {
        getInputs();
        let tempMessages = new Array(5); //delete all and check again

        for (let i = 0; i < tempMessages.length; i++) {
            tempMessages[i] = [];
        }

        const existing = await isExisting(username);

        console.log(existing)


        //TODO validate
        if (username.trim().length === 0) {
            tempMessages[0].push("Please enter a username");
        } else if (existing /* TODO change to look up function in db */) {
            tempMessages[0].push('This username already exists');
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
            tempMessages[4].push('Please enter a password');

        } else { //password is verified then check repeated pw
            if (password !== passwordRepeat) {
                tempMessages[5].push('Repeated Password differs.');
            }
        }

        //console.log(inputs);

        setMessages(tempMessages);

        console.log(messages)
        //console.log(`Message String: ${messages}`)

        let errors = 0;
        for (let i = 0; i < tempMessages.length; i++) {
            if (tempMessages[i].length != 0) {
                //console.log(inputs[i].setNativeProps)
                //inputs[i]?.props. = {styles: styles.error});
                errors++;
            } else {
                //inputs[i]?.setNativeProps({styles: styles.input});
                alert()
            }
        }

        if (errors == 0) {
            register().then(navigation.navigate("home"));
        }
    }

    return (
        <>
            <SafeAreaView>
                <Text>Create Account</Text>
                <TextInput
                    ref={u}
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                />
                <TextInput
                    ref={e}
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-Mail"
                />
                <TextInput
                    ref={f}
                    style={styles.input}
                    value={firstname}
                    onChangeText={setFirstname}
                    placeholder="Firstname"
                />
                <TextInput
                    ref={l}
                    style={styles.input}
                    value={lastname}
                    onChangeText={setLastname}
                    placeholder="Lastname"
                />
                <TextInput
                    ref={p0}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                />
                <TextInput
                    ref={p1}
                    style={styles.input}
                    value={passwordRepeat}
                    onChangeText={setPasswordRepeat}
                    placeholder="Repeat Password"
                />

                <CustomButton title="Sign in" onPress={validate}/>

            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    error: {
        borderColor: '#ff0000'
    }
});

export default SignInScreen;