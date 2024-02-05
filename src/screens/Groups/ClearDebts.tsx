import React, {StyleSheet, Text, TextInput, View} from "react-native";
import {useAuth} from "../../context/AuthContext";
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CustomButton from "../../components/atom/CustomButton";

export default function ClearDebts({route, navigation}) {
    //const users: [] = route.params.users;
    const [payedBy, setPayedBy] = useState("");
    const [users, setUsers] = useState([]);
    const authState = useAuth().authState;
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("");

    const manip = () => {
        setUsers(route.params.users.filter((user: any) => user.id !== authState?.id));
        setPayedBy(route.params.users.filter((user: any) => user.id !== authState?.id)[0].id);
    }


    useEffect(() => {
        loading && manip();
        console.log("did something")
        console.log(users, payedBy, authState.id)
        setLoading(false);
    }, [route.params]);


    const onPayedByChange = (itemValue: string) => {
        setPayedBy(itemValue);
    };

    const addAndNext = async () => {
        console.log("button pressed")
        try {
            //TODO route mit summe schicken und im backend berechnen
        } catch (e) {
            console.log(e);
        }

        //navigation.navigate(groupName, {screen: groupDetails, params: {group: group}});
    }

    function changeValue(text: string) {
        console.log(text)
        let result = text.trim().match(/(\d*)(\.|,)(\d*)?/);
        console.log(result)
        if (result != null) {
            setValue(result[0])
        } else {
            setValue("")
        }
        //todo regex
    }

    return (
        <CustomSafeAreaView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                {loading && <Text>Loading..</Text>}
                {!loading &&
                    (<View>
                        <Picker
                            style={{
                                height: 50,
                                width: 400
                            }}
                            //placeholder="Schulden begleichen bei..."
                            selectedValue={payedBy}
                            onValueChange={onPayedByChange}
                            mode={'dropdown'}>

                            {users.length > 0 ? users.map((user: any, key: number) =>
                                <Picker.Item
                                    key={key}
                                    label={user.username as string}
                                    value={user.id}
                                />
                            ) : <></>
                            }
                        </Picker>
                        <TextInput
                            placeholder="0"
                            keyboardType="numeric"
                            value={value}
                            onChangeText={(text) => {
                                changeValue(text)
                            }}
                        />
                    </View>)
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