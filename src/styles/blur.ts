import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
export const blur = StyleSheet.create({
    absolute: {
        transition: "opacity 5s ease",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      visible: {
        transition: "opacity 5s ease",
        opacity: 1,
      },
      hidden: {
        opacity: 0,
      },
});
