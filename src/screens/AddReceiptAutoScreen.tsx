import React, {useEffect, useState} from 'react';
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {Pressable, Text, View} from "react-native";
import axios from "axios";
import {url} from "../stores/constants";
import ReceiptItemEntry from "../components/atom/ReceiptItemEntry";
import {homeName} from "../stores/route_names";
import FlexImage from "../components/atom/FlexImage";

interface Image {
    path: string;
    date_uploaded: string;
}

interface Item {
    quantity: number;
    itemName: string;
    unitPrice: number;
}

interface Receipt {
    _id: string;
    user_id: string;
    image: Image;
    date_created: string;
    date_payed: string;
    comp_name: string;
    address: string;
    items: Array<Item>;
    total: number;
}

// @ts-ignore
function AddReceiptAutoScreen({route, navigation}) {
    const [receipt, setReceipt] = useState<Receipt | null>(null);
    const [path, setPath] = useState(route.params.path)

    useEffect(() => {
        async function getReceipt() {
            return await axios.post(
                `${url}/receipts/findById`,
                {
                    receipt_id: route.params.receipt_id
                }
            ).then(res => {
                console.log(res.data)
                setReceipt(res.data);
            })
        }

        getReceipt();
        return () => {
        };
    }, []);


    return (
        <CustomSafeAreaView>

            <Pressable onPress={() => navigation.navigate(homeName)}><Text>Back</Text></Pressable>
            <Text>{receipt?._id}</Text>
            <Text>{receipt?.image.path}</Text>
            <View style={{height: 500}}>
                <FlexImage path={path} width={50} height={50}/>
                <Text>{receipt?.comp_name}</Text>
                <Text>{receipt?.address}</Text>
                <Text>{receipt?.date_payed}</Text>
            </View>
            {receipt?.items?.map((i, key) => {
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
            )}
            <Text>{`${receipt?.total} €`}</Text>
        </CustomSafeAreaView>
    );
}

export default AddReceiptAutoScreen;