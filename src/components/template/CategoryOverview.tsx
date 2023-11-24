import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/styles";

interface CategoryOverviewProps {
  categories: string[];
}

function CategoryOverview({ categories }: CategoryOverviewProps) {
  const { t } = useTranslation();
  return (
    <View style={{ height: 110 }}>
      <View style={styles.headingMargin}>
        <Text style={styles.h2}>{t("common.categories.many")}</Text>
        <Text>{t("common.show_all")}</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          {categories.map((c, key) => (
            <View key={key} style={styles.categoryItem}>
              <Text >{c}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default CategoryOverview;
