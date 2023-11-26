import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import UserIconImage from "../atom/UserIconImage";
import UserDefaultIconImage from "../atom/UserDefaultIconImage";
import {useNavigation} from "@react-navigation/native";
import {groupNavName, oneGroupName} from "../../stores/route_names";
import {styles} from "../../styles/styles";

interface GroupOverviewComponentProps {
    group_name: string;
    images: [];
    group_id: string;
}


function GroupOverviewComponent({group_name, images, group_id}: GroupOverviewComponentProps) {
    const navigation = useNavigation();

    function createImages() {
        return images.map((path: string, key: number) => {
                return (<UserIconImage
                    key={key}
                    path={path}
                    width={30}
                    height={30}
                    offset={key * 10}
                />)
            }
        );
    }

    function createDefaultImages() {
        let len = new Array(3);
        return len.map((key: number) => {
            return (
                <UserDefaultIconImage
                    width={30}
                    height={30}
                    offset={key * 10}></UserDefaultIconImage>
            )
        });
    }

    const nav = () => {
        // @ts-ignore
        navigation.navigate({
            name: oneGroupName,
            params: {
                fromHome: true,
                group_id: group_id
            },
        })
    }

    // @ts-ignore
    return (
        <TouchableOpacity onPress={nav}>
            <View style={styles.groupOverviewItem}>
                <View style={{flexDirection: "row"}}>
                    {images.length > 0 ? (
                            images.map((path: string, key: number) => {
                                    return (<UserIconImage
                                        key={key}
                                        path={path}
                                        width={30}
                                        height={30}
                                        offset={key * 10}
                                    />)
                                }
                            )
                        ) :
                        (<>
                            <UserDefaultIconImage width={30} height={30} offset={1 * 10}/>
                            <UserDefaultIconImage width={30} height={30} offset={2 * 10}/>
                            <UserDefaultIconImage width={30} height={30} offset={3 * 10}/>
                        </>)
                    }
                </View>
                <Text style
                          ={
                    {
                        flex: 2
                    }
                }>{
                    group_name
                }</Text>
                <Image source={require("../../assets/arrow-forward.png")}/>
            </View>
        </TouchableOpacity>
    );
}

export default GroupOverviewComponent;
