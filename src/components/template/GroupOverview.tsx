import React from 'react';
import {Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import GroupOverviewComponent from "./GroupOverviewComponent";
import {url} from "../../stores/constants";
import ShowAllAtom from "../atom/ShowAllAtom";
import {groupName} from "../../stores/route_names";
import {styles} from "../../styles/styles";
import CustomText from '../atom/CustomText';
import { Group } from '../../stores/types';

interface GroupOverviewProps {
    groups: Group[] | any;
}

function GroupOverview({groups}: GroupOverviewProps) {
    const {t} = useTranslation();


    return (
        <View>
            <View style={styles.subHeadingMargin}>
            <CustomText style={styles.h2}>{t('common.groups.many')}</CustomText>
            <ShowAllAtom routeName={groupName}></ShowAllAtom>
            </View>
            <View style={styles.groupOverview}>
            {groups.map((g: Group, key: number) => <GroupOverviewComponent
                key={key}
                group_name={g.name}
                image={g.icon}/>)}
       </View>
        </View>
    );
}

export default GroupOverview;