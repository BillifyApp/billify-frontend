import React, {useEffect, useState} from 'react';
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {Pressable, Switch, Text, View} from "react-native";
import ReceiptItemEntry from "../components/atom/ReceiptItemEntry";
import {homeName, successfullyAddedName} from "../stores/route_names";
import axios from "axios";
import {url} from "../stores/constants";
import {useAuth} from "../context/AuthContext";


interface Item {
    quantity: number;
    itemName: string;
    unitPrice: number;
}

interface Receipt {
    comp_name: string;
    address: string;
    items: Array<Item>;
    total: number;
}

// @ts-ignore
function AddReceiptAutoScreen({route, navigation}) {
    const auth = useAuth().authState;
    const {image_path, ocr_receipt: receipt} = route.params;
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    useEffect(() => {
        console.log(route)
    }, [route]);

    const addReceipt = async () => {
        //todo post receipt
        let result = false
        try {
            result = await axios.post(
                `${url}/receipts/add-receipt`,
                {
                    user_id: auth?.id,
                    receipt: receipt,
                    image_path: image_path
                })
        } catch (e) {
            //todo print fail
        }

        if (result) {
            navigation.navigate(successfullyAddedName)
        }

        //todo print fail
    }

    const dismissUpload = async () => {
        let result = false;
        try {
            result = await axios.delete(
                `${url}/images/one`,
                {
                    data: {
                        image_path: image_path
                    }
                }
            );
        } catch (e) {
            //todo print fail
        }

        if (result) {
            navigation.navigate(homeName);
        }

        return;
        //todo print fail
    }


    return (
        <CustomSafeAreaView>
            <Pressable onPress={dismissUpload}><Text>Back</Text></Pressable>

            <View style={{height: 200}}>
                <Text>{receipt?.comp_name}</Text>
                <Text>{receipt?.address}</Text>
                <Text>{receipt?.date_payed}</Text>
            </View>
            {receipt ? receipt.items.map((i: Item, key: number) => {
                    return (
                        <ReceiptItemEntry
                            count={key}
                            key={key}
                            itemName={i.itemName}
                            quantity={i.quantity}
                            unitPrice={i.unitPrice}
                        />
                    )
                }
            ) : undefined}
            <Text>{`${receipt?.total} €`}</Text>

            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />

            {isEnabled ? <View><Text>Insert groups here</Text></View> : <></>}

            <Pressable onPress={addReceipt}><Text>TODO Hinzufügen</Text></Pressable>
        </CustomSafeAreaView>
    );
}

export default AddReceiptAutoScreen;