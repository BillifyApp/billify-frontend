import React from 'react';
import {Animated, ScrollView, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import LastBillHomeComponent from "../LastBillHomeComponent";

interface LastBillsOverviewProps {
    bills: any[];
}


function LastBillsOverview({bills}: LastBillsOverviewProps) {
    const {t} = useTranslation();

    return (
        <View>
            <Text>{t('common.last_purchases')}</Text>
            <Text>{t('common.show_all')}</Text>
            <ScrollView horizontal
                        pagingEnabled>
                {bills.map((c, key) => <LastBillHomeComponent key={key} bill={c}/>)}
            </ScrollView>
        </View>
    );
}

export default LastBillsOverview;