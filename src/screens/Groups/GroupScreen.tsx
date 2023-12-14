import { Text, View, Image, ScrollView } from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import CustomButton from "../../components/atom/CustomButton";
import axios from "axios";
import { url } from "../../stores/constants";
import { useAuth } from "../../context/AuthContext";
import CustomInput from "../../components/atom/CustomInput";
import GroupScreenItem from "../../components/template/groups/GroupScreenItem";
import { Group } from "../../stores/types";

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
  React.useEffect(() => {
    getGroups();
  }, []);
  const createGroup = () => {
    navigation.navigate("Group");
  };
  function openGroup(group: Group) {
    navigation.navigate("Group", {
      screen: "GroupDetails",
      params: { group: group },
    });
  }
  return (
    <CustomSafeAreaView>
      <View style={styles.headingMargin}>
        <Text style={styles.h1}>{t("common.groups.many")}</Text>
      </View>
      {!groups ? (
        <View style={{ justifyContent: "center", height: "90%" }}>
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
        <View>
          <CustomInput
            style={{ marginBottom: 20 }}
            placeholder={t("groups.searchbar")}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
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
    </CustomSafeAreaView>
  );
}
