import React, {useEffect} from 'react';
import {Dimensions, ScrollView, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {styles} from "../../styles/styles";
import LastBillHomeComponent from "../LastBillHomeComponent";

interface bills {
    _id: string;
    date_created: string;
    image: {
        path: string;
    }
}

interface LastBillsOverviewProps {
    bills: bills[];
}

const windowWidth = Dimensions.get("window").width;

function LastBillsOverview({bills}: LastBillsOverviewProps) {
    const {t} = useTranslation();

    useEffect(() => {
        bills.map(b => console.log(b))
        console.log(bills)
    }, []);

    return (
        <View style={{height: 400}}>
            <Text style={styles.h1}>{t('common.last_purchases')}</Text>
            <Text>{t('common.show_all')}</Text>
            <ScrollView style={{
                width: windowWidth * 2, height: 50, backgroundColor: 'gray', padding: 10
            }}
                        horizontal={true}>
                {bills.map((b, key) => <LastBillHomeComponent key={key} path={b.image.path} receipt_id={b._id}/>)}
            </ScrollView>
        </View>
    );
}

export default LastBillsOverview;