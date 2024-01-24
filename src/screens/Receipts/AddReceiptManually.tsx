import { View } from "react-native";
import CustomText from "../../components/atom/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddReceiptManually(){
    return(
        <SafeAreaView>
           <CustomText> Add Receipt Manually </CustomText>
        </SafeAreaView>
    )
}