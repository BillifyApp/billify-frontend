import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { pulseAnimation } from "../../utils/pulseAnimation";
import { COLORS } from "../../styles/colors";


export default function Placeholder() {
  const pulseValue = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    pulseAnimation(pulseValue);
  }, []);

  return (
    <View style={{justifyContent: "center", alignItems: "center"}}>
    <Animated.View style={[styles.input, { opacity: pulseValue }]} />
    {[1,2,3,4,5].map((key: number) => {
        return <Animated.View key={key} style={[styles.groupItem, { opacity: pulseValue }]} />
    })}
    </View>
  );
}
export const styles = StyleSheet.create({
    input: {
      backgroundColor: COLORS.gray_light,
      borderColor: COLORS.gray_mid,
      borderWidth: 1,
      borderRadius: 25,
      width: "90%",
      height: 50,
      margin: 5,
      marginBottom: 10,
    },
    groupItem:{
        backgroundColor: COLORS.gray_light,
        width: "90%",
        height: 100,
        borderRadius: 10,
        margin: 5,
    }
  });