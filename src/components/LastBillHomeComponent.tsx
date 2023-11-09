import React, {useEffect} from 'react';
import {Image, View} from "react-native";
import {url} from "../stores/constants";

interface LastBillHomeComponentProps {
    bill: [];
}


function LastBillHomeComponent(props: LastBillHomeComponentProps) {

    useEffect(() => {
        console.log(`${url}/uploads/bills/smus_1698884992322.png`)
    });

    return (
        <View>
            <Image
                style={{width: '100%', height: '100%'}}
                source={{
                    uri: `${url}/uploads/bills/smus_1698884992322.png`
                }}
            />
        </View>
    );
}

export default LastBillHomeComponent;
