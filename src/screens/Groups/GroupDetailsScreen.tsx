import { View, Image } from "react-native";
import { styles } from "../../styles/styles";
import CustomText from "../../components/atom/CustomText";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

export default function GroupDetailsScreen({ navigation }: any) {
  const { t } = useTranslation();
  return (
    <>
      <TouchableOpacity
        style={[
          styles.headingMargin,
          { justifyContent: "flex-start", alignItems: "center" },
        ]}
        onPress={() => navigation.navigate("Group")}
      >
        <Image source={require("../../assets/arrow-back.png")} />
        <CustomText style={styles.h1}>{t("groups.group_overview")}</CustomText>
      </TouchableOpacity>
    </>
  );
}
