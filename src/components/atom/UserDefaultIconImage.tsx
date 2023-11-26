import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from "react-native";

interface DefaultUserIconProps {
    width: any;
    height: any;
    offset: any;
}

function DefaultUserIcon({width, height, offset}: DefaultUserIconProps) {

    useEffect(() => {
    }, []);

    return (
        <View style={{
            width: width, height: height,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Image
                style={[styles.image, {left: -offset}]}
                source={require('../../assets/userDefault.png')}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
});

export default DefaultUserIcon;