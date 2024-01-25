import {Group, Receipt} from "../../stores/types";
import CustomText from "../../components/atom/CustomText";
import {SafeAreaView} from "react-native-safe-area-context";
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import axios from "axios";
import {url} from "../../stores/constants";
import {useAuth} from "../../context/AuthContext";
import {View} from "react-native";
import CustomToggle from "../../components/atom/CustomToggle";

interface SplitAmountScreenProps {
    route: any;
}

export default function SplitAmountScreen({route}: SplitAmountScreenProps) {
    const receipt: Receipt = route.params.receipt;
    const group_id: string = route.params.group_id;
    const [group, setGroup] = useState<Group>({} as Group);
    const [payedBy, setPayedBy] = useState<string>("");
    const [users, setUsers] = useState<any>([]);
    const authState = useAuth().authState;

    async function getGroup() {
        try {
            const result = await axios.get(`${url}/groups?id=${group_id}`);
            setGroup(result.data);
            console.log(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    //TODO get users from backend
    async function getUsers() {
        const users = [];
        users.push(group.owner);
        group.users.forEach((user) => {
            users.push(user)
        });

        //users = all users in group;

        try {
            const result = await axios.post(`${url}/users/findMany`, {"users": users});
            setUsers(result.data)
            console.log(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    const onPayedByChange = (itemValue: string) => {
        setPayedBy(itemValue);
    };
    useEffect(() => {
        getGroup();
    }, []);

    return (
        <SafeAreaView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <CustomText>{receipt.comp_name}</CustomText>
                <Picker
                    placeholder="Bezahlt von"
                    selectedValue={payedBy}
                    onValueChange={onPayedByChange}
                >
                    {users.map((user: any) => {
                        return (<Picker.Item
                            label={user?.username as string}
                            value={user?.id}
                        ></Picker.Item>)
                    })}
                    <Picker.Item
                        label={authState!.firstname as string}
                        value={authState?.id}
                    />
                    <Picker.Item label={"test"} value={"test"}/>
                </Picker>
                <CustomToggle/>
            </View>
        </SafeAreaView>
    );
}
