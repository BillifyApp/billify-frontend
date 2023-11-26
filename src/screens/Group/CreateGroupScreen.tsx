import {Text, TextInput, View} from "react-native";
import * as React from "react";
import {useRef, useState} from "react";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import CustomButton from "../../components/CustomButton";
import {groupName, groupNavName, homeNavName} from "../../stores/route_names";
import axios from "axios";
import {url} from "../../stores/constants";
import {useAuth} from "../../context/AuthContext";

// @ts-ignore
export default function CreateGroupScreen({navigation}) {
    //tr
    const auth = useAuth().authState;
    const inpGroupName = useRef<TextInput>(null)
    const [groupname, setGroupname] = useState('')
    const createGroup = async () => {
        let result = false;
        try {
            result = await axios.post(`${url}/groups/create`, {
                name: groupname,
                owner: auth?.id,
            });

        } catch (e) {
            //todo print fail
            console.log(e)
        }

        if (result) {
            navigation.navigate(groupName);
        }

        //todo print fail
    };

    return (
        <CustomSafeAreaView>
            <CustomButton title="Back" onPress={() => navigation.goBack()}></CustomButton>

            <Text>Create Group Screen</Text>

            <View>
                <TextInput ref={inpGroupName}
                           placeholder="Groupname"
                           onChangeText={text => setGroupname(text)}/>
            </View>


            <CustomButton title="Create" onPress={createGroup}/>
            <CustomButton title="Home" onPress={() => navigation.navigate(homeNavName)}/>
        </CustomSafeAreaView>
    )
}