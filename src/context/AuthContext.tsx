//Tut: https://www.youtube.com/watch?v=9vydY9SDtAo

import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import {FIRSTNAME_KEY, TOKEN_KEY, url, USER_KEY, USERNAME_KEY} from "../stores/constants";

interface AuthProps {
    authState?: {
        access_token: string | null;
        authenticated: boolean | null;
        id: string | null;
        username: string | null;
        firstname: string | null;
    };
    onRegister?: (username: string, email: string, password: string, name?: object) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});
const addtion = 'Bearer';


export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        access_token: string | null;
        authenticated: boolean | null;
        id: string | null;
        username: string | null;
        firstname: string | null;
    }>({
        access_token: null,
        authenticated: null,
        id: null,
        username: null,
        firstname: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const access_token = await SecureStore.getItemAsync(TOKEN_KEY);
            const user_id = await SecureStore.getItemAsync(USER_KEY);
            const username = await SecureStore.getItemAsync(USERNAME_KEY);
            const firstname = await SecureStore.getItemAsync(FIRSTNAME_KEY);
            console.log("stored: ", access_token);

            if (access_token) {
                //TODO check validation send request to backend
                axios.defaults.headers.common['Authorization'] = `${addtion} ${access_token}`; //TODO

                const isValid: boolean = await validation();
                if (isValid) {
                    setAuthState({
                        access_token: access_token,
                        authenticated: true,
                        id: user_id,
                        username: username,
                        firstname: firstname
                    });
                } else {
                    await SecureStore.deleteItemAsync(TOKEN_KEY);
                    await SecureStore.deleteItemAsync(USER_KEY);
                    await SecureStore.deleteItemAsync(USERNAME_KEY);
                    await SecureStore.deleteItemAsync(FIRSTNAME_KEY);

                    axios.defaults.headers.common['Authorization'] = ``;

                    setAuthState({
                        access_token: null,
                        authenticated: false,
                        id: null,
                        username: null,
                        firstname: null,
                    });
                }
            }
        }

        loadToken();
    }, []);


    const register = async (username: string, email: string, password: string, ...name: any) => {
        try {
            const result = await axios.post(
                `${url}/users/signup`,
                {
                    username: username,
                    email: email,
                    password: password,
                    name: name
                }
            )

        } catch (e) {
            return {error: true, msg: (e as any).response.data.msg}
        }
    };

    const login = async (username: string, password: string) => {
        try {
            console.log(`Login: with username ${username} and password ${password}`)

            const result = await axios.post(`${url}/users/login`, {username, password});

            setAuthState({
                access_token: result.data.access_token,
                authenticated: true,
                id: result.data?.id,
                username: result.data?.username,
                firstname: result.data?.firstname
            });

            axios.defaults.headers.common['Authorization'] = `${addtion} ${result.data.access_token}`; //TODO
            try {
                console.log(result.data)
                await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token);
                await SecureStore.setItemAsync(USER_KEY, result.data.id);
                await SecureStore.setItemAsync(USERNAME_KEY, result.data.username);
                await SecureStore.setItemAsync(FIRSTNAME_KEY, result.data.firstname);
            } catch (e) {
                console.log(`Fail Login SetItem in SecureStore with: ${e}`)
            }

            console.log(`Result Login: ${result}`)

            return result;
        } catch (e: any) {
            //console.log(e.response.status)
            if (e.response!.status == 401) {
                console.log(`Unauthorized`)
                alert(`${e?.response.status} - Unauthorized`)
            } else if (e.response!.status == 406) {
                console.log('No User with this name')
                alert(`${e?.response.status} - no user with this name found`)
            } else {
                console.log(`Login Button error ${e}`)
                //return Promise.reject(e); //{error: true, msg: (e as any).response.data.msg}
            }
        }
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_KEY);
            await SecureStore.deleteItemAsync(USERNAME_KEY);
            await SecureStore.deleteItemAsync(FIRSTNAME_KEY);

            axios.defaults.headers.common['Authorization'] = ``;

            setAuthState({
                access_token: null,
                authenticated: false,
                id: null,
                username: null,
                firstname:null
            });

            console.log("Logged out")
        } catch (e: any) {
            console.log(`Logout Error: ${e.response.status}`)
        }
    };

    const validation = async () => {
        try {
            return await axios.get(`${url}/valid`).then(req => {
                return req.data
            });
        } catch (e: any) {
            //TODO error msg
            alert(`${e} - Not logged in anymore, jwt token expired`);
            return false;
        }
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}