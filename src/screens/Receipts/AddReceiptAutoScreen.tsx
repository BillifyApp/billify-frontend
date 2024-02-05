import React, {useCallback, useEffect, useMemo, useRef, useState,} from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import {Dimensions, Pressable, ScrollView, Switch, Text, View,} from "react-native";
import ReceiptItemEntry from "../../components/atom/ReceiptItemEntry";
import {groupScreen, homeName, splitAmountScreen} from "../../stores/route_names";
import axios from "axios";
import {url} from "../../stores/constants";
import {useAuth} from "../../context/AuthContext";
import {BottomSheetModal, BottomSheetModalProvider,} from "@gorhom/bottom-sheet";
import {styles} from "../../styles/styles";
import CustomButton from "../../components/atom/CustomButton";
import {useFocusEffect} from "@react-navigation/native";
import {Group} from "../../stores/types";
import {CheckBox} from "@rneui/base";
import CustomText from "../../components/atom/CustomText";
import Toast from "react-native-toast-message";
import {t} from "i18next";

interface Item {
    quantity: number;
    itemName: string;
    unitPrice: number;
    subtotal: number;
}

interface ScreenProps {
    route: any;
    navigation: any;
    group_id?: string;
}

// @ts-ignore
function AddReceiptAutoScreen({route, navigation}: ScreenProps) {
    const auth = useAuth().authState;
    let {image_path, ocr_receipt: receipt, group_id} = route.params;
    const [isEnabled, setIsEnabled] = useState(false);
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [groupSelected, setGroupSelected] = useState<null | string>(null);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    let calculatedTotal = 0;

    async function getGroups() {
        try {
            const result = await axios.get(`${url}/groups/find/${auth?.id}`);
            setGroups(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    function showToast() {
        Toast.show({
            type: "receiptAdded",
            text1: t("common.success"),
            text2: t("common.added_receipt"),
        });
    }

    const numberFormatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });

    useEffect(() => {
        console.log(route);
    }, [route]);
    useFocusEffect(
        useCallback(() => {
            if (group_id) {
                setIsEnabled(true);
                setGroupSelected(group_id);
            }
            getGroups();
        }, [])
    );
    const addReceipt = async () => {
        //todo post receipt
        let result = null;
        try {

            result = await axios.post(`${url}/receipts/add-receipt`, {
                user_id: auth?.id,
                receipt: receipt,
                image_path: image_path,
                in_group: groupSelected != null //true or false
            });
        } catch (e) {
            //todo print fail
        }
        if (!groupSelected) {
            showToast();
            if (group_id) {
                navigation.navigate(groupScreen);
            } else {
                navigation.navigate(homeName);
            }
        }
        if (result && groupSelected) {
            showToast();
            group_id = groupSelected;
            if (group_id) {
                navigation.navigate({
                    name: splitAmountScreen,
                    params: {
                        receipt: result.data,
                        group_id: group_id,
                    },
                });
            } else {
                navigation.navigate(homeName);
            }
        }

        //todo print fail
    };

    const dismissUpload = async () => {
        let result = false;
        try {
            result = await axios.delete(`${url}/images/one`, {
                data: {
                    image_path: image_path,
                },
            });
        } catch (e) {
            //todo print fail
        }
        if (result) {
            navigation.goBack();
        }

        return;
        //todo print fail
    };
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);
    const snapPoints = useMemo(() => ["25%", "66%"], []);
    const {height, width} = Dimensions.get("window");
    return (
        <CustomSafeAreaView>
            <ScrollView>
                <BottomSheetModalProvider>
                    <View
                        style={{marginHorizontal: 25, alignItems: "center"}}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                paddingVertical: 25,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#eee",
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Shop</Text>
                            </View>
                            <View style={{paddingLeft: 20, paddingTop: 10}}>
                                <Text>{receipt?.comp_name}</Text>
                                <Text style={{color: "#858585"}}>
                                    {receipt?.address}
                                </Text>
                                <Text style={{color: "#858585"}}>
                                    {receipt?.date_payed}
                                </Text>
                                <Pressable onPress={handlePresentModalPress}>
                                    <Text
                                        style={{
                                            textDecorationLine: "underline",
                                        }}
                                    >
                                        Show Receipt Image
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.horizontalDivider}></View>
                        {receipt
                            ? receipt.items.map((i: Item, key: number) => {
                                calculatedTotal += i.subtotal;
                                return (
                                    <ReceiptItemEntry
                                        count={key}
                                        key={key}
                                        itemName={i.itemName}
                                        quantity={i.quantity}
                                        unitPrice={i.unitPrice}
                                        subtotal={i.subtotal}
                                    />
                                );
                            })
                            : undefined}
                        <View style={styles.horizontalDivider}></View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text>Total: </Text>
                            {receipt?.total === calculatedTotal ? (
                                <Text>
                                    {numberFormatter.format(receipt.total)}
                                </Text>
                            ) : (
                                <Text style={{color: "red"}}>
                                    {numberFormatter.format(receipt.total)}
                                </Text>
                            )}
                        </View>

                        <Switch
                            trackColor={{false: "#767577", true: "#81b0ff"}}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                        {isEnabled ? (
                            <View>
                                <CustomText>Add Receipt to group:</CustomText>
                                {groups?.map((g: Group, key: number) => {
                                    return (
                                        <View key={key}>
                                            <CheckBox
                                                title={g.name}
                                                checked={
                                                    groupSelected === g._id
                                                }
                                                onPress={() => {
                                                    //TODO check, wenn man von gruppe kommt kann man nicht toggeln
                                                    if (group_id == null) {
                                                        if (groupSelected !== g._id) {
                                                            setGroupSelected(g._id);
                                                        } else {
                                                            setGroupSelected(null)
                                                        }
                                                    }
                                                }}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        ) : (
                            <></>
                        )}
                        <View style={{flexDirection: "row"}}>
                            <CustomButton
                                title="Save"
                                onPress={addReceipt}
                                width="70%"
                            />
                            <CustomButton
                                title="Cancle"
                                onPress={dismissUpload}
                                width="30%"
                            />
                        </View>
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={1}
                            snapPoints={snapPoints}
                            onChange={handleSheetChanges}
                            backgroundStyle={{backgroundColor: "#E0E0E0"}}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {/*TODO place image here -- path currently is undefined for some reason */}
                                {/* <FlexImage path={receipt?.image.path} width="80%" height="100%"></FlexImage> */}
                            </View>
                        </BottomSheetModal>
                    </View>
                </BottomSheetModalProvider>
            </ScrollView>
        </CustomSafeAreaView>
    );
}

export default AddReceiptAutoScreen;
