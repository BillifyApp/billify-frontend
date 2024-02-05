import React, {StyleSheet, Text, TextInput, View} from "react-native";
import {useAuth} from "../../context/AuthContext";
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CustomButton from "../../components/atom/CustomButton";
import axios from "axios";
import {url} from "../../stores/constants";
import {groupDetails, groupScreen} from "../../stores/route_names";

export default function ClearDebts({route, navigation}) {
    //const users: [] = route.params.users;
    const [payedTo, setPayedTo] = useState("");
    const [users, setUsers] = useState([]);
    const authState = useAuth().authState;
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("");
    const [valueNum, setValueNum] = useState(0);

    const manip = () => {
        setUsers(route.params.users.filter((user: any) => user.id !== authState?.id));
        setPayedTo(route.params.users.filter((user: any) => user.id !== authState?.id)[0].id);
    }

    useEffect(() => {
        console.log(route.params.users)

        loading && manip();
        console.log("did something")
        console.log(users, payedTo, authState.id)
        setLoading(false);
    }, [route.params]);


    const onPayedByChange = (itemValue: string) => {
        setPayedTo(itemValue);
    };

    const addAndNext = async () => {
        console.log("button pressed")
        try {
            const result = axios.post(`${url}/receipts-group/clear-debt`, {
                user_id: authState?.id,
                to_user: payedTo,
                sum: valueNum,
                group_id: route.params.group._id
            })

            navigation.navigate(groupScreen);
        } catch (e) {
            console.log(e);
        }
    }

    function changeValue(text: string) {
        console.log(text)
        let result = text.trim().match(/(\d*)((\.|,)(\d*))?/);
        console.log(result)
        if (result != null) {
            setValue(result[0])
            setValueNum(Number(result[0].trim()))
        } else {
            setValue("")
            setValueNum(0)
        }
    }

    return (
        <CustomSafeAreaView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                {loading && <Text>Loading..</Text>}
                {!loading &&
                    <View>
                        <Picker
                            style={{
                                height: 50,
                                width: 400
                            }}
                            //placeholder="Schulden begleichen bei..."
                            selectedValue={payedTo}
                            onValueChange={onPayedByChange}
                            mode={'dropdown'}>

                            {users.length > 0 ? users.map((user: any, key: number) =>
                                <Picker.Item
                                    key={key}
                                    label={user.name as string}
                                    value={user.id}
                                />
                            ) : <></>
                            }
                        </Picker>
                        {users.length > 0 &&
                            <Text>{`Zu begleichen: ${users.filter((user) => user.id === payedTo).map((user) => {
                                return (user.sum.toFixed(2))
                            })} €`}</Text>}
                        <TextInput
                            placeholder="0"
                            keyboardType="numeric"
                            value={value}
                            onChangeText={(text) => {
                                changeValue(text)
                            }}
                        />
                        <Text>{` €`}</Text>
                    </View>
                }
                <CustomButton title='Begleichen' onPress={() => addAndNext()}></CustomButton>
            </View>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerStyles: {
        width: '100%',
        height: '50%',
        backgroundColor: 'gray',
        color: 'white',
    }
});