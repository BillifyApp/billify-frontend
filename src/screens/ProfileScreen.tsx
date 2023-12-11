import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import { settingsName } from "../stores/route_names";
import CustomButton from "../components/atom/CustomButton";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles/styles";

// @ts-ignore
export default function ProfileScreen({ navigation }) {
  const { onLogout } = useAuth();

  const logout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      alert(result.msg);
    }
  };
  return (
    <CustomSafeAreaView>
      <View style={{ backgroundColor: "#fff", height: "100%" }}>
        <Text
          style={[
            styles.h1,
            { marginHorizontal: 15, marginTop: 20, marginBottom: 10 },
          ]}
        >
          My Profile
        </Text>
        <CustomButton title="Go to Settings" onPress={() => navigation.navigate(settingsName)}/>
        <CustomButton title="Logout" onPress={logout}/>
      </View>
    </CustomSafeAreaView>
  );
}
