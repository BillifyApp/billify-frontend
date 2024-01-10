import { useState } from "react";
import CustomInput from "./CustomInput";
import { TouchableOpacity, Image, View } from "react-native";

interface Props {
    value: string;
    placeholder: string;
    onChangeText: Function;

  }

export default function PasswordInput({value, onChangeText, placeholder}: any) {
  
    // State variable to track password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle the password visibility state
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    return (
    <View style={{width: "100%", alignItems:"center"}}>
      <CustomInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
      style={{ position: "absolute", right: 80, top: 22 }}
      onPress={toggleShowPassword}
    >
      <Image source={require("../../assets/icons/showPassword.png")} />
    </TouchableOpacity>
    </View>
  );
}
