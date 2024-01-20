import { View, Image } from "react-native";
import { styles } from "../../../styles/styles";
import CustomText from "../../atom/CustomText";
import CustomInput from "../../atom/CustomInput";
import { COLORS } from "../../../styles/colors";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  onPress: Function;
};

export default function SelectGroupIcon({ onPress }: Props) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number|null>(null);
  //TODO get group icons from backend
  const groupIconSources = [
    require("../../../assets/group-pictures/einkaufen.png"),
    require("../../../assets/group-pictures/partner.png"),
    require("../../../assets/group-pictures/party.png"),
    require("../../../assets/group-pictures/reisen.png"),
    require("../../../assets/group-pictures/freunde.png"),
    require("../../../assets/group-pictures/wg.png")
  ];

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
        {groupIconSources.map((source, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ flexBasis: "43%", margin: 8 }}
              onPress={() => {
                onPress(source), setActiveIndex(index);
              }}
            >
              <Image
                source={source}
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
                bottom: -10, right: -5, width: 25, height: 25 }}
                />
              )}
            </TouchableOpacity>
            
          );
        })}
      </View>
    </View>
  );
}
