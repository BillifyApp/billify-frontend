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
}

const windowWidth = Dimensions.get("window").width;

function LastBillsOverview({ bills, navigation }: LastBillsOverviewProps) {
  const { t } = useTranslation();

  useEffect(() => {
    bills.map((b) => console.log(b));
    console.log(bills);
  }, []);

  return (
    <View style={{ height: 270 }}>
      <View style={styles.headingMargin}>
        <Text style={[styles.h2 ]}>
          {t("common.last_purchases")}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate(allReceiptsName);
          }}
        >
          <Text>{t("common.show_all")}</Text>
        </Pressable>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: 870,
            height: 230,
            padding: 10,
            flex: 1,
            flexDirection: "row",
          }}
        >
          {bills.map((b, key) => (
            <LastBillHomeComponent
              key={key}
              path={b.image.path}
              receipt_id={b._id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
export default LastBillsOverview;
