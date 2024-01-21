import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { url } from "../../stores/constants";
import ReceiptItemEntry from "../../components/atom/ReceiptItemEntry";
import { editReceiptName, homeName } from "../../stores/route_names";
import FlexImage from "../../components/atom/FlexImage";
import { styles } from "../../styles/styles";
import CustomButton from "../../components/atom/CustomButton";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Icon } from "../../styles/fonts";
import { COLORS } from "../../styles/colors";
import { receiptIcons } from "../../utils/receiptIcons";
import { Receipt } from "../../stores/types";

interface Item {
  quantity: number;
  itemName: string;
  unitPrice: number;
  subtotal: number;
}

// @ts-ignore
function AddReceiptAutoScreen({ route, navigation }) {
  const { receipt_id, path } = route.params;
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    async function getReceipt() {
      return await axios
        .post(`${url}/receipts/findById`, {
          receipt_id: receipt_id,
        })
        .then((res) => {
          console.log(res.data);
          setReceipt(res.data);
        });
    }

    getReceipt();
    return () => {};
  }, [route]);

  const deleteReceipt = async () => {
    await axios.delete(`${url}/receipts/delete-one`, {
      data: {
        receipt_id: receipt_id,
      },
    });
    navigation.navigate(homeName);
  };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = useMemo(() => ["25%", "66%"], []);
  const {height, width} = Dimensions.get('window');
  return (
    <SafeAreaView >
      <ScrollView >
      <BottomSheetModalProvider 
      >
        <View style={{flex: 1, minHeight: height}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 60, marginLeft: 10 }}
        >
          <Icon name="pfeil_l" size={20}/>
        </TouchableOpacity>

        <Text style={[styles.h1, { textAlign: "center" }]}>
          Receipt Overview
        </Text>
        <View style={{ marginHorizontal: 25, alignItems: "center" }}>
          <View style={{ flexDirection: "row", paddingVertical: 25 }}>
            <View
              style={{
                backgroundColor: COLORS.primary_light,
                height: 100,
                width: 100,
                borderRadius: 50,
                borderColor: COLORS.primary,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name={receiptIcons[receipt?.category_id as keyof typeof receiptIcons]} size={40} color={COLORS.black}/>
            </View>
            <View style={{ paddingLeft: 20, paddingTop: 10 }}>
              <Text>{receipt?.comp_name}</Text>
              <Text style={{color: "#858585"}}>{receipt?.address}</Text>
              <Text style={{color: "#858585"}}>{receipt?.date_payed}</Text>
              <Pressable onPress={handlePresentModalPress}>
              <Text style={{ textDecorationLine: "underline"}}>Show Receipt Image</Text>
            </Pressable>
            </View>
            
          </View>
          <View style={styles.horizontalDivider}></View>
          {receipt?.items?.map((i, key) => {
            return (
              <ReceiptItemEntry
                count={key}
                key={key}
                itemName={i.itemName}
                quantity={i.quantity}
                unitPrice={i.unitPrice}
                subtotal={i.subtotal}
              />
            );
          })}
          <View style={styles.horizontalDivider}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 20,
            }}
          >
            <Text>Total:</Text>
            <Text>{`${receipt?.total} €`}</Text>
          </View>
          <View style={styles.horizontalDivider}></View>
          <View style={{ flexDirection: "row" }}>
            <CustomButton
              title="Edit"
              width="70%"
              onPress={() => {
                navigation.navigate(editReceiptName, { receipt });
              }}
            />
            <CustomButton
              title="Delete"
              width="30%"
              onPress={deleteReceipt}
              color="#aaa"
            />
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{backgroundColor: '#E0E0E0'}}
        >
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
            <FlexImage path={path} width="80%" height="100%"></FlexImage>
            </View>
        </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddReceiptAutoScreen;
