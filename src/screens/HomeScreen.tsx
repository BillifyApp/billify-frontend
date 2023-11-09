import {Button, SafeAreaView, Text, StyleSheet, View, ScrollView} from "react-native";
import * as React from "react";
import CustomButton from "../components/CustomButton";
import {useAuth} from "../context/AuthContext";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {useTranslation} from "react-i18next";
import LastBillsOverview from "../components/template/LastBillsOverview";
import CategoryOverview from "../components/template/CategoryOverview";
import GroupOverview from "../components/template/GroupOverview";
import {settingsName, uploadName} from "../stores/route_names";
import {styles} from "../styles/styles";


// @ts-ignore
export default function HomeScreen({navigation}) {
    const authState = useAuth().authState
    const {onLogout} = useAuth();
    const {t} = useTranslation();


    const logout = async () => {
        const result = await onLogout!();
        if (result && result.error) {
            alert(result.msg);
        }
    };

    /*TODO fill with real data*/
    return (
        <CustomSafeAreaView>
            <ScrollView>
                <Text style={styles.h1}>
                    {t('common.welcome')}, {authState?.firstname ? authState.firstname : authState?.username}
                </Text>
                <Text style={styles.h2}>TODO Search</Text>
                <LastBillsOverview bills={[1, 2]}/>
                <CategoryOverview categories={['Lol', 'Ein', 'Test']}/>
                <GroupOverview groups={[{name: 'Eine Testgruppe'}, {name: 'Zweite Testgruppe'}]}/>


                <CustomButton
                    title="Logout"
                    onPress={logout}
                />
                <CustomButton
                    title="Upload Bill"
                    onPress={() => {
                        navigation.navigate(uploadName)
                    }}/>
            </ScrollView>
        </CustomSafeAreaView>
    )
}
