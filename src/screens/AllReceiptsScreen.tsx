import React, { useEffect, useState } from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import { Pressable, ScrollView, Text, View } from "react-native";
import axios from "axios";
import { url } from "../stores/constants";
import ReceiptItemEntry from "../components/atom/ReceiptItemEntry";
import { homeName } from "../stores/route_names";
import FlexImage from "../components/atom/FlexImage";
import { useAuth } from "../context/AuthContext";
import ReceiptListComponent from "../components/atom/ReceiptListComponent";

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
function AllReceiptsScreen({ route, navigation }) {
  //const { user_id, path } = route.params;
  const authState = useAuth().authState
  const [receipts, setReceipts] = useState<Receipt[] | null>(null);

  useEffect(() => {
    async function getReceipt() {
      return await axios
        .post(`${url}/receipts/latest`, {
            user_id: authState?.id
        })
        .then((res) => {
          setReceipts(res.data);
        });
    }

    getReceipt();
    return () => {};
  }, [route]);

  return (
    <CustomSafeAreaView>
      <ScrollView>
        <Pressable onPress={() => navigation.navigate(homeName)}>
          <Text>Back</Text>
        </Pressable>
        {receipts?.map((receipt, key)=>(
            <ReceiptListComponent
                index={key+1}
                receipt_id={receipt._id}
                icon={receipt.image.path}
                name={receipt.comp_name}
                total={receipt.total}
            />

        ))}
      </ScrollView>
    </CustomSafeAreaView>
  );
}

export default AllReceiptsScreen;
