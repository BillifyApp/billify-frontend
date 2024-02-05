import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  DimensionValue,
} from "react-native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import CustomButton from "../../components/atom/CustomButton";
import CustomText from "../../components/atom/CustomText";
import { COLORS } from "../../styles/colors";
import SelectGroupName from "../../components/template/groups/SelectGroupName";
import SelectGroupIcon from "../../components/template/groups/SelectGroupIcon";
import axios from "axios";
import { url } from "../../stores/constants";
import { useAuth } from "../../context/AuthContext";
import { Group } from "../../stores/types";
import { Icon } from "../../styles/fonts";

export default function CreateGroupScreen({ navigation }: any) {
  const { t } = useTranslation();
  const auth = useAuth().authState;
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
  async function createGroup() {
    try {
      const result = await axios.post(`${url}/groups/create`, {
        name: groupName,
        owner: auth?.id,
        icon: groupIcon,
      });
      //console.log(result.data);
      const newGroup: Group = result.data;
      navigation.navigate("GroupDetails",  {group: newGroup});
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <SafeAreaView>
      <View style={[styles.headingMargin, { height: "95%", marginTop: 60 }]}>
        <View style={{justifyContent:"center", alignItems:"center", width: "100%", paddingHorizontal: 10}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30,
              width: "100%",
            }}
          >
            <CustomText style={styles.h1}>
              {t("groups.create_group_heading")}
            </CustomText>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="x" size={20}/>
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
                console.log(icon);
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
                if(groupName.length > 0){
                  handleProgressBar(groupName, "75%");
                  setActiveStep("icon");
                }
                else{
                    //TODO show error message and highlight name input
                  alert("todo: show error message");
                }
              }}
            />
          )}
          {activeStep === "icon" && (
            <View style={{ flexDirection: "row" }}>
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
                  if(groupIcon.length > 0){
                    createGroup();
                  }
                 else{
                    alert("todo: show error message");
                 }
                }}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
