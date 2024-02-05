import React, { useEffect, useState } from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { Pressable, ScrollView, SectionList, Text, View } from "react-native";
import axios from "axios";
import { url } from "../../stores/constants";
import { homeName, oneReceiptName } from "../../stores/route_names";
import { useAuth } from "../../context/AuthContext";
import ReceiptListComponent from "../../components/atom/ReceiptListComponent";
import ReceiptItem from "../../components/atom/ReceiptsOverview/ReceiptItem";
import ReceiptsDateDivider from "../../components/atom/ReceiptsOverview/ReceiptsDateDivider";
import _ from "lodash";
import { Receipt } from "../../stores/types";
import { rh } from "../../utils/responsiveDimenstions";
import { Icon } from "../../styles/fonts";
import CustomText from "../../components/atom/CustomText";
import { styles } from "../../styles/styles";
import CustomInput from "../../components/atom/CustomInput";
import { t } from "i18next";

// @ts-ignore
function AllReceiptsScreen({ route, navigation }) {
    //const { user_id, path } = route.params;
    const authState = useAuth().authState;
    const [receipts, setReceipts] = useState<Receipt[] | null>(null);
    useEffect(() => {
        async function getReceipt() {
            return await axios
                .post(`${url}/receipts/latest`, {
                    user_id: authState?.id,
                })
                .then((res) => { 
                    res.data.forEach((receipt: any) => {
                        if(receipt.date_payed == null){
                            receipt.date_payed = receipt.date_created;
                        }
                    });
                    setReceipts(res.data);
                });
        }
        getReceipt();
        return () => {};
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

    function openReceipt(receipt: Receipt) {
        navigation.navigate({
            name: oneReceiptName,
            params: { receipt_id: receipt._id, path: receipt.image.path },
        });
    }
    return (
        <View style={{ width: "100%", paddingTop: 30, minHeight: rh(100) }}>
            <View style={[styles.headingMargin,{flexDirection:"row", alignItems:"center", justifyContent:"flex-start", width: "90%", alignSelf:"center"}]}>
                <Icon name="pfeil_l" size={20} onPress={()=>{
                    navigation.navigate(homeName);
                }}/>
                <CustomText style={[styles.h1, {paddingLeft: 25}]}>Meine Einkäufe</CustomText> 
                </View>
                <View style={{flexDirection:"row", alignItems:"center", width: "90%", alignSelf:"center", paddingVertical: 20}}>
            <CustomInput
              placeholder={t("common.search") + " (coming soon...)"}
              style={{ width: "90%"}}
            />
            <Icon name="filter" size={20} style={{paddingLeft: 20}}/>
          </View>
            {receipts && (
                <SectionList
                    sections={groupedReceiptsArray}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ReceiptItem
                            receipt={item as Receipt}
                            onPress={openReceipt}
                        />
                    )}
                    renderSectionHeader={({ section }) => (
                        <ReceiptsDateDivider date={section.title as Date} />
                    )}
                    showsVerticalScrollIndicator={true}
                />
            )}
        </View>
    );
}

export default AllReceiptsScreen;
