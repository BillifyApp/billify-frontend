//Tut: https://www.youtube.com/watch?v=9vydY9SDtAo

import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import {TOKEN_KEY, url} from "../stores/constants";

interface AuthProps {
    authState?: {
        access_token: string | null;
        authenticated: boolean | null
    };
    onRegister?: (username: string, email: string, password: string, firstname?: string, lastname?: string) => Promise<any>;
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
    }>({
        access_token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const access_token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored: ", access_token);

            if (access_token) {
                axios.defaults.headers.common['Authorization'] = `${addtion} ${access_token}`; //TODO

                setAuthState({
                    access_token: access_token,
                    authenticated: true
                });
            }
        }

        loadToken();
    }, []);


    const register = async (username: string, email: string, password: string, firstname?: string, lastname?: string) => {
        try {
            const result = await axios.post(`${url}/users/signup`, {username: username, email: email, password: password})
            //TODO UPDATE user with info firstname: firstname, lastname: lastname
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
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `${addtion}${result.data.access_token}`; //TODO
            try {
                console.log(result.data.access_token)
                await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token);
            } catch (e) {
                console.log(`Fail Login SetItem in SecureStore with: ${e}`)
            }

            console.log(`Result Login: ${result}`)

            return result;
        } catch (e: any) {
            //console.log(e.response.status)
            if (e.response!.status == 401) {
                console.log(`Unauthorized`)
                alert(`${e?.response.status} Unauthorized`)
            } else {
                console.log(`Login Button error ${e}`)
                //return Promise.reject(e); //{error: true, msg: (e as any).response.data.msg}
            }
        }
    };

    const logout = async () => {
        console.log("test")
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);

            axios.defaults.headers.common['Authorization'] = ``;

            setAuthState({
                access_token: null,
                authenticated: false
            });

            console.log("Logged out")
        } catch (e: any) {
            console.log(`Logout Error: ${e.response.status}`)
        }
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}