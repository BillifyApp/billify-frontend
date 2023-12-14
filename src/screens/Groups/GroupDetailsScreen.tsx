import { Image, View } from "react-native";
import { styles } from "../../styles/styles";
import CustomText from "../../components/atom/CustomText";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { Group } from "../../stores/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/colors";
import CustomButton from "../../components/atom/CustomButton";

type ParamList = {
  Group: {
    group: Group;
  };
};

export default function GroupDetailsScreen({ navigation }: any) {
  const { t } = useTranslation();

  //typescript is eh cool owa monchmoi bin i froh das mei laptop nu ned ausm fenster gflogn is
  const route = useRoute<RouteProp<ParamList, "Group">>();
  const { group } = route.params;
  return (
    <>
      <TouchableOpacity
        style={[
          styles.headingMargin,
          { justifyContent: "flex-start", alignItems: "center" },
        ]}
        onPress={() => navigation.navigate("GroupScreen")}
      >
        <Image source={require("../../assets/arrow-back.png")} />
        <CustomText style={styles.h1}>{t("groups.group_overview")}</CustomText>
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <View style={{ width: "90%" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: group.icon }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
            <View style={{ marginLeft: 20 }}>
              <CustomText style={styles.pMedium}>{group.name}</CustomText>
              <View style={{flexDirection:"row"}}>
              <CustomText style={{ color: COLORS.gray_dark }}>
                {t("common.groups.one") + " ·"}
              </CustomText>
              <CustomText style={{ paddingLeft: 5, color: COLORS.gray_dark }}>
                {group.users.length + 1 + " " + t("groups.members")}
              </CustomText>
              </View>
            </View>
          </View>
          <View style={{alignItems:"center"}}>
            <CustomButton title={t("groups.copy_code")} width="50%"/>
            <CustomButton title={t("groups.share_link")} width="50%"/>
          </View>
        </View>
      </View>
    </>
  );
}
