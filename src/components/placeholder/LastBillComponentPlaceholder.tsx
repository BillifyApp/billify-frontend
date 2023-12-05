import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export default function Placeholder() {
  const pulseValue = useRef(new Animated.Value(0.5)).current;
  const pulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  const cards = [];
  for (let i = 0; i < 5; i++) {
    cards.push(<Animated.View style={[styles.skeleton, { opacity: pulseValue }]} />)
  }
  useEffect(() => {
    pulseAnimation();
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
