import React from 'react';
import {Image, Text, View} from "react-native";
import {url} from "../../stores/constants";

interface GroupOverviewComponentProps {
    group_name: string;
    images: string[];

}

function GroupOverviewComponent({group_name, images}: GroupOverviewComponentProps) {
    return (
        <View>
            <View>
                {
                    images.map((path, key) =>
                        <Image key={key}
                               style={{width: '10%', height: '10%'}}
                               source={{uri: `${url}${path}`}}
                        />
                    )
                }
            </View>
            <Text>{group_name}</Text>
            <Text>Beschreibung?</Text>
        </View>
    );
}

export default GroupOverviewComponent;