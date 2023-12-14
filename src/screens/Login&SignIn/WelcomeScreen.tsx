import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import LoginScreen from "./LoginScreen";
import SignInScreen from "./SignInScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS } from "../../styles/colors";
import CustomButton from "../../components/atom/CustomButton";
import CustomText from "../../components/atom/CustomText";

function WelcomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = useMemo(() => ["25%", "75%"], []);
  return (
    <>
      <SafeAreaView>
            <View
              style={{
                backgroundColor: COLORS.primary_light,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={require("../../assets/logoSmall.png")} />
              <CustomText style={[styles.h1, { marginVertical: 180, paddingBottom: 50, width: "50%", textAlign: "center" }]}>
                {t("common.welcome_screen_title")}
              </CustomText>
              <View style={{ width: "80%" }}>
                <CustomButton
                  title={t("common.create_account")}
                  onPress={() => {
                    setActiveModal("signin");
                    handlePresentModalPress();
                  }}
                />
                <CustomButton
                  title={t("common.already_have_account")}
                  type="secondary"
                  onPress={() => {
                    setActiveModal("login");
                    handlePresentModalPress();
                  }}
                />
              </View>
            </View>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backgroundStyle={{ backgroundColor: "white" }}
            >
              {activeModal === "login" && <LoginScreen />}
              {activeModal === "signin" && <SignInScreen />}
            </BottomSheetModal>
      </SafeAreaView>
    </>
  );
}

export default WelcomeScreen;
