import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import axios from "axios";
import {url} from "../stores/constants";
import InviteListItem from "../components/atom/InviteListItem";
import {useIsFocused} from "@react-navigation/native";
import { styles } from "../styles/styles";
import CustomText from "../components/atom/CustomText";
import { rh } from "../utils/responsiveDimenstions";

// @ts-ignore
export default function NotificationScreen({navigation}) {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    async function getInvitations() {
        return await axios.get(`${url}/invitations/`)
            .then((res) => {
                setInvitations(res.data);
            });
    }

    useEffect(() => {
        async function getInvitations() {
            return await axios.get(`${url}/invitations/`)
                .then((res) => {
                    setInvitations(res.data);
                    setLoading(false);
                });
        }

        isFocused && getInvitations();
        console.log(invitations)
        return () => {
        };
    }, [isFocused]);

    return (
        <CustomSafeAreaView>
            <View style={{minHeight: rh(100)}}>
                <View style={styles.headingMargin}>
            <CustomText style={styles.h1}>Notification Screen</CustomText>
            </View>
            {invitations.length > 0 ?
                invitations.map((inv: any, key) => {
                    return (<InviteListItem
                        key={key}
                        _id={inv._id}
                        to={inv.to_user}
                        from={inv.from_user}
                        to_group={inv.to_group}
                        date_created={inv.date_created}
                        reload={() => getInvitations()}
                        navigation={navigation}
                    />)
                }) :
                <></>
            }
            </View>
        </CustomSafeAreaView>
    )
}