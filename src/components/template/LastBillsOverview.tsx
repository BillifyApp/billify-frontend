import React from 'react';
import {Dimensions, ScrollView, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import LastBillHomeComponent from "../LastBillHomeComponent";
import {styles} from "../../styles/styles";

interface LastBillsOverviewProps {
    bills: any[];
}

const windowWidth = Dimensions.get("window").width;

function LastBillsOverview({bills}: LastBillsOverviewProps) {
    const {t} = useTranslation();

    return (
        <View style={{height: 400}}>
            <Text style={styles.h1}>{t('common.last_purchases')}</Text>
            <Text>{t('common.show_all')}</Text>
            <ScrollView style={{
                width: windowWidth * 2, height: 50,
                backgroundColor: 'gray',
                padding: 10
            }}
                        horizontal={true}>
                {bills.map((c, key) => <LastBillHomeComponent key={key} bill={c}/>)}
            </ScrollView>
        </View>
    );
}

export default LastBillsOverview;