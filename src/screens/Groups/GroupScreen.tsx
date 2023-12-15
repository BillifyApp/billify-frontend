import { Text, View, Image, ScrollView } from "react-native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import CustomButton from "../../components/atom/CustomButton";
import axios from "axios";
import { url } from "../../stores/constants";
import { useAuth } from "../../context/AuthContext";
import CustomInput from "../../components/atom/CustomInput";
import GroupScreenItem from "../../components/template/groups/GroupScreenItem";
import { Group } from "../../stores/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function GroupScreen({ navigation }: any) {
  const { t } = useTranslation();
  const auth = useAuth().authState;
  const [groups, setGroups] = React.useState<Group[] | null>(null);
  async function getGroups() {
    try {
      const id = auth?.id;
      const result = await axios.get(`${url}/groups/find/${id}`);
      console.log(result.data);
      setGroups(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getGroups();
    }, [])
  );
  const createGroup = () => {
    navigation.navigate("CreateGroup");
  };
  function openGroup(group: Group) {
    navigation.navigate("GroupDetails", { group: group });
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"white"}}>
      <View style={styles.headingMargin}>
        <Text style={styles.h1}>{t("common.groups.many")}</Text>
      </View>
      {!groups ? (
        <View style={{ justifyContent: "center", height: "90%", flex: 1 }}>
          <View
            style={[
              styles.container,
              {
                height: "50%",
                justifyContent: "space-between",
                marginTop: 100,
              },
            ]}
          >
            <View style={[styles.container, { width: "75%" }]}>
              <Image source={require("../../assets/icons/users.png")} />
              <Text style={styles.h2}>{t("groups.no_groups")}</Text>
              <Text style={[styles.h3, { textAlign: "center" }]}>
                {t("groups.no_groups_desc")}
              </Text>
            </View>
            <CustomButton
              title={t("groups.create_group")}
              width="50%"
              onPress={createGroup}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{justifyContent:"center", alignItems:"center"}}>
          <CustomInput
            style={{ marginBottom: 20, width:"90%" }}
            placeholder={t("groups.searchbar")}
          />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width:"100%", height:"100%"}}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {groups.map((group, index) => {
                return (
                  <GroupScreenItem
                    key={index}
                    group={group}
                    onPress={() => {
                      openGroup(group);
                    }}
                  />
                );
              })}
              <CustomButton
                title={t("groups.create_group")}
                width="50%"
                onPress={createGroup}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
