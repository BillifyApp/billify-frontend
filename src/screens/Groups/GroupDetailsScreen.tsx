import React, {Dimensions, Image, ImageSourcePropType, Modal, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../styles/styles";
import {popup} from "../../styles/popup";
import {blur} from "../../styles/blur";
import CustomText from "../../components/atom/CustomText";
import {useTranslation} from "react-i18next";
import {Group, Receipt} from "../../stores/types";
import {RouteProp, useFocusEffect, useRoute} from "@react-navigation/native";
import {COLORS} from "../../styles/colors";
import CustomButton from "../../components/atom/CustomButton";
import {useCallback, useMemo, useRef, useState} from "react";
import axios from "axios";
import {url} from "../../stores/constants";
import AddReceiptButton from "../../components/atom/AddReceiptButton";
import FadeView from "../../components/atom/FadeView";
import {BlurView} from "expo-blur";
import {addMember, clearDebts} from "../../stores/route_names";
import {Icon} from "../../styles/fonts";
import {SafeAreaView} from "react-native-safe-area-context";
import UploadModal from "../UploadModal";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {GroupIcons} from "../../utils/groupIcons";
import GroupReceipts from "../../components/atom/ReceiptsOverview/GroupReceipts";
import {rh, rw} from "../../utils/responsiveDimenstions";
import {useAuth} from "../../context/AuthContext";

type ParamList = {
    Group: {
        group: Group;
    };
};

export default function GroupDetailsScreen({navigation}: any) {
    let {authState} = useAuth();
    const {t} = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [addGroupOptionsVisible, setAddGroupOptionsVisible] = useState(false);
    //typescript is eh cool owa monchmoi bin i froh das mei laptop nu ned ausm fenster gflogn is
    const route = useRoute<RouteProp<ParamList, "Group">>();
    let {group} = route.params;
    const [receipts, setReceipts] = useState<Receipt[] | null>(null);
    const [debts, setDebts] = useState([]);
    const [overview, setOverview] = useState<{ name: any; sum: number; id: any; }[]>([]);
    const [groupIcon, setGroupIcon] = useState<ImageSourcePropType | null>(
        null
    );
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


    async function getGroup() {
        try {
            let result = await axios.get(`${url}/groups/${group._id}`);
            group = result.data;
        } catch (e) {
            console.log(e);
        }
    }

    async function getReceipts() {
        try {
            let group_id = group._id;
            let _group = await axios.get(`${url}/receipts-group/by-group/${group_id}`)
            const receipt_ids = _group.data.map((obj: any) => obj.receipt_id);

            const result = await axios.post(`${url}/receipts/findManyById`, {
                receipt_id: receipt_ids,
            });
            setReceipts(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getDebts() {
        try {
            let debts_ids = group.debts;
            let res = await axios.post(`${url}/debts/find-many`,
                {
                    ids: debts_ids,
                }
            )
            //todo process data
            let debts = res.data.filter(debt => debt.user_id === authState?.id)[0];
            let users = group.users;

            debts.my_debts = debts.my_debts.map(entry => {
                let user = users.filter(user => entry.to === user.id)[0];


                return {
                    ...entry,
                    name: user?.firstname ? user.firstname : user.username
                }
            })

            debts.other_debts = debts.other_debts.map(entry => {
                let user: {} = users.filter(user => entry.from === user.id)[0];

                return {
                    ...entry,
                    name: user?.firstname ? user.firstname : user.username
                }
            })
            let overview = [];
            let mydebts = debts.my_debts;
            let otherdebts = debts.other_debts;

            for (let i = 0; i < debts.my_debts.length; i++) {
                console.log(mydebts[i]);
                let mydebt = mydebts[i].sum;
                let otherdebt = otherdebts.filter(debt => debt.from === mydebts[i].to)[0];
                otherdebt = otherdebt.sum;
                console.log(mydebt, otherdebt);

                overview.push({
                    name: mydebts[i].name,
                    sum: otherdebt - mydebt, //positiv ist schuldet dir und negativ ist schulde ich
                    id: mydebts[i].to
                })
            }

            setOverview(overview);


            //console.log(debts.data)
            console.log("| debts ")
            setDebts(debts)
        } catch (e) {
            console.log(e);
            console.log("| debts ")
        }
    }

    function getGroupIcon() {
        GroupIcons.forEach((icon, index) => {
            if (icon.name === group.icon) {
                setGroupIcon(icon.source);
            }
        });
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setModalActive(true);
    }, []);
    const [modalActive, setModalActive] = useState(false);
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setModalActive(false);
        }
    }, []);
    const snapPoints = useMemo(() => ["25%", "66%"], []);


    useFocusEffect(
        useCallback(() => {
            getGroup();
            getReceipts();
            getDebts();
            getGroupIcon();
            //console.log(group);
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            return () => bottomSheetModalRef.current?.close();
        }, [])
    );
    return (
        <SafeAreaView>
            <TouchableOpacity
                style={[
                    styles.headingMargin,
                    {justifyContent: "flex-start", alignItems: "baseline"},
                ]}
                onPress={() => navigation.navigate("GroupScreen")}
            >
                <Icon name="pfeil_l" size={20} style={{marginRight: 20}}/>
                <CustomText style={styles.h1}>
                    {t("groups.group_overview")}
                </CustomText>
            </TouchableOpacity>
            <View style={{alignItems: "center", marginTop: 30}}>
                <View style={{width: rw(100), minHeight: rh(80.5), alignItems: "center"}}>
                    <View
                        style={{
                            width: "90%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{flexDirection: "row"}}>
                            {groupIcon && (
                                <Image
                                    source={groupIcon}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 10,
                                    }}
                                />
                            )}
                            <View style={{marginLeft: 20}}>
                                <CustomText style={styles.pMedium}>
                                    {group.name}
                                </CustomText>
                                <View style={{flexDirection: "row"}}>
                                    <CustomText
                                        style={{color: COLORS.gray_dark}}
                                    >
                                        {t("common.groups.one") + " ·"}
                                    </CustomText>
                                    <CustomText
                                        style={{
                                            paddingLeft: 5,
                                            color: COLORS.gray_dark,
                                        }}
                                    >
                                        {group.users.length + " " +
                                            t("groups.members")}
                                    </CustomText>
                                </View>
                                {overview.length > 0 && overview.map((debt) => {
                                        if (debt.sum > 0) {
                                            return (
                                                <Text>{`${debt.name} schuldet dir ${debt.sum.toFixed(2).replace(".", ",")} €`}</Text>)
                                        } else if (debt.sum == 0) {
                                            return (<></>);
                                        } else {
                                            return (
                                                <Text>{`Du schuldest ${debt.name} ${(debt.sum * -1).toFixed(2).replace(".", ",")} €`}</Text>)
                                        }
                                    }
                                )}
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
                                            <Icon name="x" size={18}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{marginTop: 20}}>
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
                                            style={{backgroundColor: "red"}}
                                            onPress={deleteGroup}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    {
                        group.receipts_group.length > 0 && receipts && (
                            <GroupReceipts receipts={receipts} navigation={navigation}/>
                        )
                    }
                    

                    <Modal
                        transparent={true}
                        visible={addGroupOptionsVisible}
                        animationType="fade"
                        style={{width: rw(100), height: rh(100)}}
                    >
                        <View style={popup.bottomView}>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-end",
                                    height: rh(20)
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingBottom: 15,
                                        paddingRight: 20
                                    }}
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.navigate(clearDebts, {users: group.users})
                                    }}
                                >
                                    <CustomText
                                        style={[styles.p, {paddingRight: 15}]}
                                    >
                                        {"Schulden begleichen"}
                                    </CustomText>
                                    <Icon name="schulden" size={20}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingBottom: 105,
                                        paddingRight: 20
                                    }}
                                    onPress={() => {
                                        handlePresentModalPress();
                                        setAddGroupOptionsVisible(false);
                                    }}
                                >
                                    <CustomText
                                        style={[styles.p, {paddingRight: 15}]}
                                    >
                                        {"Rechnung dieser Gruppe hinzufügen"}
                                    </CustomText>
                                    <Icon name="add" size={20}/>
                                </TouchableOpacity>
                                <AddReceiptButton
                                    name="x"
                                    onPress={() => {
                                        setAddGroupOptionsVisible(false);
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        backgroundStyle={{backgroundColor: COLORS.gray_light}}
                    >
                        <UploadModal
                            navigation={navigation}
                            group_id={group._id}
                        />
                    </BottomSheetModal>
                </View>
            </View>
            {
                modalActive ||
                (addGroupOptionsVisible && (
                    <FadeView style={blur.absolute} duration={500}>
                        <BlurView
                            style={[
                                addGroupOptionsVisible || modalActive
                                    ? blur.visible
                                    : blur.hidden,
                                blur.absolute,
                            ]}
                            intensity={10}
                            tint="light"
                        />
                    </FadeView>
                ))
            }
            {
                        !addGroupOptionsVisible && (
                            <AddReceiptButton
                                name="begleichen"
                                onPress={() => {
                                    setAddGroupOptionsVisible(true);
                                }}
                            />
                        )
                    }
        </SafeAreaView>
    )
        ;
}
