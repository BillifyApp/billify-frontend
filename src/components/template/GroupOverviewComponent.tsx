import React from 'react';
import {Text, View} from "react-native";
import FlexImage from "../atom/FlexImage";

interface GroupOverviewComponentProps {
    group_name: string;
    images: string[];

}

function GroupOverviewComponent({group_name, images}: GroupOverviewComponentProps) {
    return (
        <View style={{height: 200}}>
            {
                images.map((path, key) =>
                    <FlexImage key={key} path={path} width={50} height={50}></FlexImage>
                )
            }
            <Text>{group_name}</Text>
            <Text>Beschreibung?</Text>
        </View>
    );
}

export default GroupOverviewComponent;