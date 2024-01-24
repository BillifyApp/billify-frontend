import { View, Image, Dimensions } from "react-native";
import { styles } from "../../../styles/styles";
import CustomText from "../../atom/CustomText";
import CustomInput from "../../atom/CustomInput";
import { COLORS } from "../../../styles/colors";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { GroupIcons } from "../../../utils/groupIcons";
import { rh, rw } from "../../../utils/responsiveDimenstions";
import { Icon } from "../../../styles/fonts";
type Props = {
  onPress: Function;
};

export default function SelectGroupIcon({ onPress }: Props) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number|null>(null);

  return (
    <View>
      <CustomText style={[styles.pMedium, { marginBottom: 10 }]}>
        {t("groups.select_group_icon")}
      </CustomText>
      <View
        style={{
          width: rw(95),
          flexDirection: "row",
          flexWrap: "wrap", 
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {GroupIcons.map((icon, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ margin: rw(2) }}
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
                    width: rw(27),
                    height: rh(15),
                    borderRadius: 8,
                  },
                ]}
              />
              {activeIndex === index && (
                <View style={{ position: "absolute",
                bottom: -10, right: -12, width: 25, height: 25, backgroundColor: COLORS.primary_light, borderColor: COLORS.primary, borderWidth: 1, borderRadius: 13, justifyContent: "center", alignItems: "center" }}>
                <Icon
                  name="Vector"
                  color={COLORS.primary}
                  
                />
                </View>
              )}
            </TouchableOpacity>
            
          );
        })}
      </View>
    </View>
  );
}
