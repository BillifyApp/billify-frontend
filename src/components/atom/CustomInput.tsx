import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../../styles/colors";

interface Props {
  value: any;
  placeholder: string;
  onChangeText: Function;
}

export default function CustomInput(props: any) {
  const { placeholder, value, onChangeText, secureTextEntry=false, innerRef, placeholderTextColor=COLORS.gray_dark, style } = props;
  return (
    <TextInput
    ref={innerRef}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
    />
  );
}

export const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.gray_light,
    borderColor: COLORS.gray_mid,
    borderWidth: 1,
    borderRadius: 25,
    width: "80%",
    padding: 10,
    paddingLeft: 20,
    margin: 5,
    fontFamily: "Poppins-Medium"
  },
});
