import React from 'react';
import {Link, useNavigation} from "@react-navigation/native";
import homeNavigation from "../../navigation/HomeNavigation";
import {Text} from "react-native";
import {useTranslation} from "react-i18next";
import { styles } from '../../styles/styles';
import CustomText from './CustomText';

interface ShowAllAtomProps {
    routeName: string;
}


function ShowAllAtom({routeName}: ShowAllAtomProps) {
    const navigation = useNavigation();
    const {t} = useTranslation();

    return (
        <>
            <CustomText onPress={() => navigation.navigate(routeName)} style={styles.p}>{t('common.show_all')}</CustomText>
        </>
    );
}

export default ShowAllAtom;