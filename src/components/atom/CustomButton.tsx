import React from 'react';
import {Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import { COLORS } from "../../styles/colors";

interface Props {
    onPress: any,
    title: string
}

export default function CustomButton(props: any) {
    const {onPress, title = 'Save', width, type="primary"} = props;
    return (
        <TouchableOpacity style={type==="primary" ? [styles.primary, {width: width}] : [styles.secondary, {width: width}]} onPress={onPress}>
            <Text style={type==="primary" ? styles.primary_text : styles.secondary_text}>{title}</Text>
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
  
  primary: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
  },
  primary_text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondary:{
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 15,

  },
  secondary_text:{
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
  }
});


