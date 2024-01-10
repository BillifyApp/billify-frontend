import React, { useEffect } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import FlexImage from "./atom/FlexImage";
import { useNavigation } from "@react-navigation/native";
import { addReceiptAutoName, oneReceiptName } from "../stores/route_names";
import { styles } from "../styles/styles";
import CustomText from "./atom/CustomText";

interface LastBillHomeComponentProps {
  receipt: any;
}

function LastBillHomeComponent({ receipt }: LastBillHomeComponentProps) {
  const navigation = useNavigation();

  useEffect(() => {
    //console.log(receipt);
  }, []);

  const processPath = (path: string) => {
    return path.replaceAll("\\", "/");
  };

  return (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate({
          name: oneReceiptName,
          params: { receipt_id: receipt._id, path: receipt.image.path },
        });
      }}
    >
      <View style={localStyles.container}>
        <CustomText style={styles.h2}>€ {receipt.total}</CustomText>
        <CustomText>{receipt.comp_name}</CustomText>
        {receipt.items && <CustomText>{receipt.items.length} items</CustomText>}
      </View>
    </Pressable>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: 150,
    padding: 15,
    height: "100%",
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    justifyContent: "flex-end",
    
  },
  image: {
    //flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default LastBillHomeComponent;
