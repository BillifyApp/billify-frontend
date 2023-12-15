import { ScrollView, View, StyleSheet } from "react-native";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import CategoryOverview from "../components/template/CategoryOverview";
import GroupOverview from "../components/template/GroupOverview";
import { styles } from "../styles/styles";
import { blur } from "../styles/blur";
import axios from "axios";
import { url } from "../stores/constants";
import LastBillsOverview from "../components/template/LastBillsOverview";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import AddReceiptButton from "../components/atom/AddReceiptButton";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import UploadModal from "./UploadModal";
import CustomInput from "../components/atom/CustomInput";
import { COLORS } from "../styles/colors";
import { BlurView } from "expo-blur";
import FadeView from "../components/atom/FadeView";
import CustomText from "../components/atom/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Group } from "../stores/types";

// @ts-ignore
export default function HomeScreen({ navigation }) {
  const authState = useAuth().authState;

  const { t } = useTranslation();
  const [latestReceipts, setLatestReceipts] = useState<any | null>(null);
  const [latestGroups, setLatestGroups] = useState<Group[] | null>(null);

  // check if screen is focused
  const isFocused = useIsFocused();

  // listen for isFocused, if useFocused changes
  // call the function that you use to mount the component.

  //a variable to check if all the data is loaded
  const [loading, setLoading] = useState(true);

  async function getGroups() {
    try {
      const result = await axios.get(
        `${url}/groups/find/lastFive/${authState?.id}`
      );
      console.log(result.data);
      setLatestGroups(result.data);
    } catch (e) {
      console.log(e);
    }
  }

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
  
  useFocusEffect(
    useCallback(() => {
      getGroups();
    }, [])
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setModalActive(true);
  }, []);
  const [modalActive, setModalActive] = useState(false);
  const handleSheetChanges = useCallback((index: number) => {
    /*     if (index === 1) {
      setModalActive(true);
    } else {
      setModalActive(false);
    } */
    if (index === -1) {
      setModalActive(false);
    }
  }, []);
  const snapPoints = useMemo(() => ["25%", "66%"], []);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "white" }}>
          <CustomText style={[styles.h1, homeStyles.header]}>
            {t("common.welcome")},{" "}
            {authState?.firstname ? authState.firstname : authState?.username}
          </CustomText>
          <View style={homeStyles.searchContainer}>
            <CustomInput
              placeholder={t("common.search")}
              style={{ width: "90%" }}
            />
          </View>
          <LastBillsOverview
            bills={latestReceipts}
            navigation={navigation}
            isLoading={loading}
          />

          <CategoryOverview
            categories={["Groceries", "Clothing", "Entertainment"]}
          />
          {latestGroups && <GroupOverview groups={latestGroups} />}
        </View>
      </ScrollView>
      <AddReceiptButton title="+" onPress={handlePresentModalPress} />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: COLORS.gray_light }}
      >
        <UploadModal navigation={navigation} />
      </BottomSheetModal>
      {modalActive && (
        <FadeView style={blur.absolute} duration={500}>
          <BlurView
            style={[modalActive ? blur.visible : blur.hidden, blur.absolute]}
            intensity={10}
            tint="light"
          />
        </FadeView>
      )}
    </SafeAreaView>
  );
}
const homeStyles = StyleSheet.create({
  header: { marginHorizontal: 15, marginTop: 40, marginBottom: 10 },
  searchContainer: { justifyContent: "center", alignItems: "center" },
});
