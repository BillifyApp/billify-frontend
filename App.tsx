import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MainContainer from "./src/containers/MainContainer";
import { AuthProvider } from "./src/context/AuthContext";
import "./i18n";
import * as Font from "expo-font";
import { customFonts } from "./src/styles/fonts";
import LottieView from "lottie-react-native";
import { rh, rw } from "./src/utils/responsiveDimenstions";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFontsAsync();
  }, []);

  return (
    <>
      {splashScreenVisible ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LottieView
            source={require('./src/assets/animations/logo_animation.json')}
            autoPlay
            style={{ width: rw(110), height: rh(110) }}
            loop={false}
            onAnimationFinish={() => {
              setSplashScreenVisible(false);
            }}
          />
        </View>
      ) : (
        <AuthProvider>
          <MainContainer />
        </AuthProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});