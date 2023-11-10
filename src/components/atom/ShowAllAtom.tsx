import React from 'react';
import {Link, useNavigation} from "@react-navigation/native";
import homeNavigation from "../../navigation/HomeNavigation";
import {Text} from "react-native";
import {useTranslation} from "react-i18next";

interface ShowAllAtomProps {
    routeName: string;
}


function ShowAllAtom({routeName}: ShowAllAtomProps) {
    const navigation = useNavigation();
    const {t} = useTranslation();

    return (
        <>
            <Text onPress={() => navigation.navigate(routeName)}>{t('common.show_all')}</Text>
        </>
    );
}

export default ShowAllAtom;