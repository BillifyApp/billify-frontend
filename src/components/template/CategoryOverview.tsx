import React from 'react';
import {useTranslation} from "react-i18next";
import {Text, View} from "react-native";

interface CategoryOverviewProps {
    categories: string[];
}

function CategoryOverview({categories}: CategoryOverviewProps) {
    const {t} = useTranslation();


    return (
        <View>
            <Text>{t('common.categories.many')}</Text>
            <Text>{t('common.show_all')}</Text>
            {categories.map((c, key) => <Text key={key}>{c}</Text>)}
        </View>
    );
}

export default CategoryOverview;