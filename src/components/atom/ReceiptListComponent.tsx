import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { oneReceiptName } from "../../stores/route_names";

interface ReceiptListEntry {
  index: number;
  receipt_id: string;
  icon?: any;
  name: string;
  total: number;
}

function ReceiptListEntry({
  index,
  receipt_id,
  icon,
  name,
  total,
}: ReceiptListEntry) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(
          // @ts-ignore
          oneReceiptName,
          { receipt_id: receipt_id, path: icon }
        )
      }
    >
      <View style={styles.container}>
        <Text>{`${index}.`}</Text>
        <Text>{name}</Text>
        <Text>{`${total} €`}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 20,
  },
});

export default ReceiptListEntry;
