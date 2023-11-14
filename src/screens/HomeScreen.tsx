import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import { useTranslation } from "react-i18next";
import CategoryOverview from "../components/template/CategoryOverview";
import GroupOverview from "../components/template/GroupOverview";
import { uploadName } from "../stores/route_names";
import { styles } from "../styles/styles";
import axios from "axios";
import { url } from "../stores/constants";
import LastBillsOverview from "../components/template/LastBillsOverview";
import { useIsFocused } from "@react-navigation/native";
import AddReceiptButton from "../components/atom/AddReceiptButton";

// @ts-ignore
export default function HomeScreen({ navigation }) {
  const authState = useAuth().authState;

  const { t } = useTranslation();
  const [latestReceipts, setLatestReceipts] = useState<any | null>(null);

  // check if screen is focused
  const isFocused = useIsFocused();

  // listen for isFocused, if useFocused changes
  // call the function that you use to mount the component.

  useEffect(() => {
    async function getReceipts() {
      return await axios
        .post(`${url}/receipts/latest`, {
          user_id: authState?.id,
        })
        .then((res) => {
          setLatestReceipts(res.data);
        });
    }

    isFocused && getReceipts();
    return () => {};
  }, [latestReceipts, isFocused]);

  /*TODO fill with real data*/
  return (
    <CustomSafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "white" }}>
          <Text style={[styles.h1, homeStyles.header]}>
            {t("common.welcome")},{" "}
            {authState?.firstname ? authState.firstname : authState?.username}
          </Text>
          <View style={homeStyles.searchContainer}>
            <TextInput style={homeStyles.searchbar}>
              <Text>Search</Text>
            </TextInput>
          </View>
          {/* <Text style={styles.h2}>TODO Search</Text> */}

          {latestReceipts != null ? (
            <LastBillsOverview bills={latestReceipts} navigation={navigation} />
          ) : (
            <View>
              <Text>
                LOL todo here maybe vorschlag zum hinzufügen von einer rechnung?
              </Text>
            </View>
          )}

          <CategoryOverview
            categories={["Groceries", "Clothing", "Entertainment"]}
          />
          <GroupOverview
            groups={[
              { name: "Eine Testgruppe" },
              { name: "Zweite Testgruppe" },
              { name: "Dritte Testgruppe" },
              { name: "Vierte Testgruppe" },
            ]}
          />
        </View>
      </ScrollView>
      <AddReceiptButton
        title="+"
        onPress={() => {
          navigation.navigate(uploadName);
        }}
      />
    </CustomSafeAreaView>
  );
}
const homeStyles = StyleSheet.create({
  header: { marginHorizontal: 15, marginTop: 20, marginBottom: 10 },
  searchContainer: { justifyContent: "center", alignItems: "center" },
  searchbar: {
    width: "93%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#eee",
    paddingLeft: 10,
  },
});
