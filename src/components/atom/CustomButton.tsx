import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS } from "../../styles/colors";

export default function CustomButton(props: any) {
    const {onPress, title = 'Save', width, type="primary", style} = props;
    
    const customButtonStyle = ()=>{
      if(type==="primary"){
        return([styles.primary, {width: width}, style])
      }else if(type==="secondary"){
        return([styles.secondary, {width: width}, style])
      }else if(type==="outline"){
        return([styles.outline, {width: width}, style])
      }
      else return([styles.primary, {width: width}, style])
    }
    const customButtonText = ()=>{
      if(type==="primary"){
        return(styles.primary_text)
      }else if(type==="secondary"){
        return(styles.secondary_text)
      }else if(type==="outline"){
        return(styles.outline_text)
      }
      else return(styles.primary_text)
    }
    let computedButtonStyle = customButtonStyle();
    let computedButtonText = customButtonText();
    return (
        <TouchableOpacity style={computedButtonStyle} onPress={onPress}>
            <Text style={computedButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
  
  primary: {
    backgroundColor: COLORS.primary,
    padding: 17,
    borderRadius: 30,
    alignItems: "center",
    margin: 5,
  },
  
  primary_text: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Poppins-Bold"
  },
  secondary:{
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 15,

  },
  secondary_text:{
    color: COLORS.black,
    fontSize: 16,
    fontFamily: "Poppins-Bold"
  },
  outline:{
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 17,
    margin: 5,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray_darker,
  },
  outline_text:{
    color: COLORS.gray_darker,
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  }

});


