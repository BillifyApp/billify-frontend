import { Group, Receipt } from "../../stores/types";
import CustomText from "../../components/atom/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../stores/constants";
import { useAuth } from "../../context/AuthContext";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CustomToggle from "../../components/atom/CustomToggle";
import { useIsFocused } from "@react-navigation/native";
import { toNumber } from "lodash";
import { Checkbox } from "expo-checkbox";
import CustomButton from "../../components/atom/CustomButton";
import { groupDetails, groupName } from "../../stores/route_names";
import { rh, rw } from "../../utils/responsiveDimenstions";
import { COLORS } from "../../styles/colors";
import { Icon } from "../../styles/fonts";
import { styles as defaultStyles } from "../../styles/styles";
import CustomNumberText from "../../components/atom/CustomNumberText";
import { numberFormatter } from "../../utils/formatters";

interface SplitAmountScreenProps {
    route: any;
    navigation: any;
}

export default function SplitAmountScreen({
    route,
    navigation,
}: SplitAmountScreenProps) {
    const receipt: Receipt = route.params.receipt;
    const group_id: string = route.params.group_id;
    const [group, setGroup] = useState<Group>({} as Group);
    const [payedBy, setPayedBy] = useState("");
    const [customSplit, setCustomSplit] = useState<any>(false);
    const [mainCheckbox, setMainCheckbox] = useState<any>(false);
    const [count, setCount] = useState(0);
    const [sumSplit, setSumSplit] = useState(0);
    const authState = useAuth().authState;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();

    const fetchData = async () => {
        let group = await getGroup();
        let users = await getUsers(group);
        //console.log(group)
        //console.log(users);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [route.params]);

    async function getGroup() {
        try {
            const result = await axios.get(`${url}/groups/${group_id}`);
            setGroup(result.data);
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }

    async function getUsers(group: any) {
        console.log("get users starts here");
        let users: any[];
        users = [];
        console.log(group);
        if (group != null) {
            group.users.forEach((user: any) => {
                users.push(user.id);
            });
        }
        console.log(users);
        //users = all users in group;
        try {
            const result = await axios.post(`${url}/users/find-many`, {
                users: users,
            });
            console.log(result.data);

            if (result.data.length > 0) {
                setPayedBy(result.data[0]._id);

                let dataC = result.data.map((user: any) => {
                    return {
                        _id: user?._id,
                        firstname: user?.firstname
                            ? (user?.firstname as string)
                            : (user.username as string),
                        selected: false,
                        sum: 0,
                    };
                });

                setData(dataC);
                setSumSplit(
                    dataC
                        .map((user: any) => user.sum)
                        .reduce((a: number, b: number) => {
                            return a + b;
                        }, 0)
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    const changeSplit = () => {
        setCustomSplit(!customSplit);

        if (!!customSplit) {
            //TODO change value wenn man von benutzerdefiniert kommt
        }

        /*setSumSplit(dataC.map((user) => user.sum).reduce((a, b) => {
            return a + b
        }))*/
        console.log(customSplit);
    };

    const onPayedByChange = (itemValue: string) => {
        setPayedBy(itemValue);
    };

    const changeValue = (text: string, id: string) => {
        let dataC = data;
        if (text != "") {
            if (text.endsWith(".") || text.endsWith(",")) {
                dataC.map((entry: any) => {
                    if (entry._id == id) {
                        entry.sum = Number(text).toFixed(2);
                        console.log(entry.sum);
                    }
                });
            } else {
                dataC.map((entry: any) => {
                    if (entry._id == id) {
                        entry.sum = Number(text);
                    }
                });
            }
        } else {
            dataC.map((entry: any) => {
                if (entry._id == id) {
                    entry.sum = 0;
                }
            });
        }

        setData(dataC);
        setSumSplit(
            dataC
                .map((user: { _id: string; sum: number }) => user.sum)
                .reduce((a, b) => {
                    return a + b;
                })
        );
    };

    const changeCheckbox = (checked: boolean, id: string) => {
        let sumPart = 0;

        let count = data
            .map((user: { _id: string; sum: number; selected: boolean }) => {
                return user.selected;
            })
            .filter(Boolean).length;

        if (checked) {
            count++;
            console.log("add");
        } else {
            count--;
            console.log("sub");
        }
        sumPart = toNumber(receipt.total) / count;

        if (sumPart == Infinity) {
            sumPart = 0;
        }

        let dataC = data;
        dataC.map((entry: any) => {
            if (entry._id == id && checked) {
                entry.sum = sumPart;
            } else if (entry._id == id && !checked) {
                entry.sum = 0;
            } else if (entry.sum > 0) {
                entry.sum = sumPart;
            } else {
                entry.sum = 0;
            }
            if (entry._id == id) {
                entry.selected = checked;
            }
        });

        setCount(count);
        console.log(sumPart);
        console.log(count);
        setData(dataC);
        setSumSplit(
            dataC
                .map((user: { _id: string; sum: number }) => user.sum)
                .reduce((a, b) => {
                    return a + b;
                })
        );
        console.log(data);
    };

    const changeAllCheckboxes = (checked: boolean) => {
        let sumPart = 0;

        if (checked) {
            setCount(data.length);
            sumPart = Number(receipt.total) / data.length;
        } else if (!checked) {
            setCount(0);
            sumPart = 0;
        }

        if (sumPart == Infinity) {
            sumPart = 0;
        }

        let dataC = data;
        dataC.map((entry: any) => {
            entry.sum = sumPart;
            entry.selected = sumPart > 0;
        });

        setMainCheckbox(checked);
        setData(dataC);
        setSumSplit(
            dataC
                .map((user: { _id: string; sum: number }) => user.sum)
                .reduce((a, b) => {
                    return a + b;
                })
        );
        console.log(sumPart);
        console.log(data);
    };

    const addAndNext = async () => {
        console.log("button pressed");
        try {
            console.log(group_id, payedBy, receipt._id);
            let users = data
                .map((user: { _id: string; sum: number }) => {
                    return {
                        _id: user._id,
                        sum: user.sum,
                    };
                })
                .filter((a) => a.sum != 0);

            const result = await axios.post(`${url}/receipts-group`, {
                group_id: group_id,
                user_id: payedBy,
                receipt_id: receipt._id,
                sum: receipt.total,
                users: users,
            });
        } catch (e) {
            console.log(e);
        }

        navigation.navigate(groupName, {
            screen: groupDetails,
            params: { group: group },
        });
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    minHeight: rh(75),
                }}
            >
                <View style={defaultStyles.headingMargin}>
                    <Icon name="x" size={rh(2)} />
                    <CustomText style={defaultStyles.h1}>
                        Betrag Aufteilen
                    </CustomText>
                    <View></View>
                </View>
                {loading && <Text>Loading..</Text>}
                {!loading && (
                    <>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderWidth: 1,
                                borderColor: COLORS.gray_mid,
                                borderRadius: 10,
                                width: "90%",
                                paddingHorizontal: 10,
                                marginVertical: 20,
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name="profile"
                                    size={25}
                                    color={COLORS.gray_dark}
                                />
                                <CustomText
                                    style={{
                                        color: COLORS.gray_dark,
                                        paddingLeft: 10,
                                        marginTop: 5,
                                    }}
                                >
                                    Bezahlt von
                                </CustomText>
                            </View>
                            <Picker
                                style={{
                                    height: 50,
                                    width: 150,
                                    alignSelf: "flex-end",
                                }} /*note: muss so sein sonst kann der picker nicht angezeigt werden*/
                                //placeholder="Bezahlt von"
                                selectedValue={payedBy}
                                onValueChange={onPayedByChange}
                                mode={"dropdown"}
                            >
                                {data.length > 0 ? (
                                    data.map((user: any, key: number) => (
                                        <Picker.Item
                                            key={key}
                                            label={
                                                user?.firstname
                                                    ? (user.firstname as string)
                                                    : (user.username as string)
                                            }
                                            value={user._id}
                                        />
                                    ))
                                ) : (
                                    <Picker.Item label="Bezaht von" value="" />
                                )}
                            </Picker>
                        </View>
                        <CustomToggle update={changeSplit} />
                        {customSplit ? (
                            data.length > 0 ? (
                                <View>
                                    {data.map((user: any, key: number) => {
                                        return (
                                            <View key={key}>
                                                <Text>{user?.firstname}</Text>
                                                <TextInput
                                                    placeholder="0"
                                                    keyboardType="numeric"
                                                    value={
                                                        user.sum == 0
                                                            ? ""
                                                            : user.sum.toString()
                                                    }
                                                    onChangeText={(text) => {
                                                        changeValue(
                                                            text,
                                                            user?._id
                                                        );
                                                    }}
                                                />
                                                {/*  <Text style={{padding: 10, fontSize: 42}}>
                                            {user.sum}
                                        </Text>*/}
                                            </View>
                                        );
                                    })}
                                    <Text>{sumSplit}</Text>
                                    <Text>{receipt.total}</Text>
                                </View>
                            ) : (
                                <></>
                            )
                        ) : (
                            <View style={{ width: "100%", paddingTop: 30 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "90%",
                                        alignSelf: "center",
                                        paddingVertical: 10,
                                    }}
                                >
                                    <CustomText>Alle Auswählen</CustomText>
                                    <Checkbox
                                        value={mainCheckbox}
                                        onValueChange={(newVal) => {
                                            changeAllCheckboxes(newVal);
                                        }}
                                        style={styles.checkbox}
                                        color={
                                            mainCheckbox
                                                ? COLORS.primary
                                                : COLORS.black
                                        }
                                    />
                                </View>
                                <View
                                    style={[
                                        styles.horizontalDivider,
                                        styles.dividerThick,
                                    ]}
                                ></View>
                                {data.length > 0 ? (
                                    data.map((user: any, key: number) => {
                                        return (
                                            <View key={key}>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "space-between",
                                                        width: "90%",
                                                        alignSelf: "center",
                                                        paddingVertical: 10,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <CustomText style={[user.selected ? {fontFamily: "Poppins-SemiBold"}: {}]}>
                                                            {user?.firstname}
                                                        </CustomText>
                                                        {user.selected && (
                                                            <View
                                                                style={{
                                                                    flexDirection:
                                                                        "row",
                                                                    paddingLeft: 5
                                                                }}
                                                            >
                                                                <CustomText>
                                                                    zahlt
                                                                </CustomText>
                                                                <CustomNumberText
                                                                    style={{
                                                                        fontFamily:
                                                                            "Inter-Regular",
                                                                        fontSize: 14,
                                                                        paddingLeft: 5
                                                                    }}
                                                                >
                                                                    {numberFormatter.format(
                                                                        user.sum
                                                                    )}
                                                                </CustomNumberText>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <Checkbox
                                                        value={user.selected}
                                                        onValueChange={(
                                                            newVal
                                                        ) => {
                                                            changeCheckbox(
                                                                newVal,
                                                                user._id
                                                            );
                                                        }}
                                                        style={styles.checkbox}
                                                        color={
                                                            user.selected
                                                                ? COLORS.primary
                                                                : COLORS.black
                                                        }
                                                    />
                                                </View>
                                                <View
                                                    style={[
                                                        styles.horizontalDivider,
                                                        styles.dividerThin,
                                                    ]}
                                                ></View>
                                            </View>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </View>
                        )}
                    </>
                )}
            </View>
            <View style={[styles.horizontalDivider, styles.dividerThin]}></View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    width: "90%",
                    alignItems: "center",
                    paddingVertical: 10,
                }}
            >
                <CustomText>Summe</CustomText>
                <CustomNumberText>
                    {numberFormatter.format(Number(receipt.total))}
                </CustomNumberText>
            </View>
            <View style={[styles.horizontalDivider, styles.dividerThin]}></View>
            <CustomButton title="Hinzufügen" onPress={() => addAndNext()} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    pickerStyles: {
        width: "100%",
        height: "50%",
        backgroundColor: "gray",
        color: "white",
    },
    horizontalDivider: {
        width: rw(100),
        marginVertical: 5,
    },
    dividerThick: {
        height: rh(0.25),
        backgroundColor: COLORS.gray_mid,
    },
    dividerThin: {
        height: rh(0.2),
        backgroundColor: COLORS.gray_light,
    },
    checkbox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.black,
    },
});
