import { View } from "react-native";
import { styles } from "../../../styles/styles";
import CustomText from "../../atom/CustomText";
import CustomInput from "../../atom/CustomInput";
import { COLORS } from "../../../styles/colors";
import { useTranslation } from "react-i18next";

type Props = {
  value: string;
  onChangeText: Function;
};

export default function SelectGroupName({value, onChangeText }: Props) {
  const { t } = useTranslation();
  return (
    <View style={{width: "100%"}}>
      <CustomText style={[styles.pMedium, { marginBottom: 10 }]}>
        {t("groups.choose_name")}
      </CustomText>
      <CustomInput
        placeholder={t("groups.group_name")}
        placeholderTextColor={COLORS.gray_darker}
        value={value}
        style={{ borderRadius: 8, backgroundColor: COLORS.white, width: "100%" }}
        onChangeText={(text: string) => {
          onChangeText(text);
        }}
      />
    </View>
  );
}
