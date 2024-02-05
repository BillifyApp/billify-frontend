import {SectionList, View} from "react-native";
import {Receipt, ReceiptsGroup} from "../../../stores/types";
import {useEffect} from "react";
import * as _ from "lodash";
import ReceiptsDateDivider from "./ReceiptsDateDivider";
import {oneReceiptName} from "../../../stores/route_names";
import DebtItem from "./DebtItem";
import ReceiptItem from "./ReceiptItem";

interface GroupReceiptsProps {
    receipts_group: ReceiptsGroup[];
    receipts: Receipt[];
    navigation: any;
}

export default function ReceiptsGroupOverview({receipts_group, receipts, navigation}: GroupReceiptsProps) {
    receipts_group.forEach((receipt: ReceiptsGroup) => {
        receipt.date_added = receipt.date_added.split("T")[0];
    });

    const sortedReceipts: ReceiptsGroup[] = receipts_group.sort((a, b) =>
        b.date_added.localeCompare(a.date_added)
    );

    let groupedReceipts = _.mapValues(
        _.groupBy(sortedReceipts, "date_added"),
        (clist) => clist.map((receipt) => _.omit(receipt, "date_added"))
    );

    const groupedReceiptsArray = Object.entries(groupedReceipts).map(
        ([key, value]) => ({
            title: new Date(key),
            data: value,
        })
    );

    useEffect(() => {
        console.log(groupedReceiptsArray)
        console.log(receipts)
    }, [groupedReceiptsArray, receipts, receipts_group]);

    function openReceipt(receipt: Receipt) {
        navigation.navigate({
            name: oneReceiptName,
            params: {receipt_id: receipt._id, path: receipt.image.path},
        });
    }

    return (
        <View style={{width: "100%", paddingTop: 30, height: "75%"}}>
            {receipts_group.length > 0 && receipts.length > 0 && (
                <SectionList
                    sections={groupedReceiptsArray}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => {
                        if (item.sum >= 0 && item.receipt_id) {
                            let receipt = receipts.filter((receipt) => item.receipt_id == receipt._id)[0];
                            if(!receipt){
                                return <></>
                            }else{
                                return (<ReceiptItem receipt={receipt as Receipt} onPress={openReceipt}/>)
                            }
                        } else {
                            console.log("debt")
                            return (<DebtItem debt={item}/>)
                        }
                    }

                    }
                    renderSectionHeader={({section}) => (
                        <ReceiptsDateDivider date={section.title as Date}/>
                    )}
                    showsVerticalScrollIndicator={true}
                />
            )}
        </View>
    );
}
