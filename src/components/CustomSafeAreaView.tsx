import React from 'react';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {SafeAreaView, View} from "react-native";

// @ts-ignore
function CustomSafeAreaView({children}) {
    const insets = useSafeAreaInsets();

    return (
        <>
            <View
                style={{
                    //flex: 1,
                    //justifyContent: 'space-between',
                    //alignItems: 'center',

                    // Paddings to handle safe area
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,

                    backgroundColor: "#fff",
                }}>
                {children}
            </View>

        </>
    );
}


export default CustomSafeAreaView;