import React from 'react';
import {Text} from 'react-native';

export default function CustomNumberText({children, style}: any) {
    return (
        <Text style={[{fontFamily: "Inter-SemiBold", fontSize: 18}, style]}>{children}</Text>
    );
}

