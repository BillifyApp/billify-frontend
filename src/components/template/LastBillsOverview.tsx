import React, { useEffect } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import LastBillHomeComponent from "../LastBillHomeComponent";
import { allReceiptsName } from "../../stores/route_names";
import LastBillComponentPlaceholder from "../placeholder/LastBillComponentPlaceholder"

interface bills {
  _id: string;
  date_created: string;
  image: {
    path: string;
  };
}

interface LastBillsOverviewProps {
  bills: bills[];
  navigation: any;
  isLoading: boolean;
}

const windowWidth = Dimensions.get("window").width;

function LastBillsOverview({ bills, navigation, isLoading }: LastBillsOverviewProps) {
  const { t } = useTranslation();

  return (
    <View style={{ height: 250 }}>
      <View style={styles.subHeadingMargin}>
        <Text style={[styles.h2 ]}>
          {t("common.last_purchases")}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate(allReceiptsName);
          }}
        >
          <Text style={styles.p}>{t("common.show_all")}</Text>
        </Pressable>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: 870,
            height: 200,
            padding: 10,
            flex: 1,
            flexDirection: "row",
          }}
        >
          {isLoading ?  
            (<LastBillComponentPlaceholder/>)
          : 
            bills.map((b, key) => (
              <LastBillHomeComponent
                key={key}
                receipt={b}
  
              />
            ))
          }
          
        </View>
      </ScrollView>
    </View>
  );
}
export default LastBillsOverview;
