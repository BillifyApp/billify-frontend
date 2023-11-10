import {ScrollView, Text, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import CustomButton from "../components/CustomButton";
import {useAuth} from "../context/AuthContext";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {useTranslation} from "react-i18next";
import CategoryOverview from "../components/template/CategoryOverview";
import GroupOverview from "../components/template/GroupOverview";
import {uploadName} from "../stores/route_names";
import {styles} from "../styles/styles";
import axios from "axios";
import {url} from "../stores/constants";
import LastBillsOverview from "../components/template/LastBillsOverview";


// @ts-ignore
export default function HomeScreen({navigation}) {
    const authState = useAuth().authState
    const {onLogout} = useAuth();
    const {t} = useTranslation();
    const [latestReceipts, setLatestReceipts] = useState<any | null>(null);


    useEffect(() => {
        async function getReceipts() {
            return await axios.post(
                `${url}/receipts/latest/overview`,
                {
                    user_id: authState?.id
                }
            ).then(res => {
                setLatestReceipts(res.data);
            })
        }

        getReceipts();
        return() => {};
    }, [latestReceipts]);


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

                {latestReceipts != null ?
                    <LastBillsOverview bills={latestReceipts}/> :
                    <View><Text>LOL todo here maybe vorschlag zum hinzufügen von einer rechnung?</Text></View>
                }

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
