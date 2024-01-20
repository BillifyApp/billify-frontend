import { View, Image } from "react-native";
import { styles } from "../../../styles/styles";
import CustomText from "../../atom/CustomText";
import CustomInput from "../../atom/CustomInput";
import { COLORS } from "../../../styles/colors";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { GroupIcons } from "../../../utils/groupIcons";
type Props = {
  onPress: Function;
};

export default function SelectGroupIcon({ onPress }: Props) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number|null>(null);

  const groupIconStrings = [
    "../../../assets/group-pictures/einkaufen.png",
    "../../../assets/group-pictures/partner.png",
    "../../../assets/group-pictures/party.png",
    "../../../assets/group-pictures/reisen.png",
    "../../../assets/group-pictures/freunde.png",
    "../../../assets/group-pictures/wg.png"
  ]

  //TODO get group icons from backend

  return (
    <View>
      <CustomText style={[styles.pMedium, { marginBottom: 10 }]}>
        {t("groups.select_group_icon")}
      </CustomText>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          flexWrap: "wrap", 
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {GroupIcons.map((icon, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ flexBasis: "27%", margin: 8 }}
              onPress={() => {
                onPress(icon.name), setActiveIndex(index);
              }}
            >
              <Image
                source={icon.source}
                style={[
                  activeIndex === index
                    ? { borderWidth: 3, borderColor: COLORS.primary }
                    : {},
                  {
                    width: 120,
                    height: 120,
                    borderRadius: 8,
                  },
                ]}
              />
              {activeIndex === index && (
                <Image
                  source={require("../../../assets/icons/checked.png")}
                  style={{ position: "absolute",
                bottom: -10, right: -15, width: 25, height: 25 }}
                />
              )}
            </TouchableOpacity>
            
          );
        })}
      </View>
    </View>
  );
}
