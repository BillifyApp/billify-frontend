import { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { pulseAnimation } from "../../utils/pulseAnimation";

export default function Placeholder() {
  const pulseValue = useRef(new Animated.Value(0.5)).current;
  const cards = [];
  for (let i = 0; i < 5; i++) {
    cards.push(<Animated.View key={i} style={[styles.skeleton, { opacity: pulseValue }]} />)
  }
  useEffect(() => {
    pulseAnimation(pulseValue);
  }, []);

  return (
    <>
      {cards.map((card) => card)}  
    </>
  );
}
const styles = StyleSheet.create({
  skeleton: {
    width: 150,
    height: 175,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    marginHorizontal: 10,
  },
});
