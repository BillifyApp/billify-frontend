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
import { rh, rw } from "../../../utils/responsiveDimenstions";


export default function DebtItem({debt}) {
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
        >
            <View
                style={{
                    flexDirection: "row",
                    width: rw(90),
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: rh(1.5),
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.primary_light,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 35,
                        width: rh(8),
                        height: rh(8),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                   <Icon
                        name={
                            receiptIcons[
                                "other" as keyof typeof receiptIcons
                            ]
                        }
                        size={25}
                        color={COLORS.gray_darker}
                    />
                </View>
                <View style={{ width: rw(50)}}>
                    <CustomNumberText>
                        {numberFormatter.format(Number(debt.sum))}
                    </CustomNumberText>
                    <View style={{ flexDirection: "row" }}>
                        <CustomText style={styles.p}>{
                            `Schulden beglichen`
                        }
                        </CustomText>
                    </View>
                </View>
                <Icon name="pfeil_r" size={20} style={{paddingLeft: rw(12)}} />
            </View>
        </TouchableOpacity>
    );
}
