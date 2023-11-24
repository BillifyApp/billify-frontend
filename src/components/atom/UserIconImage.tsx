import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {url} from "../../stores/constants";

interface FlexImageProps {
    path: string;
    width: any;
    height: any;
    offset: any;
}

function FlexImage({path, width, height, offset}: FlexImageProps) {

    // const [image, setImage] = useState<any>('')

    useEffect(() => {
        console.log(`${url}/${processPath(path)}`)
        //setImage(`${url}/${processPath(path)}`)
    }, []);

    const processPath = (path: string) => {
        return path.replaceAll('\\', '/')
    }

    return (
        <View style={{
            width: width, height: height,
            justifyContent: "center",
            alignItems: "center",
        }}>
            {path != undefined ?
                <Image
                    style={[styles.image, {left: -offset}]}
                    source={{uri: `${url}/${processPath(path)}`}}
                /> :
                <Text>Image should be here, rep</Text>
            }
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

export default FlexImage;