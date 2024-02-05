import { SectionList, View } from "react-native";
import { Receipt } from "../../../stores/types";
import { useEffect } from "react";
import * as _ from "lodash";
import ReceiptItem from "./ReceiptItem";
import ReceiptsDateDivider from "./ReceiptsDateDivider";
import { oneReceiptName } from "../../../stores/route_names";

interface GroupReceiptsProps {
    receipts: Receipt[];
    navigation: any;
}
export default function GroupReceipts({ receipts, navigation }: GroupReceiptsProps) {
    receipts.forEach((receipt: any) => {
        receipt.date_created = receipt.date_created.split("T")[0];
    });
    const sortedReceipts: Receipt[] = receipts.sort((a, b) =>
        b.date_created.localeCompare(a.date_created)
    );
    let groupedReceipts = _.mapValues(
        _.groupBy(sortedReceipts, "date_created"),
        (clist) => clist.map((receipt) => _.omit(receipt, "date_created"))
    );
    const groupedReceiptsArray = Object.entries(groupedReceipts).map(
        ([key, value]) => ({
            title: new Date(key),
            data: value,
        })
    );
    useEffect(() => { console.log(groupedReceiptsArray)}, [groupedReceiptsArray]);

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
