import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {
  Dimensions,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import ReceiptItemEntry from "../components/atom/ReceiptItemEntry";
import { homeName, successfullyAddedName } from "../stores/route_names";
import axios from "axios";
import { url } from "../stores/constants";
import { useAuth } from "../context/AuthContext";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { styles } from "../styles/styles";
import CustomButton from "../components/atom/CustomButton";
import FlexImage from "../components/atom/FlexImage";

interface Item {
  quantity: number;
  itemName: string;
  unitPrice: number;
  subtotal: number;
}

interface Receipt {
  comp_name: string;
  address: string;
  items: Array<Item>;
  total: number;
}

// @ts-ignore
function AddReceiptAutoScreen({ route, navigation }) {
  const auth = useAuth().authState;
  const { image_path, ocr_receipt: receipt } = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    console.log(route);
  }, [route]);

  const addReceipt = async () => {
    //todo post receipt
    let result = false;
    try {
      result = await axios.post(`${url}/receipts/add-receipt`, {
        user_id: auth?.id,
        receipt: receipt,
        image_path: image_path,
      });
    } catch (e) {
      //todo print fail
    }

    if (result) {
      navigation.navigate(successfullyAddedName);
    }

    //todo print fail
  };

  const dismissUpload = async () => {
    let result = false;
    try {
      result = await axios.delete(`${url}/images/one`, {
        data: {
          image_path: image_path,
        },
      });
    } catch (e) {
      //todo print fail
    }

    if (result) {
      navigation.navigate(homeName);
    }

    return;
    //todo print fail
  };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = useMemo(() => ["25%", "66%"], []);
  const { height, width } = Dimensions.get("window");
  return (
    <CustomSafeAreaView>
      <ScrollView>
      <BottomSheetModalProvider>
        <View style={{ marginHorizontal: 25, alignItems: "center" }}>
          <View style={{ flexDirection: "row", paddingVertical: 25 }}>
            <View
              style={{
                backgroundColor: "#eee",
                height: 100,
                width: 100,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Shop</Text>
            </View>
            <View style={{ paddingLeft: 20, paddingTop: 10 }}>
              <Text>{receipt?.comp_name}</Text>
              <Text style={{ color: "#858585" }}>{receipt?.address}</Text>
              <Text style={{ color: "#858585" }}>{receipt?.date_payed}</Text>
              <Pressable onPress={handlePresentModalPress}>
                <Text style={{ textDecorationLine: "underline" }}>
                  Show Receipt Image
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.horizontalDivider}></View>
          {receipt
            ? receipt.items.map((i: Item, key: number) => {
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
              })
            : undefined}
          <View style={styles.horizontalDivider}></View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text>Total: </Text>
            <Text>{`${receipt?.total} €`}</Text>
          </View>

          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

          {isEnabled ? (
            <View>
              <Text>Insert groups here</Text>
            </View>
          ) : (
            <></>
          )}
          <View style={{ flexDirection: "row" }}>
            <CustomButton title="Save" onPress={addReceipt} width="70%" />
            <CustomButton title="Cancle" onPress={dismissUpload} width="30%" />
          </View>
          <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{backgroundColor: '#E0E0E0'}}
        >
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
          {/*TODO place image here -- path currently is undefined for some reason */}
            {/* <FlexImage path={receipt?.image.path} width="80%" height="100%"></FlexImage> */}
            </View>
        </BottomSheetModal>
        </View>
        </BottomSheetModalProvider>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

export default AddReceiptAutoScreen;
