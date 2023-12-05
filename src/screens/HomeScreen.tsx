import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import { useTranslation } from "react-i18next";
import CategoryOverview from "../components/template/CategoryOverview";
import GroupOverview from "../components/template/GroupOverview";
import { styles } from "../styles/styles";
import axios from "axios";
import { url } from "../stores/constants";
import LastBillsOverview from "../components/template/LastBillsOverview";
import { useIsFocused } from "@react-navigation/native";
import AddReceiptButton from "../components/atom/AddReceiptButton";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import UploadModal from "./UploadModal";

// @ts-ignore
export default function HomeScreen({ navigation }) {
  const authState = useAuth().authState;

  const { t } = useTranslation();
  const [latestReceipts, setLatestReceipts] = useState<any | null>(null);

  // check if screen is focused
  const isFocused = useIsFocused();

  // listen for isFocused, if useFocused changes
  // call the function that you use to mount the component.

  //a variable to check if all the data is loaded
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getReceipts() {
      return await axios
        .post(`${url}/receipts/latest`, {
          user_id: authState?.id,
        })
        .then((res) => {
          setLatestReceipts(res.data);
          setLoading(false);
        });
    }

    isFocused && getReceipts();
    return () => {};
  }, [latestReceipts, isFocused]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const snapPoints = useMemo(() => ['25%', "66%"], []);

  return (
    <CustomSafeAreaView>
      <BottomSheetModalProvider  >
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
            <LastBillsOverview bills={latestReceipts} navigation={navigation} isLoading={loading} />
          
          

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
        onPress={handlePresentModalPress}
      />
      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{backgroundColor: '#E0E0E0'}}
        >
          <UploadModal navigation={navigation}/>
        </BottomSheetModal>
      </BottomSheetModalProvider>
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
