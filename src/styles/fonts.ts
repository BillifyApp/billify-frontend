import { createIconSetFromIcoMoon } from '@expo/vector-icons';

export const customFonts = {
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),

    "Icon-Font": require('../assets/icomoon/fonts/icomoon.ttf'),

    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
}

export const Icon = createIconSetFromIcoMoon(
    require("../assets/icomoon/selection.json"),
    "Icon-Font",
    "icomoon.ttf"
)

