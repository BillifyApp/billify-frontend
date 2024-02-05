import {SafeAreaView} from "react-native-safe-area-context";
import {Picker} from "@react-native-picker/picker";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {StyleSheet, Text, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import CustomButton from "../../components/atom/CustomButton";

interface SplitAmountScreenProps {
    route: any;
    navigation: any;
}

export default function ClearDebts({route, navigation}: SplitAmountScreenProps) {
    //const users: [] = route.params.users;
    const [payedBy, setPayedBy] = useState("");
    const [users, setUsers] = useState([]);
    const authState = useAuth().authState;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        console.log(route.params.users)
        setUsers(route.params.users.filter(user => user.id !== authState?.id));
        setPayedBy(route.params.users.filter(user => user.id !== authState?.id)[0].id);
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

    return (
        <SafeAreaView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Text>Hallo</Text>
                {loading && <Text>Loading..</Text>}
                {!loading &&
                    (<>
                        <View>
                            <Picker
                                style={{
                                    height: 50,
                                    width: 400
                                }}
                                placeholder="Schulden begleichen bei..."
                                selectedValue={payedBy}
                                onValueChange={onPayedByChange}
                                mode={'dropdown'}>

                                {users && users.length > 0 ? users.map((user: any, key: number) =>
                                    <Picker.Item
                                        key={key}
                                        label={user.username as string}
                                        value={user.id}
                                    />
                                ) : <></>
                                }
                            </Picker>

                        </View>
                    </>)
                }
            </View>
            <CustomButton title='Begleichen' onPress={() => addAndNext()}></CustomButton>
        </SafeAreaView>
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