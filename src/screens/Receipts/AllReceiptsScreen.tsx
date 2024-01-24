import React, {useEffect, useState} from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import {Pressable, ScrollView, SectionList, Text, View} from "react-native";
import axios from "axios";
import {url} from "../../stores/constants";
import {homeName, oneReceiptName} from "../../stores/route_names";
import {useAuth} from "../../context/AuthContext";
import ReceiptListComponent from "../../components/atom/ReceiptListComponent";
import ReceiptItem from "../../components/atom/ReceiptsOverview/ReceiptItem";
import ReceiptsDateDivider from "../../components/atom/ReceiptsOverview/ReceiptsDateDivider";
import _ from "lodash";
import { Receipt } from "../../stores/types";

// @ts-ignore
function AllReceiptsScreen({route, navigation}) {
    //const { user_id, path } = route.params;
    const authState = useAuth().authState
    const [receipts, setReceipts] = useState<Receipt[] | null>(null);

    useEffect(() => {
        async function getReceipt() {
            return await axios
                .post(`${url}/receipts/latest`, {
                    user_id: authState?.id
                })
                .then((res) => {
                    setReceipts(res.data);
                });
        }

        getReceipt();
        return () => {
        };
    }, [route]);

    const sortedReceipts: Receipt[] | undefined = receipts?.sort((a, b) =>
        b.date_payed.localeCompare(a.date_payed)
    );
    let groupedReceipts = _.mapValues(
        _.groupBy(sortedReceipts, "date_payed"),
        (clist) => clist.map((receipt) => _.omit(receipt, "date_payed"))
    );
    const groupedReceiptsArray = Object.entries(groupedReceipts).map(
        ([key, value]) => ({
            title: new Date(key),
            data: value,
        })
    );

    function openReceipt(receipt: Receipt){
        navigation.navigate({
            name: oneReceiptName,
            params: { receipt_id: receipt._id, path: receipt.image.path },
          });
    }
    return (
        <View style={{width:"100%", paddingTop:30, height: "75%"}}>
            {receipts && (
                <SectionList
                    sections={groupedReceiptsArray}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ReceiptItem receipt={item as Receipt} onPress={openReceipt}/>
                    )}
                    renderSectionHeader={({ section }) => (
                        <ReceiptsDateDivider date={section.title as Date}/>
                    )}
                    showsVerticalScrollIndicator={true}
                />
            )}
        </View>
    );
}

export default AllReceiptsScreen;
