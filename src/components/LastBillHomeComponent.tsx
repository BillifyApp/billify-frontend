import React, {useEffect} from 'react';
import {Pressable, StyleSheet} from "react-native";
import FlexImage from "./atom/FlexImage";
import {useNavigation} from "@react-navigation/native";
import {addReceiptAutoName, oneReceiptName} from "../stores/route_names";

interface LastBillHomeComponentProps {
    path: string;
    receipt_id: string;
}


function LastBillHomeComponent({path, receipt_id}: LastBillHomeComponentProps) {
    const navigation = useNavigation();

    useEffect(() => {
        console.log(path)
    }, []);

    const processPath = (path: string) => {
        return path.replaceAll('\\', '/')
    }

    return (
        <Pressable onPress={() => {
            // @ts-ignore
            navigation.navigate({name: oneReceiptName, params: {receipt_id: receipt_id, path: path}})
        }} style={{height: '100%', width: '100%', flexShrink: 1 }}>
            <FlexImage height={'100%'} width={'100%'} path={path}/>
        </Pressable>
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
