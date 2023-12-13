import { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle, duration: number }>;

function FadeView(props: FadeInViewProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: props.duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default FadeView;
