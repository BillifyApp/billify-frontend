import React, {useEffect, useState,} from "react";
import {Text,} from "react-native";
import axios from "axios";
import {Group} from "../../utils/interfaces/Group";
import {url} from "../../stores/constants";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CustomButton from "../../components/CustomButton";
import ReceiptListComponent from "../../components/atom/ReceiptListComponent";

// @ts-ignore
function OneGroupScreen({route, navigation}) {
    const {group_id} = route.params;
    const [group, setGroup] = useState<Group | null>(null);

    useEffect(() => {
        async function getGroup() {
            return await axios
                .get(`${url}/groups/` + group_id)
                .then((res) => {
                    setGroup(res.data);
                });
        }

        getGroup();
        return () => {
        };
    }, [route]);

    const deleteReceipt = async () => {
        await axios.delete(`${url}/receipts/delete-one`, {
            data: {},
        });
        navigation.navigate();
    };

    return (
        <CustomSafeAreaView>
            <CustomButton title="Back" onPress={() => navigation.goBack()}></CustomButton>
            <Text>Name: {group?.name}</Text>
            <Text>Owner: {group?.owner}</Text>
            <Text>Created at: {group?.date_created}</Text>
            <Text>Users: {group?.users}</Text>
            <Text>Receipts: {group?.receipts}</Text>
            {group?.receipts ? group.receipts.map((entry, key) => {
                return (<ReceiptListComponent
                    index={key + 1}
                    key={key}
                    receipt_id={entry}

                    /*TODO change api route output in backend */
                    name="test" total={0}>
                </ReceiptListComponent>)
            }) : <></>}

        </CustomSafeAreaView>
    );
}

export default OneGroupScreen;
