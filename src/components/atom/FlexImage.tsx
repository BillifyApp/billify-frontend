import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {url} from "../../stores/constants";
import CustomText from './CustomText';

interface FlexImageProps {
    path: string;
    width: any;
    height: any;
}

function FlexImage({path, width, height}: FlexImageProps) {

    // const [image, setImage] = useState<any>('')

    useEffect(() => {
        //console.log(`${url}/${processPath(path)}`)
        //setImage(`${url}/${processPath(path)}`)
    }, []);

    const processPath = (path: string) => {
        return path.replaceAll('\\', '/')
    }

    return (
        <View style={{
            width: width, height: height,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            {path != undefined ?
                <Image
                    style={styles.image}
                    source={{uri: `${url}/${processPath(path)}`}}
                /> :
                <CustomText>Image should be here, rep</CustomText>
            }
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
        borderRadius: 10,
        //resizeMode: "contain",
    },
});

export default FlexImage;