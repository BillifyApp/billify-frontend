import { ScrollView, SectionList, View } from "react-native";
import { Receipt } from "../../../stores/types";
import CustomText from "../CustomText";
import { styles } from "../../../styles/styles";
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
    const sortedReceipts: Receipt[] = receipts.sort((a, b) =>
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
