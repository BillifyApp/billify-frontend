import { View } from "react-native";
import CustomText from "../CustomText";
import { COLORS } from "../../../styles/colors";

interface ReceiptsDateDividerProps {
    date: Date;
}

export default function ReceiptsDateDivider({
    date,
}: ReceiptsDateDividerProps) {
    const dateFormatter = new Intl.DateTimeFormat("de-DE", {
        month: "long",
        day: "numeric",
    });
    return (
        <View
            style={{
                backgroundColor: COLORS.gray_light,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: COLORS.gray_dark,
            }}
        >
            <CustomText
                style={{
                    color: COLORS.gray_darker,
                    paddingLeft: 25,
                    paddingTop: 2,
                }}
            >
                {dateFormatter.format(date)}
            </CustomText>
        </View>
    );
}
