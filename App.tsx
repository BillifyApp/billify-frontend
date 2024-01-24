import { StyleSheet, View } from "react-native";
import * as React from "react";
import MainContainer from "./src/containers/MainContainer";
import { AuthProvider } from "./src/context/AuthContext";

// import i18n (needs to be bundled ;))
import "./i18n";
import * as Font from "expo-font";
import { customFonts } from "./src/styles/fonts";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { rh, rw } from "./src/utils/responsiveDimenstions";
export default class App extends React.Component {
  state = {
    fontsLoaded: false,
    splashScreenVisible: true,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return (
      <>
      {this.state.splashScreenVisible ? (<View style={{justifyContent: "center", alignItems: "center"}}><LottieView
      source={require('./src/assets/animations/logo_animation.json')} // Replace with the actual path to your animation JSON file
      autoPlay
      style={{width: rw(110), height: rh(110)}}
      loop={false} // Set loop to true if you want the animation to loop
      onAnimationFinish={() => {
        this.setState({ splashScreenVisible: false });
        // Add any logic to navigate to your main screen or perform other actions when the animation finishes.
      }}
    /></View>) : (
      <AuthProvider>
      <MainContainer />
    </AuthProvider>
    )}</>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
