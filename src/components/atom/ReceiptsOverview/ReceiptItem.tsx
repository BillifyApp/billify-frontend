import { View } from "react-native";
import { Receipt } from "../../../stores/types";
import CustomText from "../CustomText";
import { styles } from "../../../styles/styles";
import CustomNumberText from "../CustomNumberText";
import { Icon } from "../../../styles/fonts";
import { COLORS } from "../../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect } from "react";
import { receiptIcons } from "../../../utils/receiptIcons";

interface ReceiptItemProps {
    receipt: Receipt;
    onPress: Function;
}

export default function ReceiptItem({ receipt, onPress }: ReceiptItemProps) {
    const numberFormatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });
    return (
        <TouchableOpacity
            style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={()=>{onPress(receipt)}}
        >
            <View
                style={{
                    flexDirection: "row",
                    width: "90%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 17,
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.primary_light,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 35,
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Icon
                        name={
                            receiptIcons[
                                receipt.category_id as keyof typeof receiptIcons
                            ]
                        }
                        size={25}
                        color={COLORS.gray_darker}
                    />
                </View>
                <View>
                    <CustomNumberText>
                        {numberFormatter.format(Number(receipt.total))}
                    </CustomNumberText>
                    <View style={{ flexDirection: "row" }}>
                        <CustomText style={styles.p}>
                            {receipt.comp_name} {receipt.address} ·{" "}
                        </CustomText>
                        <CustomNumberText
                            style={{
                                fontSize: 14,
                                fontFamily: "Inter-Regular",
                            }}
                        >
                            {receipt.items.length}
                        </CustomNumberText>
                        <CustomText> Artikel</CustomText>
                    </View>
                </View>
                <Icon name="pfeil_r" size={20} />
            </View>
        </TouchableOpacity>
    );
}
