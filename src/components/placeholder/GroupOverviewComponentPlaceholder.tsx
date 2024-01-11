import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { pulseAnimation } from "../../utils/pulseAnimation";
import { styles } from "../../styles/styles";

interface PlaceholderProps{
  index: number;
}

export default function Placeholder({index}: PlaceholderProps) {
  const pulseValue = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    pulseAnimation(pulseValue);
  }, []);

  return (
    <>
      <Animated.View key={index} style={[styles.groupOverviewItem, { opacity: pulseValue }]} />
    </>
  );
}