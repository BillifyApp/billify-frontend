import React from 'react';
import {Link, useNavigation} from "@react-navigation/native";
import homeNavigation from "../../navigation/HomeNavigation";
import {Text} from "react-native";
import {useTranslation} from "react-i18next";
import { styles } from '../../styles/styles';
import CustomText from './CustomText';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ShowAllAtomProps {
    onPress: Function;
}


function ShowAllAtom({onPress}: ShowAllAtomProps) {
    const {t} = useTranslation();

    return (
        <TouchableOpacity onPress={()=>{onPress()}}>
            <CustomText style={styles.p}>{t('common.show_all')}</CustomText>
        </TouchableOpacity>
    );
}

export default ShowAllAtom;