import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  DimensionValue,
} from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import CustomButton from "../../components/atom/CustomButton";
import CustomInput from "../../components/atom/CustomInput";
import CustomText from "../../components/atom/CustomText";
import { COLORS } from "../../styles/colors";
import SelectGroupName from "../../components/template/groups/SelectGroupName";
import SelectGroupIcon from "../../components/template/groups/SelectGroupIcon";

export default function CreateGroupScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = React.useState("name");
  const [width, setWidth] = React.useState<DimensionValue>("25%");
  const [groupName, setGroupName] = React.useState("");
  const [groupIcon, setGroupIcon] = React.useState("");

  function handleProgressBar(text?: string, value?: DimensionValue) {
    if (text && text.length > 0 && !value) {
      setWidth("50%");
    } else if (value) {
      setWidth(value);
    } else {
      setWidth("25%");
    }
  }
  function createGroup(){
    //TODO create group in backend
    navigation.navigate("GroupDetails");
  }
  return (
    <SafeAreaView style={{ height: "100%" }}>
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
          {activeStep === "name" && (
            <SelectGroupName
            value={groupName}
              onChangeText={(text: string): any => {
                handleProgressBar(text), setGroupName(text);
              }}
            />
          )}
          {activeStep === "icon" && (
            <SelectGroupIcon
              onPress={(icon: string) => {
                setGroupIcon(icon), handleProgressBar(groupName, "110%");
              }}
            />
          )}
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 40, width: "100%" }}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 10,
            width: width,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        ></View>
        <View
          style={{
            borderTopColor: COLORS.gray_mid,
            borderTopWidth: 1,
            alignItems: "flex-end",
          }}
        >
          {activeStep === "name" && (
            <CustomButton
            title={t("common.next")}
            type={groupName.length > 0 ? "primary" : "outline"}
            style={{ width: "40%", marginTop: 20, marginRight: 15 }}
            onPress={() => {
              handleProgressBar(groupName, "75%");
              setActiveStep("icon");
            }}
          />
          )}
          {activeStep === "icon" && (
            <View style={{flexDirection: "row"}}>
            <CustomButton
            title={t("common.back")}
            type={"outline"}
            style={{ width: "40%", marginTop: 20, marginRight: 20 }}
            onPress={() => {
              handleProgressBar(groupName, "50%");
              setActiveStep("name");
            }}
          />
            <CustomButton
            title={t("common.create")}
            type={groupIcon.length > 0 ? "primary" : "outline"}
            style={{ width: "40%", marginTop: 20, marginRight: 20 }}
            onPress={() => {
              createGroup();
            }}
          /></View>
          )}
          
        </View>
      </View>
    </SafeAreaView>
  );
}
