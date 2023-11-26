import React from 'react';
import {Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import GroupOverviewComponent from "./GroupOverviewComponent";
import ShowAllAtom from "../atom/ShowAllAtom";
import {groupName} from "../../stores/route_names";
import {styles} from "../../styles/styles";
import {Group} from "../../utils/interfaces/Group";

interface GroupOverviewProps {
    groups: any[];
}

function GroupOverview({groups}: GroupOverviewProps) {
    const {t} = useTranslation();

    return (
        <View>
            <View style={styles.headingMargin}>
                <Text style={styles.h2}>{t('common.groups.many')}</Text>
                <ShowAllAtom routeName={groupName}></ShowAllAtom>
            </View>
            <View style={styles.groupOverview}>
                {groups.map((g: Group, key) => <GroupOverviewComponent
                    key={key}
                    group_name={g.name}
                    images={[`uploads/users/user.jpg`, `uploads/users/user.jpg`, `uploads/users/user.jpg`]}
                    group_id={g._id}/>)}
            </View>
        </View>
    );
}

export default GroupOverview;