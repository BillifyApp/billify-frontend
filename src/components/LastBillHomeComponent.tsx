import React, {useEffect} from 'react';
import {StyleSheet} from "react-native";
import {url} from "../stores/constants";
import FlexImage from "./atom/FlexImage";

interface LastBillHomeComponentProps {
    bill: [];
}


function LastBillHomeComponent(props: LastBillHomeComponentProps) {

    useEffect(() => {
        console.log(`${url}/uploads/bills/smus_1698884992322.png`)
    });

    return (
        <FlexImage height='100%' width={150} path='/uploads/bills/smus_1698884992322.png'/>
    );
}


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        //flex: 1,
        width: "100%",
        height: "100%",
    },
});


export default LastBillHomeComponent;
