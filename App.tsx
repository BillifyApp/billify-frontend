import { StyleSheet } from "react-native";
import * as React from "react";
import MainContainer from "./src/containers/MainContainer";
import { AuthProvider } from "./src/context/AuthContext";

// import i18n (needs to be bundled ;))
import "./i18n";
import * as Font from "expo-font";
import { customFonts } from "./src/styles/fonts";

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
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
      <AuthProvider>
        <MainContainer />
      </AuthProvider>
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
