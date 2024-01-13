import React from 'react';
import {Text} from 'react-native';

export default function CustomText({children, style}: any) {
    return (
        <Text style={[{fontFamily: "Poppins-Regular"}, style]}>{children}</Text>
    );
}

