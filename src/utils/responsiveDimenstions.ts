import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export function rh(h: number) {
    return (screenHeight * h) / 100;
}
export function rw(w: number) {
    return (screenWidth * w) / 100;
}
