import { Dimensions, Image, Modal, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/styles";
import { popup } from "../../styles/popup";
import { blur } from "../../styles/blur";
import CustomText from "../../components/atom/CustomText";
import { useTranslation } from "react-i18next";
import { Group, Receipt } from "../../stores/types";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/colors";
import CustomButton from "../../components/atom/CustomButton";
import { useCallback, useState } from "react";
import axios from "axios";
import { url } from "../../stores/constants";
import AddReceiptButton from "../../components/atom/AddReceiptButton";
import FadeView from "../../components/atom/FadeView";
import { BlurView } from "expo-blur";
import SearchBar from "../../components/SearchBar";
import { addMember } from "../../stores/route_names";
import { Icon } from "../../styles/fonts";
import { SafeAreaView } from "react-native-safe-area-context";

type ParamList = {
    Group: {
        group: Group;
    };
};

export default function GroupDetailsScreen({ navigation }: any) {
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [addGroupOptionsVisible, setAddGroupOptionsVisible] = useState(false);
    //typescript is eh cool owa monchmoi bin i froh das mei laptop nu ned ausm fenster gflogn is
    const route = useRoute<RouteProp<ParamList, "Group">>();
    const { group } = route.params;
    const [receipts, setReceipts] = useState<Receipt[] | null>(null);
    let ScreenHeight = Dimensions.get("window").height;
    async function deleteGroup() {
        try {
            console.log(group._id);
            const result = await axios.delete(`${url}/groups/${group._id}`);
            console.log(result.data);
            console.log(result.data.deletedCount + " groups deleted");
            navigation.navigate("GroupScreen");
        } catch (e) {
            console.log(e);
        }
    }

    async function getReceipts() {
        try {
            const result = await axios.post(`${url}/receipts/findManyById`, {
                receipt_id: group.receipts,
            });
            setReceipts(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getReceipts();
            console.log(group);
        }, [])
    );
    return (
        <SafeAreaView>
            <TouchableOpacity
                style={[
                    styles.headingMargin,
                    { justifyContent: "flex-start", alignItems: "baseline" },
                ]}
                onPress={() => navigation.navigate("GroupScreen")}
            >
                <Icon name="pfeil_l" size={20} style={{ marginRight: 20 }} />
                <CustomText style={styles.h1}>
                    {t("groups.group_overview")}
                </CustomText>
            </TouchableOpacity>
            <View style={{ alignItems: "center", marginTop: 30 }}>
                <View style={{ width: "90%", minHeight: "86%" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={{ uri: group.icon }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 10,
                                }}
                            />
                            <View style={{ marginLeft: 20 }}>
                                <CustomText style={styles.pMedium}>
                                    {group.name}
                                </CustomText>
                                <View style={{ flexDirection: "row" }}>
                                    <CustomText
                                        style={{ color: COLORS.gray_dark }}
                                    >
                                        {t("common.groups.one") + " ·"}
                                    </CustomText>
                                    <CustomText
                                        style={{
                                            paddingLeft: 5,
                                            color: COLORS.gray_dark,
                                        }}
                                    >
                                        {group.users.length +
                                            1 +
                                            " " +
                                            t("groups.members")}
                                    </CustomText>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <CustomText style={styles.h2}>...</CustomText>
                        </TouchableOpacity>

                        <View></View>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            animationType="fade"
                        >
                            <View style={popup.centeredView}>
                                <View style={popup.modalView}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "40%",
                                        }}
                                    >
                                        <CustomText style={styles.h2}>
                                            {"Options"}
                                        </CustomText>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Icon name="x" size={18} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <CustomButton
                                            title={t("groups.add_member")}
                                            onPress={() => {
                                                setModalVisible(false);
                                                navigation.navigate(addMember, {
                                                    group_id: group._id,
                                                });
                                            }}
                                        />
                                        <CustomButton
                                            title={t("groups.delete")}
                                            style={{ backgroundColor: "red" }}
                                            onPress={deleteGroup}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    {group.receipts.length > 0 ? (
                        <View>
                            {receipts &&
                                receipts.map(
                                    (receipt: Receipt, key: number) => {
                                        return (
                                            <CustomText
                                                key={key}
                                                style={styles.pMedium}
                                            >
                                                {receipt.comp_name +
                                                    " " +
                                                    receipt.total +
                                                    " €"}
                                            </CustomText>
                                        );
                                    }
                                )}
                        </View>
                    ) : (
                        <>
                            {/* <View style={{alignItems: "center", marginTop: 150}}>
                    <CustomText style={[styles.pMedium, {marginBottom: 20}]}>
                        {t("groups.invite_users")}
                    </CustomText>
                    <CustomButton
                        title={t("groups.copy_code")}
                        style={{width: "60%", marginBottom: 30}}
                    />
                    <CustomButton title={t("groups.share_link")} width="60%"/>
                </View> */}
                        </>
                    )}
                    {!addGroupOptionsVisible && (
                        <AddReceiptButton
                            name="add"
                            onPress={() => {
                                setAddGroupOptionsVisible(true);
                            }}
                        />
                    )}

                    <Modal
                        transparent={true}
                        visible={addGroupOptionsVisible}
                        animationType="fade"
                    >
                        <View style={popup.bottomView}>
                            <View style={{display:"flex", flexDirection:"column", backgroundColor:"black"}}>
                                <CustomButton
                                    title="TODO Schulden begleichen"
                                    type="secondary"
                                />
                                <CustomButton
                                    title="TODO Rechnung dieser Gruppe hinzufügen"
                                    type="secondary"
                                />
                                <AddReceiptButton
                                    name="x"
                                    onPress={() => {
                                        setAddGroupOptionsVisible(false);
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            {addGroupOptionsVisible && (
                <FadeView style={blur.absolute} duration={500}>
                    <BlurView
                        style={[
                            addGroupOptionsVisible ? blur.visible : blur.hidden,
                            blur.absolute,
                        ]}
                        intensity={10}
                        tint="light"
                    />
                </FadeView>
            )}
        </SafeAreaView>
    );
}
