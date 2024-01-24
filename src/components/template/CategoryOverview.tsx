import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import CustomText from "../atom/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CategoryOverviewProps {
  categories: string[];
  navigation: any;
}

function CategoryOverview({ categories, navigation }: CategoryOverviewProps) {
  const { t } = useTranslation();
  function showAllCategories(){
    navigation.navigate('CategoriesNavigation',{screen: 'CategoriesScreen'})
  }
  return (
    <View style={{ height: 120 }}>
      <View style={styles.subHeadingMargin}>
        <CustomText style={styles.h2}>{t("common.categories.many")}</CustomText>
        <TouchableOpacity onPress={showAllCategories}>
          <CustomText style={styles.p}>{t("common.show_all")}</CustomText>
          </TouchableOpacity>
        
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
