import React, { useEffect, useState } from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { url } from "../stores/constants";
import ReceiptItemEntry from "../components/atom/ReceiptItemEntry";
import { homeName, oneReceiptName } from "../stores/route_names";
import FlexImage from "../components/atom/FlexImage";
import ReceiptItemEntryEdit from "../components/atom/ReceiptItemEntryEdit";
import { styles } from "../styles/styles";
import { Receipt } from "../stores/types";





// @ts-ignore
function AddReceiptAutoScreen({ route, navigation }) {
  const receipt: Receipt = route.params.receipt;
  const [receiptData, setReceiptData] = useState({
    comp_name: receipt.comp_name,
    address: receipt.address,
    date_payed: receipt.date_payed,
    items: receipt.items,
    total: receipt.total,
  });
  const handleItemDataUpdate = (data: any, key: number) => {
    // Function to update the receipt data based on data from ReceiptItemEntryEdit
    const updatedItems = [...receiptData.items];
    updatedItems[key] = data;
    setReceiptData({ ...receiptData, items: updatedItems });
  };
  const updateReceipt = async () => {
    await axios.put(`${url}/receipts/update-one`, {
      receipt_id: receipt._id,
      receipt: receiptData,
    });
    navigation.navigate(oneReceiptName, { receipt_id: receipt._id });
  };
  return (
    <CustomSafeAreaView>
      <ScrollView>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </Pressable>
        <View style={{ height: 200 }}>
          <FlexImage path={receipt?.image.path} width="100%" height={50} />
          <TextInput
            value={receiptData.comp_name}
            style={inputStyles.input}
            onChangeText={(text) =>
              setReceiptData({ ...receiptData, comp_name: text })
            }
          />
          <TextInput
            value={receiptData.address}
            style={inputStyles.input}
            onChangeText={(text) =>
              setReceiptData({ ...receiptData, address: text })
            }
          />
          <TextInput
            value={receiptData.date_payed}
            style={inputStyles.input}
            onChangeText={(text) =>
              setReceiptData({ ...receiptData, date_payed: text })
            }
          />
        </View>
        {receipt?.items?.map((i, key) => {
          return (
            <ReceiptItemEntryEdit
              count={key}
              key={key}
              itemName={i.itemName}
              quantity={i.quantity}
              unitPrice={i.unitPrice}
              subtotal={i.subtotal}
              onDataUpdate={(data: any) => {
                handleItemDataUpdate(data, key);
              }}
            />
          );
        })}
        <View>
          <Text>Total:</Text>
          <TextInput
            value={receiptData.total.toString()}
            style={inputStyles.input}
            onChangeText={(text) =>
              setReceiptData({ ...receiptData, total: text })
            }
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={updateReceipt}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
const inputStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    margin: 20,
    paddingHorizontal: 20,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
  },
});
export default AddReceiptAutoScreen;
