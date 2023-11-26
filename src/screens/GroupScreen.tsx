import {Text} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {createGroupName} from "../stores/route_names";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import {url} from "../stores/constants";
import {useAuth} from "../context/AuthContext";
import DefaultUserIcon from "../components/atom/UserDefaultIconImage";
import {useIsFocused} from "@react-navigation/native";
import GroupOverviewComponent from "../components/template/GroupOverviewComponent";
import {Group} from "../utils/interfaces/Group";

// @ts-ignore
export default function GroupScreen({route, navigation}) {
    const auth = useAuth().authState
    const [groups, setGroups] = useState<any | null>(null);

    const isFocused = useIsFocused();


    useEffect(() => {
        async function getGroups() {
            try {
                return await axios
                    .get(`${url}/groups/find/` + auth?.id)
                    .then((res) => {
                        setGroups(res.data);
                    });
            } catch (e) {
                //todo print fail
                console.log(e)
            }
        }

        isFocused && getGroups();
        return () => {
        };
    }, [isFocused, route]);


    const createIcons = () => {
        return (<>
            <DefaultUserIcon width={30} height={30} offset={1 * 10}></DefaultUserIcon>
            <DefaultUserIcon width={30} height={30} offset={2 * 10}></DefaultUserIcon>
            <DefaultUserIcon width={30} height={30} offset={3 * 10}></DefaultUserIcon>
        </>)
    }

    return (
        <CustomSafeAreaView>

            <Text>Group Screen</Text>
            {groups ? groups.map((entry: Group, key: number) => {
                return (
                    <GroupOverviewComponent group_name={entry.name} key={key} images={[]} group_id={entry._id}/>
                )
            }) : <></>}
            <CustomButton onPress={() => navigation.navigate(createGroupName)} title='Create Group'/>
        </CustomSafeAreaView>
    )
}