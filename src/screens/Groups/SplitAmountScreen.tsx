import {Group, Receipt} from "../../stores/types";
import CustomText from "../../components/atom/CustomText";
import {SafeAreaView} from "react-native-safe-area-context";
import {Picker} from "@react-native-picker/picker";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {url} from "../../stores/constants";
import {useAuth} from "../../context/AuthContext";
import {Text, TextInput, View} from "react-native";
import CustomToggle from "../../components/atom/CustomToggle";
import {useIsFocused} from "@react-navigation/native";
import {toNumber} from "lodash";
import {Checkbox} from "expo-checkbox";

interface SplitAmountScreenProps {
    route: any;
}

export default function SplitAmountScreen({route}: SplitAmountScreenProps) {
    const receipt: Receipt = route.params.receipt;
    const group_id: string = route.params.group_id;
    const [group, setGroup] = useState<Group>({} as Group);
    const [payedBy, setPayedBy] = useState<string>("");
    const [users, setUsers] = useState<any>([]);
    const [customSplit, setCustomSplit] = useState<any>(false);
    const [mainCheckbox, setMainCheckbox] = useState<any>(false);
    const [count, setCount] = useState(0);
    const authState = useAuth().authState;
    const [data, setData] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        async function getGroup() {
            try {
                const result = await axios.get(`${url}/groups/${group_id}`);
                setGroup(result.data);
                console.log(result.data);
                await getUsers(result.data);
            } catch (e) {
                //console.log(e);
            }
        }

        isFocused && getGroup();
        return () => {
        };
    }, [isFocused, route]);

    async function getUsers(group: any) {
        const users = [];
        if (group != null) {
            users.push(group.owner);
            group.users.forEach((user: any) => {
                users.push(user._id)
            });
        }
        //users = all users in group;

        try {
            const result = await axios.post(`${url}/users/find-many`, {"users": users});
            if (result.data.length > 0) {
                setPayedBy(result.data[0]._id);

                setUsers(result.data)

                let dataC = result.data.map((user: any) => {
                    return {
                        _id: user?._id,
                        firstname: user?.firstname ? user?.firstname as string : user.username as string,
                        selected: false,
                        sum: 0
                    }
                })
                setData(dataC)
            }
        } catch (e) {
            //console.log(e);
        }
    }

    const changeSplit = () => {
        setCustomSplit(!customSplit);
        //TODO change value wenn man von benutzerdefiniert kommt
        console.log(customSplit);
    }

    const onPayedByChange = (itemValue: string) => {
        setPayedBy(itemValue);
    };

    const changeValue = (text: string, id: string) => {
        let dataC = data;
        dataC.map((entry: any) => {
            if (entry._id == id) {
                entry.sum = toNumber(text);
            }
        })
        console.log(dataC)
        setData(dataC);
    }

    const changeCheckbox = (checked: boolean, id: string) => {
        let sumPart = 0;

        let count = data.map((user) => {
            return (user.selected)
        }).filter(Boolean).length;

        if (checked) {
            count++
            console.log("add")
        } else {
            count--
            console.log("sub")
        }
        sumPart = toNumber(receipt.total) / (count);

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
        })

        setCount(count);
        console.log(sumPart);
        console.log(count)
        setData(dataC);
        console.log(data);

    }

    const changeAllCheckboxes = (checked: boolean) => {
        let sumPart = 0

        if (checked) {
            setCount(data.length);
            sumPart = toNumber(receipt.total) / (data.length);
        } else if (!checked) {
            setCount(0)
            sumPart = 0;
        }

        if (sumPart == Infinity) {
            sumPart = 0;
        }

        let dataC = data;
        dataC.map((entry: any) => {
            entry.sum = sumPart;
            if (sumPart > 0) {
                entry.selected = true;
            } else {
                entry.selected = false;
            }
        })

        setMainCheckbox(checked);
        setData(dataC);
        console.log(sumPart);
        console.log(data);
    }

    return (
        <SafeAreaView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <CustomText>{receipt.comp_name}</CustomText>
                <CustomText>{group.name}</CustomText>

                <Picker
                    placeholder="Bezahlt von"
                    selectedValue={payedBy}
                    onValueChange={(itemValue, itemIndex) => onPayedByChange(itemValue)}
                >
                    {users.length > 0 ? users.map((user: any, key: number) => {
                            return (
                                <Picker.Item
                                    key={key}
                                    label={user?.firstname ? user?.firstname as string : user?.username as string}
                                    value={user?._id}
                                ></Picker.Item>
                            )
                        }
                    ) : <></>}
                    {/*  <Picker.Item
                        label={authState!.firstname as string}
                        value={authState?.id}
                    />
                    <Picker.Item label={"test"} value={"test"}/>*/}
                </Picker>
                <CustomToggle update={changeSplit}/>
                {customSplit ?
                    data.length > 0 ?
                        data.map((user: any, key: number) => {
                                return (
                                    <View key={key}>
                                        <Text>{user?.firstname}</Text>
                                        <TextInput style={{backgroundColor: "fff"}}
                                                   keyboardType="numeric"
                                                   defaultValue={user.sum as string}
                                                   value={user.sum as string}
                                                   onChangeText={(text) => {
                                                       changeValue(text, user?._id)
                                                   }}
                                        />
                                    </View>
                                )
                            }
                        ) : <></>
                    : <View>
                        <Checkbox
                            value={mainCheckbox}
                            onValueChange={(newVal) => {
                                changeAllCheckboxes(newVal);
                            }}
                        />
                        {data.length > 0 ?
                            data.map((user: any, key: number) => {
                                    return (
                                        <View key={key}>
                                            <Text>{user?.firstname}</Text>
                                            <Checkbox
                                                value={user.selected}
                                                onValueChange={(newVal) => {
                                                    changeCheckbox(newVal, user._id);
                                                }}
                                            />
                                            {/*<BouncyCheckbox
                                                onPress={(e) => {
                                                    changeCheckbox(e, user?._id);

                                                }}
                                                disableBuiltInState
                                                isChecked={user.selected}
                                            />*/}
                                        </View>
                                    )
                                }
                            ) : <></>}
                    </View>
                }
            </View>
        </SafeAreaView>
    );
}
