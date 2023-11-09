import React from 'react';
import {Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import GroupOverviewComponent from "./GroupOverviewComponent";
import {url} from "../../stores/constants";
import ShowAllAtom from "../atom/ShowAllAtom";
import {groupName} from "../../stores/route_names";

interface GroupOverviewProps {
    groups: any[];
}

function GroupOverview({groups}: GroupOverviewProps) {
    const {t} = useTranslation();


    return (
        <View>
            <Text>{t('common.groups.many')}</Text>
            <ShowAllAtom routeName={groupName}></ShowAllAtom>

            {groups.map((g, key) => <GroupOverviewComponent
                key={key}
                group_name={g.name}
                images={[`/uploads/bills/smus_1698884992322.png`, `/uploads/bills/smus_1698884992322.png`, `/uploads/bills/smus_1698884992322.png`]}/>)}
        </View>
    );
}

export default GroupOverview;