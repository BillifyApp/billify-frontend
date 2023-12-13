import { Text, View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import CustomButton from "../../components/atom/CustomButton";
import CustomInput from "../../components/atom/CustomInput";
import CustomText from "../../components/atom/CustomText";
import { COLORS } from "../../styles/colors";

export default function CreateGroupScreen({ navigation }: any) {
  const { t } = useTranslation();
  const width = "25%";
  return (
    <SafeAreaView style={{height: "100%"}}>
      <View style={styles.headingMargin}>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
              width: "90%",
              marginBottom: 30,
            }}
          >
            <CustomText style={styles.h1}>
              {t("groups.create_group_heading")}
            </CustomText>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require("../../assets/icons/cancel.png")} />
            </TouchableOpacity>
          </View>
          <CustomText style={[styles.pMedium, {marginBottom: 10}]}>
            {t("groups.choose_name")}
          </CustomText>
          <CustomInput
            placeholder={t("groups.group_name")}
            style={{ borderRadius: 8 }}
          />
        </View>
        
      </View>
      <View style={{position: "absolute", bottom: 40, width: "100%"}}>
          <View
            style={{
              backgroundColor: COLORS.primary,
              height: 10,
              width: width,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          ></View>
          <View style={{borderTopColor: COLORS.gray_mid, borderTopWidth: 1, alignItems: "flex-end"}}>
            <CustomButton title={t("common.next")} type="outline" style={{width:"30%", marginTop: 20, marginRight: 15 }}/>
          </View>
        </View>
    </SafeAreaView>
  );
}
