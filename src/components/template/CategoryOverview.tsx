import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import CustomText from "../atom/CustomText";

interface CategoryOverviewProps {
  categories: string[];
}

function CategoryOverview({ categories }: CategoryOverviewProps) {
  const { t } = useTranslation();
  return (
    <View style={{ height: 120 }}>
      <View style={styles.subHeadingMargin}>
        <CustomText style={styles.h2}>{t("common.categories.many")}</CustomText>
        <CustomText style={styles.p}>{t("common.show_all")}</CustomText>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          {categories.map((c, key) => (
            <View key={key} style={styles.categoryItem}>
              <CustomText >{c}</CustomText>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default CategoryOverview;
