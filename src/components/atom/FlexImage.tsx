import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {url} from "../../stores/constants";

interface FlexImageProps {
    path: string;
    width: any;
    height: any;
}

function FlexImage({path, width, height}: FlexImageProps) {

    return (
        <View style={{
            width: width, height: height,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Image
                style={styles.image}
                source={{
                    uri: `${url}${path}`
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
   /* container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },*/
    image: {
        //flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});

export default FlexImage;