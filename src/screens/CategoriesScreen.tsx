import { View } from "react-native";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import CustomText from "../components/atom/CustomText";
import CustomButton from "../components/atom/CustomButton";
import { styles } from "../styles/styles";
import { COLORS } from "../styles/colors";
import CustomInput from "../components/atom/CustomInput";
import { t } from "i18next";
import { ScrollView } from 'react-native';
import React, { useState } from 'react';



export enum Categories {
  education = 'education',
  electronics = 'electronics',
  recreation = 'recreation',
  gifts = 'gifts',
  health = 'health',
  household = 'household',
  pets = 'pets',
  hobbies = 'hobbies',
  clothing = 'clothing',
  groceries = 'groceries',
  travel = 'travel',
  transport = 'transport',
  other = 'other',
}

export default function CategoriesScreen (){
    return (
        <CustomSafeAreaView>

          <View style={styles.headingMargin}>
                  <CustomText style={styles.h1}>{t("common.categories.many")}</CustomText>
          </View>

          <View style={ {justifyContent: "center", alignItems: "center", marginTop: 10 } }>
               <CustomInput
                placeholder={t("common.search")}
                style={{ width: 382, height: 50 }}
                />
          </View>    



          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 15, marginLeft: 20, marginRight: 20 }}>
  {Object.values(Categories).map((category, index) => (
    <View key={index} style={{ marginBottom: 15, backgroundColor: COLORS.gray_light, height: 100, width: '48%', borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <CustomText style={{ marginLeft: 5, marginRight: 5 }}>{'\u2022'}</CustomText>
      <CustomText style={styles.pMedium}>{t(`common.Categories.${category}`)}</CustomText>
    </View>
  ))}
</ScrollView>
          
              

              
        </CustomSafeAreaView>
      );
}


