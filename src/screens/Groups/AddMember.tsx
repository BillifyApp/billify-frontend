import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import axios from "axios";
import {url} from "../../stores/constants";
import {SearchBarDefault} from "@rneui/base/dist/SearchBar/SearchBar-default";
import UserListItem from "../../components/atom/UserListItem";

interface AddMemberProps {
    group_id: string;
}

interface ResultInterface {
    _id: string;
    username: string;
    icon_path: string;
}

function AddMember({route, props}: any) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const group_id = route.params.group_id;

    useEffect(() => {
    }, []);

    let getUsers = async (search: string) => {
        setSearch(search);
        if (search.trim().length > 0) {
            try {
                const result = await axios.get(`${url}/users/${search}/${group_id}`)
                setResults(result.data)
            } catch (e) {
                console.log(e)
            }
        } else {
            setResults([]);
        }
    }

    const reset = () => {
        setSearch("");
        setResults([]);
    }

    return (
        <View>
            <SearchBarDefault
                placeholder={"type here"}
                onChangeText={getUsers}
                value={search}
            ></SearchBarDefault>
            <View>
                {results.length > 0
                    ?
                    results.map((result: ResultInterface, key: number) => {
                        return (<UserListItem username={result.username}
                                              _id={result._id}
                                              icon_path={result.icon_path}
                                              group_id={group_id}
                                              key={key}
                                              requested={() => {
                                                  reset();
                                              }}/>
                        )
                    })
                    :
                    <Text>Empty</Text>
                }
            </View>
        </View>
    );
}

export default AddMember;