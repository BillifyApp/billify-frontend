import React, {useEffect} from 'react';
import {Pressable, StyleSheet} from "react-native";
import FlexImage from "./atom/FlexImage";

interface LastBillHomeComponentProps {
    path: string;
    receipt_id: string;
}


function LastBillHomeComponent({path, receipt_id}: LastBillHomeComponentProps) {

    useEffect(() => {
        console.log(path)
    }, []);

    const processPath = (path: string) => {
        return path.replaceAll('\\', '/')
    }

    return (
        <Pressable onPress={() => {
            alert(`receipt_id: ${receipt_id}`)
        }}>
            <FlexImage height='100%' width={150} path={`/${processPath(path)}`}/>
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
