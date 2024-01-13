import React from 'react';
import {Text, View} from "react-native";
import CustomButton from "./CustomButton";
import axios from "axios/index";
import {url} from "../../stores/constants";
import {groupDetails, groupName} from "../../stores/route_names";

interface InviteListItemProps {
    _id: string
    to: {
        _id: string,
        username: string
    };
    from: {
        _id: string,
        username: string
    };
    to_group: {
        _id: string,
        name: string
    };
    date_created: string;
    reload: any;
    navigation: any;
}

function InviteListItem({_id, to, from, to_group, date_created, reload, navigation}: InviteListItemProps) {

    const acceptInvite = async () => {
        try {
            let result = await axios.get(`${url}/invitations/accept/${_id}`)
                .then((res) => {
                return res.data
            })
            if (result) {
                navigation.navigate(groupName, { screen: groupDetails, params: {group : result}})
            }
        } catch (e) {

        }
    }

    const declineInvite = async () => {
        try {
            let result = await axios.get(`${url}/invitations/decline/${_id}`);
            reload();
        } catch (e) {

        }
    }

    return (
        <View>
            <Text>{_id}</Text>
            <Text>{from.username}</Text>
            <Text>{to.username}</Text>
            <Text>{to_group.name}</Text>
            <Text>{date_created}</Text>
            <CustomButton title={"Decline"} onPress={declineInvite}/>
            <CustomButton title={"Accept"} onPress={acceptInvite}/>
        </View>
    );
}

export default InviteListItem;