import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
  require('./assets/icomoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export default function App() {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('./assets/icomoon/icomoon.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  /*return (
    <View style={styles.container}>
      <Icon name="technologie" size={50} color="black" />
    </View>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
});
