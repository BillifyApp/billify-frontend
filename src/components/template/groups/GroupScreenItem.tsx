import { useTranslation } from "react-i18next";
import { GestureResponderEvent, Image, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../styles/colors";
import { styles } from "../../../styles/styles";
import CustomText from "../../atom/CustomText";
import { Group } from "../../../stores/types";
import { Icon } from "../../../styles/fonts";


type Props={
    group: Group,
    onPress: (event: GestureResponderEvent) => void,
}

export default function GroupScreenItem({group, onPress}: Props) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={{ alignItems: "center", justifyContent: "center", width:"100%" }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderColor: COLORS.gray_dark,
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: group.icon }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
          <View style={{ paddingLeft: 10 }}>
            <CustomText style={styles.pMedium}>{group.name}</CustomText>
            <View style={{ flexDirection: "row" }}>
              <CustomText style={{ color: COLORS.gray_dark }}>
                {t("common.groups.one") + " ·"}
              </CustomText>
              <CustomText style={{ paddingLeft: 5, color: COLORS.gray_dark }}>
                {group.users.length + 1 + " " + t("groups.members")}
              </CustomText>
            </View>
          </View>
        </View>
        <Icon name="pfeil_r" size={20}/>
      </View>
    </TouchableOpacity>
  );
}
