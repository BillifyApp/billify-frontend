import { View } from "react-native";
import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import CustomText from "../components/atom/CustomText";
import { COLORS } from "../styles/colors";
import {Icon} from "../styles/fonts"

interface CustomToastProps extends ToastProps {
    text1?: string;
    text2?: string;
    icon?: string;
}

export const toastConfig = {
    receiptAdded: ({ icon = "Vector", ...props}: CustomToastProps) => (
        <View
            style={{
                height: 60,
                width: "60%",
                backgroundColor: "#fff",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 20,
                shadowColor: COLORS.gray_darker,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                elevation: 10,
            }}
        >
            {icon && <Icon name={icon}  color={"green"} size={20} />}
            <View>
            <CustomText>{props.text1}</CustomText>
            <CustomText>{props.text2}</CustomText>
            </View>
        </View>
    ),
};
