import React from 'react';
import {Text, View} from "react-native";
import CustomButton from "./CustomButton";
import axios from "axios";
import {url} from "../../stores/constants";
import {useAuth} from "../../context/AuthContext";

interface UserListItemProp {
    username: string;
    _id: string;
    icon_path: string;
    group_id: string;
    requested: any;
}

function UserListItem({username, _id, icon_path, group_id, requested}: UserListItemProp) {
    const {authState} = useAuth();

    const sendRequest = () => {
        try {
           let result = axios.post(`${url}/invitations/`, {
                from_user: authState?.id,
                to_user: _id,
                to_group: group_id,
            })
            requested();
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <View>
            <Text>{username}</Text>
            <CustomButton onPress={sendRequest} title="Add"/>
        </View>
    );
}

export default UserListItem;