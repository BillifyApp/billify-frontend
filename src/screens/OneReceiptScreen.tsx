import React, { useEffect, useState } from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import { Pressable, ScrollView, Text, View } from "react-native";
import axios from "axios";
import { url } from "../stores/constants";
import ReceiptItemEntry from "../components/atom/ReceiptItemEntry";
import { homeName } from "../stores/route_names";
import FlexImage from "../components/atom/FlexImage";

interface Image {
  path: string;
  date_uploaded: string;
}

interface Item {
  quantity: number;
  itemName: string;
  unitPrice: number;
}

interface Receipt {
  _id: string;
  user_id: string;
  image: Image;
  date_created: string;
  date_payed: string;
  comp_name: string;
  address: string;
  items: Array<Item>;
  total: number;
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

  return (
    <CustomSafeAreaView>
      <ScrollView>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </Pressable>
        <Text>{receipt?._id}</Text>
        <Text>{receipt?.image.path}</Text>
        <View style={{ height: 200 }}>
          <FlexImage path={path} width="100%" height={50} />
          <Text>{receipt?.comp_name}</Text>
          <Text>{receipt?.address}</Text>
          <Text>{receipt?.date_payed}</Text>
        </View>
        {receipt?.items?.map((i, key) => {
          return (
            <ReceiptItemEntry
              count={key}
              key={key}
              itemName={i.itemName}
              quantity={i.quantity}
              unitPrice={i.unitPrice}
            />
          );
        })}
        <Text>{`${receipt?.total} €`}</Text>
        <Pressable onPress={deleteReceipt}>
          <Text>Delete</Text>
        </Pressable>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

export default AddReceiptAutoScreen;
