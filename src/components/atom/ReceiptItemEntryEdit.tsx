import { create } from "domain";
import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

interface ReceiptItemEntry {
  count: number;
  quantity: any;
  itemName: string;
  unitPrice: any;
  subtotal: any;
  onDataUpdate: any;
}

function ReceiptItemEntry({
  count,
  quantity,
  itemName,
  unitPrice,
  subtotal,
  onDataUpdate,
}: ReceiptItemEntry) {
  const [itemData, setItemData] = useState({
    quantity: quantity,
    itemName: itemName,
    unitPrice: unitPrice,
    subtotal: subtotal,
  });
  const updateDataAndNotifyParent = () => {
    onDataUpdate(itemData); // Pass updated data to the parent component
  };
  return (
    <View style={styles.container}>
      <Text>{`${count + 1}.`}</Text>
      <View style={styles.row}>
        <Text>Item Name: </Text>
        <TextInput
          value={itemData.itemName}
          style={styles.input}
          onChangeText={(text) => setItemData({ ...itemData, itemName: text })}
          onBlur={updateDataAndNotifyParent}
        />
      </View>
      <View style={styles.row}>
        <Text>Quantity: </Text>
        <TextInput value={itemData.quantity.toString()} style={styles.input}
        onChangeText={(text) => setItemData({ ...itemData, quantity: text })}
        onBlur={updateDataAndNotifyParent} />
      </View>

      <View style={styles.row}>
        <Text>Unit Price: </Text>
        <TextInput value={itemData.unitPrice?.toString()} style={styles.input}
        onChangeText={(text) => setItemData({ ...itemData, unitPrice: text })}
        onBlur={updateDataAndNotifyParent} />
        <Text>{`€`}</Text>
      </View>
      <View style={styles.row}>
        <Text>Subtotal: </Text>
        <TextInput value={itemData.subtotal?.toString()} style={styles.input}
        onChangeText={(text) => setItemData({ ...itemData, subtotal: text })}
        onBlur={updateDataAndNotifyParent} />
        <Text>{`€`}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
export default ReceiptItemEntry;
