import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CustomButton from "../components/atom/CustomButton";
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
} from "@gorhom/bottom-sheet";
import UploadModal from "./UploadModal";
import CustomInput from "../components/atom/CustomInput";
import { COLORS } from "../styles/colors";
import { BlurView } from "expo-blur";
import FadeView from "../components/atom/FadeView";
import CustomText from "../components/atom/CustomText";

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
    setModalActive(true);
  }, []);
  const [modalActive, setModalActive] = useState(false);
  const handleSheetChanges = useCallback((index: number) => {
/*     if (index === 1) {
      setModalActive(true);
    } else {
      setModalActive(false);
    } */
    if(index===-1){
      setModalActive(false);
    }
  }, []);
  const snapPoints = useMemo(() => ["25%", "66%"], []);

  return (
    <CustomSafeAreaView>
      <BottomSheetModalProvider>
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
          <FadeView style={homeStyles.absolute} duration={1000}>
            <BlurView
              style={[
                modalActive ? homeStyles.visible : homeStyles.hidden,
                homeStyles.absolute,
              ]}
              intensity={10}
              tint="light"
            />
          </FadeView>
        )}
      </BottomSheetModalProvider>
    </CustomSafeAreaView>
  );
}
const homeStyles = StyleSheet.create({
  header: { marginHorizontal: 15, marginTop: 40, marginBottom: 10 },
  searchContainer: { justifyContent: "center", alignItems: "center" },
  absolute: {
    transition: "opacity 5s ease",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  visible: {
    transition: "opacity 5s ease",
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
});
