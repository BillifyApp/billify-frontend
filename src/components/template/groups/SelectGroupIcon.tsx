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
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
  ];

  //TODO get group icons from backend

  return (
    <View>
      <CustomText style={[styles.pMedium, { marginBottom: 10 }]}>
        {t("groups.select_group_icon")}
      </CustomText>
      <View
        style={{
          width: "95%",
          height: 170,
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
              style={{ flexBasis: "31%", margin: 10 }}
              onPress={() => {
                onPress(source), setActiveIndex(index);
              }}
            >
              <Image
                source={{ uri: source }}
                style={[
                  activeIndex === index
                    ? { borderWidth: 3, borderColor: COLORS.primary }
                    : {},
                  {
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                  },
                ]}
              />
              {activeIndex === index && (
                <Image
                  source={require("../../../assets/icons/checked.png")}
                  style={{ position: "absolute",
                bottom: -10, right: -10, width: 25, height: 25 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
