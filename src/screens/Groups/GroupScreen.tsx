import { Text, View, Image } from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import CustomButton from "../../components/atom/CustomButton";

export default function GroupScreen({ navigation }: any) {
  const { t } = useTranslation();

  //TODO: get groups from backend
  /* const groups = [
    { name: "Eine Testgruppe" },
    { name: "Zweite Testgruppe" },
    { name: "Dritte Testgruppe" },
    { name: "Vierte Testgruppe" },
  ]; */
  const groups = null;
  const createGroup = () => {
    navigation.navigate("CreateGroup");
  };
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
        <>
          <Text>Test</Text>
        </>
      )}
    </CustomSafeAreaView>
  );
}
