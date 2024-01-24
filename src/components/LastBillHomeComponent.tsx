import React, { useCallback, useEffect } from "react";
import { Pressable, StyleSheet, View, Image } from "react-native";
import FlexImage from "./atom/FlexImage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { addReceiptAutoName, oneReceiptName } from "../stores/route_names";
import { styles } from "../styles/styles";
import CustomText from "./atom/CustomText";
import "intl";
import "intl/locale-data/jsonp/de";
import { useTranslation } from "react-i18next";
import { HomescreenPictures } from "../utils/homescreenImages";
import { rh, rw } from "../utils/responsiveDimenstions";

interface LastBillHomeComponentProps {
  receipt: any;
}

function LastBillHomeComponent({ receipt }: LastBillHomeComponentProps) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [picture, setPicture] = React.useState<any>(null);
  const numberFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  useEffect(() => {
    //console.log(receipt);
  }, []);

  const processPath = (path: string) => {
    return path.replaceAll("\\", "/");
  };
  function getPicture() {
    HomescreenPictures.forEach((pic) => {
        if (pic.name === receipt.category_id) {
            setPicture(pic.source);
        }
    });
}
useFocusEffect(
  useCallback(() => {
      getPicture();
  }, [])
);
  return (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate({
          name: oneReceiptName,
          params: { receipt_id: receipt._id, path: receipt.image.path },
        });
      }}
      style={{width: rh(20)}}
    ><Image source={picture} style={{width:rh(18), height: rh(24), resizeMode:"contain" }}/>
      <View style={localStyles.container}>
        <CustomText style={styles.h2}>{numberFormatter.format(receipt.total)}</CustomText>
        <CustomText>{receipt.comp_name}</CustomText>
        {receipt.items && <CustomText>{receipt.items.length} {t("common.items.one")}</CustomText>}
      </View>
    </Pressable>
  );
}

const localStyles = StyleSheet.create({
  
  container: {
    position: "absolute",
    flex: 1,
    left: 10,
    bottom: 10,
    width: rw(30),
    height: "100%",
    justifyContent: "flex-end",
    
  },
});

export default LastBillHomeComponent;
