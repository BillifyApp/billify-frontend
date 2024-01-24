import {Text} from "react-native";
import React, {useEffect, useState} from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import axios from "axios";
import {url} from "../stores/constants";
import InviteListItem from "../components/atom/InviteListItem";
import {useIsFocused} from "@react-navigation/native";

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
            <Text>Notification Screen</Text>
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
        </CustomSafeAreaView>
    )
}